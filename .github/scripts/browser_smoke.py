#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from urllib.parse import urljoin
import argparse
import json
import re

from playwright.sync_api import sync_playwright

PAGES = [
    ("home-no", "/"),
    ("home-en", "/en/"),
    ("contact-no", "/contact/"),
    ("contact-en", "/en/contact/"),
    ("testing-no", "/proof/testing-and-standards/"),
    ("downloads-en", "/en/technical-support/downloads/"),
]
VIEWPORTS = {
    "mobile-360": {"width": 360, "height": 800},
    "desktop-1440": {"width": 1440, "height": 900},
}

def safe_name(value: str) -> str:
    return re.sub(r"[^a-z0-9._-]+", "-", value.lower()).strip("-")

def require(condition: bool, message: str, failures: list[str]) -> None:
    if not condition:
        failures.append(message)

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--browser", choices=("chromium", "firefox", "webkit"), required=True)
    parser.add_argument("--base-url", default="http://127.0.0.1:8000")
    parser.add_argument("--output-dir", default="qa/browser")
    args = parser.parse_args()

    out = Path(args.output_dir) / args.browser
    out.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    results: list[dict] = []

    with sync_playwright() as p:
        browser_type = getattr(p, args.browser)
        browser = browser_type.launch(headless=True)
        try:
            for viewport_name, viewport in VIEWPORTS.items():
                context = browser.new_context(viewport=viewport, reduced_motion="reduce")
                page = context.new_page()
                page_errors: list[str] = []
                page.on("pageerror", lambda exc: page_errors.append(str(exc)))

                for label, path in PAGES:
                    url = urljoin(args.base_url.rstrip("/") + "/", path.lstrip("/"))
                    response = page.goto(url, wait_until="networkidle", timeout=30000)
                    prefix = f"{args.browser}/{viewport_name}/{label}"
                    require(response is not None and response.status == 200, f"{prefix}: expected HTTP 200", failures)
                    require(page.locator("main#main-content").count() == 1, f"{prefix}: main landmark missing", failures)
                    require(page.locator("h1").count() == 1 and page.locator("h1").is_visible(), f"{prefix}: visible H1 missing", failures)
                    require(page.locator(".skip-link").count() == 1, f"{prefix}: skip link missing", failures)

                    overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                    require(overflow <= 1, f"{prefix}: horizontal overflow {overflow}px", failures)

                    broken_images = page.evaluate(
                        "Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src'))"
                    )
                    require(not broken_images, f"{prefix}: broken/unloaded images {broken_images}", failures)

                    if path in {"/contact/", "/en/contact/"}:
                        require(page.locator("form.contact-form").is_visible(), f"{prefix}: contact form not visible", failures)
                        require(page.locator('input[name="name"]').is_visible(), f"{prefix}: name input not visible", failures)
                        require(page.locator('input[name="email"]').is_visible(), f"{prefix}: email input not visible", failures)
                        require(page.locator('textarea[name="message"]').is_visible(), f"{prefix}: message input not visible", failures)

                    if viewport["width"] <= 860 and path == "/":
                        toggle = page.locator(".menu-toggle")
                        toggle.focus()
                        toggle.click()
                        require(toggle.get_attribute("aria-expanded") == "true", f"{prefix}: menu aria-expanded did not open", failures)
                        require(page.locator(".mobile-nav").is_visible(), f"{prefix}: mobile menu not visible after open", failures)
                        sub = page.locator(".mobile-subnav-toggle").first
                        sub.click()
                        require(sub.get_attribute("aria-expanded") == "true", f"{prefix}: submenu aria-expanded did not open", failures)
                        controlled = sub.get_attribute("aria-controls")
                        require(bool(controlled) and page.locator(f"#{controlled}").is_visible(), f"{prefix}: controlled submenu not visible", failures)
                        page.keyboard.press("Escape")
                        require(toggle.get_attribute("aria-expanded") == "false", f"{prefix}: Escape did not close mobile menu", failures)
                        require(not page.locator(".mobile-nav").is_visible(), f"{prefix}: mobile menu remains visible after Escape", failures)
                        require(page.evaluate("document.activeElement === document.querySelector('.menu-toggle')"), f"{prefix}: focus did not return to menu toggle", failures)

                    if viewport["width"] > 860 and path == "/":
                        dropdown = page.locator(".nav-dropdown").first
                        menu = dropdown.locator(".dropdown-menu")
                        dropdown.hover()
                        require(menu.is_visible(), f"{prefix}: desktop dropdown not visible on hover", failures)
                        menu.locator("a").first.hover()
                        require(menu.is_visible(), f"{prefix}: dropdown collapsed while pointer remained inside", failures)
                        top = dropdown.locator(".nav-top-link")
                        top.focus()
                        require(menu.is_visible(), f"{prefix}: desktop dropdown not visible on keyboard focus", failures)
                        page.keyboard.press("Escape")
                        require(page.evaluate("document.activeElement === document.querySelector('.nav-dropdown .nav-top-link')"), f"{prefix}: Escape did not restore desktop nav focus", failures)

                    if path == "/proof/testing-and-standards/":
                        mobile_labels = page.locator(".bar-mobile-label")
                        desktop_labels = page.locator(".bar-label")
                        require(mobile_labels.count() == 4 and desktop_labels.count() == 4, f"{prefix}: evidence-bar labels incomplete", failures)
                        if viewport["width"] <= 860:
                            require(all(mobile_labels.nth(i).is_visible() for i in range(4)), f"{prefix}: mobile test-standard labels not visible in bars", failures)
                            require(all(not desktop_labels.nth(i).is_visible() for i in range(4)), f"{prefix}: desktop bar labels should be hidden on mobile", failures)
                        else:
                            require(all(not mobile_labels.nth(i).is_visible() for i in range(4)), f"{prefix}: mobile labels should be hidden on desktop", failures)
                            require(all(desktop_labels.nth(i).is_visible() for i in range(4)), f"{prefix}: desktop bar labels not visible", failures)

                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    page.wait_for_timeout(80)
                    page.evaluate("window.scrollTo(0, 0)")
                    page.wait_for_timeout(80)
                    screenshot = out / f"{safe_name(label)}-{viewport_name}.png"
                    page.screenshot(path=str(screenshot), full_page=True, animations="disabled")
                    results.append({"page": label, "path": path, "viewport": viewport_name, "screenshot": str(screenshot)})

                if page_errors:
                    failures.extend(f"{args.browser}/{viewport_name}: pageerror: {err}" for err in page_errors)
                context.close()
        finally:
            browser.close()

    (out / "summary.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    if failures:
        print(f"VitaCoat browser smoke FAILED for {args.browser}")
        for failure in failures:
            print("- " + failure)
        return 1
    print(f"VitaCoat browser smoke passed for {args.browser}: {len(results)} page/viewport combinations; screenshots captured for QA evidence.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

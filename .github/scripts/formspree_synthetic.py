#!/usr/bin/env python3
"""Synthetic form regression. Network requests are fulfilled by Playwright, never sent to Formspree."""
import argparse
from urllib.parse import urljoin
from playwright.sync_api import sync_playwright, expect

CASES = [("/contact/", "/thank-you/", "Skjemaet kunne ikke sendes"),
         ("/en/contact/", "/en/thank-you/", "The form could not be sent")]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--browser", required=True, choices=["chromium", "firefox", "webkit"])
    ap.add_argument("--base-url", default="http://127.0.0.1:8000")
    args = ap.parse_args()
    with sync_playwright() as p:
        browser = getattr(p, args.browser).launch(headless=True)
        try:
            for path, destination, failure_text in CASES:
                context = browser.new_context()
                page = context.new_page()
                page.add_init_script("""
                    window.qaEvents = [];
                    window.addEventListener('vitacoat:measurement',
                      e => window.qaEvents.push(e.detail));
                """)
                state = {"status": 422, "count": 0}
                def intercept(route):
                    state["count"] += 1
                    assert route.request.method == "POST"
                    route.fulfill(status=state["status"], content_type="application/json",
                                  body='{"errors":[{"message":"Synthetic"}]}' if state["status"] == 422 else '{"ok":true}')
                page.route("https://formspree.io/**", intercept)
                response = page.goto(urljoin(args.base_url.rstrip("/") + "/", path.lstrip("/")), wait_until="networkidle")
                assert response and response.status == 200
                form = page.locator("form.contact-form[data-formspree='true']")
                expect(form).to_have_count(1)
                form.locator('input[name="name"]').fill("QA Synthetic")
                form.locator('input[name="email"]').fill("invalid")
                form.locator('textarea[name="message"]').fill("Test fixture only")
                form.locator('button[type="submit"]').click()
                assert state["count"] == 0
                form.locator('input[name="email"]').fill("qa@example.invalid")
                page.evaluate("""() => {
                    const f = document.querySelector('form.contact-form');
                    f.dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}));
                    f.dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}));
                }""")
                expect(form.locator(".form-status")).to_contain_text(failure_text)
                expect(form.locator('button[type="submit"]')).to_be_enabled()
                assert state["count"] == 1
                events = page.evaluate("window.qaEvents")
                assert sum(e.get("event") == "contact_form_submit_attempt" for e in events) == 1
                assert sum(e.get("event") == "contact_form_submit_error" for e in events) == 1
                assert not any({"name","email","message","company"} & set(e) for e in events)
                state["status"] = 200
                form.locator('button[type="submit"]').click()
                page.wait_for_url("**" + destination)
                assert state["count"] == 2
                context.close()
                print(args.browser, path, "PASS")
        finally:
            browser.close()

if __name__ == "__main__":
    main()

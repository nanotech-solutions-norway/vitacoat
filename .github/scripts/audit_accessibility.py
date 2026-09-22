#!/usr/bin/env python3
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re, sys
import xml.etree.ElementTree as ET

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[2]
BASE_URL = "https://www.vitacoat.no"
errors = []

def fail(message: str) -> None:
    errors.append(message)

def path_to_file(path: str) -> Path:
    if path == "/":
        return ROOT / "index.html"
    return ROOT / path.lstrip("/") / "index.html"

class AccessibilityParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.aria_controls: list[tuple[str, str]] = []
        self.skip_links: list[dict[str, str]] = []
        self.mains: list[dict[str, str]] = []
        self.language_links: list[dict[str, str]] = []
        self.subnav_buttons: list[dict[str, str]] = []
        self.menu_toggles: list[dict[str, str]] = []
        self.controls: list[tuple[str, dict[str, str], bool]] = []
        self.label_for: set[str] = set()
        self.label_depth = 0
        self.button_stack: list[tuple[dict[str, str], list[str]]] = []
        self.buttons: list[tuple[dict[str, str], str]] = []

    def handle_starttag(self, tag: str, attrs_list) -> None:
        attrs = dict(attrs_list)
        classes = set((attrs.get("class") or "").split())
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if attrs.get("aria-controls"):
            self.aria_controls.append((tag, attrs["aria-controls"]))

        if tag == "label":
            self.label_depth += 1
            if attrs.get("for"):
                self.label_for.add(attrs["for"])
        elif tag in {"input", "select", "textarea"}:
            hidden = (
                attrs.get("type") == "hidden"
                or "display:none" in (attrs.get("style") or "").replace(" ", "").lower()
                or attrs.get("name") == "_gotcha"
            )
            if not hidden:
                self.controls.append((tag, attrs, self.label_depth > 0))
        elif tag == "a":
            if "skip-link" in classes:
                self.skip_links.append(attrs)
            if "language-link" in classes:
                self.language_links.append(attrs)
        elif tag == "main":
            self.mains.append(attrs)
        elif tag == "button":
            self.button_stack.append((attrs, []))
            if "mobile-subnav-toggle" in classes:
                self.subnav_buttons.append(attrs)
            if "menu-toggle" in classes:
                self.menu_toggles.append(attrs)

    def handle_data(self, data: str) -> None:
        if self.button_stack:
            self.button_stack[-1][1].append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "label" and self.label_depth:
            self.label_depth -= 1
        elif tag == "button" and self.button_stack:
            attrs, chunks = self.button_stack.pop()
            self.buttons.append((attrs, "".join(chunks).strip()))

ns = {"s": "https://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_root = ET.parse(ROOT / "sitemap.xml").getroot()
locs = [e.text.strip() for e in sitemap_root.findall("s:url/s:loc", ns) if e.text]
paths = [urlparse(loc).path or "/" for loc in locs]

for path in paths:
    file_path = path_to_file(path)
    if not file_path.exists():
        fail(f"{path}: canonical file missing")
        continue

    html = file_path.read_text(encoding="utf-8", errors="ignore")
    parser = AccessibilityParser()
    parser.feed(html)

    if len(parser.ids) != len(set(parser.ids)):
        duplicates = sorted({x for x in parser.ids if parser.ids.count(x) > 1})
        fail(f"{path}: duplicate ids: {', '.join(duplicates)}")

    if len(parser.skip_links) != 1 or parser.skip_links[0].get("href") != "#main-content":
        fail(f"{path}: expected one skip link targeting #main-content")

    if len(parser.mains) != 1:
        fail(f"{path}: expected exactly one main landmark")
    else:
        main = parser.mains[0]
        if main.get("id") != "main-content" or main.get("tabindex") != "-1":
            fail(f"{path}: main landmark must use id=main-content and tabindex=-1")

    if len(parser.menu_toggles) != 1:
        fail(f"{path}: expected one mobile menu toggle")
    else:
        toggle = parser.menu_toggles[0]
        for attr in ("aria-label", "aria-controls", "data-label-open", "data-label-close"):
            if not toggle.get(attr):
                fail(f"{path}: menu toggle missing {attr}")

    if len(parser.subnav_buttons) != 4:
        fail(f"{path}: expected four mobile submenu toggles, found {len(parser.subnav_buttons)}")
    for toggle in parser.subnav_buttons:
        if not toggle.get("aria-label"):
            fail(f"{path}: mobile submenu toggle missing aria-label")
        if toggle.get("aria-expanded") != "false":
            fail(f"{path}: mobile submenu toggle must initialize aria-expanded=false")

    if len(parser.language_links) != 6:
        fail(f"{path}: expected six language links, found {len(parser.language_links)}")
    for link in parser.language_links:
        if link.get("aria-label") not in {"Norsk", "English"}:
            fail(f"{path}: language link missing accessible language name")
        if not link.get("lang") or not link.get("hreflang"):
            fail(f"{path}: language link missing lang/hreflang")
        classes = set((link.get("class") or "").split())
        if "active-lang" in classes and link.get("aria-current") != "page":
            fail(f"{path}: active language link missing aria-current=page")

    ids = set(parser.ids)
    for tag, target in parser.aria_controls:
        if target not in ids:
            fail(f"{path}: {tag} aria-controls references missing id {target}")

    for tag, attrs, nested in parser.controls:
        control_id = attrs.get("id")
        if not nested and (not control_id or control_id not in parser.label_for):
            fail(f"{path}: unlabeled {tag} control {attrs.get('name', '')}")

    for attrs, text in parser.buttons:
        label = (attrs.get("aria-label") or "").strip()
        if not label and text in {"", "›", "☰"}:
            fail(f"{path}: icon-only button has no accessible name")

css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8", errors="ignore")
for marker in (
    ".skip-link:focus",
    ":focus-visible",
    "@media(max-width:360px)",
    "@media(prefers-reduced-motion:reduce)",
    ".bar-mobile-label",
):
    if marker not in css:
        fail(f"styles.css: missing accessibility/reflow marker {marker}")

js = (ROOT / "assets/js/site.js").read_text(encoding="utf-8", errors="ignore")
for marker in ("event.key !== 'Escape'", "restoreFocus", "dataset.labelClose"):
    if marker not in js:
        fail(f"site.js: missing keyboard/focus behavior marker {marker}")

for path in ("/", "/en/", "/proof/testing-and-standards/", "/en/proof/testing-and-standards/"):
    html = path_to_file(path).read_text(encoding="utf-8", errors="ignore")
    if html.count('class="bar-label"') != 4 or html.count('class="bar-mobile-label"') != 4:
        fail(f"{path}: mobile evidence bars must contain four desktop and four mobile labels")

if errors:
    print("VitaCoat accessibility audit FAILED")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)

print(f"VitaCoat accessibility audit passed: {len(paths)} canonical pages checked for landmarks, accessible names, labels, ARIA relationships, keyboard hooks and mobile evidence-bar markup.")

#!/usr/bin/env python3
from __future__ import annotations
from html import unescape
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / "_site"
BASE = "https://www.vitacoat.no"
MARKER = 'data-vc-breadcrumb="true"'

def page_file(path: str) -> Path:
    if path == "/":
        return ROOT / "index.html"
    return ROOT / path.lstrip("/") / "index.html"

def strip_tags(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", unescape(value))).strip()

def h1_text(html: str) -> str:
    match = re.search(r"<h1\b[^>]*>(.*?)</h1>", html, flags=re.I | re.S)
    if not match:
        raise ValueError("page has no H1")
    return strip_tags(match.group(1))

def trail_for(path: str, current_name: str):
    english = path.startswith("/en/")
    prefix = "/en" if english else ""
    home = {"name": "Home" if english else "Hjem", "path": f"{prefix}/" if english else "/"}
    current = {"name": current_name, "path": path}

    def item(name, local_path):
        return {"name": name, "path": f"{prefix}{local_path}" if english else local_path}

    if path in {"/", "/en/"}:
        return []

    if path.startswith(f"{prefix}/applications/") and path != f"{prefix}/applications/":
        return [home, item("Applications" if english else "Bruksområder", "/applications/"), current]

    technical_children = (
        f"{prefix}/how-it-works/",
        f"{prefix}/benefits/",
        f"{prefix}/proof/",
        f"{prefix}/application-process/",
    )
    if path.startswith(technical_children):
        return [home, item("Technical" if english else "Teknisk", "/documentation/"), current]

    if path == f"{prefix}/documentation/":
        return [home, current]

    if path == f"{prefix}/technical-support/downloads/" or path == f"{prefix}/maintenance-and-reapplication/":
        return [home, item("Technical Support" if english else "Teknisk støtte", "/technical-support/"), current]

    if path in {f"{prefix}/faq/", f"{prefix}/legal/"}:
        return [home, item("Contact" if english else "Kontakt", "/contact/"), current]

    return [home, current]

sitemap = ET.parse(ROOT / "sitemap.xml").getroot()
ns = {"s": "https://www.sitemaps.org/schemas/sitemap/0.9"}
paths = [urlparse(node.text.strip()).path or "/" for node in sitemap.findall("s:url/s:loc", ns) if node.text]
changed = 0

for path in paths:
    if path in {"/", "/en/"}:
        continue
    target = page_file(path)
    html = target.read_text(encoding="utf-8", errors="ignore")
    if MARKER in html:
        continue
    name = h1_text(html)
    trail = trail_for(path, name)
    if len(trail) < 2:
        raise SystemExit(f"{path}: breadcrumb trail must contain at least two items")
    items = []
    for position, node in enumerate(trail, start=1):
        entry = {"@type": "ListItem", "position": position, "name": node["name"]}
        if position != len(trail):
            entry["item"] = BASE + node["path"]
        items.append(entry)
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items,
    }
    script = '<script type="application/ld+json" data-vc-breadcrumb="true">\n' + json.dumps(schema, ensure_ascii=False, separators=(",", ":")) + "\n</script>\n"
    if "</head>" not in html:
        raise SystemExit(f"{path}: missing </head>")
    html = html.replace("</head>", script + "</head>", 1)
    target.write_text(html, encoding="utf-8")
    changed += 1

print(f"Structured-data enhancement complete: BreadcrumbList added to {changed} canonical non-home pages.")

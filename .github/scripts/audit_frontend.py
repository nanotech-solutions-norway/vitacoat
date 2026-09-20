#!/usr/bin/env python3
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
errors = []

def fail(msg):
    errors.append(msg)

# Global stale-dependency checks.
for path in ROOT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".md", ".js", ".css"}:
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    if "cdn.gamma.app" in text:
        fail(f"Gamma CDN reference remains: {path.relative_to(ROOT)}")
    if "@vitacoat.eu" in text.lower():
        fail(f"Deprecated vitacoat.eu email reference remains: {path.relative_to(ROOT)}")

# Canonical sitemap coverage.
sitemap = ROOT / "sitemap.xml"
root = ET.parse(sitemap).getroot()
ns = {"s": "https://www.sitemaps.org/schemas/sitemap/0.9"}
locs = [e.text.strip() for e in root.findall("s:url/s:loc", ns) if e.text]
seen = set()
for loc in locs:
    if not loc.startswith("https://www.vitacoat.no/"):
        fail(f"Unexpected sitemap host: {loc}")
        continue
    rel = loc.removeprefix("https://www.vitacoat.no/")
    file_path = ROOT / rel / "index.html" if rel else ROOT / "index.html"
    file_path = Path(str(file_path).replace("//index.html", "/index.html"))
    if not file_path.exists():
        fail(f"Sitemap target missing: {loc} -> {file_path.relative_to(ROOT)}")
        continue
    if file_path in seen:
        continue
    seen.add(file_path)
    html = file_path.read_text(encoding="utf-8", errors="ignore")
    if '<header class="site-header">' not in html:
        fail(f"Static header missing: {file_path.relative_to(ROOT)}")
    if '<footer class="site-footer">' not in html:
        fail(f"Static footer missing: {file_path.relative_to(ROOT)}")
    if "vitacoat-global-js-overrides" in html or "vc-image-placeholder-section" in html:
        fail(f"Reconstruction-era runtime marker remains: {file_path.relative_to(ROOT)}")
    for src in re.findall(r'<img[^>]+src=["\'](/assets/img/[^"\']+)["\']', html, flags=re.I):
        asset = ROOT / src.lstrip("/")
        if not asset.exists():
            fail(f"Missing local image: {file_path.relative_to(ROOT)} -> {src}")

# JS must remain progressive enhancement, not shell reconstruction.
js = (ROOT / "assets/js/site.js").read_text(encoding="utf-8", errors="ignore")
for marker in ("pageRequiredImages", "placeholderSvg", "nav.innerHTML", "footer-grid').forEach", "vitacoat-global-js-overrides"):
    if marker in js:
        fail(f"Runtime reconstruction marker remains in site.js: {marker}")

if errors:
    print("VitaCoat frontend audit FAILED")
    for err in errors:
        print(f"- {err}")
    sys.exit(1)

print(f"VitaCoat frontend audit passed: {len(seen)} canonical sitemap files checked.")

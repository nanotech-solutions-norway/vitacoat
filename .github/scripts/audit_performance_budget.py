#!/usr/bin/env python3
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json, sys
import xml.etree.ElementTree as ET

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[2]
MAX_CSS_BYTES = 40 * 1024
MAX_SITE_JS_BYTES = 16 * 1024
MAX_FORM_JS_BYTES = 8 * 1024
MAX_TOTAL_JS_BYTES = 24 * 1024
MAX_CANONICAL_HTML_BYTES = 180 * 1024
MAX_OPTIMIZED_RASTER_BYTES = 2 * 1024 * 1024
MAX_SINGLE_WEBP_BYTES = 350 * 1024
MIN_IMAGE_SAVING_PERCENT = 70.0
errors = []

def fail(message: str) -> None:
    errors.append(message)

def path_to_file(path: str) -> Path:
    if path == "/":
        return ROOT / "index.html"
    return ROOT / path.lstrip("/") / "index.html"

class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[dict[str, str]] = []
        self.scripts: list[dict[str, str]] = []
        self.stylesheets: list[dict[str, str]] = []

    def handle_starttag(self, tag, attrs_list) -> None:
        attrs = dict(attrs_list)
        if tag == "img":
            self.images.append(attrs)
        elif tag == "script" and attrs.get("src"):
            self.scripts.append(attrs)
        elif tag == "link" and (attrs.get("rel") or "").lower() == "stylesheet":
            self.stylesheets.append(attrs)

css = ROOT / "assets/css/styles.css"
site_js = ROOT / "assets/js/site.js"
form_js = ROOT / "assets/js/formspree-contact.js"
for file_path in (css, site_js, form_js):
    if not file_path.exists():
        fail(f"Missing performance-budget asset: {file_path.relative_to(ROOT)}")

if css.exists() and css.stat().st_size > MAX_CSS_BYTES:
    fail(f"styles.css exceeds {MAX_CSS_BYTES // 1024} KiB budget: {css.stat().st_size} bytes")
if site_js.exists() and site_js.stat().st_size > MAX_SITE_JS_BYTES:
    fail(f"site.js exceeds {MAX_SITE_JS_BYTES // 1024} KiB budget: {site_js.stat().st_size} bytes")
if form_js.exists() and form_js.stat().st_size > MAX_FORM_JS_BYTES:
    fail(f"formspree-contact.js exceeds {MAX_FORM_JS_BYTES // 1024} KiB budget: {form_js.stat().st_size} bytes")
total_js = sum(p.stat().st_size for p in (site_js, form_js) if p.exists())
if total_js > MAX_TOTAL_JS_BYTES:
    fail(f"Combined first-party JS exceeds {MAX_TOTAL_JS_BYTES // 1024} KiB budget: {total_js} bytes")

manifest_path = ROOT / "assets/img/image-build-manifest.json"
if not manifest_path.exists():
    fail("Missing image optimization manifest")
else:
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception as exc:
        fail(f"Invalid image optimization manifest: {exc}")
        manifest = {}
    if manifest.get("optimized_bytes", 0) > MAX_OPTIMIZED_RASTER_BYTES:
        fail(f"Optimized raster set exceeds {MAX_OPTIMIZED_RASTER_BYTES // 1024 // 1024} MiB budget")
    if manifest.get("saving_percent", 0) < MIN_IMAGE_SAVING_PERCENT:
        fail(f"Aggregate image saving below {MIN_IMAGE_SAVING_PERCENT:.0f}%: {manifest.get('saving_percent', 0)}%")
    for item in manifest.get("files", []):
        if item.get("output_bytes", 0) > MAX_SINGLE_WEBP_BYTES:
            fail(f"Generated WebP exceeds {MAX_SINGLE_WEBP_BYTES // 1024} KiB: {item.get('output')}")

ns = {"s": "https://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.parse(ROOT / "sitemap.xml").getroot()
urls = [e.text.strip() for e in root.findall("s:url/s:loc", ns) if e.text]
for url in urls:
    path = urlparse(url).path or "/"
    file_path = path_to_file(path)
    if not file_path.exists():
        continue
    size = file_path.stat().st_size
    if size > MAX_CANONICAL_HTML_BYTES:
        fail(f"{path}: HTML exceeds {MAX_CANONICAL_HTML_BYTES // 1024} KiB budget ({size} bytes)")
    html = file_path.read_text(encoding="utf-8", errors="ignore")
    parser = AssetParser()
    parser.feed(html)

    for script in parser.scripts:
        src = script.get("src", "")
        parsed = urlparse(src)
        if parsed.scheme in {"http", "https"}:
            fail(f"{path}: external script is not allowed by the performance budget: {src}")

    for style in parser.stylesheets:
        href = style.get("href", "")
        parsed = urlparse(href)
        if parsed.scheme in {"http", "https"} and parsed.netloc != "fonts.googleapis.com":
            fail(f"{path}: unexpected external stylesheet origin: {href}")

    for image in parser.images:
        src = image.get("src", "")
        parsed = urlparse(src)
        if parsed.scheme in {"http", "https"}:
            fail(f"{path}: remote image is not allowed: {src}")
        high = (image.get("fetchpriority") or "").lower() == "high"
        lazy = (image.get("loading") or "").lower() == "lazy"
        if high and lazy:
            fail(f"{path}: high-priority image must not be lazy-loaded: {src}")
        if not high and not lazy:
            fail(f"{path}: non-critical image missing loading=lazy: {src}")
        if not high and (image.get("decoding") or "").lower() != "async":
            fail(f"{path}: non-critical image missing decoding=async: {src}")
        if src.lower().endswith((".webp", ".jpg", ".jpeg", ".png")):
            if not image.get("width") or not image.get("height"):
                fail(f"{path}: raster image missing intrinsic dimensions: {src}")

if errors:
    print("VitaCoat performance budget FAILED")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)

print(
    f"VitaCoat performance budget passed: {len(urls)} canonical pages; "
    f"CSS <= {MAX_CSS_BYTES // 1024} KiB; first-party JS <= {MAX_TOTAL_JS_BYTES // 1024} KiB; "
    f"canonical HTML <= {MAX_CANONICAL_HTML_BYTES // 1024} KiB; optimized rasters <= "
    f"{MAX_OPTIMIZED_RASTER_BYTES // 1024 // 1024} MiB."
)

#!/usr/bin/env python3
from pathlib import Path
import json
import re
import shutil
import sys

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "_site"
ASSET_ROOT = OUT / "assets" / "img"
MAX_DIMENSION = 1800
QUALITY = 82
MIN_SOURCE_BYTES = 100_000
MIN_INDIVIDUAL_SAVING = 0.08
MIN_TOTAL_SAVING = 0.25
HERO_MOBILE_MAX_DIMENSION = 700
HERO_MOBILE_QUALITY = 74

if OUT.exists():
    shutil.rmtree(OUT)

skip = {".git", ".github", "_site"}
for child in ROOT.iterdir():
    if child.name in skip:
        continue
    target = OUT / child.name
    if child.is_dir():
        shutil.copytree(child, target)
    elif child.name != "README.md":
        shutil.copy2(child, target)

homepage_paths = (OUT / "index.html", OUT / "en" / "index.html")
hero_preload_pattern = re.compile(
    r'<link\b(?=[^>]*\brel=["\']preload["\'])(?=[^>]*\bas=["\']image["\'])'
    r'(?=[^>]*\bmedia=["\']\(min-width:\s*861px\)["\'])'
    r'[^>]*\bhref=["\'](/assets/img/[^"\']+\.(?:jpe?g|webp))["\'][^>]*>',
    re.I,
)
hero_source_urls = set()
for homepage in homepage_paths:
    homepage_html = homepage.read_text(encoding="utf-8", errors="ignore")
    match = hero_preload_pattern.search(homepage_html)
    if match:
        hero_source_urls.add(match.group(1))
if len(hero_source_urls) != 1:
    raise SystemExit(f"Expected one shared desktop hero preload across bilingual homepages; found {sorted(hero_source_urls)}")
hero_source_url = hero_source_urls.pop()
hero_source_file = OUT / hero_source_url.lstrip("/")

mapping = {}
records = []
responsive_variants = []
source_total = 0
optimized_total = 0

for path in sorted(ASSET_ROOT.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in {".jpg", ".jpeg"}:
        continue
    before = path.stat().st_size
    if before < MIN_SOURCE_BYTES:
        continue

    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened)
        original_width, original_height = image.size
        if max(image.size) > MAX_DIMENSION:
            image.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGB")

        output = path.with_suffix(".webp")
        image.save(output, "WEBP", quality=QUALITY, method=6, optimize=True)
        after = output.stat().st_size

        if after >= before * (1 - MIN_INDIVIDUAL_SAVING):
            output.unlink()
            continue

        old_url = "/" + path.relative_to(OUT).as_posix()
        new_url = "/" + output.relative_to(OUT).as_posix()
        mapping[old_url] = new_url
        source_total += before
        optimized_total += after
        records.append({
            "source": old_url,
            "output": new_url,
            "source_bytes": before,
            "output_bytes": after,
            "bytes_saved": before - after,
            "saving_percent": round((1 - after / before) * 100, 1),
            "source_dimensions": [original_width, original_height],
            "output_dimensions": list(image.size),
        })

if not hero_source_file.exists():
    raise SystemExit(f"Homepage hero source is missing: {hero_source_file}")
with Image.open(hero_source_file) as opened:
    hero_image = ImageOps.exif_transpose(opened)
    if hero_image.mode not in {"RGB", "RGBA"}:
        hero_image = hero_image.convert("RGB")
    hero_image.thumbnail((HERO_MOBILE_MAX_DIMENSION, HERO_MOBILE_MAX_DIMENSION), Image.Resampling.LANCZOS)
    hero_mobile_file = hero_source_file.with_name(f"{hero_source_file.stem}-mobile.webp")
    hero_image.save(hero_mobile_file, "WEBP", quality=HERO_MOBILE_QUALITY, method=6, optimize=True)
    responsive_variants.append({
        "source": hero_source_url,
        "output": "/" + hero_mobile_file.relative_to(OUT).as_posix(),
        "output_bytes": hero_mobile_file.stat().st_size,
        "output_dimensions": list(hero_image.size),
        "quality": HERO_MOBILE_QUALITY,
        "media": "(max-width: 860px)",
    })

hero_desktop_url = mapping.get(hero_source_url, hero_source_url)
hero_mobile_url = "/" + hero_mobile_file.relative_to(OUT).as_posix()

if not records:
    print("Performance build failed: no raster images qualified for WebP optimization.")
    sys.exit(1)

total_saving = 1 - (optimized_total / source_total)
if total_saving < MIN_TOTAL_SAVING:
    print(f"Performance build failed: aggregate image saving {total_saving:.1%} is below {MIN_TOTAL_SAVING:.0%}.")
    sys.exit(1)

GOOGLE_FONT_LINK_RE = re.compile(
    r"""<link(?=[^>]*href=["']https://fonts[.](?:googleapis|gstatic)[.]com(?:/|["']))[^>]*>""",
    re.I,
)

text_suffixes = {".html", ".css", ".js", ".xml", ".txt", ".json"}
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in text_suffixes:
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    original = text
    for old_url, new_url in mapping.items():
        text = text.replace(old_url, new_url)
    if path.suffix.lower() == ".html":
        text = GOOGLE_FONT_LINK_RE.sub("", text)
    if text != original:
        path.write_text(text, encoding="utf-8")

img_pattern = re.compile(r'<img\b[^>]*?\bsrc=(["\'])(/assets/img/[^"\']+)\1[^>]*>', re.I)

def add_dimensions(match):
    tag = match.group(0)
    if re.search(r'\bwidth\s*=', tag, flags=re.I) and re.search(r'\bheight\s*=', tag, flags=re.I):
        return tag
    src = match.group(2)
    local = OUT / src.lstrip("/")
    if not local.exists() or local.suffix.lower() == ".svg":
        return tag
    try:
        with Image.open(local) as image:
            width, height = image.size
    except Exception:
        return tag
    closing = "/>" if tag.endswith("/>") else ">"
    body = tag[:-len(closing)].rstrip()
    if not re.search(r'\bwidth\s*=', tag, flags=re.I):
        body += f' width="{width}"'
    if not re.search(r'\bheight\s*=', tag, flags=re.I):
        body += f' height="{height}"'
    return body + closing

hero_pattern = re.compile(
    r'''(<img\b[^>]*?\bsrc=["']''' + re.escape(hero_desktop_url) + r'''["'][^>]*>)''',
    re.I,
)

for path in OUT.rglob("*.html"):
    html = path.read_text(encoding="utf-8", errors="ignore")
    updated = img_pattern.sub(add_dimensions, html)
    if hero_mobile_file.exists() and hero_desktop_url in updated and "<picture" not in updated:
        updated = hero_pattern.sub(
            lambda match: (
                f'<picture><source media="(max-width: 860px)" '
                f'srcset="{hero_mobile_url}" type="image/webp">{match.group(1)}</picture>'
            ),
            updated,
        )
    if updated != html:
        path.write_text(updated, encoding="utf-8")

# The mobile hero is selected by <picture> after HTML parsing. Explicitly
# preload its generated 21-25 KiB WebP variant so the LCP resource is
# discovered in <head>, matching the responsive image media query.
if hero_mobile_file.exists():
    mobile_preload = (
        f'<link rel="preload" as="image" href="{hero_mobile_url}" '
        'media="(max-width: 860px)" type="image/webp" fetchpriority="high">'
    )
    for homepage in homepage_paths:
        html = homepage.read_text(encoding="utf-8")
        if html.count("</head>") != 1:
            raise SystemExit(f"Cannot inject mobile preload into {homepage}: invalid head")
        expected_source = f'<source media="(max-width: 860px)" srcset="{hero_mobile_url}"'
        if expected_source not in html:
            raise SystemExit(f"Mobile hero source missing from {homepage}; preload aborted")
        if mobile_preload not in html:
            homepage.write_text(
                html.replace("</head>", f"  {mobile_preload}\n</head>", 1),
                encoding="utf-8",
            )

manifest = {
    "format": "webp",
    "quality": QUALITY,
    "max_dimension": MAX_DIMENSION,
    "converted_count": len(records),
    "source_bytes": source_total,
    "optimized_bytes": optimized_total,
    "bytes_saved": source_total - optimized_total,
    "saving_percent": round(total_saving * 100, 1),
    "files": records,
    "responsive_variants": responsive_variants,
}
manifest_path = ASSET_ROOT / "image-build-manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

if not responsive_variants:
    print("Performance build failed: responsive homepage hero variant was not generated.")
    sys.exit(1)

print(
    f"Optimized {len(records)} raster images: "
    f"{source_total / 1024 / 1024:.2f} MiB -> {optimized_total / 1024 / 1024:.2f} MiB "
    f"({total_saving:.1%} smaller for optimized delivery)."
)

print(
    f"Responsive hero delivery: {responsive_variants[0]['output_dimensions'][0]}x"
    f"{responsive_variants[0]['output_dimensions'][1]} WebP at "
    f"{responsive_variants[0]['output_bytes'] / 1024:.1f} KiB for <=860px viewports."
)

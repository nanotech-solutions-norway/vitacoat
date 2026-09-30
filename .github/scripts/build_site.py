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
HERO_MOBILE_MAX_DIMENSION = 900
HERO_MOBILE_QUALITY = 78

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

        if path.name.lower() == "frontpage-hero.jpg":
            mobile = image.copy()
            mobile.thumbnail((HERO_MOBILE_MAX_DIMENSION, HERO_MOBILE_MAX_DIMENSION), Image.Resampling.LANCZOS)
            mobile_output = path.with_name("frontpage-hero-mobile.webp")
            mobile.save(mobile_output, "WEBP", quality=HERO_MOBILE_QUALITY, method=6, optimize=True)
            responsive_variants.append({
                "source": old_url,
                "output": "/" + mobile_output.relative_to(OUT).as_posix(),
                "output_bytes": mobile_output.stat().st_size,
                "output_dimensions": list(mobile.size),
                "quality": HERO_MOBILE_QUALITY,
                "media": "(max-width: 860px)",
            })

if not records:
    print("Performance build failed: no raster images qualified for WebP optimization.")
    sys.exit(1)

total_saving = 1 - (optimized_total / source_total)
if total_saving < MIN_TOTAL_SAVING:
    print(f"Performance build failed: aggregate image saving {total_saving:.1%} is below {MIN_TOTAL_SAVING:.0%}.")
    sys.exit(1)

FONT_CSS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
BLOCKING_FONT_LINK = f'<link href="{FONT_CSS_URL}" rel="stylesheet">'
ASYNC_FONT_LINK = (
    f'<link href="{FONT_CSS_URL}" rel="stylesheet" media="print" '
    f'onload="this.media=\'all\'">'
    f'<noscript><link href="{FONT_CSS_URL}" rel="stylesheet"></noscript>'
)

text_suffixes = {".html", ".css", ".js", ".xml", ".txt", ".json"}
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in text_suffixes:
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    original = text
    for old_url, new_url in mapping.items():
        text = text.replace(old_url, new_url)
    if path.suffix.lower() == ".html" and BLOCKING_FONT_LINK in text:
        text = text.replace(BLOCKING_FONT_LINK, ASYNC_FONT_LINK)
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

hero_mobile_url = "/assets/img/frontpage-hero-mobile.webp"
hero_desktop_url = "/assets/img/frontpage-hero.webp"
hero_mobile_file = OUT / hero_mobile_url.lstrip("/")
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

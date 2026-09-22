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

if not records:
    print("Performance build failed: no raster images qualified for WebP optimization.")
    sys.exit(1)

total_saving = 1 - (optimized_total / source_total)
if total_saving < MIN_TOTAL_SAVING:
    print(f"Performance build failed: aggregate image saving {total_saving:.1%} is below {MIN_TOTAL_SAVING:.0%}.")
    sys.exit(1)

text_suffixes = {".html", ".css", ".js", ".xml", ".txt", ".json"}
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in text_suffixes:
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    original = text
    for old_url, new_url in mapping.items():
        text = text.replace(old_url, new_url)
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

all_img_pattern = re.compile(r'<img\\b[^>]*>', re.I)

def add_loading_hints(match):
    tag = match.group(0)
    if re.search(r'\\bfetchpriority\\s*=\\s*["\\']high["\\']', tag, flags=re.I):
        return tag
    closing = "/>" if tag.endswith("/>") else ">"
    body = tag[:-len(closing)].rstrip()
    if not re.search(r'\\bloading\\s*=', tag, flags=re.I):
        body += ' loading="lazy"'
    if not re.search(r'\\bdecoding\\s*=', tag, flags=re.I):
        body += ' decoding="async"'
    return body + closing

for path in OUT.rglob("*.html"):
    html = path.read_text(encoding="utf-8", errors="ignore")
    updated = img_pattern.sub(add_dimensions, html)
    updated = all_img_pattern.sub(add_loading_hints, updated)
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
}
manifest_path = ASSET_ROOT / "image-build-manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

print(
    f"Optimized {len(records)} raster images: "
    f"{source_total / 1024 / 1024:.2f} MiB -> {optimized_total / 1024 / 1024:.2f} MiB "
    f"({total_saving:.1%} smaller for optimized delivery)."
)

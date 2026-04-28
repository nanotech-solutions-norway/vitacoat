#!/usr/bin/env python3
"""Audit VitaCoat static SEO coverage against sitemap.xml.

This script validates every URL listed in sitemap.xml against the generated raw
HTML head metadata. It intentionally audits only public canonical sitemap URLs.
Legacy pages outside the sitemap are not treated as canonical SEO targets.
"""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import json
import re
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, str(Path(__file__).resolve().parent))
import apply_static_seo_heads as seo  # noqa: E402

SITEMAP = Path("sitemap.xml")
REPORT = Path("seo-static-audit.json")
NS = {"sm": "https://www.sitemaps.org/schemas/sitemap/0.9"}


def loc_to_path(loc: str) -> str:
    if not loc.startswith(seo.BASE_URL):
        raise ValueError(f"Unexpected sitemap host: {loc}")
    path = loc.removeprefix(seo.BASE_URL)
    return path or "/"


def path_to_file(path: str) -> Path:
    if path == "/":
        return Path("index.html")
    if path.endswith("/"):
        return Path(path.lstrip("/")) / "index.html"
    return Path(path.lstrip("/"))


def extract_head(content: str) -> str:
    match = re.search(r"<head>(.*?)</head>", content, flags=re.I | re.S)
    return match.group(1) if match else ""


def check_page(path: str) -> dict:
    file_path = path_to_file(path)
    result = {
        "url": f"{seo.BASE_URL}{path}",
        "path": path,
        "file": str(file_path),
        "status": "pass",
        "issues": [],
    }
    if path not in seo.CANONICAL_PATHS:
        result["status"] = "fail"
        result["issues"].append("sitemap_path_missing_from_seo_map")
        return result
    if not file_path.exists():
        result["status"] = "fail"
        result["issues"].append("html_file_missing")
        return result

    content = file_path.read_text(encoding="utf-8")
    head = extract_head(content)
    expected_title, expected_description = seo.get_seo(path)
    expected_canonical = f"{seo.BASE_URL}{path}"
    expected_no = seo.BASE_URL + seo.no_equivalent(path)
    expected_en = seo.BASE_URL + seo.en_equivalent(path)

    if head.count("<!-- Static SEO metadata: start -->") != 1:
        result["issues"].append("static_seo_block_count_not_one")
    if head.count("<title") != 1:
        result["issues"].append("title_count_not_one")
    if f"<title>{expected_title}</title>" not in head:
        result["issues"].append("title_mismatch")
    if f'name="description" content="{expected_description}"' not in head:
        result["issues"].append("description_mismatch")
    if f'rel="canonical" href="{expected_canonical}"' not in head:
        result["issues"].append("canonical_mismatch")
    if f'hreflang="nb-NO" href="{expected_no}"' not in head:
        result["issues"].append("hreflang_nb_no_missing_or_mismatch")
    if f'hreflang="no" href="{expected_no}"' not in head:
        result["issues"].append("hreflang_no_missing_or_mismatch")
    if f'hreflang="en" href="{expected_en}"' not in head:
        result["issues"].append("hreflang_en_missing_or_mismatch")
    if 'hreflang="x-default" href="https://www.vitacoat.no/"' not in head:
        result["issues"].append("hreflang_x_default_missing")

    result["title"] = expected_title
    if result["issues"]:
        result["status"] = "fail"
    return result


def sitemap_paths() -> list[str]:
    root = ET.parse(SITEMAP).getroot()
    paths = []
    for loc in root.findall("sm:url/sm:loc", NS):
        if loc.text:
            paths.append(loc_to_path(loc.text.strip()))
    return paths


def main() -> int:
    paths = sitemap_paths()
    pages = [check_page(path) for path in paths]
    failed = [p for p in pages if p["status"] != "pass"]
    report = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "scope": "All canonical public URLs listed in sitemap.xml",
        "total_sitemap_urls": len(paths),
        "passed": len(paths) - len(failed),
        "failed": len(failed),
        "all_pages_have_static_seo": len(failed) == 0,
        "pages": pages,
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: report[k] for k in ["total_sitemap_urls", "passed", "failed", "all_pages_have_static_seo"]}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

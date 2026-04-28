#!/usr/bin/env python3
"""Audit VitaCoat static SEO coverage against sitemap.xml.

This script validates every URL listed in sitemap.xml against the generated raw
HTML head metadata. It audits only public canonical sitemap URLs. Legacy pages
outside the sitemap are not treated as canonical SEO targets.
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

    checks = [
        (head.count("<!-- Static SEO metadata: start -->") == 1, "static_seo_block_count_not_one"),
        (head.count("<title") == 1, "title_count_not_one"),
        (f"<title>{expected_title}</title>" in head, "title_mismatch"),
        (f'name="description" content="{expected_description}"' in head, "description_mismatch"),
        (f'rel="canonical" href="{expected_canonical}"' in head, "canonical_mismatch"),
        (f'hreflang="nb-NO" href="{expected_no}"' in head, "hreflang_nb_no_missing_or_mismatch"),
        (f'hreflang="no" href="{expected_no}"' in head, "hreflang_no_missing_or_mismatch"),
        (f'hreflang="en" href="{expected_en}"' in head, "hreflang_en_missing_or_mismatch"),
        ('hreflang="x-default" href="https://www.vitacoat.no/"' in head, "hreflang_x_default_missing"),
    ]
    for ok, issue in checks:
        if not ok:
            result["issues"].append(issue)

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
    summary = {k: report[k] for k in ["total_sitemap_urls", "passed", "failed", "all_pages_have_static_seo"]}
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    if failed:
        print("Static SEO audit failed for:")
        for page in failed:
            print(f"- {page['path']}: {', '.join(page['issues'])}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

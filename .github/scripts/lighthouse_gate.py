#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from urllib.parse import urljoin
import argparse
import json
import re
import subprocess

LIGHTHOUSE_VERSION = "13.5.0"
PAGES = [
    ("home-no", "/"),
    ("home-en", "/en/"),
    ("contact-no", "/contact/"),
    ("downloads-en", "/en/technical-support/downloads/"),
]
MODES = ("mobile", "desktop")
CATEGORY_MINIMUMS = {
    "performance": 0.90,
    "accessibility": 0.95,
    "best-practices": 0.95,
    "seo": 0.95,
}
METRIC_MAXIMUMS = {
    "largest-contentful-paint": 2500.0,
    "cumulative-layout-shift": 0.10,
    "total-blocking-time": 200.0,
}

def safe_name(value: str) -> str:
    return re.sub(r"[^a-z0-9._-]+", "-", value.lower()).strip("-")

def run_lighthouse(url: str, output: Path, mode: str) -> None:
    cmd = [
        "npx", "--yes", f"lighthouse@{LIGHTHOUSE_VERSION}", url,
        "--quiet",
        "--output=json",
        f"--output-path={output}",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
    ]
    if mode == "desktop":
        cmd.append("--preset=desktop")
    subprocess.run(cmd, check=True)

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://127.0.0.1:8000")
    parser.add_argument("--output-dir", default="qa/lighthouse")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    summary: list[dict] = []

    for mode in MODES:
        for label, path in PAGES:
            url = urljoin(args.base_url.rstrip("/") + "/", path.lstrip("/"))
            report_path = output_dir / f"{safe_name(label)}-{mode}.json"
            try:
                run_lighthouse(url, report_path, mode)
            except subprocess.CalledProcessError as exc:
                failures.append(f"{label}/{mode}: Lighthouse command failed with exit code {exc.returncode}")
                continue

            data = json.loads(report_path.read_text(encoding="utf-8"))
            categories = data.get("categories", {})
            audits = data.get("audits", {})
            row = {"page": label, "path": path, "mode": mode, "categories": {}, "metrics": {}}

            for category, minimum in CATEGORY_MINIMUMS.items():
                score = categories.get(category, {}).get("score")
                row["categories"][category] = score
                if score is None or score < minimum:
                    failures.append(f"{label}/{mode}: {category} score {score!r} below {minimum:.2f}")

            for audit_id, maximum in METRIC_MAXIMUMS.items():
                value = audits.get(audit_id, {}).get("numericValue")
                row["metrics"][audit_id] = value
                if value is None or value > maximum:
                    failures.append(f"{label}/{mode}: {audit_id} {value!r} exceeds {maximum}")

            summary.append(row)
            scores = ", ".join(f"{k}={v:.0%}" for k, v in row["categories"].items() if isinstance(v, (int, float)))
            metrics = row["metrics"]
            print(
                f"{label}/{mode}: {scores}; "
                f"LCP={metrics.get('largest-contentful-paint')} ms, "
                f"CLS={metrics.get('cumulative-layout-shift')}, "
                f"TBT={metrics.get('total-blocking-time')} ms"
            )

    (output_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    if failures:
        print("VitaCoat Lighthouse gate FAILED")
        for failure in failures:
            print("- " + failure)
        return 1

    print(
        "VitaCoat Lighthouse gate passed: representative Norwegian/English pages met category budgets "
        "and lab LCP/CLS/TBT thresholds on mobile and desktop. INP remains a field metric and is not inferred from Lighthouse."
    )
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

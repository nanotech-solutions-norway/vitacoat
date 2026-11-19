#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from urllib.parse import urljoin
import argparse
import json
import math
import os
import re
import subprocess

LIGHTHOUSE_VERSION = "13.6.0"
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
    parser.add_argument(
        "--home-no-mobile-repeats",
        type=int,
        default=3,
        help="Sequential same-job samples for the variable Norwegian mobile homepage LCP gate.",
    )
    parser.add_argument(
        "--advisory-performance",
        action="store_true",
        help="Keep original performance/LCP/CLS/TBT limits as visible advisory warnings; evidence, accessibility, best practices and SEO stay mandatory.",
    )
    args = parser.parse_args()
    if args.home_no_mobile_repeats < 1:
        parser.error("--home-no-mobile-repeats must be at least 1")

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    performance_advisories: list[str] = []
    summary: list[dict] = []

    for mode in MODES:
        for label, path in PAGES:
            repeats = args.home_no_mobile_repeats if label == "home-no" and mode == "mobile" else 1
            for sample in range(1, repeats + 1):
                url = urljoin(args.base_url.rstrip("/") + "/", path.lstrip("/"))
                repeat_suffix = "" if sample == 1 else f"-repeat-{sample}"
                report_path = output_dir / f"{safe_name(label)}-{mode}{repeat_suffix}.json"
                try:
                    run_lighthouse(url, report_path, mode)
                except subprocess.CalledProcessError as exc:
                    failures.append(
                        f"{label}/{mode} sample {sample}/{repeats}: Lighthouse command failed "
                        f"with exit code {exc.returncode}"
                    )
                    continue

                data = json.loads(report_path.read_text(encoding="utf-8"))
                categories = data.get("categories", {})
                audits = data.get("audits", {})
                if label in {"home-no", "home-en"} and mode == "mobile":
                    # Report the measured LCP element and its load phases without
                    # relaxing any budget or exposing personal data.
                    insight_ids = (
                        "largest-contentful-paint-element",
                        "lcp-discovery-insight",
                        "lcp-phases-insight",
                        "lcp-breakdown-insight",
                        "image-delivery-insight",
                    )
                    for insight_id in insight_ids:
                        insight = audits.get(insight_id)
                        if not insight:
                            continue
                        excerpt = {
                            "title": insight.get("title"),
                            "displayValue": insight.get("displayValue"),
                            "details": insight.get("details"),
                        }
                        print(
                            f"LCP diagnostic {insight_id}: "
                            + json.dumps(excerpt, ensure_ascii=False)[:2400]
                        )
                    print(
                        "LCP-related audit ids: "
                        + ", ".join(k for k in audits if "lcp" in k.lower() or "largest-contentful" in k.lower())
                    )
                    long_tasks = audits.get("long-tasks", {}).get("details", {}).get("items", [])
                    durations = [task.get("duration") for task in long_tasks if isinstance(task.get("duration"), (int, float))]
                    fcp_value = audits.get("first-contentful-paint", {}).get("numericValue")
                    lcp_value = audits.get("largest-contentful-paint", {}).get("numericValue")
                    lcp_fcp_gap = (
                        round(lcp_value - fcp_value, 2)
                        if isinstance(lcp_value, (int, float)) and isinstance(fcp_value, (int, float))
                        else None
                    )
                    print(
                        "LCP run context: "
                        + json.dumps(
                            {
                                "sample": sample,
                                "samples": repeats,
                                "benchmarkIndex": data.get("environment", {}).get("benchmarkIndex"),
                                "firstContentfulPaintMs": fcp_value,
                                "largestContentfulPaintMs": lcp_value,
                                "lcpMinusFcpMs": lcp_fcp_gap,
                                "mainThreadWorkMs": audits.get("mainthread-work-breakdown", {}).get("numericValue"),
                                "longTaskCount": len(long_tasks),
                                "longestTaskMs": max(durations, default=None),
                            },
                            ensure_ascii=False,
                        )
                    )
                row = {"page": label, "path": path, "mode": mode, "sample": sample, "samples": repeats, "categories": {}, "metrics": {}}

                for category, minimum in CATEGORY_MINIMUMS.items():
                    score = categories.get(category, {}).get("score")
                    row["categories"][category] = score
                    if not isinstance(score, (int, float)) or not math.isfinite(score):
                        failures.append(f"{label}/{mode} sample {sample}: invalid {category} score {score!r}")
                    elif score < minimum:
                        message = f"{label}/{mode} sample {sample}: {category} score {score!r} below {minimum:.2f}"
                        if args.advisory_performance and category == "performance":
                            performance_advisories.append(message)
                        else:
                            failures.append(message)

                for audit_id, maximum in METRIC_MAXIMUMS.items():
                    value = audits.get(audit_id, {}).get("numericValue")
                    row["metrics"][audit_id] = value
                    if not isinstance(value, (int, float)) or not math.isfinite(value):
                        failures.append(f"{label}/{mode} sample {sample}: invalid {audit_id} value {value!r}")
                    elif value > maximum:
                        message = f"{label}/{mode} sample {sample}: {audit_id} {value!r} exceeds {maximum}"
                        if args.advisory_performance:
                            performance_advisories.append(message)
                        else:
                            failures.append(message)

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

    expected_count = len(PAGES) * len(MODES) + (args.home_no_mobile_repeats - 1)
    if len(summary) != expected_count:
        failures.append(
            f"Lighthouse evidence incomplete: expected {expected_count} measurements, found {len(summary)}"
        )

    monitoring_status = {
        "policy": "performance_advisory" if args.advisory_performance else "strict",
        "performance_advisories": performance_advisories,
        "blocking_failures": failures,
        "measurements": len(summary),
        "expected_measurements": expected_count,
        "category_minimums_unchanged": CATEGORY_MINIMUMS,
        "metric_maximums_unchanged": METRIC_MAXIMUMS,
        "first_no_mobile_sample_preserved": any(
            x["page"] == "home-no" and x["mode"] == "mobile" and x["sample"] == 1
            for x in summary
        ),
    }
    (output_dir / "monitoring_status.json").write_text(
        json.dumps(monitoring_status, indent=2), encoding="utf-8"
    )

    if args.advisory_performance:
        for message in performance_advisories:
            print("::warning title=Lighthouse performance advisory::" + message)
        job_summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if job_summary:
            with Path(job_summary).open("a", encoding="utf-8") as stream:
                stream.write("## Lighthouse monitoring — performance advisory, no budget changes\n\n")
                stream.write(
                    "The original **90% performance / 2500 ms LCP / 0.10 CLS / 200 ms TBT** "
                    "limits are unchanged. Every required first-cold sample remains included. "
                    "Performance overruns are **WARNINGS, not proof of a pass**. "
                    "Accessibility, best practices, SEO and missing evidence remain blocking.\n\n"
                )
                if performance_advisories:
                    for item in performance_advisories:
                        stream.write(f"- WARNING: {item}\n")
                else:
                    stream.write("- All performance budgets met in this run.\n")
                if failures:
                    stream.write("\n**Blocking Lighthouse failures:**\n")
                    for item in failures:
                        stream.write(f"- FAIL: {item}\n")

    if failures:
        print("VitaCoat Lighthouse mandatory evidence/category gate FAILED")
        for failure in failures:
            print("- " + failure)
        return 1

    if performance_advisories:
        print(
            "VitaCoat Lighthouse MONITOR WARNING: original performance budgets exceeded; "
            "all raw samples retained, no threshold or average-based waiver. "
            "Mandatory evidence/category checks passed."
        )
        return 0

    print(
        "VitaCoat Lighthouse gate passed: representative Norwegian/English pages met category budgets "
        "and lab LCP/CLS/TBT thresholds on mobile and desktop. INP remains a field metric and is not inferred from Lighthouse."
    )
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

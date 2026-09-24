#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
from urllib.parse import urlparse
import json, os

manifest_path = Path("lhci-reports/manifest.json")
if not manifest_path.exists():
    raise SystemExit("Lighthouse manifest not found")

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
rows = []
for item in manifest:
    if not item.get("isRepresentativeRun"):
        continue
    result = json.loads(Path(item["jsonPath"]).read_text(encoding="utf-8"))
    cats = result.get("categories", {})
    audits = result.get("audits", {})
    def score(name):
        value = cats.get(name, {}).get("score")
        return "-" if value is None else f"{value * 100:.0f}"
    def metric(name, divisor=1):
        value = audits.get(name, {}).get("numericValue")
        return "-" if value is None else f"{value / divisor:.0f}"
    cls = audits.get("cumulative-layout-shift", {}).get("numericValue")
    rows.append([
        urlparse(item["url"]).path or "/",
        score("performance"), score("accessibility"), score("best-practices"), score("seo"),
        metric("largest-contentful-paint"), metric("total-blocking-time"),
        "-" if cls is None else f"{cls:.3f}"
    ])

header = "| Path | Perf | A11y | Best | SEO | LCP ms | TBT ms | CLS |\n|---|---:|---:|---:|---:|---:|---:|---:|"
lines = [header] + ["| " + " | ".join(row) + " |" for row in rows]
output = "\n".join(lines)
print(output)

summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
if summary_path:
    with open(summary_path, "a", encoding="utf-8") as handle:
        handle.write("## Lighthouse representative runs\n\n" + output + "\n")

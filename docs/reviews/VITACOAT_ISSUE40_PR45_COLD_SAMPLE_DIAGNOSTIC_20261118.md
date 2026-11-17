# VitaCoat — Issue #40: PR #45 First-Cold Lighthouse Diagnostic (18/11/2026, 00:47 · Europe/Madrid)

**Work ID:** `VITA-IMPROVEMENTS-20261031-01` · **Status:** QUALITY_GATES_FAILED / INVESTIGATION_PEND / NO_MERGE / NO_DEPLOY
**Owner authority:** 18.11.2026 “Proceed as recommended” resumed *unchanged* Issue #40 quality checks for the exact approved NO/EN About candidate. No authority to weaken thresholds, ignore any cold sample, merge, publish new claims, access Formspree or deploy.
**Current candidate:** [draft PR #45](https://github.com/nanotech-solutions-norway/vitacoat/pull/45), commit `2abbb456a9fc74bc0eac8410b88836f1a0b9ddb3`, exactly three source changes over production main `de4bba618f421cca7023ceb2aa9b60e854960228`. This diagnostic lives **only on the existing review branch**, not in the three-file release candidate.

## Evidence and provenance

| Source | Immutable reference | What can be verified |
| --- | --- | --- |
| GitHub Actions standard PR quality run | [Run 44201335356](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44201335356) | Job `134455902941` Lighthouse FAILED, original thresholds intact |
| Original Lighthouse JSON evidence | [GitHub artifact 14381003910](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44201335356/artifacts/14381003910) | ZIP `lighthouse-2ffb7f25d1feb32ece6fecf3bb8f1f9072067ca9`, 11 JSON files; downloaded copy SHA256 `8368d812d8bd4762065a84cc2373423b878484df46d05e4b7918834851f1c984` |
| First-cold log | [Lighthouse lab budgets job](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44201335356/job/134455902941) | `home-no/mobile: total-blocking-time 266 exceeds 200.0` |
| Prior reproduced incident | [Issue #40](https://github.com/nanotech-solutions-norway/vitacoat/issues/40) | Same first Norwegian mobile cold-sample TBT failure class at 516.5 and 259.2 ms |
| Original acceptance controls | `.github/workflows/production-quality.yml` blob `7b6d14b4a68f97094adb58bd5efafe2a5ac3e33b`; production handoff `e99033a5dfb1b10f2e24001bb2d62692e14a5d32` | Performance ≥90%, LCP ≤2500ms, CLS ≤0.10, TBT ≤200ms; original a11y/SEO/quality budgets unchanged |

## First-cold versus same-source samples

| Metric | 1: cold NO mobile | 2: warm NO mobile | 3: warm NO mobile | Gate |
| --- | ---: | ---: | ---: | --- |
| Total Blocking Time | **266 ms / FAIL** | 0 ms | 0 ms | **≤200 ms for every required sample** |
| Performance score | 94% / PASS | 100% | 100% | ≥90% |
| LCP | 1728.44 ms | 1728.41 ms | 1576.65 ms | ≤2500 ms |
| CLS | 0 | 0 | 0 | ≤0.10 |
| Main-thread work | **1714.56 ms** | 406.42 ms | 310.69 ms | Diagnostic, not published acceptance budget |
| Style & Layout | **610.67 ms** | 116.51 ms | 75.48 ms | Diagnostic |
| Other work | **885.86 ms** | 228.85 ms | 189.68 ms | Diagnostic |
| Script Evaluation | 89.45 ms | 17.11 ms | 27.16 ms | Diagnostic |
| Chromium benchmarkIndex (from Actions log) | 3036.5 | 4441.5 | 4083.5 | Context only, hardware variability |

**Only the first sample fails**, and it must remain part of the decision. Passing the second and third samples does not waive the threshold. Eight other page/mode combinations in this run's Lighthouse report passed their own measured budgets.

## First-cold long-task attribution

Original `home-no-mobile.json` `audits.long-tasks.details.items`:
| Duration | Source attributed by Lighthouse |
| ---: | --- |
| 253 ms | Local homepage `http://127.0.0.1:8000/` |
| 139 ms | Unattributable |
| 135 ms | `/assets/js/site.js` |
| 122 ms | Unattributable |
| 50 ms | Unattributable |

Second sample has **zero** reported long tasks; third sample has one 62 ms unattributable task. Long-task durations alone must not be summed to claim exact TBT causation because TBT measures the portion exceeding 50 ms and the report also includes scoring/trace context.

## Technical assessment and limitations

1. The candidate modifies the **About pages and scoped CSS** only. The Lighthouse failure was on the **Norwegian homepage** `/`, not the new About pages. This supports an existing cold-run/runner or common startup issue; however a changed global stylesheet can affect shared parsing, so regression/exoneration is **not proven** from filenames alone.
2. The substantial cold-to-warm main-thread/style/layout and benchmarkIndex changes are consistent with possible runner contention, cache/browser initialization or startup sensitivity. **Root cause remains UNVERIFIED**; no assertion that GitHub is conclusively at fault.
3. The explicit `site.js`-attributed 135 ms long task and 253 ms homepage-attributed task warrant examining the trace and script/layout scheduling before any code modification. The script alone is not shown to account for the 266 ms TBT.
4. The GitHub artifact includes report JSON, not necessarily a full Chrome CPU-profile trace for independent attribution; if no adequate trace exists, request a diagnostic reproduction capturing raw trace and runner context **under separately bounded test authority**, not an unbounded retry.
5. PR #45 is intentionally DRAFT. The default Pages PR workflow performed **build only**; `deploy` and `production-acceptance` jobs were SKIPPED. No deployment or production rewrite took place.

## Controlled next engineering decision

- **Investigate first-sample environment and trace**: compare cold/warm browser initialization, benchmarkIndex and main-thread tasks on the **same SHA** with original budgets. Archive failures separately; avoid replacing first samples with an average or median.
- If a reproducible application hot path is identified, propose a **minimal isolated code fix** with source revision and before/after measurement; do not change scripts/thresholds until independently reviewed and authorized.
- If hardware-specific instability is substantiated, propose a **costed isolated-runner/methodology change** through Issue #40 for explicit owner approval. No purchase, runner config or measurements-method change is preapproved.
- **No blind rerun now.** A single passing rerun would not demonstrate deterministic cold-start acceptance, so any repeat must have a stated hypothesis and preserved raw samples.
- **Release state:** Issue #40 remains OPEN with CI failure. Issue #43 qualified current-product BPR/SDS/report rights and exact marketing-claim signoff remain independently unverified; Issue #44 Formspree remains OWNER HOLD. No PR merge, Pages deployment, DNS, confidential transfer or product efficacy claim is permitted under this review-only run.

**Source governance:** E137–E139 in the existing [canonical workstream ledger](../workstreams/VITA_IMPROVEMENTS_20261031_01.md). This diagnostic is a derived record, **not** a second authoritative ledger. No regulated efficacy or product-law approval is stated.
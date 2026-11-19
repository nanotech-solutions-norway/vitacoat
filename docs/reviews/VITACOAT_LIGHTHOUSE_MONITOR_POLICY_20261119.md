# VitaCoat — Lighthouse Performance Advisory Policy (01:26, 19.11.2026 · Europe/Madrid)

**Work ID:** `VITA-IMPROVEMENTS-20261031-01` · **Status:** OWNER_APPROVED_POLICY / STAGED_FOR_PR_TEST / NOT_PRODUCTION
**Authority:** Owner on 19.11.2026: “Use Lighthouse as recommended. Proceed with the next steps”, after recommendation to retain free Lighthouse performance monitoring but not block all website updates on an unstable synthetic cold-start performance value. Keep other required security, accessibility, SEO and browser tests. This is an owner-approved *scoped* release measurement policy change, not qualified efficacy/BPR/SDS approval or full production release authorization.
**Source:** Original strict production quality `production-quality.yml`, CLI `lighthouse_gate.py`, production handoff and Issue #40; source experiment stays on PR #45 until approved and merged.

## Before / after controls

| Control | Former behavior | Owner-approved staged behavior |
| --- | --- | --- |
| Lighthouse version/samples and first-cold NO homepage mobile sample | Pinned 13.6.0, 10 reports | **UNCHANGED**, first sample retained |
| Performance score at least 0.90 | Numeric failure blocks CI | **Same limit**, warning and evidence |
| LCP at most 2500 ms | Blocks CI | **Same limit**, warning and evidence |
| CLS at most 0.10 | Blocks CI | **Same limit**, warning and evidence |
| TBT at most 200 ms | Blocks CI | **Same limit**, warning and evidence |
| Lighthouse accessibility/best-practices/SEO at least 0.95 | Mandatory | **MANDATORY**, unchanged |
| Lighthouse missing, incomplete or invalid evidence | Mandatory failure | **MANDATORY**, 10 expected reports checked |
| Static SEO / accessibility / frontend / release audit | Mandatory | **MANDATORY**, unchanged |
| Browser smoke Chromium/Firefox/WebKit | Mandatory | **MANDATORY**, unchanged |
| Security baseline / dependency / CodeQL | Mandatory | **MANDATORY**, unchanged |
| Product claims and Formspree hold | Independent | **UNCHANGED** |

## Mechanism and auditability

- Existing `.github/scripts/lighthouse_gate.py` retains **strict default**. Opt-in `--advisory-performance` routes only quantitative performance score, LCP, CLS and TBT overshoots into recorded **advisories**. Missing/invalid readings, Lighthouse invocation errors and accessibility/best-practices/SEO threshold violations still block.
- Existing workflow keeps its Lighthouse job/check identity and all separate jobs. It explicitly passes advisory CLI flag on PR/push, preserving `if: always()` evidence upload and 14-day original raw-report retention. No broad job-level `continue-on-error` waiver.
- The artifact adds `monitoring_status.json` recording mode, all warnings and blocking failures, expected/actual sample count and original numeric thresholds. Every warning is printed as a GitHub annotation and in `GITHUB_STEP_SUMMARY`. A successful monitor check **does not certify that performance scores passed**.
- Strict manual CLI usage without flag retains the original failure behavior. First-cold TBT still counted and reported, never discarded or replaced with a median.

## Original failed run, separation and next decision

Draft PR #45 original quality [run 44201335356](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44201335356) remains immutable FAILED: first Norwegian homepage/mobile TBT 266 ms (200 ms limit), following two samples TBT 0 ms each. Root cause of cold-start variance unverified; no retroactive reinterpretation of that run. Owner-approved policy change will be tested on a **new source SHA** via PR synchronize; do not blindly rerun old SHA. If advisory warnings arise, the owner must review material performance risk at final release. No automated claim of `PASS all budgets`.

**Release controls:** PR #45 remains DRAFT/DO NOT MERGE pending source-specific Issue #43 qualified product claims, BPR/SDS/CLP and historic report publication rights. Issue #44 Formspree owner HOLD remains. Issue #40 retains investigation responsibility, even if advisory-mode workflow passes. No direct main commit, website deployment, DNS change, provider activity or public regulated claims.

**Access gap:** GitHub main branch protection inspection yielded `403 Resource not accessible by integration`; required-check configuration **UNKNOWN**. Do not claim bypass or verified merge eligibility.

**Verification:** Compare exact candidate Git blobs/paths, inspect workflow/job result and `monitoring_status.json`, verify that original 10 samples and first cold sample exist, and independently read back all provider mutations and append final canonical E141 workstream event. The canonical ledger remains `docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md` on its original review branch; this report is a derived policy explanation.

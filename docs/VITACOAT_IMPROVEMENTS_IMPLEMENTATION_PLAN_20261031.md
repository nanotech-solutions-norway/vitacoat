# VitaCoat — Controlled Improvements Implementation Plan
12:16, 31.10.2026 · Europe/Madrid

**Classification:** PREPARED / PENDING_REVIEW
**Work ID:** VITA-IMPROVEMENTS-20261031-01
**Canonical event log:** [VITA_IMPROVEMENTS_20261031_01.md](workstreams/VITA_IMPROVEMENTS_20261031_01.md)
**Repository:** `nanotech-solutions-norway/vitacoat`
**Verified main baseline:** `317c0ac1ce98c8c27cc28ba14f9e71fb10bbcae0` (merged PR #26)
**Public website:** https://www.vitacoat.no/ and https://www.vitacoat.no/en/

## 1. Executive go/no-go

- **GO — preparation:** isolated GitHub feature branches, diagnostics and synthetic local tests, read-only evidence/register reconciliation, draft PRs, normal CI, and neutral content/visual design mock-ups.
- **HOLD — unapproved external effects:** production merge or deploy; public claim expansion; publication or substitution of SDS/TDS/third-party reports; Formspree live delivery tests, notifications, CRM export or retention changes; Search Console/Bing ownership submission; analytics/cookies; registrar/DNS; real customer data or new third-party services.
- **Evidence integrity:** Current brand **VitaCoat**; historical **Citrox/Citrox Protect** is provenance, not proven product/formulation equivalence. 2020 and 2022 campaigns remain distinct. Marketing claims must be supported by the actual tested sample, report ID, method, date, contact time and current formulation linkage.
- **Production status:** PR #26 deployed and live acceptance passed, but main `Production quality gates` run [41196166867](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41196166867) FAILED on NO/mobile LCP **2618.8331 ms** (budget **≤2500 ms**); earlier PR candidate [41186414014](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41186414014) FAILED NO/mobile LCP **2576.8499 ms**. Other browser engines, CodeQL and security passed. The preceding merged PR #25 had passed the same LCP budget, demonstrating variability. Stabilizing the gate is P0. Do not assert full quality acceptance for the PR #26 commit.

## 2. Ordered work packages

| Work item | Priority | Status now | Executable engineering work | Independent acceptance / evidence | Approval boundary |
|---|---|---|---|---|---|
| **VC-IMP-00 — Mobile LCP repeatability** | P0 | READY_FOR_SCOPED_ENGINEERING | Inspect generated NO/EN hero, identify the real Lighthouse LCP element and breakdown; compare font loading and responsive media with English counterpart; collect bounded repeated identical-commit runs; make targeted image/critical-render-path adjustments only if measurements support them. Candidate source: `.github/scripts/lighthouse_gate.py`, `.github/scripts/build_site.py`, `assets/css/styles.css`, homepage HTML. | Keep current 2500 ms LCP, 0.10 CLS, 200 ms TBT and existing score budgets. All existing Lighthouse page/mode checks, Chromium/Firefox/WebKit, frontend, SEO, security and CodeQL pass. Capture repeated mobile NO tests; do not hide failures behind a mean/median. Then merge/production-accept separately. | No threshold relaxation or bypass; approved source PR only. |
| **VC-IMP-01 — Contact-flow synthetic QA** | P1 | READY_FOR_SCOPED_ENGINEERING | Add mocked `fetch`/route tests to `assets/js/formspree-contact.js` and browser suite for NO/EN success, non-2xx JSON error, invalid fields, retry, duplicate click and accessibility feedback. Verify event payload contains no form values and success redirects only after confirmed 2xx. | Synthetic fixture tests and regression CI green; zero live provider submissions; assertions on events and form state. | Separate Formspree provider permission and privacy-controller approval needed for live submission, inbox/notification readback or processor settings. |
| **VC-IMP-02 — Claims/evidence inventory** | P1 | MATRIX_ONLY_READY | Extract NO/EN visible claims and structured data from all 50 canonical pages, downloads, embedded SVG and PDFs list; assign claim ID, URL/language, wording, source/report ID, tested sample/formulation, 2020/2022 campaign, method/contact time, responsible reviewer and state `VERIFIED / QUALIFIED / PENDING_REVIEW`. | Complete bilingual claim matrix with links to existing originals and explicit unresolved evidence, independently cross-checked by technical owner. Historical PDFs unchanged. | Any new efficacy, virucidal, durability, clinical-prevention, formulation-equivalence or service-life public claim held until qualified reviewer approval. |
| **VC-IMP-03 — Technical B2B visual refinement** | P2 | DESIGN_PREP_READY | Prepare a reversible desktop/mobile mock-up with logo-aligned blue/cyan primary and restrained green, fewer SaaS-style rounded cards, stronger proof/provenance bands, localized technical figures, credible application imagery and clear CTA hierarchy; retain semantic/keyboard-accessible navigation. | 360px/1440px screenshot diff, all three browser engines, contrast/accessibility tests, bilingual parity, image licensing/provenance sign-off, visual owner approval. | No unverified report excerpt, synthetic-looking report figure presented as actual evidence, or public production asset swap without copyright and visual approval. |
| **VC-IMP-04 — Controlled scientific/regulatory/privacy review** | P1 gate | PENDING_REVIEW | Prepare indexed decisions for current SDS/TDS, EU/EEA/Norway BPR status, intended-use scope, treated-article claims, historical PDF attribution/publication rights, controller disclosure, retention, provider DPA and contact-form privacy notice. | Business/technical/regulatory/privacy owner records exact approved wording/evidence and revisions, or marks claim OUT_OF_SCOPE. | Specialist approval required. No legal/compliance status or marketing claim inferred from historical reports or frontend disclaimers. |
| **VC-IMP-05 — Search/index and measured outcomes** | P2 | SOURCE_ONLY_READY | Validate sitemap/canonical/hreflang/schema and link health via repository tests, prepare console submission checklist, define approved field CWV/LCP/INP/CLS monitoring and consent-safe measurement events. | Source tests green. Separate readback for GSC/Bing indexing, aggregate real-user p75 metrics and privacy review of any analytics. | Provider/account-side changes require connection, owner approval and readback; no inferred account administration. |
| **VC-IMP-06 — Final multi-device/release sign-off** | P2 | BLOCKED_ON_PRIOR_PACKAGES | Pre-plan test matrix for physical iOS/Android, desktop NO/EN flows, contact fallback, download links, responsive images, keyboard and reduced-motion; record screenshots against approved design and current source revision. | Independent device test evidence and human visual signoff; normal PR merge + live deploy/50-page production acceptance + all quality checks on final SHA. | No automatic release from a green draft preview; owner/reviewer confirms appropriate scope. |

## 3. Implementation sequence, boundaries and branch model

**A. First engineering PR — VC-IMP-00.** From latest verified `main`, create an isolated branch. Write-ahead in this work-ID ledger, record baseline and current error metrics, implement evidence-led LCP diagnostics or optimizations, run source and browser tests, and raise a draft PR. Compare identical source revisions across repeated CI runs; preserve every failing observation. Do not change public wording.

**B. Second engineering PR — VC-IMP-01.** Add synthetic-only failure/success form tests and localized feedback fixes where needed. A mocked Formspree success is **not proof** that the provider delivered email. Live provider testing requires its own approval, connector access and independent inbox readback.

**C. Parallel read-only review — VC-IMP-02/04.** Inventory claims across NO/EN and match historical evidence without altering original source reports. Use Google Drive evidence and ownership data only within approved scope. A preliminary evidence matrix is not a certificate or regulatory decision. Publishing revised claims waits for technical/regulatory sign-off.

**D. Design work — VC-IMP-03.** Produce reviewed prototype/screenshots before branch edits affecting layout; favor localized, claim-neutral visual components and qualified images. Use owner-approved assets and rights.

**E. Account-side and launch — VC-IMP-05/06.** Search/analytics/provider operations can proceed only if available rights and privacy/owner approval exist; final public release follows explicit PR review and all current CI plus live acceptance on the merged SHA.

## 4. Preflight and release checklist

- [ ] Exact current `main` SHA, clean feature branch and changed-file scope verified.
- [ ] Existing approved project handoff and PENDING_REVIEW matrix loaded; any conflicting higher-priority source flagged before edits.
- [ ] Write-ahead ledger entry persisted for each external mutation, with exact authorization, before/after, actor/tool, idempotency, evidence and rollback reference.
- [ ] Source changes are limited to approved task. No direct `main` write; no manual `_site` or DNS edits.
- [ ] Full existing SEO, frontend/a11y, Lighthouse, cross-browser, security, CodeQL and build checks green; do not bypass flaky tests.
- [ ] Reviewer signs off new assets, assertions and any legal/technical claims. Then independently verify merged SHA, deployment and production acceptance.
- [ ] External provider tests logged separately with verified rights, synthetic data and inbox/provider readback; otherwise NOT_VERIFIED.
- [ ] Archive only approved redacted summary/pointer in Drive, never another canonical ledger.

## 5. Owner decision for transition from preparation to implementation

**Recommended route — engineering-first:** Start `VC-IMP-00` (LCP reliability), then `VC-IMP-01` (mock contact QA), while preparing `VC-IMP-02` evidence matrix read-only. These packages can be scoped without widening public claims or touching third-party accounts. A separate implementation instruction or already scoped project authority is required for writing source code; current operator request is preparation only.

**Regulatory/provider route:** Request explicit evidence/legal/processor approval and connected account-side rights before live Formspree, GSC/Bing, personal data, licensing, SDS/TDS, or externally facing claims.

**Pending constraints:** GitHub and NTSN Drive read access verified. VitaCoat Vault project context is empty and `ai-memory-ops/projects/vitacoat/context.md` is PENDING_REVIEW. Formspree, search consoles, registrar and live browser extension session have not been independently authenticated for mutation in this task.

## 6. Progress measurement

There are **seven independently accepted work packages (VC-IMP-00 through VC-IMP-06)**. Each counts as accepted only when its specific evidence and owner gate are met; planning/staged PRs are not counted as completed. Baseline accepted packages: **0/7** for this new improvement program. Historical PR #25/#26 release validation is a predecessor milestone, not new-package completion.

**This document is a proposed implementation plan, not a regulatory approval or production release authorization.**

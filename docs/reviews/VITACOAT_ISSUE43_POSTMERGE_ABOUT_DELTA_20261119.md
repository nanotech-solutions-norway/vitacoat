# VitaCoat — Post-merge Issue #43 claim-scope reconciliation (19/11/2026, 13:39 · Europe/Madrid)

**Status:** READ_ONLY_SOURCE_DELTA_VERIFIED / ORIGINAL_OWNER_VISUAL_APPROVED / QUALIFIED_RELEASE_EVIDENCE_PENDING_REVIEW
**Workstream:** `VITA-IMPROVEMENTS-20261031-01`
**Source release:** [PR #45](https://github.com/nanotech-solutions-norway/vitacoat/pull/45) merged as `96ee0379427cc9f039fe12ed3459dc1532299387` on 19.11.2026. Original main before merge `de4bba618f421cca7023ceb2aa9b60e854960228`.
**Scope:** Source-only reconciliation, not a fresh professional toxicology, regulatory, efficacy, report-rights or legal opinion. No production change requested or made by this record.

## Verified release footprint

[Full commit comparison](https://github.com/nanotech-solutions-norway/vitacoat/compare/de4bba618f421cca7023ceb2aa9b60e854960228...96ee0379427cc9f039fe12ed3459dc1532299387) contains **exactly 7 changes**:
1. `about/index.html`: reviewed native Norwegian technical-review figure, NO process cards, no longer references historic SVG;
2. `en/about/index.html`: reviewed native English matching technical-review figure, no longer references historic SVG;
3. `assets/css/styles.css`: scoped responsive layout and figure styles;
4. `.github/scripts/lighthouse_gate.py` and `.github/workflows/production-quality.yml`: approved Lighthouse performance-advisory implementation, with mandatory a11y/SEO/evidence checks intact;
5. `docs/production-handoff.md` and `docs/reviews/VITACOAT_LIGHTHOUSE_MONITOR_POLICY_20261119.md`: staged governance/scope documentation now on main.

**Unchanged:** `index.html` blob `638153fee013118048aa67d30a8a4932d95b27ff` and `en/index.html` blob `2df0c9d96d988b235168a1678dc9e6a73ca38f0e`. Both already included antimicrobial classification/marketing descriptions before PR #45; the About release did **not** add them. The existing 50-route claim matrix has source revision and `PENDING_REVIEW` status; it must not be mistaken for a signed publication approval.

## Precise claim exposure

| Area | Verified source observation | Evidence class / release interpretation |
| --- | --- | --- |
| Norwegian About graphic | `vc-approved-about-art`, “Teknisk vurdering før spesifikasjon”; three stages Bruksområde, Dokumentasjon, Prosjektavklaring | Owner-approved visual and project-review description; no new six-month statement or new microbiological efficacy figure |
| English About graphic | “Technical review before specification”; intended use, documentation, project review | Owner-approved visual and project-review description; no new numerical antimicrobial duration/performance promise |
| Homepages | Both HTML source Git blobs identical before/after PR #45 | No PR-specific new homepage claim. Existing published home claims still require their independent qualified assessment under #43 |
| Legacy embedded SVG | `assets/img/vitacoat-home-panel.svg` blob `83adcc47e2e9cafd5afa57652300d6766011735e`, retained in main; text includes “EN-backed proof • up to six months” | **PENDING_REVIEW**: removed from new About-page references but still exists in source asset tree; the build copies assets. Whether publicly URL-accessible was **NOT VERIFIED** because direct live URL reading failed; asset removal or quarantine needs separate exact-scope owner-controlled release proposal |
| Historical testing and reports | Original evidence found in earlier controlled primary-source reconciliation and Drive archive; separate 2020/2022 campaigns have different sample identifiers, different methodology/report terms | Primary source files and names do NOT themselves establish approved current finished formulation and authorization or permission to republish original figures. Neither a brand-name change nor owner-attested identity authentication is a signed formulation bridge |
| Approved current hard-surface SDS/TDS and BPR status | Prior G43 pack identified review-only SDS, unresolved actual-mixture CLP/REACH/BPR classification and unsigned current-formulation mapping. Read-only Drive filename discovery found technical archive material but no verified signoff from exact approved authority | Status remains **NOT_INDEPENDENTLY_VERIFIED**; do not assert absence of all documents outside accessible search, but do not certify them by filenames |
| Formspree provider | Issue #44 remains OWNER HOLD | Separate privacy/vendor account issue; no test, DPA action or account access permitted |

## Recent production evidence

- Main [deployment run 44505536043](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44505536043) **SUCCESS**: Pages build, deploy, postdeployment production acceptance; job `135496275744` confirmed **50 canonical URLs returned HTTP 200**, correct canonical/discovery/breadcrumb/document schema/release markers.
- Main [quality run 44505535961](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44505535961) **SUCCESS** on same merge SHA: Lighthouse monitoring and Chromium, Firefox, WebKit. Success does not prove qualified antimicrobial claim clearance or product regulations.
- Original prepolicy [PR run 44201335356](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/44201335356) remains FAILED on first cold NO homepage mobile TBT 266ms >200ms; future trend remains Issue #40, with no default CI rerun or rollback.
- Previous PR WebKit runner install cancellations (run 44430538388 attempts1/2) were Ubuntu system dependency download/timeout, not actual browser test failures. Current main WebKit PASS is stronger applicable source evidence.

## Responsible gates before any new claim / corrective deployment

**G43-TECH:** Exact current finished SiO₂ coating formulation/batch and applicability to historical samples 2020/2022, validated by qualified product owner; review each NO/EN statement (including SVG, SEO/schema and downloadable material) for method, substrate, exposure/contact time, durability and permissible use.

**G43-REG:** Written qualified market-specific determination of current mixture/product under EU/EEA/Norway BPR 528/2012, active substance/product type and authorization status as applicable, and approved current SDS/TDS/CLP/REACH/notification status. Do not assume historic or analogous product compliance transfers.

**G43-RIGHTS:** Exact issuer/lab rights and written permission for reproducing/reissuing historical full reports, charts and sponsor branding; owner-attested in-person identity authentication already accepted and must not be re-requested.

**G43-CLAIMS:** Separate product owner/legal signoff recording permitted Norwegian/English public wording and exact source revision for each affected claim; prior visual approval is final for unchanged design but is NOT a specialist claim-release authorization.

**G43-ASSET:** Verify reference and static build inclusion of the legacy `vitacoat-home-panel.svg` against the current production source and direct HTTP access using authorized environment. If unlinked but deployed with unsupported marketing wording, prepare a removal/quarantine-only PR as **PENDING_REVIEW**; avoid silent deletion or altering tested claims without approval and repeat full release gates.

**G44:** Maintain separate Formspree account/provider hold unchanged.

## Decision and next handoff

**No immediate rollback recommended solely on this verified source comparison:** main deployment and complete quality test passed, and new About compositions are neutral. However **do not close Issue #43** or claim public antimicrobial performance is qualified solely because PR #45 merged. Product/copyright/regulatory review remains outstanding. Legacy SVG exact public accessibility remains UNKNOWN; this is a review item, not a proven live exposure. Preserve historical independent issue evidence and review signoffs without unnecessary repeated authentication or correspondence.

The derived source-scope report and any Issue #43 comment are audit evidence, not a second canonical workstream ledger. Canonical events E144–E145 reside in `docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md` on held review branch.

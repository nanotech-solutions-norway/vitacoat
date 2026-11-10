# VitaCoat — Non-Lighthouse continuation and evidence-controlled QA
**Prepared:** 09/11/2026, 09:40 · Europe/Madrid
**Status:** PENDING_REVIEW / SOURCE CORRECTION STAGED / NO PUBLIC RELEASE
**Owner direction:** Retain existing GitHub account and runner; do not proceed with Lighthouse now.
**Work ID:** `VITA-IMPROVEMENTS-20261031-01`
**Production source readback:** `main@de4bba618f421cca7023ceb2aa9b60e854960228` (PR #35 merged)
**Working branch:** `vc-nonlighthouse-content-review-20261109` (no pull request created; no Actions workflows dispatched).
**Authorities:** approved `docs/production-handoff.md`, `ai-memory-ops/memory/global_rules.yaml`, `ai-memory-ops/protocols/operational_event_logging_rollback_CURRENT.md`. Earlier `docs/VITACOAT_IMPROVEMENTS_IMPLEMENTATION_PLAN_20261031.md` is PENDING_REVIEW; use for sequencing, not automatic claim or deployment permission.

## 1. Verified current status and non-Lighthouse execution scope

- GitHub main advanced to `de4bba618f421cca7023ceb2aa9b60e854960228` through PR #35, adding `docs/research/AQUACULTURE_LITERATURE_SCREEN_2026-11-04.md`. It is internal scientific screening, not new evidence of finished-coating efficacy.
- Already-existing main GitHub Actions quality, security, CodeQL and GitHub Pages runs returned success on this source revision; **this session did not initiate any Lighthouse or other CI runs**.
- The experimental first-sample Lighthouse issue #40 is **PAUSED BY OWNER / OPEN**. Do not create new LH investigations or paid runner configurations; original budgets and workflow stay unchanged.
- Old draft PR #34 `test: isolate Lighthouse homepage sample order` was open with unmerged LH 13.5 trace/order changes stacked over old PR #33. It is now closed, NOT MERGED, preserving historic evidence on its branch. No workflow was dispatched to close it.

## 2. Exact low-risk text changes staged in `about/index.html`

| Before (NO) | After (NO) | Reason |
|---|---|---|
| Brand, nettsted og teknisk dokumentasjon har ulike roller | Merkevare, nettsted og teknisk dokumentasjon har ulike roller | Natural Norwegian |
| Produkt-/brandlaget som beskriver ... | Produkt- og merkevareinformasjonen som beskriver ... | Remove code-switched branding jargon |
| Claim boundaries (button linking to `/legal/`) | Rammer for produktpåstander | Make Norwegian CTA readable |
| Due diligence (eyebrow) | Dokumentasjonskontroll | Appropriate Norwegian label |

No efficacy claim, technical value, page link/href, English content, visual asset, navigation structure, or metadata was changed. Readback of the exact branch file is required before closure. This is staged on an unmerged branch, not published.

## 3. Critical embedded-artwork claim gap — PENDING_REVIEW (no image alteration)
**Affected source:** `assets/img/vitacoat-home-panel.svg`, blob `83adcc47e2e9cafd5afa57652300d6766011735e` as of `main@de4bba`. Referenced in the `hero-media` of BOTH `about/index.html` (NO) and `en/about/index.html` (EN). In the rendered SVG itself, not in an HTML alt string:
- Exact text: `Validated technical themes`.
- Exact text: `EN-backed proof • up to six months • hard, non-porous surfaces`.
- The same shared visual also embeds the English heading `Persistent Hygienic Protection`, so the NO page displays untranslated English graphic copy.

**Risk:** This presents “validated” and “six months” as product-level proof on a current-brand image while the current-formulation linkage, laboratory sample matching, permitted public efficacy/durability wording and publication rights are still pending specialist review. The 01.11.2026 bilingual 50-route claim matrix notes that actual embedded SVG text was not inspected; an HTML-only content review misses this public statement. This is a **source-level finding**, not a newly established regulatory violation.

**HOLD:** Do not silently transfer historical Citrox/Citrox Protect data to today's marketed VitaCoat. Do not infer that ingredient study evidence for Citrox, Auranta 3009 or AuraAqua proves current finished SiO₂ coating efficacy. Do not create new six-month claims or alter visual artwork pending technical/regulatory/branding owner sign-off. Preferred owner-reviewed remediation is a **neutral, fully localized NO/EN diagram** with no quantitative duration claim, or removal of the unqualified phrase, retaining accessible appropriate alt/heading context and visual parity. An actual SVG/source visual alteration is outside this session's approval.

**Reviewer-required evidence:** current finished formulation/batch identifier; exact 2020/2022 report and sample; tested substrate; organisms/method and contact time; time-dependent efficacy and durability report under relevant cleaning/abrasion/aging conditions; applicable EU/EEA/NO BPR/treated-article claims classification; approved NO/EN wording; permission to use historical reports/illustrations. Until resolved, status `PENDING_REVIEW`, never VERIFIED.

## 4. Other priority work without Lighthouse
1. **VC-IMP-02/04 — Science and publication rights.** Technical/regulatory owners reconcile claims on NO/EN `/proof/testing-and-standards/`, `/proof/durability/`, `/proof/pathogen-spectrum/`, `/benefits/continuous-protection/`, and downloads against current controlled original evidence. Do not equate historical ingredient studies to current coated-surface performance; distinguish 2020 vs 2022 campaigns.
2. **VC-IMP-01 — Formspree account-side.** Existing synthetic success/failure tests were accepted in PRs #27–29, but real endpoint delivery, processor DPA/retention and owner-approved privacy notice still NOT_VERIFIED. No live form submission without owner/processor rights and redacted synthetic test protocol.
3. **VC-IMP-03 — Visual refinement.** Use only rights-approved VitaCoat photos from Drive as candidates for technical owner review, no unsupported benefit/efficacy labeling, no public image replacement now. Human brand/desktop/mobile acceptance remains distinct from CI checks.
4. **VC-IMP-05/06 — Provider and human signoff.** Search Console/Bing ownership/indexing, iOS/Android physical-device signoff, field p75 Core Web Vitals and compliance approval remain separately NOT_VERIFIED. The owner's Lighthouse pause prevents triggering the repository's normal PR/release checks, therefore **do not open a PR or merge** from this review branch until release QA is explicitly re-enabled. No workaround lowering gates.
5. **Backlog hygiene.** PR #22 (legacy Phase 8), Dependabot PRs #8–#12 require careful current-source review; not closed as part of this scoped language correction. No new runner or billing work.

## 5. Quality/rollback gate
- Exact four source replacements, zero changes to `en/about/index.html`, both existing `href="/legal/"` structure and claims/structured-data schema preserved, no new public product statement.
- Source readback through GitHub branch; confirm `main` untouched; no Actions workflow triggered from branch-only commits.
- Do not merge yet. Any later PR would trigger the existing Lighthouse quality job automatically, contrary to the current operator hold. That future transition requires a fresh explicit owner instruction.
- Rollback is to discard this unmerged branch; source-level production rollback not applicable. Store redacted, approved outcome in canonical GitHub workstream ledger and use Drive only as derivative mirror after folder and write/readback verification.

**Disposition:** Staged language changes: READY_FOR_REVIEW; SVG claim: PENDING_REVIEW (owner action needed); Lighthouse issue #40: PAUSED/OPEN; production deployment: NOT REQUESTED.


## 10.11.2026 implementation supplement — neutral About graphics

**Branch draft only, NOT production and NOT approved public science.** Under the owner's "Proceed as recommended" continuation, prepared two **new** locale-specific SVG assets and replaced only the `about/index.html` and `en/about/index.html` hero image references on unmerged branch `vc-nonlighthouse-content-review-20261109`:

- Norwegian: `/assets/img/vitacoat-about-review-no.svg` with a localized technical-review flow, accessible `alt`, `xml:lang="nb-NO"`.
- English: `/assets/img/vitacoat-about-review-en.svg` with equivalent English process descriptions, accessible `alt`, `xml:lang="en"`.
- Both images are technical decision-workflow diagrams without duration, laboratory-validation or antimicrobial efficacy statements. They do not replace actual approved test reports or current product documentation.
- The original `assets/img/vitacoat-home-panel.svg` remains in the repository as historical audit evidence; the two **staged** About pages no longer reference it, but the source remains on current `main` and production pages until separately approved merge.
- Original source HTML metadata, navigation, contact forms and other URLs are untouched by the image substitution. Static connected GitHub source checks passed for two assets, NO/EN language tags and alt strings. No rendered screenshot, actual-device, independent browser or Lighthouse check was performed. Full visual and regulatory owner sign-off remain **PENDING_REVIEW**.
- Cross-reference `docs/reviews/VITACOAT_REGULATORY_FORM_HANDOFF_PENDING_REVIEW_20261110.md` for BPR classification, claim evidence, Formspree processor and device acceptance gates. No PR opened or GitHub workflow dispatched while Lighthouse issue #40 remains paused.

This supplement supersedes only the earlier statement above that no alternate artwork was yet staged; it does **not** retroactively approve a public source, efficacy representation or release.

# VitaCoat — Legacy SVG build-exclusion preflight (19/11/2026, 16:00 · Europe/Madrid)

**Work ID:** `VITA-IMPROVEMENTS-20261031-01`
**Status:** SOURCE_ONLY_IMPLEMENTATION_STAGED / NO_PR / NO_CI / NO_PRODUCTION_CHANGE
**Decision basis:** Owner 19.11.2026 “Proceed as recommended,” following postmerge Issue #43 source audit; authorizes preparation of a minimally scoped *review* change to exclude historical claim artwork from future site builds, **not** qualified claim signoff, issue closure, external sends or release.

## Verified current production and source evidence

- Production `main@96ee0379427cc9f039fe12ed3459dc1532299387`: PR #45 merged and deployed successfully; live 50-route acceptance and all four Lighthouse/Chromium/Firefox/WebKit quality jobs SUCCESS. Current public URL for the SVG could not be retrieved using the browser tool, so actual direct HTTP availability is **NOT_VERIFIED**.
- `assets/img/vitacoat-home-panel.svg` source Git blob `83adcc47e2e9cafd5afa57652300d6766011735e` contains visible **“EN-backed proof • up to six months”** wording. The two new owner-approved About pages do not reference this SVG.
- Original production `.github/scripts/build_site.py` blob `54adf177e0cc1829b304670f9063f26a552e4d18` copies the complete source `assets` tree into `_site`, and no existing generic SVG omission step was observed. This is **source-based evidence that a normal build includes the legacy file**, not independent proof it was publicly retrievable from the live server.
- GitHub authenticated code-search (three equivalent searches: `vitacoat-home-panel.svg`, `vitacoat-home-panel`, `home-panel.svg`, repository-scoped) found **one reference in the old 50-route claim matrix Markdown**, no references in indexed site HTML/CSS/JS/XML, despite full non-truncated 239-entry main tree.
- New `vc-approved-about-art` native NO/EN About figures contain technical project review stages, not a new quantified antimicrobial duration promise. Existing homepages/marketing claims are unchanged by PR #45, still awaiting qualified decision under #43.

## Scoped candidate prepared (no release)

**Unmerged, non-PR branch:** `vc-legacy-svg-build-exclusion-review-20261119`
**Commit:** `5b152e3be06d30f7bd3092ebdffcf9674b22b66a`
**Base:** current main `96ee0379427cc9f039fe12ed3459dc1532299387`

**Changed path only:** `.github/scripts/build_site.py` new blob `4a2afaf5c0a88ee1a43fa1fc08f3f64d5a7581fa`.

The source-only patch preserves tracked `assets/img/vitacoat-home-panel.svg` *unchanged* in Git, keeps the normal copy/build rules, and then:
1. Scans staged public HTML, CSS, JavaScript, JSON, XML and other SVG files for references to the historical asset filename.
2. Fails the build explicitly if any active page/asset references it, preventing a broken dependency.
3. Removes exactly that legacy SVG from `_site` when no active references exist. It does **not** change current NO/EN HTML, content, SEO metadata, PDFs, other images, Formspree or any live file.

**Verification:** GitHub source branch and commit read back; exact build script file content read back; `main` unchanged; Git compare shows **one commit / one changed file**; historical source SVG blob preserved. Bounded local Python syntax-and-fixture test PASS for three behaviors: unreferenced exclusion, source retention and fail-closed on references. **Complete optimized-site build, CI and live public URL removal not tested** because the branch has intentionally no PR/merge/deployment. It is not correct to call production asset removed.

## G43 specialist gate status (preserve existing draft packs)

The existing accepted G43 owner review and in-person issuer/manufacturer identity authentication stand, **without repeated verification requests**. No additional claim approval can be inferred. Pre-existing requests are prepared but not sent; do not duplicate/send:
- [G43-02/04 manufacturer/formulation request](VITACOAT_ISSUE43_MANUFACTURER_FORMULATION_REQUEST_20261111.md): exact current SKU/formulation/batch equivalence to 2020/2022 specimens, signed approved REACH/CLP/SDS/TDS and claim/active/market evidence;
- [G43-03/05 qualified BPR assessor intake](VITACOAT_G43_BPR_ASSESSOR_INTAKE_20261113.md): BPR 528/2012 market-specific product/treated-article classification, authorization/Article 95/Article 58 as actually applicable, and precise permitted NO/EN claims;
- [G43-01/06 historical issuer publication/reissue-rights requests](VITACOAT_ISSUE43_ISSUER_AUTHENTICATION_REQUESTS_20261111.md) and [dispatch readiness](VITACOAT_G43_ISSUER_DISPATCH_READINESS_20261113.md): signed permission, report issuer/sponsor and archive authority; initial identity authentication owner-attested, but signed publication rights and rights-holder capacity still unverified.

**Specialist decision remains:** `PENDING_REVIEW` until qualified, current-product, exact-report and NO/EN claim wording references are linked to signed determinations in a restricted NTSN record. No evidence of dispatched correspondence or qualified signed outcomes was found in these current reviewed G43 source documents. Private draft SDS versions, historic reports and unsigned presentations are evidence, not marketing release authority.

## Release and rollback gates

- **Issue #43 OPEN**. The new branch does not change marketed biocidal claims or approve current formulation. Old legacy SVG may be omitted from future publication only after source-level acceptance and a separately authorized PR/release gate; assess whether any historical document links require preserving an archival pointer.
- **Issue #40 OPEN** for historical first-cold TBT trend; current postmerge browser/monitor jobs passed. New PR would trigger ordinary CI, so **none opened or rerun** under this preparation-only scope.
- **Issue #44 ON HOLD**. No Formspree account/provider call or test.
- No source deletion in Git, merge, production mutation, external manufacturer/issuer email, confidentiality transfer, DNS or report rebranding. If rejected, unmerged review branch can be abandoned by scoped owner instruction; **production rollback N/A**.
- Before publishing code change: fresh main SHA, reference and built artifact exclusion test, full existing mandatory CI, explicit owner go/no-go and separately qualified claim/rights status. Check direct public asset URL via an authorized browser/HTTP environment after actual deployment; current online tool could not access it.

**Canonical audit:** Events E147–E148 in existing `docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md`. This is a public-safe derived engineering/G43 decision pack, not a competing canonical ledger or qualified regulatory opinion.

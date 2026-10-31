# VitaCoat — Post-Release Acceptance and Pending Review
09:50, 31.10.2026 · Europe/Madrid

**Classification:** PENDING_REVIEW / NOT A PUBLIC CLAIMS AUTHORIZATION
**Work ID:** VITA-REMEDIATION-20261031-01
**Canonical engineering event ledger:** [docs/workstreams/VITA_REMEDIATION_20261031_01.md](workstreams/VITA_REMEDIATION_20261031_01.md)
**Production baseline:** main commit `896d8e82a457bb266fa200632795213823333d13`; merged PR #25.
**Affected production URL:** https://www.vitacoat.no/ (Norwegian); https://www.vitacoat.no/en/ (English).

## Release acceptance — independently verified GitHub evidence

- PR #25 merged 2026-10-31T08:50:10Z; the merged commit matches the production main head.
- [Deploy run 41186207852](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41186207852): build, deploy and live production acceptance **SUCCESS**. Acceptance verified 50 canonical URLs HTTP 200, correct canonical tags, sitemap/discovery, schema and release markers.
- [Quality run 41186207831](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41186207831): **SUCCESS**. Chromium, Firefox and WebKit responsive smoke **PASS**; all eight mobile/desktop Lighthouse representative runs meet existing budgets. Norwegian mobile homepage: LCP **1656.1314 ms**, CLS **0.028359**, TBT **0 ms**, four category scores **100%**.
- [CodeQL run 41186207766](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41186207766): **SUCCESS**.
- [Security run 41186207834](https://github.com/nanotech-solutions-norway/vitacoat/actions/runs/41186207834): **SUCCESS**.
- The optimized mobile image is preloaded at build time with a max-width media constraint. The LCP budget remains **2,500 ms**; no gate was weakened.
- The preceding run-to-run performance variation was material and is recorded in the append-only event ledger. Laboratory acceptance is not a verified field Core Web Vitals result.
- The connected live-browser session was unavailable and public web cache served older content. Fresh visual/manual review is **NOT_VERIFIED**; do not infer it from CI.

## Pending review register — source authority and completion evidence

| ID | Scope and status | Responsible approval / next evidence | Gate |
|---|---|---|---|
| VC-PR01 | **PENDING_REVIEW — scientific/claims provenance** | NTSN technical/regulatory owner to map every public claim to exact report ID, historical sample and tested formulation, 2020/2022 campaign, standard/method, contact time, limitations and current VitaCoat formulation linkage. A historical Citrox report is not automatic evidence of current-formulation equivalence. | No expanded antimicrobial or durability performance claim before approved mapping. |
| VC-PR02 | **PENDING_REVIEW — EU regulatory/product documentation** | Qualified regulatory review of intended use, BPR/treated-article scope, marketing wording, current SDS/TDS, labeling and applicable national requirements. | No unreviewed regulatory or biocidal assertion and no implied clinical infection-prevention guarantee. |
| VC-PR03 | **NOT_VERIFIED — Formspree inbox/delivery** | Using an approved synthetic test and provider/account access, independently confirm Formspree endpoint, actual inbox receipt, downstream notifications, error/failure handling and minimal-retention practices. | A successful browser form event alone does not prove email delivery. Do not submit real customer data as a test. |
| VC-PR04 | **PENDING_REVIEW — privacy controller approval** | NTSN controller to approve contact-form legal disclosure, Formspree data processor terms, retention, privacy notice, appropriate rights and lawful-basis handling. | Do not claim GDPR or processor-contract compliance based solely on website text. |
| VC-PR05 | **NOT_VERIFIED — Search Console/Bing** | Verify ownership using the account-side consoles; submit/inspect sitemap and monitor crawling/indexing after the release. | Repo SEO tests verify source correctness, not search-engine indexing. |
| VC-PR06 | **NOT_VERIFIED — field performance and real devices** | Review actual Core Web Vitals 75th percentile once sufficient traffic exists; visually test representative iOS/Android hardware and approved brand screenshots, including contact flow and responsive layouts. | Lighthouse and headless Playwright are lab evidence, not field/human sign-off. |
| VC-PR07 | **PENDING_REVIEW — historical PDF publication rights** | Confirm copyright/publication permissions, original attribution, provenance and approved marketing use for published source reports; preserve signed third-party report metadata unchanged. | No silent rebranding of original laboratory reports. |
| VC-PR08 | **NOT_VERIFIED — DNS/registrar administration** | Confirm domain administration at the registrar if operations require DNS changes. GitHub Pages publication authority was verified independently. | Do not interpret GitHub Pages control as control of nameservers or domain registration. |

## Recommended execution order

1. Keep the now-green public release stable; no production changes without a new source branch and all existing QA gates.
2. Undertake controlled provider-side Formspree delivery verification with synthetic non-sensitive data after review of approval and permissions; verify inbox receipt with an independent readback.
3. Resolve VC-PR01/02/04/07 with the qualified business and regulatory owners before modifying claims, publishing current SDS/TDS or asserting legal compliance.
4. Arrange account-side indexing and monitoring (VC-PR05), then real-device and field-measurement checks (VC-PR06).
5. Record decisions and independently verified evidence in the existing work-ID ledger; approved summaries may be mirrored to the designated memory vault. Unapproved review items remain explicitly PENDING_REVIEW.

**Authority limitation:** Current AI-Memory-Vault VitaCoat canonical project files were returned as empty placeholders and `ai-memory-ops/projects/vitacoat/context.md` is marked PENDING_REVIEW. The approved repository production handoff and operator's bounded authorization support this engineering record only; they do not constitute approval of the scientific, legal or provider-account items.

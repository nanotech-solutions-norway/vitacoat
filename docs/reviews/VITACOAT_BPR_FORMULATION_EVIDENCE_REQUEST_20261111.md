# VitaCoat — Qualified Current-Formulation / BPR Evidence Request
**Prepared:** 11/11/2026 ·  09:14 Europe/Madrid
**State:** PENDING_REVIEW — REGULATORY/PRODUCT-OWNER EVIDENCE REQUEST; NO CLASSIFICATION OR CLAIM APPROVAL
**Work ID:** VITA-IMPROVEMENTS-20261031-01 · **Selected:** P2-A
**Target:** [Issue #43](https://github.com/nanotech-solutions-norway/vitacoat/issues/43), existing claim-evidence matrix and original controlled reports.

## Source hierarchy and regulatory baseline
1. **Approved project source** `docs/production-handoff.md`: public release and claim gate; do not claim authority from superseded campaign documents.
2. **Current EU BPR** Regulation 528/2012, consolidated version **19 August 2026** (EUR-Lex points to this as current on 11 Nov 2026). Earlier working pack linked a 2024 consolidation; use the **2026 consolidation** for new qualified analysis. Official [EUR-Lex consolidated text](https://eur-lex.europa.eu/eli/reg/2012/528/2026-08-19/eng) and [EUR-Lex document history](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0528).
3. [ECHA treated articles](https://echa.europa.eu/en-GB/regulations/biocidal-products-regulation/treated-articles) explains that biocidal property claims and certain active-approval conditions trigger Article 58 labeling; a treated article with primary biocidal function is treated as a biocidal product under Article 3. **Classification requires exact intended function and formulation.**
4. Review Norwegian market/EEA application with the qualified local expert; do not assume every EU provision translates to a specific national authorization from website text alone.
5. Historic Citrox, Citrox Protect and marine/aquaculture research document active/ingredient lineage but **not automatic finished SiO₂-based VitaCoat formulation equivalence**. Keep 2020/2022 analytical campaigns and third-party lab sponsors distinct.

## Request to the qualified product and regulatory owners (controlled channel, no raw confidential upload into public issue)
| Gate | Exact requested primary evidence | Required named decision | Current status |
|---|---|---|---|
| ID / formulation | Current marketed batch/formulation/version, manufacturer confirmation, active ingredients identity, concentration ranges as permitted in controlled register | Whether historic samples and today's marketed composition can be bridged; identify data gaps | PENDING_REVIEW |
| BPR product classification | Exact presentation of supply, intended antimicrobial purpose, labeling and advertising, use case/substrate, relevant product type and active status | Biocidal product vs treated article vs other classification, with cited Article 3 scope and national advice | PENDING_REVIEW |
| Authorization / supplier | Applicable active-substance/product type approvals or transitional regime, actual BPR product authorizations (if applicable), Article 95 supplier documentation | Regulatory commercialization path, limitations, permitted markets | PENDING_REVIEW |
| Surface efficacy | Original full signed report ID, sponsor, tested sample, test method, organisms, substrate, load/contact time, test conditions, numeric data | Exact report-to-claim correspondence; allowed NO/EN claim per URL | PENDING_REVIEW |
| Time/durability | Controlled abrasion/cleaning/aging reports vs actual claim duration; relevant substrate and real-use assumptions | Whether any six-month claim is supported; otherwise do not publish such a claim | PENDING_REVIEW |
| Publications and trademarks | Source licenses and permissions for laboratory images, reports, logos, excerpts, Citrox provenance names | Identify permitted public citations and report links | PENDING_REVIEW |
| Safety/labeling | Current SDS/TDS, intended application class, cleaning/maintenance and consumer/industrial use instructions, Article 58 obligations if applicable | Qualified controlled document issue/revision and local language/label wording | PENDING_REVIEW |

## Priority public source claim inventory (not exhaustive)
- `/about/` and `/en/about/`: original shared SVG had embedded `EN-backed proof • up to six months` and `Validated technical themes`; staged branch drafts replace that image with localized process graphics **only on branch**, not in production.
- NO/EN `/proof/testing-and-standards/`, `/proof/pathogen-spectrum/`, `/proof/durability/`, `/benefits/continuous-protection/`, and downloads: reconcile method, test organism, contact time, historical sample, regulatory and release rights before any expanded statement.
- The claim matrix created 01.11.2026 covers 50 canonical page URLs by first-pass source parsing, with an additional SVG finding, **not a full modern rendered evidence audit**.
- Efficacy of Citrox ingredient preparations or Auranta 3009/AuraAqua combinations cannot be automatically transferred to a hard-surface finished SiO₂ coating, nor to food contact, virucidal, aquaculture, veterinary or clinical infection-prevention claims.

## Decision recording and acceptance
Only a qualified technical/regulatory owner can record a claim as `APPROVED_FOR_PUBLICATION` with name/role, versioned report, sample/formulation, scope and signed decision date. Other status remains `PENDING_REVIEW` or `OUT_OF_SCOPE`. If EU source, supplier SDS or historic source conflicts with product-marketing language, hold publication and flag to owner; do not silently merge labels and scientific data. Public or production changes require distinct fully qualified PR/release gates once Lighthouse hold is lifted.

**No confidential formulation, original proprietary reports, secrets or personally identifying documents are stored in this open GitHub review request.**

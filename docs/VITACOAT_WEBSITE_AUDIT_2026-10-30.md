# VitaCoat Website Audit — 02:11, 30.10.2026

**Work ID:** VITA-WEB-AUDIT-20261030-01  
**Status:** PENDING_REVIEW — staged content corrections; no production deployment.  
**Baseline:** Phase-8 PR #21 head `9bce1f9331c5e2c77ca292657ece4758ed24632e`.  
**Authority:** approved current VitaCoat naming/company attribution from NTSN Product Governance and the 28.10.2026 VitaCoat/Citrox provenance record. Public technical/regulatory claim expansion remains approval-controlled.

## Executive assessment
The current site has a strong static B2B architecture, responsive navigation, accessibility controls, bilingual NO/EN structure, technical-documentation pathways and a well-developed release/QA baseline. The principal October 2026 issue is not framework quality; it is **content authority drift** between the website and the newer product/provenance rules.

### Corrected in this staged branch
- Current company/address changed to **NanoTech Solutions Norway AS, Hofslundveien 6, N-3090 Hof, Norway** across homepage schema, About, Contact, LLM discovery files and production acceptance marker.
- **VitaCoat** retained as the current product identity.
- **Citrox / Citrox Protect** moved to historical alias/provenance context rather than present-day system naming.
- Homepage numeric efficacy/durability highlights replaced with standards/evidence provenance and the explicit 2020/2022 campaign boundary.
- How-it-works pages rewritten around current identity, SiO₂-based surface-layer description, evidence provenance, substrate fit and cleaning integration.
- Testing pages rewritten to separate report/test method from the tested sample and to preserve 2020 vs 2022 evidence boundaries.
- Download center now labels PDFs as source documents and preserves original report metadata rather than presenting report titles as current universal claims.
- Original laboratory PDFs remain unchanged.

## Evidence and claim boundary
Historical Citrox-labelled reports may share study/report identifiers with VitaCoat-labelled derivatives. This is evidence linkage, not automatic proof of formulation equivalence, legal identity, transfer/reassignment rights, or current regulatory claim approval. Updated 2022 Citrox reports use distinct sample/report identifiers and are treated as a separate evidence set.

Before external specification, verify: report ID, tested sample/batch, date, standard, contact time, laboratory conditions, original client/sponsor, current product linkage, current SDS/TDS, and approved claim scope.

## Domain/control status
- GitHub repository access: **VERIFIED ADMIN/PUSH** for `nanotech-solutions-norway/vitacoat`.
- Publishing path: GitHub Pages via the repository deployment workflow; custom-domain declaration is `www.vitacoat.no`.
- Website-source/deployment control through GitHub: **VERIFIED**, subject to merge/deployment gates.
- Registrar / DNS / nameserver control: **NOT VERIFIED in this session**. No registrar/DNS connector is available here, so no claim is made that nameserver, DNS zone or domain-registration records can be changed from this chat.
- Production main was not changed by this audit.

## Visual audit — source-derived
The current visual system uses warm off-white backgrounds, white/lilac cards, a purple primary accent, large rounded panels, a two-column hero, evidence cards, mechanism cards, and a dark footer. Responsive and accessibility behavior is mature, including mobile navigation, keyboard focus, reduced-motion handling and small-screen reflow.

### Strengths
- Clear B2B information hierarchy and strong spacing/typographic discipline.
- Consistent technical-card system and prominent documentation/technical-review CTAs.
- Good responsive architecture and accessibility controls.
- Photographic application assets exist for healthcare, food processing, public facilities, education/offices and electronics/touchpoints.

### Recommended visual improvements
1. **Align the web palette with the VitaCoat logo.** The logo is cyan/blue + green while the site is dominated by purple/lilac. Use blue/cyan as the main brand accent and reserve green for verified hygiene/evidence cues; keep purple only if intentionally retained as a secondary technical accent.
2. **Reduce card/panel repetition.** The current repeated rounded white cards create a SaaS/template feel. Introduce more editorial technical layouts: full-width evidence bands, annotated application photography, simple material-layer diagrams and fewer boxed sections.
3. **Use more real evidence/application imagery.** Prioritize actual treated surfaces, application process, laboratory/report excerpts where publication rights are verified, and real industrial/healthcare touchpoints over abstract claim graphics.
4. **Retire claim-heavy embedded hero graphics.** Existing SVG artwork contains hard-coded English marketing/efficacy language (including six-month/EN-backed themes). Prefer language-neutral technical visuals or photography so copy remains controlled in HTML and can be updated independently.
5. **Strengthen brand recognition in the header.** The current desktop header primarily shows the logo mark. Consider a compact VitaCoat wordmark next to the mark on desktop while retaining the icon-only mobile treatment.
6. **Make evidence status visible.** A small “Current product / Historical evidence / Pending review” visual taxonomy would help technical buyers understand source status without reading long caveats.

**Rendered-live limitation:** the public-site crawler available in this session returned a stale cached homepage and the direct browser sandbox could not independently capture the current live site. Visual findings above are therefore grounded in the current repository CSS, markup, assets and Phase-8 QA evidence, not represented as a fresh live screenshot review.

## Residual review items
- Benefits/application pages still contain broader antimicrobial/performance marketing language inherited from the pre-October website. They should receive a page-by-page claim audit against controlled source documents before production merge.
- Current SDS/TDS publication status remains unresolved.
- Public use of historical reports should be reviewed for report-rebranding/reassignment rights and regulatory/commercial claim permissions.
- Phase-8 PRs #21/#22 should be reconciled; this correction branch is intentionally stacked on the more complete PR #21 baseline.

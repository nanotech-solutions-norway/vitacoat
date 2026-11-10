# VitaCoat — Controlled Scientific, Regulatory, Formspree and Device Acceptance Pack
**Prepared:** 10/11/2026, 23:41 · Europe/Madrid
**Status:** PENDING_REVIEW — decision/verification pack, not an approved regulatory determination or public release
**Workstream:** `VITA-IMPROVEMENTS-20261031-01`
**Source main:** `de4bba618f421cca7023ceb2aa9b60e854960228`
**Working branch:** `vc-nonlighthouse-content-review-20261109`
**Approvals:** technical/product owner, regulatory expert, controller/privacy owner, original laboratory/report rights holder as applicable
**Operator safety boundary:** Lighthouse remains PAUSED. No runner changes, billed work, PR/CI trigger, live Formspree submissions, DNS or production changes.

## 1. Source-controlled status table

| Area | Repository verified observation | Responsible verification and status |
|---|---|---|
| About NO/EN illustrations | New localized neutral technical-review SVGs staged as `assets/img/vitacoat-about-review-no.svg` and `-en.svg`; About hero references switched only on unmerged branch. Original `vitacoat-home-panel.svg` retained but no longer referenced by the two staged About pages. | Owner visual acceptance, copy sign-off, source image rights and real-device checks **PENDING_REVIEW** |
| Historical claims | 01.11.2026 50-route bilingual claim matrix and 09.11 SVG supplement exist. The original About artwork had a "six months" assertion in SVG text, not merely HTML. | Do not declare current-finished-formulation proof from historical Citrox or 2020/2022 laboratory campaigns. **PENDING_REVIEW** |
| Form handler | `assets/js/formspree-contact.js` uses the browser FormData POST, success only on `response.ok`, translates error text, disables button in-flight; `.github/scripts/formspree_synthetic.py` intercepts `https://formspree.io/**`. | Synthetic branch code review is not live provider/inbox delivery evidence. **ACCOUNT_NOT_VERIFIED** |
| NO and EN contact forms | Both source pages point to the **same** Formspree form endpoint (exact account token redacted here); `data-lang="no"/"en"`, language-specific thank-you URL and visible disclosure of the provider. Name, email, company (optional), inquiry type and message are requested. | Confirm endpoint owner, verified inbox, filters, delivery routing and processor contract **NOT_VERIFIED** |
| GDPR/controller notice | Both contact pages say personal fields go to Formspree and warn against including health/sensitive personal information. | Controller must approve lawful basis, full privacy notice, retention periods, transfer mechanism, rights handling and DPA; no legal-compliance claim inferred. **PENDING_REVIEW** |
| Website | Public main and current release gates remain unchanged. | Current page/claim release status does not establish qualification of this branch. **NOT_RELEASED** |

## 2. Scientific evidence and EU/EEA/Norway biocidal classification decision record

**Decision GR-01 — Product legal classification: PENDING_REVIEW.** An intended antimicrobial **coating mixture supplied for application** may fall under the definition of a biocidal product depending on exact composition, mode of action, intended claim and product presentation. A finished surface *treated with* a product may instead implicate treated-article rules; Article 3(1)(a) clarifies that an article with a primary biocidal function is itself deemed a biocidal product. Do not automatically call the liquid formulation a treated article merely because it will coat a surface. Qualified regulatory professional must determine applicable BPR product type, status/authorization, Article 95 supplier obligations and national EEA/Norway arrangements for the exact finished formulation and jurisdiction before commercial claims.

**Decision GR-02 — Treated-article labelling: PENDING_REVIEW.** BPR Article 58 contains active-substance constraints and, where biocidal-property claims/approval conditions apply, labelling elements including active substances, nanoscale ingredient references where applicable, claimed biocidal property if substantiated and safe-use instructions. Article 58 treated-article labelling does **not** substitute for authorization of a biocidal product. The answer depends on the product and marketed article classification; do not apply the wrong regime by analogy.

**Decision GR-03 — Claim approval: PENDING_REVIEW.** For each visible current VitaCoat statement (NO and EN), record:
- exact HTML/SVG/alt/structured-data claim and URL, claim ID and revision;
- finished product composition/batch and producer statement linking VitaCoat to laboratory sample;
- original report number, issuing laboratory, client/sponsor, 2020 or 2022 campaign;
- method, organisms, substrate, concentration, exposure/contact time, humidity/temperature and statistical result;
- time-dependent durability, abrasion/cleaning/aging, and any true six-month extrapolation evidence;
- exact geographic/biocidal product authorization and any restrictions for Norway/EEA/EU;
- external report publication/rebranding/illustration rights and precise NO/EN approved wording.

Classify each claim **APPROVED_FOR_PUBLICATION** only after responsible signoff with cited primary evidence. Otherwise **PENDING_REVIEW**, or `OUT_OF_SCOPE` where disproved. Historical Citrox identity and aquaculture ingredient studies are not a blanket bridging study for the current SiO₂ bound hard-surface coating. No medicinal/infection-prevention, virucidal, food-contact or other expanded claims should be introduced from this pack.

**Decisions GR-04–06 — Approved owner signature REQUIRED:** Current EU/EEA/Norway product SDS/TDS, intended sales and application use, actual active-substance status and Article 95 supplier; current labelling plus Norwegian-language obligations and use instructions; explicit attribution/copyright rights for all original PDFs, figures and laboratory logos. Record owner, source ID, date, exact allowed wording and approval scope in the existing controlled register. No automatic promotion of this pack into approved science memory.

Primary regulatory sources (use version applicable to actual sales date):
- EU BPR 528/2012 consolidated Article 3 classification: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02012R0528-20240611
- EU BPR Article 58: https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex:32012R0528
- ECHA biocidal product / treated article guidance: https://echa.europa.eu/en-GB/regulations/biocidal-products-regulation/treated-articles
- ECHA supplier/manufacturer obligations and Article 95: https://echa.europa.eu/support/getting-started/biocides

## 3. Formspree controller verification — no live traffic now

**Decision FP-01 — provider ownership NOT_VERIFIED.** Verify account owner and active project/form and that NO/EN point to the intended same endpoint. Do not copy form identifier into public logs, issue comments or provider chat transcripts. Formspree account sign-in was unavailable in this session.

**FP-02 — routing and delivery NOT_VERIFIED.** Check provider dashboard destination email(s), spam/recaptcha/honeypot and any webhook/third-party integration permissions. Verify error-reporting path, bounce or notification delays, and duplicate handling. Source synthetic 422/200 responses **do not** prove actual inbox delivery.

**FP-03 — processing agreement, privacy and retention PENDING_REVIEW.** Obtain NTSN-signed/accepted current Formspree DPA and processor/subprocessor terms, SCC/transfer documentation if applicable, contact-form data-retention/deletion schedule, incident and data subject request process, access controls and legal basis. Formspree's generic security page is provider marketing, not an executed account-specific contract. Publish precise privacy notice/cookie or controller statements only after controller/legal approval.

**FP-04 — controlled future live acceptance (OWNER APPROVAL REQUIRED):**
1. Confirm written permission to send a **single synthetic, non-personal** request to the real endpoint and to inspect its delivery inbox. Use an intentionally invalid example-domain email, a clear test marker and no real customer data.
2. Check dashboard submission, recipient mailbox, event timing and spam route; log only synthetic IDs and high-level PASS/FAIL, not message contents or personal data.
3. Check genuine HTTP error and no-double-submit behavior without relying on destructive provider configuration.
4. Only then classify `LIVE_DELIVERY_VERIFIED` with exact time, account access authority and redacted before/after evidence; separately review the GDPR/controller notices before closing the compliance gate.

Formspree vendor source: https://formspree.io/security/

## 4. Device, visual and release review (no Lighthouse)

| Area | Manual acceptance condition |
|---|---|
| 360/390/768/1440 widths | About hero crops and diagrams show all headings, clear contrast, readable labels, no clipping or horizontal overflow |
| Real iOS Safari and Android Chrome | NO/EN language navigation, menu focus/keyboard state, dynamic text zoom 200%, reduced motion; actual physical-device approval distinguished from desktop simulation |
| Bilingual graphics | NO illustration has NO/nb-NO text only; EN illustration has EN text only; no explicit antimicrobial/efficacy/duration/clinical guarantee and no visual implied certification |
| Images and references | Source files exist, dimensions 1600×1000, correct alt text, original source retained for audit; other URL references unchanged |
| Contact flows | Both localized static notices and correct thank-you paths; source-test mocking intercepts provider network, no real POST |
| Published documents | Exact six published PDF resources, original laboratory sponsor/issuer info intact; any new SDS/TDS publication requires authorization |
| Release procedure | No PR or merge now. Once the owner explicitly re-enables ordinary CI, run required static checks + cross-browser + existing Lighthouse **unchanged**, merge only after all required green, then re-read live 50-route deployment |

## 5. Decision queue and disposition

| Priority | Decision | Owner / evidence | Status |
|---|---|---|---|
| P1 | Approve neutral NO/EN About illustrative wording and visual appearance; or request design changes | VitaCoat brand/technical owner, actual SVG source and rendered mobile/desktop preview | **PENDING_REVIEW** |
| P1 | Determine biocidal product versus treated-article regulatory classification and exact permitted current-formulation claim scope | Qualified EU/EEA/Norway regulatory owner + product formulation/active status records | **PENDING_REVIEW** |
| P1 | Approve current source reports, formulation equivalence and rights | Product owner, laboratories/sponsors as applicable | **PENDING_REVIEW** |
| P1 | Approve Formspree account access, controller DPA/retention and one synthetic live delivery test | NTSN data controller and Formspree account owner | **BLOCKED / NOT_VERIFIED** |
| P2 | Perform independent manual mobile/tablet/desktop and real iOS/Android acceptance | Design/QA owner | **NOT_VERIFIED** |
| P2 | Authorize resumption of normal PR release CI, including currently paused Lighthouse | Repository owner; no weakened thresholds | **ON_HOLD** |

**Disposition:** The engineering and regulatory review preparation is complete on an unmerged GitHub branch. None of the conclusions above are approvals to label, market, publish, activate a provider, change production or infer current finished-product efficacy.


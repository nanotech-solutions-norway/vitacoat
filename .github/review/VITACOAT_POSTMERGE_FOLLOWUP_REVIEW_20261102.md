# VitaCoat post-merge follow-up review — 02/11/2026, 15:36 (Europe/Madrid)

**Classification:** Internal engineering/evidence review; PENDING_REVIEW for technical, regulatory, publication-rights and owner sign-off  
**Work ID:** VITA-IMPROVEMENTS-20261031-01  
**Source baseline:** main 521cce03d2253a8b765d6181fd7316bb43d70a99 (PR #32 merge)  
**Canonical event ledger:** docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md  
**Scope:** Confirmed choices 1A–7A. This artifact changes no public copy, claims, historical reports, provider configuration, analytics, DNS, or production settings.

## 1. Post-merge LCP review — VC-IMP-00

Main production-quality run 41424075898 failed the existing 2,500 ms LCP gate on the first Norwegian mobile homepage sample. The second and third samples passed. The commit and Lighthouse configuration were identical within the run.

| Sample | LCP | FCP | Benchmark index | Main-thread work | Long tasks | LCP element |
|---|---:|---:|---:|---:|---:|---|
| 1 — failed | 2,660.8916 ms | 2,660.8916 ms | 3,310.5 | 1,988.252 ms | 6; max 333 ms | Norwegian hero H1 |
| 2 — passed | 1,652.1897 ms | 901.3944 ms | 3,993 | 288.300 ms | 0 | Norwegian hero H1 |
| 3 — passed | 1,502.2187 ms | 902.0789 ms | 3,934.5 | 300.292 ms | 0 | Norwegian hero H1 |

Sample 1 breakdown logged a 38.349 ms time to first byte and 1,258.221 ms element render delay. Samples 2 and 3 logged 2.285/2.402 ms time to first byte and 62.396/69.749 ms render delay. The first-sample outlier also had substantially later first paint, more main-thread work and long tasks. This is a repeated association across runs, not a proven cause. No causal attribution to font, language, test order, network, or runner contention is made. No source performance fix is justified until a controlled test identifies a defect. Keep LCP at 2,500 ms and TBT at 200 ms.

## 2. Repository SEO, download and accessibility source audit — VC-IMP-05

Read-only source checks were run against the exact merged main revision:

- Sitemap: 50 unique canonical URLs; 25 Norwegian and 25 English.
- All 50 source pages were fetched from the same commit. Each had a title, meta description and canonical URL matching its sitemap URL.
- Norwegian/English and x-default hreflang targets were present and mapped to sitemap entries.
- JSON-LD syntax parsed successfully wherever a JSON-LD block was present.
- 87 unique local link/resource targets were checked against the tracked source tree; all resolved. Seven linked PDF paths exist in the source tree.
- No image lacked an alt attribute. This source check does not assess whether every non-empty alt is sufficiently descriptive.
- Main-commit Chromium, Firefox and WebKit responsive smoke jobs passed. This does not replace real-device, screen-reader or human visual acceptance.
- PDF paths were checked for source existence, not byte integrity, checksum, rendering, or server response on every production URL.

**Confirmed stale artifact:** seo-static-audit.json says it was generated 11 August 2026 and reports 46 URLs, while current sitemap.xml lists 50. Refresh it through its owning audit workflow and independently read back the generated 50-URL report; do not edit the generated JSON by hand.

## 3. Evidence reconciliation progress — VC-IMP-02 / VC-IMP-04

The existing first-pass matrix contains 50 canonical page records and remains the sole claim matrix. Its own status correctly identifies full visual/report review and claim-level evidence matching as incomplete. The following report metadata was read from the source documents; it is an evidence index, not an approval to transfer results to current VitaCoat claims.

| Campaign | Report identifier | Reported method/sample metadata | Conditions visible in source text | Remaining verification |
|---|---|---|---|---|
| 2020 | CIB.20D103.MB | EN 13727:2012+A2:2015; report issued 15 May 2020; Abbott Analytical Ltd. | 20 ± 1 °C; clean condition with 0.3 g/L bovine albumin; incubation 36 ± 1 °C; bacterial strains are listed in the source report. | Sample/product field and contact-time/result rows require visual page readback because extracted text is corrupted/incomplete. |
| 2020 | J002058 | BS EN 14476:2013+A2:2019; report date 5 August 2020; Microbiological Solutions Ltd; Modified vaccinia virus Ankara (MVA), ATCC VR-1508. | 20 ± 1 °C; incubation 37 ± 1 °C; 5 min + 10 s contact time. The source states a 4-log result against Vaccinia virus under the conditions in that report. | Exact report-specific sample label and applicable condition/concentration must be checked against the PDF pages before matching to a page claim. |
| 2022 | CIB.22C071.MB | EN 13727:2012+A2:2015; issued 5 April 2022; sample 22C/071; Citrox Protect Hard Surface Sealant, Ethanol version; delivered 15 March 2022; Abbott Analytical Ltd; client Citrox Biosciences Ltd. | Neat; 5 min ± 10 s; 20 ± 1 °C; 0.3 g/L bovine albumin (clean); incubation 36 ± 1 °C. | Page-level organism/result reconciliation; source sample does not establish current VitaCoat formulation equivalence. |
| 2022 | CIB.22C071.IB | EN 1276:2019; issued 5 April 2022; sample 22C/071, Ethanol version; client Citrox Biosciences Ltd. | Neat; 5 min ± 10 s; 20 ± 1 °C; clean condition with 0.3 g/L bovine albumin. | Exact per-report organism/result row and linked website wording review. |
| 2022 | CIB.22C071.MY | EN 13624:2013; issued 5 April 2022; sample 22C/071, Ethanol version; client Citrox Biosciences Ltd. | Neat; 5 min ± 10 s; 20 ± 1 °C; clean condition with 0.3 g/L bovine albumin; incubation 30 ± 1 °C. | Exact per-report organism/result row and linked website wording review. |
| 2022 | CIB.22C071.IY | EN 1650:2019; issued 5 April 2022; sample 22C/071, Ethanol version; client Citrox Biosciences Ltd. | Neat; 5 min ± 10 s; 20 ± 1 °C; clean condition with 0.3 g/L bovine albumin; incubation 30 ± 1 °C. | Exact per-report organism/result row and linked website wording review. |

Campaigns remain separate. Citrox/Citrox Protect appears only as historical report/source naming. The 2022 ethanol-version test item and the 2020 report items are not presumed equivalent to current VitaCoat. No current-formulation bridge was independently verified. The linked report files and embedded illustrations still need a page-by-page rights and content review. Preserve originals, issuer metadata, clients, sample names, dates, signatures and values unchanged. At least one report explicitly restricts reproduction without written approval; no excerpt or altered report should be published until rights are confirmed.

Priority claim groups still requiring qualified matching include continuous protection/duration, healthcare, food-processing, public-facility, durability and pathogen-spectrum wording. Clinical outcomes, infection prevention, direct food-contact suitability, six-month service-life, virucidal efficacy, formulation equivalence and broad pathogen claims remain PENDING_REVIEW unless the exact evidence and qualified approval support them.

### Reviewer packet — decisions needed from qualified technical/regulatory owners

1. Identify current formulation/version and provide written bridge evidence, if any, from each historical tested sample to that formulation.
2. Approve or reject every claim against sample, report, organism/strain, method/standard, date, contact time, substrate, interfering substance, temperature and other test conditions.
3. Decide jurisdiction- and use-specific BPR/treated-article scope and permitted wording; no legal status is inferred here.
4. Confirm current technical-document version, intended substrates/use conditions, cleaning compatibility, reapplication/service interval and approved safety/environment statements.
5. Confirm rights for report reproduction, excerpts, illustrations, third-party marks and historical sponsor attribution.
6. Record exact reviewer, decision, source revision, approved wording/limits, and unresolved exclusions in the existing review process.

No new SDS/TDS, legal statement or performance claim is authorized by this packet.

## 4. Claim-neutral UX prototype — VC-IMP-03

An isolated HTML prototype is included under .github/prototypes/. It uses the existing VitaCoat logo, logo-aligned cyan/blue with restrained green accents, responsive layout, bilingual Norwegian/English labels and a CSS/SVG process illustration. It contains no product efficacy, duration, clinical, pathogen, durability or formulation assertion, no external image/font service, and no analytics or cookies. It is an internal review artifact, not part of the live website.

## 5. Physical-device acceptance matrix — VC-IMP-06

Record each run against the exact deployed SHA, device model/OS, browser/version, viewport, locale, date, tester and evidence reference.

| Area | Minimum coverage | Evidence and acceptance |
|---|---|---|
| Devices/layout | iOS Safari and Android Chrome; narrow phone, large phone, tablet, desktop; portrait and landscape | Screenshots at each agreed viewport; no clipped content, horizontal overflow or obstructed navigation |
| Localization | Norwegian and English home, applications, technical pages, contact and downloads | Language switch reaches the corresponding page; visible copy and document labels match locale |
| Navigation/accessibility | Keyboard-only; skip link; focus order/visibility; accessible names; headings; zoom/reflow; reduced motion; contrast; screen-reader spot check | Record issues and retest; human sign-off required |
| Downloads | Every linked PDF on the current deployed site | HTTP status, filename/content type, opens on device, readable at mobile scale; record checksum if byte verification is available |
| Contact flow | Invalid fields, visible feedback, retry and duplicate-submit guard using only existing synthetic/mocked path | No personal values in events; no provider request; actual delivery remains separate and NOT_VERIFIED |
| Performance | Capture real-device LCP/INP/CLS using an approved, privacy-reviewed method | Raw per-device run notes and p75/field source where available; no new analytics or cookies without approval |

Real hardware access, a human reviewer, and owner acceptance remain outstanding.

## 6. Formspree verification checklist — VC-IMP-01 follow-up

This is a preparation checklist only; no provider request or account change occurred.

- Confirm account and endpoint ownership/authorized operator before any account-side inspection.
- Obtain separate permission for one synthetic submission and select a controlled test inbox.
- Ensure the payload contains no personal/customer data; record only a non-sensitive test ID.
- Verify provider acceptance, notification event and independent inbox receipt readback.
- Check retry/idempotency behavior and confirm the same action cannot create duplicate notifications.
- Confirm event payloads/logs contain no submitted field values.
- Record timestamps, provider result class, inbox evidence reference and rollback/cleanup status.
- If authorization or account readback is unavailable, leave status NOT_VERIFIED; do not infer delivery from mocked success.

## 7. Outstanding state

- VC-IMP-00: IN_PROGRESS — repeated first-sample LCP outlier; cause unresolved; budget unchanged.
- VC-IMP-01: ACCEPTED for synthetic browser QA; provider receipt/notification remains NOT_VERIFIED.
- VC-IMP-02: IN_PROGRESS — 50/50 URL inventory; report-level claim matching, visual inspection and rights review incomplete.
- VC-IMP-03: PROTOTYPE PREPARED — owner visual review and any production implementation remain separate.
- VC-IMP-04: PENDING_REVIEW — qualified technical/regulatory decisions required.
- VC-IMP-05: SOURCE AUDIT COMPLETE for the checks above; stale JSON refresh and external Search Console/Bing/field monitoring remain open.
- VC-IMP-06: BLOCKED on real-device access and human acceptance.
- Overall independently accepted packages: 1/7.

**No production merge, deploy, public content change, external account operation, Formspree submission, analytics activation, or claim approval is included.**

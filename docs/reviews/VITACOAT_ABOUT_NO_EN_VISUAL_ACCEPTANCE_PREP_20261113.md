# VitaCoat — About NO/EN Source-only Review and Human Device Acceptance Preparation
**18:53, 13.11.2026 · Europe/Madrid**
**Work ID:** `VITA-IMPROVEMENTS-20261031-01` · **Status:** SOURCE_QA_PREPARED / HUMAN_RENDERED_QA_NOT_TESTED / RELEASE_ON_HOLD
**Scope:** Staged Norwegian `/about/` and English `/en/about/` on unmerged branch `vc-nonlighthouse-content-review-20261109`. Reviewed source files, not executed browser tests. **This is not a human acceptance signoff.** Owner already attested in-person authentication on 13.11.2026; no reauthentication sought.
**Source authority:** `docs/production-handoff.md` on main `de4bba618f421cca7023ceb2aa9b60e854960228`; approved logging protocol; [previous owner checklist](VITACOAT_OWNER_VISUAL_DEVICE_ACCEPTANCE_20261111.md), [bilingual visual signoff register](VITACOAT_G43_VISUAL_DEVICE_SIGNOFF_REGISTER_20261113.md), [claim inventory with staged addendum](../VITACOAT_CLAIM_EVIDENCE_MATRIX_20261101.md), [in-person owner confirmation](VITACOAT_G43_OWNER_ATTESTATION_RELEASE_HANDOFF_20261113.md).

## 1. Immutable evidence snapshot for the human review
| Review item | Git blob SHA | Source role |
| --- | --- | --- |
| `about/index.html` | `e20308c4412c252a5b06a92f6ce86d29e45add2a` | NO page markup |
| `en/about/index.html` | `bca35a9df46bee2a777792f9f22c2d6ce8a41a4c` | EN page markup |
| `assets/img/vitacoat-about-review-no.svg` | `342dccf66fe5561cbe53b403f65097ccc071b368` | NO source artwork |
| `assets/img/vitacoat-about-review-en.svg` | `22be187806c3d9b16fcb32159ca8bd0e20d3e055` | EN source artwork |
| `assets/css/styles.css` | `a7e188d8d7f898ea73eba9ae593aacade19b6ac6` | Shared responsive/layout rules |
| `assets/js/site.js` | `afa89166db1421cd89a7a30bcbe54a5052d88494` | Shared menu and language interaction script |
| `docs/VITACOAT_CLAIM_EVIDENCE_MATRIX_20261101.md` | `9bb030ac7f6a5bc85844b18d5f503b64e24ca012` | Historical 50-route snapshot and preserved 13.11 staged-artwork addendum |

**Do not use `https://www.vitacoat.no/about/` as a preview of these branch-only assets.** The public domain still serves main until separately authorized release. The human reviewer should use a locally opened checkout at the exact review commit or a separately permitted private, non-deploying preview, and record that preview's exact commit and viewport; no CI, PR, Lighthouse, deployment or merging has been authorized to create a preview.

## 2. Source-only assessment — not rendered-device results
| ID | Static observation from GitHub source | Evidence / classification |
| --- | --- | --- |
| S01 | NO `html lang="nb-NO"`, EN `html lang="en"`; both have `meta name="viewport" content="width=device-width, initial-scale=1"` | **SOURCE PASS** — language and viewport declarations present |
| S02 | Each About page has one `h1`, one `main id="main-content"`, a skip link and matching language-specific canonical/alternate links | **SOURCE PASS** — counts and attributes only; screen-reader operation NOT_TESTED |
| S03 | NO hero references only `vitacoat-about-review-no.svg`, EN only `vitacoat-about-review-en.svg`; each `img` has a nonempty localized `alt` | **SOURCE PASS** — exact markup and asset existence verified |
| S04 | Each SVG declares 1600×1000 viewBox, local `xml:lang`, `role="img"`, `aria-labelledby="title desc"`, a populated `title` and `desc`, and three numbered stages | **SOURCE PASS** — structural metadata only, not an AT announcement test |
| S05 | Both SVGs depict project-specific documentation/intended-use evaluation without an explicit `six months` duration, viral log reduction, standard-certification or current-product approval in the staged SVG text | **SOURCE PASS / LIMITED** — only these two SVGs, not global website claims or legal clearance |
| S06 | Shared CSS declares a responsive one-column hero at ≤860px, smaller padding at ≤520px and ≤360px, plus `prefers-reduced-motion: reduce` overrides | **SOURCE PASS** — stylesheet rules exist; actual layout and reduced-motion behavior NOT_TESTED |
| S07 | `site.js` source implements mobile menu toggling, `aria-expanded`, Escape close, focus restoration and language link navigation | **SOURCE PASS / LIMITED** — implementation found, no keyboard/device execution |
| S08 | The branch's claims matrix has a 13.11.2026 addendum explicitly reconciling the old `VC-C02` SVG with staged NO/EN SVG changes while preserving original snapshot | **SOURCE PASS** — version lineage is documented |

## 3. Source-based visual risks requiring human verdict
| Risk | Finding | Predicted effect | Required human outcome |
| --- | --- | --- | --- |
| **R01 — HIGH** | `.hero-media img[src$=".svg"]{object-fit:cover}` and `width:100%;height:100%;min-height:480px`; image container uses `overflow:hidden`; source SVG is 1600×1000 and text/cards occupy edges | At a **1200px-wide container**, desktop grid image column computes to about **553 CSS px** while height is **at least 480 CSS px**. Under a 553×480 image box, `cover` would scale at 0.48 and crop about **224 source SVG units on each horizontal side**, potentially hiding first/third card content. Actual hero height can differ; this is **conditional CSS geometry**, not a screenshot or proven clipping. | On desktop Chromium/Firefox/WebKit, capture NO+EN 1440×900 full hero and inspect all three numbered cards, edges, footnote and title. A visible lost card, truncated label, or clipped footnote = **FAIL**. |
| **R02 — HIGH** | At ≤520px, container width is `viewport-24px`; `.hero-media img` has mobile min-height 250px, while the same `cover` remains | Illustrative **360px viewport → 336×250 display box**: image scales at 0.25 and crops about **128 SVG coordinate units per side**; original 20px footer text becomes about **5 CSS px** and 27px labels about **6.75 CSS px**. Layout height is not measured; actual crop and text size depend on used CSS box. At 390px width with 366×250 box, crop estimate ≈68 units per side. | Require Android 360/390 and iOS 375/390 physical-device screenshots, landscape, at least 200% zoom; validate all labels, meaning and contrast. If informative SVG lettering is unreadable, **FAIL** even if outer box does not overflow. |
| **R03 — MEDIUM** | SVG's internal `font-family="Arial,sans-serif"`, while page uses Inter. Gradients, `::after` overlay and SVG title/desc can render differently by engine and accessibility stack | Potential font-substitution, gradient/opacity, contrast and spoken-label differences | Compare desktop Chromium/Firefox/WebKit and iOS Safari. Record font/browser and text clipping; evaluate screen reader and alt redundancy. |
| **R04 — MEDIUM** | Shared responsive menu is JavaScript-controlled; source contains focus and Escape logic | Menu/touch/focus behavior cannot be established by inspecting source | Keyboard-only menu, submenus, Escape/focus restore, language switch and reduced-motion tested on actual named platform |
| **R05 — DOCUMENTARY** | Historical claim row `VC-C02` is for older original SVG; new neutral NO/EN replacement is unmerged and recorded in an addendum | Historic matrix cannot itself prove current branch visual or legal clearance | Human technical/brand owner reviews exact revision and notes local NO/EN copy decision; any regulated claim independently gated in #43 |

**Correction options for a *future separately authorized code change***: prefer a mobile-specific artwork without dense embedded microtext, or accessible HTML step labels and an SVG used for complementary decoration; alternatively assess `object-fit:contain` with revised hero sizing, preserving all text at each viewport. Changing only `cover` to `contain` does not cure 5–7px microtext at narrow widths. **No artwork/CSS/HTML edits are authorized or performed in this preparation.**

## 4. Manual human/device evidence matrix — READY_FOR_REVIEW, not executed
Each line must be evaluated separately in **both Norwegian and English**, against the **same exact source SHA**. `NOT_TESTED` remains until actual reviewer-signed artifacts exist.

| ID | Device / browser and viewport target | What to capture and evaluate | NO | EN |
| --- | --- | --- | --- | --- |
| H01 | Desktop Chromium, 1440×900 CSS px | Full hero & lower body, first/last stage cards, alt/heading, keyboard and language menu, visible nav | NOT_TESTED | NOT_TESTED |
| H02 | Desktop Firefox, 1440×900 CSS px | Independent font bounds, gradient layer, crop and keyboard menu comparisons | NOT_TESTED | NOT_TESTED |
| H03 | Desktop WebKit, 1440×900 CSS px | SVG gradients, `object-fit`, focus, accessibility tree and clipping | NOT_TESTED | NOT_TESTED |
| H04 | Physical Android Chrome, 360 and/or 390 CSS px | Portrait and landscape hero; all three cards/footnote readable; menu, language switch, orientation | NOT_TESTED | NOT_TESTED |
| H05 | Physical iPhone Safari, 375 and/or 390 CSS px | Portrait/landscape; same visual crop and text legibility; focus/touch target and scroll | NOT_TESTED | NOT_TESTED |
| H06 | Tablet (identify OS/browser), 768×1024 CSS px | Two-language responsive layout, stage text, imagery, links and orientation | NOT_TESTED | NOT_TESTED |
| H07 | 200% zoom / large text on desktop/mobile where supported | Ensure informative copy, step sequence, CTA and headings remain readable without harmful overflow | NOT_TESTED | NOT_TESTED |
| H08 | Keyboard + named screen reader / assistive technology | Image alt versus embedded title/desc, skip link, focus order, menu toggle state, duplicate/hidden announcements | NOT_TESTED | NOT_TESTED |
| H09 | Reduced-motion preference and slow font load | Reveal behavior, stable layout, font replacement and no disappearance | NOT_TESTED | NOT_TESTED |
| H10 | Independent brand and technical copy review | Logo/brand alignment, translation fidelity, no implied antimicrobial efficacy/approval, exact release SHA | PENDING_REVIEW | PENDING_REVIEW |

### Evidence capture protocol (human reviewer)
- **Source:** checkout/preview URL (if explicitly allowed), full review branch **commit SHA**, file blob SHA(s), current local date/time and timezone.
- **Platform:** person/reviewer role; exact physical device model or emulator name, OS/build, browser/version, CSS viewport width×height, device pixel ratio, zoom/text scaling, reduced-motion setting.
- **Per test ID H01–H10:** separate NO and EN screenshot/video filename and restricted storage pointer, expected vs observed, status `PASS / FAIL / BLOCKED / NOT_TESTED`, reproduction steps and concise evidence note. Exclude any private customer/contact records from image captures.
- **Acceptance:** all required platform rows have a human outcome with traceable evidence; first/last cards and footer legible/not clipped; contrast/spacing acceptable; NO/EN translation/branding signed; keyboard/AT works; known R01/R02 repaired and tested if observed; no other claim or legal signoff inferred.
- **Decision template:** Human reviewer name/role ___; exact source SHA ___; NO overall `ACCEPT / CHANGE / HOLD` ___; EN overall `ACCEPT / CHANGE / HOLD` ___; accepted exceptions ___; device matrix evidence folder ___; product/regulatory claim review pointer (if any) ___; signature and 24h local time/date ___.
- **Use of previews:** publicly deployed site is **not** the unmerged branch. Raw SVG rendering can assist graphic-only inspection, but cannot replace About-page layout/accessibility tests. Do not trigger any workflow to build or publish a review preview under current restrictions.

## 5. Disposition and protected gates
**Source checks: 8/8 inspected**, of which S01–S04 and S06–S08 source structural findings are positive, S05 limited to SVG text. **Potential visual concerns R01/R02 high; R03/R04 medium; R05 documentary. Human tests H01–H10 = 0/10 executed**, for NO and EN separately. These source findings are not browser/device PASS decisions. User owner-authenticated relevant identities **in person**; this is not to be repeated.

**No action against** Issue #40 Lighthouse PAUSED, Issue #44 Formspree ON HOLD, Issue #43 OPEN / owner review approved; no PR, CI, Lighthouse, GitHub branch merge, deployment, DNS, regulated claim, product efficacy certification or external correspondence. `main@de4bba618f421cca7023ceb2aa9b60e854960228` remains target for future gated release only. Full release completion **N/A%**; human acceptance **NOT_TESTED**.

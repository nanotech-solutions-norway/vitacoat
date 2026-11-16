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


## Evidence update — 01:18, 15.11.2026: Norwegian standalone graphic screenshot

**Classification:** USER-SUPPLIED IMAGE / VISUAL OBSERVATION ONLY / NOT OVERALL APPROVAL. The owner submitted one screenshot of the **Norwegian standalone source SVG**, not of the staged About webpage inside its responsive layout. User separately reported that the English SVG viewing link opens the same site; that navigation issue was not reproduced through public browsing, and neither source asset was modified.

| Evidence item | Verified observation | Signoff limitation |
| --- | --- | --- |
| Norwegian screenshot | Attached image 1536×975 px; in-chat source SHA256 `c91b5345996c7c6ead21924e1073c76bad91f43241858958d9a164179c3002d9` | File remains in conversation and is **not uploaded to public GitHub**; no named device/browser/viewport metadata from user |
| NO standalone visual | Main heading and subheading, right-hand graphic, three stage cards 01/02/03 and lower `Prosjektspesifikk gjennomgang` are visible; no obvious cropping or text overlap at screenshot scale | **STANDALONE_ASSET_VISUAL_COMPLETE** (observer finding). NOT a page-level H01–H10 PASS, not human signed ACCEPT. Footer close to bottom edge is a low-priority readability/watch item |
| EN source and local viewing aid | English source `assets/img/vitacoat-about-review-en.svg` Git blob SHA `22be187806c3d9b16fcb32159ca8bd0e20d3e055` independently fetched; English text differs appropriately from Norwegian; PNG render built locally from bytes matching Git blob SHA exactly at 1600×1000, local PNG SHA256 `c5ced456b7ac04e61e4ff0398bdf587c3247c8e7c95dd244f29c808af33e4af4` | PNG provided to owner in chat only. **No English owner screenshot received and no English visual owner acceptance recorded**. Public GitHub/raw URL behavior not independently proven because webpage fetching returned cache miss |
| Responsive layout and accessible interactions | No staged webpage screenshot, desktop/mobile viewport/device identification, 200% zoom, menu, keyboard or screen reader evidence supplied in this message | **H01–H10 for NO/EN remain NOT_TESTED**; source risks R01/R02 for `object-fit: cover` continue until page-in-context review |

**Next human evidence request:** Capture the complete staged **About page** with the NO/EN SVG embedded at desktop and real mobile widths, including first and third diagram cards and footer at each breakpoint; record browser, device, CSS viewport, exact review revision, and keyboard/zoom/AT outcomes. A standalone image screenshot is useful initial artwork evidence but cannot replace this.

**Protected scope:** Existing owner in-person authentication accepted; do not repeat identity verification. No CSS, SVG, HTML, JavaScript, PR, CI, Lighthouse, merge, deployment, issue-state or DNS changes. Issue #40 Lighthouse PAUSED; #44 Formspree owner HOLD; Issue #43 OPEN.


## Evidence update — 16:29, 15.11.2026: English standalone graphic

**Evidence and scope:** The owner reattached the English illustration and requested validation/continuation. The uploaded `1600×1000` RGBA PNG is **byte-for-byte the same previously generated English PNG** (SHA-256 `c5ced456b7ac04e61e4ff0398bdf587c3247c8e7c95dd244f29c808af33e4af4`, 122,094 bytes); it corresponds to the exact GitHub English source SVG blob `22be187806c3d9b16fcb32159ca8bd0e20d3e055`. Therefore this is a **verifiable standalone asset**, not a new independent browser/device screenshot and not an in-context responsive screenshot. The private in-chat image was not copied to a public repository.

### Visual observation at full 1600×1000 asset size

| Criterion | English source image observation | Review status |
| --- | --- | --- |
| Project heading and purpose | `PROJECT CONTEXT`, `VitaCoat`, `Technical review before specification`, full subordinate sentence visible | **VISUAL_PASS (standalone)** |
| Illustration at right | Three-layer turquoise surface representation and `DOCUMENTATION` label visible inside the drawing box | **VISUAL_PASS (standalone)** |
| Steps 01–03 | `Intended use`, `Documentation`, `Project review` all visible; supporting lines `Substrate and environment`, `Sources and limitations`, `Requirements for specification` intact | **VISUAL_PASS (standalone)** |
| Footer | `Application-specific review` caption and horizontal baseline visible | **VISUAL_PASS (standalone)** |
| Typography and geometry | No visible overlapping card headings, truncated label, missing line, clipping at edges or abnormal alignment at this source resolution | **VISUAL_PASS (standalone)** |
| Translation pairing | English step structure matches earlier Norwegian screenshot (01 bruksområde, 02 dokumentasjon, 03 prosjektavklaring), with expected language differences | **SOURCE/IMAGE CORRESPONDENCE PASS** |
| Independent device/owner signoff | This uploaded PNG exactly matches our previously generated local render and contains no browser UI, CSS viewport evidence, physical device model or assistive-tech results | **NOT_TESTED / NOT SIGNED** |

**Combined standalone image result:** Norwegian and English SVG designs **VISUALLY COMPLETE at their full image scale**. This validates visual *assets* only, **not embedded About-page layout**. No changes or corrections to these source graphics are warranted from the currently submitted standalone images. It does **not** clear source risks R01/R02: the `object-fit:cover` hero can still crop the SVG at actual 1440px desktop and 360/390px mobile layouts, and embedded diagram microtext can become unreadable.

**Remaining H01–H10 status: all NOT_TESTED for both language pages.** To complete human visual/device acceptance, view the **staged pages** from the exact review-branch revision in desktop Chromium/Firefox/WebKit, Android Chrome, iOS Safari and tablet, plus 200% zoom/keyboard/screen-reader tests; supply actual device+browser+CSS viewport and NO/EN rendered-page captures. **Do not use the live production domain as branch-preview evidence.** Because no private staged preview is deployed, reviewer access requires a locally opened branch checkout or a separately authorized preview method. Record named reviewer, decision, time, source SHA and evidence pointers before marking actual H01–H10 PASS.

**Protected release state:** Owner in-person source authentication accepted; no repeat. Issue #43 OPEN (owner reviewed), #40 Lighthouse PAUSED, #44 Formspree ON HOLD. No CSS/HTML/SVG/JS modification, outbound requests, CI, PR, merge, deployment, DNS or release authorization. Canonical workstream E127–E128 records provenance and readback.


## Screenshot evidence — 09:54, 16.11.2026: live NO/EN About pages, NOT staged

**Evidence class:** USER-SUPPLIED SCREENSHOTS OF PUBLISHED SITE / HUMAN-VIEWABLE VISUAL OBSERVATION / STAGED REVIEW STILL NOT TESTED. Owner attached four JPG screenshots without a new acceptance declaration; images remain in the private chat, **not copied to GitHub**. Observations apply to the live website addresses visible in the captures, not the staged `vc-nonlighthouse-content-review-20261109` branch. Current main `de4bba618f421cca7023ceb2aa9b60e854960228` contains old `assets/img/vitacoat-home-panel.svg` (blob `83adcc47e2e9cafd5afa57652300d6766011735e`) for both live About heroes. Review branch uses different staged neutral `vitacoat-about-review-no.svg`/`vitacoat-about-review-en.svg` artwork, **not present in the screenshots**.

### Evidence map (private in-chat references only)

| Attachment file | Source image pixels | Observable screenshot content | Provenance / interpretation |
| --- | --- | --- | --- |
| `1000026450.jpg` | 107×1536 | English full-page scroll composition; largely single-column content, header/sections/footer apparent | SHA256 `e01bba7d2ed7ad5b7c5479257db1a8c0d0d99bfaba9a686b3425194aa2a0182c`; extremely reduced width **prevents confident font-size, text contrast or fine detail inspection** |
| `1000026448.jpg` | 404×1536 | English live `vitacoat.no/en/about/` visible with old hero containing fragmented `Persistent Hygienic Protection` / `VitaCoat` artwork; desktop-style two-column layout scaled to phone capture | SHA256 `0cc994a59a4f5d6cd0e1b45798df70839ac0a974e320f6f3cea94bb30476f41b`; screenshot is not a staged-asset preview; actual CSS viewport/desktop-site setting unreported |
| `1000026446.jpg` | 413×1536 | Norwegian live `vitacoat.no/about/` (URL includes query parameter in captured address bar); old hero text visibly cropped at image edges; same desktop-style scaled layout | SHA256 `37085f058c82ee95d5aa10deaa161c3b2e1e9e491c7c5e4ddf5073f9c581bbfa`; physical CSS viewport and browser mode not known |
| `1000026429.jpg` | 110×1536 | Norwegian full-page scroll composition with major page sections/footer apparent | SHA256 `97b1d640eeb803a66626358ecbbadeda5ff9860c7f84872232a2dcab5d2688cb`; reduced size cannot establish mobile legibility/accessibility |

### Findings / action categories

| Ref | Observation, with scope | Classification | Follow-up |
| --- | --- | --- | --- |
| L01 | Two full-length compositions show both language page structures, including company information, role separation, documentation guidance, call to action, footer | **LIVE STRUCTURAL PRESENCE OBSERVED**, not a functional/navigation PASS | Test actual responsive browser layout and interaction at reported viewport |
| L02 | Wide-image screenshots of published NO/EN pages show old diagram chopped/truncated inside right hero media | **LIVE WIDE-LAYOUT VISUAL DEFECT OBSERVED** (high priority to remedy before claiming current production hero visual acceptance). The CSS `.hero-media img[src$=".svg"]{object-fit:cover}` supports plausible cropping mechanism, but source plus screenshots alone do not isolate all runtime causes | Verify in desktop-mode and mobile-mode with actual CSS viewport; separately propose fit/container/mobile-responsive adjustments under authorized engineering scope, do not change in this session |
| L03 | 404/413px image files display two-column desktop-like page rather than one-column source CSS ≤860px | **POSSIBLE BROWSER DESKTOP-SITE MODE OR SCALED CSS VIEWPORT**, not proof of broken mobile breakpoint. The screenshot physical pixel width is not necessarily CSS viewport width | Record Chrome/Android version/device, desktop site toggle, display zoom, JS `innerWidth`/CSS viewport if available; capture both normal mobile and desktop-site mode |
| L04 | Both live About pages still reference original production SVG, not neutral 2026 staged graphics. Old SVG contains historical `Persistent Hygienic Protection` and `EN-backed proof • up to six months` phrases in GitHub source | **STAGING/PRODUCTION MISMATCH CONFIRMED**; regulated efficacy/duration claim review remains under Issue #43. Cannot sign off staged pages using these screenshots. | Arrange separately authorized branch-preview/local checkout (without deploy/PR/CI under existing hold); review staged NO/EN graphics in-page at standard mobile+desktop sizes |
| L05 | Only screenshots, no video/click path, input focus, accessibility tree, zoom before/after, specific device model, or reviewer signoff | **INTERACTION AND A11Y NOT_TESTED** | Execute existing H01–H10 checks and attach outcomes/qualified reviewer confirmation; avoid extrapolation |

### Approval matrix update — cumulative evidence

- **Standalone artwork:** NO and EN previously visually assessed as complete in full-scale source previews; unchanged. This **does not** approve responsive display.
- **Live-production visual finding:** old About hero clipped in two user screenshots of desktop-like scaled display: **FAIL/DEFECT OBSERVED IN THAT VIEW**, browser/viewport mechanism unconfirmed. Two long screenshots document structural presence but insufficient detail for legibility acceptance.
- **Staged About webpage:** **H01–H10 NOT_TESTED** for both languages; **NOT APPROVED**. The latest screenshot batch contains no staged technical-review SVG in an actual About webpage.
- **No implied user approval:** screenshot submission is evidence, not an `ACCEPT` decision, and prior owner attestation applies to in-person identity authentication, not browser/device testing.
- **Risk retention:** R01 `object-fit:cover` text/image cropping and R02 mobile microscopic SVG text remain open; source-only visual assessment from earlier sessions stays documented.
- **Safe priority:** obtain exact testable staged preview at the review commit with explicit preview authorization, *then* validate actual NO/EN pages across Chromium/Firefox/WebKit, Android/iPhone/mobile widths, tablet, zoom/keyboard/AT. Separately propose a small code remediation if crop is reproduced in staged context; do not bypass the current Lighthouse/CI gate.

**Governance:** Issue #40 Lighthouse PAUSED; Issue #44 Formspree owner HOLD; Issue #43 owner-review approved but professional content gates and release acceptance remain open. No CI, PR, merge, deploy, DNS, Formspree calls, public claim edits or repeat authentication performed during this assessment. `main` unchanged. The canonical per-workstream GitHub event ledger is the only operational source of truth; this file is an evidence worksheet.

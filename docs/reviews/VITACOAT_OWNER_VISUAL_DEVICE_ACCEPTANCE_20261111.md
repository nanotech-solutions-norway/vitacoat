# VitaCoat — Independent Owner Visual Review and Device Acceptance Sheet
**Prepared:** 11/11/2026 ·  09:14 Europe/Madrid
**State:** READY_FOR_OWNER_REVIEW / NOT VISUALLY ACCEPTED / NOT RELEASED
**Work ID:** VITA-IMPROVEMENTS-20261031-01 · **Selected:** P1-A and P4-A
**Production SHA:** de4bba618f421cca7023ceb2aa9b60e854960228
**Source:** unmerged branch `vc-nonlighthouse-content-review-20261109`.
**Authorization:** review material only; owner holds Lighthouse work and production release.

## P1: Exact artifact snapshot
| Review artifact | Source Git blob | Intended language and use |
|---|---|---|
| `assets/img/vitacoat-about-review-no.svg` | `342dccf66fe5561cbe53b403f65097ccc071b368` | 1600×1000, `xml:lang=nb-NO`, transparent semantics, Norwegian three-step project review |
| `assets/img/vitacoat-about-review-en.svg` | `22be187806c3d9b16fcb32159ca8bd0e20d3e055` | 1600×1000, `xml:lang=en`, English three-step project review |
| `about/index.html` | `e20308c4412c252a5b06a92f6ce86d29e45add2a` | Norwegian About hero references NO SVG; localized Norwegian image description |
| `en/about/index.html` | `bca35a9df46bee2a777792f9f22c2d6ce8a41a4c` | English About hero references EN SVG; localized English image description |

**Source-only checks PASS:** each About page has one specific hero reference and nonempty localized alt; SVG files exist, include title/description, maintain 1600×1000 viewBox and exactly three process stages; no explicit `up to six months`, `EN-backed proof` or `Validated technical themes` in the new SVGs. The original `assets/img/vitacoat-home-panel.svg` remains unchanged in GitHub and on production. This review is **not** a rendered-pixel inspection or independent design acceptance.

**Visual review checklist for qualified brand/technical owner:**
- [ ] Open NO and EN SVG from the branch and inspect each at native size. Verify all headings, arrows/process-layer graphic, three card labels and bottom footnote are fully contained, contrasted and visually balanced; no text clipping/wrapping overlap.
- [ ] Approve brand visual identity (logo, cyan/blue/green tones, typography, padding) against *approved* VitaCoat logo; never infer branding approval solely from a similar palette.
- [ ] Confirm labels are natural Norwegian/English and don't imply efficacy, biological reduction, EN-standard certification, six-month durability, medical benefits or a product authorization.
- [ ] Check the revised About hero is visually coherent with surrounding company identity/provenance content, not a claim-bearing product advertisement.
- [ ] Record exact file SHAs, reviewer name/role, review time, decision `ACCEPT / REQUEST_CHANGE / HOLD`, and individual observations; no assistant self-signoff.
- [ ] If approved, store an *owner-qualified* decision with supporting visual evidence. It is not a deployment authorization; release requires the existing normal workflow checks after the separate Lighthouse pause is lifted.

**Preview/source links:**
- [NO SVG](https://github.com/nanotech-solutions-norway/vitacoat/blob/vc-nonlighthouse-content-review-20261109/assets/img/vitacoat-about-review-no.svg)
- [EN SVG](https://github.com/nanotech-solutions-norway/vitacoat/blob/vc-nonlighthouse-content-review-20261109/assets/img/vitacoat-about-review-en.svg)
- [About NO source](https://github.com/nanotech-solutions-norway/vitacoat/blob/vc-nonlighthouse-content-review-20261109/about/index.html)
- [About EN source](https://github.com/nanotech-solutions-norway/vitacoat/blob/vc-nonlighthouse-content-review-20261109/en/about/index.html)

## P4: Manual acceptance matrix — preparation complete, execution pending
| Browser / device | Requested viewport | Required evidence | Verification outcome |
|---|---|---|---|
| Chromium desktop | 1440×900 CSS px | NO & EN About screenshots, image complete, nav/focus semantics, contrast | NOT_TESTED |
| Firefox desktop | 1440×900 CSS px | Same; font substitution and SVG text bounding boxes | NOT_TESTED |
| WebKit desktop | 1440×900 CSS px | Same; SVG opacity/gradient support, image scale | NOT_TESTED |
| Android Chrome (physical device) | Actual width and 360/390-equivalent CSS px | Orientation, zoom 200%, mobile menu and language switch, no horizontal overflow, NO/EN hero visible | NOT_TESTED |
| iPhone Safari (physical device) | Actual width and 375/390-equivalent CSS px | Focus/menu, rendering, image text legibility, touch targets, reduced motion | NOT_TESTED |
| Tablet browser | 768×1024 CSS px | Cards/image responsive fit and safe breakpoints, NO/EN | NOT_TESTED |
| Accessibility | Keyboard + screen reader (actual device/software specified) | Image alt/title interaction, meaningful heading, contrast, no redundant/colliding announcements | NOT_TESTED |

**Execution instructions for human QA:** obtain exact device model, OS/browser version, date/time, viewport/DPR/zoom; capture original screenshot and observation with affected page path and source revision; label each PASS/FAIL/BLOCKED; keep any person/customer data out of screenshots. Preview the staged branch locally or via explicitly authorized private preview (do **not** use the published domain as evidence of staged graphics). Report differences as GitHub issue or PENDING_REVIEW amendment; do not merge in response to a screenshot alone.

**Exit criteria:** owner logo/copy/claims review ACCEPT, all device rows evaluated with reproducible evidence, CSS/HTML source diff accepted, current/formulation claims separately approved or removed, all original release gates (including Lighthouse) re-enabled by explicit owner authorization and GREEN, then separate PR/release signoff. Current Lighthouse hold prohibits triggering the default PR workflow; **no PR or CI launched here**.

**Owner response template (fill manually):** Reviewer role: ___ · SHA(s): ___ · NO: ACCEPT/CHANGE/HOLD ___ · EN: ACCEPT/CHANGE/HOLD ___ · iOS/Android: PASS/FAIL/BLOCKED ___ · visual notes: ___ · approval date/time: ___.

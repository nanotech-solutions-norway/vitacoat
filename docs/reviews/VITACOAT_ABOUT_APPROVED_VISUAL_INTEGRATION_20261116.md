# VitaCoat — Owner-verified NO/EN About design integration
**16:45, 16.11.2026 · Europe/Oslo**
**Work ID:** `VITA-IMPROVEMENTS-20261031-01`
**Scope:** Unmerged review branch only. No PR, CI/Lighthouse, merge, deploy or hold removal.

## Owner-approved source references
- Norwegian user-supplied image `1000026468.png` — 1536×961 RGB, SHA-256 `1d1565ff333188587075335391be3966fe7a40c4694f9598b3d339b0a34697e8`.
- English user-supplied image `1000026467.png` — 1536×961 RGB, SHA-256 `8041ed47504168f67e3745e55cd4be5a51e34c8f86151dab9eef8ef00ceab7a2`.
- **Both visual references owner-verified 16.11.2026**. This is artwork/design validation, NOT original report publication rights, efficacy/BPR/SDS clearance or live responsive-device acceptance.

## Implementation form and limitations
The user-provided PNGs are **visual source references**, not binary embeds in the repository. Under available connector write semantics, the approved appearance is implemented as a **native accessible HTML/CSS adaptation** using the exact semantic copy, stage order and color/layout motif. This is not a pixel-for-pixel reproduction. No external CDN links or public Google Drive sharing were introduced. The original user images remain available in this conversation for future exact-asset import if provider-backed binary upload is made available and separately reviewed.

Changes in this branch:
1. `about/index.html` — replace previous narrow, `object-fit:cover` SVG hero media with a full-width, Norwegian `figure` visual composition.
2. `en/about/index.html` — the matching English composition.
3. `assets/css/styles.css` — scoped two-column approved graphic at desktop, stacked review cards and readable native text at mobile. Preserve all other routes and global hero-image behavior.
4. This record — screenshots, semantic copy, hold gates and source-only acceptance matrix.

### Exact source text
| Element | Norwegian | English |
| --- | --- | --- |
| Eyebrow | Prosjektunderlag | Project context |
| Name | VitaCoat | VitaCoat |
| Main heading | Teknisk vurdering før spesifikasjon | Technical review before specification |
| Lead | Dokumentasjon og bruksområde vurderes per prosjekt. | Documents and intended use are reviewed per project. |
| Layer label | Dokumentasjon | Documentation |
| Step 01 | Bruksområde — Underlag og bruksmiljø | Intended use — Substrate and environment |
| Step 02 | Dokumentasjon — Kilder og begrensninger | Documentation — Sources and limitations |
| Step 03 | Prosjektavklaring — Krav før spesifikasjon | Project review — Requirements for specification |
| Caption | Prosjektspesifikk gjennomgang | Application-specific review |

### Structural acceptance to verify by GitHub readback
- Both pages contain exactly one `vc-approved-about-art` figure, correct original page heading, and their corresponding translated details.
- All original SEO/canonical/hreflang, company, navigation and footer content retained.
- New artwork does not use the existing `object-fit:cover` SVG media, so the old cropping path is not used for these About illustrations.
- CSS scopes to `vc-approved-about-*`, switches head and three-card grid to single-column at ≤860 CSS px and adjusts mobile typography and padding at ≤520 CSS px.
- Layers are accessible via `role=img` and a language-specific label; numbered card content remains real HTML text.
- Original staged NO/EN SVG source files remain unchanged as historical review assets, but they are no longer embedded on the two staged pages.
- No statement here claims rendered browser/physical device checks or production release.

### Open acceptance
**Owner image references:** APPROVED. **Implementation source-only:** requires readback. **Human staged page in-browser test:** PENDING for desktop Chromium/Firefox/WebKit, Android/iOS/tablet, 200% zoom, keyboard and assistive technology. **Regulated claims and rights:** separately governed by open Issue #43. Issue #40 Lighthouse remains PAUSED and Issue #44 Formspree remains on owner HOLD.

[Original QA evidence and test matrix](VITACOAT_ABOUT_NO_EN_VISUAL_ACCEPTANCE_PREP_20261113.md) · [Canonical workstream ledger](../workstreams/VITA_IMPROVEMENTS_20261031_01.md).
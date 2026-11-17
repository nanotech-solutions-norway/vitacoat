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

## Owner approval — 17.11.2026: isolated responsive composition

**Owner decision:** On 17.11.2026 the owner replied **“Approved. Proceed”** immediately following a presentation of the implemented **Norwegian/English desktop and mobile isolated HTML/CSS previews**, referencing review branch commit `9f1af91015e1f816b5303c836934ccd47987c1e2`. This confirms **OWNER_APPROVED_VISUAL_DESIGN** for the previewed native adaptation and its bilingual text; do not ask again for the same design approval. The owner previously verified the submitted source images on 16.11.2026. Approval is not independently authenticated physical-browser performance, statutory product efficacy/BPR/CLP/SDS release, an original laboratory report reproduction licence, or consent to bypass the explicit CI/Lighthouse/Formspree holds.

**Evidence class:** The reviewed artwork is *native HTML/CSS*, not newly uploaded binary source PNGs, and was shown as isolated reconstructed component screenshots. No active staging site or full connected page was viewed by the owner in the approval message. Current approved branch target `vc-nonlighthouse-content-review-20261109@9f1af91015e1f816b5303c836934ccd47987c1e2` before documentation-only approval recording.

### Offline isolated Chromium review (not CI or production)

Local Playwright headless Chromium examined the exact previously provided standalone HTML previews, with review widths **320, 360, 390, 768 and 1440 CSS px per language** (10 combinations). Results verified in independently generated local JSON output:

| Metric | Result | Acceptance scope |
| --- | --- | --- |
| Document-level horizontal overflow (`scrollWidth > clientWidth + 1`) | **0 / 10 scenarios** | Isolated component layout only |
| Three process cards stack vertically at viewport ≤860px | **8 / 8 narrow scenarios** | Isolated component layout only |
| Native text instead of legacy cropped `img` | **10 / 10** | Avoids historical `object-fit:cover` in approved local figure |
| Correct NO/EN stage headings | **10 / 10 source/layout inspections** | Not an independent professional copy/regulatory approval |
| Measured 3–6px VitaCoat wordmark `scrollHeight > clientHeight` | **Minor font-metric diagnostic**, image visibly intact | Inspect under real fonts/browser/zoom in integrated route |
| Physical Android/iPhone and other engine, keyboard/AT, 200% zoom | **NOT_TESTED** | Still a separate pre-release human QA gate |

**Environment/recovery:** Initial direct `file://` navigation returned `ERR_BLOCKED_BY_ADMINISTRATOR` in local browser automation. No provider/system settings changed. The same local HTML preview was instead loaded using the Playwright `set_content` method; Chromium tests completed successfully. This recovery does not constitute an app regression.

**Local deliverable:** `VitaCoat_Approved_About_Review_Pack_20261117.zip` SHA256 `574b199dbd282864377e28891ecc1f46f63e67dfaa13361725c61ceec66ee065`, locally verified ZIP with **15 files**, containing isolated HTMLs, earlier owner-reviewed 4 preview screenshots, extra 320/390/1440 Chromium screenshots, JSON measurements and README. Delivered only inside the ChatGPT session; not pushed or made publicly accessible via GitHub.

### Release gates and exact status
- Design **OWNER APPROVED** for both Norwegian and English native isolated previews.
- Branch-level source integration **VERIFIED**, with exact owner-approved copy, layout classes and responsive styles in GitHub.
- Full connected staged About-page human review **PENDING**: desktop cross-browser, actual mobile/tablet, keyboard/screen reader, 200% zoom, navigation, optional production verification under separately authorized deployment.
- **Issue #43 OPEN** for claim/publication decisions beyond this non-regulated visual approval.
- **Issue #40 Lighthouse PAUSED**, **Issue #44 Formspree OWNER HOLD**, no permission inferred from the approval to lift either.
- **No PR, CI/Lighthouse workflow, merge, deployment, DNS change, producer/legal signoff or external request** in this update.
- Before any actual release, explicitly reconcile the project production-handoff requirements and the holds; only then run original gates and accept production.

**Tracking:** Canonical append-only ledger E133–E134 (`docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md`); this approval record is derived documentation, not a competing ledger.


## Owner private integrated review acceptance — 17.11.2026

**Decision:** `OWNER_ATTESTED_PRIVATE_REVIEW_APPROVED`. The project owner expressly states on 17.11.2026: “Private review complete. All approved. Implement and proceed accordingly.” Covers the owner-controlled **Norwegian and English About design, localization, page visual/device review and native responsive composition** previously implemented and previewed. Accept this completed private review without requesting repeat design authentication or personal signoff. This is not a signed issuer report/licence, new formulation, qualified BPR/SDS/CLP determination or manufacturer authorisation.

**Evidence integrity:** This approval is **owner attestation**; the private device/browser review matrix, individual screenshots, detailed operating system/browser versions, accessibility tree and test recordings were not separately provided to ChatGPT and have **NOT been independently validated here**. Do not relabel old historical `NOT_TESTED` rows as automatically executed independent tests. The new decision is owner-approved at the integrated page level, while third-party independent testing remains `EVIDENCE_NOT_AVAILABLE_IN_CHAT`.

**Release packaging implemented:** On 17.11.2026, created clean, intentionally **unmerged** source candidate `vc-about-owner-approved-release-candidate-20261117@2abbb456a9fc74bc0eac8410b88836f1a0b9ddb3` based directly on verified unchanged `main@de4bba618f421cca7023ceb2aa9b60e854960228`. GitHub comparison readback shows **exactly 3 changed files**, with matching Git blob hashes to approved working branch source:

| Release candidate path | Approved Git blob SHA |
| --- | --- |
| `about/index.html` | `024953aff75abf1822631d5ab393e13336790f48` |
| `en/about/index.html` | `7a8d08f77c1427071d8fec124a7bbb63c92510f1` |
| `assets/css/styles.css` | `137b8a2075018c614a294f738aa10996a7ec82f6` |

**Why isolated:** The original `vc-nonlighthouse-content-review-20261109` was 62 commits ahead of main and included 25 changed paths, mostly regulatory evidence and other held review documentation. Clean candidate has **one commit on main, exactly the intended three source paths**, and leaves existing claim/BPR/Formspree documentation out of any later release diff. Original neutral SVG files remain source-reference history and are not part of this native HTML/CSS release candidate.

**Do not infer release authorization:** Current source-specific issue gates are independent of private visual signoff. #40 quality cold-run/Lighthouse pause remains explicit until separately lifted with original thresholds intact; #43 claim/regulatory/publication-rights issue remains OPEN, with qualified signoffs unverified; #44 account-side Formspree stays ON HOLD. A GitHub PR to `main` would immediately trigger production-quality Lighthouse workflows despite the current pause. Therefore **no PR, CI, Lighthouse, merge, deploy, DNS or published claim changes were performed**. Future release requires a separate recorded resolution of blocking gates and full repository production handoff checks. GitHub source and any open production site remain unchanged.

**Canonical ledger:** `docs/workstreams/VITA_IMPROVEMENTS_20261031_01.md` E135 onward; this appendix is a derived owner decision and candidate source manifest.

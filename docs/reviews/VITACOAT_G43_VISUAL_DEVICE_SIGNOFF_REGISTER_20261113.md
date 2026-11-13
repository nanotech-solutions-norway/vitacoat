# VitaCoat — G43-07 Norwegian/English About SVG and Physical Device Signoff Register
**01:06, 13.11.2026 · Europe/Madrid**
**Work ID:** `VITA-IMPROVEMENTS-20261031-01` · **Baseline:** `main@de4bba618f421cca7023ceb2aa9b60e854960228`
**Classification:** PENDING_REVIEW / SOURCE-ONLY RECONCILIATION / NO HUMAN DEVICE TEST OR APPROVAL. Supplements [the existing owner visual/device acceptance sheet](VITACOAT_OWNER_VISUAL_DEVICE_ACCEPTANCE_20261111.md). No site/source change, preview deployment or CI authorized.

## Verified staged source fingerprints
| File | Git blob | Scope |
| --- | --- | --- |
| `assets/img/vitacoat-about-review-no.svg` | `342dccf66fe5561cbe53b403f65097ccc071b368` | Three-stage Norwegian neutral technical project illustration |
| `assets/img/vitacoat-about-review-en.svg` | `22be187806c3d9b16fcb32159ca8bd0e20d3e055` | Three-stage English counterpart |
| `about/index.html` | `e20308c4412c252a5b06a92f6ce86d29e45add2a` | About NO now references staged NO SVG, localized alt: 'Illustrasjon av teknisk prosjektvurdering for VitaCoat' |
| `en/about/index.html` | `bca35a9df46bee2a777792f9f22c2d6ce8a41a4c` | About EN now references staged EN SVG, localized alt: 'Illustration of VitaCoat technical project review' |
| `docs/VITACOAT_CLAIM_EVIDENCE_MATRIX_20261101.md` | `35d1c6ddee5d0619dec9a7af6e5fd755d559d3b8` | Pre-existing 50-route source inventory; earlier About row `VC-C02` still points to original `vitacoat-home-panel.svg` |

## Bilingual content reconciliation — source text only
| Element | Norwegian SVG | English SVG | Source relationship |
| --- | --- | --- | --- |
| Heading | Teknisk vurdering før spesifikasjon | Technical review before specification | Corresponding technical scope; human language approval pending |
| Introduction | Dokumentasjon og bruksområde vurderes per prosjekt. | Documents and intended use are reviewed per project. | Corresponding project-specific context |
| Step 01 | Bruksområde / Underlag og bruksmiljø | Intended use / Substrate and environment | Corresponding |
| Step 02 | Dokumentasjon / Kilder og begrensninger | Documentation / Sources and limitations | Corresponding |
| Step 03 | Prosjektavklaring / Krav før spesifikasjon | Project review / Requirements for specification | Corresponding |
| Footer | Prosjektspesifikk gjennomgang | Application-specific review | Corresponding |

**Claim matrix exception:** The original `VC-C02` entry reflects the *earlier source revision* and old About SVG. The staged branch swaps in neutral NO/EN review SVGs, but **the original inventory was not regenerated or silently rewritten**. Before any eventual release, human technical owner must reconcile the exact NO/EN URL and embedded SVG statement matrix at that approved revision. Source text contains no specific six-month antimicrobial statement in these two new SVG extracts. This cannot establish current product efficacy, BPR classification, copyright consent or actual rendered legibility.

## Human acceptance matrix — all untested
| Test and expected artifact | NO | EN | Human owner/date/evidence |
| --- | --- | --- | --- |
| Chromium desktop 1440×900: intact layout, contrast, alignment, keyboard | NOT_TESTED | NOT_TESTED | ___ |
| Firefox desktop 1440×900: SVG fonts, gradients and text bounds | NOT_TESTED | NOT_TESTED | ___ |
| WebKit desktop 1440×900: SVG/opacity, responsive layout | NOT_TESTED | NOT_TESTED | ___ |
| Android Chrome physical device: width 360/390, 200% zoom, screen reader/menu, language | NOT_TESTED | NOT_TESTED | ___ |
| iOS Safari physical device: width 375/390, focus/touch, orientation, contrast | NOT_TESTED | NOT_TESTED | ___ |
| Tablet at 768×1024, no clipping or unintended overflow | NOT_TESTED | NOT_TESTED | ___ |
| Independent accessibility/keyboard/alt and heading review | NOT_TESTED | NOT_TESTED | ___ |
| NO/EN brand, source-study limitations and regulated language signoff | PENDING_REVIEW | PENDING_REVIEW | ___ |

## Signature fields / gate
Responsible human brand reviewer ___; product/claims reviewer ___; exact staged SHA ___; device/OS/browser/viewport/DPR ___; capture/observation location (restricted where applicable) ___; NO decision ACCEPT / CHANGE / HOLD ___; EN decision ACCEPT / CHANGE / HOLD ___; reviewer signature/date ___; qualified regulatory claim review reference ___; separate final release authority ___.

**Release blocked:** Original production About asset stays unchanged. Human device renders were not conducted. No artificial acceptance, PR, CI/Lighthouse, merge, deployment or DNS mutation. Issue #43 OPEN; #44 ON HOLD; #40 Lighthouse PAUSED.

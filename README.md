# VitaCoat Website

Static GitHub Pages implementation for the VitaCoat website, based on the approved VitaCoat source material and supporting technical documentation.

## Production structure

- `index.html` — Norwegian homepage
- `en/index.html` — English homepage
- `assets/css/styles.css` — global design system and responsive layout
- `assets/js/site.js` — lightweight progressive enhancement only
- `assets/img/` — repository-owned production image assets
- `assets/downloads/` — approved downloadable technical material
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` — discovery and crawl support
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment
- `.github/scripts/audit_frontend.py` — pre-deployment frontend integrity audit

## Frontend rules

- Navigation and footer markup are authoritative static HTML. JavaScript must not rebuild the site shell.
- Production pages must not depend on Gamma CDN imagery.
- Public contact routing uses the VitaCoat contact pages and current `vitacoat.no` identity.
- Legacy route files are redirect stubs only and are excluded from the sitemap.
- Norwegian is the root language; English is served under `/en/`.
- Claim wording must remain within the approved VitaCoat evidence and limitation framework.

## Deployment

GitHub Pages publishes the repository root from `main`. Before the Pages artifact is uploaded, the frontend audit checks canonical sitemap files, stale external dependencies, deprecated email-domain references, and local image references.

## Visual hardening

The September 2026 hardening pass moves reconstruction-era runtime styling into the main stylesheet, restores hierarchical mobile navigation, keeps desktop dropdowns selectable across the hover gap, reduces card/shadow density, improves section rhythm, and standardizes stable local hero assets. Further image-format optimization and source-visual recreation can be handled as a subsequent asset/performance pass.


## Performance delivery

Production deployment is built into `_site/` before upload to GitHub Pages. The build stage:

- converts qualifying JPEG assets to WebP at controlled quality while retaining source originals in the repository;
- constrains oversized raster dimensions for browser delivery;
- rewrites deployed references to optimized derivatives;
- adds intrinsic dimensions to local raster images to reduce layout shift;
- validates aggregate byte savings and prevents large JPEG delivery from canonical pages;
- runs on pull requests as a non-deploying build/audit check.

The source repository remains the archival-quality input; `_site/` is generated only in GitHub Actions and is not committed.

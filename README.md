# VitaCoat Website

Static GitHub Pages implementation for the VitaCoat website, based on the approved VitaCoat source material and supporting technical documentation.

## Production structure

- `index.html` — Norwegian homepage
- `en/index.html` — English homepage
- `assets/css/styles.css` — global design system and responsive layout
- `assets/js/site.js` — lightweight progressive enhancement and provider-neutral measurement events
- `assets/img/` — repository-owned production image assets
- `assets/downloads/` — approved downloadable technical material
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` — discovery and crawl support
- `.github/workflows/deploy-pages.yml` — optimized GitHub Pages build, deploy and post-deploy acceptance
- `.github/scripts/audit_frontend.py` — frontend integrity audit
- `.github/scripts/audit_release.py` — SEO, schema, internal-link and discovery acceptance audit
- `.github/scripts/audit_accessibility.py` — canonical-page accessibility, ARIA, keyboard-hook and mobile-markup audit
- `.github/scripts/audit_performance_budget.py` — CSS/JS/HTML/image delivery regression budget
- `.github/scripts/production_acceptance.py` — live custom-domain release verification
- `docs/measurement-and-acceptance.md` — measurement event contract and release gates

## Frontend rules

- Navigation and footer markup are authoritative static HTML. JavaScript must not rebuild the site shell.
- Production pages must not depend on Gamma CDN imagery.
- Public contact routing uses the VitaCoat contact pages and current `vitacoat.no` identity.
- Legacy route files are redirect stubs only and are excluded from the sitemap.
- Norwegian is the root language; English is served under `/en/`.
- Claim wording must remain within the approved VitaCoat evidence and limitation framework.

## Deployment

GitHub Pages publishes the generated `_site/` artifact from `main`. Pull requests run static SEO, frontend, performance, accessibility/agent-readiness and release-acceptance checks without deploying. Main deployments run the same gates, deploy the optimized artifact, then verify the live `www.vitacoat.no` release.

Static SEO governance is read-only in CI. Metadata changes must be committed through a normal branch and pull request; workflows do not auto-commit to `main`.

## Performance delivery

Production deployment is built into `_site/` before upload to GitHub Pages. The build stage:

- converts qualifying JPEG assets to WebP at controlled quality while retaining source originals in the repository;
- constrains oversized raster dimensions for browser delivery;
- rewrites deployed references to optimized derivatives;
- adds intrinsic dimensions to local raster images to reduce layout shift;
- lazy-loads non-critical images while keeping high-priority hero/LCP images eager;
- validates aggregate byte savings and prevents large JPEG delivery from canonical pages;
- enforces CSS/JS/HTML/raster delivery budgets in CI.

The source repository remains the archival-quality input; `_site/` is generated only in GitHub Actions and is not committed.

## Measurement

The site emits a small provider-neutral event contract for high-value CTA, download, language and contact-form interactions. It does not activate analytics, set cookies or transmit form-field values by itself. See `docs/measurement-and-acceptance.md`.

## Accessibility and agent readiness

Canonical pages include a static skip-to-main link, a focusable main landmark, accessible language-switch names, named mobile submenu controls and explicit menu state labels. Shared JavaScript supports Escape-to-close with focus return, while CSS preserves visible keyboard focus, reduced-motion handling and compact-screen reflow. The mobile EN-performance chart places the test-standard label inside each bar while retaining the desktop label layout.

The deployment pipeline runs `.github/scripts/audit_accessibility.py` against the generated site so these semantics and interaction hooks are release-gated.

## Structured data and handoff

Every canonical page carries WebPage structured data; non-home canonical pages also carry BreadcrumbList hierarchy. Documentation hubs expose public PDFs as DigitalDocument entities. See `docs/schema-map.md`.

Operational ownership, rollback, account-side tasks and hosting limitations are documented in `docs/production-handoff.md`, `docs/performance-budget.md` and `docs/security-hosting-constraints.md`.

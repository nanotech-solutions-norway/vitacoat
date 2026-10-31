# VitaCoat Production Handoff and Final Acceptance

Date: 2026-09-30  
Repository: `nanotech-solutions-norway/vitacoat`  
Production domain: `https://www.vitacoat.no/`  
Hosting: GitHub Pages  
Default branch: `main`

## Purpose

This document is the final operational handoff for the VitaCoat website reconstruction and hardening programme. It records what is release-gated automatically, what is verified after deployment, and what still requires account-side or human review.

## Production architecture

- Static HTML/CSS/JavaScript source is version controlled in GitHub.
- Norwegian is served from the root URL structure.
- English is served below `/en/`.
- GitHub Actions builds an optimized `_site/` artifact.
- Qualifying JPEG assets are converted to optimized WebP derivatives during the build.
- Build-time release enhancement adds visible breadcrumbs and matching `BreadcrumbList` JSON-LD to canonical non-home pages.
- The download centers expose a `CollectionPage` model with the seven currently published PDF resources represented as `DigitalDocument` items.
- GitHub Pages publishes only after static SEO, frontend, accessibility, release and production-quality gates pass.
- Post-deploy production acceptance validates the custom domain.

## Automated release gates

### Static source and generated-site controls

1. Static SEO metadata audit.
2. Optimized image build and byte-saving threshold.
3. Frontend integrity audit.
4. Accessibility and agent-readiness audit across all canonical pages.
5. Release audit covering sitemap, canonical URLs, hreflang, JSON-LD, links, images, robots and discovery files.
6. Breadcrumb and downloadable-document schema generation.
7. Lighthouse lab budgets.
8. Cross-browser responsive smoke tests in Chromium, Firefox and WebKit.
9. Responsive screenshot capture at 360 px mobile and 1440 px desktop.
10. Security baseline, dependency review and CodeQL.
11. GitHub Pages deployment.
12. Live production acceptance against `www.vitacoat.no`.

## Lighthouse acceptance budgets

Representative Norwegian and English pages are tested in mobile and desktop modes.

- Performance score: at least 0.90.
- Accessibility score: at least 0.95.
- Best Practices score: at least 0.95.
- SEO score: at least 0.95.
- Lab Largest Contentful Paint: at most 2,500 ms.
- Lab Cumulative Layout Shift: at most 0.10.
- Total Blocking Time: at most 200 ms.

Lighthouse cannot measure real-user Interaction to Next Paint because it does not have actual user interaction. TBT is used only as a lab responsiveness diagnostic and is not reported as field INP.

## Cross-browser smoke scope

Each supported engine runs representative pages at mobile and desktop sizes.

Validated behaviors include:

- successful page load and single main/H1 structure;
- no horizontal overflow;
- local images load successfully;
- skip link remains present;
- desktop dropdown remains visible while the pointer stays within the dropdown area;
- desktop dropdown is keyboard accessible;
- Escape returns focus correctly;
- mobile menu opens/closes and exposes correct ARIA state;
- mobile submenu target remains associated with its control;
- contact forms remain visible and usable;
- mobile evidence bars show the test-standard label inside the bar;
- desktop evidence bars retain the desktop label layout.

Screenshot artifacts are retained in GitHub Actions for short-term visual review.

## Structured data model

Current release-gated types include:

- `Organization`
- `WebSite`
- `Brand`
- `Product`
- `WebPage`
- `AboutPage`
- `ContactPage`
- `FAQPage`
- `BreadcrumbList`
- `CollectionPage`
- `DigitalDocument`

Structured data must continue to match visible page content and published files. Adding schema for unpublished, private, draft or unavailable documents is prohibited.

## Measurement and privacy boundary

The website emits provider-neutral browser events for high-value interactions. It does not, by itself:

- activate an analytics provider;
- create analytics cookies;
- transmit personal contact-form fields to an analytics destination;
- enable external tracking.

Any future analytics provider must be explicitly approved and reviewed for privacy, consent and data minimization before activation.

## External/account-side items

The following cannot be truthfully marked complete from repository CI alone:

- Google Search Console ownership, sitemap submission and URL inspection.
- Bing Webmaster Tools ownership, sitemap submission and AI Performance review.
- Field Core Web Vitals at the 75th percentile once sufficient real-user data exists.
- Any approved analytics-provider configuration and reporting.
- Formspree account-side inbox/delivery monitoring beyond frontend submission behavior.
- Real physical-device testing on representative iOS and Android hardware.
- Human visual parity/sign-off against the approved source screenshots/PDF/Gamma baseline.
- Legal/compliance review by the responsible business/legal owner.

These items are not release blockers unless the project owner explicitly promotes them to required acceptance gates.

## Operational update procedure

For future website changes:

1. Create a branch from current `main`.
2. Make source changes only; do not hand-edit generated `_site/`.
3. Keep claims inside the approved evidence and limitation framework.
4. Run the existing PR checks.
5. Review Lighthouse/browser artifacts when layout, navigation or media changes.
6. Merge only with required checks green.
7. Confirm the main deployment and post-deploy production acceptance are green.
8. For material content or URL changes, update Search Console/Bing account-side records as applicable.

## Rollback

GitHub history is the rollback source. If a production regression occurs:

1. identify the last known-good merge commit;
2. revert the faulty merge or submit a corrective PR;
3. allow the normal build and deployment pipeline to republish;
4. require post-deploy production acceptance before closing the incident.

Do not bypass the release gates by manually editing the published Pages artifact.

## Known hosting constraint

GitHub Pages is a static hosting platform and does not expose the same response-header control as a configurable reverse proxy/CDN. If future security requirements demand custom CSP, HSTS tuning, Permissions-Policy or other response headers beyond what GitHub Pages provides, place a controllable CDN/reverse proxy in front of the site or migrate hosting.

## Final acceptance interpretation

Repository/build correctness, automated responsive behavior, accessibility semantics, structured data, search-discovery controls and deployment integrity are release-gated. Human visual sign-off, field performance and third-party account configuration remain separate evidence classes and must not be inferred from successful CI.

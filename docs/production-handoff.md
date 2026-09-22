# VitaCoat Production Handoff

Status date: 22 September 2026.

## Production target

- Repository: `nanotech-solutions-norway/vitacoat`
- Default production branch: `main`
- Hosting: GitHub Pages via GitHub Actions
- Custom domain: `https://www.vitacoat.no/`
- Languages: Norwegian root + English under `/en/`
- Canonical sitemap count: 50 URLs
- Contact form: Formspree endpoint configured in `assets/js/formspree-contact.js`
- Analytics: provider-neutral event contract only; no third-party analytics provider activated

## Build and deployment

The Pages workflow:
1. audits static SEO;
2. installs the pinned image optimizer;
3. builds `_site/`;
4. runs frontend integrity;
5. runs accessibility/agent-readiness;
6. runs performance budgets;
7. runs full release/schema/link validation;
8. deploys only from main;
9. verifies the live custom domain after deployment.

Generated `_site/` is not committed.

## Acceptance state

Automated controls cover:
- canonical sitemap files and internal links;
- canonical/hreflang metadata;
- JSON-LD syntax and required schema types;
- entity/discovery files;
- accessibility landmarks/names/ARIA hooks;
- mobile evidence-bar markup;
- image optimization and delivery budgets;
- security baseline/dependency review/CodeQL;
- post-deployment HTTP 200 + live canonical verification.

## Content and claim governance

VitaCoat remains positioned as a supplementary hygienic surface layer and not a replacement for routine cleaning/disinfection. Controlled TDS/SDS/test reports and project-specific technical review govern final specifications and claims.

## Rollback

For a faulty production merge:
1. create a revert commit/PR against the offending main merge;
2. run the full PR checks;
3. merge the revert;
4. allow Pages to redeploy;
5. require production acceptance to pass.

Do not patch generated `_site/` manually.

## Account-side items not completed by repository automation

These require owner/account access and should not be represented as completed until verified:
- Google Search Console ownership, sitemap submission, URL inspection and Core Web Vitals field review;
- Bing Webmaster Tools / AI Performance / IndexNow decisions;
- selection and activation of GA4, Matomo, Plausible or another analytics provider;
- Formspree account-level retention, spam/rate-limit and notification configuration;
- DNS registrar/account ownership documentation;
- asset/font licensing evidence register;
- final legal/privacy/GDPR review;
- security-header enforcement via a header-capable CDN/proxy/host if required.

## Maintenance cadence

After material content or template changes:
- merge through a PR only;
- keep all automated release gates green;
- verify the post-deploy production acceptance;
- review structured data after entity/document changes;
- review field performance after major media/script/font changes;
- update this handoff when ownership, hosting, forms, analytics or DNS changes.

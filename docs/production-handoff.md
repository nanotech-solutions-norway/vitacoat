# VitaCoat production handoff

## Purpose

This document is the final operational handoff for the static VitaCoat website on GitHub Pages. It summarizes the production architecture, release gates, validation responsibilities, rollback path, and the external checks that remain account-dependent.

## Production architecture

- Repository: `nanotech-solutions-norway/vitacoat`
- Default branch: `main`
- Hosting: GitHub Pages
- Canonical production host: `https://www.vitacoat.no/`
- Norwegian: root URLs
- English: `/en/`
- Generated deployment artifact: `_site/`
- Canonical URL inventory: 50 sitemap URLs
- Contact submission: Formspree endpoint configured in the published contact form
- Analytics: provider-neutral browser events only; no analytics provider is activated by the repository itself

## Release chain

Every proposed release is expected to pass:

1. Static SEO audit.
2. Optimized site build and image conversion.
3. Frontend integrity audit.
4. Accessibility and agent-readiness audit.
5. Release acceptance audit.
6. Browser quality baseline:
   - Lighthouse CI on representative Norwegian and English pages.
   - Chromium, Firefox and WebKit acceptance at 320 px mobile and 1440 px desktop.
7. GitHub Pages deployment from `main`.
8. Live production acceptance against `www.vitacoat.no`.

The deployment workflow remains separate from the browser-quality workflow. Browser tooling can therefore block a proposed release without being able to publish it.

## Browser acceptance contract

Representative routes cover the homepage, contact flow, and testing/standards content in both languages. Automated browser checks validate:

- one H1 and one main landmark;
- no horizontal overflow at compact mobile width;
- mobile menu starts collapsed;
- mobile menu and submenu expand correctly;
- Escape closes the menu and restores focus;
- desktop navigation is visible while the mobile control is hidden;
- desktop dropdowns start collapsed, open on hover, and remain selectable while the pointer is inside the dropdown;
- mobile testing bars expose the test-standard label inside the bar;
- desktop testing labels remain visible;
- contact form controls remain labeled.

## Lighthouse baseline

The local generated deployment artifact is audited twice per representative route. Current regression thresholds are:

- Performance category: at least 0.85.
- Accessibility category: at least 0.95.
- Best Practices category: at least 0.90.
- SEO category: at least 0.95.
- CLS: no more than 0.15.
- LCP: warning above 3.0 seconds.
- Total Blocking Time: warning above 300 ms.

Lab metrics are release-regression controls, not substitutes for field Core Web Vitals.

## Structured data

The release audit validates existing Organization, WebSite, Brand, Product, AboutPage, FAQPage, ContactPage and WebPage coverage where applicable.

Phase 8 adds:

- `BreadcrumbList` to every canonical non-home generated page, following the actual navigation hierarchy.
- `ItemList` + nested `DigitalDocument` entities on both download-center pages for the seven PDFs that are already publicly listed and linked.

No SDS/TDS document entity is published until a real public download exists.

## Search and AI discoverability

Repository-controlled readiness includes:

- canonical URLs and hreflang;
- sitemap and robots controls;
- crawlable internal HTML links;
- schema parity with published page content;
- `llms.txt` and `llms-full.txt`;
- entity identity for NanoTech Solutions Norway AS and VitaCoat;
- release validation of public discovery files.

Account-side verification remains external to this repository:

- Google Search Console ownership, sitemap submission, URL Inspection and Search performance.
- Bing Webmaster Tools / AI Performance.
- Field Core Web Vitals and CrUX/PageSpeed data after sufficient traffic.
- Any approved analytics platform and consent configuration.

## Claim governance

Technical and microbiological statements must remain within the controlled VitaCoat evidence and limitation framework. Routine cleaning and disinfection are not replaced. Test values must remain contextualized by method, contact time, substrate, application and laboratory conditions. Controlled product documents govern final specifications and claims.

## Rollback

If a production regression is identified:

1. Identify the last known-good merge commit on `main`.
2. Revert the offending pull request through GitHub rather than editing the generated `_site/` artifact.
3. Allow the standard Pages workflow to rebuild and redeploy from the reverted source.
4. Confirm the post-deploy production-acceptance job passes.
5. Re-open the failed change on a new branch with regression coverage added before re-release.

Do not manually patch the generated Pages artifact as the long-term fix.

## Final sign-off evidence

A release is technically ready when the repository checks, browser-quality workflow, Pages deployment and live production acceptance are green. Search-console indexing, field performance and analytics data remain operational measurements that require the corresponding external accounts and sufficient observation time.

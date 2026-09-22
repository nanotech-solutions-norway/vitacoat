# VitaCoat Security and Hosting Constraints

Last reviewed: 22 September 2026.

## Current hosting model

VitaCoat is a static GitHub Pages site with the custom production domain `www.vitacoat.no`. Production acceptance verifies the HTTPS URL after every main deployment.

GitHub documents HTTPS support and enforcement for Pages custom domains:
https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## Response-header limitation

GitHub Pages does not currently expose repository-level custom HTTP response-header configuration. That means the repository cannot itself enforce header-only controls such as:
- Strict-Transport-Security (HSTS);
- Content-Security-Policy response headers;
- X-Content-Type-Options;
- Permissions-Policy;
- frame-ancestors / equivalent framing policy.

GitHub staff/community references:
- https://github.com/orgs/community/discussions/54257
- https://github.com/orgs/community/discussions/84963

The site therefore does not claim those controls are implemented when they are not.

## Controls implemented in the static site

- HTTPS production URLs and no mixed-content dependencies in canonical markup.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` on canonical pages.
- No third-party script tags.
- Form submissions use the public Formspree endpoint; no credentials are stored client-side.
- GitHub security baseline, dependency review and CodeQL run in CI.
- Public source/build artifacts are scanned by existing frontend/release audits.

## If response headers become mandatory

Put the custom domain behind a header-capable edge/CDN/proxy or migrate static hosting. Before enforcement, test a CSP in Report-Only mode on a header-capable platform.

A candidate starting policy must account for the current dependencies and be tested rather than copied blindly:

```
default-src 'self';
script-src 'self';
style-src 'self' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' https://formspree.io;
form-action 'self' https://formspree.io;
object-src 'none';
base-uri 'self';
frame-ancestors 'none';
```

HSTS should only be enabled after confirming the domain/subdomain HTTPS strategy and any preload implications.

## Known operational dependency

Server-side anti-abuse, rate limiting, retention and delivery behavior for the contact form are controlled by Formspree, not by GitHub Pages or the static repository. Review the Formspree account configuration as part of operational ownership.

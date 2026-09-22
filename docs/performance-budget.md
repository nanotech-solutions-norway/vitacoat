# VitaCoat Performance Budget and Field Measurement

Last reviewed: 22 September 2026.

## Purpose

The CI budget prevents avoidable regressions in the static site. It is not a substitute for real-user Core Web Vitals data.

## CI regression budgets

The generated `_site/` artifact must stay within these release limits:

| Control | Budget |
| --- | ---: |
| Global CSS | <= 40 KiB |
| `site.js` | <= 16 KiB |
| Form JS | <= 8 KiB |
| Combined first-party JS | <= 24 KiB |
| Any canonical HTML document | <= 180 KiB |
| Optimized raster set | <= 2 MiB |
| Individual generated WebP | <= 350 KiB |
| Aggregate qualified JPEG saving | >= 70% |

Additional gates:
- no external JavaScript on canonical pages;
- remote images are not allowed;
- high-priority images may not be lazy-loaded;
- all non-critical images are build-time `loading="lazy"` + `decoding="async"`;
- local raster images require intrinsic width and height;
- Google Fonts is the only currently approved external stylesheet origin.

## Core Web Vitals field targets

The current web.dev "good" thresholds are:
- LCP <= 2.5 seconds;
- INP <= 200 milliseconds;
- CLS <= 0.1;
- assessed at the 75th percentile and segmented by mobile/desktop.

Reference: https://web.dev/articles/vitals

Field validation should use Search Console / Chrome UX Report / PageSpeed Insights where data exists. Lab tools such as Lighthouse are useful for regression diagnosis but do not replace field INP.

## Current delivery controls

The build pipeline converts qualifying JPEGs to WebP, constrains oversized rasters, adds intrinsic raster dimensions, and now adds lazy loading to non-critical images. Hero/LCP images keep explicit high fetch priority and remain eager.

## Review trigger

Re-run field and lab performance review after:
- new hero/media assets;
- third-party scripts;
- analytics activation;
- font changes;
- large content/template changes;
- hosting/CDN changes.

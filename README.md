# VitaCoat Website

Static GitHub Pages implementation for the VitaCoat website, recreated from the approved Gamma source and supporting VitaCoat technical materials.

## Build scope

This repository contains:

- `index.html` — main VitaCoat website
- `assets/css/styles.css` — global design system and layout styling
- `assets/js/site.js` — lightweight navigation behavior
- `404.html` — custom not-found page
- `robots.txt` and `sitemap.xml` — crawl support
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow

## Notes

- All email references use the `@vitacoat.eu` domain.
- The site is implemented as a static GitHub Pages build.
- The design direction follows the Gamma source and project handoff guidance.
- Deployment workflow corrected on 2026-04-20 to remove the recursive artifact copy step.

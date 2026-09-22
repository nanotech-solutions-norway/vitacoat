# VitaCoat Structured Data Map

Last reviewed: 22 September 2026.

## Global entity identifiers

- Organization: `https://www.vitacoat.no/#organization`
- Brand: `https://www.vitacoat.no/#brand`
- Product: `https://www.vitacoat.no/#product`
- Website: `https://www.vitacoat.no/#website`

## Route coverage

| Route group | Schema |
| --- | --- |
| Norwegian and English home | Organization, ContactPoint, Brand, WebSite, Product, WebPage |
| All non-home canonical pages | WebPage, BreadcrumbList |
| About | Organization, ContactPoint, AboutPage, WebPage, BreadcrumbList |
| FAQ | FAQPage, WebPage, BreadcrumbList |
| Contact | ContactPage, WebPage, BreadcrumbList |
| Documentation + Download Center, both languages | WebPage, BreadcrumbList, seven DigitalDocument entities |
| Technical evaluation | WebPage, BreadcrumbList |
| Remaining application/benefit/proof/support pages | WebPage, BreadcrumbList |

Breadcrumbs use canonical pages only. Application detail routes use Home -> Applications -> detail. Download Center uses Home -> Technical Support -> Download Center. Routes without a canonical intermediate hub use Home -> current page rather than inventing a non-existent breadcrumb URL.

## Public technical documents

Seven public PDFs are modeled as `DigitalDocument` using their public VitaCoat URLs, visible document names, `application/pdf` encoding format, the VitaCoat product entity and NanoTech Solutions Norway AS publisher entity. No author/date/version metadata is asserted unless supported by the controlled source.

## Validation

`.github/scripts/audit_release.py` parses all JSON-LD, requires WebPage on every canonical page, BreadcrumbList on every non-home canonical page, and DigitalDocument on the document hubs.

Google breadcrumb reference:
https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

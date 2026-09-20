# VitaCoat Measurement and Release Acceptance

## Purpose

This file defines the measurement contract and release gates for the public VitaCoat website. It does not activate a third-party analytics provider and does not authorize collection of personal form-field values.

## Browser measurement events

`assets/js/site.js` dispatches a `vitacoat:measurement` CustomEvent. If an existing `window.dataLayer` array is present, the same payload is pushed to it. No `dataLayer` is created and no network request is made by this measurement layer.

| Event | Trigger | Data |
| --- | --- | --- |
| `cta_contact` | Internal link to a contact page | page path, language, destination path |
| `cta_documentation` | Internal link to documentation | page path, language, destination path |
| `cta_technical_evaluation` | Internal link to technical evaluation | page path, language, destination path |
| `download_click` | Public document/download link | page path, language, destination path |
| `language_switch` | Language selector link | page path, language, destination path |
| `outbound_link` | Link to another domain | page path, language, destination host |
| `contact_form_validation_error` | Contact form fails browser validation | page path, language, form id only |
| `contact_form_submit_attempt` | Valid form submission starts | page path, language, form id only |
| `contact_form_submit_success` | Formspree accepts the request | page path, language, form id only |
| `contact_form_submit_error` | Form submission fails | page path, language, form id only |

Do not add names, email addresses, company names, message content, free-text fields, or other user-entered values to measurement events.

## Provider activation

A future GA4, GTM, Matomo, Plausible or equivalent implementation may consume the event contract only after the provider, consent/cookie requirement, property/container identifier and privacy configuration are explicitly approved. The current implementation is provider-neutral.

## Pre-deployment gates

Pull requests and main deployments validate:

- static SEO map coverage against the sitemap;
- title, description, canonical and reciprocal hreflang consistency;
- canonical sitemap file existence;
- local image and internal-link integrity;
- HTML language and single-H1 structure;
- JSON-LD syntax and required schema types on high-value pages;
- robots.txt sitemap declaration and absence of a site-wide crawl block;
- entity/discovery references in llms.txt and llms-full.txt;
- optimized raster delivery and existing frontend integrity rules.

## Post-deployment production acceptance

After GitHub Pages deployment, the workflow checks the custom production domain and requires:

- the live sitemap to match the release sitemap;
- every canonical sitemap URL to return HTTP 200;
- each live canonical tag to match its requested URL;
- optimized WebP hero delivery;
- current company/entity markers on the About page;
- current technical-evaluation content;
- FAQPage and ContactPage structured data markers;
- robots.txt and llms.txt discovery controls;
- noindex on Norwegian and English thank-you pages.

External account-side validation remains necessary for Google Search Console, Bing Webmaster Tools / AI Performance, field Core Web Vitals and any approved analytics platform.

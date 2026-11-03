# Fixify

Fixify is a specialist analytics engineering and measurement website positioned around one idea: **fix broken tracking and build measurement people can trust**. The site connects GA4, Google Tag Manager, consent, server-side collection, CRM outcomes, revenue reconciliation, BigQuery, BI and reporting instead of presenting a flat catalogue of tools.

## Local development

```bash
pnpm install
pnpm dev
```

The site uses a React/Vite frontend with static HTML entrypoints for the homepage, the Services hub, ten high-intent service pages, five solution pages, Case Studies, Guides, Glossary, Approach, About and Contact. Existing platform category URLs under `/services/` remain valid and lead visitors back to the pillar-led architecture.

## Information architecture

The main Services experience is organized into five pillars: **Measure**, **Govern**, **Protect**, **Connect** and **Decide**. The dedicated landing pages are `/ga4-implementation/`, `/ga4-audit/`, `/google-tag-manager/`, `/tracking-fix/`, `/consent-mode-cmp/`, `/server-side-tagging/`, `/crm-offline-conversions/`, `/measurement-strategy/`, `/ga4-bigquery-bi/` and `/measurement-qa-monitoring/`.

Solutions cover `/solutions/b2b-lead-generation/`, `/solutions/ecommerce/`, `/solutions/saas-subscription/`, `/solutions/agencies/` and `/solutions/multi-brand/`. `/case-studies/` provides an evidence-first case-study structure without invented metrics. `/guides/` and `/glossary/` provide practical search-focused content entry points, with individual generated resource routes for the initial guide and glossary set.

## Build and deployment

```bash
pnpm build
```

The build first generates crawlable HTML for the dedicated landing pages, cleans `dist`, runs Vite, and then generates robots and sitemap files. Vercel should use the repository’s `pnpm build` command and publish `dist`.

Set `VITE_SITE_URL` in Vercel to the final public origin, for example `https://www.fixifydata.xyz`. When present, the build emits absolute canonical URLs, `og:url`, `og:image`, `sitemap.xml` and a sitemap reference in `robots.txt`. Submit the sitemap in Google Search Console after deployment. The implementation improves crawlability and intent coverage but cannot honestly guarantee a top Google ranking; rankings also depend on indexing, page speed, authoritative links, competition and continued original proof-led content.

## Lead qualification and measurement

The Contact page is a qualification flow with name, work email, company, website/app URL, requested help, current tools, main problem, timeline, optional budget and consent to contact. Submission opens a pre-addressed email to `admin@fixifydata.xyz`; no private backend or Google Sheet connector is assumed. The supplied Google Sheet is not connected because Workspace authorization was declined in the session.

The frontend initializes a `window.dataLayer` and pushes lightweight events for `cta_click`, `contact_form_start`, `contact_form_submit`, `contact_form_error`, `email_click` and `outbound_click`, including `page_path`, CTA labels and destination URLs. A future GTM container can consume these events without adding a second tracking system.

## Quality boundaries

Copy uses evidence-based language such as validated implementation, documented assumptions, reconciled outcomes and improved data quality. It does not claim perfect attribution, guaranteed ROAS, universal compliance, zero data loss or guaranteed revenue growth. Technical implementation, legal/privacy responsibility, infrastructure assumptions, data ownership and measurement limitations are described separately.

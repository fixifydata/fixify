# Fixify

Marketing website for Fixify — Tracking Made Right. Decisions Made Smarter.

## Local development

```bash
pnpm install
pnpm dev
```

The site is available at `/`, `/services/`, `/approach/`, `/about/`, and `/contact/`.

## Production build

```bash
pnpm build
```

The Vercel project can be connected directly to this repository. Vercel will use the `pnpm build` command and publish the `dist` directory.

## Service catalog

The `/services/` route contains the full Fixify implementation catalog: GA4, Google Tag Manager, conversion tracking, attribution, server-side tracking, analytics and reporting, Web and App Conversions API, offline and CRM conversions, web pixels, enhanced conversions and value bidding, Google Tag Gateway, MMP and mobile SDK implementation, app analytics, web-to-app attribution, TV and OTT measurement, BI and data integration, consent and privacy measurement, marketing automation, and experimentation/CRO, CDP and audience infrastructure, and product catalog/feed setup. Each service has a dedicated anchor and a visible `Learn more` link.

## SEO configuration

The project builds each page as a static HTML entrypoint with route-specific titles, descriptions, keywords, Open Graph metadata, Twitter metadata, JSON-LD, and meaningful no-JavaScript body content. The services page includes valid ItemList structured data for all 22 offerings and internal links between the catalog and consultation page. To emit absolute canonical URLs, `og:url`, `og:image`, `sitemap.xml`, and a sitemap reference in `robots.txt`, set the Vercel environment variable `VITE_SITE_URL` to the final public origin, for example `https://www.example.com`.

The implementation is designed to improve search discoverability, but no site can honestly guarantee a top Google position. Final rankings also depend on the live domain, indexing, page speed, Search Console configuration, authoritative backlinks, competition, local relevance, and ongoing original content. Submit the sitemap in Google Search Console after deployment and keep the public service pages updated with useful case studies and proof.

## Social and lead form

The footer includes a LinkedIn icon linking to [Fixify Data on LinkedIn](https://www.linkedin.com/company/fixifydata/). The contact page includes validated name, work email, company, service, and context fields. Submission opens a pre-addressed, ready-to-send email to `admin@fixifydata.xyz`. The Google Workspace connector was not authorized in the session, so the supplied Google Sheet is not currently connected; enabling that connector is required before a secure Sheet-backed submission endpoint can be created.

# Fixify

Marketing website for Fixify — Tracking Made Right. Decisions Made Smarter.

## Local development

```bash
pnpm install
pnpm dev
```

The site is available at `/`, `/services/`, `/approach/`, `/about/`, `/contact/`, and the category routes under `/services/`.

## Service architecture

The Services area is organized as a category hub with dedicated, crawlable detail pages for Analytics, Paid Media, CDP, Server-Side, Reporting, Tag Management, Ecommerce, App Tracking, and Mobile Tracking. Each category page explains the implementation scope and platform-specific work rather than acting as a logo-only directory.

Platform coverage includes Google Analytics 4, Amplitude, Mixpanel, Adobe Analytics, Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, Segment, RudderStack, mParticle, Tealium, Meta Conversions API, Google Enhanced Conversions, TikTok Events API, LinkedIn Conversions API, Looker Studio, Power BI, Tableau, BigQuery, Google Tag Manager, Adobe Experience Platform Launch, Tealium iQ, Server-Side GTM, Shopify, WooCommerce, Wix, Magento/Adobe Commerce, Firebase, AppsFlyer, Adjust, and Branch. Reusable brand marks are stored locally under `public/assets/brands`; platforms without an appropriate reusable SVG use a restrained text monogram instead of a broken remote image.

The original 22-service implementation catalog remains below the category hub on `/services/`, with an anchor and `Learn more` path for each offering.

## Production build

```bash
pnpm build
```

The Vercel project can be connected directly to this repository. Vercel will use the `pnpm build` command and publish the `dist` directory.

## SEO configuration

The project builds each page as a static HTML entrypoint with route-specific titles, descriptions, keywords, Open Graph metadata, Twitter metadata, JSON-LD, and meaningful no-JavaScript body content. The services page contains ItemList structured data for the 22 implementation offerings, and every category page has its own `Service` structured data and route-specific metadata. To emit absolute canonical URLs, `og:url`, `og:image`, `sitemap.xml`, and a sitemap reference in `robots.txt`, set the Vercel environment variable `VITE_SITE_URL` to the final public origin, for example `https://www.example.com`.

The implementation is designed to improve search discoverability, but no site can honestly guarantee a top Google position. Final rankings also depend on the live domain, indexing, page speed, Search Console configuration, authoritative backlinks, competition, local relevance, and ongoing original content. Submit the sitemap in Google Search Console after deployment and keep the public category pages updated with useful case studies and proof.

## Social and lead form

The footer includes a LinkedIn icon linking to [Fixify Data on LinkedIn](https://www.linkedin.com/company/fixifydata/). The contact page includes validated name, work email, company, service, and context fields. Submission opens a pre-addressed, ready-to-send email to `admin@fixifydata.xyz`. The Google Workspace connector was not authorized in the session, so the supplied Google Sheet is not currently connected; enabling that connector is required before a secure Sheet-backed submission endpoint can be created.

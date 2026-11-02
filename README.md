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

## SEO configuration

The project builds each page as a static HTML entrypoint with route-specific titles, descriptions, keywords, Open Graph metadata, Twitter metadata, JSON-LD, and meaningful no-JavaScript body content. To emit absolute canonical URLs, `og:url`, `og:image`, `sitemap.xml`, and a sitemap reference in `robots.txt`, set the Vercel environment variable `VITE_SITE_URL` to the final public origin, for example `https://www.example.com`.

## Lead form

The contact page includes validated name, work email, company, service, and context fields. Submission opens a pre-addressed, ready-to-send email to `hello@fixify.com`, so the static Vercel deployment does not require a private backend or API key. Replace that address with the final Fixify inbox before launch.

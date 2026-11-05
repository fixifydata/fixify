import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../dist/', import.meta.url).pathname
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://fixifydata.xyz').replace(/\/$/, '')
const serviceRoutes = ['ga4-implementation', 'ga4-audit', 'google-tag-manager', 'tracking-fix', 'consent-mode-cmp', 'server-side-tagging', 'crm-offline-conversions', 'measurement-strategy', 'ga4-bigquery-bi', 'measurement-qa-monitoring', 'meta-capi-enhanced-conversions', 'crm-conversion-tracking', 'ecommerce-tracking'].map((slug) => `/${slug}/`)
const solutionRoutes = ['b2b-lead-generation', 'ecommerce', 'saas-subscription', 'agencies', 'multi-brand'].map((slug) => `/solutions/${slug}/`)
const guideRoutes = ['ga4-implementation-guide', 'ga4-audit-checklist', 'google-tag-manager-audit-guide', 'how-to-fix-duplicate-ga4-conversions', 'why-ga4-and-google-ads-conversion-numbers-do-not-match', 'server-side-gtm-when-you-need-it', 'consent-mode-and-server-side-tagging', 'crm-offline-conversions-from-lead-to-revenue'].map((slug) => `/guides/${slug}/`)
const glossaryRoutes = ['what-is-a-gclid', 'what-is-a-datalayer', 'what-is-a-consent-signal', 'what-is-a-server-container', 'what-is-event-deduplication', 'what-is-measurement-protocol', 'what-is-a-crm-lifecycle-stage', 'what-is-an-event-parameter-in-ga4'].map((slug) => `/glossary/${slug}/`)
const routes = ['/', '/services/', '/services/measure/', '/services/govern/', '/services/protect/', '/services/connect/', '/services/decide/', '/approach/', '/about/', '/contact/', '/pricing/', '/privacy-policy/', '/terms/', '/thank-you/', '/case-studies/', '/guides/', '/glossary/', ...serviceRoutes, ...solutionRoutes, ...guideRoutes, ...glossaryRoutes, '/services/analytics/', '/services/paid-media/', '/services/cdp/', '/services/server-side/', '/services/reporting/', '/services/tag-management/', '/services/ecommerce/', '/services/app-tracking/', '/services/mobile-tracking/']

function htmlFiles(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : []
  })
}

if (siteUrl) {
  const socialImageUrl = `${siteUrl}/assets/fixify-social-card.svg`
  for (const file of htmlFiles(root)) {
    let html = readFileSync(file, 'utf8')
    const relative = file.slice(root.length).replace(/index\.html$/, '')
    const path = relative ? `/${relative}` : '/'
    const canonical = `${siteUrl}${path}`
        const pageTitle = html.match(/<title>(.*?)<\\/title>/i)?.[1] || 'Fixify | Website Tracking & Analytics'
    const pageDescription = html.match(/<meta\\s+name="description"\\s+content="([^"]*)"/i)?.[1] || 'Fixify audits, fixes and builds website tracking you can trust.'
    html = html.replace(/<link\\s+rel="canonical"[^>]*>/ig, '')
    html = html.replace(/<meta\\s+(?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/ig, '')
    const socialTags = [
      '<link rel="canonical" href="' + canonical + '" />',
      '<meta property="og:url" content="' + canonical + '" />',
      '<meta property="og:type" content="website" />',
      '<meta property="og:title" content="' + pageTitle + '" />',
      '<meta property="og:description" content="' + pageDescription + '" />',
      '<meta property="og:image" content="' + socialImageUrl + '" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="twitter:title" content="' + pageTitle + '" />',
      '<meta name="twitter:description" content="' + pageDescription + '" />',
      '<meta name="twitter:image" content="' + socialImageUrl + '" />',
    ].join('\\n    ')
    const titleMatch = html.match(new RegExp('<title>(.*?)</title>', 'i'))
    const descriptionMatch = html.match(new RegExp('<meta name="description" content="([^"]*)"', 'i'))
    const pageTitle = titleMatch?.[1] || 'Fixify | Website Tracking & Analytics'
    const pageDescription = descriptionMatch?.[1] || 'Fixify audits, fixes and builds website tracking you can trust.'
    html = html.replace(new RegExp('<link rel="canonical"[^>]*>', 'ig'), '')
    html = html.replace(new RegExp('<meta[^>]+(?:og:|twitter:)[^>]*>', 'ig'), '')
    const socialTags = [
      '<link rel="canonical" href="' + canonical + '" />',
      '<meta property="og:url" content="' + canonical + '" />',
      '<meta property="og:type" content="website" />',
      '<meta property="og:title" content="' + pageTitle + '" />',
      '<meta property="og:description" content="' + pageDescription + '" />',
      '<meta property="og:image" content="' + socialImageUrl + '" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="twitter:title" content="' + pageTitle + '" />',
      '<meta name="twitter:description" content="' + pageDescription + '" />',
      '<meta name="twitter:image" content="' + socialImageUrl + '" />',
    ].join('\n    ')
    html = html.replace('</head>', '    ' + socialTags + '\n  </head>')
    writeFileSync(file, html)
  }
  const urlEntries = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><changefreq>monthly</changefreq><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')
  writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`)
  writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`)
  console.log(`SEO files generated for ${siteUrl}`)
} else {
  writeFileSync(join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /api/\n')
  console.log('VITE_SITE_URL not set; skipped absolute canonical tags and sitemap URLs.')
}

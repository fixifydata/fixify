import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../dist/', import.meta.url).pathname
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '')
const routes = ['/', '/services/', '/approach/', '/about/', '/contact/']

function htmlFiles(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : []
  })
}

if (siteUrl) {
  const logoUrl = `${siteUrl}/assets/fixify-logo-transparent.png`
  for (const file of htmlFiles(root)) {
    let html = readFileSync(file, 'utf8')
    const relative = file.slice(root.length).replace(/index\.html$/, '')
    const path = relative ? `/${relative}` : '/'
    const canonical = `${siteUrl}${path}`
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta property="og:image" content="${logoUrl}" />\n  </head>`)
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

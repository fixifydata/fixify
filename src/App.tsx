import { FormEvent, useState } from 'react'

type Service = {
  number: string
  title: string
  slug: string
  description: string
  details: string[]
  tag: string
}

type Reason = {
  number: string
  title: string
  description: string
}

const navItems = [
  { label: 'Services', href: '/services/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'About Fixify', href: '/about/' },
]

const services: Service[] = [
  { number: '01', title: 'GA4 Implementation & Audits', slug: 'ga4', description: 'Turn business questions into a governed GA4 property your teams can read the same way.', details: ['Measurement plan, event taxonomy and naming rules', 'Lead-gen and ecommerce event architecture', 'Custom dimensions, metrics and audiences', 'CRM, Google Ads and warehouse connections', 'Backend-to-GA4 reconciliation and QA', 'Documentation your team can extend'], tag: 'Foundation' },
  { number: '02', title: 'Google Tag Manager', slug: 'gtm', description: 'Create a tag-management system that is easier to debug, safer to release and ready to scale.', details: ['Container architecture and workspace governance', 'Data layer requirements and developer guidance', 'Tags, triggers, variables and custom templates', 'Preview-mode debugging and release QA', 'Duplicate, stale and conflicting tag cleanup', 'Versioning, permissions and handover playbook'], tag: 'Infrastructure' },
  { number: '03', title: 'Conversion Tracking', slug: 'conversion-tracking', description: 'Connect ad clicks to qualified leads, purchases and revenue with definitions your growth team can trust.', details: ['Google Ads enhanced conversions and value rules', 'Meta Pixel and server event coordination', 'LinkedIn, TikTok and other platform signals', 'Purchase, subscription and revenue parameters', 'Form, phone and CRM-qualified lead stages', 'Cross-platform deduplication and validation'], tag: 'Outcomes' },
  { number: '04', title: 'Attribution & Marketing Measurement', slug: 'attribution', description: 'Replace channel arguments with a framework that explains how campaigns contribute across the customer journey.', details: ['UTM standards, campaign taxonomy and governance', 'First-touch, last-touch and assisted journey views', 'Attribution-window and model review', 'Cross-domain and cross-device journey mapping', 'Spend, pipeline and revenue measurement', 'Executive KPI definitions and decision cadence'], tag: 'Clarity' },
  { number: '05', title: 'Server-Side Tracking', slug: 'server-side-tracking', description: 'Move the right signal closer to the source with an architecture that improves resilience and control.', details: ['Server-side GTM container and hosting architecture', 'Browser-to-server event mapping and event IDs', 'First-party domain and cookie strategy', 'Hashing, enrichment and platform authentication', 'Browser/server deduplication and match-quality QA', 'Consent-aware routing and operational handover'], tag: 'Resilience' },
  { number: '06', title: 'Analytics & Reporting', slug: 'analytics-reporting', description: 'Give every audience the right view of performance, from daily operators to leadership deciding where to invest.', details: ['Looker Studio dashboards for channel and funnel teams', 'BigQuery-ready marketing data models', 'CRM, ad platform and offline-data integration', 'Metric definitions and source reconciliation', 'Anomaly alerts for spend, volume and conversion breaks', 'Decision-focused reporting and enablement'], tag: 'Decisions' },
  { number: '07', title: 'Web Conversions API', slug: 'web-conversions-api', description: 'Recover valuable web conversion signals with server delivery designed around consent and platform requirements.', details: ['Server event architecture and routing', 'Event IDs and browser/server deduplication', 'Hashing and parameter enrichment', 'Meta, Google, TikTok and Snap delivery', 'Platform diagnostics and match-quality review', 'Operational documentation and handover'], tag: 'Signals' },
  { number: '08', title: 'App Conversions API', slug: 'app-conversions-api', description: 'Pair app events with dependable server delivery so important actions are not dependent on one client-side path.', details: ['App event taxonomy and mapping', 'SDK and server event coordination', 'Purchase and subscription value handling', 'Identity and event deduplication', 'Platform authentication and QA', 'Release documentation for product teams'], tag: 'App Growth' },
  { number: '09', title: 'Offline & CRM Conversions', slug: 'offline-crm-conversions', description: 'Send qualified sales outcomes back into ad platforms so optimisation follows revenue, not just form fills.', details: ['CRM stage and revenue mapping', 'Offline event upload architecture', 'Lead identifiers and matching rules', 'Sales, call-centre and store conversion flows', 'Data freshness and failure monitoring', 'Campaign value validation'], tag: 'Revenue' },
  { number: '10', title: 'Web Pixel Implementation', slug: 'web-pixel-implementation', description: 'Implement and QA the pixel layer across ad platforms without duplicate, conflicting or undocumented tags.', details: ['Pixel and tag inventory', 'Page, lead and ecommerce event setup', 'Parameter and value mapping', 'Cross-platform naming consistency', 'Browser testing and release QA', 'Clean documentation for future campaigns'], tag: 'Activation' },
  { number: '11', title: 'Enhanced Conversions & Value Bidding', slug: 'enhanced-conversions', description: 'Improve Google Ads signal quality by connecting consent-aware first-party data and real business value.', details: ['Enhanced conversion configuration', 'Qualified lead and revenue value rules', 'CRM-to-Ads data mapping', 'Consent and hashing checks', 'Upload freshness and error review', 'Bidding readiness documentation'], tag: 'Google Ads' },
  { number: '12', title: 'Google Tag Gateway', slug: 'google-tag-gateway', description: 'Strengthen first-party Google measurement with a domain and routing setup built to reduce avoidable signal loss.', details: ['First-party domain architecture', 'DNS and endpoint planning', 'Google tag routing configuration', 'Measurement blocker diagnostics', 'Consent-aware behavior checks', 'Maintenance and ownership handover'], tag: 'First Party' },
  { number: '13', title: 'MMP & Mobile SDK Implementation', slug: 'mmp-mobile-sdk', description: 'Connect mobile acquisition, installs and in-app outcomes with an attribution setup your product and growth teams can use.', details: ['AppsFlyer, Adjust, Branch or Singular planning', 'SDK event taxonomy and implementation', 'Deep link and install attribution', 'SKAdNetwork value strategy', 'In-app purchase and revenue mapping', 'QA across release environments'], tag: 'Mobile' },
  { number: '14', title: 'App Analytics & Product Measurement', slug: 'app-analytics', description: 'Make app behavior measurable from first open to activation, retention and revenue with a clear event framework.', details: ['Product event taxonomy', 'SDK configuration and naming rules', 'Funnels, cohorts and retention views', 'On-device and privacy-aware measurement', 'Crash and data-quality context', 'Analytics handover for product teams'], tag: 'Product' },
  { number: '15', title: 'Web-to-App Attribution', slug: 'web-to-app-attribution', description: 'Connect web campaigns to app installs and purchases so the full path from click to customer is visible.', details: ['Deep-link architecture', 'Install referrer and campaign capture', 'Cross-platform identifier strategy', 'Web and app event reconciliation', 'Purchase and subscription attribution', 'Test matrix across devices and stores'], tag: 'Journey' },
  { number: '16', title: 'TV & OTT Measurement', slug: 'tv-ott-measurement', description: 'Create a measurement layer for connected TV activity and understand how exposure contributes to action elsewhere.', details: ['TV app event planning', 'Exposure and response signal mapping', 'Cross-device identity considerations', 'Streaming platform integrations', 'Conversion lift and journey views', 'Privacy-aware reporting design'], tag: 'Emerging' },
  { number: '17', title: 'BI & Data Integration', slug: 'bi-data-integration', description: 'Give leadership one dependable view of marketing performance by joining advertising, analytics, CRM and offline data.', details: ['Looker Studio, Power BI or Tableau dashboards', 'BigQuery and warehouse-ready models', 'Ad, GA4, CRM and offline data pipelines', 'Metric and attribution logic', 'Anomaly alerts and freshness checks', 'Source reconciliation and enablement'], tag: 'Data' },
  { number: '18', title: 'Consent & Privacy Measurement', slug: 'consent-privacy', description: 'Make privacy choices explicit in the measurement architecture so compliance and useful reporting can work together.', details: ['CMP and GTM integration', 'Consent Mode v2 planning', 'Region-specific defaults and states', 'Tag behavior for granted and denied consent', 'Cross-browser and regional validation', 'Compliance-oriented documentation'], tag: 'Governance' },
  { number: '19', title: 'Marketing Automation', slug: 'marketing-automation', description: 'Connect real customer behavior to timely journeys across marketing automation and CRM systems.', details: ['Lifecycle event and audience mapping', 'Lead routing and enrichment', 'Behavior-triggered journeys', 'CRM and analytics synchronization', 'Suppression and consent logic', 'Journey QA and reporting'], tag: 'Lifecycle' },
  { number: '20', title: 'Experimentation & CRO', slug: 'experimentation-cro', description: 'Build a disciplined experimentation program for pages, funnels and forms that measures meaningful business movement.', details: ['Research and hypothesis backlog', 'Experiment event and goal setup', 'Funnel and form instrumentation', 'Statistical guardrails and QA', 'Audience and rollout rules', 'Learning documentation and next tests'], tag: 'Growth' },
  { number: '21', title: 'CDP & Audience Infrastructure', slug: 'cdp-audience-infrastructure', description: 'Connect customer data sources, resolve identities and make trusted audiences available to the teams that need them.', details: ['Source and destination inventory', 'Identity resolution and profile rules', 'Event and audience taxonomy', 'CRM, analytics and activation connections', 'Match-rate and audience QA', 'Governance and team handover'], tag: 'Customer Data' },
  { number: '22', title: 'Product Catalog & Feed Setup', slug: 'product-catalog-feeds', description: 'Make product and inventory data consistent across shopping, advertising and local discovery surfaces.', details: ['Catalog and feed source audit', 'Product attributes and taxonomy cleanup', 'Multi-market and currency handling', 'Availability, price and inventory rules', 'Platform diagnostics and feed QA', 'Maintenance workflow and documentation'], tag: 'Commerce' },
]
type Platform = {
  name: string
  icon: string
  summary: string
  scope: string[]
}

type ServiceCategory = {
  slug: string
  number: string
  title: string
  eyebrow: string
  description: string
  platforms: Platform[]
}

const serviceCategories: ServiceCategory[] = [
  {
    slug: 'analytics', number: '01', title: 'Analytics', eyebrow: 'Understand the journey',
    description: 'Product and web analytics implementations that turn behavior into a shared measurement language.',
    platforms: [
      { name: 'Google Analytics 4', icon: 'googleanalytics', summary: 'Event-led web measurement for acquisition, engagement and ecommerce.', scope: ['Measurement plans and event taxonomy', 'Enhanced ecommerce and custom dimensions', 'Audiences, conversions and cross-domain journeys'] },
      { name: 'Amplitude', icon: '', summary: 'Product analytics for funnels, cohorts, retention and activation.', scope: ['Event governance and identity planning', 'Funnel, cohort and retention instrumentation', 'Experiment and product KPI alignment'] },
      { name: 'Mixpanel', icon: 'mixpanel', summary: 'Behavioral analytics that helps product teams see where users get value.', scope: ['Event schema and user profiles', 'Activation, retention and conversion reports', 'Data quality checks across product releases'] },
      { name: 'Adobe Analytics', icon: 'adobe', summary: 'Enterprise analytics architecture for complex journeys and reporting needs.', scope: ['Suite and report-suite planning', 'eVar, prop and event governance', 'Implementation QA and analyst handover'] },
    ],
  },
  {
    slug: 'paid-media', number: '02', title: 'Paid Media', eyebrow: 'Connect spend to outcomes',
    description: 'Platform-ready conversion signals and campaign governance for teams investing across search, social and B2B media.',
    platforms: [
      { name: 'Google Ads', icon: 'googleads', summary: 'Search, video and performance campaigns tied to qualified outcomes.', scope: ['Conversion actions and enhanced conversions', 'Offline lead and revenue imports', 'Value rules, audiences and attribution checks'] },
      { name: 'Meta Ads', icon: 'meta', summary: 'Browser and server signals for lead, purchase and lifecycle campaigns.', scope: ['Pixel and Conversions API architecture', 'Event matching and deduplication', 'Lead quality and value feedback loops'] },
      { name: 'LinkedIn Ads', icon: 'linkedin', summary: 'B2B campaign measurement that follows leads from form to pipeline.', scope: ['Insight Tag and conversion setup', 'Lead-gen form and CRM mapping', 'Pipeline-stage reporting and validation'] },
      { name: 'TikTok Ads', icon: 'tiktok', summary: 'Full-funnel signals for creative-led acquisition and ecommerce.', scope: ['Pixel and Events API implementation', 'Event parameters and value mapping', 'Purchase and lead QA across devices'] },
    ],
  },
  {
    slug: 'cdp', number: '03', title: 'CDP', eyebrow: 'Make customer data usable',
    description: 'Source, unify and activate customer data without losing governance, consent or a clear ownership model.',
    platforms: [
      { name: 'Segment', icon: '', summary: 'A governed collection layer for product, customer and marketing events.', scope: ['Tracking plans and source connections', 'Identity resolution and destinations', 'Protocol validation and ownership handover'] },
      { name: 'RudderStack', icon: '', summary: 'Warehouse-first event collection and activation for technical teams.', scope: ['SDK and server event routing', 'Warehouse and destination schemas', 'Event quality, retries and monitoring'] },
      { name: 'mParticle', icon: '', summary: 'Audience and data infrastructure for complex app and multi-channel journeys.', scope: ['Event and audience taxonomy', 'Identity and profile strategy', 'Activation destinations and match-rate QA'] },
      { name: 'Tealium AudienceStream', icon: '', summary: 'Real-time audience building with governance across marketing systems.', scope: ['Profile enrichment and attributes', 'Audience rules and action triggers', 'Consent-aware activation workflows'] },
    ],
  },
  {
    slug: 'server-side', number: '04', title: 'Server-Side', eyebrow: 'Build resilient signals',
    description: 'Server-side and first-party delivery for platforms that need cleaner, more durable conversion data.',
    platforms: [
      { name: 'Meta Conversions API', icon: 'meta', summary: 'Server-side Meta events enriched with reliable identifiers and values.', scope: ['Event mapping and event_id deduplication', 'Hashing, enrichment and match quality', 'Diagnostics and browser/server reconciliation'] },
      { name: 'Google Enhanced Conversions', icon: 'googleads', summary: 'Consent-aware first-party data that improves Google Ads conversion quality.', scope: ['Enhanced conversions and lead stages', 'Hashing and consent-state validation', 'Offline values and freshness checks'] },
      { name: 'TikTok Events API', icon: 'tiktok', summary: 'Server delivery for TikTok campaigns where browser signals are incomplete.', scope: ['Event and parameter mapping', 'API authentication and deduplication', 'Purchase and lead testing across environments'] },
      { name: 'LinkedIn Conversions API', icon: 'linkedin', summary: 'More dependable B2B conversion signals from CRM and server events.', scope: ['Offline and server event design', 'Lead and pipeline stage mapping', 'Match and delivery validation'] },
    ],
  },
  {
    slug: 'reporting', number: '05', title: 'Reporting', eyebrow: 'Turn data into decisions',
    description: 'Reporting systems that give operators, marketers and leadership one clear view of performance.',
    platforms: [
      { name: 'Looker Studio', icon: 'looker', summary: 'Accessible dashboards for channel, funnel and leadership reporting.', scope: ['Metric definitions and source mapping', 'Interactive dashboards and filters', 'Refresh, ownership and annotation workflows'] },
      { name: 'Power BI', icon: '', summary: 'Business intelligence models for teams that need governed analysis at scale.', scope: ['Semantic model and KPI design', 'Marketing and CRM data connections', 'Permissions, refreshes and adoption handover'] },
      { name: 'Tableau', icon: 'tableau', summary: 'Flexible visual analysis for complex performance and customer questions.', scope: ['Dashboard information architecture', 'Calculated fields and source reconciliation', 'Performance tuning and analyst enablement'] },
      { name: 'BigQuery', icon: 'googlebigquery', summary: 'Warehouse foundations for joining advertising, analytics and offline truth.', scope: ['Dataset and table architecture', 'Transformation and freshness rules', 'Analytics-ready models for reporting tools'] },
    ],
  },
  {
    slug: 'tag-management', number: '06', title: 'Tag Management', eyebrow: 'Keep the stack orderly',
    description: 'Tag, trigger and data-layer systems that remain understandable as websites, campaigns and teams grow.',
    platforms: [
      { name: 'Google Tag Manager', icon: 'googletagmanager', summary: 'A maintainable workspace for web tags, data layers and release governance.', scope: ['Container architecture and permissions', 'Tags, triggers, variables and templates', 'Preview QA, versioning and cleanup'] },
      { name: 'Adobe Experience Platform Launch', icon: 'adobe', summary: 'Enterprise tag management for Adobe-led digital experiences.', scope: ['Property and data-element architecture', 'Rules, extensions and environment releases', 'Analytics and Experience Cloud validation'] },
      { name: 'Tealium iQ', icon: '', summary: 'Vendor-neutral tag orchestration with governance and consent controls.', scope: ['Load rules and extension design', 'Data-layer normalization', 'Vendor audit, testing and handover'] },
      { name: 'Server-Side GTM', icon: 'googletagmanager', summary: 'A server container for first-party routing, enrichment and platform delivery.', scope: ['Container and hosting architecture', 'Clients, tags, transformations and auth', 'Dedupe, consent and observability'] },
    ],
  },
  {
    slug: 'ecommerce', number: '07', title: 'Ecommerce', eyebrow: 'Measure every order',
    description: 'Platform-aware ecommerce measurement for product views, carts, checkouts, purchases and customer value.',
    platforms: [
      { name: 'Shopify', icon: 'shopify', summary: 'Reliable storefront and checkout signals for growth teams.', scope: ['Product, cart, checkout and purchase events', 'Customer privacy and consent-aware tracking', 'Ads, GA4 and server-side integrations'] },
      { name: 'WordPress & WooCommerce', icon: 'woocommerce', summary: 'Flexible measurement for content-led and commerce-led WordPress sites.', scope: ['Plugin and data-layer audit', 'Product, order and refund tracking', 'GTM, GA4 and paid-media validation'] },
      { name: 'Wix', icon: 'wix', summary: 'Clean conversion and ecommerce signals for fast-moving Wix businesses.', scope: ['Site and checkout event planning', 'Lead, product and purchase tracking', 'Platform and campaign QA'] },
      { name: 'Magento / Adobe Commerce', icon: 'magento', summary: 'Enterprise ecommerce measurement for catalogs, stores and complex orders.', scope: ['Catalog and order-state mapping', 'Multi-store and currency handling', 'Backend reconciliation and release testing'] },
    ],
  },
  {
    slug: 'app-tracking', number: '08', title: 'App Tracking', eyebrow: 'Understand product behavior',
    description: 'Product analytics for activation, engagement, retention and in-app revenue across the moments that matter.',
    platforms: [
      { name: 'Firebase Analytics', icon: 'firebase', summary: 'Native app analytics for events, audiences, funnels and product health.', scope: ['Event taxonomy and SDK setup', 'Audiences, funnels and retention', 'BigQuery export and release QA'] },
      { name: 'Amplitude', icon: '', summary: 'Product analytics for activation, feature adoption and retention decisions.', scope: ['Event governance and identity planning', 'Funnel, cohort and retention instrumentation', 'Experiment and product KPI alignment'] },
      { name: 'Mixpanel', icon: 'mixpanel', summary: 'Behavioral analytics that helps product teams see where users get value.', scope: ['Event schema and user profiles', 'Activation, retention and conversion reports', 'Data quality checks across product releases'] },
      { name: 'Adobe Analytics', icon: 'adobe', summary: 'Enterprise app and digital experience analytics for complex product ecosystems.', scope: ['Suite and report-suite planning', 'Event governance and journey analysis', 'Implementation QA and analyst handover'] },
    ],
  },
  {
    slug: 'mobile-tracking', number: '09', title: 'Mobile Tracking', eyebrow: 'Connect install to value',
    description: 'Mobile attribution and lifecycle measurement from acquisition and install through deep links, retention and revenue.',
    platforms: [
      { name: 'AppsFlyer', icon: '', summary: 'Mobile attribution that connects media spend to installs and in-app value.', scope: ['SDK and partner configuration', 'Deep links and install referrers', 'In-app events, SKAN and postbacks'] },
      { name: 'Adjust', icon: '', summary: 'Attribution and fraud-aware measurement for app growth teams.', scope: ['Tracker and campaign structure', 'SDK events and revenue mapping', 'Cohort, retention and partner validation'] },
      { name: 'Branch', icon: '', summary: 'Deep linking and cross-platform journeys that make app acquisition measurable.', scope: ['Universal links and deferred deep links', 'Web-to-app attribution', 'Event mapping and QA across stores'] },
      { name: 'Firebase App Distribution', icon: 'firebase', summary: 'A cleaner release feedback loop for validating instrumentation before production.', scope: ['Test-build event validation', 'Release-to-release measurement checks', 'QA handover between product and growth teams'] },
    ],
  },
]

const reasons: Reason[] = [
  { number: '01', title: 'Accuracy First', description: 'We focus on reliable data collection, validation and measurement quality.' },
  { number: '02', title: 'Solutions Built Around Your Business', description: 'No one-size-fits-all tracking setups. We design measurement solutions around your website, platforms and business goals.' },
  { number: '03', title: 'End-to-End Expertise', description: 'From strategy and implementation to testing, reporting and ongoing support.' },
  { number: '04', title: 'Clear Communication', description: 'Technical problems explained in business language, with practical recommendations.' },
  { number: '05', title: 'Built to Scale', description: 'Measurement foundations designed to grow with your business.' },
]

const processSteps = [
  { number: '01', title: 'Discover', description: 'We understand your business, marketing ecosystem, existing setup and measurement goals.' },
  { number: '02', title: 'Audit', description: 'We evaluate your current tracking infrastructure and identify gaps, inconsistencies and opportunities.' },
  { number: '03', title: 'Implement', description: 'We design and implement the right tracking solution for your requirements.' },
  { number: '04', title: 'Validate', description: 'We test events, conversions and data flows to ensure everything works as expected.' },
  { number: '05', title: 'Optimise', description: 'We provide ongoing support, monitoring and recommendations as your business evolves.' },
]

const audiences = [
  'Marketing teams looking for reliable campaign measurement.',
  'Ecommerce businesses that need accurate purchase and revenue tracking.',
  'SaaS companies measuring acquisition, activation and conversion.',
  'Agencies that need specialist analytics and tracking support.',
  'Growing businesses building their measurement infrastructure.',
]

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-lockup" href="/" aria-label="Fixify home" onClick={closeMenu}>
          <img src="/assets/fixify-logo-transparent.png" alt="Fixify" className="brand-logo" />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`}><i /><i /></span>
        </button>
        <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <div className="nav-links">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          </div>
          <a className="button button--small button--nav" href="/contact/" onClick={closeMenu}>Book a consultation <ArrowUpRight /></a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand"><img src="/assets/fixify-logo-transparent.png" alt="Fixify" className="footer-logo" /><p>Tracking made right.<br />Decisions made smarter.</p></div>
        <div className="footer-column"><span className="footer-label">Explore</span><a href="/services/">Services</a><a href="/approach/">Approach</a><a href="/about/">About Fixify</a><a href="/contact/">Contact</a></div>
        <div className="footer-column footer-column--wide"><span className="footer-label">Services</span><a href="/services/#ga4">GA4 implementation & audits</a><a href="/services/#gtm">Google Tag Manager</a><a href="/services/#conversion-tracking">Conversion tracking</a><a href="/services/#attribution">Attribution & measurement</a></div>
        <div className="footer-column"><span className="footer-label">Start a conversation</span><a className="footer-email" href="mailto:admin@fixifydata.xyz">admin@fixifydata.xyz <ArrowUpRight /></a><a className="linkedin-link" href="https://www.linkedin.com/company/fixifydata/" target="_blank" rel="noreferrer" aria-label="Fixify on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.1A2.1 2.1 0 1 0 5.2 3a2.1 2.1 0 0 0 0 4.1ZM3.4 20.8h3.6V9.2H3.4v11.6ZM9.3 9.2v11.6h3.6v-5.7c0-1.5.3-3 2.2-3 1.8 0 1.8 1.7 1.8 3.1v5.6h3.6v-6.3c0-3.1-.7-5.5-4.5-5.5-1.8 0-3 .9-3.5 1.8h-.1V9.2H9.3Z" /></svg><span>Follow Fixify on LinkedIn</span></a><span className="footer-location">Built for teams that care<br />about getting it right.</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Fixify. All rights reserved.</span><span>Tracking made right <i /> Decisions made smarter</span></div>
    </footer>
  )
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="site-shell"><Header /><main>{children}</main><Footer /></div>
}

function SectionIntro({ eyebrow, light = false }: { eyebrow: string; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'eyebrow--light' : ''}`}><span className="eyebrow-dot" /> {eyebrow}</div>
}

function HeroScene() {
  return (
    <div className="hero-visual" aria-label="Three-dimensional illustration of a clean measurement system" role="img">
      <div className="visual-orbit visual-orbit--large" />
      <div className="visual-orbit visual-orbit--small" />
      <div className="scene-3d" aria-hidden="true">
        <div className="scene-floor" />
        <div className="scene-axis scene-axis--one" />
        <div className="scene-axis scene-axis--two" />
        <div className="metric-pillar metric-pillar--one"><span>GA4</span><i /></div>
        <div className="metric-pillar metric-pillar--two"><span>GTM</span><i /></div>
        <div className="metric-pillar metric-pillar--three"><span>ROI</span><i /></div>
        <div className="scene-node scene-node--one" />
        <div className="scene-node scene-node--two" />
      </div>
      <div className="dashboard-card">
        <div className="dashboard-topline"><span>Measurement health</span><span className="status-pill"><i /> Live</span></div>
        <div className="dashboard-score"><strong>96.4</strong><span>/ 100<br /><small>signal quality</small></span></div>
        <div className="chart-area">
          <svg viewBox="0 0 380 130" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ffad18" stopOpacity=".42" /><stop offset="100%" stopColor="#ffad18" stopOpacity="0" /></linearGradient></defs>
            <path className="chart-fill" d="M0,105 C28,93 36,100 61,78 C82,60 91,83 113,68 C139,50 154,75 177,55 C201,34 213,49 233,36 C254,22 267,50 288,28 C310,7 328,25 344,13 C360,4 370,12 380,2 L380,130 L0,130 Z" />
            <path className="chart-line" d="M0,105 C28,93 36,100 61,78 C82,60 91,83 113,68 C139,50 154,75 177,55 C201,34 213,49 233,36 C254,22 267,50 288,28 C310,7 328,25 344,13 C360,4 370,12 380,2" />
          </svg>
          <div className="chart-axis"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div>
        </div>
        <div className="dashboard-bottomline"><span><b className="signal signal--orange" /> Events</span><span><b className="signal signal--navy" /> Conversions</span><strong>+24.8%</strong></div>
      </div>
      <div className="floating-note floating-note--top"><span className="note-icon">✓</span><span><strong>Data aligned</strong><small>Across all channels</small></span></div>
      <div className="floating-note floating-note--bottom"><span className="note-bars"><i /><i /><i /></span><span><strong>Clean signals</strong><small>Ready to act on</small></span></div>
    </div>
  )
}

function HomePage() {
  return (
    <PageFrame>
      <section className="hero-section">
        <div className="hero-grid-lines" aria-hidden="true" /><div className="hero-glow hero-glow--one" aria-hidden="true" /><div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <SectionIntro eyebrow="Digital measurement, made dependable" light />
            <h1>Tracking made right.<br /><em>Decisions made smarter.</em></h1>
            <p className="hero-lede">Your Data. Your Growth. Our Fix.</p>
            <p className="hero-description">We help businesses get their digital measurement right. From GA4 and Google Tag Manager to conversion tracking, attribution and analytics implementation, we make sure your data is accurate, actionable and built for growth.</p>
            <div className="hero-actions"><a className="button button--primary" href="/contact/">Book a free consultation <ArrowUpRight /></a><a className="text-link text-link--light" href="/services/">Explore our services <ArrowUpRight /></a></div>
            <div className="hero-proof"><span className="proof-line" /> <span>Accurate tracking. Clear insights. Better decisions.</span></div>
          </div>
          <HeroScene />
        </div>
        <div className="hero-footer container"><span>Scroll to explore</span><span className="scroll-arrow">↓</span><span className="hero-footer-rule" /></div>
      </section>

      <section className="section problem-section" id="problem">
        <div className="container problem-layout"><div className="section-intro"><SectionIntro eyebrow="The problem" /><h2>Your marketing decisions are only as good as your data.</h2></div><div className="problem-copy"><p>Are your conversions being tracked correctly? Are your analytics platforms reporting inconsistent numbers? Do you know which channels and campaigns are actually driving results?</p><p className="problem-emphasis">Poor tracking leads to unreliable reports, wasted marketing spend and missed opportunities.</p><p>At Fixify, we identify what’s broken, fix what’s missing and build measurement systems you can trust.</p><a className="text-link" href="/contact/">Let’s fix the signal <ArrowUpRight /></a></div></div>
        <div className="container signal-strip" aria-hidden="true"><span>unclear data</span><i /><span>wrong decisions</span><i /><span>missed growth</span><i /><strong>fixify</strong></div>
      </section>

      <section className="section services-section" id="services">
        <div className="container"><div className="section-heading-row"><div><SectionIntro eyebrow="What we do" /><h2>Everything you need to<br /><em>get your tracking right.</em></h2></div><p className="section-heading-note">A measurement system is only useful when every layer works together. We bring the strategy, implementation and clarity to make it happen.</p></div><ServiceGrid preview /></div>
      </section>

      <section className="section why-section" id="why-fixify"><div className="container why-layout"><div className="why-statement"><SectionIntro eyebrow="Why Fixify?" light /><h2>We don’t just install tags.<br /><em>We make your data work.</em></h2><div className="why-mark" aria-hidden="true"><span /><span /><span /><i /></div></div><ReasonList /></div></section>

      <section className="section approach-section" id="approach"><div className="container"><div className="section-heading-row section-heading-row--approach"><div><SectionIntro eyebrow="How we work" /><h2>A straightforward approach<br /><em>to better data.</em></h2></div><p className="section-heading-note">No black boxes. No guesswork. Just a clear path from what’s happening now to what your business needs next.</p></div><ProcessTrack /><a className="text-link approach-link" href="/approach/">See our full approach <ArrowUpRight /></a></div></section>

      <section className="section audience-section" id="audience"><div className="container audience-layout"><div><SectionIntro eyebrow="Who we work with" /><h2>Helping teams make better decisions <em>with better data.</em></h2></div><AudienceList /></div></section>

      <CtaBanner />
    </PageFrame>
  )
}

function ServiceGrid({ preview = false }: { preview?: boolean }) {
  const shownServices = preview ? services.slice(0, 6) : services
  return <div className="services-grid">{shownServices.map((service) => <article className="service-card" id={service.slug} key={service.number}><div className="service-card__top"><span className="service-number">{service.number}</span><span className="service-tag">{service.tag}</span></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.details.map((detail) => <li key={detail}><span>+</span>{detail}</li>)}</ul><a className="service-learn-more" href={`/services/#${service.slug}`}>Learn more <ArrowUpRight /></a><span className="service-card__corner" aria-hidden="true"><ArrowUpRight /></span></article>)}</div>
}

function ReasonList() {
  return <div className="reasons-list">{reasons.map((reason) => <div className="reason-row" key={reason.number}><span className="reason-number">{reason.number}</span><div><h3>{reason.title}</h3><p>{reason.description}</p></div><ArrowUpRight /></div>)}</div>
}

function ProcessTrack() {
  return <div className="process-track">{processSteps.map((step, index) => <div className="process-step" key={step.number}><div className="process-marker"><span>{step.number}</span>{index < processSteps.length - 1 && <i />}</div><h3>{step.title}</h3><p>{step.description}</p></div>)}</div>
}

function AudienceList() {
  return <div className="audience-list">{audiences.map((audience, index) => <div className="audience-item" key={audience}><span>0{index + 1}</span><p>{audience}</p><ArrowUpRight /></div>)}</div>
}

function CtaBanner() {
  return <section className="section contact-section" id="contact"><div className="container contact-card"><div className="contact-orb contact-orb--one" aria-hidden="true" /><div className="contact-orb contact-orb--two" aria-hidden="true" /><SectionIntro eyebrow="Let’s talk" light /><h2>Stop guessing.<br /><em>Start measuring right.</em></h2><p>Your business deserves data you can trust. Let’s identify what’s not working, fix your tracking and build a measurement foundation that supports smarter decisions.</p><a className="button button--primary button--large" href="/contact/">Book your free consultation <ArrowUpRight /></a><div className="contact-footnote"><span>Prefer email?</span> <a href="mailto:admin@fixifydata.xyz">admin@fixifydata.xyz</a></div></div></section>
}

function BrandMark({ platform }: { platform: Platform }) {
  const initials = platform.name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase()
  return <div className="platform-brand"><div className="platform-logo"><span className="platform-initials">{initials}</span>{platform.icon && <img src={`/assets/brands/${platform.icon}.svg`} alt="" loading="lazy" onLoad={(event) => { const sibling = event.currentTarget.previousElementSibling as HTMLElement | null; if (sibling) sibling.style.display = 'none' }} onError={(event) => { event.currentTarget.style.display = 'none' }} />}</div><span>{platform.name}</span></div>
}

function CategoryGrid() {
  return <div className="category-grid">{serviceCategories.map((category) => <article className="category-card" key={category.slug}><div className="category-card__top"><span>{category.number}</span><span>{category.platforms.length} platforms</span></div><h3>{category.title}</h3><p>{category.description}</p><div className="category-brand-row">{category.platforms.slice(0, 4).map((platform) => <BrandMark platform={platform} key={platform.name} />)}</div><a className="service-learn-more" href={`/services/${category.slug}/`}>Explore {category.title} <ArrowUpRight /></a></article>)}</div>
}

function CategoryPage({ category }: { category: ServiceCategory }) {
  return <PageFrame><PageHero eyebrow={category.eyebrow} title={<>{category.title}<br /><em>implemented with intent.</em></>} description={category.description} /><section className="section category-detail-section"><div className="container"><div className="page-intro-row"><p>We work across the tools your team already uses. Each engagement starts with the business outcome, then connects platform configuration, data quality, consent and reporting into one usable system.</p><a className="text-link" href="/contact/">Talk through your stack <ArrowUpRight /></a></div><div className="platform-detail-grid">{category.platforms.map((platform) => <article className="platform-detail-card" key={platform.name}><BrandMark platform={platform} /><p>{platform.summary}</p><ul>{platform.scope.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul><a className="text-link" href="/contact/">Learn more <ArrowUpRight /></a></article>)}</div></div></section><CtaBanner /></PageFrame>
}

function ServicesPage() {
  return <PageFrame><PageHero eyebrow="What we do" title={<>Measurement that moves<br /><em>your business forward.</em></>} description="From analytics and paid media to CDP, server-side signals, reporting, tag management, ecommerce and mobile, Fixify makes the full measurement stack clear, accurate and ready to scale." /><section className="section category-section"><div className="container"><div className="section-heading-row"><div><SectionIntro eyebrow="Explore by category" /><h2>One measurement partner.<br /><em>Every layer covered.</em></h2></div><p className="section-heading-note">Choose the part of your stack you need to make clearer. Each category has its own implementation scope, platform expertise and route to a useful next step.</p></div><CategoryGrid /></div></section><section className="section services-section services-page-section"><div className="container"><div className="section-heading-row"><div><SectionIntro eyebrow="All implementation services" /><h2>Built around your <em>stack.</em></h2></div><p className="section-heading-note">Explore the individual workstreams that sit inside the categories above. Every card has a dedicated anchor and a clear learn-more path.</p></div><ServiceGrid /></div></section><CtaBanner /></PageFrame>
}

function ApproachPage() {
  return <PageFrame><PageHero eyebrow="How we work" title={<>A better process for<br /><em>better measurement.</em></>} description="No black boxes. No guesswork. We take your team from tracking uncertainty to a system you can explain, validate and use." /><section className="section approach-section approach-page-section"><div className="container"><div className="page-intro-row"><p>Our work is structured to create momentum early, surface the important decisions, and leave your team with a measurement foundation that keeps improving.</p><span className="process-kicker">Five clear moves<br />from signal to action</span></div><ProcessTrack /><div className="approach-detail-grid"><article><span>01 / Discover</span><h3>Start with the business question.</h3><p>We map your goals, customer journey, marketing ecosystem and current setup before touching a tag.</p></article><article><span>02 / Audit</span><h3>Find the gaps worth fixing.</h3><p>We test what is present, what is missing and where different platforms disagree.</p></article><article><span>03 / Implement</span><h3>Build the cleanest useful system.</h3><p>We implement the right events, conversion logic and data layer for your website and team.</p></article><article><span>04 / Validate</span><h3>Trust is built in the details.</h3><p>We validate events, conversions and data flows so reports reflect what is actually happening.</p></article><article><span>05 / Optimise</span><h3>Keep measurement useful.</h3><p>We support your next campaigns, changes and growth stage with monitoring and practical recommendations.</p></article></div></div></section><CtaBanner /></PageFrame>
}

function AboutPage() {
  return <PageFrame><PageHero eyebrow="About Fixify" title={<>The technical side of growth,<br /><em>made easier to use.</em></>} description="Fixify helps ambitious teams turn messy measurement into dependable decision-making — without the jargon or one-size-fits-all playbook." /><section className="section why-section about-why-section"><div className="container why-layout"><div className="why-statement"><SectionIntro eyebrow="Why Fixify?" light /><h2>We don’t just install tags.<br /><em>We make your data work.</em></h2><div className="why-mark" aria-hidden="true"><span /><span /><span /><i /></div></div><ReasonList /></div></section><section className="section audience-section"><div className="container audience-layout"><div><SectionIntro eyebrow="Who we work with" /><h2>Better decisions start with <em>better signals.</em></h2></div><div><p className="about-body-copy">Marketing teams, ecommerce businesses, SaaS companies, agencies and growing businesses all have different measurement needs. Our job is to make the right system feel understandable, useful and built around the way your business actually works.</p><AudienceList /></div></div></section><CtaBanner /></PageFrame>
}

function LeadForm() {
  const [values, setValues] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [status, setStatus] = useState('')
  const update = (field: keyof typeof values, value: string) => setValues((current) => ({ ...current, [field]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!values.name || !values.email || !values.message) {
      setStatus('Please add your name, work email and a short note so we can route your enquiry.')
      return
    }
    const subject = encodeURIComponent(`Fixify consultation — ${values.company || values.name}`)
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || 'Not provided'}\nInterested in: ${values.service || 'Not specified'}\n\nMessage:\n${values.message}`)
    window.location.href = `mailto:admin@fixifydata.xyz?subject=${subject}&body=${body}`
    setStatus('Your email client is ready with the enquiry details. Send the message to start the conversation.')
  }

  return <form className="lead-form" onSubmit={submit} noValidate><div className="form-heading"><span className="eyebrow"><span className="eyebrow-dot" /> Free consultation</span><h2>Tell us what needs fixing.</h2><p>Share a little context and we’ll come back with a useful first step, not a generic pitch.</p></div><div className="form-grid"><label><span>Your name *</span><input required value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Jane Smith" /></label><label><span>Work email *</span><input required type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="jane@company.com" /></label><label><span>Company</span><input value={values.company} onChange={(event) => update('company', event.target.value)} placeholder="Company name" /></label><label><span>What can we help with?</span><select value={values.service} onChange={(event) => update('service', event.target.value)}><option value="">Choose a service</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}</select></label><label className="form-field--full"><span>Tell us a little about the setup *</span><textarea required rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="What are you trying to measure, and where does the current setup feel unclear?" /></label></div><div className="form-submit-row"><button className="button button--primary button--large" type="submit">Send enquiry <ArrowUpRight /></button><p className="form-status" aria-live="polite">{status || 'Submitting opens a ready-to-send email in your mail app.'}</p></div></form>
}

function ContactPage() {
  return <PageFrame><PageHero eyebrow="Let’s talk" title={<>Stop guessing.<br /><em>Start measuring right.</em></>} description="Your business deserves data you can trust. Tell us where the setup is unclear and we’ll help you find the next right move." /><section className="section contact-page-section"><div className="container contact-page-grid"><LeadForm /><aside className="contact-aside"><div className="contact-aside-card"><SectionIntro eyebrow="What happens next" /><h3>A practical first conversation.</h3><p>We’ll understand the business question, look at the measurement context and explain the clearest path forward.</p><ol><li><span>01</span>We read your enquiry and context.</li><li><span>02</span>We come back with focused questions.</li><li><span>03</span>We outline the useful next step.</li></ol></div><div className="contact-aside-card contact-aside-card--dark"><SectionIntro eyebrow="Prefer email?" light /><a className="contact-aside-email" href="mailto:admin@fixifydata.xyz">admin@fixifydata.xyz <ArrowUpRight /></a><p>No forms, no fuss. Send a note directly if that’s easier.</p></div></aside></div></section></PageFrame>
}

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="page-hero"><div className="page-hero-grid" aria-hidden="true" /><div className="container page-hero-inner"><SectionIntro eyebrow={eyebrow} /><h1>{title}</h1><p>{description}</p></div></section>
}

function NotFoundPage() {
  return <PageFrame><PageHero eyebrow="Page not found" title={<>The signal got<br /><em>lost.</em></>} description="That page doesn’t exist, but we can still help you get your measurement back on track." /><section className="section not-found-section"><div className="container"><a className="button button--primary" href="/">Return to Fixify <ArrowUpRight /></a></div></section></PageFrame>
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return <HomePage />
  if (path === '/services') return <ServicesPage />
  if (path.startsWith('/services/')) {
    const category = serviceCategories.find((item) => `/services/${item.slug}` === path)
    if (category) return <CategoryPage category={category} />
  }
  if (path === '/approach') return <ApproachPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />
  return <NotFoundPage />
}

export default App

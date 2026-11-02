import { FormEvent, useState } from 'react'

type Service = {
  number: string
  title: string
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
  {
    number: '01',
    title: 'GA4 Implementation & Audits',
    description: 'Build a reliable analytics foundation with properly configured Google Analytics 4.',
    details: ['GA4 setup and configuration', 'GA4 audits and troubleshooting', 'Event and conversion tracking', 'Custom dimensions and metrics', 'Enhanced measurement', 'Cross-domain tracking'],
    tag: 'Foundation',
  },
  {
    number: '02',
    title: 'Google Tag Manager',
    description: 'Make your tracking implementation structured, scalable and reliable.',
    details: ['GTM setup and configuration', 'Tag, trigger and variable implementation', 'Data layer planning and development guidance', 'Custom event tracking', 'Debugging and troubleshooting', 'GTM audits and cleanup'],
    tag: 'Infrastructure',
  },
  {
    number: '03',
    title: 'Conversion Tracking',
    description: 'Understand what drives leads, sales and meaningful business outcomes.',
    details: ['Google Ads conversion tracking', 'Meta Pixel and Conversions API', 'LinkedIn Insight Tag', 'Ecommerce tracking', 'Form and lead tracking', 'Cross-platform conversion measurement'],
    tag: 'Outcomes',
  },
  {
    number: '04',
    title: 'Attribution & Marketing Measurement',
    description: 'Get a clearer picture of how your marketing channels contribute to growth.',
    details: ['Marketing attribution setup', 'UTM strategy and governance', 'Campaign tracking audits', 'Channel performance measurement', 'Conversion journey analysis', 'Marketing measurement frameworks'],
    tag: 'Clarity',
  },
  {
    number: '05',
    title: 'Server-Side Tracking',
    description: 'Build a more robust measurement infrastructure with server-side solutions.',
    details: ['Server-side GTM implementation', 'First-party tracking architecture', 'Conversion data quality improvements', 'Tracking diagnostics', 'Consent-aware measurement support'],
    tag: 'Resilience',
  },
  {
    number: '06',
    title: 'Analytics & Reporting',
    description: 'Turn complex data into insights your business can act on.',
    details: ['Looker Studio dashboards', 'GA4 reporting and analysis', 'Marketing performance dashboards', 'Custom reporting solutions', 'Data quality monitoring', 'Actionable business insights'],
    tag: 'Decisions',
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
        <div className="footer-column"><span className="footer-label">Start a conversation</span><a className="footer-email" href="mailto:hello@fixify.com">hello@fixify.com <ArrowUpRight /></a><span className="footer-location">Built for teams that care<br />about getting it right.</span></div>
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
  const shownServices = preview ? services : services
  return <div className="services-grid">{shownServices.map((service) => <article className="service-card" id={service.number === '01' ? 'ga4' : service.number === '02' ? 'gtm' : service.number === '03' ? 'conversion-tracking' : service.number === '04' ? 'attribution' : undefined} key={service.number}><div className="service-card__top"><span className="service-number">{service.number}</span><span className="service-tag">{service.tag}</span></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.details.map((detail) => <li key={detail}><span>+</span>{detail}</li>)}</ul><span className="service-card__corner" aria-hidden="true"><ArrowUpRight /></span></article>)}</div>
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
  return <section className="section contact-section" id="contact"><div className="container contact-card"><div className="contact-orb contact-orb--one" aria-hidden="true" /><div className="contact-orb contact-orb--two" aria-hidden="true" /><SectionIntro eyebrow="Let’s talk" light /><h2>Stop guessing.<br /><em>Start measuring right.</em></h2><p>Your business deserves data you can trust. Let’s identify what’s not working, fix your tracking and build a measurement foundation that supports smarter decisions.</p><a className="button button--primary button--large" href="/contact/">Book your free consultation <ArrowUpRight /></a><div className="contact-footnote"><span>Prefer email?</span> <a href="mailto:hello@fixify.com">hello@fixify.com</a></div></div></section>
}

function ServicesPage() {
  return <PageFrame><PageHero eyebrow="What we do" title={<>Measurement that moves<br /><em>your business forward.</em></>} description="From the first GA4 event to a complete reporting framework, Fixify makes the full measurement stack clear, accurate and ready to scale." /><section className="section services-section services-page-section"><div className="container"><div className="page-intro-row"><p>Every engagement starts with the business question, then works backward to the cleanest and most useful data system. Explore the capabilities that make up the Fixify toolkit.</p><a className="text-link" href="/contact/">Talk through your setup <ArrowUpRight /></a></div><ServiceGrid /></div></section><CtaBanner /></PageFrame>
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
    window.location.href = `mailto:hello@fixify.com?subject=${subject}&body=${body}`
    setStatus('Your email client is ready with the enquiry details. Send the message to start the conversation.')
  }

  return <form className="lead-form" onSubmit={submit} noValidate><div className="form-heading"><span className="eyebrow"><span className="eyebrow-dot" /> Free consultation</span><h2>Tell us what needs fixing.</h2><p>Share a little context and we’ll come back with a useful first step, not a generic pitch.</p></div><div className="form-grid"><label><span>Your name *</span><input required value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Jane Smith" /></label><label><span>Work email *</span><input required type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="jane@company.com" /></label><label><span>Company</span><input value={values.company} onChange={(event) => update('company', event.target.value)} placeholder="Company name" /></label><label><span>What can we help with?</span><select value={values.service} onChange={(event) => update('service', event.target.value)}><option value="">Choose a service</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}</select></label><label className="form-field--full"><span>Tell us a little about the setup *</span><textarea required rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="What are you trying to measure, and where does the current setup feel unclear?" /></label></div><div className="form-submit-row"><button className="button button--primary button--large" type="submit">Send enquiry <ArrowUpRight /></button><p className="form-status" aria-live="polite">{status || 'Submitting opens a ready-to-send email in your mail app.'}</p></div></form>
}

function ContactPage() {
  return <PageFrame><PageHero eyebrow="Let’s talk" title={<>Stop guessing.<br /><em>Start measuring right.</em></>} description="Your business deserves data you can trust. Tell us where the setup is unclear and we’ll help you find the next right move." /><section className="section contact-page-section"><div className="container contact-page-grid"><LeadForm /><aside className="contact-aside"><div className="contact-aside-card"><SectionIntro eyebrow="What happens next" /><h3>A practical first conversation.</h3><p>We’ll understand the business question, look at the measurement context and explain the clearest path forward.</p><ol><li><span>01</span>We read your enquiry and context.</li><li><span>02</span>We come back with focused questions.</li><li><span>03</span>We outline the useful next step.</li></ol></div><div className="contact-aside-card contact-aside-card--dark"><SectionIntro eyebrow="Prefer email?" light /><a className="contact-aside-email" href="mailto:hello@fixify.com">hello@fixify.com <ArrowUpRight /></a><p>No forms, no fuss. Send a note directly if that’s easier.</p></div></aside></div></section></PageFrame>
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
  if (path === '/approach') return <ApproachPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />
  return <NotFoundPage />
}

export default App

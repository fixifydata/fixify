import { useState } from 'react'

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
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Why Fixify', href: '#why-fixify' },
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-lockup" href="#top" aria-label="Fixify home" onClick={closeMenu}>
            <img src="/assets/fixify-logo-cropped.png" alt="Fixify" className="brand-logo" />
          </a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`}><i /><i /></span>
          </button>
          <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
              ))}
            </div>
            <a className="button button--small button--nav" href="#contact" onClick={closeMenu}>Book a consultation <ArrowUpRight /></a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> Digital measurement, made dependable</div>
              <h1>Tracking made right.<br /><em>Decisions made smarter.</em></h1>
              <p className="hero-lede">Your Data. Your Growth. Our Fix.</p>
              <p className="hero-description">We help businesses get their digital measurement right. From GA4 and Google Tag Manager to conversion tracking, attribution and analytics implementation, we make sure your data is accurate, actionable and built for growth.</p>
              <div className="hero-actions">
                <a className="button button--primary" href="#contact">Book a free consultation <ArrowUpRight /></a>
                <a className="text-link text-link--light" href="#services">Explore our services <ArrowUpRight /></a>
              </div>
              <div className="hero-proof"><span className="proof-line" /> <span>Accurate tracking. Clear insights. Better decisions.</span></div>
            </div>
            <div className="hero-visual" aria-label="Illustration of a clean measurement system" role="img">
              <div className="visual-orbit visual-orbit--large" />
              <div className="visual-orbit visual-orbit--small" />
              <div className="dashboard-card">
                <div className="dashboard-topline"><span>Measurement health</span><span className="status-pill"><i /> Live</span></div>
                <div className="dashboard-score"><strong>96.4</strong><span>/ 100<br /><small>signal quality</small></span></div>
                <div className="chart-area">
                  <svg viewBox="0 0 380 130" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ffad18" stopOpacity=".42" /><stop offset="100%" stopColor="#ffad18" stopOpacity="0" /></linearGradient>
                    </defs>
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
          </div>
          <div className="hero-footer container"><span>Scroll to explore</span><span className="scroll-arrow">↓</span><span className="hero-footer-rule" /></div>
        </section>

        <section className="section problem-section" id="problem">
          <div className="container problem-layout">
            <div className="section-intro">
              <div className="eyebrow"><span className="eyebrow-dot" /> The problem</div>
              <h2>Your marketing decisions are only as good as your data.</h2>
            </div>
            <div className="problem-copy">
              <p>Are your conversions being tracked correctly? Are your analytics platforms reporting inconsistent numbers? Do you know which channels and campaigns are actually driving results?</p>
              <p className="problem-emphasis">Poor tracking leads to unreliable reports, wasted marketing spend and missed opportunities.</p>
              <p>At Fixify, we identify what’s broken, fix what’s missing and build measurement systems you can trust.</p>
              <a className="text-link" href="#contact">Let’s fix the signal <ArrowUpRight /></a>
            </div>
          </div>
          <div className="container signal-strip" aria-hidden="true"><span>unclear data</span><i /><span>wrong decisions</span><i /><span>missed growth</span><i /><strong>fixify</strong></div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> What we do</div>
                <h2>Everything you need to<br /><em>get your tracking right.</em></h2>
              </div>
              <p className="section-heading-note">A measurement system is only useful when every layer works together. We bring the strategy, implementation and clarity to make it happen.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-card__top"><span className="service-number">{service.number}</span><span className="service-tag">{service.tag}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.details.map((detail) => <li key={detail}><span>+</span>{detail}</li>)}</ul>
                  <span className="service-card__corner" aria-hidden="true"><ArrowUpRight /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why-fixify">
          <div className="container why-layout">
            <div className="why-statement">
              <div className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> Why Fixify?</div>
              <h2>We don’t just install tags.<br /><em>We make your data work.</em></h2>
              <div className="why-mark" aria-hidden="true"><span /><span /><span /><i /></div>
            </div>
            <div className="reasons-list">
              {reasons.map((reason) => (
                <div className="reason-row" key={reason.number}><span className="reason-number">{reason.number}</span><div><h3>{reason.title}</h3><p>{reason.description}</p></div><ArrowUpRight /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach">
          <div className="container">
            <div className="section-heading-row section-heading-row--approach">
              <div><div className="eyebrow"><span className="eyebrow-dot" /> How we work</div><h2>A straightforward approach<br /><em>to better data.</em></h2></div>
              <p className="section-heading-note">No black boxes. No guesswork. Just a clear path from what’s happening now to what your business needs next.</p>
            </div>
            <div className="process-track">
              {processSteps.map((step, index) => (
                <div className="process-step" key={step.number}>
                  <div className="process-marker"><span>{step.number}</span>{index < processSteps.length - 1 && <i />}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section audience-section" id="audience">
          <div className="container audience-layout">
            <div><div className="eyebrow"><span className="eyebrow-dot" /> Who we work with</div><h2>Helping teams make better decisions <em>with better data.</em></h2></div>
            <div className="audience-list">{audiences.map((audience, index) => <div className="audience-item" key={audience}><span>0{index + 1}</span><p>{audience}</p><ArrowUpRight /></div>)}</div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-card">
            <div className="contact-orb contact-orb--one" aria-hidden="true" /><div className="contact-orb contact-orb--two" aria-hidden="true" />
            <div className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> Let’s talk</div>
            <h2>Stop guessing.<br /><em>Start measuring right.</em></h2>
            <p>Your business deserves data you can trust. Let’s identify what’s not working, fix your tracking and build a measurement foundation that supports smarter decisions.</p>
            <a className="button button--primary button--large" href="mailto:hello@fixify.com?subject=Free%20consultation%20with%20Fixify">Book your free consultation <ArrowUpRight /></a>
            <div className="contact-footnote"><span>Prefer email?</span> <a href="mailto:hello@fixify.com">hello@fixify.com</a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><img src="/assets/fixify-logo-cropped.png" alt="Fixify" className="footer-logo" /><p>Tracking made right.<br />Decisions made smarter.</p></div>
          <div className="footer-column"><span className="footer-label">Explore</span><a href="#services">Services</a><a href="#approach">Approach</a><a href="#why-fixify">Why Fixify</a><a href="#contact">Contact</a></div>
          <div className="footer-column footer-column--wide"><span className="footer-label">Services</span><a href="#services">GA4 implementation & audits</a><a href="#services">Google Tag Manager</a><a href="#services">Conversion tracking</a><a href="#services">Attribution & measurement</a></div>
          <div className="footer-column"><span className="footer-label">Start a conversation</span><a className="footer-email" href="mailto:hello@fixify.com">hello@fixify.com <ArrowUpRight /></a><span className="footer-location">Built for teams that care<br />about getting it right.</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Fixify. All rights reserved.</span><span>Tracking made right <i /> Decisions made smarter</span></div>
      </footer>
    </div>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

type MeasurementEvent = { event: string; page_path: string; [key: string]: string }
type MeasurementPayload = { event: string; [key: string]: string }

declare global {
  interface Window { dataLayer?: MeasurementEvent[] }
}

window.dataLayer = window.dataLayer || []
const pushMeasurement = (payload: MeasurementPayload) => {
  window.dataLayer?.push({ ...payload, page_path: window.location.pathname })
}

let formStarted = false
document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null
  if (!target) return
  const label = (target.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120)
  const href = target instanceof HTMLAnchorElement ? target.href : ''
  if (href.startsWith('mailto:')) pushMeasurement({ event: 'email_click', destination_url: href, cta_name: label })
  else if (href.includes('linkedin.com')) pushMeasurement({ event: 'outbound_click', destination_url: href, cta_name: 'linkedin_click' })
  else if (href && !href.startsWith(window.location.origin)) pushMeasurement({ event: 'outbound_click', destination_url: href, cta_name: label })
  if (target.matches('.button, .text-link')) pushMeasurement({ event: 'cta_click', cta_name: label })
})
document.addEventListener('focusin', (event) => {
  if (!formStarted && (event.target as HTMLElement).closest('form')) {
    formStarted = true
    pushMeasurement({ event: 'contact_form_start', form_type: 'measurement_diagnostic' })
  }
})
document.addEventListener('submit', () => pushMeasurement({ event: 'contact_form_submit', form_type: 'measurement_diagnostic' }))
document.addEventListener('invalid', (event) => { if ((event.target as HTMLElement).closest('form')) pushMeasurement({ event: 'contact_form_error', form_type: 'measurement_diagnostic' }) }, true)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

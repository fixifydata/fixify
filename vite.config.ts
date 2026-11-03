import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        home: 'index.html',
        services: 'services/index.html',
        servicesAnalytics: 'services/analytics/index.html',
        servicesPaidMedia: 'services/paid-media/index.html',
        servicesCdp: 'services/cdp/index.html',
        servicesServerSide: 'services/server-side/index.html',
        servicesReporting: 'services/reporting/index.html',
        servicesTagManagement: 'services/tag-management/index.html',
        servicesEcommerce: 'services/ecommerce/index.html',
        servicesAppTracking: 'services/app-tracking/index.html',
        servicesMobileTracking: 'services/mobile-tracking/index.html',
        approach: 'approach/index.html',
        about: 'about/index.html',
        contact: 'contact/index.html',
      },
    },
  },
})

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
        approach: 'approach/index.html',
        about: 'about/index.html',
        contact: 'contact/index.html',
      },
    },
  },
})

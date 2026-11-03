import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { globSync } from 'node:fs'

const input = Object.fromEntries(globSync('**/index.html').filter((file) => !file.startsWith('node_modules/') && !file.startsWith('dist/')).map((file) => [file.replace(/\/index\.html$/, '').replace(/[^a-zA-Z0-9]+/g, '_') || 'home', file]))

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: { input },
  },
})

import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  output: 'static',
  site: 'https://concretecalc.example.com',
  integrations: [sitemap()],
  // Prefetch calculator pages on hover/tap for instant subsequent navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    // CSS is small (~20K) — inlining it removes a render-blocking request
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

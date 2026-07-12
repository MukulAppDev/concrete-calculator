import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: 'static',
  site: 'https://concreteyardscalculator.com',

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

  adapter: cloudflare()
})
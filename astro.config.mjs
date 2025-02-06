// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: "https://2martens.de",
  trailingSlash: "never",
  prefetch: true,
  integrations: [tailwind(), react(), sitemap()],
  vite: {
    ssr: {
      noExternal: ['@payloadcms/richtext-lexical']
    }
  }
});
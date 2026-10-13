// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from GitHub Pages at https://pericomar.github.io/portfolio/
// If you move to a custom domain, set `site` to it and `base` to '/'.
export default defineConfig({
  site: 'https://pericomar.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
});

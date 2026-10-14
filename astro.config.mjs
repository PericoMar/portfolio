// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from Vercel. VERCEL_PROJECT_PRODUCTION_URL is the project's shortest
// production domain — the custom one as soon as it is added — so canonical URLs,
// the sitemap and the Open Graph image follow the domain without touching this file.
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'pedro-martinez-portfolio.vercel.app';

export default defineConfig({
  site: `https://${host}`,
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

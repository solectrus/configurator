import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

const site = 'https://configurator.solectrus.de/';

export default defineConfig({
  site,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      // Body (400), font-medium (500), font-semibold (600) — see usage in markup.
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Merriweather',
      cssVariable: '--font-merriweather',
      // Headings use font-light (300); number badges use the default (400).
      weights: [300, 400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
  build: {
    // External stylesheets only: assets carry a content digest and get a
    // 1-year immutable cache, while HTML is cached for just 3 minutes.
    // ('auto' would be a no-op here anyway — its inline threshold is
    // assetsInlineLimit, which we pin to 0 below to keep data: URIs out of
    // the way of the strict img-src CSP.)
    inlineStylesheets: 'never',
  },
  integrations: [
    icon(),
    sitemap({
      // The bare root only redirects to a locale — keep it out of the sitemap.
      filter: (page) => page !== site,
    }),
  ],
  vite: {
    build: {
      // Never emit data: URIs — the strict img-src 'self' CSP would block them.
      // The '@' import alias is resolved natively from tsconfig.json paths.
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },
});

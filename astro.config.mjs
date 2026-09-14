// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Pure static build for Vercel — no deployment adapter (Astro static output is auto-detected).
export default defineConfig({
  site: 'https://tszuk.co.za',
  output: 'static',
  // Clean directory-format URLs with a consistent trailing slash. Making the
  // policy explicit (rather than the default 'ignore') keeps the address bar,
  // canonical URL, and nav active-state comparison consistent during
  // client-side view transitions, avoiding a stale URL / wrong active link.
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});

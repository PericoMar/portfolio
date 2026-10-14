import type { APIRoute } from 'astro';
import { url } from '../lib/paths';

/** Everything is crawlable; the sitemap follows `site`, so it switches domain with it. */
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL(url('sitemap-index.xml'), site).href}`, ''];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

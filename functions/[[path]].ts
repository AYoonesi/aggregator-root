import { fetchFeeds } from '../src/lib/fetchFeeds.js';

export async function onRequest(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (url.pathname === '/api/posts' || url.pathname === '/api/posts/refresh') {
    try {
      const posts = await fetchFeeds();
      return new Response(JSON.stringify({
        success: true,
        count: posts.length,
        lastUpdated: new Date().toISOString(),
        posts
      }), {
        headers: { 'content-type': 'application/json; charset=utf-8' },
        status: 200
      });
    } catch (err: any) {
      console.warn('[onRequest] fetchFeeds failed:', err);
      return new Response(JSON.stringify({
        success: false,
        count: 0,
        lastUpdated: new Date().toISOString(),
        posts: [],
        error: err?.message || 'Failed to fetch RSS feeds'
      }), {
        headers: { 'content-type': 'application/json; charset=utf-8' },
        status: 500
      });
    }
  }

  if (url.pathname === '/robots.txt') {
    return new Response(`User-agent: *\nAllow: /\n`, {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
      status: 200
    });
  }

  if (url.pathname === '/sitemap.xml') {
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://en.ayoonesi.ir</loc></url>\n  <url><loc>https://fa.ayoonesi.ir</loc></url>\n</urlset>`, {
      headers: { 'content-type': 'application/xml; charset=utf-8' },
      status: 200
    });
  }

  return env.ASSETS.fetch(request);
}

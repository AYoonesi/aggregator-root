export async function onRequest(context: any) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  if (url.pathname === '/api/posts') {
    return new Response(JSON.stringify({
      success: true,
      count: 0,
      lastUpdated: new Date().toISOString(),
      posts: []
    }), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
      status: 200
    });
  }

  if (url.pathname === '/api/posts/refresh') {
    return new Response(JSON.stringify({
      success: true,
      count: 0,
      lastUpdated: new Date().toISOString(),
      posts: []
    }), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
      status: 200
    });
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

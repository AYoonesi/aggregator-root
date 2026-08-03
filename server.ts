import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fetchFeeds } from './src/lib/fetchFeeds.js';

let cachedPosts: any[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

async function getAggregatedPosts() {
  const now = Date.now();
  if (cachedPosts.length > 0 && (now - lastFetchTime) < CACHE_TTL_MS) {
    return cachedPosts;
  }
  try {
    const posts = await fetchFeeds();
    if (posts && posts.length > 0) {
      cachedPosts = posts;
      lastFetchTime = now;
    }
    return cachedPosts.length > 0 ? cachedPosts : posts;
  } catch (err) {
    console.error('Error fetching RSS feeds:', err);
    return cachedPosts;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Robots.txt for Search Engines / Googlebot
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: https://en.ayoonesi.ir/sitemap.xml
`);
  });

  // Sitemap XML for Google Search indexing
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const posts = await getAggregatedPosts();
      const urls = [
        'https://en.ayoonesi.ir',
        'https://fa.ayoonesi.ir',
        ...posts.map(p => p.link)
      ];

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://en.ayoonesi.ir</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fa.ayoonesi.ir</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${post.link.replace(/&/g, '&amp;')}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

      res.type('application/xml');
      res.send(sitemapXml);
    } catch (e) {
      res.status(500).send('Error generating sitemap');
    }
  });

  // Aggregated posts API route
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await getAggregatedPosts();
      res.json({
        success: true,
        count: posts.length,
        lastUpdated: new Date(lastFetchTime || Date.now()).toISOString(),
        posts
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to fetch feeds' });
    }
  });

  // Manual refresh route
  app.post('/api/posts/refresh', async (req, res) => {
    try {
      lastFetchTime = 0; // invalidate cache
      const posts = await getAggregatedPosts();
      res.json({
        success: true,
        count: posts.length,
        lastUpdated: new Date().toISOString(),
        posts
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Serve static assets or Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

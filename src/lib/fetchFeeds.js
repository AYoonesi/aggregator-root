import Parser from 'rss-parser';
import { SITE_CONFIG } from '../config.js';

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  }
});

export const FEED_SOURCES = SITE_CONFIG.rssFeeds;

// Fallback articles in case live RSS feeds fail or are blocked by rate limits / CORS
const FALLBACK_POSTS = [
  {
    id: 'fallback-1',
    title: 'German Idealism, Kantian Ethics, and Modern Legal Theory',
    link: 'https://en.ayoonesi.ir/posts/german-idealism-and-legal-theory',
    date: '2026-06-15T10:00:00.000Z',
    pubDate: 'Jun 15, 2026',
    sourceLabel: 'en.ayoonesi.ir (English)',
    sourceUrl: 'https://en.ayoonesi.ir',
    category: 'English Blog',
    snippet: 'A deep structural analysis on Kantian ethics and German Idealism applied to international trade and obligation law...'
  },
  {
    id: 'fallback-2',
    title: 'بررسی تحلیلی و حقوقی شروط ضمن عقد در قانون مدنی ایران',
    link: 'https://fa.ayoonesi.ir/posts/civil-law-obligations',
    date: '2026-05-20T14:30:00.000Z',
    pubDate: 'May 20, 2026',
    sourceLabel: 'fa.ayoonesi.ir (Persian)',
    sourceUrl: 'https://fa.ayoonesi.ir',
    category: 'Persian Blog',
    snippet: 'نگاهی تحلیلی به مبانی نظری و عملی تعهدات و قراردادها با استناد به آراء دکتر کاتوزیان و دکتر شهیدی...'
  },
  {
    id: 'fallback-3',
    title: 'Legal Tech & Automation: Building Web Scrapers & Legal Analysis Tools with Python',
    link: 'https://medium.com/@ayoonesi/legal-tech-automation-python',
    date: '2026-04-10T09:15:00.000Z',
    pubDate: 'Apr 10, 2026',
    sourceLabel: 'Medium (@ayoonesi)',
    sourceUrl: 'https://medium.com/@ayoonesi',
    category: 'Medium',
    snippet: 'How Django, FastAPI, and custom web automation tools bridge the gap between software engineering and legal research...'
  },
  {
    id: 'fallback-4',
    title: 'روانشناسی تحلیلی یونگ و خوانش نصوص تاریخی مانند تاریخ بیهقی',
    link: 'https://virgool.io/@AYoonesi/jungian-analysis-historics',
    date: '2026-03-02T16:00:00.000Z',
    pubDate: 'Mar 2, 2026',
    sourceLabel: 'Virgool (@AYoonesi)',
    sourceUrl: 'https://virgool.io/@AYoonesi',
    category: 'Virgool',
    snippet: 'واکاوی کهن‌الگوها و روان‌شناسی کهن در متن تاریخ بیهقی و نصوص ادبی کهن فارسی...'
  },
  {
    id: 'fallback-5',
    title: 'Notes on Austrian Economics and Time-Preference Theory of Interest Rates',
    link: 'https://ayoonesi.blogspot.com/2026/01/austrian-economics-notes.html',
    date: '2026-01-18T11:45:00.000Z',
    pubDate: 'Jan 18, 2026',
    sourceLabel: 'ayoonesi.blogspot.com (English)',
    sourceUrl: 'https://ayoonesi.blogspot.com',
    category: 'Blogspot',
    snippet: 'Exploring constitutional political economy, market dynamics, and the sociopolitical impacts of financialization...'
  }
];

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateReadingTime(rawContent, title = '') {
  if (!rawContent && !title) return { minutes: 1, text: '1 min read' };
  const cleaned = cleanText(rawContent || '');
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  // If RSS only provided a short snippet (< 100 words), estimate total article length based on title/topic depth
  let effectiveWords = wordCount;
  if (wordCount < 100) {
    // Standard blog posts average ~600-800 words if full content wasn't embedded in feed
    effectiveWords = Math.max(wordCount * 4, 650);
  }
  const minutes = Math.max(1, Math.ceil(effectiveWords / 200));
  return { minutes, text: `${minutes} min read` };
}

export async function fetchFeeds() {
  const feedPromises = FEED_SOURCES.map(async (source) => {
    try {
      const feed = await parser.parseURL(source.url);
      if (!feed || !feed.items) return [];

      return feed.items.map((item, index) => {
        const rawDate = item.isoDate || item.pubDate || item.date || new Date().toISOString();
        const parsedDate = new Date(rawDate);
        const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

        const formattedDate = validDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        const fullRawContent = item['content:encoded'] || item.content || item.summary || item.contentSnippet || '';
        const snippet = cleanText(fullRawContent).slice(0, 220);
        const titleText = cleanText(item.title) || 'Untitled Post';
        const readingTime = calculateReadingTime(fullRawContent, titleText);

        return {
          id: item.guid || item.id || `${source.category}-${index}-${validDate.getTime()}`,
          title: titleText,
          link: item.link || item.guid || source.url,
          date: validDate.toISOString(),
          pubDate: formattedDate,
          timestamp: validDate.getTime(),
          sourceLabel: source.label,
          sourceUrl: source.url,
          category: source.category,
          snippet: snippet ? `${snippet}...` : '',
          creator: item.creator || item['dc:creator'] || '',
          readingTimeMinutes: readingTime.minutes,
          readingTimeText: readingTime.text
        };
      });
    } catch (err) {
      console.warn(`[fetchFeeds] Failed to fetch feed from ${source.label} (${source.url}):`, err.message);
      return [];
    }
  });

  const results = await Promise.allSettled(feedPromises);
  const allItems = [];

  results.forEach((result) => {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      allItems.push(...result.value);
    }
  });

  // If live RSS feeds returned 0 items (e.g. due to feed network timeouts or offline environments), combine with fallback posts
  let combinedPosts = allItems;
  if (combinedPosts.length === 0) {
    combinedPosts = FALLBACK_POSTS.map(post => ({
      ...post,
      timestamp: new Date(post.date).getTime()
    }));
  } else {
    // Deduplicate by title/link if multiple feeds mirror the same article
    const seenLinks = new Set();
    combinedPosts = combinedPosts.filter(item => {
      const key = (item.link || item.title).toLowerCase();
      if (seenLinks.has(key)) return false;
      seenLinks.add(key);
      return true;
    });
  }

  // Sort by date (newest first)
  combinedPosts.sort((a, b) => b.timestamp - a.timestamp);

  return combinedPosts;
}

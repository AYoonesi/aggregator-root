export interface RSSFeedConfig {
  url: string;
  label: string;
  category: string;
  defaultDomain: string;
}

export interface SiteConfig {
  nameEn: string;
  nameFa: string;
  avatarUrl: string;
  tagline: string;
  bio: string;
  location: string;
  emails: string[];
  linkedin: string;
  github: string;
  navLinks: Array<{
    label: string;
    url: string;
    lang?: string;
    isPrimary?: boolean;
  }>;
  rssFeeds: RSSFeedConfig[];
}

export const SITE_CONFIG: SiteConfig = {
  // Title Display (English 1st, Persian 2nd)
  nameEn: 'Alireza Yoonesi',
  nameFa: 'علیرضا یونسی',

  // Profile / Avatar image URL (edit this path or URL anytime)
  // avatarUrl: '/avatar.jpg',
  avatarUrl: 'https://raw.githubusercontent.com/AYoonesi/AYoonesi/refs/heads/main/me.svg',

  // Professional Tagline & Bio
  tagline: 'Law Student, Tech-Forward Legal Researcher & Rookie Kantian',
  bio: 'A multidimensional legal professional specializing in Private Law, International Trade, and Alternative Dispute Resolution (ADR), with a foundational background in Electrical Engineering and software development. Passionate about exploring the intersection of law, emerging technology, and international markets. And of course Philosophy (German Idealism).',

  location: 'Shiraz, Iran',
  emails: ['me@ayoonesi.ir', 'alireza.yoonesi78@gmail.com'],
  linkedin: 'https://linkedin.com/in/ayoonesi',
  github: 'https://github.com/ayoonesi',

  // Navigation Links at top header
  navLinks: [
    { label: 'fa.ayoonesi.ir', url: 'https://fa.ayoonesi.ir', lang: 'Persian' },
    { label: 'en.ayoonesi.ir', url: 'https://en.ayoonesi.ir', lang: 'English' },
    // { label: 'GitHub', url: 'https://github.com/ayoonesi', isPrimary: true }
  ],

  // RSS Feed Aggregator Indexes
  rssFeeds: [
    {
      url: 'https://medium.com/feed/@ayoonesi',
      label: 'Medium (@ayoonesi)',
      category: 'Medium',
      defaultDomain: 'medium.com'
    },
    {
      url: 'https://fa.ayoonesi.ir/index.xml',
      label: 'fa.ayoonesi.ir (Persian)',
      category: 'Persian Blog',
      defaultDomain: 'fa.ayoonesi.ir'
    },
    {
      url: 'https://en.ayoonesi.ir/index.xml',
      label: 'en.ayoonesi.ir (English)',
      category: 'English Blog',
      defaultDomain: 'en.ayoonesi.ir'
    },
    {
      url: 'https://virgool.io/feed/@AYoonesi',
      label: 'Virgool (@AYoonesi)',
      category: 'Virgool',
      defaultDomain: 'virgool.io'
    },
    {
      url: 'https://medium.com/feed/@alirezayoonesi',
      label: 'Medium (@alirezayoonesi)',
      category: 'Medium',
      defaultDomain: 'medium.com'
    },
    {
      url: 'https://ayoonesii.blogspot.com/rss.xml',
      label: 'ayoonesii.blogspot.com (Persian)',
      category: 'Blogspot',
      defaultDomain: 'ayoonesii.blogspot.com'
    },
    {
      url: 'https://ayoonesi.blogspot.com/rss.xml',
      label: 'ayoonesi.blogspot.com (English)',
      category: 'Blogspot',
      defaultDomain: 'ayoonesi.blogspot.com'
    }
  ]
};

export interface PostItem {
  id: string;
  title: string;
  link: string;
  date: string;
  pubDate: string;
  timestamp?: number;
  sourceLabel: string;
  sourceUrl: string;
  category: 'Medium' | 'Persian Blog' | 'English Blog' | 'Virgool' | 'Blogspot' | string;
  snippet?: string;
  creator?: string;
  readingTimeMinutes?: number;
  readingTimeText?: string;
}

export interface FeedSource {
  url: string;
  label: string;
  category: string;
  defaultDomain: string;
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string;
  details?: string;
}

export interface EducationItem {
  institution: string;
  period: string;
  focus: string;
  details: string[];
}

export interface CertificationGroup {
  category: string;
  items: Array<{
    title: string;
    issuer?: string;
  }>;
}

export interface ProjectInterest {
  title: string;
  description: string;
  tags?: string[];
}

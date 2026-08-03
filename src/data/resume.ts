import { ExperienceItem, EducationItem, CertificationGroup, ProjectInterest } from '../types';

export const PERSONAL_INFO = {
  nameFa: 'علیرضا یونسی',
  nameEn: 'Alireza Yoonesi',
  tagline: 'Law Student, Tech-Forward Legal Researcher & Rookie Kantian',
  bio: 'A multidimensional legal professional specializing in Private Law, International Trade, and Alternative Dispute Resolution (ADR), with a foundational background in Electrical Engineering and software development. Passionate about exploring the intersection of law, emerging technology, and international markets. And of course Philosophy (German Idealism).',
  location: 'Shiraz, Iran',
  emails: ['me@ayoonesi.ir', 'alireza.yoonesi78@gmail.com'],
  linkedin: 'https://linkedin.com/in/ayoonesi',
  github: 'https://github.com/ayoonesi',
  websites: {
    english: [
      { name: 'en.ayoonesi.ir', url: 'https://en.ayoonesi.ir' },
      { name: 'ayoonesi.blogspot.com', url: 'https://ayoonesi.blogspot.com' }
    ],
    persian: [
      { name: 'fa.ayoonesi.ir', url: 'https://fa.ayoonesi.ir' },
      { name: 'ayoonesii.blogspot.com', url: 'https://ayoonesii.blogspot.com' }
    ]
  },
  skills: [
    'Private Law & Law of Obligations',
    'International Trade & ADR',
    'Python (Django, Flask, FastAPI)',
    'Legal Tech & Artificial Intelligence',
    'Academic Research & Translation',
    'Critical & Analytical Thinking'
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    organization: 'Chartered Institute of Arbitrators (CIArb)',
    role: 'Student Member',
    period: 'Aug 2024 – Present',
    description: 'Engaged with a leading global professional body dedicated to advancing the highest standards in effective international dispute resolution.',
    details: 'Mostly reading their publications with particular interest in The Resolver.'
  },
  {
    organization: 'Django Software Foundation',
    role: 'Python Developer',
    period: 'May 2021 – Present',
    description: 'Develop and maintain backend systems utilizing Django, Flask, and FastAPI architectures, bringing robust logic and structural thinking to complex technical challenges.'
  },
  {
    organization: 'Shiraz University',
    role: 'Undergraduate Teaching Assistant (C++ Programming)',
    period: 'Jan 2021 – May 2021',
    description: 'Instructed undergraduate students on complex programming logic, managed assignment grading, and facilitated interactive problem-solving sessions.'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Shiraz Branch, Islamic Azad University',
    period: '2022 – 2026',
    focus: 'Law of Obligations / Private Law',
    details: [
      'Currently dedicating rigorous, full-time study toward the upcoming LL.M. entrance exam.',
      'Finished comprehensive civil code treatises by Prof. Katouzian (15–20 volumes), Prof. Shahidi (5 books on law of obligations), and Prof. Jafari Langroudi.'
    ]
  },
  {
    institution: 'Shiraz University',
    period: '2019 – 2021',
    focus: 'Electrical, Electronics and Communications Engineering',
    details: [
      'Ranked around 500 in national Konkur exam.',
      'Foundational studies in engineering logic before transitioning full-time into Law and Legal Tech.'
    ]
  }
];

export const CERTIFICATIONS: CertificationGroup[] = [
  {
    category: 'Yale University',
    items: [
      { title: 'Financial Markets (with Honors) — Prof. Robert J. Shiller' },
      { title: 'American Contracts Law — Prof. Ian Ayres' }
    ]
  },
  {
    category: 'International Trade Law & UNCITRAL',
    items: [
      { title: 'Introduction to UNCITRAL' },
      { title: 'UNCITRAL International Commercial Arbitration' },
      { title: 'UNCITRAL Mediation Framework' },
      { title: 'UNCITRAL Texts on Public Procurement & PPPs' },
      { title: 'WTO in 10 Minutes' }
    ]
  },
  {
    category: 'WIPO & IP Law',
    items: [
      { title: 'Patent Cooperation Treaty (2024 Edition & Legacy)' },
      { title: 'Using Patent Information (e-Tutorial)' },
      { title: 'Primer on Intellectual Property (DL-001)' }
    ]
  },
  {
    category: 'ITC SME Trade Academy',
    items: [
      { title: 'Cross-border Contracts' },
      { title: 'Advocacy & Trade Policy Reform' },
      { title: 'Client Management for TISIs' },
      { title: 'Introduction to E-commerce' }
    ]
  },
  {
    category: 'Doctrinal Legal Studies & Economics',
    items: [
      { title: 'Introductory Study of German Law & Texts — Univ. of Tehran' },
      { title: 'British Company Law in Context — Open University' },
      { title: 'Comprehensive Legal Consultant Training: Contract Drafting — Dadbanan Institute' },
      { title: 'Corporate Finance — Columbia University' },
      { title: 'International Trade & Macroeconomics — Marginal Revolution Univ. & GMU' }
    ]
  }
];

export const PROJECTS_AND_INTERESTS: ProjectInterest[] = [
  {
    title: 'Philosophical & Academic Research',
    description: 'Dedicated 2026 to a deep structural analysis of German Idealism (Kant and Hegel). Publish cross-disciplinary thought pieces including conceptual breakdowns of Usul al-Fiqh and Jungian analyses of historical texts (Beihaghi\'s history).',
    tags: ['German Idealism', 'Kant & Hegel', 'Usul al-Fiqh', 'Jungian Analysis']
  },
  {
    title: 'Academic Translation & Modern Tooling',
    description: 'Translate dense academic and legal texts into English using advanced LLMs (like Gemini) to refine workflows and ensure precise linguistic fidelity.',
    tags: ['LLMs', 'Legal Tech', 'Translation', 'Gemini']
  },
  {
    title: 'Software Engineering & Web Automation',
    description: 'Maintain active open-source Python repositories, developing utilities, Telegram bots, custom web scrapers, and self-hosted web infrastructure (Hugo, Nginx).',
    tags: ['Python', 'Django', 'FastAPI', 'Hugo', 'Nginx']
  },
  {
    title: 'Macroeconomics & Public Choice',
    description: 'Write analytical essays exploring Austrian economics, the time-preference theory of interest rates, constitutional political economy, and sociopolitical impacts of housing financialization.',
    tags: ['Austrian Economics', 'Political Economy', 'Housing Macro']
  },
  {
    title: 'Agriculture & Sustainability',
    description: 'Actively engage in farming and hands-on agriculture, maintaining a grounding connection to nature as a counterbalance to digital and legal pursuits.',
    tags: ['Farming', 'Sustainability', 'Nature']
  },
  {
    title: 'Classical Literature & Realist Cinema',
    description: 'Engaged with classical literature (Hafez, Dante, Seneca) and the realist cinema of directors like Lars von Trier and Krzysztof Kieślowski.',
    tags: ['Hafez', 'Dante', 'Seneca', 'Realist Cinema']
  }
];

export const FIDIBO_STREAK = {
  streakDays: 870,
  booksReadCount: 705,
  note: '870 consecutive days reading streak on Fidibo.'
};

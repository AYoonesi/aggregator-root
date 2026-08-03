import React, { useState } from 'react';
import { SITE_CONFIG } from '../config';
import { ExternalLink, Github, Linkedin, Mail, Globe, BookOpen, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'writings' | 'resume' | 'interests';
  setActiveTab: (tab: 'writings' | 'resume' | 'interests') => void;
  postCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, postCount }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xs sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Profile Avatar & Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Round Avatar Picture */}
            <div className="relative shrink-0">
              {!imageError ? (
                <img
                  src={SITE_CONFIG.avatarUrl}
                  alt={SITE_CONFIG.nameEn}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-stone-200/80"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-lg border-2 border-white shadow-xs ring-1 ring-stone-200">
                  AY
                </div>
              )}
            </div>

            <div>
              {/* Order: English First | Persian Second */}
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 flex flex-wrap items-baseline gap-2.5">
                <span className="font-sans font-bold tracking-tight text-stone-900">
                  {SITE_CONFIG.nameEn}
                </span>
                <span className="text-stone-300 font-light select-none">|</span>
                <span className="font-vazir font-bold text-stone-950 tracking-normal">
                  {SITE_CONFIG.nameFa}
                </span>
              </h1>
              <p className="mt-1 text-sm font-medium text-stone-600 tracking-wide">
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Key Navigation Links */}
          <nav className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-medium md:self-center">
            {SITE_CONFIG.navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                  link.isPrimary
                    ? 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/60'
                }`}
              >
                {link.label.includes('GitHub') ? (
                  <Github className="w-3.5 h-3.5" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-stone-500" />
                )}
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            ))}
          </nav>
        </div>

        {/* Executive Bio */}
        <p className="mt-4 text-sm text-stone-600 leading-relaxed max-w-3xl font-light">
          {SITE_CONFIG.bio}
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center justify-between border-t border-stone-200/60 pt-4">
          <div className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('writings')}
              className={`inline-flex items-center gap-2 pb-1 border-b-2 transition-all ${
                activeTab === 'writings'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Latest Writings</span>
              {typeof postCount === 'number' && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-700 font-mono">
                  {postCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`inline-flex items-center gap-2 pb-1 border-b-2 transition-all ${
                activeTab === 'resume'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About & Resume</span>
            </button>

            <button
              onClick={() => setActiveTab('interests')}
              className={`inline-flex items-center gap-2 pb-1 border-b-2 transition-all ${
                activeTab === 'interests'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Research & Endeavors</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-stone-400 text-xs">
            <a
              href={`mailto:${SITE_CONFIG.emails[0]}`}
              className="hover:text-stone-700 transition-colors inline-flex items-center gap-1"
              title="Email me"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{SITE_CONFIG.emails[0]}</span>
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-700 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

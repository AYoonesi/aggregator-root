import React, { useState, useEffect } from 'react';
import { PostItem } from './types';
import { Header } from './components/Header';
import { WritingAggregator } from './components/WritingAggregator';
import { ResumeSection } from './components/ResumeSection';
import { InterestsSection } from './components/InterestsSection';
import { INITIAL_FALLBACK_POSTS } from './data/fallbackPosts';
import { SITE_CONFIG } from './config';

export default function App() {
  const [activeTab, setActiveTab] = useState<'writings' | 'resume' | 'interests'>('writings');
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_FALLBACK_POSTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

  const loadPosts = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    const useStaticFallback = typeof window === 'undefined' || !['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (useStaticFallback) {
      setPosts(INITIAL_FALLBACK_POSTS);
      setLastUpdated(new Date().toISOString());
      setLoading(false);
      return;
    }

    try {
      const endpoint = forceRefresh ? '/api/posts/refresh' : '/api/posts';
      const res = await fetch(endpoint, {
        method: forceRefresh ? 'POST' : 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          setLastUpdated(data.lastUpdated);
          setLoading(false);
          return;
        }
      }

      // Fallback if backend returned empty array or offline
      setPosts(INITIAL_FALLBACK_POSTS);
      setLastUpdated(new Date().toISOString());
    } catch (err: any) {
      console.warn('API call failed, falling back to static posts:', err);
      setPosts(INITIAL_FALLBACK_POSTS);
      setLastUpdated(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 flex flex-col font-sans selection:bg-stone-200">
      {/* Sticky Minimalist Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        postCount={posts.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeTab === 'writings' && (
          <WritingAggregator
            posts={posts}
            loading={loading}
            error={error}
            onRefresh={() => loadPosts(true)}
            lastUpdated={lastUpdated}
          />
        )}

        {activeTab === 'resume' && <ResumeSection />}

        {activeTab === 'interests' && <InterestsSection />}
      </main>

      {/* Minimalist Footer */}
      <footer className="w-full border-t border-stone-200/80 py-8 bg-stone-100/40 text-stone-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="font-semibold text-stone-800">
              {SITE_CONFIG.nameEn} | {SITE_CONFIG.nameFa}
            </span>
            <span className="text-stone-300">·</span>
            {SITE_CONFIG.navLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-stone-400 font-mono text-[11px] text-center sm:text-right">
            © {new Date().getFullYear()} · Minimalist Feed Aggregator
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { PostItem } from '../types';
import { SITE_CONFIG } from '../config';
import { ExternalLink, RefreshCw, Search, Calendar, Clock, Tag, ChevronDown, ChevronUp, Rss, Sparkles } from 'lucide-react';

interface WritingAggregatorProps {
  posts: PostItem[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  lastUpdated?: string;
}

export const WritingAggregator: React.FC<WritingAggregatorProps> = ({
  posts,
  loading,
  error,
  onRefresh,
  lastUpdated
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Medium', 'Persian Blog', 'English Blog', 'Virgool', 'Blogspot'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      post.sourceLabel?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.snippet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.sourceLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getLabelBadgeStyle = (category: string) => {
    switch (category) {
      case 'Medium':
        return 'bg-stone-900 text-stone-100 border-stone-800';
      case 'Persian Blog':
        return 'bg-amber-50 text-amber-900 border-amber-200/80 font-vazir';
      case 'English Blog':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200/80';
      case 'Virgool':
        return 'bg-blue-50 text-blue-900 border-blue-200/80 font-vazir';
      case 'Blogspot':
        return 'bg-orange-50 text-orange-900 border-orange-200/80';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="w-full">
      {/* Search and Source Filter Control Bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60">
        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-stone-50 shadow-2xs'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Live Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Filter writings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-100/80 focus:bg-white border border-stone-200 rounded focus:outline-hidden focus:ring-1 focus:ring-stone-400 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs px-1"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh RSS feeds"
            className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-50 transition-colors border border-stone-200/60 flex items-center gap-1 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-stone-900' : ''}`} />
            <span className="hidden md:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Error state alert */}
      {error && (
        <div className="mb-6 p-3 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={onRefresh} className="underline text-amber-800 font-medium hover:text-amber-950">
            Retry
          </button>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="mb-6 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <Rss className="w-3.5 h-3.5 text-stone-400" />
          <span>
            Showing <strong className="text-stone-800 font-medium">{filteredPosts.length}</strong> of {posts.length} aggregated posts
          </span>
        </div>
        {lastUpdated && (
          <span className="hidden sm:inline font-mono text-[11px] text-stone-400">
            Updated {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Loading Skeleton State */}
      {loading && posts.length === 0 && (
        <div className="space-y-6 py-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="animate-pulse space-y-2 py-3 border-b border-stone-100">
              <div className="h-4 bg-stone-200/70 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-3 bg-stone-200/50 rounded w-24"></div>
                <div className="h-3 bg-stone-200/50 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Aggregated List Items */}
      {!loading && filteredPosts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-stone-200 rounded-lg">
          <p className="text-stone-500 text-sm">No writings found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-stone-900 font-medium underline hover:text-stone-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-stone-200/70 border-t border-b border-stone-200/70">
          {filteredPosts.map((item) => {
            const isExpanded = expandedId === item.id;
            const isRtl = /[\u0600-\u06FF]/.test(item.title);

            return (
              <li key={item.id} className="py-4 hover:bg-stone-100/40 px-2 rounded transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  {/* Article Title & Link */}
                  <div className="flex-1 min-w-0 pr-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-stone-900 hover:text-stone-600 font-medium text-base tracking-tight leading-snug group-hover:underline ${
                        isRtl ? 'font-vazir text-right' : ''
                      }`}
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 shrink-0" />
                    </a>
                  </div>

                  {/* Metadata: Date & Label */}
                  <div className="flex items-center gap-2.5 text-xs shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                    {/* Source Label */}
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getLabelBadgeStyle(
                        item.category
                      )}`}
                    >
                      {item.category || item.sourceLabel}
                    </span>

                    {/* Date & Reading Time */}
                    <span className="text-stone-500 font-mono text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {item.pubDate}
                    </span>

                    {item.readingTimeText && (
                      <span className="text-stone-500 font-mono text-[11px] flex items-center gap-1 bg-stone-100/80 px-1.5 py-0.5 rounded border border-stone-200/50">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{item.readingTimeText}</span>
                      </span>
                    )}

                    {/* Expand snippet button if snippet exists */}
                    {item.snippet && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors"
                        title={isExpanded ? 'Collapse excerpt' : 'Preview excerpt'}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Excerpt Snippet toggle */}
                {item.snippet && isExpanded && (
                  <div
                    className={`mt-2.5 p-3 rounded bg-stone-100/80 border border-stone-200/50 text-xs text-stone-600 leading-relaxed ${
                      isRtl ? 'font-vazir text-right' : ''
                    }`}
                  >
                    <p>{item.snippet}</p>
                    <div className="mt-2 pt-2 border-t border-stone-200/40 flex items-center justify-between text-[11px] text-stone-400">
                      <span>Source: {item.sourceLabel}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 font-medium hover:underline flex items-center gap-1"
                      >
                        Read full article on {item.category} →
                      </a>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Sources List Footer */}
      <div className="mt-12 pt-6 border-t border-stone-200/60 text-xs text-stone-500">
        <h4 className="font-semibold text-stone-800 mb-2 uppercase tracking-wider text-[11px]">
          Aggregated Feed Sources
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
          {SITE_CONFIG.rssFeeds.map((feed, idx) => (
            <a
              key={idx}
              href={feed.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-stone-600 truncate flex items-center gap-1"
            >
              <span>• {feed.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

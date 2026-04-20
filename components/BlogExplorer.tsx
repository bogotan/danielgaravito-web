'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  updated: boolean;
  originalDate: string;
  readingTime: number;
  wordCount: number;
}

// Generate a gradient from slug
function getCoverGradient(slug: string): string {
  const gradients = [
    'linear-gradient(135deg, #1565C0 0%, #13AFF0 50%, #0D47A1 100%)',
    'linear-gradient(135deg, #F07B2E 0%, #FF9800 50%, #E65100 100%)',
    'linear-gradient(135deg, #1565C0 0%, #7C4DFF 50%, #13AFF0 100%)',
    'linear-gradient(135deg, #00897B 0%, #13AFF0 50%, #1565C0 100%)',
    'linear-gradient(135deg, #F07B2E 0%, #FF5722 50%, #D84315 100%)',
    'linear-gradient(135deg, #6A1B9A 0%, #1565C0 50%, #13AFF0 100%)',
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

// Tag color mapping
function getTagColor(tag: string): { bg: string; border: string; text: string } {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    'salud publica': { bg: 'rgba(21,101,192,0.15)', border: 'rgba(21,101,192,0.4)', text: '#4FC3F7' },
    'datos': { bg: 'rgba(19,175,240,0.15)', border: 'rgba(19,175,240,0.4)', text: '#13AFF0' },
    'innovacion': { bg: 'rgba(240,123,46,0.15)', border: 'rgba(240,123,46,0.4)', text: '#F07B2E' },
    'Colombia': { bg: 'rgba(76,175,80,0.15)', border: 'rgba(76,175,80,0.4)', text: '#81C784' },
    'economia': { bg: 'rgba(156,39,176,0.15)', border: 'rgba(156,39,176,0.4)', text: '#CE93D8' },
    'propiedad intelectual': { bg: 'rgba(255,193,7,0.15)', border: 'rgba(255,193,7,0.4)', text: '#FFD54F' },
    'NFTs': { bg: 'rgba(233,30,99,0.15)', border: 'rgba(233,30,99,0.4)', text: '#F48FB1' },
    'post-escasez': { bg: 'rgba(0,150,136,0.15)', border: 'rgba(0,150,136,0.4)', text: '#80CBC4' },
    'AlphaFold': { bg: 'rgba(63,81,181,0.15)', border: 'rgba(63,81,181,0.4)', text: '#9FA8DA' },
    'estadistica': { bg: 'rgba(121,85,72,0.15)', border: 'rgba(121,85,72,0.4)', text: '#BCAAA4' },
    'amesp': { bg: 'rgba(0,188,212,0.15)', border: 'rgba(0,188,212,0.4)', text: '#80DEEA' },
  };
  const key = tag.toLowerCase();
  for (const [k, v] of Object.entries(colors)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return { bg: 'rgba(139,148,158,0.1)', border: 'rgba(139,148,158,0.3)', text: '#8B949E' };
}

type ViewMode = 'grid' | 'timeline' | 'stream';

export default function BlogExplorer({ posts }: { posts: BlogPostData[] }) {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [yearFilter, setYearFilter] = useState<string | null>(null);

  // Get all unique tags with counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => p.tags.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  // Get years for timeline
  const years = useMemo(() => {
    const y = new Set<string>();
    posts.forEach((p) => {
      if (p.date) y.add(new Date(p.date).getFullYear().toString());
    });
    return Array.from(y).sort((a, b) => parseInt(b) - parseInt(a));
  }, [posts]);

  // Filter posts
  const filtered = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      // Tag filter
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((t) => post.tags.includes(t));
        if (!hasTag) return false;
      }
      // Year filter
      if (yearFilter && post.date) {
        const postYear = new Date(post.date).getFullYear().toString();
        if (postYear !== yearFilter) return false;
      }
      return true;
    });
  }, [posts, search, selectedTags, yearFilter]);

  // Group by year for timeline view
  const groupedByYear = useMemo(() => {
    const groups: Record<string, BlogPostData[]> = {};
    filtered.forEach((p) => {
      const year = p.date ? new Date(p.date).getFullYear().toString() : 'Sin fecha';
      if (!groups[year]) groups[year] = [];
      groups[year].push(p);
    });
    return Object.entries(groups).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [filtered]);

  // Group by tag for stream view
  const groupedByTag = useMemo(() => {
    const groups: Record<string, BlogPostData[]> = {};
    filtered.forEach((p) => {
      p.tags.forEach((tag) => {
        if (!groups[tag]) groups[tag] = [];
        if (!groups[tag].find((x) => x.slug === p.slug)) {
          groups[tag].push(p);
        }
      });
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setYearFilter(null);
  };

  const hasFilters = search || selectedTags.length > 0 || yearFilter;

  return (
    <div className="section-container">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #1565C0, #13AFF0, #F07B2E)'}}>
            Blog
          </span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Reflexiones sobre datos, salud p&uacute;blica, innovaci&oacute;n, econom&iacute;a y emprendimiento social.
        </p>
        <div className="flex items-center gap-2 mt-2 text-text-muted text-sm">
          <span>{posts.length} art&iacute;culos</span>
          <span>&middot;</span>
          <span>{tagCounts.length} tem&aacute;ticas</span>
        </div>
      </div>

      {/* Search + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por t&iacute;tulo, tema o palabra clave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-gray-700 rounded-xl text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue transition-colors"
          />
        </div>
        <div className="flex gap-1 bg-bg-secondary border border-gray-700 rounded-xl p-1">
          {[
            { mode: 'grid' as ViewMode, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', label: 'Bloques' },
            { mode: 'timeline' as ViewMode, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Timeline' },
            { mode: 'stream' as ViewMode, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', label: 'Temas' },
          ].map(({ mode, icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === mode
                  ? 'bg-accent-green text-white'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Year pills (timeline filter) */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setYearFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !yearFilter
              ? 'bg-accent-blue text-white'
              : 'bg-bg-secondary border border-gray-700 text-text-muted hover:border-accent-blue/50'
          }`}
        >
          Todos los a&ntilde;os
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setYearFilter(yearFilter === year ? null : year)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              yearFilter === year
                ? 'bg-accent-blue text-white'
                : 'bg-bg-secondary border border-gray-700 text-text-muted hover:border-accent-blue/50'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tagCounts.map(([tag, count]) => {
          const colors = getTagColor(tag);
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: isActive ? colors.bg : 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isActive ? colors.border : 'rgba(139,148,158,0.2)',
                color: isActive ? colors.text : '#8B949E',
              }}
            >
              {tag} ({count})
            </button>
          );
        })}
      </div>

      {/* Active filters bar */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-6 text-sm text-text-muted">
          <span>Mostrando {filtered.length} de {posts.length} art&iacute;culos</span>
          <button
            onClick={clearFilters}
            className="ml-2 px-2 py-0.5 rounded bg-bg-secondary border border-gray-700 hover:border-red-500/50 text-text-muted hover:text-red-400 transition-all text-xs"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">&#x1F50D;</div>
          <h2 className="text-xl font-bold text-text mb-2">No se encontraron art&iacute;culos</h2>
          <p className="text-text-muted mb-4">Intenta con otros filtros o palabras clave.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            Ver todos
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-bg-secondary border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-accent-blue/5 hover:translate-y-[-2px]"
            >
              {/* Card cover */}
              <div
                className="h-36 w-full relative"
                style={{ background: getCoverGradient(post.slug) }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2">
                    {post.updated && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                        Actualizado
                      </span>
                    )}
                    <span className="text-[10px] text-white/70">{post.readingTime} min</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-text-muted mb-2">
                  {post.date
                    ? new Date(post.date).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </div>

                <h2 className="text-base font-bold text-text mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-text-muted text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 4).map((tag) => {
                      const colors = getTagColor(tag);
                      return (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: colors.bg,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: colors.border,
                            color: colors.text,
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                    {post.tags.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg border border-gray-700 text-text-muted">
                        +{post.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <span className="text-accent-green text-sm font-medium group-hover:underline flex items-center gap-1">
                  Leer m&aacute;s
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {viewMode === 'timeline' && filtered.length > 0 && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-green to-accent-gold" />

          {groupedByYear.map(([year, yearPosts], yi) => (
            <div key={year} className="mb-12">
              {/* Year marker */}
              <div className="relative flex items-center mb-8">
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent-green flex items-center justify-center z-10 shadow-lg shadow-accent-green/30">
                  <span className="text-white text-xs font-bold">{year.slice(-2)}</span>
                </div>
                <div className="ml-20 md:ml-0 md:w-full md:text-center">
                  <span className="text-2xl font-bold text-text md:ml-16">{year}</span>
                </div>
              </div>

              {yearPosts.map((post, pi) => {
                const isLeft = pi % 2 === 0;
                return (
                  <div key={post.slug} className={`relative flex mb-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot on line */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg z-10 mt-6" />

                    {/* Content card */}
                    <div className={`ml-12 md:ml-0 ${isLeft ? 'md:w-[calc(50%-2rem)] md:pr-8' : 'md:w-[calc(50%-2rem)] md:pl-8 md:ml-auto'}`}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block bg-bg-secondary border border-gray-800 rounded-xl p-5 transition-all duration-300 hover:border-accent-blue/50 hover:shadow-lg hover:shadow-accent-blue/5 group"
                      >
                        <div
                          className="h-2 rounded-full mb-4"
                          style={{ background: getCoverGradient(post.slug) }}
                        />
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-text-muted">
                            {post.date ? new Date(post.date).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }) : ''}
                          </span>
                          <span className="text-xs text-text-muted">&middot; {post.readingTime} min</span>
                          {post.updated && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green">
                              Actualizado
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-text group-hover:text-accent-blue transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-text-muted text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => {
                            const colors = getTagColor(tag);
                            return (
                              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.bg, color: colors.text }}>
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* STREAM / TOPIC VIEW */}
      {viewMode === 'stream' && filtered.length > 0 && (
        <div className="space-y-8">
          {groupedByTag.map(([tag, tagPosts]) => {
            const colors = getTagColor(tag);
            return (
              <div key={tag} className="bg-bg-secondary border border-gray-800 rounded-xl overflow-hidden">
                {/* Topic header */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: `2px solid ${colors.border}` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.text }} />
                    <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                      {tag}
                    </h3>
                    <span className="text-xs text-text-muted bg-bg px-2 py-0.5 rounded-full">
                      {tagPosts.length} {tagPosts.length === 1 ? 'art\u00edculo' : 'art\u00edculos'}
                    </span>
                  </div>
                </div>

                {/* Topic posts */}
                <div className="divide-y divide-gray-800">
                  {tagPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-4 px-6 py-4 hover:bg-bg/50 transition-colors group"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex-shrink-0 mt-0.5"
                        style={{ background: getCoverGradient(post.slug) }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text group-hover:text-accent-blue transition-colors line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-text-muted text-sm line-clamp-1 mt-0.5">{post.excerpt}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                          {post.date && (
                            <span>
                              {new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'short' })}
                            </span>
                          )}
                          <span>{post.readingTime} min</span>
                          {post.updated && <span className="text-accent-green">Actualizado</span>}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-text-muted group-hover:text-accent-blue flex-shrink-0 mt-2 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

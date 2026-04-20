'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import hitosData from '@/data/hitos.json';
import Image from 'next/image';

interface Hito {
  year: number;
  emoji: string;
  title: string;
  desc: string;
  type: string;
  image?: string;
  url?: string;
  highlight?: boolean;
  color?: string;
}

const typeColors: Record<string, string> = {
  premio: 'bg-accent-gold/20 text-accent-gold border-accent-gold/30',
  charla: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  hito: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  fundacion: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  video: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ensayo: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  proyecto: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  libro: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  tecnología: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  gobierno: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  educación: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  innovación: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  emprendimiento: 'bg-accent-gold/20 text-accent-gold border-accent-gold/30',
  publicación: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

function getTypeClasses(type: string): string {
  return typeColors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const hitos = (hitosData as Hito[]).sort((a, b) => b.year - a.year);

  // Group by year
  const grouped: Record<number, Hito[]> = {};
  hitos.forEach((h) => {
    if (!grouped[h.year]) grouped[h.year] = [];
    grouped[h.year].push(h);
  });

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <section id="trayectoria" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="section-title">
          <span className="gradient-text">Trayectoria</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl">
          Un recorrido por los hitos que han marcado mi camino en la intersección
          de datos, salud pública e innovación social.
        </p>
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block relative">
        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-bg-secondary border border-gray-700 flex items-center justify-center hover:border-accent-green hover:text-accent-green transition-all shadow-lg"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-bg-secondary border border-gray-700 flex items-center justify-center hover:border-accent-green hover:text-accent-green transition-all shadow-lg"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className={`overflow-x-auto scrollbar-hide cursor-grab ${isDragging ? 'cursor-grabbing select-none' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="inline-flex items-start px-16 pb-8 min-w-full">
            {/* The timeline container */}
            <div className="relative flex items-start gap-0">
              {years.map((year, yearIdx) => {
                const yearHitos = grouped[year];
                return (
                  <div key={year} className="relative flex flex-col items-center" style={{ minWidth: `${Math.max(yearHitos.length * 280, 300)}px` }}>
                    {/* Cards above the line (even hitos) */}
                    <div className="flex gap-4 mb-4 px-4 min-h-[200px] items-end">
                      {yearHitos
                        .filter((_, i) => i % 2 === 0)
                        .map((hito, i) => (
                          <HitoCard key={`${year}-above-${i}`} hito={hito} position="above" />
                        ))}
                    </div>

                    {/* Connectors above */}
                    <div className="flex gap-4 px-4 justify-center">
                      {yearHitos
                        .filter((_, i) => i % 2 === 0)
                        .map((_, i) => (
                          <div key={`conn-above-${i}`} className="w-[248px] flex justify-center">
                            <div className="w-0.5 h-6 bg-gradient-to-b from-gray-600 to-gray-700" />
                          </div>
                        ))}
                    </div>

                    {/* Timeline line segment with year circle */}
                    <div className="relative w-full flex items-center justify-center py-2">
                      {/* Line */}
                      <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-accent-green via-accent-blue to-accent-gold opacity-60" />
                      {/* Year circle */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-bg border-2 border-accent-green flex items-center justify-center shadow-lg shadow-accent-green/20">
                        <span className="text-sm font-bold text-accent-green">{year}</span>
                      </div>
                    </div>

                    {/* Connectors below */}
                    <div className="flex gap-4 px-4 justify-center">
                      {yearHitos
                        .filter((_, i) => i % 2 === 1)
                        .map((_, i) => (
                          <div key={`conn-below-${i}`} className="w-[248px] flex justify-center">
                            <div className="w-0.5 h-6 bg-gradient-to-t from-gray-600 to-gray-700" />
                          </div>
                        ))}
                    </div>

                    {/* Cards below the line (odd hitos) */}
                    <div className="flex gap-4 mt-4 px-4 min-h-[200px] items-start">
                      {yearHitos
                        .filter((_, i) => i % 2 === 1)
                        .map((hito, i) => (
                          <HitoCard key={`${year}-below-${i}`} hito={hito} position="below" />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical stacked timeline */}
      <div className="md:hidden px-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-green via-accent-blue to-accent-gold opacity-40" />

          {years.map((year) => (
            <div key={year} className="relative mb-8">
              {/* Year marker */}
              <div className="relative flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-bg border-2 border-accent-green flex items-center justify-center z-10 shadow-lg shadow-accent-green/20">
                  <span className="text-xs font-bold text-accent-green">{year}</span>
                </div>
                <div className="ml-4 h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
              </div>

              {/* Cards */}
              <div className="ml-16 space-y-4">
                {grouped[year].map((hito, i) => (
                  <HitoCard key={`mobile-${year}-${i}`} hito={hito} position="mobile" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HitoCard({ hito, position }: { hito: Hito; position: 'above' | 'below' | 'mobile' }) {
  const isHighlighted = hito.highlight;
  const cardWidth = position === 'mobile' ? 'w-full' : 'w-[248px]';

  return (
    <div
      className={`${cardWidth} bg-bg-secondary border rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex-shrink-0 ${
        isHighlighted
          ? 'border-accent-gold/50 animate-glow'
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {/* Image header */}
      {hito.image && hito.image.length > 0 && (
        <div className="relative w-full h-32 bg-bg">
          <Image
            src={hito.image}
            alt={hito.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        {/* Emoji */}
        <div className="text-3xl mb-2">{hito.emoji}</div>

        {/* Title */}
        <h3 className="font-bold text-text text-sm leading-tight mb-2">
          {hito.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-xs leading-relaxed mb-3">
          {hito.desc}
        </p>

        {/* Footer: type tag + link */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${getTypeClasses(hito.type)}`}
          >
            {hito.type}
          </span>

          {hito.url && hito.url.length > 0 && (
            <a
              href={hito.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-green text-xs font-medium hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              Ver más
              <span className="text-[10px]">&rarr;</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

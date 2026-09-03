'use client';

import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

type Quote = { text: string; category: string };

// Fuente única de frases: data/quotes.json
// Para agregar una: edita ese archivo (ver _meta.howTo).
const quotes: Quote[] = (quotesData as { quotes: Quote[] }).quotes;

export default function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!quotes || quotes.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 400);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  if (!quotes || quotes.length === 0) return null;

  const q = quotes[index];

  return (
    <div className="min-h-[7.5rem] sm:min-h-[6.5rem] md:min-h-[5.5rem] flex flex-col items-start justify-center">
      <p
        className={`text-accent-gold italic text-base md:text-lg leading-snug transition-opacity duration-400 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        &ldquo;{q.text}&rdquo;
      </p>
      <span
        className={`mt-1 text-[11px] uppercase tracking-widest text-text-muted/70 transition-opacity duration-400 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {q.category}
      </span>
    </div>
  );
}

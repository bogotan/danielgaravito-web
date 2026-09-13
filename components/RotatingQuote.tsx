'use client';

import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

type Quote = { text: string; category: string };

// Fuente única de frases: data/quotes.json
// Para agregar una: edita ese archivo (ver _meta.howTo).
const quotes: Quote[] = (quotesData as { quotes: Quote[] }).quotes;

export default function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  if (!quotes || quotes.length === 0) return null;

  // Las frases van de 51 a 187 caracteres. Si solo se renderiza la visible, la
  // caja se encoge y se estira en cada cambio: medido, saltaba 96 px de ancho y
  // 17 de alto. Aquí se apilan TODAS en la misma celda de la rejilla, así que el
  // contenedor siempre mide lo que mide la más larga y no se mueve nunca.
  // items-center: la caja mide lo de la frase más larga, así que una frase corta
  // se centra en ese alto en vez de dejar todo el hueco debajo.
  // El fundido va en dos tiempos (la que sale, 300 ms; la que entra, 300 ms de
  // retraso) para que nunca se vean dos frases superpuestas.
  return (
    <div className="grid items-center max-w-2xl">
      {quotes.map((q, i) => {
        const activa = i === index;
        return (
          <div
            key={q.text}
            aria-hidden={!activa}
            className={`col-start-1 row-start-1 transition-opacity duration-300 ease-out ${
              activa ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="text-accent-gold italic text-base md:text-lg leading-snug">
              &ldquo;{q.text}&rdquo;
            </p>
            <span className="mt-1 block text-[11px] uppercase tracking-widest text-text-muted/70">
              {q.category}
            </span>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

const quotes = [
  '"Si no hay internet, hay llamadas."',
  '"Los datos son el nuevo petróleo del sector público."',
  '"Innovar no es lujo, es supervivencia."',
  '"Un jaguar en tierra de elefantes."',
  '"La desigualdad no se resuelve con más de lo mismo."',
];

export default function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 flex items-center">
      <p
        className={`text-accent-gold italic text-lg transition-opacity duration-400 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {quotes[index]}
      </p>
    </div>
  );
}

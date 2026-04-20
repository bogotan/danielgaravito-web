'use client';

import { useState } from 'react';

interface LeadFormProps {
  source?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function LeadForm({
  source = 'website',
  title = 'Sé el primero en enterarte',
  subtitle = 'Déjame tu email y te aviso cuando salga el libro, nuevos proyectos y contenido exclusivo.',
  compact = false,
}: LeadFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || '¡Registro exitoso!');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al registrar');
      }
    } catch {
      setStatus('error');
      setMessage('Error de conexión. Intenta de nuevo.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${compact ? 'p-4' : 'p-6'} bg-accent-green/10 border border-accent-green/30 rounded-xl text-center`}>
        <div className="text-3xl mb-2">🎉</div>
        <p className="text-accent-green font-semibold">{message}</p>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'bg-bg-secondary border border-gray-800 rounded-xl p-6'}>
      {!compact && (
        <>
          <h3 className="text-lg font-bold text-text mb-1">{title}</h3>
          <p className="text-text-muted text-sm mb-4">{subtitle}</p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {!compact && (
          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm"
          />
        )}

        <div className={compact ? 'flex gap-2' : ''}>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`${compact ? 'flex-1' : 'w-full'} px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`${compact ? '' : 'w-full mt-3'} btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registrando...
              </span>
            ) : compact ? (
              'Unirme'
            ) : (
              'Quiero estar al tanto'
            )}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-1">{message}</p>
        )}
      </form>
    </div>
  );
}

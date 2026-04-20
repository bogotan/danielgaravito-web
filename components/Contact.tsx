'use client';

import { useState } from 'react';
import LeadForm from './LeadForm';

const speakerTopics = [
  { emoji: '🏥', topic: 'IA en salud pública' },
  { emoji: '🏛️', topic: 'Innovación pública' },
  { emoji: '📊', topic: 'Datos para política pública' },
  { emoji: '🚀', topic: 'Emprendimiento social' },
  { emoji: '⚖️', topic: 'Desigualdad y brechas sociales' },
  { emoji: '💰', topic: 'Economía de la salud' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/danielgaravito/', icon: '💼' },
  { name: 'YouTube', href: 'https://www.youtube.com/@danielgaravito', icon: '🎥' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@danielgaravito', icon: '🎵' },
  { name: 'Instagram', href: 'https://www.instagram.com/danielgaravito/', icon: '📸' },
  { name: 'Email', href: 'mailto:bogotan@gmail.com', icon: '📧' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    topic: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResponseMsg(data.message);
        setFormData({ name: '', email: '', message: '', topic: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error);
      }
    } catch {
      setStatus('error');
      setResponseMsg('Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <section id="contacto" className="section-container">
      <h2 className="section-title">
        <span className="gradient-text">Contacto</span>
      </h2>
      <p className="text-text-muted text-lg mb-10 max-w-2xl">
        Hablemos sobre datos, innovación, salud pública o cómo podemos colaborar.
      </p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="space-y-8">
          {/* Speaker topics */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">
              Temas para charlas y conferencias
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {speakerTopics.map(({ emoji, topic }) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-gray-800"
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm text-text-muted">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-lg font-bold text-text mb-4">Encuéntrame en</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-gray-800 rounded-lg hover:border-accent-green transition-colors text-sm text-text-muted hover:text-text"
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Book waitlist */}
          <div>
            <h3 className="text-lg font-bold text-text mb-2">
              Lista de espera del libro
            </h3>
            <p className="text-text-muted text-sm mb-4">
              Sé el primero en leer &quot;Un Jaguar en Tierra de Elefantes&quot;.
            </p>
            <LeadForm
              source="book-waitlist"
              title="Reserva tu copia"
              subtitle="Te avisamos en cuanto esté disponible."
            />
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="bg-bg-secondary border border-gray-800 rounded-xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-text mb-6">Envíame un mensaje</h3>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-accent-green font-semibold text-lg">{responseMsg}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-text-muted text-sm hover:text-text underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-1">Tema</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text focus:outline-none focus:border-accent-green transition-colors text-sm"
                >
                  <option value="">Selecciona un tema (opcional)</option>
                  <option value="charla">Invitación a charla</option>
                  <option value="colaboracion">Colaboración</option>
                  <option value="consultoria">Consultoría</option>
                  <option value="prensa">Prensa / Medios</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-1">Mensaje *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm resize-none"
                  placeholder="Escríbeme tu mensaje..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{responseMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary justify-center disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar mensaje'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

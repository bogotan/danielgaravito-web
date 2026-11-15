'use client';

import { useState } from 'react';
import LeadForm from './LeadForm';

const speakerTopics = [
  { topic: 'IA en salud pública' },
  { topic: 'Innovación pública' },
  { topic: 'Datos para política pública' },
  { topic: 'Emprendimiento social' },
  { topic: 'Desigualdad y brechas sociales' },
  { topic: 'Economía de la salud' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-alfonso-garavito-jim%C3%A9nez/', status: 'active' },
  { name: 'WhatsApp', href: 'https://wa.me/573166149797?text=Hola%20Daniel%2C%20vengo%20de%20danielgaravito.co', status: 'active' },
  { name: 'X', href: 'https://x.com/danielgaravitoco', status: 'pending' },
  { name: 'Bluesky', href: 'https://bsky.app/profile/danielgaravito.co', status: 'pending' },
  { name: 'Instagram', href: 'https://instagram.com/danielgaravito.co', status: 'pending' },
  { name: 'YouTube', href: 'https://youtube.com/@danielgaravito', status: 'active' },
  { name: 'TikTok', href: 'https://tiktok.com/@danielgaravito', status: 'active' },
  { name: 'Email', href: 'mailto:dagaravitoj@gmail.com', status: 'active' },
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
      <p className="text-text-muted text-lg mb-6 max-w-2xl">
        Si tienes un evento, un medio, una investigación o una clase donde mi
        perspectiva pueda aportar, escríbeme — respondo en menos de 48 horas.
        Si lo que buscas es contratar consultoría o formación, eso se hace
        desde Sinergística.
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-green text-white text-sm font-medium hover:bg-opacity-90 transition-all"
        >
          Invítame a hablar
          <span>→</span>
        </a>
        <a
          href="mailto:dagaravitoj@gmail.com?subject=Prensa%20%7C%20Daniel%20Garavito"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-rule text-text text-sm font-medium hover:border-accent-blue transition-all"
        >
          Soy prensa
          <span>→</span>
        </a>
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-rule text-text text-sm font-medium hover:border-accent-gold transition-all"
        >
          Investigación / docencia
          <span>→</span>
        </a>
        <a
          href="https://sinergistica.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-accent-blue/40 text-accent-blue text-sm font-medium hover:border-accent-blue transition-all"
        >
          Contratar consultoría
          <span>↗</span>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="space-y-8">
          {/* Speaker topics */}
          <div>
            <h3 className="font-serif text-xl text-text mb-4">
              Temas para charlas y conferencias
            </h3>
            {/* Seis emoji en seis cajas. Los temas se leen mejor como lo que
                son: una lista. */}
            <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-rule">
              {speakerTopics.map(({ topic }) => (
                <li
                  key={topic}
                  className="py-3 border-b border-rule text-sm text-text-muted"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="font-serif text-xl text-text mb-4">Encu&eacute;ntrame en</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer me"
                  className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-rule rounded-lg hover:border-accent-green transition-colors text-sm text-text-muted hover:text-text"
                  title={link.status === 'pending' ? 'Perfil en creación' : undefined}
                >
                  <span>{link.name}</span>
                  {link.status === 'pending' && (
                    <span className="text-[9px] font-semibold text-accent-green uppercase tracking-wider">pronto</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative rounded-lg overflow-hidden border border-rule bg-bg-secondary p-5">
            <div className="flex items-start gap-3 mb-3">
              <div>
                <h3 className="font-serif text-xl text-text">
                  Newsletter · Salud, Datos y algo más
                </h3>
                <p className="text-text-muted text-sm mt-1">
                  Una vez al mes: reflexiones sobre el sistema de salud colombiano,
                  datos que uso, y lo que aprendí en el camino. Sin spam, fácil de salir.
                </p>
              </div>
            </div>
            <LeadForm
              source="newsletter"
              title=""
              subtitle=""
            />
            <p className="text-[11px] text-text-muted mt-2">
              También incluye avisos del libro <em>&quot;Un Jaguar en Tierra de Elefantes&quot;</em> cuando esté listo.
            </p>
          </div>
        </div>

        {/* Right: Contact form */}
        <div id="contact-form" className="bg-bg-secondary border border-rule rounded-xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="font-serif text-xl text-text mb-2">&iquest;Sobre qu&eacute; hablamos?</h3>
            <p className="text-text-muted text-sm">
              Charla o conferencia &middot; Consultor&iacute;a &middot; Prensa &middot; Investigaci&oacute;n o tesis
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-12">
              <p className="font-serif text-2xl text-accent-green">{responseMsg}</p>
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
                  className="w-full px-4 py-3 bg-bg border border-rule rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm"
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
                  className="w-full px-4 py-3 bg-bg border border-rule rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-1">Tema</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-rule rounded-lg text-text focus:outline-none focus:border-accent-green transition-colors text-sm"
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
                  className="w-full px-4 py-3 bg-bg border border-rule rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors text-sm resize-none"
                  placeholder="Escríbeme tu mensaje..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-700 text-sm">{responseMsg}</p>
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

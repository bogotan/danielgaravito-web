'use client';

import { useState } from 'react';

const videos = [
  {
    title: 'TEDxCali — El poder de los datos para transformar la salud',
    url: 'https://www.youtube.com/watch?v=o8WKbHBldPE',
    embedId: 'o8WKbHBldPE',
    event: 'TEDxCali',
    year: 2022,
  },
  {
    title: 'HIMSS Executive Summit — IA y Salud en Latinoamérica',
    url: 'https://www.youtube.com/watch?v=CFR88Nz2fvs',
    embedId: 'CFR88Nz2fvs',
    event: 'HIMSS 2024',
    year: 2024,
  },
  {
    title: 'Falling Walls Lab — Winner: Breaking the Wall of Health Inequality',
    url: 'https://www.youtube.com/watch?v=fUZnzeUnz5E',
    embedId: 'fUZnzeUnz5E',
    event: 'Falling Walls Berlin',
    year: 2021,
  },
  {
    title: 'EducALL — Celebremos Colombia',
    url: 'https://www.youtube.com/watch?v=DvQ3e2IsyB8',
    embedId: 'DvQ3e2IsyB8',
    event: 'EducALL',
    year: 2023,
  },
];

const publications = [
  {
    title: 'Ni los dados ni los datos tienen ideología',
    type: 'Artículo',
    platform: 'LinkedIn',
    description: 'Reflexión sobre la neutralidad de los datos y su papel en la política pública de salud.',
  },
  {
    title: 'La paradoja del facilismo',
    type: 'Artículo',
    platform: 'LinkedIn',
    description: 'Análisis sobre cómo la búsqueda de lo fácil en la gestión pública termina generando complejidad.',
  },
  {
    title: 'RecOn Colombia — EducALL',
    type: 'Ensayo',
    platform: 'MIT Solve',
    description: 'Documentación del modelo EducALL como solución a la desigualdad educativa en Colombia.',
  },
];

const awards = [
  { title: 'EY Emprendedor Social del Año', year: 2023, org: 'Ernst & Young Colombia' },
  { title: 'HIMSS Latin America Award', year: 2024, org: 'HIMSS' },
  { title: 'Falling Walls Lab Winner', year: 2021, org: 'Falling Walls Foundation, Berlin' },
  { title: 'MIT Solve Finalist', year: 2022, org: 'Massachusetts Institute of Technology' },
];

const mediaMentions = [
  { outlet: 'Revista Semana', topic: 'Innovación social en Colombia' },
  { outlet: 'Blu Radio', topic: 'EducALL y educación inclusiva' },
  { outlet: 'El Espectador', topic: 'Jóvenes líderes colombianos' },
];

type Tab = 'videos' | 'publicaciones' | 'reconocimientos';

export default function Media() {
  const [activeTab, setActiveTab] = useState<Tab>('videos');
  const [activeVideo, setActiveVideo] = useState(0);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'videos', label: 'Charlas', icon: '🎬' },
    { id: 'publicaciones', label: 'Publicaciones', icon: '📝' },
    { id: 'reconocimientos', label: 'Reconocimientos', icon: '🏆' },
  ];

  return (
    <section id="media" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-title">
          <span className="gradient-text">En Acción</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Charlas, publicaciones y reconocimientos que documentan el camino.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-accent-green text-white shadow-lg shadow-accent-green/20'
                : 'bg-bg-secondary text-text-muted hover:text-text hover:bg-bg-secondary/80 border border-gray-800'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="animate-fade-in">
          {/* Featured Video */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-bg-secondary border border-gray-800">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videos[activeVideo].embedId}`}
                title={videos[activeVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-text">{videos[activeVideo].title}</h3>
              <p className="text-text-muted text-sm mt-1">
                {videos[activeVideo].event} &middot; {videos[activeVideo].year}
              </p>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <button
                key={video.embedId}
                onClick={() => setActiveVideo(index)}
                className={`group relative rounded-lg overflow-hidden border transition-all duration-300 ${
                  activeVideo === index
                    ? 'border-accent-blue shadow-lg shadow-accent-blue/20 ring-2 ring-accent-blue/30'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    activeVideo === index ? 'bg-accent-blue' : 'bg-white/80'
                  }`}>
                    <svg className={`w-4 h-4 ml-0.5 ${activeVideo === index ? 'text-white' : 'text-gray-900'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-2 bg-bg-secondary">
                  <p className="text-xs text-text-muted truncate">{video.event} &middot; {video.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Publications Tab */}
      {activeTab === 'publicaciones' && (
        <div className="animate-fade-in max-w-3xl mx-auto space-y-4">
          {publications.map((pub, index) => (
            <div key={index} className="card group hover:border-accent-blue/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent-blue text-sm font-bold">
                    {pub.type === 'Artículo' ? '📄' : '📋'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent-blue transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">{pub.description}</p>
                  <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-bg border border-gray-800 text-text-muted">
                    {pub.platform} &middot; {pub.type}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Media Mentions */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-text mb-4">Mencionado en</h3>
            <div className="flex flex-wrap gap-3">
              {mediaMentions.map((mention, index) => (
                <div
                  key={index}
                  className="px-4 py-2.5 rounded-lg bg-bg-secondary border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <p className="text-sm font-medium text-text">{mention.outlet}</p>
                  <p className="text-xs text-text-muted">{mention.topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Awards Tab */}
      {activeTab === 'reconocimientos' && (
        <div className="animate-fade-in max-w-3xl mx-auto">
          <div className="space-y-4">
            {awards.map((award, index) => (
              <div key={index} className="card group hover:border-accent-gold/30 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent-gold transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-text-muted text-sm">{award.org} &middot; {award.year}</p>
                </div>
                <span className="text-2xl font-bold text-accent-gold/30">{award.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

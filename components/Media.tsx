'use client';

import { useState } from 'react';

const charlas = [
  {
    title: 'Un startupero en tierra de elefantes: cómo sanar la salud desde adentro',
    url: 'https://www.youtube.com/watch?v=o8WKbHBldPE',
    embedId: 'o8WKbHBldPE',
    event: 'TEDxCali',
    year: 2025,
    tag: 'TEDx',
  },
  {
    title: 'Sala de Inteligencia ADRES — analítica para sanar el sistema de salud',
    url: 'https://www.youtube.com/watch?v=7LBM8KckIWU',
    embedId: '7LBM8KckIWU',
    event: 'ADRES · Sala de Inteligencia',
    year: 2025,
    tag: 'Institucional',
  },
  {
    title: 'Panel: Impacto de los Datos en la ciudadanía y los servicios de Gobierno',
    url: 'https://youtu.be/fXck4BW_D8U?t=28668',
    embedId: 'fXck4BW_D8U',
    startSeconds: 28668,
    event: 'DAMA Week 2025 Colombia · 2da Edición Internacional',
    year: 2025,
    tag: 'Panel',
    withWho: 'con Mauricio Toro y Hernán Ríos',
  },
  {
    title: 'Charla magistral: De la teoría a la realidad — el gobierno de datos como condición indispensable para la transformación, transparencia y eficiencia en salud',
    url: 'https://youtu.be/fXck4BW_D8U?t=31749',
    embedId: 'fXck4BW_D8U',
    startSeconds: 31749,
    event: 'DAMA Week 2025 Colombia',
    year: 2025,
    tag: 'Keynote',
    withWho: 'con Diana Chipatecua (PM Gobierno de Datos ADRES)',
  },
  {
    title: 'Grupo de Innovación y Analítica de Datos de #ADRES',
    url: 'https://www.youtube.com/watch?v=CFR88Nz2fvs',
    embedId: 'CFR88Nz2fvs',
    event: 'ADRES',
    year: 2025,
    tag: 'Institucional',
  },
  {
    title: 'Falling Walls Lab Pitch — Breaking the Wall of Access to Education',
    url: 'https://youtu.be/voCUPo6NcBY',
    embedId: 'voCUPo6NcBY',
    event: 'Falling Walls · EducALL',
    year: 2023,
    tag: 'Pitch',
  },
  {
    title: 'GAME CHANGERS FEST - Salta, ya aparecerá el piso',
    url: 'https://youtu.be/m2ORtx-tNSs',
    embedId: 'm2ORtx-tNSs',
    event: 'Game Changers Fest · EducALL',
    year: 2023,
    tag: 'Charla',
  },
  {
    title: 'Noticias Caracol — EducALL',
    url: 'https://youtu.be/76j0KX0dsIE?t=84',
    embedId: '76j0KX0dsIE',
    startSeconds: 84,
    event: 'Caracol Televisión',
    year: 2022,
    tag: 'Prensa',
  },
  {
    title: 'Final Copa Mundial de Emprendimiento Colombia — pitch',
    url: 'https://youtu.be/YGf5wNnMaKI?t=5086',
    embedId: 'YGf5wNnMaKI',
    startSeconds: 5086,
    event: 'iNNpulsa · Campus Party · Areandina',
    year: 2021,
    tag: 'Pitch',
  },
  {
    title: 'Falling Walls Lab — Winner Colombia/Perú/Venezuela/Ecuador',
    url: 'https://www.youtube.com/watch?v=fUZnzeUnz5E',
    embedId: 'fUZnzeUnz5E',
    event: 'Falling Walls Foundation',
    year: 2021,
    tag: 'Pitch',
  },
];

type Podcast = {
  title: string;
  url: string;
  embedId: string;
  startSeconds?: number;
  show: string;
  year?: number;
  dateLabel?: string;
  guest?: string;
  guestRole?: string;
  grupo: 'salud' | 'otros';
};

// Ciclo de Conversatorios ADRES. Invitados y fechas tomados de la pieza
// gráfica de cada sesión; las tres últimas no anuncian invitado en su pieza.
const podcastsSalud: Podcast[] = [
  {
    title: 'Sostenibilidad basada en evidencia',
    url: 'https://www.youtube.com/watch?v=h8FLzaRRBHI',
    embedId: 'h8FLzaRRBHI',
    show: '#ConversatoriosADRES · Sesión 1',
    dateLabel: '24 abr 2026',
    guest: 'Gustavo Mery',
    guestRole: 'Asesor de Sistemas y Servicios de Salud, OPS',
    grupo: 'salud',
  },
  {
    title: 'Redefiniendo el vínculo entre la ADRES y las IPS',
    url: 'https://www.youtube.com/watch?v=ri5BV0UXyq4',
    embedId: 'ri5BV0UXyq4',
    show: '#ConversatoriosADRES · Sesión 2',
    dateLabel: '6 may 2026',
    guest: 'Jorge Toro',
    guestRole: 'Director ejecutivo, Unión de IPS de Colombia (UNIPS)',
    grupo: 'salud',
  },
  {
    title: 'Cómo la tecnología permite medir la generación de valor',
    url: 'https://www.youtube.com/watch?v=jI1ri51yACE',
    embedId: 'jI1ri51yACE',
    show: '#ConversatoriosADRES · Sesión 3',
    dateLabel: '29 may 2026',
    guest: 'Walberto Buelvas Argumedo',
    guestRole: 'Director de Gestión Clínica e Innovación, MediSinú IPS',
    grupo: 'salud',
  },
  {
    title: 'Interoperabilidad: el costo de que los datos en salud no dialoguen',
    url: 'https://www.youtube.com/watch?v=EjRUysxsXuo',
    embedId: 'EjRUysxsXuo',
    show: '#ConversatoriosADRES · Sesión 4',
    dateLabel: '24 jun 2026',
    guest: 'Mario Cortés',
    guestRole: 'Presidente, HL7 Colombia',
    grupo: 'salud',
  },
  {
    title: 'ADRES en las Regiones — Pereira',
    url: 'https://www.youtube.com/watch?v=XUXtZmOMZrY',
    embedId: 'XUXtZmOMZrY',
    show: 'ADRES en las Regiones',
    dateLabel: '5 jun 2026',
    guest: 'Félix León Martínez',
    guestRole: 'Director general de la ADRES, con IPS, EPS y secretarías de salud del Eje Cafetero y Valle',
    grupo: 'salud',
  },
  {
    title: 'Ética, confiabilidad y responsabilidad en el uso de IA',
    url: 'https://www.youtube.com/watch?v=_afEdjVAghc',
    embedId: '_afEdjVAghc',
    show: '#ConversatoriosADRES',
    guest: 'Nathalia Ortega',
    grupo: 'salud',
  },
  {
    title: 'Anticipar para prevenir: IA para un sistema de salud predictivo y resolutivo',
    url: 'https://www.youtube.com/watch?v=qG6zP3zGRY8',
    embedId: 'qG6zP3zGRY8',
    show: '#ConversatoriosADRES',
    guest: 'Dr. Luis Pino',
    grupo: 'salud',
  },
  {
    title: 'Las condiciones crónicas y la generación de valor en salud',
    url: 'https://www.youtube.com/watch?v=zDyf4mEWEgo',
    embedId: 'zDyf4mEWEgo',
    show: '#ConversatoriosADRES',
    guest: 'Fabian Cardona',
    grupo: 'salud',
  },
];

// Entrevistas y podcasts de EducALL, emprendimiento y trayectoria personal.
const podcastsOtros: Podcast[] = [
  {
    title: 'Innovar es conectar lo que está lejos: cómo Daniel Garavito busca sanar a Colombia con tecnología',
    url: 'https://youtu.be/qppgYHlYfMQ',
    embedId: 'qppgYHlYfMQ',
    show: 'Superlatinos',
    year: 2025,
    grupo: 'otros',
  },
  {
    title: 'Efecto Colibrí - EducALL y educación inclusiva',
    url: 'https://www.youtube.com/watch?v=BwVwX945rnA',
    embedId: 'BwVwX945rnA',
    startSeconds: 265,
    show: 'Efecto Colibrí',
    year: 2023,
    grupo: 'otros',
  },
  {
    title: 'La voz que me cambió la vida — taller Campus Party Colombia',
    url: 'https://youtu.be/4uJZUSno10A',
    embedId: '4uJZUSno10A',
    show: 'Campus Party Colombia',
    year: 2021,
    grupo: 'otros',
  },
  {
    title: 'Celebremos Colombia — EducALL',
    url: 'https://www.youtube.com/watch?v=DvQ3e2IsyB8',
    embedId: 'DvQ3e2IsyB8',
    show: 'EducALL',
    year: 2023,
    grupo: 'otros',
  },
];

const podcasts: Podcast[] = [...podcastsSalud, ...podcastsOtros];

type Columna = {
  title: string;
  url: string;
  image: string;
  dateLabel: string;
  date: string;
  summary: string;
};

// Columnas publicadas en CONSULTORSALUD. Las imágenes son las portadas del
// propio medio y enlazan a su publicación original.
const columnas: Columna[] = [
  {
    title: 'Siete pilares, un cuatrienio y una vara común',
    url: 'https://consultorsalud.com/siete-pilares-un-cuatrienio-y-una-vara-comun/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/08/Portada-Juan-Manuel-8.png',
    dateLabel: '10 ago 2026',
    date: '2026-08-10',
    summary: 'Si la salud ha sido una inversión durante tres décadas, ¿dónde está el retorno? El BID lo cifra: hasta 4,5 años de vida sobre la mesa.',
  },
  {
    title: 'El precio que nunca envejece: por qué la tecnología médica madura se sigue pagando como si fuera nueva',
    url: 'https://consultorsalud.com/precio-que-nunca-envejece-tecnologia/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/07/El-precio-que-nunca-envejece-por-que-la-tecnologia-medica-madura-se-sigue-pagando-como-si-fuera-nueva-2.jpg',
    dateLabel: '21 jul 2026',
    date: '2026-07-21',
    summary: 'Subir un precio regulado es un trámite; bajarlo, un problema técnico y político. La curva de aprendizaje de 1936 aplicada a un tarifario que solo sabe multiplicar.',
  },
  {
    title: '¿De quién es la culpa de la crisis del sistema de salud? Por qué es la pregunta equivocada',
    url: 'https://consultorsalud.com/culpa-crisis-del-sistema-de-salud/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/07/De-quien-es-la-culpa-de-la-crisis-del-sistema-de-salud.jpg',
    dateLabel: '2 jul 2026',
    date: '2026-07-02',
    summary: 'El sistema no se diagnostica con indicadores subrogados. Buscar culpables reemplaza el método que dice cómo está, a dónde debe llegar y cómo llevarlo allí.',
  },
  {
    title: 'De la opacidad a la transparencia: por qué la interoperabilidad es la mejor inversión que el sistema de salud puede hacer en sí mismo',
    url: 'https://consultorsalud.com/opacidad-transparencia-interoperabilidad-salud/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/06/De-la-opacidad-a-la-transparencia-por-que-la-interoperabilidad-es-la-mejor-inversion-que-el-sistema-de-salud-puede-hacer-en-si-mismo-1.jpg',
    dateLabel: '22 jun 2026',
    date: '2026-06-22',
    summary: 'Un sistema que no puede verse a sí mismo no puede corregirse. La interoperabilidad no es un proyecto de tecnología: es la condición para saber qué está pasando.',
  },
  {
    title: 'La crisis que siempre vuelve: anatomía de una regularidad',
    url: 'https://consultorsalud.com/la-crisis-que-siempre-vuelve-anatomia-de-una-regularidad/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/06/La-crisis-que-siempre-vuelve-anatomia-de-una-regularidad-1.jpg',
    dateLabel: '18 jun 2026',
    date: '2026-06-18',
    summary: 'El Seguro Social en los 2000, los recobros en 2009, la intervención de 2011. La crisis no es un accidente que se repite: es una regularidad con anatomía propia.',
  },
  {
    title: 'La trampa de la intervención: por qué cambiar la cúpula no cambia la organización',
    url: 'https://consultorsalud.com/ntervenciones-supersalud-eps-fracasar/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/04/Por-que-las-intervenciones-de-la-Supersalud-a-las-EPS-estan-destinadas-a-fracasar-una-lectura-desde-la-Teoria-de-las-Organizaciones.jpg',
    dateLabel: '30 abr 2026',
    date: '2026-04-30',
    summary: 'Il Gattopardo leído desde la teoría de las organizaciones: cambiar a los de arriba sin tocar los planos profundos donde se decide no transforma nada.',
  },
  {
    title: 'La IA dejó de vivir en la nube',
    url: 'https://consultorsalud.com/la-ia-dejo-de-vivir-en-la-nube/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/04/La-IA-dejo-de-vivir-en-la-nube.jpg',
    dateLabel: '27 abr 2026',
    date: '2026-04-27',
    summary: 'La inteligencia artificial local y de código abierto ya existe. Lo urgente es aplicarla a problemas reales latinoamericanos, no esperar la que viene.',
  },
  {
    title: 'La paradoja del facilismo en la política pública de salud',
    url: 'https://consultorsalud.com/paradoja-del-facilismo-politica-publica-salud/',
    image: 'https://consultorsalud.com/wp-content/uploads/2026/04/La-paradoja-del-facilismo-en-la-politica-publica-de-salud.jpg',
    dateLabel: '22 abr 2026',
    date: '2026-04-22',
    summary: 'Cuando el sistema cruje, la respuesta automática es subir la UPC. Pedir más recursos no está mal: es insuficiente, y desvía del fondo.',
  },
];

const otrasPublicaciones = [
  {
    title: 'Ni los dados ni los datos tienen ideología',
    type: 'Artículo',
    platform: 'LinkedIn',
    description: 'Reflexión sobre la neutralidad de los datos y su papel en la política pública de salud.',
  },
  {
    title: 'Reducción de dimensionalidad bayesiana vía AFE con priors spike-slab',
    type: 'Ponencia',
    platform: 'Bayes Plurinacional 2025 · U. Externado',
    description: 'Aplicación de métodos bayesianos a problemas de alta dimensionalidad.',
  },
  {
    title: 'RecOn Colombia — EducALL',
    type: 'Ensayo',
    platform: 'MIT Solve',
    description: 'Documentación del modelo EducALL como solución a la desigualdad educativa en Colombia.',
  },
];

type Award = {
  title: string;
  year: number;
  org: string;
  photo?: string;
  hero?: boolean;
};

const awards: Award[] = [
  {
    title: '1er Lugar Falling Walls Lab - Colombia, Perú, Venezuela, Ecuador',
    year: 2021,
    org: 'Falling Walls Foundation',
    photo: '/premios/falling-walls-2021.svg',
    hero: true,
  },
  {
    title: 'Emprendedor Social del Año',
    year: 2023,
    org: 'EY Colombia',
    photo: '/premios/ey-emprendedor-social-2023.svg',
  },
  {
    title: 'Finalista eAwards',
    year: 2023,
    org: 'NTT DATA Foundation',
    photo: '/premios/eawards-ntt-data.svg',
  },
  {
    title: 'Campeones Copa de Emprendimiento',
    year: 2021,
    org: 'iNNpulsa Colombia',
  },
  {
    title: 'Top 100 Mundial — Entrepreneurship World Cup',
    year: 2021,
    org: 'Misk + partners globales',
  },
  {
    title: '2do Lugar SurSur Innova',
    year: 2021,
    org: 'Innova UTEM · AGCID (Chile)',
  },
  {
    title: 'MIT Solve — TPrize Finalist',
    year: 2021,
    org: 'Massachusetts Institute of Technology',
  },
  {
    title: 'Falling Walls Lab Finalist — Berlín',
    year: 2021,
    org: 'Falling Walls Foundation',
  },
];

const mediaMentions = [
  { outlet: 'Revista Semana', topic: 'Innovación social en Colombia' },
  { outlet: 'Blu Radio', topic: 'EducALL y educación inclusiva' },
  { outlet: 'El Espectador', topic: 'Jóvenes líderes colombianos' },
];

type Tab = 'charlas' | 'podcasts' | 'publicaciones' | 'reconocimientos';

function buildEmbedUrl(embedId: string, startSeconds?: number) {
  const base = `https://www.youtube.com/embed/${embedId}`;
  return startSeconds ? `${base}?start=${startSeconds}` : base;
}

export default function Media() {
  const [activeTab, setActiveTab] = useState<Tab>('charlas');
  const [activeCharla, setActiveCharla] = useState(0);
  const [activePodcast, setActivePodcast] = useState(0);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'charlas', label: 'Charlas', icon: '🎬' },
    { id: 'podcasts', label: 'Podcasts', icon: '🎙' },
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
          Charlas, podcasts, publicaciones y reconocimientos que documentan el camino.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
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

      {activeTab === 'charlas' && (
        <div className="animate-fade-in">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <p className="text-text-muted italic leading-relaxed">
              <span className="text-text font-semibold">“Lo que me han dejado decir en voz alta.”</span>
              <br />
              No me considero orador. Soy una persona a la que le gustan los datos y que, por una coincidencia bendita, terminó en escenarios que nunca soñó: TEDx, Falling Walls en Berlín, DAMA, Caracol. Si algo dije que te sirvió, úsalo. Si no, dímelo — también aprendo así.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-bg-secondary border border-gray-800">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={buildEmbedUrl(charlas[activeCharla].embedId, charlas[activeCharla].startSeconds)}
                title={charlas[activeCharla].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20 mb-2">
                {charlas[activeCharla].tag}
              </span>
              <h3 className="text-xl font-bold text-text">{charlas[activeCharla].title}</h3>
              <p className="text-text-muted text-sm mt-1">
                {charlas[activeCharla].event} - {charlas[activeCharla].year}
                {charlas[activeCharla].withWho && ` - ${charlas[activeCharla].withWho}`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {charlas.map((v, i) => (
              <button
                key={`${v.embedId}-${i}`}
                onClick={() => setActiveCharla(i)}
                className={`group relative rounded-lg overflow-hidden border transition-all duration-300 text-left ${
                  activeCharla === i
                    ? 'border-accent-blue shadow-lg shadow-accent-blue/20 ring-2 ring-accent-blue/30'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.embedId}/mqdefault.jpg`}
                  alt={v.title}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    activeCharla === i ? 'bg-accent-blue' : 'bg-white/80'
                  }`}>
                    <svg className={`w-4 h-4 ml-0.5 ${activeCharla === i ? 'text-white' : 'text-gray-900'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-2 bg-bg-secondary">
                  <p className="text-[11px] text-accent-blue font-semibold">{v.tag}</p>
                  <p className="text-xs text-text truncate font-medium">{v.event}</p>
                  <p className="text-[11px] text-text-muted">{v.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* El grid queda siempre en el DOM para que los conversatorios sean
          rastreables; el reproductor solo se monta al abrir la pestaña, para no
          cargar un iframe de YouTube en cada visita. */}
      <div hidden={activeTab !== 'podcasts'}>
        <div>
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <p className="text-text-muted italic leading-relaxed">
              <span className="text-text font-semibold">“Conversaciones largas, sin prisa.”</span>
              <br />
              El podcast es el formato donde mejor se piensa en voz alta — sin diapositivas, sin reloj corriendo. Aquí dejo las que me invitaron.
            </p>
          </div>

          {activeTab === 'podcasts' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-bg-secondary border border-gray-800">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={buildEmbedUrl(podcasts[activePodcast].embedId, podcasts[activePodcast].startSeconds)}
                title={podcasts[activePodcast].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20 mb-2">
                {podcasts[activePodcast].show}
              </span>
              <h3 className="text-xl font-bold text-text">{podcasts[activePodcast].title}</h3>
              {podcasts[activePodcast].guest && (
                <p className="text-text text-sm mt-2">
                  <span className="text-text-muted">Invitado: </span>
                  <span className="font-medium">{podcasts[activePodcast].guest}</span>
                  {podcasts[activePodcast].guestRole && (
                    <span className="text-text-muted"> — {podcasts[activePodcast].guestRole}</span>
                  )}
                </p>
              )}
              {(podcasts[activePodcast].dateLabel || podcasts[activePodcast].year) && (
                <p className="text-text-muted text-sm mt-1">
                  {podcasts[activePodcast].dateLabel || podcasts[activePodcast].year}
                </p>
              )}
            </div>
          </div>
          )}

          <div className="max-w-4xl mx-auto space-y-10">
            {[
              {
                key: 'salud',
                heading: 'Sector salud',
                blurb: 'Conversatorios sobre IA, interoperabilidad, sostenibilidad y valor en el sistema de salud.',
                items: podcastsSalud,
              },
              {
                key: 'otros',
                heading: 'EducALL y entrevistas',
                blurb: 'Emprendimiento social, educación sin internet y trayectoria.',
                items: podcastsOtros,
              },
            ].map((grupo) => (
              <div key={grupo.key}>
                <div className="mb-4 pb-3 border-b border-gray-800">
                  <h3 className="text-lg font-bold text-text">{grupo.heading}</h3>
                  <p className="text-text-muted text-sm mt-1">{grupo.blurb}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {grupo.items.map((p) => {
                    const i = podcasts.findIndex((x) => x.embedId === p.embedId);
                    return (
                      <button
                        key={p.embedId}
                        onClick={() => setActivePodcast(i)}
                        className={`group relative rounded-lg overflow-hidden border transition-all duration-300 text-left ${
                          activePodcast === i
                            ? 'border-accent-gold shadow-lg shadow-accent-gold/20 ring-2 ring-accent-gold/30'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${p.embedId}/mqdefault.jpg`}
                          alt={p.title}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                        />
                        <div className="p-3 bg-bg-secondary">
                          <p className="text-xs text-accent-gold font-semibold">{p.show}</p>
                          <p className="text-sm text-text font-medium line-clamp-2">{p.title}</p>
                          {p.guest && (
                            <p className="text-xs text-text mt-2">
                              <span className="text-text-muted">Invitado: </span>
                              {p.guest}
                            </p>
                          )}
                          {p.guestRole && (
                            <p className="text-[11px] text-text-muted leading-snug">{p.guestRole}</p>
                          )}
                          {(p.dateLabel || p.year) && (
                            <p className="text-xs text-text-muted mt-1">{p.dateLabel || p.year}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Siempre en el DOM (oculto cuando no está activo) para que las columnas
          sean rastreables por buscadores, no solo visibles tras un clic. */}
      <div hidden={activeTab !== 'publicaciones'} className="max-w-4xl mx-auto">
        <div className="mb-6 pb-3 border-b border-gray-800">
          <h3 className="text-lg font-bold text-text">Columnas en CONSULTORSALUD</h3>
          <p className="text-text-muted text-sm mt-1">
            Ocho columnas entre abril y agosto de 2026 sobre cómo se mide, se
            paga y se decide en el sistema de salud colombiano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {columnas.map((c) => (
            <a
              key={c.url}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg overflow-hidden border border-gray-800 hover:border-accent-blue/50 transition-colors bg-bg-secondary flex flex-col"
            >
              <img
                src={c.image}
                alt={`Portada de la columna «${c.title}» en CONSULTORSALUD`}
                className="w-full aspect-video object-cover bg-bg"
                loading="lazy"
              />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    CONSULTORSALUD
                  </span>
                  <time dateTime={c.date} className="text-xs text-text-muted">
                    {c.dateLabel}
                  </time>
                </div>
                <h4 className="text-sm font-semibold text-text leading-snug group-hover:text-accent-blue transition-colors">
                  {c.title}
                </h4>
                <p className="text-text-muted text-xs mt-2 leading-relaxed">{c.summary}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-text mb-4">Otras publicaciones</h3>
          <div className="space-y-3">
            {otrasPublicaciones.map((pub, index) => (
              <div key={index} className="card group hover:border-accent-blue/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-blue text-sm font-bold">
                      {pub.type === 'Artículo' ? '📄' : pub.type === 'Ponencia' ? '🎙' : '📋'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-text group-hover:text-accent-blue transition-colors">
                      {pub.title}
                    </h4>
                    <p className="text-text-muted text-sm mt-1">{pub.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-bg border border-gray-800 text-text-muted">
                      {pub.platform} · {pub.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800">
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

      {activeTab === 'reconocimientos' && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <p className="text-text-muted italic leading-relaxed">
              <span className="text-text font-semibold">“Trofeos que en realidad son recordatorios.”</span>
              <br />
              Los premios no me definen, pero me ayudan a no olvidar dos cosas: que el equipo de EducALL se partió el lomo, y que cada reconocimiento es un cheque de confianza que hay que honrar con trabajo. Los guardo no por ego — los guardo porque los días difíciles necesito recordar que valió la pena.
            </p>
          </div>

          {awards[0].photo && (
            <div className="mb-8 rounded-xl overflow-hidden border border-accent-gold/30 shadow-lg shadow-accent-gold/10">
              <img
                src={awards[0].photo}
                alt={awards[0].title}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="p-5 bg-bg-secondary">
                <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-1">Reconocimiento principal</p>
                <h3 className="text-2xl font-bold text-text">{awards[0].title}</h3>
                <p className="text-text-muted mt-1">{awards[0].org} - {awards[0].year}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {awards.filter((a) => a.photo && !a.hero).map((a, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-800 hover:border-accent-gold/40 transition-colors">
                <img src={a.photo} alt={a.title} className="w-full h-auto" loading="lazy" />
                <div className="p-4 bg-bg-secondary">
                  <h4 className="font-semibold text-text text-sm">{a.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{a.org} - {a.year}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="card group hover:border-accent-gold/30 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent-gold transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-text-muted text-sm">{award.org}</p>
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

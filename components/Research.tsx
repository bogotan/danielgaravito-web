import investigacionData from '@/data/investigacion.json';

type Hallazgo = { cifra: string; texto: string };

type Estudio = {
  slug: string;
  titulo: string;
  subtitulo: string;
  periodo: string;
  pregunta: string;
  corpus: string;
  hallazgos: Hallazgo[];
  implicacion: string;
  metodos: string[];
  repo: string;
  doi: string;
  articulo: string;
  reproducir: string;
  estado: string;
  estadoTipo: string;
  public?: boolean;
};

const estudios: Estudio[] = (
  investigacionData as { estudios: Estudio[] }
).estudios.filter((e) => e.public !== false);

// El color del estado dice en qué punto del camino está el estudio, no si es bueno.
const estadoClases: Record<string, string> = {
  publicado: 'bg-accent-green/10 text-accent-green border-accent-green/30',
  sometimiento: 'bg-accent-gold/10 text-accent-gold border-accent-gold/30',
  preparacion: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  curso: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  espera: 'bg-gray-500/10 text-text-muted border-gray-700',
};

function clasesEstado(tipo: string): string {
  return estadoClases[tipo] || estadoClases.espera;
}

const SITIO = 'https://www.danielgaravito.co';

function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': estudios.map((e) => ({
      '@type': 'Dataset',
      '@id': `${SITIO}/#investigacion-${e.slug}`,
      name: `${e.titulo} — ${e.subtitulo}`,
      description: e.pregunta,
      ...(e.periodo ? { temporalCoverage: e.periodo.replace('–', '/') } : {}),
      creator: { '@id': `${SITIO}/#daniel` },
      inLanguage: 'es-CO',
      isAccessibleForFree: true,
      keywords: e.metodos,
      ...(e.repo ? { codeRepository: e.repo, url: e.repo } : { url: `${SITIO}/#investigacion` }),
      ...(e.doi ? { identifier: e.doi } : {}),
    })),
  };
}

export default function Research() {
  if (estudios.length === 0) return null;

  return (
    <section id="investigacion" className="section-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <h2 className="section-title">
        <span className="gradient-text">Investigación</span>
      </h2>
      <p className="text-text-muted text-lg mb-10 max-w-3xl">
        Estudios propios sobre el sistema de salud colombiano, construidos solo
        con fuentes públicas. Cada uno declara su corpus, su método y su fecha de
        corte, y se puede reproducir contra su repositorio: si un resultado se
        reproduce desde fuentes públicas, no hay nada adentro que no pudiera
        estar.
      </p>

      <div className="space-y-8">
        {estudios.map((e) => (
          <article
            key={e.slug}
            className="card relative overflow-hidden transition-colors hover:border-accent-green/30"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-green opacity-60" />

            {/* Encabezado */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-text">
                  {e.titulo}
                </h3>
                <p className="text-accent-green text-sm font-medium mt-1">
                  {e.subtitulo}
                  {e.periodo && (
                    <span className="text-text-muted"> · {e.periodo}</span>
                  )}
                </p>
              </div>
              <span
                className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${clasesEstado(
                  e.estadoTipo
                )}`}
              >
                {e.estado}
              </span>
            </div>

            {/* La pregunta */}
            <p className="text-text leading-relaxed mb-5 max-w-3xl">
              {e.pregunta}
            </p>

            {/* Hallazgos */}
            {e.hallazgos.length > 0 && (
              <dl className="space-y-4 mb-5 border-l-2 border-gray-800 pl-5">
                {e.hallazgos.map((h) => (
                  <div key={h.cifra}>
                    <dt className="text-accent-gold font-bold text-sm tracking-wide">
                      {h.cifra}
                    </dt>
                    <dd className="text-text-muted text-sm leading-relaxed mt-1 max-w-3xl">
                      {h.texto}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {e.implicacion && (
              <p className="text-sm text-text-muted italic mb-5 max-w-3xl">
                <span className="not-italic font-semibold text-text">
                  Por qué importa:{' '}
                </span>
                {e.implicacion}
              </p>
            )}

            {/* Corpus */}
            {e.corpus && (
              <p className="text-xs text-text-muted mb-4">
                <span className="font-semibold uppercase tracking-wider">
                  Corpus ·{' '}
                </span>
                {e.corpus}
              </p>
            )}

            {/* Métodos */}
            <div className="flex flex-wrap gap-2 mb-5">
              {e.metodos.map((m) => (
                <span
                  key={m}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-bg border border-gray-700 text-text-muted"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Enlaces */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-800">
              {e.repo ? (
                <a
                  href={e.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-green hover:text-accent-gold transition-colors"
                >
                  Repositorio
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="text-sm text-text-muted">
                  Repositorio al publicar
                </span>
              )}

              {e.doi && (
                <a
                  href={e.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-gold transition-colors"
                >
                  DOI
                  <span aria-hidden>↗</span>
                </a>
              )}

              {e.articulo && (
                <a
                  href={e.articulo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-gold transition-colors"
                >
                  Artículo
                  <span aria-hidden>↗</span>
                </a>
              )}

              {e.reproducir && (
                <span className="text-xs text-text-muted">
                  Reproducir:{' '}
                  <code className="px-1.5 py-0.5 rounded bg-bg border border-gray-700 text-text">
                    {e.reproducir}
                  </code>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-text-muted max-w-3xl">
        Las reglas con que manejo estos trabajos —autoría, licencia, fuentes y
        relación comercial— están en{' '}
        <a href="/etica" className="text-accent-blue hover:underline">
          Independencia y manejo de información
        </a>
        .
      </p>
    </section>
  );
}

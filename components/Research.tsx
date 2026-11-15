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

/** Los enlaces de un estudio: iguales en la ficha abierta y en las filas. */
function Enlaces({ e }: { e: Estudio }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
      {e.repo ? (
        <a
          href={e.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[44px] text-sm text-accent-green hover:text-text transition-colors"
        >
          Repositorio
        </a>
      ) : (
        <span className="inline-flex items-center min-h-[44px] text-sm text-text-muted">
          Repositorio al publicar
        </span>
      )}

      {e.doi && (
        <a
          href={e.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[44px] text-sm text-accent-green hover:text-text transition-colors"
        >
          DOI
        </a>
      )}

      {e.articulo && (
        <a
          href={e.articulo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[44px] text-sm text-accent-green hover:text-text transition-colors"
        >
          Art&iacute;culo
        </a>
      )}

      {e.reproducir && (
        <span className="text-xs text-text-muted">
          Reproducir:{' '}
          <code className="px-1.5 py-0.5 rounded bg-bg border border-rule text-text">
            {e.reproducir}
          </code>
        </span>
      )}
    </div>
  );
}

/** El detalle: hallazgos, por qué importa, corpus y método. */
function Detalle({ e, desde }: { e: Estudio; desde: number }) {
  const hallazgos = e.hallazgos.slice(desde);
  return (
    <div className="pt-6">
      {hallazgos.length > 0 && (
        <dl className="space-y-5 mb-6">
          {hallazgos.map((h) => (
            <div key={h.cifra} className="sm:flex sm:gap-6">
              <dt className="font-serif text-xl text-accent-green sm:w-52 sm:flex-shrink-0 sm:text-right">
                {h.cifra}
              </dt>
              <dd className="text-sm leading-[1.75] text-text-muted max-w-[62ch] mt-1 sm:mt-0">
                {h.texto}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {e.implicacion && (
        <p className="text-sm leading-[1.75] text-text-muted mb-6 max-w-[68ch]">
          <span className="font-semibold text-text">Por qu&eacute; importa: </span>
          {e.implicacion}
        </p>
      )}

      {e.corpus && (
        <p className="text-xs leading-relaxed text-text-muted mb-3 max-w-[80ch]">
          <span className="font-semibold uppercase tracking-[0.14em]">Corpus &middot; </span>
          {e.corpus}
        </p>
      )}

      {/* Los métodos dejan de ser etiquetas con borde y pasan a ser lo que
          son: una lista, separada por puntos. Cinco cápsulas por tarjeta,
          por cinco tarjetas, eran veinticinco cajitas compitiendo con las
          cifras. */}
      {e.metodos.length > 0 && (
        <p className="text-xs leading-relaxed text-text-muted mb-6 max-w-[80ch]">
          <span className="font-semibold uppercase tracking-[0.14em]">M&eacute;todo &middot; </span>
          {e.metodos.join(' · ')}
        </p>
      )}
    </div>
  );
}

export default function Research() {
  if (estudios.length === 0) return null;

  // El primero se muestra abierto; los demás, en una línea cada uno que se
  // despliega al tocarla. Antes los cinco venían completos, uno tras otro:
  // 3.211 px de alto, y nadie llegaba al quinto.
  const [principal, ...resto] = estudios;
  const primerHallazgo = principal.hallazgos[0];

  return (
    <section id="investigacion" className="section-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <h2 className="section-title">
        <span className="gradient-text">Investigaci&oacute;n</span>
      </h2>
      <p className="text-text-muted text-lg mb-14 max-w-[68ch]">
        Estudios propios sobre el sistema de salud colombiano, construidos solo
        con fuentes p&uacute;blicas. Cada uno declara su corpus, su m&eacute;todo y su fecha de
        corte, y se puede reproducir contra su repositorio: si un resultado se
        reproduce desde fuentes p&uacute;blicas, no hay nada adentro que no pudiera
        estar.
      </p>

      {/* El estudio que abre la sección */}
      <article>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight text-text mb-2">
          {principal.titulo}
        </h3>
        <p className="text-sm text-text-muted mb-8">
          {principal.subtitulo}
          {principal.periodo && <span> &middot; {principal.periodo}</span>}
          <span> &middot; </span>
          <span className="text-accent-green">{principal.estado}</span>
        </p>

        <p className="font-serif text-xl md:text-[1.375rem] leading-[1.5] text-text mb-10 max-w-[62ch]">
          {principal.pregunta}
        </p>

        {/* Una cifra, no cuatro: la que resume el estudio. El resto vive
            detrás del desplegable. */}
        {primerHallazgo && (
          <div className="sm:flex sm:items-start sm:gap-8 py-7 border-y border-rule mb-8">
            <p className="font-serif text-4xl md:text-5xl leading-none text-accent-green mb-3 sm:mb-0 sm:flex-shrink-0">
              {primerHallazgo.cifra}
            </p>
            <p className="text-[15px] leading-[1.75] text-text-muted max-w-[62ch]">
              {primerHallazgo.texto}
            </p>
          </div>
        )}

        <details className="group">
          <summary className="list-none cursor-pointer inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-accent-green hover:text-text transition-colors">
            Hallazgos, corpus y m&eacute;todo
            <svg
              className="w-3.5 h-3.5 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9.5 12 15.5 18 9.5" />
            </svg>
          </summary>
          <Detalle e={principal} desde={1} />
        </details>

        <div className="mt-4">
          <Enlaces e={principal} />
        </div>
      </article>

      {/* Los demás: una línea cada uno */}
      <div className="border-t border-rule mt-14">
        {resto.map((e) => (
          <details key={e.slug} className="group border-b border-rule">
            <summary className="list-none cursor-pointer py-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <h3 className="font-serif text-xl text-text group-hover:text-accent-green transition-colors sm:w-[24rem] sm:flex-shrink-0">
                {e.titulo}
              </h3>
              <p className="text-sm text-text-muted flex-1 min-w-[15rem]">
                {e.subtitulo}
                {e.periodo && <span> &middot; {e.periodo}</span>}
              </p>
              <span className="text-xs text-text-muted">{e.estado}</span>
              <svg
                className="w-3.5 h-3.5 text-text-muted transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9.5 12 15.5 18 9.5" />
              </svg>
            </summary>

            <div className="pb-8">
              <p className="font-serif text-lg leading-[1.55] text-text max-w-[62ch]">
                {e.pregunta}
              </p>
              <Detalle e={e} desde={0} />
              <Enlaces e={e} />
            </div>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm text-text-muted max-w-[68ch]">
        Las reglas con que manejo estos trabajos &mdash;autor&iacute;a, licencia, fuentes y
        relaci&oacute;n comercial&mdash; est&aacute;n en{' '}
        <a href="/etica" className="text-accent-green hover:text-text underline underline-offset-4 transition-colors">
          Independencia y manejo de informaci&oacute;n
        </a>
        .
      </p>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import librosData from '@/data/libros.json';
import LeadForm from '@/components/LeadForm';

export const metadata = {
  title: 'Libros | Daniel Garavito',
  description:
    'Libros en escritura de Daniel Garavito sobre datos, salud pública, innovación social y el camino del pagador inteligente. Suscríbete para recibir avances y aviso de lanzamiento.',
  openGraph: {
    title: 'Libros · Daniel Garavito',
    description:
      'Dos libros en producción: Un Jaguar en Tierra de Elefantes y De la Opacidad a la Transparencia.',
    type: 'website',
    locale: 'es_CO',
  },
};

type Libro = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  synopsis: string;
  audience: string;
  status: string;
  expectedRelease: string;
  chaptersTotal: number;
  chaptersDone: number;
  cover: string;
  color: string;
  downloadUrl: string | null;
  newsletterSource: string;
};

const libros = (librosData as { libros: Libro[] }).libros;

export default function LibrosPage() {
  return (
    <div className="section-container max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-semibold uppercase tracking-wider">
          📚 Libros en escritura
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">Libros</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Dos libros en producción que documentan ideas y propuestas
          personales sobre datos, salud pública e innovación pública.
          Suscríbete para recibir avances y aviso de lanzamiento.
        </p>
      </header>

      {/* Tarjetas de libros */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {libros.map((l) => {
          const progress = Math.round((l.chaptersDone / l.chaptersTotal) * 100);
          return (
            <article
              key={l.slug}
              className="group relative rounded-2xl overflow-hidden bg-bg-secondary border border-gray-800 hover:border-accent-gold/40 transition-all"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${l.color} opacity-70 group-hover:opacity-100 transition-opacity`}
              />

              {/* Portada */}
              <div className="aspect-[8/11] bg-bg overflow-hidden">
                <Image
                  src={l.cover}
                  alt={`Portada — ${l.title}`}
                  width={800}
                  height={1100}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-text leading-tight">
                    {l.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1 italic">
                    {l.subtitle}
                  </p>
                </div>

                <p className="text-sm text-text-muted leading-relaxed">
                  {l.tagline}
                </p>

                {/* Status + progreso */}
                <div>
                  <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                    <span className="font-medium text-accent-gold">{l.status}</span>
                    <span>{l.chaptersDone}/{l.chaptersTotal} caps · {progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${l.color} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-text-muted">
                  📅 Lanzamiento previsto: <strong>{l.expectedRelease}</strong>
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/libros/${l.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green hover:text-accent-gold transition-colors"
                  >
                    Conoce más
                    <span aria-hidden>→</span>
                  </Link>

                  {l.downloadUrl ? (
                    <a
                      href={l.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-gold transition-colors"
                    >
                      Descargar el libro
                      <span aria-hidden>↓</span>
                    </a>
                  ) : (
                    <span className="text-xs text-text-muted/70 italic">
                      Aún no disponible — suscríbete para enterarte primero
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Newsletter unificado */}
      <section className="mb-16 rounded-2xl overflow-hidden border border-accent-green/30 bg-gradient-to-br from-accent-green/5 via-bg-secondary to-accent-blue/5 p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
            Avances, capítulos y campañas
          </h2>
          <p className="text-text-muted mb-6 leading-relaxed">
            Recibirás avances de los dos libros, capítulos publicables a medida que se
            liberen, fechas de lanzamiento y campañas relacionadas. Una sola suscripción
            para los dos. Fácil de salir, sin spam.
          </p>
          <LeadForm
            source="book-newsletter"
            title=""
            subtitle=""
          />
          <p className="text-[11px] text-text-muted/70 mt-4">
            Al suscribirte aceptas la{' '}
            <Link href="/libros/legal" className="underline hover:text-text">
              política de tratamiento de datos
            </Link>{' '}
            (Ley 1581/2012). Puedes retirar tu consentimiento cuando quieras
            escribiendo a dagaravitoj@gmail.com.
          </p>
        </div>
      </section>

      {/* Aviso institucional */}
      <section className="mb-12 rounded-xl border border-gray-800 bg-bg-secondary p-6 text-sm text-text-muted leading-relaxed">
        <h3 className="font-semibold text-text mb-3">Aviso institucional</h3>
        <p className="mb-3">
          Las opiniones, análisis y reflexiones que aparecen en estos libros son
          exclusivamente de autoría y carácter personal del autor. No constituyen
          posición institucional ni representan el criterio oficial de la
          Administradora de los Recursos del Sistema General de Seguridad Social en
          Salud (ADRES), del Ministerio de Salud y Protección Social, ni de ninguna
          otra entidad del sector.
        </p>
        <p>
          Los contenidos se elaboran a partir de información de dominio público,
          literatura académica verificable debidamente citada y experiencia
          profesional acumulada. En ningún caso divulgan información reservada,
          datos personales de beneficiarios, datos de operación contractual ni
          elementos bajo deber de confidencialidad institucional.
        </p>
        <Link href="/libros/legal" className="inline-block mt-4 text-accent-green hover:underline text-sm font-medium">
          Ver disclaimers legales completos →
        </Link>
      </section>

      <div className="flex gap-4 text-sm">
        <Link href="/" className="text-accent-green hover:underline">
          ← Volver al inicio
        </Link>
        <Link href="/etica" className="text-accent-blue hover:underline">
          Declaración de conflicto de interés
        </Link>
      </div>
    </div>
  );
}

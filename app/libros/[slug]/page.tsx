import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import librosData from '@/data/libros.json';
import LeadForm from '@/components/LeadForm';

type Libro = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  synopsis: string;
  audience: string;
  status: string;
  expectedRelease: string;
  deadlineLabel: string;
  chaptersTotal: number;
  chaptersDone: number;
  cover: string;
  color: string;
  pillarThemes: string[];
  thesis?: string;
  masterEquation?: string;
  anchorQuote?: string;
  downloadUrl: string | null;
  previewUrl: string | null;
  newsletterSource: string;
};

const libros = (librosData as { libros: Libro[] }).libros;

export function generateStaticParams() {
  return libros.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const libro = libros.find((l) => l.slug === params.slug);
  if (!libro) return { title: 'Libro no encontrado' };
  return {
    title: `${libro.title} | Daniel Garavito`,
    description: libro.tagline,
    openGraph: {
      title: libro.title,
      description: libro.tagline,
      type: 'book',
      locale: 'es_CO',
    },
  };
}

export default function LibroDetalle({ params }: { params: { slug: string } }) {
  const libro = libros.find((l) => l.slug === params.slug);
  if (!libro) notFound();
  const progress = Math.round((libro.chaptersDone / libro.chaptersTotal) * 100);

  return (
    <article className="section-container max-w-5xl mx-auto">
      {/* Header con portada + meta */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8 mb-12">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <Image
            src={libro.cover}
            alt={`Portada — ${libro.title}`}
            width={800}
            height={1100}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-semibold uppercase tracking-wider">
            📚 En escritura
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="gradient-text">{libro.title}</span>
          </h1>
          <p className="text-text-muted text-lg italic leading-snug">
            {libro.subtitle}
          </p>
          <p className="text-text leading-relaxed">{libro.tagline}</p>

          <div>
            <div className="flex items-center justify-between text-sm text-text-muted mb-1">
              <span className="font-medium text-accent-gold">{libro.status}</span>
              <span>{libro.chaptersDone}/{libro.chaptersTotal} capítulos · {progress}%</span>
            </div>
            <div className="h-2 w-full bg-bg rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${libro.color} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {libro.pillarThemes.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-bg-secondary border border-gray-800 text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {libro.downloadUrl ? (
              <a
                href={libro.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                ↓ Descargar el libro
              </a>
            ) : (
              <a href="#suscribirme" className="btn-primary">
                📬 Notificarme cuando salga
              </a>
            )}
            {libro.previewUrl && (
              <a
                href={libro.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Ver muestra
              </a>
            )}
          </div>

          <p className="text-xs text-text-muted">
            📅 Lanzamiento previsto: <strong>{libro.expectedRelease}</strong>
            {' · '}
            Cierre estimado de manuscrito: {libro.deadlineLabel}
          </p>
        </div>
      </div>

      {/* Sinopsis */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-4">Sinopsis</h2>
        <p className="text-text-muted leading-relaxed">{libro.synopsis}</p>
      </section>

      {/* Tesis + ecuación + frase ancla (si existen) */}
      {(libro.thesis || libro.masterEquation || libro.anchorQuote) && (
        <section className="mb-12 rounded-2xl overflow-hidden border border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 via-bg-secondary to-accent-green/5 p-8">
          {libro.anchorQuote && (
            <div className="border-l-4 border-accent-gold pl-5 mb-6">
              <p className="text-xl md:text-2xl font-bold text-text italic">
                &ldquo;{libro.anchorQuote}&rdquo;
              </p>
              <p className="text-text-muted text-sm mt-2">— Daniel Garavito</p>
            </div>
          )}
          {libro.thesis && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                Propuesta del libro
              </h3>
              <p className="text-text leading-relaxed">{libro.thesis}</p>
            </div>
          )}
          {libro.masterEquation && (
            <div>
              <h3 className="text-sm font-semibold text-accent-green uppercase tracking-wider mb-2">
                Ecuación maestra
              </h3>
              <p className="text-lg md:text-xl font-mono text-text bg-bg p-4 rounded-lg border border-gray-800">
                {libro.masterEquation}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Audiencia */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-4">Para quién es este libro</h2>
        <p className="text-text-muted leading-relaxed">{libro.audience}</p>
      </section>

      {/* Suscripción */}
      <section
        id="suscribirme"
        className="mb-16 rounded-2xl overflow-hidden border border-accent-green/30 bg-gradient-to-br from-accent-green/5 via-bg-secondary to-accent-blue/5 p-8 md:p-12"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
            Recibe los avances de este libro
          </h2>
          <p className="text-text-muted mb-6 leading-relaxed">
            Te aviso cuando libere capítulos, abra preventa, fije fecha de lanzamiento o
            cuando haya material complementario (charlas, podcasts, eventos relacionados).
          </p>
          <LeadForm
            source={libro.newsletterSource}
            title=""
            subtitle=""
          />
          <p className="text-[11px] text-text-muted/70 mt-4">
            Al suscribirte aceptas la{' '}
            <Link href="/libros/legal" className="underline hover:text-text">
              política de tratamiento de datos
            </Link>{' '}
            (Ley 1581/2012).
          </p>
        </div>
      </section>

      {/* Aviso institucional resumido */}
      <section className="mb-8 rounded-xl border border-gray-800 bg-bg-secondary p-5 text-xs text-text-muted leading-relaxed">
        <p>
          <strong className="text-text">Aviso institucional —</strong> Las posiciones de
          este libro son personales y no representan a la ADRES, al Ministerio de Salud y
          Protección Social, ni a ninguna otra entidad. Ver{' '}
          <Link href="/libros/legal" className="underline hover:text-text">
            disclaimers legales completos
          </Link>{' '}
          y{' '}
          <Link href="/etica" className="underline hover:text-text">
            declaración de conflicto de interés
          </Link>
          .
        </p>
      </section>

      <div className="flex gap-4 text-sm">
        <Link href="/libros" className="text-accent-green hover:underline">
          ← Todos los libros
        </Link>
        <Link href="/" className="text-accent-blue hover:underline">
          Inicio
        </Link>
      </div>
    </article>
  );
}

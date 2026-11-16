import type { Metadata } from 'next';
import { Inter, Spectral } from 'next/font/google';
import '@/styles/globals.css';
import Link from 'next/link';

// Inter para lo que se usa: navegación, botones, etiquetas, datos.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Spectral para lo que se lee: el nombre, la tesis, los títulos de estudio,
// las citas y el cuerpo de los escritos. Una serif con los pesos declarados,
// porque Spectral no es variable.
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.danielgaravito.co'),
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  authors: [{ name: 'Daniel Garavito', url: 'https://www.danielgaravito.co' }],
  creator: 'Daniel Garavito',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  title: 'Daniel Garavito | Salud Inteligente y Anal\u00edtica Avanzada',
  description:
    'Estudia ingenier\u00eda de sistemas; sus sistemas son los humanos. Econom\u00eda, ingenier\u00eda y anal\u00edtica avanzada aplicadas a la salud inteligente: investigaci\u00f3n con datos abiertos y m\u00e9todo reproducible, escritos y formaci\u00f3n. Dirigi\u00f3 Innovaci\u00f3n y Anal\u00edtica en ADRES hasta 2026. Fundador de EducALL y creador de NACER.',
  keywords: [
    'Daniel Garavito',
    'economista',
    'ciencia de datos',
    'salud inteligente',
    'anal\u00edtica avanzada',
    'ingenier\u00eda de sistemas',
    'salud digital',
    'inteligencia artificial en salud',
    'econom\u00eda de la salud',
    'salud p\u00fablica',
    'innovaci\u00f3n',
    'Colombia',
    'EducALL',
    'NACER',
    'ADRES',
    'consultor\u00eda',
    'datos abiertos',
  ],
  openGraph: {
    title: 'Daniel Garavito | Salud Inteligente y Anal\u00edtica Avanzada',
    description:
      'Estudio ingenier\u00eda de sistemas; mis sistemas son los humanos. Econom\u00eda, ingenier\u00eda y anal\u00edtica avanzada aplicadas a la salud inteligente.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Daniel Garavito',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Garavito — economía, ingeniería y analítica avanzada aplicadas a la salud inteligente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@danielgaravitoco',
    creator: '@danielgaravitoco',
    title: 'Daniel Garavito | Salud Inteligente y Anal\u00edtica Avanzada',
    description:
      'Estudio ingenier\u00eda de sistemas; mis sistemas son los humanos. Econom\u00eda, ingenier\u00eda y anal\u00edtica avanzada aplicadas a la salud inteligente.',
    images: ['/og.jpg'],
  },
};

// Cinco, no nueve. Una navegación de nueve ítems no se lee: se escanea y se
// abandona. Proyectos, Trayectoria, Libros e Independencia siguen existiendo
// —se llega a ellas bajando por la página y desde el pie—, pero dejan de
// competir por la atención en la primera línea del sitio.
const navLinks = [
  { href: '/#investigacion', label: 'Investigaci\u00f3n' },
  { href: '/blog', label: 'Escritos' },
  { href: '/#media', label: 'En Acci\u00f3n' },
  { href: '/#sobre-mi', label: 'Sobre m\u00ed' },
  { href: '/#contacto', label: 'Contacto' },
];

// Las que salieron de la barra, recogidas en el pie.
const footerLinks = [
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#trayectoria', label: 'Trayectoria' },
  { href: '/libros', label: 'Libros' },
  { href: '/etica', label: 'Independencia' },
];

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-rule/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-lg text-text hover:text-accent-green transition-colors"
          >
            Daniel Garavito
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenuButton() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2 text-text-muted hover:text-text">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-rule rounded-lg shadow-xl py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2 text-text-muted hover:text-text hover:bg-bg transition-colors text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spectral.variable} font-sans`}>
      <body className="bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://www.danielgaravito.co/#daniel',
                  name: 'Daniel Garavito',
                  alternateName: 'Daniel Alfonso Garavito Jim\u00e9nez',
                  url: 'https://www.danielgaravito.co',
                  jobTitle: 'Econom\u00eda, ingenier\u00eda y anal\u00edtica avanzada aplicadas a la salud inteligente',
                  knowsAbout: [
                    'Salud inteligente',
                    'Anal\u00edtica avanzada',
                    'Ingenier\u00eda de sistemas',
                    'Salud digital',
                    'Inteligencia artificial aplicada a la salud',
                    'Econom\u00eda de la salud',
                    'Interoperabilidad en salud',
                    'Sistema de salud colombiano',
                    'Unidad de Pago por Capitaci\u00f3n',
                    'Anal\u00edtica de datos',
                    'Estad\u00edstica aplicada',
                  ],
                  worksFor: { '@id': 'https://sinergistica.com/#org' },
                  // El ORCID es la pieza que le importa a quien indexa
                  // investigación: ata los estudios de esta página al mismo
                  // autor que firma en revistas y en DataCite.
                  identifier: {
                    '@type': 'PropertyValue',
                    propertyID: 'https://registry.identifiers.org/registry/orcid',
                    value: 'https://orcid.org/0009-0009-6871-5807',
                    url: 'https://orcid.org/0009-0009-6871-5807',
                  },
                  sameAs: [
                    'https://orcid.org/0009-0009-6871-5807',
                    'https://www.linkedin.com/in/daniel-alfonso-garavito-jim%C3%A9nez/',
                    'https://x.com/danielgaravitoco',
                    'https://bsky.app/profile/danielgaravito.co',
                    'https://github.com/bogotan',
                    'https://rpubs.com/bogotan',
                    'https://consultorsalud.com/opinion/',
                  ],
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://sinergistica.com/#org',
                  name: 'Sinerg\u00edstica S.A.S.',
                  url: 'https://sinergistica.com/',
                  founder: { '@id': 'https://www.danielgaravito.co/#daniel' },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.danielgaravito.co/#sitio',
                  url: 'https://www.danielgaravito.co',
                  name: 'Daniel Garavito',
                  inLanguage: 'es-CO',
                  author: { '@id': 'https://www.danielgaravito.co/#daniel' },
                },
              ],
            }),
          }}
        />
        <Nav />
        <main className="pt-16">{children}</main>
        <footer className="border-t border-rule mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Lo que salió de la barra de navegación aterriza aquí. */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pb-8 mb-8 border-b border-rule">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-accent-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="text-center text-text-muted text-sm">
            <p>
              &copy; {new Date().getFullYear()} Daniel Garavito. Todos los
              derechos reservados.
            </p>
            <p className="mt-1">
              Hecho con amor desde Colombia
            </p>
            <p className="mt-4 text-xs text-text-muted">
              ORCID{' '}
              <a
                href="https://orcid.org/0009-0009-6871-5807"
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 decoration-rule-strong hover:text-accent-green hover:decoration-accent-green transition-colors"
              >
                0009-0009-6871-5807
              </a>
            </p>
            <p className="mt-3 text-xs text-text-muted">
              Lo que se contrata vive en{' '}
              <a
                href="https://sinergistica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-rule-strong hover:text-text-muted hover:decoration-accent-green transition-colors"
              >
                Sinerg&iacute;stica
              </a>
              .
            </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

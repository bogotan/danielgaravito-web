import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
  title: 'Daniel Garavito | Anal\u00edtica y Salud P\u00fablica',
  description:
    'Investigaci\u00f3n aplicada, formaci\u00f3n y consultor\u00eda anal\u00edtica en salud. Dirigi\u00f3 Innovaci\u00f3n y Anal\u00edtica en ADRES hasta 2026; hoy trabaja de forma independiente con datos abiertos y m\u00e9todo reproducible. Fundador de EducALL y creador de NACER.',
  keywords: [
    'Daniel Garavito',
    'economista',
    'ciencia de datos',
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
    title: 'Daniel Garavito | Anal\u00edtica y Salud P\u00fablica',
    description:
      'Investigaci\u00f3n aplicada, formaci\u00f3n y consultor\u00eda anal\u00edtica en salud. Datos abiertos, m\u00e9todo reproducible.',
    type: 'website',
    locale: 'es_CO',
  },
};

const navLinks = [
  { href: '/#sobre-mi', label: 'Sobre m\u00ed' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#publicaciones', label: 'Columnas' },
  { href: '/#trayectoria', label: 'Trayectoria' },
  { href: '/#media', label: 'En Acci\u00f3n' },
  { href: '/blog', label: 'Escritos' },
  { href: '/libros', label: 'Libros' },
  { href: '/etica', label: 'Independencia' },
  { href: '/#contacto', label: 'Contacto' },
];

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            DG
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
      <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-gray-800 rounded-lg shadow-xl py-2">
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
    <html lang="es" className={inter.className}>
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
                  jobTitle: 'Investigaci\u00f3n aplicada y consultor\u00eda anal\u00edtica en salud',
                  knowsAbout: [
                    'Sistema de salud colombiano',
                    'Econom\u00eda de la salud',
                    'Unidad de Pago por Capitaci\u00f3n',
                    'Anal\u00edtica de datos',
                    'Estad\u00edstica aplicada',
                  ],
                  sameAs: [
                    'https://www.linkedin.com/in/daniel-alfonso-garavito-jim%C3%A9nez/',
                    'https://x.com/danielgaravitoco',
                    'https://bsky.app/profile/danielgaravito.co',
                    'https://github.com/bogotan',
                    'https://rpubs.com/bogotan',
                    'https://consultorsalud.com/opinion/',
                  ],
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
        <footer className="border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
            <p>
              &copy; {new Date().getFullYear()} Daniel Garavito. Todos los
              derechos reservados.
            </p>
            <p className="mt-1">
              Hecho con amor desde Colombia
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

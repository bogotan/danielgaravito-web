import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daniel Garavito | Innovaci\u00f3n, Datos y Salud P\u00fablica',
  description:
    'Economista, cient\u00edfico de datos y emprendedor social colombiano. Asesor en ADRES, fundador de EducALL, creador de NACER y apasionado por la intersecci\u00f3n entre datos, salud p\u00fablica e innovaci\u00f3n.',
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
    'emprendedor social',
  ],
  openGraph: {
    title: 'Daniel Garavito | Innovaci\u00f3n, Datos y Salud P\u00fablica',
    description:
      'Economista, cient\u00edfico de datos y emprendedor social colombiano.',
    type: 'website',
    locale: 'es_CO',
  },
};

const navLinks = [
  { href: '/#sobre-mi', label: 'Sobre m\u00ed' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#trayectoria', label: 'Trayectoria' },
  { href: '/#media', label: 'En Acci\u00f3n' },
  { href: '/blog', label: 'Blog' },
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

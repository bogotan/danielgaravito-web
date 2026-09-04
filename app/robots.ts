import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/posts';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Tablero interno y consola de administración: no son contenido público.
        disallow: ['/admin', '/admin/', '/hub', '/hub/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

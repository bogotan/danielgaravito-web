import type { MetadataRoute } from 'next';
import { getAllPosts, SITE_URL } from '@/lib/posts';
import librosData from '@/data/libros.json';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const newest = posts.length ? new Date(posts[0].date || now) : now;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: newest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/libros`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/etica`, lastModified: new Date('2026-09-03'), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/libros/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'yearly',
    // Los análisis pesan más que el material de aula.
    priority: p.track === 'analisis' ? 0.8 : 0.6,
  }));

  const libros = ((librosData as { libros?: { slug: string }[] }).libros || []).map((l) => ({
    url: `${SITE_URL}/libros/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...libros, ...postRoutes];
}

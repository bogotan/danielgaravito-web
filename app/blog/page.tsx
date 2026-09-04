import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import BlogExplorer from '@/components/BlogExplorer';

export const metadata: Metadata = {
  title: 'Escritos | Daniel Garavito',
  description:
    'Análisis del sistema de salud colombiano —UPC, aseguramiento, gasto público— y material de mis cursos de estadística, bioestadística y análisis espacial en R.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  openGraph: {
    type: 'website',
    title: 'Escritos · Daniel Garavito',
    description:
      'Análisis del sistema de salud colombiano y material de cursos de estadística aplicada.',
    url: 'https://www.danielgaravito.co/blog',
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
    images: ['/og.jpg'],
  },
};

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  track: string;
  updated: boolean;
  originalDate: string;
  readingTime: number;
  wordCount: number;
}

function parseFrontmatter(content: string): { data: Record<string, string | string[]>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const frontmatter: Record<string, string | string[]> = {};
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/['"]/g, ''));
    } else {
      frontmatter[key] = value.replace(/['"]/g, '');
    }
  });

  return { data: frontmatter, body: match[2] };
}

function getBlogPosts(): BlogPostData[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const { data, body } = parseFrontmatter(raw);
      const wordCount = body.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        slug: file.replace('.md', ''),
        title: (data.title as string) || file.replace('.md', ''),
        date: (data.date as string) || '',
        excerpt: (data.excerpt as string) || '',
        tags: (data.tags as string[]) || [],
        updated: data.updated === 'true',
        originalDate: (data.originalDate as string) || '',
        readingTime,
        wordCount,
        category: (data.category as string) || '',
        track: (data.track as string) || 'aula',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogExplorer posts={posts} />;
}

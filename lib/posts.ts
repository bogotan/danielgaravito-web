import fs from 'fs';
import path from 'path';

export const SITE_URL = 'https://www.danielgaravito.co';
export const AUTHOR = 'Daniel Garavito';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  track: string;
  rpubs?: string;
  wordCount: number;
  readingTime: number;
}

export function parseFrontmatter(content: string): {
  data: Record<string, string | string[]>;
  body: string;
} {
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

/**
 * El cuerpo de casi todos los posts abre con `# Título`, y la plantilla ya
 * pinta ese título en un <h1>. Sin esto la página queda con dos h1 casi
 * idénticos, que es exactamente lo que un buscador lee como duplicado.
 */
export function stripLeadingH1(body: string, title: string): string {
  const trimmed = body.replace(/^\s+/, '');
  const m = trimmed.match(/^#\s+(.+?)\s*\n/);
  if (!m) return body;
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]/g, '');
  // Solo lo quita si es el mismo título, no un encabezado de contenido real.
  if (norm(m[1]).slice(0, 40) !== norm(title).slice(0, 40)) return body;
  return trimmed.slice(m[0].length);
}

function blogDir() {
  return path.join(process.cwd(), 'content', 'blog');
}

export function getAllPosts(): PostMeta[] {
  const dir = blogDir();
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, body } = parseFrontmatter(raw);
      const wordCount = body.trim().split(/\s+/).length;
      return {
        slug: file.replace('.md', ''),
        title: (data.title as string) || file.replace('.md', ''),
        date: (data.date as string) || '',
        excerpt: (data.excerpt as string) || '',
        tags: (data.tags as string[]) || [],
        category: (data.category as string) || '',
        track: (data.track as string) || 'aula',
        rpubs: (data.rpubs as string) || undefined,
        wordCount,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-static';
export const dynamicParams = true;

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

// Generate a gradient cover based on the slug
function getCoverGradient(slug: string): { from: string; via: string; to: string } {
  const gradients = [
    { from: '#1565C0', via: '#13AFF0', to: '#0D47A1' },
    { from: '#F07B2E', via: '#FF9800', to: '#E65100' },
    { from: '#1565C0', via: '#7C4DFF', to: '#13AFF0' },
    { from: '#00897B', via: '#13AFF0', to: '#1565C0' },
    { from: '#F07B2E', via: '#FF5722', to: '#D84315' },
    { from: '#6A1B9A', via: '#1565C0', to: '#13AFF0' },
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

// Estimate reading time
function getReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace('.md', '') }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  const title = (data.title as string) || params.slug;
  const date = data.date as string;
  const tags = (data.tags as string[]) || [];
  const originalDate = data.originalDate as string;
  const updated = data.updated === 'true';
  const excerpt = data.excerpt as string;
  const cover = getCoverGradient(params.slug);
  const readingTime = getReadingTime(body);

  return (
    <div className="min-h-screen">
      {/* Cover image / gradient hero */}
      <div
        className="relative w-full h-64 md:h-80 flex items-end"
        style={{
          background: `linear-gradient(135deg, ${cover.from} 0%, ${cover.via} 50%, ${cover.to} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="relative max-w-3xl mx-auto w-full px-4 sm:px-6 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">{title}</h1>

          {excerpt && (
            <p className="text-text-muted text-lg leading-relaxed mb-4">{excerpt}</p>
          )}

          <div className="flex items-center gap-4 text-text-muted text-sm flex-wrap">
            {date && (
              <time className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(date).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min de lectura
            </span>
            {updated && originalDate && (
              <span className="px-2 py-0.5 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-medium">
                Actualizado &middot; Original: {new Date(originalDate).toLocaleDateString('es-CO', { year: 'numeric', month: 'long' })}
              </span>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-bg-secondary border border-gray-700 text-text-muted hover:border-accent-blue/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="blog-article">
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-800 pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-green hover:underline text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ver todos los art&iacute;culos
          </Link>
        </div>
      </div>
    </div>
  );
}

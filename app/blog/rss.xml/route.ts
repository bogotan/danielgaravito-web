import { getAllPosts, SITE_URL, AUTHOR } from '@/lib/posts';

export const dynamic = 'force-static';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
  const updated = posts.length ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${p.date ? new Date(p.date).toUTCString() : updated}</pubDate>
      <category>${esc(p.track === 'analisis' ? 'Análisis' : 'Aula')}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Escritos · ${esc(AUTHOR)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Análisis del sistema de salud colombiano y material de cursos de estadística aplicada.</description>
    <language>es-CO</language>
    <lastBuildDate>${updated}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}

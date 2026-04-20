import fs from 'fs';
import path from 'path';
import BlogExplorer from '@/components/BlogExplorer';

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogExplorer posts={posts} />;
}

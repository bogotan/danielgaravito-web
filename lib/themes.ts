// Universos temáticos del blog — identidad visual por temática.
// Cada post hereda un tema según su frontmatter `category`.

export type ThemeKey = 'ia' | 'economia' | 'estadistica' | 'salud' | 'default';

export type BlogTheme = {
  key: ThemeKey;
  label: string;
  icon: string;
  // CSS gradient para la banda temática (identidad del universo)
  universeGradient: string;
  // Color sólido principal (para acentos, badges, borders)
  accent: string;
  accentRgba: string;
  pattern: string; // emoji grande que representa el universo
};

export const THEMES: Record<ThemeKey, BlogTheme> = {
  ia: {
    key: 'ia',
    label: 'IA',
    icon: '🤖',
    universeGradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 45%, #06B6D4 100%)',
    accent: '#A78BFA',
    accentRgba: 'rgba(167,139,250,0.15)',
    pattern: '🧠',
  },
  economia: {
    key: 'economia',
    label: 'Economía',
    icon: '📈',
    universeGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #10B981 100%)',
    accent: '#FCD34D',
    accentRgba: 'rgba(252,211,77,0.15)',
    pattern: '⚖️',
  },
  estadistica: {
    key: 'estadistica',
    label: 'Estadística',
    icon: '📊',
    universeGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 45%, #14B8A6 100%)',
    accent: '#60A5FA',
    accentRgba: 'rgba(96,165,250,0.15)',
    pattern: '🎲',
  },
  salud: {
    key: 'salud',
    label: 'Salud',
    icon: '⚕️',
    universeGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 45%, #10B981 100%)',
    accent: '#FCA5A5',
    accentRgba: 'rgba(252,165,165,0.15)',
    pattern: '❤️',
  },
  default: {
    key: 'default',
    label: 'General',
    icon: '✦',
    universeGradient: 'linear-gradient(135deg, #4B5563 0%, #1F2937 50%, #6B7280 100%)',
    accent: '#D1D5DB',
    accentRgba: 'rgba(209,213,219,0.15)',
    pattern: '✦',
  },
};

// Map blog frontmatter `category` → theme key
export function getThemeFromCategory(category?: string): BlogTheme {
  if (!category) return THEMES.default;
  const c = category.toLowerCase().trim();
  if (c === 'ia' || c === 'ai' || c === 'inteligencia artificial') return THEMES.ia;
  if (c === 'economia' || c === 'economía' || c === 'economy') return THEMES.economia;
  if (c === 'salud' || c === 'salud publica' || c === 'health') return THEMES.salud;
  if (c === 'estadistica' || c === 'estadística' || c === 'amesp' || c === 'clase' || c === 'investigacion' || c === 'investigación') return THEMES.estadistica;
  return THEMES.default;
}

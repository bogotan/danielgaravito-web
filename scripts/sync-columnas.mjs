#!/usr/bin/env node
/**
 * Sincroniza data/columnas.json con las columnas de Daniel en CONSULTORSALUD.
 *
 * REGLA DE ORO: este script solo AGREGA. Nunca modifica ni borra una entrada
 * existente. Los títulos y los `summary` del archivo están editados a mano y son
 * de Daniel, no del portal; sobrescribirlos sería perder lo mejor que tienen.
 *
 * Las columnas nuevas entran con summary vacío, a propósito: la tarjeta se ve
 * bien sin él y la frase la escribe él cuando pueda.
 *
 * Dos fuentes, porque ninguna sola es confiable:
 *   1. La API REST de WordPress filtrada por autor. Estructurada, pero en
 *      sep-2026 devolvía solo las dos más recientes aunque el archivo del autor
 *      mostraba diez.
 *   2. El archivo HTML del autor. Completo, pero se rompe si cambian la plantilla.
 * Se unen las dos y cada candidata se verifica contra la API por slug: si la API
 * no dice que el autor es él, no entra. Eso vuelve segura la lectura del HTML.
 *
 * Uso:  node scripts/sync-columnas.mjs [--dry-run]
 * Sale con 1 si ambas fuentes fallan (así el trabajo semanal avisa en vez de
 * escribir un archivo a medias).
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const AQUI = dirname(fileURLToPath(import.meta.url));
const ARCHIVO = join(AQUI, '..', 'data', 'columnas.json');

const SITIO = 'https://consultorsalud.com';
const AUTOR_ID = 113777;
const AUTOR_SLUG = 'daniel-garavito';
const MAX_PAGINAS_HTML = 10;
const DRY_RUN = process.argv.includes('--dry-run');

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// Rutas del portal que no son columnas.
const NO_ARTICULO = new Set([
  'autor', 'categoria', 'category', 'tag', 'etiqueta', 'page', 'feed', 'wp-json',
  'wp-content', 'wp-admin', 'wp-includes', 'contacto', 'nosotros', 'publicidad',
  'suscripcion', 'politica-de-privacidad', 'terminos-y-condiciones',
]);

function log(...a) { console.log(...a); }
function aviso(...a) { console.warn('  !', ...a); }

async function traer(url, { comoTexto = false } = {}) {
  const res = await fetch(url, {
    headers: {
      // Identificarse es de buena educación y evita bloqueos por user-agent vacío.
      'User-Agent': 'danielgaravito.co sync-columnas (+https://danielgaravito.co)',
      Accept: comoTexto ? 'text/html,*/*' : 'application/json',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return comoTexto ? res.text() : res.json();
}

/** Decodifica las entidades HTML que WordPress mete en title.rendered. */
function decodificar(s) {
  if (!s) return '';
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&[lr]dquo;/g, '"')
    .replace(/&[lr]squo;/g, "'")
    .replace(/&[nm]dash;/g, '–')
    .replace(/<[^>]*>/g, '')
    .trim();
}

function etiquetaFecha(iso) {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Normaliza una URL: el constructor URL codifica en porcentaje lo que no es
 * ASCII. Sin esto, las portadas quedan con caracteres como «¿» literales en el
 * src y dependen de que cada cliente los codifique por su cuenta.
 */
function normalizarUrl(u) {
  if (!u) return '';
  try { return new URL(u).href; } catch { return u; }
}

function slugDeUrl(url) {
  try {
    return new URL(url).pathname.replace(/^\/|\/$/g, '').split('/').pop() || '';
  } catch {
    return '';
  }
}

/** Fuente 1: la API filtrada por autor. */
async function slugsDesdeApi() {
  const encontrados = new Set();
  for (let pagina = 1; pagina <= 5; pagina++) {
    const url = `${SITIO}/wp-json/wp/v2/posts?author=${AUTOR_ID}&per_page=100&page=${pagina}` +
                `&orderby=date&order=desc&_fields=slug`;
    let lote;
    try {
      lote = await traer(url);
    } catch (e) {
      if (pagina === 1) throw e;   // la primera página es la que importa
      break;                       // páginas de más: fin normal del recorrido
    }
    if (!Array.isArray(lote) || lote.length === 0) break;
    for (const p of lote) if (p?.slug) encontrados.add(p.slug);
    if (lote.length < 100) break;
  }
  return encontrados;
}

/** Fuente 2: el archivo HTML del autor, paginado. */
async function slugsDesdeArchivo() {
  const encontrados = new Set();
  for (let pagina = 1; pagina <= MAX_PAGINAS_HTML; pagina++) {
    const url = pagina === 1
      ? `${SITIO}/autor/${AUTOR_SLUG}/`
      : `${SITIO}/autor/${AUTOR_SLUG}/page/${pagina}/`;
    let html;
    try {
      html = await traer(url, { comoTexto: true });
    } catch {
      break;   // se acabaron las páginas
    }
    const antes = encontrados.size;
    const re = new RegExp(`https?://(?:www\\.)?consultorsalud\\.com/([a-z0-9][a-z0-9-]{8,})/`, 'gi');
    for (const m of html.matchAll(re)) {
      const slug = m[1].toLowerCase();
      if (!NO_ARTICULO.has(slug)) encontrados.add(slug);
    }
    if (encontrados.size === antes) break;   // página sin nada nuevo
  }
  return encontrados;
}

/** Verifica un slug contra la API y devuelve la columna lista, o null. */
async function resolverColumna(slug) {
  let post;
  try {
    const r = await traer(
      `${SITIO}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}` +
      `&_fields=slug,date,link,title,author,featured_media`
    );
    post = Array.isArray(r) ? r[0] : null;
  } catch (e) {
    aviso(`no pude consultar «${slug}»: ${e.message}`);
    return null;
  }
  if (!post) return null;
  // El filtro que vuelve segura la lectura del HTML: si no es de él, no entra.
  if (Number(post.author) !== AUTOR_ID) return null;

  let image = '';   // se normaliza al final
  if (post.featured_media) {
    try {
      const media = await traer(`${SITIO}/wp-json/wp/v2/media/${post.featured_media}?_fields=source_url`);
      image = media?.source_url || '';
    } catch {
      // Pasa de verdad: en sep-2026 un featured_media daba 404. Se cae al og:image.
    }
  }
  if (!image) {
    try {
      const html = await traer(post.link, { comoTexto: true });
      image = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';
    } catch { /* sin portada: la tarjeta la muestra vacía, no rompe */ }
  }

  const fecha = String(post.date).slice(0, 10);
  return {
    slug: post.slug,
    title: decodificar(post.title?.rendered),
    url: normalizarUrl(post.link),
    image: normalizarUrl(image),
    date: fecha,
    dateLabel: etiquetaFecha(post.date),
    summary: '',          // la frase la escribe Daniel
  };
}

async function main() {
  const doc = JSON.parse(await readFile(ARCHIVO, 'utf8'));
  const existentes = doc.columnas ?? [];
  // Se cuentan también los slugs viejos: el portal a veces renombra una nota y
  // sin esto volvería a entrar como si fuera otra columna.
  const yaEstan = new Set();
  for (const c of existentes) {
    if (c.slug) yaEstan.add(c.slug);
    for (const alt of c.slugsAlternos ?? []) yaEstan.add(alt);
  }
  log(`Archivo actual: ${existentes.length} columnas.`);

  let api = new Set(), archivo = new Set();
  let fallos = 0;
  try { api = await slugsDesdeApi(); log(`  API por autor: ${api.size} slugs.`); }
  catch (e) { fallos++; aviso(`la API por autor falló: ${e.message}`); }
  try { archivo = await slugsDesdeArchivo(); log(`  Archivo del autor (HTML): ${archivo.size} candidatos.`); }
  catch (e) { fallos++; aviso(`el archivo HTML falló: ${e.message}`); }

  if (fallos === 2) {
    console.error('\nLas dos fuentes fallaron. No toco el archivo.');
    process.exit(1);
  }

  const candidatos = [...new Set([...api, ...archivo])].filter((s) => !yaEstan.has(s));
  log(`  Candidatos nuevos por verificar: ${candidatos.length}.`);

  const nuevas = [];
  for (const slug of candidatos) {
    const col = await resolverColumna(slug);
    if (col) { nuevas.push(col); log(`  + ${col.date}  ${col.title}`); }
  }

  if (nuevas.length === 0) {
    log('\nSin columnas nuevas. Nada que hacer.');
    return;
  }

  // Solo se agrega: las existentes se reinsertan tal cual, sin tocar un carácter.
  doc.columnas = [...existentes, ...nuevas].sort((a, b) => b.date.localeCompare(a.date));
  doc._meta = { ...doc._meta, ultimaSync: new Date().toISOString().slice(0, 10) };

  if (DRY_RUN) {
    log(`\n[dry-run] Habría agregado ${nuevas.length}. No escribo.`);
    return;
  }
  await writeFile(ARCHIVO, JSON.stringify(doc, null, 2) + '\n', 'utf8');
  log(`\nAgregadas ${nuevas.length}. Total: ${doc.columnas.length}.`);
  log('Les falta el summary — escríbelo en data/columnas.json cuando puedas.');

  // Para que el trabajo semanal pueda nombrarlas en el commit.
  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import('node:fs');
    appendFileSync(process.env.GITHUB_OUTPUT, `nuevas=${nuevas.length}\n`);
    appendFileSync(process.env.GITHUB_OUTPUT, `titulos=${nuevas.map((c) => c.title).join(' · ')}\n`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

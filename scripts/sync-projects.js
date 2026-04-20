#!/usr/bin/env node
/**
 * sync-projects.js
 *
 * Sincroniza data/projects.json con la tabla "Proyectos Activos" de ELEFANTE
 * (MEMORIA.md en la raiz de "Agentes Garavito").
 *
 * Protocolo: 01_FuerzaG_Sistema/documentacion/PROTOCOLO_SYNC_WEB_2026-04-20.md
 */

const fs = require('fs');
const path = require('path');

// ---------- Paths ----------
const PROJECT_ROOT = path.join(__dirname, '..');
const PROJECTS_JSON = path.join(PROJECT_ROOT, 'data', 'projects.json');
// MEMORIA vive 3 niveles arriba: danielgaravito_next -> marca_personal -> 03_Contenido_Redes -> Agentes Garavito
const MEMORIA_PATH = path.join(PROJECT_ROOT, '..', '..', '..', 'MEMORIA.md');

// ---------- Utils ----------
function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/["'`]/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Alias map: canonical slug (projects.json) -> aliases accepted from MEMORIA
const SLUG_ALIASES = {
  'libro-jaguar': ['libro-jaguar', 'libro-jaguar-1', 'libro-"jaguar"'],
  'sala-inteligencia-adres': ['sala-inteligencia-adres'],
  'metro22': ['metro22', 'metro-22'],
  'fuerzag': ['fuerzag', 'fuerzag-infraestructura'],
  'babytongues': ['babytongues', 'babytongue', 'liam'],
  'furiosa': ['furiosa'],
  'simracing': ['simracing'],
};

const MEMORIA_TO_CANONICAL = {};
Object.entries(SLUG_ALIASES).forEach(([canon, aliases]) => {
  aliases.forEach((a) => { MEMORIA_TO_CANONICAL[a] = canon; });
});

function canonicalSlug(memoriaSlug) {
  return MEMORIA_TO_CANONICAL[memoriaSlug] || memoriaSlug;
}

function classify(status) {
  const s = String(status || '').toLowerCase();
  if (s.includes('listo')) return 'pre-launch';
  if (s.includes('ideaci')) return 'ideation';
  if (s.includes('escritura') || s.includes('escribiendo')) return 'writing';
  if (s.includes('disen') || s.includes('design')) return 'design';
  if (s.includes('construc')) return 'active';
  if (s.includes('operativ') || s.includes('activo') || s.includes('running')) return 'active';
  if (s.includes('congelado') || s.includes('pausa')) return 'paused';
  return 'active';
}

// ---------- Parse MEMORIA ----------
function parseMemoria(markdown) {
  const start = markdown.indexOf('## Proyectos Activos');
  if (start === -1) {
    throw new Error('No se encontro la seccion "## Proyectos Activos" en MEMORIA.md');
  }
  const rest = markdown.slice(start);
  const end = rest.indexOf('\n## ', 1);
  const block = end === -1 ? rest : rest.slice(0, end);

  const lines = block.split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 3) {
    throw new Error('Tabla "Proyectos Activos" vacia o malformada.');
  }
  const dataLines = lines.slice(2);

  return dataLines.map((row) => {
    const cols = row.split('|').map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
    const [titulo, estado, ultimaActividad, mvp, monetizacion] = cols;
    const rawSlug = slugify(titulo);
    return {
      title: titulo,
      slug: canonicalSlug(rawSlug),
      rawSlug,
      memoriaStatus: estado,
      lastActivity: ultimaActividad,
      mvp,
      monetization: monetizacion,
    };
  });
}

// ---------- Merge ----------
function mergeProjects(existingJson, memoriaRows) {
  const memoriaBySlug = {};
  memoriaRows.forEach((r) => { memoriaBySlug[r.slug] = r; });

  const existingBySlug = {};
  existingJson.projects.forEach((p) => { existingBySlug[p.slug] = p; });

  const report = { updated: [], newInMemoria: [], missingInMemoria: [], unchanged: [] };

  const updatedProjects = existingJson.projects.map((p) => {
    const m = memoriaBySlug[p.slug];
    if (!m) { report.missingInMemoria.push(p.slug); return p; }
    const newStatus = m.memoriaStatus;
    const newCat = classify(newStatus);
    if (newStatus !== p.status || newCat !== p.statusCategory) {
      report.updated.push({ slug: p.slug, from: p.status, to: newStatus });
      return { ...p, status: newStatus, statusCategory: newCat };
    }
    report.unchanged.push(p.slug);
    return p;
  });

  memoriaRows.forEach((m) => {
    if (!existingBySlug[m.slug]) { report.newInMemoria.push(m); }
  });

  return { updatedProjects, report };
}

// ---------- Main ----------
function main() {
  console.log('=== sync-projects.js ===');
  console.log(`MEMORIA: ${MEMORIA_PATH}`);
  console.log(`PROJECTS: ${PROJECTS_JSON}`);

  if (!fs.existsSync(MEMORIA_PATH)) {
    console.error('ERROR: MEMORIA.md no encontrada.');
    process.exit(1);
  }
  if (!fs.existsSync(PROJECTS_JSON)) {
    console.error('ERROR: data/projects.json no existe.');
    process.exit(1);
  }

  const memoriaRaw = fs.readFileSync(MEMORIA_PATH, 'utf-8');
  const existing = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf-8'));

  const memoriaRows = parseMemoria(memoriaRaw);
  const { updatedProjects, report } = mergeProjects(existing, memoriaRows);

  existing.projects = updatedProjects;
  existing._meta = existing._meta || {};
  existing._meta.lastSync = today();
  existing._meta.syncedBy = 'sync-projects.js';

  fs.writeFileSync(PROJECTS_JSON, JSON.stringify(existing, null, 2), 'utf-8');

  console.log('');
  console.log('--- Reporte ---');
  console.log(`Proyectos en MEMORIA: ${memoriaRows.length}`);
  console.log(`Proyectos en projects.json: ${existing.projects.length}`);
  console.log(`Actualizados: ${report.updated.length}`);
  report.updated.forEach((u) => console.log(`  - ${u.slug}: "${u.from}" -> "${u.to}"`));
  console.log(`Sin cambios: ${report.unchanged.length}`);
  if (report.newInMemoria.length) {
    console.log(`AVISO - Nuevos en MEMORIA (no estan en projects.json):`);
    report.newInMemoria.forEach((m) => console.log(`  - ${m.slug} ("${m.title}") estado: ${m.memoriaStatus}`));
  }
  if (report.missingInMemoria.length) {
    console.log(`AVISO - Presentes en projects.json pero no en MEMORIA:`);
    report.missingInMemoria.forEach((s) => console.log(`  - ${s}`));
  }
  console.log('');
  console.log(`OK Escrito: ${PROJECTS_JSON}`);
  console.log(`   Ultimo sync: ${existing._meta.lastSync}`);
}

main();

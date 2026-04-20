/**
 * sync-timeline.js
 *
 * Lee un archivo Excel (timeline_hitos.xlsx) y lo convierte a data/hitos.json
 *
 * Uso: node scripts/sync-timeline.js [ruta-al-excel]
 *
 * Columnas esperadas en el Excel:
 * year | emoji | title | desc | type | image | url | highlight | color
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const defaultExcelPath = path.join(__dirname, '..', 'timeline_hitos.xlsx');
const outputPath = path.join(__dirname, '..', 'data', 'hitos.json');

function syncTimeline(excelPath) {
  const filePath = excelPath || defaultExcelPath;

  if (!fs.existsSync(filePath)) {
    console.log(`[sync-timeline] Skip: no hay ${path.basename(filePath)} en la raíz del proyecto.`);
    console.log('[sync-timeline] data/hitos.json se mantiene tal cual (edición manual o pendiente de XLSX).');
    process.exit(0);
  }

  console.log(`Leyendo: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json(sheet);

  const hitos = rawData.map((row) => ({
    year: parseInt(row.year || row.Year || row.año || 0, 10),
    emoji: (row.emoji || row.Emoji || '📌').trim(),
    title: (row.title || row.Title || row.titulo || '').trim(),
    desc: (row.desc || row.description || row.descripcion || row.Desc || '').trim(),
    type: (row.type || row.Type || row.tipo || 'hito').trim().toLowerCase(),
    image: (row.image || row.Image || row.imagen || '').trim(),
    url: (row.url || row.URL || row.link || '').trim(),
    highlight: Boolean(
      row.highlight === true ||
      row.highlight === 'true' ||
      row.highlight === 'TRUE' ||
      row.highlight === 1 ||
      row.highlight === 'si' ||
      row.highlight === 'sí' ||
      row.Highlight === true
    ),
    color: (row.color || row.Color || '').trim() || null,
  }));

  // Validate
  const valid = hitos.filter((h) => h.year > 0 && h.title.length > 0);
  const invalid = hitos.length - valid.length;

  if (invalid > 0) {
    console.warn(`Advertencia: ${invalid} fila(s) ignoradas por datos incompletos.`);
  }

  // Sort by year descending
  valid.sort((a, b) => b.year - a.year);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON
  fs.writeFileSync(outputPath, JSON.stringify(valid, null, 2), 'utf-8');

  console.log(`Listo! ${valid.length} hitos exportados a: ${outputPath}`);
  console.log(`Años: ${[...new Set(valid.map((h) => h.year))].sort((a, b) => b - a).join(', ')}`);
}

// Run
const customPath = process.argv[2];
syncTimeline(customPath);

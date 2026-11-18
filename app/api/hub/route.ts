// Seguimiento del Second Brain para el hub y para agentes de IA.
//   Navegador: cookie que pone /api/auth al entrar con la clave.
//   Agentes:   Authorization: Bearer <clave del hub>
// Filtros: ?q=texto&estado=activo&capa=1&area=Sinergistica&id=radar-medicamentos&formato=md
//   &vistas=1 trae también la bitácora, el grafo, la galería y el tablero completos (pesado).
//   Las páginas de esas vistas: /api/hub/vista?v=tablero|bitacora|grafo|galeria
import { NextRequest, NextResponse } from 'next/server';
import { abrir } from '@/lib/hubSeguridad';

export const dynamic = 'force-dynamic';

function sinTildes(s: unknown): string {
  return String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export async function GET(req: NextRequest) {
  const cab = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
  const acceso = abrir(req);
  if (!acceso) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401, headers: cab });
  }
  const feed: any = acceso.feed;
  const p = req.nextUrl.searchParams;
  const q = sinTildes(p.get('q')).split(/\s+/).filter(Boolean);
  let proyectos: any[] = feed.proyectos || [];
  for (const campo of ['estado', 'capa', 'id'] as const) {
    const v = p.get(campo);
    if (v) proyectos = proyectos.filter((x) => sinTildes(x[campo]) === sinTildes(v));
  }
  const area = p.get('area');
  if (area) proyectos = proyectos.filter((x) => sinTildes(x.area).includes(sinTildes(area)));
  if (q.length) {
    proyectos = proyectos.filter((x) => {
      const t = sinTildes(Object.values(x).map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join(' '));
      return q.every((w) => t.includes(w));
    });
  }
  const hoy = feed.hoy;
  const lineaT = (t: any) => `- [ ] ${t.texto}${t.proyecto ? ` (${t.proyecto})` : ''}${t.fecha ? ` · vence ${t.fecha}` : ''}`;
  if (p.get('formato') === 'md') {
    const bloqueHoy = hoy ? [`## Hoy ${hoy.fecha} · ${hoy.semana_clave}`, ...(hoy.vencidas.length ? ['**Vencidas**', ...hoy.vencidas.map(lineaT)] : []),
      '**Del día**', ...(hoy.tareas_hoy.length ? hoy.tareas_hoy.map(lineaT) : ['- (nada para hoy)']),
      '**De la semana**', ...hoy.semana.map(lineaT), '**Del mes**', ...hoy.mes.map(lineaT), ''] : [];
    const md = [`# Seguimiento · ${feed.generado}`, '', ...bloqueHoy, ...proyectos.map((x) =>
      `## ${x.nombre}\n- capa ${x.capa} · ${x.estado} · ${x.prioridad || ''} · ${x.area || ''}\n- siguiente paso: ${x.siguiente_paso || '—'}\n- último avance: ${x.ultimo_avance || '—'} · límite: ${x.limite_validacion || '—'}\n- riesgos: ${x.riesgos || '—'}`)].join('\n');
    return new NextResponse(md, { headers: { ...cab, 'Content-Type': 'text/markdown; charset=utf-8' } });
  }
  const { vistas, ...ligero } = feed;
  const salida = p.get('vistas') === '1' ? { ...feed } : ligero;
  return NextResponse.json({ ...salida, total: proyectos.length, proyectos }, { headers: cab });
}

// Vistas del Second Brain dentro del hub: tablero, bitácora, grafo y galería.
// Arma la página en el servidor (plantilla + datos + íconos, descifrados con la llave de la sesión).
//   GET /api/hub/vista?v=bitacora
import { NextRequest, NextResponse } from 'next/server';
import recursosCifrados from '@/data/hub-recursos.enc.json';
import { abrir, descifrar } from '@/lib/hubSeguridad';

export const dynamic = 'force-dynamic';
const VISTAS = ['tablero', 'bitacora', 'grafo', 'galeria'] as const;

export async function GET(req: NextRequest) {
  const cab: Record<string, string> = {
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex',
    'Content-Security-Policy': "frame-ancestors 'self'",
    'Referrer-Policy': 'no-referrer',
  };
  const acceso = abrir(req);
  if (!acceso) return new NextResponse('No autorizado: entra al hub con tu clave.', { status: 401, headers: cab });
  const v = req.nextUrl.searchParams.get('v') as (typeof VISTAS)[number];
  if (!VISTAS.includes(v)) return new NextResponse('Vista desconocida', { status: 404, headers: cab });
  let rec: any;
  try {
    rec = descifrar(recursosCifrados as any, acceso.llave);
  } catch {
    return new NextResponse('Las plantillas no abren con esta clave: corre ACTUALIZAR-HUB.bat', { status: 500, headers: cab });
  }
  const p = rec.plantillas?.[v];
  const datos = acceso.feed.vistas?.[v];
  if (!p || !datos) return new NextResponse('Esta vista aún no está en el feed: corre ACTUALIZAR-HUB.bat', { status: 404, headers: cab });
  const iconos: Record<string, string> = rec.iconos || {};
  const json = JSON.stringify(datos)
    .replace(/"(_assets\/iconos\/[^"]+)"/g, (_m: string, ruta: string) => (iconos[ruta] ? JSON.stringify(iconos[ruta]) : 'null'))
    .replace(/<\//g, '<\\/');
  const html = String(p.html).split(p.marcador).join(json);
  return new NextResponse(html, { headers: { ...cab, 'Content-Type': 'text/html; charset=utf-8' } });
}

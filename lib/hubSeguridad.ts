// Seguridad del hub SIN variables de entorno: la clave del hub es la llave.
//   · Los datos (data/hub.enc.json y data/hub-recursos.enc.json) van cifrados con AES-256-GCM.
//   · La llave de cifrado se deriva de la clave con scrypt y una sal que viaja en el mismo archivo.
//   · Entrar = derivar la llave y comprobar que abre el feed. En el repo no hay ni la clave ni su llave.
//   · Tras entrar, la llave queda en una cookie httpOnly (12 h). Los agentes mandan la clave: Authorization: Bearer <clave>.
// Todo esto corre solo en el servidor.
import crypto from 'crypto';
import feedCifrado from '@/data/hub.enc.json';

export const COOKIE_HUB = 'hub_llave';
export const DURACION_S = 12 * 60 * 60;

type Cifrado = { v: number; alg: string; sal?: string; iv: string; tag: string; datos: string };

export function derivar(clave: string, sal: string): Buffer {
  return crypto.scryptSync(clave.normalize('NFC'), Buffer.from(sal, 'base64'), 32, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
}

export function descifrar(c: Cifrado, k: Buffer): any {
  const d = crypto.createDecipheriv('aes-256-gcm', k, Buffer.from(c.iv, 'base64'));
  d.setAuthTag(Buffer.from(c.tag, 'base64'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(c.datos, 'base64')), d.final()]).toString('utf8'));
}

// La llave sirve si abre el feed (GCM falla con cualquier otra llave).
function prueba(k: Buffer): any | null {
  try { return descifrar(feedCifrado as Cifrado, k); } catch { return null; }
}

const porClave = new Map<string, Buffer>();
export function llaveDeClave(clave: unknown): Buffer | null {
  if (typeof clave !== 'string' || !clave || clave.length > 200) return null;
  const sal = (feedCifrado as Cifrado).sal;
  if (!sal) return null;
  const id = crypto.createHash('sha256').update(clave).digest('hex');
  const ya = porClave.get(id);
  if (ya) return ya;
  const k = derivar(clave, sal);
  if (!prueba(k)) return null;
  porClave.set(id, k);
  return k;
}

type Req = { cookies: { get(n: string): { value: string } | undefined }; headers: { get(n: string): string | null } };

// Llave de la petición (cookie del navegador o clave del agente) y el feed ya abierto; null si no hay acceso.
export function abrir(req: Req): { llave: Buffer; feed: any } | null {
  const c = req.cookies.get(COOKIE_HUB)?.value;
  if (c) {
    try {
      const k = Buffer.from(c, 'base64url');
      if (k.length === 32) { const feed = prueba(k); if (feed) return { llave: k, feed }; }
    } catch {}
  }
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) {
    const k = llaveDeClave(auth.slice(7).trim());
    if (k) return { llave: k, feed: prueba(k) };
  }
  return null;
}

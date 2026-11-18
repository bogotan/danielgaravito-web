// Cifra el feed del Second Brain para el hub de danielgaravito.co. SIN variables de Vercel:
// la llave se deriva de tu clave del hub (scrypt + sal) y el sitio la comprueba al entrar.
// La clave y la sal viven solo en .env.local (no sube a git).
//   node scripts/cifrar-hub.mjs                   → cifra con HUB_CLAVE
//   node scripts/cifrar-hub.mjs --claves          → crea una clave nueva si no hay (y la muestra)
//   node scripts/cifrar-hub.mjs --clave "frase"   → cambia la clave y vuelve a cifrar todo
//   node scripts/cifrar-hub.mjs --ver-clave       → muestra la clave actual
// Origen por defecto: ../Second Brain/07_Tableros/ (cámbialo con HUB_ORIGEN, la ruta de hub.json).
//   hub.json           → data/hub.enc.json            (proyectos, bitácora, grafo, galería: cambia a diario)
//   hub_recursos.json  → data/hub-recursos.enc.json   (plantillas HTML e íconos: solo se reescribe si cambió)
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENV = path.join(RAIZ, '.env.local');
const PALABRAS = ('jaguar condor colibri ceiba guadua frailejon paramo nevado volcan cafetal platano arepa bocadillo panela guayaba lulo ' +
  'mango maracuya cacao achiote totuma mochila sombrero ruana hamaca chiva bus tranvia cable puente faro muelle canoa balsa ' +
  'brujula mapa ancla vela remo timon atlas globo cometa luna sol estrella nube lluvia trueno rayo arcoiris niebla brisa ' +
  'roble cedro pino laurel orquidea girasol helecho musgo semilla raiz rama hoja fruto bosque selva llanura sabana desierto ' +
  'rio laguna cienaga cascada ola marea arrecife coral perla concha tortuga delfin ballena manati caiman iguana rana sapo ' +
  'oso danta venado zorro puma tigrillo nutria castor ardilla buho lechuza halcon aguila garza tucan loro guacamaya turpial ' +
  'piano guitarra tiple bandola tambor maraca gaita flauta violin trompeta acordeon marimba cumbia bambuco pasillo joropo ' +
  'motor rueda piston turbo radar antena satelite cohete orbita cometa reloj engranaje palanca resorte bombillo linterna ' +
  'cuaderno lapiz tinta papel libro biblioteca museo teatro plaza parque mercado tienda taller fabrica granja molino').split(' ');

function leerEnv() {
  const env = {};
  if (fs.existsSync(ENV)) {
    for (const l of fs.readFileSync(ENV, 'utf8').split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return { ...env, ...process.env };
}
function ponerEnv(pares) {
  let t = fs.existsSync(ENV) ? fs.readFileSync(ENV, 'utf8') : '';
  for (const [k, v] of Object.entries(pares)) {
    const re = new RegExp(`^\\s*${k}\\s*=.*$`, 'm');
    t = re.test(t) ? t.replace(re, `${k}=${v}`) : t.replace(/\s*$/, '\n') + `${k}=${v}\n`;
  }
  fs.writeFileSync(ENV, t.replace(/^\n/, ''));
}
const nuevaClave = () => Array.from({ length: 5 }, () => PALABRAS[crypto.randomInt(PALABRAS.length)]).join('-') + '-' + crypto.randomInt(10, 100);
const derivar = (clave, sal) => crypto.scryptSync(clave.normalize('NFC'), Buffer.from(sal, 'base64'), 32, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });

let env = leerEnv();
const i = process.argv.indexOf('--clave');
if (i > 0) {
  const c = (process.argv[i + 1] || '').trim();
  if (c.length < 12) { console.error('La clave debe tener al menos 12 caracteres (mejor una frase de varias palabras).'); process.exit(1); }
  ponerEnv({ HUB_CLAVE: c, HUB_SAL: crypto.randomBytes(16).toString('base64') });
  console.log('Clave del hub cambiada. Vuelvo a cifrar todo con ella.');
  env = leerEnv();
} else if (process.argv.includes('--claves') || !env.HUB_CLAVE) {
  if (!env.HUB_CLAVE) {
    const c = nuevaClave();
    ponerEnv({ HUB_CLAVE: c, HUB_SAL: crypto.randomBytes(16).toString('base64') });
    console.log(`\nClave nueva del hub (guárdala en tu gestor de contraseñas):\n\n    ${c}\n`);
  } else console.log('Ya hay clave del hub en .env.local (míralo con --ver-clave)');
  env = leerEnv();
  if (process.argv.includes('--claves')) process.exit(0);
}
if (process.argv.includes('--ver-clave')) { console.log(env.HUB_CLAVE); process.exit(0); }
if (!env.HUB_SAL) { ponerEnv({ HUB_SAL: crypto.randomBytes(16).toString('base64') }); env = leerEnv(); }

const llave = derivar(env.HUB_CLAVE, env.HUB_SAL);
const huella = crypto.createHash('sha256').update(llave).digest('hex').slice(0, 12);
const origen = env.HUB_ORIGEN || path.resolve(RAIZ, '..', 'Second Brain', '07_Tableros', 'hub.json');
if (!fs.existsSync(origen)) { console.error(`No encontré ${origen}. Corre primero ACTUALIZAR-TABLEROS.bat en el Second Brain.`); process.exit(1); }

function cifrar(texto, extra) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', llave, iv);
  const datos = Buffer.concat([c.update(texto, 'utf8'), c.final()]);
  return { v: 2, alg: 'aes-256-gcm+scrypt', ...extra, sal: env.HUB_SAL, iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), datos: datos.toString('base64') };
}

const texto = fs.readFileSync(origen, 'utf8');
const feed = JSON.parse(texto);
fs.writeFileSync(path.join(RAIZ, 'data', 'hub.enc.json'), JSON.stringify(cifrar(texto, { generado: feed.generado })) + '\n');
const b = feed.vistas?.bitacora;
console.log(`data/hub.enc.json cifrado · ${feed.proyectos.length} proyectos · ${b ? b.tareas.length + ' tareas en la bitácora · ' : ''}generado ${feed.generado}`);

const origenRec = path.join(path.dirname(origen), 'hub_recursos.json');
const destinoRec = path.join(RAIZ, 'data', 'hub-recursos.enc.json');
if (fs.existsSync(origenRec)) {
  const tRec = fs.readFileSync(origenRec, 'utf8');
  const sha = (JSON.parse(tRec).sha || crypto.createHash('sha256').update(tRec).digest('hex').slice(0, 16)) + '.' + huella;
  let previo = null;
  try { previo = JSON.parse(fs.readFileSync(destinoRec, 'utf8')).sha; } catch {}
  if (previo === sha) console.log('data/hub-recursos.enc.json sin cambios (plantillas e íconos iguales)');
  else {
    fs.writeFileSync(destinoRec, JSON.stringify(cifrar(tRec, { sha })) + '\n');
    console.log('data/hub-recursos.enc.json cifrado · plantillas e íconos');
  }
} else console.log('Aviso: no hay hub_recursos.json; las vistas del hub (tablero, bitácora, grafo, galería) quedan como estaban');

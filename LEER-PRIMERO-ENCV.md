# Paquete «Termómetro del SGSSS» para danielgaravito.co

Versión borrador, septiembre de 2026. Todo el material lleva marca de agua **BORRADOR** y el aviso
de «no citar sin contrastar».

## Qué trae

```
public/encv/index.html            ← página del producto (estática, autocontenida)
public/encv/tablero.html          ← el tablero interactivo (1 MB, sin dependencias externas)
public/encv/documentos/           ← DT-01 a DT-07 en PDF
public/encv/columnas/             ← las seis columnas en PDF y DOCX
public/encv/datos/cubo.json       ← todas las estimaciones, errores estándar, IC, deff y contrastes
content/blog/termometro-sgsss-encv.md   ← el post explicativo, con el frontmatter del sitio
data/proyecto-encv.json           ← fragmento para el hub (no reemplaza data/projects.json)
```

## Cómo integrarlo — tres pasos

**1. Copiar la carpeta estática.** Copie `public/encv/` completa dentro del `public/` del proyecto.
Next.js sirve `public/` tal cual, de modo que quedan vivas, sin tocar una sola ruta ni un solo
componente:

- `https://www.danielgaravito.co/encv/` → la página del producto
- `https://www.danielgaravito.co/encv/tablero.html` → el tablero
- `https://www.danielgaravito.co/encv/documentos/DT-01-la-formula-que-no-llega.pdf` → cada documento

**2. Copiar el post.** Copie `content/blog/termometro-sgsss-encv.md` a `content/blog/`. El
frontmatter ya usa las claves que lee `lib/posts.ts` (`title`, `date`, `excerpt`, `tags`,
`category`, `track`), con `category: "salud"` y `track: "analisis"`, que son valores que el sitio ya
usa. El post entra solo en `/blog` y en el RSS; no hay que registrar nada.

**3. Añadir la tarjeta del hub.** Abra `data/projects.json` y pegue el objeto que está bajo la
clave `proyecto` de `data/proyecto-encv.json` dentro del arreglo `projects`. El esquema coincide con
el de los proyectos existentes (`emoji`, `title`, `subtitle`, `description`, `tags`, `color`,
`status`, `statusCategory`, `url`, `progress`, `owners`, `roadmap`, `blockers`, `deadline`,
`public`, `slug`). El campo `url` apunta a `/encv/`.

## Nada más hace falta

No requiere instalar dependencias, no toca `app/`, no toca `components/`, no toca `lib/`. El
tablero y la página del producto son HTML autocontenido: el CSS y el JavaScript van en línea y los
datos van embebidos, de modo que funcionan sin red salvo por la hoja de fuentes de Google, que
degrada a la tipografía del sistema si no carga.

## Peso

Alrededor de 5,3 MB en total, dominados por el tablero (1 MB) y los trece PDF. Vercel los sirve como
estáticos; no cuentan contra el tiempo de build ni contra los límites de función.

## Después de integrar

Verifique en local con `npm run dev`:

1. `http://localhost:3000/encv/` abre la página del producto.
2. El botón «Abrir el tablero interactivo» carga el tablero y el explorador responde.
3. El post aparece en `/blog` filtrando por la categoría de salud.
4. La tarjeta aparece en `/hub` y su enlace lleva a `/encv/`.

## Cuando salga de borrador

Tres cambios, todos textuales:

1. En `public/encv/index.html`: borrar la regla `body::before` de la marca de agua, el `<span
   class="sello">Borrador</span>` de la cabecera y el bloque `<div class="aviso">`.
2. En `public/encv/tablero.html`: lo mismo —marca de agua, sello de la barra y `div.aviso-borrador`
   de la portada—. Mejor aún: regenerarlo desde el proyecto quitando esos bloques de
   `estilos.css` y `cuerpo.html`.
3. En el post y en los documentos: retirar la cita de advertencia inicial.

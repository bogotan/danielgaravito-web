# danielgaravito.co

> Sitio personal de **Daniel Garavito** — economía, ingeniería y analítica avanzada aplicadas a la salud inteligente.
> Dirigió Innovación y Analítica en ADRES hasta agosto de 2026; hoy investiga, enseña y asesora desde afuera.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Qué es este sitio

**danielgaravito.co** es la presencia pública de Daniel Garavito: la **mitad de autoría** de su trabajo. Investigación reproducible, escritos, libros, charlas y podcast. No es un CV y no es un catálogo comercial.

### El reparto con sinergistica.com

> **Si se factura, vive en Sinergística. Si se cita, vive en danielgaravito.co.**

| | danielgaravito.co | sinergistica.com |
|---|---|---|
| Qué es | autoría personal | la empresa |
| Qué muestra | estudios UPC, afiliados y concentración, escritos, libros, charlas, podcast | MÉDULA, El Rezago, Auditoría de una cifra, Termómetro, diplomado |
| Llamado a la acción | leer, citar, verificar | contratar |

Por eso **MÉDULA** y **El Rezago** ya no están en `data/projects.json`: son productos consultivos y viven en [sinergistica.com](https://sinergistica.com). El reparto completo está en `Sinergistica/docs/GTM.md` y la titularidad en `Sinergistica/docs/PROYECTOS.md`.

**Filosofía:**

- **Cada cifra rastreable hasta su fuente** — lo que se publica aquí se construye con datos abiertos y es reproducible contra su repositorio. Ver [`/etica`](https://danielgaravito.co/etica).
- **Radical transparencia** — si un proyecto está bloqueado, se dice. Si va al 35%, no al 100% para vender humo.
- **Sincronización con realidad** — los proyectos no viven en una diapositiva, viven en MEMORIA.md y de ahí fluyen a esta web.
- **Sin tracking, sin cookies invasivas** — tu visita no se mide ni se vende.

---

## Features

- **Hero** con rotación de citas y llamado a la acción
- **Proyectos** de autoría personal, con puente explícito a Sinergística para lo que se contrata
- **Timeline** de trayectoria (incluye el trabajo institucional en ADRES, en pasado)
- **En Acción** — charlas, podcast (con invitado y fecha) y publicaciones, incluidas las columnas de CONSULTORSALUD
- **Escritos** con MDX + frontmatter (gray-matter), segmentados en Análisis y Aula
- **SEO**: `sitemap.xml`, `robots.txt`, RSS, JSON-LD (Person, WebSite, BlogPosting) y `og.jpg` propio
- **`/etica`** — declaración de independencia y manejo de información
- **Dashboard de admin** privado (con auth ligera) para métricas
- **Lead form** conectado a Supabase
- **API routes** para contacto, leads, auth
- **Sync con ELEFANTE** — un script corre el pipeline `MEMORIA.md → data/projects.json → React` y actualiza el sitio en segundos

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    MEMORIA.md (ELEFANTE)                        │
│   Tabla "Proyectos Activos" · fuente única de verdad            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ npm run sync-projects
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              scripts/sync-projects.js                           │
│   Parsea markdown · resuelve aliases · preserva roadmap         │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              data/projects.json                                 │
│   Fuente tipada de proyectos · 10 proyectos · 63 roadmap steps  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ import en components/Projects.tsx
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              React 18 + Next.js App Router                      │
│   Acordeón · progress bars · bloqueos · owners                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ git push
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              Vercel — auto-deploy en ~2 min                     │
│   danielgaravito.co                                             │
└─────────────────────────────────────────────────────────────────┘
```

> ⚠️ **`data/projects.json` tiene ediciones manuales.** El reparto GTM (sacar MÉDULA, El Rezago,
> SIA, Sala de Inteligencia, Metro 22 y Furiosa) se hizo a mano sobre el JSON. Espeja esos cambios
> en `MEMORIA.md` **antes** de correr `npm run sync-projects`, o el sync los revierte. Ver `_meta.manualEditNote`.

**Protocolo completo:** [`../../../../01_FuerzaG_Sistema/documentacion/PROTOCOLO_SYNC_WEB_2026-04-20.md`](../../../01_FuerzaG_Sistema/documentacion/PROTOCOLO_SYNC_WEB_2026-04-20.md)

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14.2 (App Router) |
| Lenguaje | TypeScript 5.4 |
| UI | React 18.3 + Tailwind 3.4 |
| Contenido | Markdown + gray-matter + react-markdown |
| Datos | JSON tipado + Supabase (leads/auth) |
| Hosting | Vercel |
| Sync | Node.js scripts sobre `MEMORIA.md` |

---

## Cómo correr local

```bash
# Primera vez
npm install

# Desarrollo
npm run dev                 # http://localhost:3000

# Producción local
npm run build
npm start
```

---

## Scripts de sincronización

| Comando | Qué hace |
|---------|----------|
| `npm run sync-projects` | Lee MEMORIA.md y actualiza estado de proyectos |
| `npm run sync-timeline` | Lee `timeline_hitos.xlsx` (opcional) y genera `data/hitos.json` |
| `npm run sync-all` | Ambos en secuencia |

**Flujo semanal (domingos 8pm):**

```powershell
cd danielgaravito_next
npm run sync-all
git add .
git commit -m "sync: MEMORIA $(Get-Date -Format 'yyyy-MM-dd')"
git push
# Vercel deploya solo en ~2 min
```

---

## Estructura de archivos

```
danielgaravito_next/
├── app/                       # Next.js App Router
│   ├── admin/                 # Dashboard privado
│   ├── api/                   # Routes serverless (auth, contact, leads)
│   ├── blog/[slug]/           # Posts dinámicos desde MDX
│   ├── layout.tsx             # Shell global
│   ├── etica/                 # Independencia y manejo de información
│   ├── sitemap.ts · robots.ts # SEO
│   └── page.tsx               # Home (Hero + About + Projects + Timeline + Media)
├── components/
│   ├── Hero.tsx               # Cita rotativa + CTA
│   ├── Projects.tsx           # Tarjetas con acordeón "Cómo terminarlo"
│   ├── Timeline.tsx           # Hitos profesionales
│   ├── Media.tsx              # Charlas, podcast y publicaciones
│   ├── BlogExplorer.tsx       # Filtro y listado de posts
│   └── ...
├── content/blog/              # Markdown posts con frontmatter
├── data/
│   ├── projects.json          # ← generado/sincronizado desde MEMORIA (ojo: ver _meta)
│   └── hitos.json             # ← generado desde timeline_hitos.xlsx
├── scripts/
│   ├── sync-projects.js       # MEMORIA.md → projects.json
│   └── sync-timeline.js       # XLSX → hitos.json (opcional)
├── lib/supabase.ts            # Client Supabase
├── public/                    # Assets estáticos
├── styles/globals.css         # Tailwind + estilos base
├── setup-github.ps1           # Script de bootstrap del repo
└── package.json
```

---

## Deploy en Vercel

**Primera vez:**

1. Importa el repo desde https://vercel.com/new → `bogotan/danielgaravito-web`
2. Framework: Next.js (autodetectado)
3. Configura variables de entorno (ver `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. Deploy

**Deploys posteriores:** automáticos en cada `git push` a `main`.

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=una-clave-fuerte
```

Nunca commitees `.env.local` (ya está en `.gitignore`).

---

## Sistema FuerzaG

Este sitio forma parte de **FuerzaG v5.2**, un sistema de 43 agentes especializados que gestiona los proyectos, la memoria, la escritura, el análisis de datos y el deploy de Daniel Garavito. Los proyectos mostrados en esta web tienen como owners tanto personas como agentes:

- 🐙 PULPO construye código
- 🐜 HORMIGA escribe contenido
- 🦉 BÚHO investiga literatura
- 🦗 MANTIS analiza datos
- 🐘 ELEFANTE mantiene la memoria (fuente de verdad de este sitio)
- 🐝 ABEJA gestiona tareas y sprints
- 🐱 LINCE valida outputs (QA)
- 🦫 CASTOR deploya infraestructura
- G (ex-Georgina) orquesta todo

---

## Licencia

Copyright © 2026 Daniel Garavito. Todos los derechos reservados.

El código fuente de este sitio es **propietario**. La información sobre proyectos y publicaciones mostrada en el sitio es pública. El código no puede ser reutilizado sin autorización explícita del autor.

---

## Contacto

- **Web:** [danielgaravito.co](https://danielgaravito.co)
- **Empresa:** [sinergistica.com](https://sinergistica.com) — ahí se contrata
- **Email:** dagaravitoj@gmail.com
- **LinkedIn:** [Daniel Alfonso Garavito Jiménez](https://www.linkedin.com/in/daniel-alfonso-garavito-jim%C3%A9nez/)

---

<sub>Construido para mostrar que las ideas se terminan cuando se exponen a la luz.</sub>

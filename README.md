# danielgaravito.co

> Sitio personal de **Daniel Garavito** — Asesor de Innovación y Analítica en ADRES, ingeniero industrial, papá de Liam, y arquitecto del sistema multi-agente **FuerzaG**.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Qué es este sitio

**danielgaravito.co** es la presencia pública de Daniel Garavito. No es un CV. Es un **tablero vivo** donde cada proyecto muestra no solo qué hace sino **cómo se termina** — el roadmap paso a paso, los bloqueos activos, el progreso real. Todo sincronizado automáticamente con mi sistema personal de memoria (ELEFANTE) para que lo que ves aquí **sea siempre la verdad del día**.

**Filosofía:**

- **Radical transparencia** — si un proyecto está bloqueado, se dice. Si va al 35%, no al 100% para vender humo.
- **Roadmap abierto** — cada proyecto expone su plan de acción; cualquiera puede ver qué falta y ofrecerse a ayudar.
- **Sincronización con realidad** — los proyectos no viven en una diapositiva, viven en MEMORIA.md y de ahí fluyen a esta web.
- **Sin tracking, sin cookies invasivas** — tu visita no se mide ni se vende.

---

## Features

- **Hero** con rotación de citas y llamado a la acción
- **Proyectos activos** con acordeón "Ver cómo terminarlo" — roadmap paso a paso, progreso %, bloqueos, owners (humanos y agentes de FuerzaG), deadline
- **Timeline** de hitos profesionales (años, emojis, highlights)
- **Publicaciones** académicas y de divulgación
- **Blog** con MDX + frontmatter (gray-matter)
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

**Protocolo completo:** [`../../../../01_FuerzaG_Sistema/documentacion/PROTOCOLO_SYNC_WEB_2026-04-20.md`](../../../01_FuerzaG_Sistema/documentacion/PROTOCOLO_SYNC_WEB_2026-04-20.md)

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14.2 (App Router) |
| Lenguaje | TypeScript 5.4 |
| UI | React 18.3 + Tailwind 3.4 |
| Contenido | MDX + gray-matter + react-markdown |
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
│   └── page.tsx               # Home (Hero + Projects + Timeline + Publications)
├── components/
│   ├── Hero.tsx               # Cita rotativa + CTA
│   ├── Projects.tsx           # Tarjetas con acordeón "Cómo terminarlo"
│   ├── Timeline.tsx           # Hitos profesionales
│   ├── Publications.tsx       # Papers y divulgación
│   ├── BlogExplorer.tsx       # Filtro y listado de posts
│   └── ...
├── content/blog/              # Markdown posts con frontmatter
├── data/
│   ├── projects.json          # ← generado/sincronizado desde MEMORIA
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
- **Email:** bogotan@gmail.com
- **LinkedIn:** [linkedin.com/in/danielgaravito](https://linkedin.com/in/danielgaravito)

---

<sub>Construido con cariño para mostrar que las ideas se terminan cuando se exponen a la luz. Por Liam.</sub>

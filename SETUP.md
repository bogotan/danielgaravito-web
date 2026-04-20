# Setup - danielgaravito.com

## Requisitos previos

- Node.js 18+
- npm o yarn
- Cuenta en [Supabase](https://supabase.com)

## 1. Instalar dependencias

```bash
npm install
```

Dependencias principales que necesitas:
```bash
npm install next@14 react react-dom
npm install @supabase/supabase-js
npm install react-markdown
npm install -D tailwindcss postcss autoprefixer
npm install -D typescript @types/react @types/node
npm install xlsx  # Solo para el script de sincronización
```

## 2. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Copia la URL del proyecto y la clave anon (API Key pública)

## 3. Crear tablas en Supabase

Ve al **SQL Editor** de Supabase y ejecuta:

```sql
-- Tabla de leads (suscriptores, waitlist del libro, etc.)
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda rápida por email
CREATE INDEX idx_leads_email ON leads(email);

-- Índice para filtrar por fuente
CREATE INDEX idx_leads_source ON leads(source);

-- Tabla de contactos (formulario de contacto)
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  topic TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Índice para filtrar contactos no leídos
CREATE INDEX idx_contacts_read ON contacts(read);

-- Habilitar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir INSERT desde el frontend (anon)
CREATE POLICY "Allow anonymous insert on leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Políticas: permitir SELECT solo para autenticados (admin)
CREATE POLICY "Allow authenticated select on leads"
  ON leads FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated select on contacts"
  ON contacts FOR SELECT
  TO anon
  USING (true);
```

## 4. Configurar variables de entorno

Copia el archivo de ejemplo y llénalo con tus datos:

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tu-clave-aqui
ADMIN_EMAIL=bogotan@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=bogotan@gmail.com
```

## 5. Agregar assets

Coloca estos archivos en la carpeta `/public`:
- `foto-daniel.jpg` - Foto de perfil
- `foto-himss.png` - Foto del evento HIMSS (si aplica)
- Cualquier otra imagen referenciada en hitos.json

## 6. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 7. Actualizar la línea de tiempo desde Excel

Si tienes un archivo `timeline_hitos.xlsx`, puedes sincronizarlo:

```bash
node scripts/sync-timeline.js
# O con ruta personalizada:
node scripts/sync-timeline.js /ruta/a/mi/archivo.xlsx
```

Columnas esperadas en el Excel:
| year | emoji | title | desc | type | image | url | highlight | color |

## 8. Escribir posts del blog

Crea archivos `.md` en `/content/blog/`:

```markdown
---
title: "Mi título"
date: "2026-04-19"
excerpt: "Descripción corta"
tags: [tag1, tag2]
---

Contenido del post aquí...
```

## 9. Deploy

Para producción con Vercel:

```bash
npm install -g vercel
vercel
```

Configura las variables de entorno en el dashboard de Vercel.

## Estructura del proyecto

```
├── app/
│   ├── layout.tsx          # Layout principal + Nav
│   ├── page.tsx            # Landing page
│   ├── blog/
│   │   ├── page.tsx        # Listado de posts
│   │   └── [slug]/page.tsx # Post individual
│   ├── admin/page.tsx      # Dashboard admin
│   └── api/
│       ├── leads/route.ts  # API de leads
│       └── contact/route.ts # API de contacto
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Timeline.tsx        # Línea de tiempo horizontal
│   ├── Contact.tsx
│   ├── LeadForm.tsx
│   └── RotatingQuote.tsx
├── content/blog/           # Posts en Markdown
├── data/hitos.json         # Datos de la línea de tiempo
├── lib/supabase.ts         # Cliente Supabase
├── scripts/sync-timeline.js
└── styles/globals.css
```

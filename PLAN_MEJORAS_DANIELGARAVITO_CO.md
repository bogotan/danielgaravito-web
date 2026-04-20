# Plan de Mejoras — danielgaravito.co

> Fecha: 20 de abril de 2026
> Estado: PENDIENTE — No avanzar sin revisar este plan con Daniel
> Proyecto Vercel: danielgaravito (danielgaravito.vercel.app / www.danielgaravito.co)

---

## Estado actual del sitio

### Estructura existente
- **Menú**: Sobre mí | Proyectos | Trayectoria | Blog | Contacto
- **Hero**: Nombre, subtítulo ("Economista · Científico de Datos · Emprendedor Social"), quote rotativa, CTAs (Ver proyectos / Contactar), iconos sociales (LinkedIn, YouTube, TikTok, Instagram, Email)
- **Sobre mí**: Foto profesional, bio (ADRES, EducALL, NACER), stats animados (10+ Proyectos, 37 Agentes IA, 1 Misión)
- **Proyectos**: 6 tarjetas (NACER, SIA, FuerzaG, Jaguar en Tierra de Elefantes, Sala de Inteligencia ADRES, EducALL) con tags y estados (En desarrollo / Activo / Escribiendo / Fundador)
- **Trayectoria**: Timeline horizontal scrolleable con hitos (2023-2026): NACER, Sala de Inteligencia, HIMSS Executive Summit, EY Emprendedor Social, NTT DATA eAwards
- **Blog**: 1 solo post ("Por qué los datos son el nuevo petróleo del sector público", 15 abril 2026)
- **Contacto**: Temas para charlas (6 chips), links sociales, formulario de contacto, waitlist del libro "Un Jaguar en Tierra de Elefantes"
- **Footer**: © 2026 Daniel Garavito. Hecho con 💚 desde Colombia

### Problemas detectados
1. **Dominio .co no carga** — www.danielgaravito.co da error. Solo funciona via danielgaravito.vercel.app
2. **Blog vacío** — Solo 1 post, no refleja la cantidad de contenido que Daniel ha producido
3. **Sin sección de Charlas** — El TEDxCali y otras charlas no tienen visibilidad
4. **Contenido disperso** — Blogs de Sinergistik y EducALL están en sitios separados, no centralizados
5. **Sin SEO** — No hay meta tags optimizados, Open Graph, ni schema markup
6. **Sin Analytics** — Vercel Analytics está desactivado
7. **Prensa invisible** — Cobertura en Semana, Blu Radio, El Espectador no tiene sección dedicada
8. **Solo español** — Limita el alcance internacional (MIT Solve, HundrED, Falling Walls son audiencias globales)

---

## Mejoras propuestas

### PRIORIDAD ALTA (hacer primero)

#### 1. Arreglar dominio danielgaravito.co
- **Qué**: Verificar DNS en Vercel > Settings > Domains
- **Por qué**: Sin dominio propio funcionando, la credibilidad baja
- **Acción**: Revisar registros DNS (A record y CNAME) en el proveedor del dominio .co
- **Responsable**: Daniel (acceso al registrador de dominio) + 🐙 PULPO (configuración Vercel)
- **Tiempo estimado**: 15 minutos
- **Estado**: ⬜ Pendiente

#### 2. Nueva sección: Charlas (con YouTube embebido)
- **Qué**: Agregar al menú "Charlas" entre Trayectoria y Blog
- **Menú nuevo**: Sobre mí | Proyectos | Trayectoria | **Charlas** | Blog | Contacto
- **Diseño**: Grid de tarjetas, cada una con:
  - Thumbnail del video o iframe embebido de YouTube
  - Título de la charla
  - Evento/lugar (ej: TEDxCali, HIMSS, Campus Party)
  - Fecha
  - Duración
  - Tags temáticos
  - Botón "Ver charla" que abre la tarjeta expandida con video embebido
- **Videos confirmados**: TEDxCali (https://www.youtube.com/watch?v=o8WKbHBldPE) + 5 más que Daniel debe compartir
- **Responsable**: 🐙 PULPO (código) + Daniel (URLs de videos)
- **Tiempo estimado**: 2-3 horas de desarrollo
- **Estado**: ⬜ Pendiente — BLOQUEADO: Falta que Daniel pase los URLs de los 5+ videos

#### 3. Consolidar blogs de Sinergistik + EducALL
- **Qué**: Importar posts de los blogs de Sinergistik y EducALL al blog de danielgaravito.co
- **Cómo**: Cada post mantiene su contenido original pero se le agrega:
  - Tag de origen ("Sinergistik" / "EducALL" / "Personal" / "ADRES")
  - Fecha original de publicación
  - Link al post original (si sigue online)
- **Sistema de filtros**: Tags clickeables en la parte superior del blog para filtrar por categoría
- **Responsable**: 🐦‍⬛ CUERVO (extraer contenido) + 🐙 PULPO (implementar) + Daniel (URLs de blogs)
- **Tiempo estimado**: 3-4 horas
- **Estado**: ⬜ Pendiente — BLOQUEADO: Falta que Daniel pase los URLs de los blogs originales

#### 4. Activar Vercel Analytics
- **Qué**: Habilitar analytics desde Vercel dashboard
- **Por qué**: Cero visibilidad sobre visitantes, páginas más vistas, fuentes de tráfico
- **Acción**: Vercel Dashboard > danielgaravito > Analytics > Enable
- **Responsable**: Daniel (1 click) o 🐙 PULPO
- **Tiempo estimado**: 2 minutos
- **Estado**: ⬜ Pendiente

---

### PRIORIDAD MEDIA (segunda fase)

#### 5. SEO y Open Graph
- **Qué**: Agregar meta tags optimizados a cada página
- **Incluye**:
  - `<title>` dinámico por página
  - `<meta name="description">` específica por sección
  - Open Graph tags (og:title, og:description, og:image) para que se vea bien al compartir en redes
  - Twitter Card meta tags
  - Schema.org markup (Person, Article, VideoObject)
  - Sitemap.xml y robots.txt
- **Impacto**: Mejor ranking en Google, mejores previews al compartir en LinkedIn/Twitter
- **Responsable**: 🐦 COLIBRÍ (estrategia SEO) + 🐙 PULPO (implementación)
- **Tiempo estimado**: 2-3 horas
- **Estado**: ⬜ Pendiente

#### 6. Sección de Prensa/Medios
- **Qué**: Carrusel o grid de logos de medios que han cubierto a Daniel
- **Medios confirmados**: Semana, Blu Radio, El Espectador, La Opinión, ImpactoTIC, Latin Pymes, El Economista (España), SerColombiano, ifm noticias, RECON Colombia, TEDx Talks
- **Diseño**: Logos en fila con efecto hover que muestra el titular, link al artículo original
- **Ubicación**: Después de "Sobre mí" o como sección independiente "En medios"
- **Responsable**: 🐙 PULPO + 🦚 PAVO REAL (curación de la narrativa)
- **Tiempo estimado**: 2 horas
- **Estado**: ⬜ Pendiente

#### 7. Blog con filtros y categorías
- **Qué**: Sistema de tags clickeables en /blog para filtrar contenido
- **Categorías propuestas**: Salud Pública, Datos, Innovación, EducALL, Sinergistik, Emprendimiento, IA, Personal
- **Diseño**: Chips/pills en la parte superior, estilo similar a los tags que ya existen en las tarjetas de proyectos
- **Responsable**: 🐙 PULPO
- **Tiempo estimado**: 1-2 horas
- **Estado**: ⬜ Pendiente

#### 8. Premios y reconocimientos más visibles
- **Qué**: Sección dedicada o banner con los premios principales
- **Premios clave**:
  - Copa Mundial del Emprendimiento Colombia 2021 (ganador absoluto)
  - Entrepreneurship World Cup — Final mundial Arabia Saudita
  - EY Emprendedor Social del Año 2023
  - MIT Solve finalist
  - HundrED innovación educativa global
  - Falling Walls
  - NTT DATA eAwards semifinalista
- **Diseño**: Iconos/badges con año y nombre del premio
- **Ubicación**: Dentro de "Sobre mí" o sección propia
- **Responsable**: 🐙 PULPO + 🦚 PAVO REAL
- **Tiempo estimado**: 1-2 horas
- **Estado**: ⬜ Pendiente

---

### PRIORIDAD BAJA (tercera fase)

#### 9. Hero con TEDx destacado
- **Qué**: Banner o CTA secundario en el hero que lleve al TEDxCali
- **Por qué**: Es tu pieza de contenido más poderosa, debería ser lo primero que la gente vea
- **Diseño**: "🎤 Mira mi TEDx Talk" como badge o mini-banner debajo de la bio
- **Responsable**: 🐙 PULPO
- **Tiempo estimado**: 30 min
- **Estado**: ⬜ Pendiente

#### 10. Newsletter/suscripción general
- **Qué**: Formulario de suscripción para recibir nuevo contenido (posts, charlas, actualizaciones)
- **Diferencia con waitlist del libro**: El waitlist es solo para el libro. Esto es para todo el contenido de Daniel
- **Herramienta sugerida**: Buttondown, Resend, o Mailchimp free tier
- **Ubicación**: Footer o sección dedicada en el blog
- **Responsable**: 🐦 COLIBRÍ (estrategia) + 🐙 PULPO (implementación)
- **Tiempo estimado**: 2 horas
- **Estado**: ⬜ Pendiente

#### 11. Modo bilingüe (ES/EN)
- **Qué**: Versión en inglés del sitio para audiencia internacional
- **Por qué**: MIT Solve, HundrED, Falling Walls, EWC son audiencias globales que buscarán "Daniel Garavito" en inglés
- **Cómo**: Toggle ES/EN en el nav, contenido duplicado traducido
- **Responsable**: 🐙 PULPO + 🐜 HORMIGA (traducción con voz de Daniel, no genérica)
- **Tiempo estimado**: 6-8 horas (full site)
- **Estado**: ⬜ Pendiente — Evaluar si vale la pena el esfuerzo ahora

#### 12. Performance y accesibilidad
- **Qué**: Optimizar imágenes (WebP/AVIF), lazy loading, contraste de colores, alt texts
- **Por qué**: Mejor Lighthouse score, mejor SEO, más inclusivo
- **Responsable**: 🐙 PULPO
- **Tiempo estimado**: 2 horas
- **Estado**: ⬜ Pendiente

---

## Información que Daniel debe proveer antes de avanzar

| # | Qué necesito | Para qué | Estado |
|---|-------------|----------|--------|
| 1 | URLs de los 5+ videos de YouTube de charlas | Sección Charlas | ⬜ Pendiente |
| 2 | URL del blog de Sinergistik | Consolidar contenido al blog | ⬜ Pendiente |
| 3 | URL del blog de EducALL (si tiene blog aparte de educall.co) | Consolidar contenido al blog | ⬜ Pendiente |
| 4 | Otros blogs o posts sueltos que quiera traer | Consolidar contenido al blog | ⬜ Pendiente |
| 5 | Acceso al código fuente del proyecto (repo o carpeta local) | Implementar cambios | ⬜ Pendiente |
| 6 | Datos de acceso al registrador del dominio .co | Arreglar DNS | ⬜ Pendiente |

---

## Orden de ejecución sugerido

```
FASE 1 (esta semana):
  1. Arreglar dominio .co ← Daniel provee acceso DNS
  2. Activar Analytics ← 1 click en Vercel
  3. Crear sección Charlas ← Daniel provee URLs de videos

FASE 2 (próxima semana):
  4. Consolidar blogs ← Daniel provee URLs/contenido
  5. Agregar filtros al blog
  6. SEO + Open Graph

FASE 3 (cuando haya espacio):
  7. Sección de prensa
  8. Premios más visibles
  9. Hero con TEDx
  10. Newsletter
  11. Bilingüe
  12. Performance
```

---

## RECORDATORIO IMPORTANTE

> ⚠️ **ANTES de publicar o hacer deploy de cualquier cambio:**
> 1. Daniel debe revisar y aprobar este plan
> 2. Daniel debe proveer los URLs y contenidos listados arriba
> 3. Daniel debe dar acceso al código fuente del proyecto
> 4. Hacer los cambios en un preview deployment primero, NO directo a producción
> 5. Daniel revisa el preview y aprueba antes del deploy final

---

*Generado por 🐝 ABEJA + Georgina — FuerzaG v4.2*
*Agentes involucrados: 🦚 PAVO REAL (estrategia) · 🐙 PULPO (construcción) · 🐦 COLIBRÍ (SEO/growth) · 🐦‍⬛ CUERVO (recolección) · 🐜 HORMIGA (contenido)*

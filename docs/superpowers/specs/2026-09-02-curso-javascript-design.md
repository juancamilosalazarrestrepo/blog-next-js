# Sección de Cursos — Curso de JavaScript (primera entrega)

## Contexto

El sitio ya tiene una ruta `/cursos` (`src/pages/cursos/index.jsx`) que hoy en realidad
muestra certificados, no cursos. El blog (`src/pages/blog/`) ya resuelve un problema
similar al que necesitamos: contenido largo en Markdown, renderizado vía
`next-mdx-remote`, con un pipeline genérico en `lib/mdx.js` (funciones `getFiles`,
`getFileBySlug`, `getAllFilesFrontMatter` parametrizadas por `type`, que mapea a una
carpeta bajo `data/<type>/`).

Esta spec cubre la primera entrega de una sección de cursos: un curso de JavaScript
centrado en lógica de programación y funciones básicas, organizado por capítulos.
Cursos futuros (y capítulos adicionales de este mismo curso) se agregan después,
siguiendo el mismo patrón.

## Objetivo

Crear `/cursos/javascript` como landing de un curso con 6 capítulos, cada uno en su
propia URL, con teoría explicada de forma sencilla, diagramas SVG propios y ejemplos
de código, más navegación entre capítulos.

## Arquitectura

### Contenido (MDX)

- `data/cursos/javascript/01-logica-de-programacion.mdx`
- `data/cursos/javascript/02-variables-y-tipos-de-datos.mdx`
- `data/cursos/javascript/03-operadores.mdx`
- `data/cursos/javascript/04-condicionales.mdx`
- `data/cursos/javascript/05-bucles.mdx`
- `data/cursos/javascript/06-funciones-y-scope.mdx`

El slug de la URL es el nombre de archivo sin el prefijo numérico ni la extensión
(p. ej. `01-logica-de-programacion.mdx` → `/cursos/javascript/logica-de-programacion`).
El prefijo numérico solo ordena los archivos en disco; el orden real de navegación lo
da el campo `order` del frontmatter.

Frontmatter de cada capítulo:

```yaml
---
title: "¿Qué es programar? Lógica de programación"
subtitle: "Cómo pensar como programador antes de escribir una sola línea de código"
order: 1
duration: "12 min"
keywords: ["logica de programacion", "curso de javascript", "aprender a programar"]
---
```

Se reutiliza `lib/mdx.js` sin modificarlo: `getFiles("cursos/javascript")`,
`getFileBySlug("cursos/javascript", slug)`, `getAllFilesFrontMatter("cursos/javascript")`
ya funcionan porque son genéricos por `type` (path relativo dentro de `data/`).

`getFileBySlug` actualmente solo copia campos conocidos (`title`, `image`, `thumb`,
`subtitle`, `imageOG`, `date`, `keywords`) del frontmatter a la respuesta — no copia
`order` ni `duration`. Como la página de capítulo necesita esos dos campos para
construir la navegación prev/next y mostrarlos en el header, `getFileBySlug` se
extiende para incluir también `order` y `duration` en el objeto `frontMatter` que
retorna. Es un cambio aditivo, no rompe el uso existente en el blog.

### Componentes nuevos

- **`src/components/CourseLayout.jsx`**: recibe la lista de capítulos (de
  `getAllFilesFrontMatter`) y el slug actual. Renderiza:
  - Sidebar (desktop, fijo a la izquierda) con los 6 capítulos numerados, resaltando
    el actual; en mobile colapsa a un `<select>`/dropdown simple.
  - Breadcrumb simple: `Cursos / JavaScript / Capítulo N`.
  - El `children` (contenido MDX) en el área principal.
  - Footer de navegación: botones "← Capítulo anterior" / "Siguiente capítulo →",
    deshabilitados/omitidos en los extremos (capítulo 1 no tiene "anterior", capítulo
    6 no tiene "siguiente" y en su lugar muestra un CTA de cierre de curso).
- **Ampliación de `src/components/MDXComponents.tsx`**: se agregan al mapa de
  componentes disponibles dentro del MDX:
  - `Callout` — caja de texto destacada (tip/nota), con una prop `type` (`"tip" |
    "nota"`) que cambia color/ícono.
  - `VariableDiagram` — SVG: variable representada como caja etiquetada con un valor
    dentro (para el capítulo de variables).
  - `ConditionalDiagram` — SVG: diagrama de flujo de una decisión if/else con dos
    ramas.
  - `LoopDiagram` — SVG: diagrama de ciclo con flecha de retorno y condición de
    salida.
  - `FunctionDiagram` — SVG: caja de función con flechas de entrada (parámetros) y
    salida (return).

  Todos son componentes de una sola sección (sin estado, sin dependencias externas),
  usan colores inline consistentes con la paleta ya usada en las páginas premium del
  blog (`#0072ff`, `#7c3aed`, `#10b981`, `#f59e0b`).

### Páginas

- **`src/pages/cursos/javascript/index.jsx`** (landing del curso):
  - `getStaticProps` llama `getAllFilesFrontMatter("cursos/javascript")` y ordena por
    `order`.
  - Hero: título del curso, subtítulo, duración total estimada (suma de `duration` de
    los 6 capítulos), botón "Empezar curso" → primer capítulo por `order`.
  - Sección "Qué vas a aprender": lista corta con los temas principales.
  - Temario: 6 tarjetas numeradas (título, resumen de una línea tomado de
    `subtitle`, `duration`), cada una linkeando a su capítulo.
  - SEO propio vía `<SEO />` orientado a "curso de JavaScript gratis / lógica de
    programación".

- **`src/pages/cursos/javascript/[capitulo].jsx`** (capítulo, ruta dinámica):
  - Sigue el patrón de `src/pages/blog/[slug].tsx`: `getStaticPaths` (`fallback:
    false`) enumera los slugs vía `getFiles("cursos/javascript")`, `getStaticProps`
    usa `getFileBySlug("cursos/javascript", slug)` **y además** llama
    `getAllFilesFrontMatter("cursos/javascript")` para pasarle la lista completa de
    capítulos al `CourseLayout` (necesaria para sidebar y prev/next).
  - Renderiza `<CourseLayout>` con `<MDXRemote {...mdxSource} components={MDXComponents} />`
    dentro, envuelto en `article.prose` (mismo patrón tipográfico del blog).
  - SEO por capítulo vía `<SEO />` (`title`, `description` = `subtitle`, `keywords`).

### Cambios en `/cursos` (índice existente)

`src/pages/cursos/index.jsx` no se reescribe: se le agrega, antes del grid de
certificados, una sección "Cursos" con una sola tarjeta hacia
`/cursos/javascript` (título, descripción corta, duración total, botón "Ver curso").
El resto de la página (banner, certificados, `LogosSlider`) queda igual.

## Fuera de alcance (próximas entregas)

- Capítulos adicionales del curso de JavaScript (arrays, objetos, DOM, async, etc.).
- Otros cursos (Python, React, etc.).
- Progreso guardado por usuario, quizzes, sistema de autenticación/inscripción.
- Cambios al pipeline `lib/mdx.js` más allá de exponer `order`/`duration`.

## Testing / verificación

- `npm run build` (o `next build`) para confirmar que `getStaticPaths` genera las 6
  rutas de capítulo sin error y que el frontmatter de cada MDX es válido.
- Verificación manual en navegador (dev server): landing del curso, navegación
  prev/next entre los 6 capítulos, sidebar resaltando el capítulo activo, vista
  mobile del sidebar/dropdown, y que los diagramas SVG rendericen correctamente
  dentro del MDX.

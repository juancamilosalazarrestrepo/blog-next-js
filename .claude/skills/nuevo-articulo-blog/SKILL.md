---
name: nuevo-articulo-blog
description: >
  Workflow completo para publicar un nuevo artículo en el blog de Salazar Code (Next.js).
  Úsala siempre que el usuario traiga un artículo en .md o quiera publicar contenido nuevo
  en el blog — convierte el texto, crea una página visual JSX premium, gestiona la imagen
  de portada y garantiza el SEO completo. Actívala cuando el usuario diga "quiero publicar
  un artículo", "tengo un post nuevo", "implementa este artículo", "crea el post de X",
  o cuando pegue contenido markdown con intención de publicarlo.
---

# Publicar un Nuevo Artículo en Salazar Code

Este workflow cubre todo: desde el .md crudo hasta el artículo publicado con diseño
premium, SEO completo e imagen de portada.

---

## PASO 1 — Generar el slug y el frontmatter MDX

El slug define la URL y el nombre de todos los archivos del artículo. Debe ser:
- En minúsculas, palabras separadas por guiones
- Incluir las keywords principales del tema
- Ejemplo: `agentes-ia-programacion-2026`, `nextjs-server-components-guia`

Crear `data/posts/[SLUG].mdx` con este frontmatter JSON exacto:

```
---
{
  "title": "Título completo del artículo",
  "subtitle": "Descripción de 150-160 caracteres para SEO y card del blog",
  "image": "/images/[SLUG].webp",
  "imageOG": "/images/[SLUG].webp",
  "thumb": "/images/[SLUG].webp",
  "date": "YYYY-MM-DD",
  "keywords": ["keyword1", "keyword2", "keyword3", "...hasta 8-10 keywords"]
}
---
```

Después del frontmatter va el contenido del artículo en markdown/MDX estándar.

**Sobre las keywords:** deben ser términos que alguien buscaría en Google para encontrar
ese artículo. Mezclar términos amplios ("desarrollo web") con específicos ("Next.js 16
caching") y de cola larga ("cómo usar agentes de IA en 2026").

---

## PASO 2 — Crear la página visual JSX

En lugar del renderizado MDX plano, crear `src/pages/blog/[SLUG].jsx`. En Next.js, las
rutas estáticas tienen precedencia sobre las dinámicas, así que este archivo sirve en
`/blog/[SLUG]` automáticamente.

### Estructura obligatoria de la página

```jsx
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";

export default function NombreArticulo() {
  return (
    <Layout>
      <Head>
        {/* SEO básico — el componente global SEO ya maneja el resto via MDX,
            aquí solo ponemos lo mínimo para la ruta JSX */}
        <title>[Título] | Juan Camilo Salazar</title>
        <meta name="description" content="[subtitle]" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="YYYY-MM-DD" />
      </Head>

      {/* 1. HERO con imagen real */}
      {/* 2. BANNER de estadísticas (si aplica) */}
      {/* 3. CONTENIDO: secciones, cards, tabla, roadmap */}
      {/* 4. FAQ con acordeón */}
      {/* 5. CTA final */}
    </Layout>
  );
}
```

### Secciones visuales recomendadas

**Hero con imagen:**
```jsx
<div style={{ position: "relative", overflow: "hidden" }}>
  <Image
    src="/images/[SLUG].webp"
    alt="[descripción]"
    width={1280}
    height={500}
    priority
    style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center" }}
  />
  {/* Overlay oscuro para legibilidad del texto */}
  <div style={{ position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(10,10,26,0.65) 0%, rgba(10,10,26,0.88) 100%)"
  }} />
  {/* Texto del hero encima del overlay */}
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", zIndex: 1 }}>
    <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
      {/* Tags, título, subtítulo, autor, fecha */}
    </div>
  </div>
</div>
```

**Paleta de colores del proyecto:**
- Fondo oscuro hero: `#0a0a1a`, `#1a1a2e`, `#0d1b4b`
- Azul primario: `#0072ff`
- Azul degradado: `linear-gradient(135deg, #0072ff, #0d47a1)`
- Texto principal: `#1a1a2e`
- Texto secundario: `#4b5563`, `#6b7280`
- Fondo secciones alternas: `#f8fafc`
- Border suave: `#e5e7eb`

**Cards de herramientas/tecnologías:**
- Fondo `#fff`, border `1px solid #e5e7eb`, border-radius `20px`
- Sombra: `0 4px 20px rgba(0,0,0,0.04)`
- Grid con logo + contenido en dos columnas

**Tabla comparativa:**
- Header: `background: linear-gradient(135deg, #1a1a2e, #0d1b4b)`, texto `#94a3b8`
- Filas alternas: `#fff` / `#f8fafc`
- Badges en celdas: gradiente azul, border-radius `20px`

**Roadmap visual (pasos con línea vertical):**
```jsx
// Línea vertical conectora
<div style={{ position: "absolute", left: "27px", top: "40px", bottom: "40px",
  width: "2px", background: "linear-gradient(to bottom, #0072ff, #7c3aed, #0ea5e9)"
}} />
// Cada paso: círculo de color + card con período, herramienta, descripción
```

**FAQ con acordeón:**
```jsx
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left",
        padding: "20px 0", background: "none", border: "none", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{faq.q}</span>
        <span style={{ /* círculo + / - */ }}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={{ color: "#4b5563", lineHeight: 1.7, paddingBottom: "20px" }}>{faq.a}</p>}
    </div>
  );
}
```

**CTA final:**
```jsx
<div style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
  borderRadius: "24px", padding: "48px 40px", textAlign: "center" }}>
  <a href="/blog" style={{ background: "linear-gradient(135deg, #0072ff, #0d47a1)",
    color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: "12px",
    textDecoration: "none" }}>
    Ver más artículos →
  </a>
</div>
```

---

## PASO 3 — Imagen de portada

La imagen va en `public/images/[SLUG].webp` (o .jpg/.png, Next.js optimiza automáticamente).

**Resolución recomendada:** 1280×500px — el hero muestra máximo 420px de alto con
`objectFit: cover`, así que más altura solo añade peso sin beneficio visual.

**Naming SEO:** usar exactamente el mismo slug del artículo.
Ejemplo: slug `agentes-ia-programacion-2026` → imagen `agentes-ia-programacion-2026.webp`

### Opciones para conseguir la imagen

**Opción A — Generar con Gemini (recomendado):**
Usar este prompt base en Google Gemini o Imagen:
```
Crea una imagen como portada para mi artículo que se llama "[TÍTULO DEL ARTÍCULO]".
Quiero que salgan los logos de las tecnologías/herramientas más relevantes del tema
y que sea bien tecnológico, estilo futurista con ciudad de fondo, circuitos,
colores azul y cyan neón, tipografía bold en la parte superior con el título.
```

**Opción B — Subir imagen al chat:**
El usuario sube la imagen directamente al chat. El agente la guarda en
`public/images/[SLUG].webp` con el nombre SEO correcto.

**Opción C — Copiar manualmente:**
El usuario copia la imagen a `public/images/` con el nombre que prefiera y le indica
el nombre al agente para actualizar las referencias en el frontmatter y la página JSX.

### Logos de tecnologías desde CDN (para usar en cards)
- **Claude/Anthropic:** `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/2048px-Claude_AI_logo.svg.png`
- **GitHub:** `https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png`
- **Google Developers:** `https://www.gstatic.com/devrel-devsite/prod/v45f61267e62d3be6b6c1d29b33450d34b574d7d11e12a5c95acf91b63e3c3f60/developers/images/touchicon-180.png`
- **Cursor:** `https://www.cursor.com/favicon.ico`
- **Codeium/Windsurf:** `https://codeium.com/favicon.ico`

Siempre agregar `onError` a los `<img>` de logos por si falla el CDN:
```jsx
onError={(e) => { e.target.style.display = "none";
  e.target.parentNode.innerHTML = `<span style="font-size:1.8rem">${emoji}</span>`; }}
```

---

## PASO 4 — Verificar SEO

El sistema extrae automáticamente `date` y `keywords` del frontmatter via `lib/mdx.js`
y los pasa al componente `SEO.jsx`, que genera:
- `<meta name="description">` y `<meta name="keywords">`
- Open Graph completo (og:title, og:description, og:image, og:type article)
- Twitter Card con imagen
- Schema.org `BlogPosting` con `datePublished`
- URL canónica

**Checklist antes de publicar:**
- [ ] `date` en formato `YYYY-MM-DD` en el frontmatter
- [ ] `keywords` array con 6-10 términos relevantes
- [ ] `subtitle` entre 140-160 caracteres (es el meta description)
- [ ] `NEXT_PUBLIC_SITE_URL` configurado en `.env` con el dominio real
- [ ] Imagen de portada en `public/images/` con nombre SEO

---

## PASO 5 — El artículo aparece primero automáticamente

`getAllFilesFrontMatter()` en `lib/mdx.js` ordena todos los posts por `date` descendente.
Poner la fecha del día de publicación en el frontmatter es suficiente.

---

## Notas técnicas del proyecto

| Archivo | Rol |
|---------|-----|
| `data/posts/[SLUG].mdx` | Contenido + frontmatter (SEO, metadatos) |
| `src/pages/blog/[SLUG].jsx` | Página visual premium (toma precedencia sobre `[slug].tsx`) |
| `src/pages/blog/[slug].tsx` | Ruta dinámica para artículos MDX sin página JSX propia |
| `src/pages/blog/index.jsx` | Listado del blog, cards 260px height, objectFit cover |
| `lib/mdx.js` | Lee frontmatter: title, subtitle, image, thumb, imageOG, date, keywords |
| `src/components/SEO.jsx` | Genera todos los meta tags, OG, Twitter Card, Schema.org |
| `public/images/` | Imágenes estáticas — Next.js Image las optimiza a webp automáticamente |

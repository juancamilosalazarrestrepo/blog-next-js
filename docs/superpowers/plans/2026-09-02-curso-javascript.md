# Curso de JavaScript (sección de cursos) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/cursos/javascript`, a 6-chapter JavaScript course (programming logic through basic functions), reusing the blog's existing MDX pipeline (`lib/mdx.js`, `next-mdx-remote`), with custom SVG diagrams and a chapter sidebar/prev-next navigation.

**Architecture:** Course chapters are MDX files under `data/cursos/javascript/`, rendered through the existing generic `lib/mdx.js` helpers (parameterized by `type`, already works for any folder under `data/`). A new `CourseLayout` component adds sidebar navigation and prev/next links around the MDX content. New reusable diagram/callout components are added to the MDX component map so chapter content can drop them in declaratively. The existing `/cursos` index page gets one new card pointing at the course; nothing else on it changes.

**Tech Stack:** Next.js (Pages Router), `next-mdx-remote`, `gray-matter`, `mdx-prism`, React (JSX/TSX), Tailwind (utility classes) + inline styles (matches existing premium page pattern in `src/pages/blog/*.jsx`).

## Global Constraints

- No test framework exists in this repo (`package.json` scripts are `dev`, `build`, `start`, `lint` only) — verification for every task is `npm run build` (must succeed, and for path-generating tasks must list the expected static paths) plus manual check via the dev server, not automated unit tests.
- Reuse `lib/mdx.js` as-is except for the one additive change in Task 1. Do not restructure its `type`-based path resolution.
- Content language is Spanish, matching the rest of the site.
- Visual style must match the existing premium blog pages (`src/pages/blog/vision-computadora-mediapipe.jsx`): inline styles, palette `#0072ff` / `#7c3aed` / `#10b981` / `#f59e0b` / `#ef4444`, dark hero gradients `#0a0a1a` → `#1a1a2e`.
- Chapter URL slugs must NOT include the numeric filename prefix (e.g. file `01-logica-de-programacion.mdx` → URL `/cursos/javascript/logica-de-programacion`). This stripping must be applied consistently everywhere a slug is read from `lib/mdx.js` output.

---

### Task 1: Expose `order` and `duration` in `lib/mdx.js`

**Files:**
- Modify: `lib/mdx.js:37-51`

**Interfaces:**
- Produces: `getFileBySlug(type, slug, locale)` now returns `frontMatter.order: number | null` and `frontMatter.duration: string | null` in addition to the existing fields (`wordCount`, `readingTime`, `slug`, `title`, `image`, `thumb`, `subtitle`, `imageOG`, `date`, `keywords`).

- [ ] **Step 1: Edit the returned `frontMatter` object**

In `lib/mdx.js`, replace the `return` block of `getFileBySlug` (currently lines 37-51):

```js
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      title: data.title,
      image: data.image,
      thumb: data.thumb,
      subtitle: data.subtitle,
      imageOG: data.imageOG,
      date: data.date || null,
      keywords: data.keywords || [],
      order: data.order ?? null,
      duration: data.duration || null,
    },
  };
```

- [ ] **Step 2: Verify the existing blog pages still build**

Run: `npm run build`
Expected: build completes with exit code 0 (blog pages that don't use `order`/`duration` in frontmatter are unaffected since the fields are simply `null`).

- [ ] **Step 3: Commit**

```bash
git add lib/mdx.js
git commit -m "feat: exponer order y duration en getFileBySlug para soportar capitulos de curso"
```

---

### Task 2: Create course diagram and callout components

**Files:**
- Create: `src/components/CourseDiagrams.tsx`

**Interfaces:**
- Produces: named exports `Callout`, `VariableDiagram`, `ConditionalDiagram`, `LoopDiagram`, `FunctionDiagram`, all React function components, all rendering self-contained inline SVG/HTML (no external assets, no state).

- [ ] **Step 1: Write the component file**

```tsx
import { ReactNode } from "react";

export function Callout({
  type = "tip",
  children,
}: {
  type?: "tip" | "nota";
  children: ReactNode;
}) {
  const isTip = type === "tip";
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        background: isTip ? "#ecfdf5" : "#eff6ff",
        border: `1px solid ${isTip ? "#10b981" : "#0072ff"}`,
        borderRadius: "10px",
        padding: "16px 18px",
        margin: "20px 0",
      }}
    >
      <span style={{ fontSize: "20px", lineHeight: 1 }}>{isTip ? "💡" : "📌"}</span>
      <div style={{ fontSize: "0.95rem", color: "#1f2937", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export function VariableDiagram({
  name = "edad",
  value = "25",
  type = "number",
}: {
  name?: string;
  value?: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 420 140" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
        <text x="210" y="20" textAnchor="middle" fontSize="13" fill="#64748b" fontFamily="monospace">
          {`let ${name} = ${value};`}
        </text>
        <rect x="30" y="40" width="180" height="80" rx="12" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="120" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0072ff" fontFamily="sans-serif">
          {name}
        </text>
        <text x="120" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="sans-serif">
          (la caja / variable)
        </text>
        <line x1="210" y1="80" x2="260" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#varArrow)" />
        <rect x="270" y="50" width="120" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="330" y="77" textAnchor="middle" fontSize="16" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          {value}
        </text>
        <text x="330" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="sans-serif">
          {type}
        </text>
        <defs>
          <marker id="varArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function ConditionalDiagram({
  condition = "edad >= 18",
  ifTrue = "Es mayor de edad",
  ifFalse = "Es menor de edad",
}: {
  condition?: string;
  ifTrue?: string;
  ifFalse?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 240" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        <rect x="170" y="10" width="140" height="46" rx="10" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="240" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0072ff" fontFamily="sans-serif">
          Inicio
        </text>
        <line x1="240" y1="56" x2="240" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#condArrow)" />
        <polygon points="240,80 320,125 240,170 160,125" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="240" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e" fontFamily="monospace">
          {condition}
        </text>
        <text x="240" y="137" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="sans-serif">
          ¿verdadero?
        </text>

        <line x1="160" y1="125" x2="70" y2="125" stroke="#10b981" strokeWidth="2" markerEnd="url(#condArrowGreen)" />
        <text x="112" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          true
        </text>
        <rect x="10" y="145" width="120" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <foreignObject x="14" y="149" width="112" height="52">
          <div style={{ fontSize: 10, textAlign: "center", color: "#065f46", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {ifTrue}
          </div>
        </foreignObject>

        <line x1="320" y1="125" x2="410" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#condArrowRed)" />
        <text x="365" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444" fontFamily="sans-serif">
          false
        </text>
        <rect x="350" y="145" width="120" height="60" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <foreignObject x="354" y="149" width="112" height="52">
          <div style={{ fontSize: 10, textAlign: "center", color: "#991b1b", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {ifFalse}
          </div>
        </foreignObject>

        <defs>
          <marker id="condArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
          </marker>
          <marker id="condArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
          <marker id="condArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function LoopDiagram({
  condition = "i < 5",
  body = "console.log(i)",
}: {
  condition?: string;
  body?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 420 220" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
        <polygon points="210,10 280,55 210,100 140,55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="210" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e" fontFamily="monospace">
          {condition}
        </text>

        <line x1="210" y1="100" x2="210" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#loopArrowGreen)" />
        <text x="230" y="122" fontSize="10" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          true
        </text>
        <rect x="130" y="140" width="160" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <foreignObject x="134" y="144" width="152" height="42">
          <div style={{ fontSize: 10, textAlign: "center", color: "#065f46", fontFamily: "monospace", lineHeight: 1.3 }}>
            {body}
          </div>
        </foreignObject>

        <path d="M130,165 C40,165 40,55 140,55" fill="none" stroke="#0072ff" strokeWidth="2" markerEnd="url(#loopArrowBlue)" />

        <line x1="280" y1="55" x2="360" y2="55" stroke="#ef4444" strokeWidth="2" markerEnd="url(#loopArrowRed)" />
        <text x="320" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444" fontFamily="sans-serif">
          false
        </text>
        <text x="320" y="72" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="sans-serif">
          fin del bucle
        </text>

        <defs>
          <marker id="loopArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
          <marker id="loopArrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#0072ff" />
          </marker>
          <marker id="loopArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function FunctionDiagram({
  name = "sumar",
  params = ["a", "b"],
  returns = "a + b",
}: {
  name?: string;
  params?: string[];
  returns?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 180" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        {params.map((p, i) => (
          <g key={p}>
            <text x="20" y={50 + i * 26} fontSize="12" fill="#0072ff" fontFamily="monospace">
              {p}
            </text>
            <line x1="45" y1={46 + i * 26} x2="150" y2="70" stroke="#0072ff" strokeWidth="2" markerEnd="url(#fnArrowIn)" />
          </g>
        ))}
        <rect x="160" y="40" width="160" height="80" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="240" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" fontFamily="monospace">
          {`function ${name}()`}
        </text>
        <text x="240" y="95" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="sans-serif">
          recibe parámetros, devuelve un valor
        </text>

        <line x1="320" y1="80" x2="410" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#fnArrowOut)" />
        <text x="415" y="76" fontSize="11" fill="#10b981" fontFamily="sans-serif">
          return
        </text>
        <text x="415" y="92" fontSize="12" fontWeight="700" fill="#10b981" fontFamily="monospace">
          {returns}
        </text>

        <defs>
          <marker id="fnArrowIn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#0072ff" />
          </marker>
          <marker id="fnArrowOut" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify the project still builds (unused-file check)**

Run: `npm run build`
Expected: build completes with exit code 0. This file isn't imported anywhere yet, so this step only confirms the TSX is syntactically valid (Next.js type-checks all `.tsx` files in the project during build).

- [ ] **Step 3: Commit**

```bash
git add src/components/CourseDiagrams.tsx
git commit -m "feat: agregar diagramas SVG y Callout para el curso de JavaScript"
```

---

### Task 3: Wire the new components into `MDXComponents`

**Files:**
- Modify: `src/components/MDXComponents.tsx`

**Interfaces:**
- Consumes: `Callout`, `VariableDiagram`, `ConditionalDiagram`, `LoopDiagram`, `FunctionDiagram` from `./CourseDiagrams` (Task 2).
- Produces: the default-exported `MDXComponents` map now includes keys `Callout`, `VariableDiagram`, `ConditionalDiagram`, `LoopDiagram`, `FunctionDiagram`, usable as JSX tags directly inside any `.mdx` file rendered with `<MDXRemote components={MDXComponents} />`.

- [ ] **Step 1: Add the import and extend the map**

In `src/components/MDXComponents.tsx`, add after the existing `Image` import (line 5):

```tsx
import {
  Callout,
  VariableDiagram,
  ConditionalDiagram,
  LoopDiagram,
  FunctionDiagram,
} from "./CourseDiagrams";
```

Then replace the `MDXComponents` object (currently lines 35-39):

```tsx
const MDXComponents = {
  Image: CustomImage,
  Link,
  Callout,
  VariableDiagram,
  ConditionalDiagram,
  LoopDiagram,
  FunctionDiagram,
};
```

- [ ] **Step 2: Verify the blog still builds and renders**

Run: `npm run build`
Expected: build completes with exit code 0 (existing blog MDX files don't reference the new tags, so output is unchanged).

- [ ] **Step 3: Commit**

```bash
git add src/components/MDXComponents.tsx
git commit -m "feat: registrar componentes de curso en MDXComponents"
```

---

### Task 4: Build `CourseLayout`

**Files:**
- Create: `src/components/CourseLayout.jsx`

**Interfaces:**
- Consumes: `chapters: Array<{ slug: string; order: number; title: string }>` (already stripped of numeric filename prefix — see Task 5/6/7 for where that stripping happens), `currentSlug: string`, `children: ReactNode`.
- Produces: default export `CourseLayout` — a React component rendering a breadcrumb, a sidebar chapter list (desktop) / `<select>` (mobile) pulled from `chapters`, the passed `children` inside a `.prose` article, and prev/next chapter links computed from `chapters` ordered by `order`.

- [ ] **Step 1: Write the component**

```jsx
import Link from "next/link";

const CourseLayout = ({ chapters, currentSlug, children }) => {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((c) => c.slug === currentSlug);
  const current = sorted[currentIndex];
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "32px 24px 80px" }}>
      <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "24px" }}>
        <Link href="/cursos" style={{ color: "#64748b" }}>
          Cursos
        </Link>
        {" / "}
        <Link href="/cursos/javascript" style={{ color: "#64748b" }}>
          JavaScript
        </Link>
        {" / "}
        <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{current?.title}</span>
      </nav>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }} className="max-md:flex-col">
        <aside
          className="max-md:hidden"
          style={{
            width: "260px",
            flexShrink: 0,
            position: "sticky",
            top: "100px",
            borderRight: "1px solid #e5e7eb",
            paddingRight: "20px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Temario
          </p>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {sorted.map((chapter) => {
              const isActive = chapter.slug === currentSlug;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={`/cursos/javascript/${chapter.slug}`}
                    style={{
                      display: "block",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      color: isActive ? "#0072ff" : "#374151",
                      background: isActive ? "#eff6ff" : "transparent",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {chapter.order}. {chapter.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="md:hidden" style={{ marginBottom: "24px", width: "100%" }}>
          <select
            value={currentSlug}
            onChange={(e) => {
              window.location.href = `/cursos/javascript/${e.target.value}`;
            }}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "0.9rem" }}
          >
            {sorted.map((chapter) => (
              <option key={chapter.slug} value={chapter.slug}>
                {chapter.order}. {chapter.title}
              </option>
            ))}
          </select>
        </div>

        <main style={{ flex: 1, minWidth: 0 }}>
          <article className="prose" style={{ maxWidth: "720px" }}>
            {children}
          </article>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
              gap: "16px",
            }}
          >
            {prev ? (
              <Link href={`/cursos/javascript/${prev.slug}`} style={{ color: "#0072ff", fontWeight: 600, fontSize: "0.9rem" }}>
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/cursos/javascript/${next.slug}`}
                style={{ color: "#0072ff", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}
              >
                {next.title} →
              </Link>
            ) : (
              <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.9rem" }}>🎉 Fin del curso (por ahora)</span>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseLayout;
```

- [ ] **Step 2: Verify the project still builds**

Run: `npm run build`
Expected: build completes with exit code 0. Not imported yet, so this only checks JSX validity.

- [ ] **Step 3: Commit**

```bash
git add src/components/CourseLayout.jsx
git commit -m "feat: agregar CourseLayout con sidebar y navegacion prev/next"
```

---

### Task 5: Chapter 1 content + dynamic chapter page (`[capitulo].jsx`)

This task creates the first chapter's MDX content and the dynamic route that renders any
chapter, so the pipeline can be verified end-to-end before writing the remaining 5 chapters.

**Files:**
- Create: `data/cursos/javascript/01-logica-de-programacion.mdx`
- Create: `src/pages/cursos/javascript/[capitulo].jsx`

**Interfaces:**
- Consumes: `getFiles`, `getFileBySlug`, `getAllFilesFrontMatter` from `../../../../lib/mdx` (Task 1); `CourseLayout` (Task 4); `MDXComponents` (Task 3).
- Produces: route `/cursos/javascript/logica-de-programacion` (note: URL slug has the `NN-` prefix stripped, per Global Constraints).

- [ ] **Step 1: Write chapter 1 MDX content**

Create `data/cursos/javascript/01-logica-de-programacion.mdx`:

````mdx
---
title: "¿Qué es programar? Lógica de programación"
subtitle: "Cómo pensar como programador antes de escribir una sola línea de código"
order: 1
duration: "10 min"
keywords: ["logica de programacion", "curso de javascript", "aprender a programar", "algoritmos"]
---

## ¿Qué significa "programar"?

Programar es explicarle a la computadora, paso a paso, exactamente qué hacer. La computadora
no "entiende" ni "adivina" nada: solo sigue instrucciones, en el orden en que se las diste.

A esa secuencia ordenada de pasos para resolver un problema se le llama **algoritmo**. Antes
de escribir una sola línea de JavaScript, la habilidad más importante que vas a desarrollar en
este curso es pensar en algoritmos.

<Callout type="tip">
  Piensa en una receta de cocina: ingredientes (los datos de entrada), pasos numerados en un
  orden específico (el algoritmo) y un plato terminado (el resultado). Programar es lo mismo,
  pero la "cocina" es la computadora.
</Callout>

## Un algoritmo de la vida real

Antes de pensar en código, pensemos en pasos. Así es como preparar una taza de café en pasos:

1. Poner agua en la tetera.
2. Encender la tetera y esperar a que hierva.
3. Poner café molido en el filtro.
4. Verter el agua caliente sobre el café.
5. Servir en una taza.

Cada paso es claro, ocurre en orden, y no hay ambigüedad sobre qué hacer. Eso es exactamente
lo que necesita una computadora: instrucciones **claras**, **ordenadas** y **sin ambigüedad**.

## De los pasos al código

Cuando programamos, traducimos esos pasos a instrucciones que el lenguaje (en este caso,
JavaScript) puede ejecutar. Por ejemplo, un algoritmo para saludar a alguien:

```js
// Paso 1: guardar el nombre de la persona
const nombre = "Camilo";

// Paso 2: construir el mensaje de saludo
const saludo = "Hola, " + nombre + "!";

// Paso 3: mostrar el resultado
console.log(saludo);
```

Cada línea es un paso. La computadora las ejecuta **en orden, de arriba hacia abajo**, salvo que
más adelante aprendamos a cambiar ese orden con condicionales y bucles.

## Las 3 estructuras que vas a dominar en este curso

Todo programa, sin importar qué tan complejo sea, se construye combinando solo tres tipos de
estructuras:

- **Secuencia**: instrucciones que se ejecutan una tras otra (lo que ya viste arriba).
- **Selección**: elegir un camino u otro según una condición (capítulo de condicionales).
- **Iteración**: repetir un paso varias veces (capítulo de bucles).

<ConditionalDiagram
  condition="¿Ya sabes qué es un algoritmo?"
  ifTrue="Sigamos con variables"
  ifFalse="Vuelve a leer este capítulo"
/>

Ese diagrama de arriba es justo un ejemplo de "selección": según la respuesta a una pregunta,
el camino que sigues es distinto. Lo vas a usar constantemente en programación.

## Para recordar

- Programar es dar instrucciones claras, ordenadas y sin ambigüedad.
- Un algoritmo es la secuencia de pasos para resolver un problema.
- Todo programa se construye con secuencia, selección e iteración.
- Antes de escribir código, practica escribir los pasos en español simple.
````

- [ ] **Step 2: Write the dynamic chapter page**

Create `src/pages/cursos/javascript/[capitulo].jsx`:

```jsx
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CourseLayout from "@/components/CourseLayout";
import MDXComponents from "@/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import { getFiles, getFileBySlug, getAllFilesFrontMatter } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const COURSE_TYPE = "cursos/javascript";

const stripOrderPrefix = (slug) => slug.replace(/^\d+-/, "");

export const getStaticPaths = async ({ locales }) => {
  const paths = [];
  for (const locale of locales || ["es"]) {
    const files = await getFiles(COURSE_TYPE, locale);
    for (const file of files) {
      const capitulo = stripOrderPrefix(file.replace(/\.mdx$/, ""));
      paths.push({ params: { capitulo }, locale });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params, locale }) => {
  const activeLocale = locale || "es";
  const files = await getFiles(COURSE_TYPE, activeLocale);
  const fileName = files.find((f) => stripOrderPrefix(f.replace(/\.mdx$/, "")) === params.capitulo);
  const { mdxSource, frontMatter } = await getFileBySlug(COURSE_TYPE, fileName.replace(/\.mdx$/, ""), activeLocale);

  const rawChapters = await getAllFilesFrontMatter(COURSE_TYPE, activeLocale);
  const chapters = rawChapters.map((chapter) => ({
    ...chapter,
    slug: stripOrderPrefix(chapter.slug),
  }));

  return {
    props: {
      ...(await serverSideTranslations(activeLocale, ["common"])),
      mdxSource,
      frontMatter: { ...frontMatter, slug: params.capitulo },
      chapters,
    },
  };
};

export default function CapituloPage({ mdxSource, frontMatter, chapters }) {
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} | Curso de JavaScript`}
        description={frontMatter.subtitle}
        type="article"
        keywords={frontMatter.keywords?.length ? frontMatter.keywords : ["curso de javascript", frontMatter.title]}
      />
      <CourseLayout chapters={chapters} currentSlug={frontMatter.slug}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </CourseLayout>
    </Layout>
  );
}
```

- [ ] **Step 3: Verify the build generates the chapter's static path**

Run: `npm run build`
Expected: build completes with exit code 0, and the Next.js build output lists
`/cursos/javascript/logica-de-programacion` (or `● /cursos/javascript/[capitulo]` with `1` path)
among the generated static pages.

- [ ] **Step 4: Manually verify in the dev server**

Run: `npm run dev`, then open `http://localhost:3000/cursos/javascript/logica-de-programacion`.
Expected: page renders with breadcrumb, sidebar showing chapter 1 highlighted, the chapter's
theory text, the `Callout` box, the `ConditionalDiagram` SVG, and a code block with syntax
highlighting; footer shows "🎉 Fin del curso (por ahora)" (since it's the only chapter so far)
and no "capítulo anterior" link.

- [ ] **Step 5: Commit**

```bash
git add data/cursos/javascript/01-logica-de-programacion.mdx src/pages/cursos/javascript/[capitulo].jsx
git commit -m "feat: agregar capitulo 1 (logica de programacion) y ruta dinamica de capitulos"
```

---

### Task 6: Chapters 2–6 content

**Files:**
- Create: `data/cursos/javascript/02-variables-y-tipos-de-datos.mdx`
- Create: `data/cursos/javascript/03-operadores.mdx`
- Create: `data/cursos/javascript/04-condicionales.mdx`
- Create: `data/cursos/javascript/05-bucles.mdx`
- Create: `data/cursos/javascript/06-funciones-y-scope.mdx`

**Interfaces:**
- Consumes: the dynamic route from Task 5 (no code changes needed — `getStaticPaths` picks up any `.mdx` file in the folder automatically).

- [ ] **Step 1: Create chapter 2**

Create `data/cursos/javascript/02-variables-y-tipos-de-datos.mdx`:

````mdx
---
title: "Variables y tipos de datos"
subtitle: "Cómo guardar información en la memoria de tu programa"
order: 2
duration: "12 min"
keywords: ["variables javascript", "tipos de datos javascript", "let const", "curso de javascript"]
---

## ¿Qué es una variable?

Una variable es una **caja con nombre** donde guardas un valor para usarlo más adelante. Le
pones una etiqueta (el nombre) y adentro guardas algo (el valor).

<VariableDiagram name="edad" value="25" type="number" />

En JavaScript, creas una variable con `let` o con `const`:

```js
let edad = 25;      // puede cambiar más adelante
const nombre = "Ana"; // no va a cambiar
```

<Callout type="nota">
  Usa <code>const</code> por defecto. Solo usa <code>let</code> cuando sepas que el valor de esa
  variable va a cambiar en algún momento del programa (por ejemplo, un contador).
</Callout>

## Los tipos de datos básicos

JavaScript tiene varios tipos de datos. Los que vas a usar todo el tiempo son:

| Tipo | Ejemplo | Para qué sirve |
| --- | --- | --- |
| `number` | `25`, `3.14` | Números, con o sin decimales |
| `string` | `"Camilo"` | Texto, siempre entre comillas |
| `boolean` | `true`, `false` | Verdadero o falso |
| `undefined` | — | Una variable declarada pero sin valor asignado |
| `null` | `null` | "Sin valor", asignado a propósito |

```js
let edad = 25;            // number
let nombre = "Camilo";    // string
let esEstudiante = true;  // boolean
let apodo;                // undefined (no se le asignó nada)
let telefono = null;      // null (a propósito, "no tiene")
```

Puedes preguntarle a JavaScript qué tipo es una variable con `typeof`:

```js
console.log(typeof edad);         // "number"
console.log(typeof nombre);       // "string"
console.log(typeof esEstudiante); // "boolean"
```

## Reglas para nombrar variables

- No pueden empezar con un número (`1nombre` ❌, `nombre1` ✅).
- No pueden tener espacios (`nombre completo` ❌, `nombreCompleto` ✅).
- Por convención, en JavaScript se usa `camelCase`: `edadUsuario`, `nombreCompleto`.
- El nombre debe describir qué guarda la variable. `x` no dice nada; `precioTotal` sí.

## Para recordar

- Una variable es una caja con nombre que guarda un valor.
- `const` para valores que no cambian, `let` para los que sí.
- Los tipos básicos son `number`, `string`, `boolean`, `undefined` y `null`.
- Nombra tus variables de forma clara, en `camelCase`.
````

- [ ] **Step 2: Create chapter 3**

Create `data/cursos/javascript/03-operadores.mdx`:

````mdx
---
title: "Operadores"
subtitle: "Cómo hacer cálculos, comparaciones y combinar condiciones"
order: 3
duration: "10 min"
keywords: ["operadores javascript", "operadores logicos", "operadores de comparacion", "curso de javascript"]
---

## Operadores aritméticos

Sirven para hacer cálculos matemáticos con números:

```js
let suma = 5 + 3;           // 8
let resta = 5 - 3;          // 2
let multiplicacion = 5 * 3; // 15
let division = 6 / 3;       // 2
let resto = 7 % 2;          // 1 (el resto de dividir 7 entre 2)
```

<Callout type="tip">
  El operador <code>%</code> (módulo) devuelve el resto de una división. Es muy útil para saber
  si un número es par: si <code>numero % 2</code> da <code>0</code>, es par.
</Callout>

## Operadores de comparación

Comparan dos valores y devuelven `true` o `false`:

```js
console.log(5 > 3);   // true  (mayor que)
console.log(5 < 3);   // false (menor que)
console.log(5 >= 5);  // true  (mayor o igual)
console.log(5 === 5); // true  (igual, comparando también el tipo)
console.log(5 !== 3); // true  (diferente)
```

<Callout type="nota">
  Usa siempre <code>===</code> y <code>!==</code> en vez de <code>==</code> y <code>!=</code>.
  Los primeros comparan valor y tipo a la vez, evitando comparaciones raras como
  <code>"5" == 5</code> (que da <code>true</code> aunque uno es texto y el otro número).
</Callout>

## Operadores lógicos

Combinan varias condiciones (verdadero/falso) entre sí:

```js
let esMayorDeEdad = true;
let tieneCedula = false;

console.log(esMayorDeEdad && tieneCedula); // false (Y: las dos deben ser true)
console.log(esMayorDeEdad || tieneCedula); // true  (O: al menos una debe ser true)
console.log(!esMayorDeEdad);               // false (NO: invierte el valor)
```

- `&&` (Y): el resultado es `true` solo si **ambos** lados son `true`.
- `||` (O): el resultado es `true` si **al menos uno** de los lados es `true`.
- `!` (NO): invierte el valor: `true` pasa a `false` y viceversa.

## Para recordar

- Los operadores aritméticos (`+ - * / %`) hacen cálculos.
- Los operadores de comparación (`> < >= <= === !==`) devuelven `true` o `false`.
- Los operadores lógicos (`&& || !`) combinan condiciones.
- Prefiere siempre `===` y `!==` sobre `==` y `!=`.
````

- [ ] **Step 3: Create chapter 4**

Create `data/cursos/javascript/04-condicionales.mdx`:

````mdx
---
title: "Condicionales"
subtitle: "Cómo hacer que tu programa tome decisiones"
order: 4
duration: "12 min"
keywords: ["condicionales javascript", "if else javascript", "switch javascript", "curso de javascript"]
---

## if / else: la decisión más básica

Un condicional le permite a tu programa elegir entre dos caminos según si una condición es
verdadera o falsa.

<ConditionalDiagram
  condition="edad >= 18"
  ifTrue="Mostrar: Eres mayor de edad"
  ifFalse="Mostrar: Eres menor de edad"
/>

```js
let edad = 20;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

La computadora evalúa `edad >= 18`. Si el resultado es `true`, ejecuta el bloque dentro del
`if`. Si es `false`, ejecuta el bloque dentro del `else`.

## else if: más de dos caminos

Cuando hay más de dos posibilidades, se encadenan varios `else if`:

```js
let nota = 7;

if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Aprobado");
} else if (nota >= 5) {
  console.log("Necesitas mejorar");
} else {
  console.log("Reprobado");
}
```

JavaScript revisa las condiciones **en orden, de arriba hacia abajo**, y ejecuta el bloque de
la primera que sea verdadera. Las demás ni siquiera se evalúan.

<Callout type="tip">
  El orden importa. Si pones <code>nota &gt;= 5</code> antes que <code>nota &gt;= 7</code>,
  cualquier nota mayor o igual a 5 entraría ahí primero y nunca llegarías a revisar si merece
  "Excelente" o "Aprobado".
</Callout>

## switch: cuando comparas un mismo valor contra varias opciones

Cuando tienes muchas comparaciones exactas sobre la misma variable, `switch` es más claro que
una cadena larga de `else if`:

```js
let dia = "martes";

switch (dia) {
  case "lunes":
    console.log("Inicio de semana");
    break;
  case "martes":
  case "miercoles":
  case "jueves":
    console.log("Mitad de semana");
    break;
  case "viernes":
    console.log("¡Casi fin de semana!");
    break;
  default:
    console.log("Fin de semana");
}
```

El `break` es importante: le dice a JavaScript que deje de revisar los demás `case`. Si lo
olvidas, sigue ejecutando los casos siguientes aunque no coincidan (esto se llama "fall-through").

## Para recordar

- `if` ejecuta un bloque cuando la condición es `true`.
- `else` ejecuta un bloque alternativo cuando es `false`.
- `else if` encadena más condiciones; se evalúan en orden y solo corre la primera verdadera.
- `switch` es útil para comparar un mismo valor contra muchas opciones exactas; no olvides `break`.
````

- [ ] **Step 4: Create chapter 5**

Create `data/cursos/javascript/05-bucles.mdx`:

````mdx
---
title: "Bucles"
subtitle: "Cómo repetir una tarea sin copiar y pegar código"
order: 5
duration: "12 min"
keywords: ["bucles javascript", "for javascript", "while javascript", "curso de javascript"]
---

## ¿Por qué usar bucles?

Imagina que quieres imprimir los números del 1 al 5. Podrías escribir cinco `console.log`
seguidos... pero si fueran 1000 números, eso sería imposible de mantener. Para eso existen los
**bucles**: repiten un bloque de código mientras se cumpla una condición.

<LoopDiagram condition="i < 5" body="console.log(i)" />

## El bucle for

Es el más usado cuando **sabes de antemano** cuántas veces quieres repetir algo:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Imprime: 0, 1, 2, 3, 4
```

El `for` tiene tres partes separadas por `;`:

1. **Inicialización** (`let i = 0`): se ejecuta una sola vez, al empezar.
2. **Condición** (`i < 5`): se revisa antes de cada vuelta; si es `false`, el bucle termina.
3. **Incremento** (`i++`): se ejecuta al final de cada vuelta.

<Callout type="nota">
  <code>i++</code> es una forma corta de escribir <code>i = i + 1</code>. Suma 1 a la variable
  en cada vuelta del bucle.
</Callout>

## El bucle while

Se usa cuando **no sabes de antemano** cuántas veces se va a repetir, solo sabes la condición
para seguir repitiendo:

```js
let intentos = 0;

while (intentos < 3) {
  console.log("Intento número " + intentos);
  intentos = intentos + 1;
}
```

`while` revisa la condición antes de cada vuelta. Si nunca se vuelve `false` (por ejemplo, si
olvidas actualizar `intentos`), el bucle se repite para siempre: eso se llama un **bucle
infinito**, y suele "colgar" el programa.

## ¿for o while?

- Usa **for** cuando conoces el número de repeticiones (recorrer una lista de 10 elementos,
  contar del 1 al 100, etc.).
- Usa **while** cuando la repetición depende de una condición que puede cambiar de forma
  impredecible (seguir pidiendo datos hasta que el usuario escriba algo válido, por ejemplo).

## Para recordar

- Los bucles repiten un bloque de código mientras una condición sea verdadera.
- `for` es ideal cuando sabes cuántas repeticiones necesitas.
- `while` es ideal cuando la repetición depende de una condición variable.
- Ten cuidado con los bucles infinitos: siempre asegúrate de que la condición pueda volverse
  falsa en algún momento.
````

- [ ] **Step 5: Create chapter 6**

Create `data/cursos/javascript/06-funciones-y-scope.mdx`:

````mdx
---
title: "Funciones y scope básico"
subtitle: "Cómo organizar tu código en bloques reutilizables"
order: 6
duration: "14 min"
keywords: ["funciones javascript", "scope javascript", "parametros javascript", "curso de javascript"]
---

## ¿Qué es una función?

Una función es un bloque de código con nombre que puedes **reutilizar** cada vez que lo
necesites, en vez de repetir el mismo código una y otra vez.

<FunctionDiagram name="sumar" params={["a", "b"]} returns="a + b" />

```js
function sumar(a, b) {
  return a + b;
}

console.log(sumar(2, 3));   // 5
console.log(sumar(10, 20)); // 30
```

- `sumar` es el **nombre** de la función.
- `a` y `b` son los **parámetros**: los datos que la función necesita para trabajar.
- `return` indica qué **valor devuelve** la función a quien la llamó.
- `sumar(2, 3)` es una **llamada** a la función, pasando `2` y `3` como argumentos.

## Declarar vs. llamar

Declarar una función solo la "define": no ejecuta nada todavía. Solo se ejecuta cuando la
**llamas** (invocas) usando su nombre seguido de paréntesis:

```js
function saludar(nombre) {
  console.log("Hola, " + nombre + "!");
}

// Hasta aquí, "saludar" no ha impreso nada.

saludar("Camilo"); // Ahora sí: imprime "Hola, Camilo!"
saludar("Ana");    // Imprime "Hola, Ana!"
```

<Callout type="tip">
  Una misma función se puede llamar tantas veces como quieras, con datos distintos cada vez. Esa
  es la principal ventaja de usar funciones: escribes la lógica una sola vez.
</Callout>

## Funciones que no devuelven nada

No todas las funciones necesitan un `return`. Algunas simplemente hacen algo (como imprimir en
consola) y no necesitan devolver un valor:

```js
function despedirse() {
  console.log("¡Hasta luego!");
}

despedirse();
```

## Scope: dónde "vive" cada variable

El **scope** (alcance) determina en qué parte del código puedes usar una variable. Una variable
declarada **dentro** de una función solo existe **dentro** de esa función (scope local); una
variable declarada **fuera** de cualquier función existe en todo el archivo (scope global).

```js
let mensajeGlobal = "Soy visible en todos lados";

function ejemplo() {
  let mensajeLocal = "Solo existo dentro de esta función";
  console.log(mensajeGlobal); // funciona, es global
  console.log(mensajeLocal);  // funciona, estamos dentro de la función
}

ejemplo();
console.log(mensajeLocal); // Error: mensajeLocal no existe aquí afuera
```

<Callout type="nota">
  Preferir variables locales (dentro de funciones) sobre variables globales es una buena
  práctica: evita que una parte del código modifique por accidente datos que usa otra parte.
</Callout>

## Para recordar

- Una función agrupa código reutilizable bajo un nombre.
- Los parámetros son los datos de entrada; `return` es el valor de salida.
- Declarar una función no la ejecuta: hay que llamarla.
- El scope local (dentro de una función) no es visible desde afuera; el scope global sí.

---

¡Felicidades! Terminaste el primer bloque del curso de JavaScript. Ya sabes pensar en
algoritmos, guardar datos en variables, operar y comparar valores, tomar decisiones con
condicionales, repetir tareas con bucles y organizar tu código en funciones. En la próxima
entrega vamos a construir sobre esta base: arrays, objetos y cómo interactuar con una página
web de verdad.
````

- [ ] **Step 6: Verify the build generates all 6 static paths**

Run: `npm run build`
Expected: build completes with exit code 0, and the build output shows 6 generated paths under
`/cursos/javascript/[capitulo]` (one per chapter: `logica-de-programacion`,
`variables-y-tipos-de-datos`, `operadores`, `condicionales`, `bucles`, `funciones-y-scope`).

- [ ] **Step 7: Manually verify prev/next navigation**

Run: `npm run dev`, open `http://localhost:3000/cursos/javascript/variables-y-tipos-de-datos`.
Expected: sidebar shows all 6 chapters with chapter 2 highlighted; "← ¿Qué es programar? Lógica
de programación" link goes back to chapter 1; "Operadores →" link goes forward to chapter 3.
Repeat spot-check on the last chapter (`funciones-y-scope`): no "siguiente" link, shows the
"🎉 Fin del curso" message instead.

- [ ] **Step 8: Commit**

```bash
git add data/cursos/javascript/02-variables-y-tipos-de-datos.mdx data/cursos/javascript/03-operadores.mdx data/cursos/javascript/04-condicionales.mdx data/cursos/javascript/05-bucles.mdx data/cursos/javascript/06-funciones-y-scope.mdx
git commit -m "feat: agregar capitulos 2 a 6 del curso de javascript"
```

---

### Task 7: Course landing page

**Files:**
- Create: `src/pages/cursos/javascript/index.jsx`

**Interfaces:**
- Consumes: `getAllFilesFrontMatter` from `../../../../lib/mdx` (Task 1).
- Produces: route `/cursos/javascript`.

- [ ] **Step 1: Write the landing page**

Create `src/pages/cursos/javascript/index.jsx`:

```jsx
import Link from "next/link";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { getAllFilesFrontMatter } from "../../../../lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const stripOrderPrefix = (slug) => slug.replace(/^\d+-/, "");

const APRENDIZAJES = [
  "A pensar un problema paso a paso, como un algoritmo",
  "Qué son las variables y los tipos de datos",
  "Cómo usar operadores aritméticos, de comparación y lógicos",
  "Cómo tomar decisiones en el código con condicionales",
  "Cómo repetir tareas con bucles",
  "Cómo organizar tu código en funciones reutilizables",
];

const CursoJavaScript = ({ chapters }) => {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  const firstSlug = sorted[0]?.slug;

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)",
          color: "#fff",
          padding: "72px 24px 56px",
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(0,114,255,0.2)",
              border: "1px solid rgba(0,114,255,0.5)",
              color: "#93c5fd",
              borderRadius: "20px",
              padding: "4px 14px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            Curso gratuito
          </span>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2 }}>
            Curso de JavaScript: Lógica de Programación
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "28px" }}>
            Aprende a pensar como programador desde cero: variables, operadores, condicionales,
            bucles y funciones, explicados con teoría simple, diagramas y ejemplos de código.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "28px",
              fontSize: "0.9rem",
              color: "#94a3b8",
            }}
          >
            <span>📚 {sorted.length} capítulos</span>
            <span>⏱️ ~70 min en total</span>
            <span>🆓 100% gratis</span>
          </div>
          {firstSlug && (
            <Link
              href={`/cursos/javascript/${firstSlug}`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "10px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Empezar curso →
            </Link>
          )}
        </div>
      </div>

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px" }}>
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>
            Qué vas a aprender
          </h2>
          <ul
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", listStyle: "none", padding: 0, margin: 0 }}
            className="max-sm:grid-cols-1"
          >
            {APRENDIZAJES.map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", fontSize: "0.95rem", color: "#374151", lineHeight: 1.6 }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>Temario</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/cursos/javascript/${chapter.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "18px 20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#eff6ff",
                    color: "#0072ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {chapter.order}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1rem", marginBottom: "4px" }}>{chapter.title}</p>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", margin: 0 }}>{chapter.subtitle}</p>
                </div>
                <span style={{ flexShrink: 0, color: "#94a3b8", fontSize: "0.85rem" }}>{chapter.duration}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const activeLocale = locale || "es";
  const rawChapters = await getAllFilesFrontMatter("cursos/javascript", activeLocale);
  const chapters = rawChapters.map((chapter) => ({
    ...chapter,
    slug: stripOrderPrefix(chapter.slug),
  }));

  return {
    props: {
      ...(await serverSideTranslations(activeLocale, ["common"])),
      chapters,
    },
  };
};

export default function CursoJavaScriptPage({ chapters }) {
  return (
    <Layout>
      <SEO
        title="Curso de JavaScript Gratis: Lógica de Programación | Salazar Code"
        description="Aprende lógica de programación con JavaScript desde cero: variables, operadores, condicionales, bucles y funciones, con teoría simple y diagramas."
        keywords={["curso de javascript", "logica de programacion", "aprender a programar", "javascript para principiantes", "curso gratis de programacion"]}
      />
      <CursoJavaScript chapters={chapters} />
    </Layout>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with exit code 0, and `/cursos/javascript` appears as a generated
static page.

- [ ] **Step 3: Manually verify in the dev server**

Open `http://localhost:3000/cursos/javascript`.
Expected: hero renders with the "Empezar curso" button linking to
`/cursos/javascript/logica-de-programacion`; the "Temario" section lists all 6 chapters in
order 1–6 with correct titles, subtitles and durations, each clickable.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/cursos/javascript/index.jsx"
git commit -m "feat: agregar landing del curso de javascript"
```

---

### Task 8: Link the course from `/cursos`

**Files:**
- Modify: `src/pages/cursos/index.jsx`

**Interfaces:**
- Produces: `/cursos` now shows a "Cursos" section with one card linking to `/cursos/javascript`, above the existing certificados grid (which is unchanged).

- [ ] **Step 1: Add the Cursos section**

In `src/pages/cursos/index.jsx`, insert a new section immediately after the `<Banners images={images} />` block and before the `<div className="grid grid-cols-3 ...">` certificados grid (inside the existing `<main className="py-8 container mx-auto px-44 ">`):

```jsx
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "20px", color: "#1a1a2e" }}>
            Cursos
          </h2>
          <Link
            href="/cursos/javascript"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              maxWidth: "560px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              🟨
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem", marginBottom: "4px" }}>
                Curso de JavaScript: Lógica de Programación
              </p>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                6 capítulos gratis · ~70 min · Variables, condicionales, bucles y funciones
              </p>
            </div>
            <span style={{ flexShrink: 0, color: "#0072ff", fontWeight: 700 }}>Ver curso →</span>
          </Link>
        </section>

```

This goes right before the line `<div className="grid grid-cols-3 gap-4 content-center max-sm:grid-cols-1 max-sm:w-full  max-sm:px-8 mt-20">`. `Link` is already imported in this file (used by the certificados grid), so no new import is needed.

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with exit code 0.

- [ ] **Step 3: Manually verify in the dev server**

Open `http://localhost:3000/cursos`.
Expected: a "Cursos" heading and one card for the JavaScript course appear above the existing
certificados grid; clicking the card navigates to `/cursos/javascript`; the certificados grid
below still renders exactly as before.

- [ ] **Step 4: Commit**

```bash
git add src/pages/cursos/index.jsx
git commit -m "feat: enlazar el curso de javascript desde /cursos"
```

---

### Task 9: Final full verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: exit code 0, no warnings about missing components in `MDXComponents`, and the route
list includes `/cursos`, `/cursos/javascript`, and all 6
`/cursos/javascript/<slug>` chapter routes.

- [ ] **Step 2: Mobile sidebar check**

With `npm run dev` running, open `http://localhost:3000/cursos/javascript/operadores` in a
mobile viewport (e.g. 375px wide). Expected: the desktop sidebar is hidden, and a `<select>`
dropdown with all 6 chapters appears instead; choosing a different chapter in the dropdown
navigates to that chapter's page.

- [ ] **Step 3: Full click-through**

Starting from `/cursos`, click into the JavaScript course card, click "Empezar curso", then
click "Siguiente capítulo" through all 6 chapters, confirming each chapter's diagram
(`VariableDiagram`, `ConditionalDiagram` twice, `LoopDiagram`, `FunctionDiagram`) renders
without console errors (check the browser console).

- [ ] **Step 4: Lint check**

Run: `npm run lint`
Expected: no new errors introduced by the files created/modified in this plan (pre-existing
warnings in unrelated files are out of scope).

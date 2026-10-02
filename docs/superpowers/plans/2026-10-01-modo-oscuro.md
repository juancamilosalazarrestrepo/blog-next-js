# Modo oscuro (toggle claro/oscuro) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir un botón en el navbar que cambie el sitio entre modo claro (por defecto) y oscuro, recordando la elección del visitante, sin parpadeo al cargar y sin páginas ilegibles a mitad de la migración.

**Architecture:** La paleta pasa a ser *tokens* CSS (`--ink`, `--surface`, …) definidos en `:root` y redefinidos en `[data-theme="dark"]`. Un script inline en `_document` aplica el tema guardado antes del primer pintado; un `ThemeProvider` en `_app` lo mantiene en las navegaciones de cliente. Las páginas se migran por lotes: solo las rutas listadas en `DARK_READY_ROUTES` pueden ponerse oscuras, y en el resto el botón se oculta y se fuerza el claro.

**Tech Stack:** Next.js 16 (pages router) · React 19 · Tailwind CSS v4 (`@import "tailwindcss"` en `globals.css`) · CSS Modules · next-i18next · sharp (ya instalado como dependencia de Next) para el logo.

## Estado de la implementación (2026-10-02, rama `feat/modo-oscuro`)

Hecho y commiteado: Tasks 1–7 y la parte estable de la Task 8.

| Commit | Contenido |
|---|---|
| `5f725c6` | Tokens claro/oscuro y variante `dark:` ligada a `data-theme` |
| `5e27dcc` | Tema aplicado antes del pintado y en cada navegación (`_document`, `ThemeProvider`) |
| `0ae4755` | Botón de tema en el navbar (ES/EN) |
| `11459db` | Navbar, footer, logo oscuro y selector de idioma |
| `63a6adc` | Token `--text-soft` |
| `ca51863` | Home |
| `256d0c9` | Listado del blog y artículos MDX |
| `55074d2` | Artículos con página propia y cursos (diagramas y animaciones incluidos) |
| `ef8b385` | Landings, portafolio, proyectos, contacto, e-commerce, certificados, políticas, términos, precios |

**Cambios respecto al plan original**

- Tokens añadidos: `--text-soft` (`#4b5563` / `#b4bfd3`, el gris intermedio que el plan no tenía) y `--shadow-sm`.
- Para tintes y pastillas de color se usa `light-dark(<valor original>, <valor oscuro>)`: funciona porque cada tema fija su `color-scheme`, y deja el modo claro **idéntico** al original (comprobado en el navegador).
- La migración se hizo con herramientas por tipo de estilo (`scripts/dark-mode/`, ver su README) en lugar de editar a mano; se verificó cada página con un chequeo de contraste y un detector de «islas claras».
- `Banners.jsx` usaba `text-blue`, que no es una clase válida: el texto heredaba el color del tema y quedaba claro sobre blanco. Se fijó a `#212427`.
- Las páginas que ya traían pares `dark:` (`agentes-ai`, `agentes-ia-hoteles`, proyectos de Tailwind) solo necesitaron completarlos donde faltaban y habilitar su ruta.

**Pendiente** (otra sesión las está modificando: no se tocaron para no pisar su trabajo; mientras no estén en `DARK_READY_ROUTES` se ven en claro y sin botón)

- `/services` (`ServicesPage.module.css`, `ServicesShowcase`), `/elements` y las páginas de demos (`*Page`, `ComponentDemoPage`).
- Proyectos nuevos sin commitear: `concesionario_alquiler_autos`, `diccionario_rimas_compositor`, `oakhaven_videojuego`.
- `blog/gpt-6-astra-vs-fable-5-1-coding` y la página dedicada del traductor de lenguaje de señas.
- El último paso de la Task 8 (borrar `DARK_READY_ROUTES`) solo aplica cuando no quede nada de lo anterior.

**Avisos que se dejaron a propósito** (existen idénticos en modo claro y no dependen del tema): texto blanco sobre el azul `#0072ff` (4.3:1) y sobre `#0575e6` (4.47:1), marcas de agua de números, comillas decorativas y emojis.

## Global Constraints

- El modo por defecto es **claro**. No se sigue `prefers-color-scheme`: el oscuro solo se activa con el botón.
- La preferencia se guarda en `localStorage` con la clave `sc-theme` (valores `"dark"` | `"light"`).
- El atributo que activa el tema es `data-theme="dark"` en `<html>`. No usar la clase `.dark`.
- Ningún color nuevo en hex dentro de componentes migrados: se usan los tokens (`var(--ink)` o la utilidad Tailwind equivalente).
- Contraste mínimo WCAG AA: 4.5:1 para texto en ambos temas y para el azul de marca en oscuro (lo comprueba `scripts/check-theme-contrast.mjs`). El azul del modo claro actual se queda en 4.3–4.47:1: no se cambia en este plan para no alterar la identidad (ver "Decisiones").
- Los heros y bandas que ya son oscuros (AgentsHero, LavaBackground, banners con canvas/three.js, bandas `#0d1b4b → #1a1a2e`) **no se tocan**: se ven igual en los dos modos.
- Textos visibles (aria-label del botón) van en `public/locales/{es,en}/common.json`.
- El working tree tiene cambios sin commitear de otras sesiones (`index.jsx`, `common.json`, `HotelAgentsSection.jsx`…). En cada commit usar `git add` solo con los archivos de la tarea y, en archivos compartidos, `git add -p` para no arrastrar cambios ajenos.
- Si `npm run dev` falla porque otra sesión ocupa el servidor, verificar con `npm run build` + `npx next start -p 3001`.

---

## La paleta: de dónde sale y cómo queda en oscuro

Inventario actual (frecuencia en `src/`): `#fff` (166), `#1a1a2e` tinta de títulos (132), `#0072ff` azul de marca (108), `#94a3b8`/`#64748b`/`#6b7280` grises de texto, `#e5e7eb`/`#e2e8f0` bordes, `#f8fafc`/`#f1f5f9` fondos suaves, `#0575e6` botones, `#021b79` hover de botones, `#00c6ff` cian del degradado, `#7c3aed` violeta, `#0d1b4b`/`#0f172a` navy de bandas oscuras. En Tailwind dominan `text-white`, `text-slate-400/600/900`, `bg-white`, `bg-slate-50/100`.

El oscuro **no es negro**: es el navy de la marca (`#0d1b4b`, `#0f172a`) llevado a fondo, para que el azul y el cian sigan pareciendo Salazar Code.

| Token | Uso | Claro | Oscuro | Contraste oscuro |
|---|---|---|---|---|
| `--bg` | fondo de página | `#fdfdfd` | `#0b1020` | — |
| `--surface` | tarjetas, navbar, footer | `#ffffff` | `#121a2f` | — |
| `--surface-2` | fondos suaves, filas zebra | `#f8fafc` | `#18223b` | — |
| `--surface-3` | chips, botones grises | `#f1f5f9` | `#1f2a47` | — |
| `--border` | bordes y separadores | `#e2e8f0` | `#2f3d5e` | decorativo |
| `--ink` | títulos (antes `#1a1a2e`) | `#1a1a2e` | `#e8edf7` | 16.1 sobre `--bg` |
| `--text` | texto de párrafo | `#212427` | `#cbd5e1` | 11.7 sobre `--surface` |
| `--text-muted` | secundarios (`#64748b`, `#4b5563`, `#6b7280`) | `#64748b` | `#94a3b8` | 6.7 sobre `--surface` |
| `--text-subtle` | fechas, metadatos (`#94a3b8`) | `#94a3b8` | `#7d8ba4` | 5.5 sobre `--bg` |
| `--brand` | links y acentos de texto (`#0072ff`) | `#0072ff` | `#4d9aff` | 6.7 sobre `--bg` |
| `--brand-solid` | fondo de botones con texto blanco (`#0575e6`) | `#0575e6` | `#0066e6` | blanco 5.2 |
| `--brand-hover` | hover de botones (`#021b79`) | `#021b79` | `#0052b8` | blanco > 7 |
| `--accent` | cian del degradado | `#00c6ff` | `#00c6ff` | 9.5 sobre `--bg` |
| `--violet` | acento violeta | `#7c3aed` | `#a78bfa` | 6.4 sobre `--surface` |
| `--shadow` | sombras de tarjeta | `0 8px 32px rgba(0,0,0,.08)` | `0 8px 32px rgba(0,0,0,.45)` | — |

Por qué cambian los azules: `#0072ff` sobre el fondo oscuro da 4.4:1 y no llega a AA, así que el texto azul sube a `#4d9aff`. Los botones van al revés: el fondo baja a `#0066e6` para que el texto blanco tenga 5.2:1. Los degradados de marca (`#0072ff → #00c6ff`, `#0072ff → #7c3aed`) se mantienen tal cual; funcionan sobre los dos fondos.

**Logo:** `public/images/locosc.webp` tiene "SALAZAR" en navy (`~#0a2a8a`) sobre transparente y desaparece en oscuro. Se genera una variante `locosc-dark.webp` con esa palabra en `#e8edf7` (Task 4).

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `src/styles/globals.css` (modificar) | Tokens claro/oscuro, variante `dark:` de Tailwind ligada a `data-theme`, utilidades semánticas (`bg-surface`, `text-ink`…) |
| `scripts/check-theme-contrast.mjs` (crear) | Lee los tokens de `globals.css` y falla si algún par texto/fondo baja de 4.5:1 |
| `lib/theme.js` (crear) | Clave de storage, `DARK_READY_ROUTES`, `isDarkReady()`, script anti-parpadeo |
| `src/pages/_document.tsx` (modificar) | Pasa a clase con `getInitialProps`; marca `data-dark-ready` y ejecuta el script antes del pintado |
| `src/components/theme/ThemeProvider.jsx` (crear) | Contexto `{ theme, ready, toggleTheme }`; aplica `data-theme` en cada navegación |
| `src/components/theme/ThemeToggle.jsx` + `ThemeToggle.module.css` (crear) | Botón sol/luna |
| `src/pages/_app.tsx` (modificar) | Envuelve la app en `ThemeProvider` |
| `scripts/make-dark-logo.mjs` (crear) → `public/images/locosc-dark.webp` | Variante del logo para oscuro |
| `Layout.jsx`, `NavBar.jsx`, `Navbar.module.css`, `Footer.jsx`, `LanguageSwitcher.jsx` (modificar) | Shell del sitio con tokens |
| Páginas y secciones por lote (Tasks 5–8) | Migración de colores a tokens |

No hay test runner en el repo (solo `next lint`). Las "pruebas" de cada tarea son: el script de contraste, `npm run build` y la verificación en el navegador de preview con comandos `javascript_tool` concretos.

---

### Task 1: Tokens de color y variante `dark:` en Tailwind

**Files:**
- Modify: `src/styles/globals.css:1-2` (cabecera) y la regla `body` (`globals.css:126-129`)
- Create: `scripts/check-theme-contrast.mjs`

**Interfaces:**
- Produces: variables CSS `--bg --surface --surface-2 --surface-3 --border --ink --text --text-muted --text-subtle --brand --brand-solid --brand-hover --accent --violet --shadow`; utilidades Tailwind `bg-page bg-surface bg-surface-2 bg-surface-3 border-line text-ink text-body text-muted text-subtle text-brand bg-brand-solid hover:bg-brand-hover text-accent text-violet`; la variante `dark:` se activa con `[data-theme=dark]`.

- [ ] **Step 1: Escribir la prueba de contraste (falla porque aún no hay tokens)**

`scripts/check-theme-contrast.mjs`:

```js
// Comprueba que los pares texto/fondo de los tokens de tema cumplen WCAG AA (4.5:1).
// Uso: node scripts/check-theme-contrast.mjs
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles/globals.css", import.meta.url), "utf8");

function readBlock(selector) {
  const start = css.indexOf(selector + " {");
  if (start === -1) throw new Error(`No se encontró el bloque ${selector}`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
}

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Texto: AA estricto (4.5). Marca: el claro hereda #0072ff (4.3:1) y #0575e6 (4.47:1);
// se exige 4.5 solo en oscuro y en claro se acepta 4.2 para no cambiar la identidad actual.
const TEXT_PAIRS = [
  ["ink", "bg"], ["ink", "surface"], ["text", "surface"], ["text", "surface-2"],
  ["text-muted", "surface"], ["text-muted", "surface-2"],
];
const BRAND_PAIRS = [["brand", "bg"], ["brand", "surface"]];

const themes = {
  claro: { tokens: readBlock(":root"), brandMin: 4.2 },
  oscuro: { tokens: { ...readBlock(":root"), ...readBlock(':root[data-theme="dark"]') }, brandMin: 4.5 },
};

let failed = false;
const check = (theme, label, r, min) => {
  const ok = r >= min;
  if (!ok) failed = true;
  console.log(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(6)} ${label}: ${r.toFixed(2)} (mín ${min})`);
};
for (const [name, { tokens: t, brandMin }] of Object.entries(themes)) {
  for (const [fg, bg] of TEXT_PAIRS) check(name, `--${fg} sobre --${bg}`, ratio(t[fg], t[bg]), 4.5);
  for (const [fg, bg] of BRAND_PAIRS) check(name, `--${fg} sobre --${bg}`, ratio(t[fg], t[bg]), brandMin);
  check(name, "blanco sobre --brand-solid", ratio("#ffffff", t["brand-solid"]), brandMin);
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Ejecutarla y ver que falla**

Run: `node scripts/check-theme-contrast.mjs`
Expected: error `No se encontró el bloque :root`, exit code 1.

- [ ] **Step 3: Añadir los tokens y la variante a `globals.css`**

Justo debajo de `@plugin "@tailwindcss/typography";`:

```css
/* `dark:` responde al botón de tema, no a la preferencia del sistema. */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* ===== Tokens de tema ===== */
:root {
  --bg: #fdfdfd;
  --surface: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #f1f5f9;
  --border: #e2e8f0;
  --ink: #1a1a2e;
  --text: #212427;
  --text-muted: #64748b;
  --text-subtle: #94a3b8;
  --brand: #0072ff;
  --brand-solid: #0575e6;
  --brand-hover: #021b79;
  --accent: #00c6ff;
  --violet: #7c3aed;
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  color-scheme: light;
}

:root[data-theme="dark"] {
  --bg: #0b1020;
  --surface: #121a2f;
  --surface-2: #18223b;
  --surface-3: #1f2a47;
  --border: #2f3d5e;
  --ink: #e8edf7;
  --text: #cbd5e1;
  --text-muted: #94a3b8;
  --text-subtle: #7d8ba4;
  --brand: #4d9aff;
  --brand-solid: #0066e6;
  --brand-hover: #0052b8;
  --accent: #00c6ff;
  --violet: #a78bfa;
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  color-scheme: dark;
}

/* Utilidades semánticas: bg-surface, text-ink, border-line… */
@theme inline {
  --color-page: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-line: var(--border);
  --color-ink: var(--ink);
  --color-body: var(--text);
  --color-muted: var(--text-muted);
  --color-subtle: var(--text-subtle);
  --color-brand: var(--brand);
  --color-brand-solid: var(--brand-solid);
  --color-brand-hover: var(--brand-hover);
  --color-accent: var(--accent);
  --color-violet: var(--violet);
}
```

Y cambiar la regla `body` existente:

```css
body {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

- [ ] **Step 4: Ejecutar la prueba y el build**

Run: `node scripts/check-theme-contrast.mjs`
Expected: 18 líneas `ok`, exit code 0. Las del azul en claro muestran 4.26, 4.33 y 4.47 con `mín 4.2`.

Run: `npm run build`
Expected: build sin errores. Como el modo claro usa los mismos valores que antes, el sitio se ve igual.

Nota: `WebDevSection.jsx` y `agentes-ai.jsx` ya tienen clases `dark:`. Hasta ahora seguían el modo oscuro del sistema operativo; desde este commit solo responden al botón. Es intencional: hoy, quien tiene el sistema en oscuro ve esas secciones oscuras dentro de una página clara.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-theme-contrast.mjs
git add -p src/styles/globals.css
git commit -m "feat: tokens de color claro/oscuro y variante dark ligada a data-theme"
```

---

### Task 2: Aplicar el tema sin parpadeo (`lib/theme.js`, `_document`, `ThemeProvider`)

**Files:**
- Create: `lib/theme.js`
- Modify: `src/pages/_document.tsx` (archivo completo)
- Create: `src/components/theme/ThemeProvider.jsx`
- Modify: `src/pages/_app.tsx` (envolver `<Component>`)

**Interfaces:**
- Consumes: tokens de Task 1.
- Produces:
  - `lib/theme.js`: `THEME_STORAGE_KEY: "sc-theme"`, `DARK_READY_ROUTES: string[]`, `isDarkReady(pathname: string): boolean`, `themeInitScript: string`.
  - `ThemeProvider.jsx`: `export function ThemeProvider({ children })`, `export function useTheme(): { theme: "light" | "dark", ready: boolean, toggleTheme: () => void }`.

- [ ] **Step 1: Crear `lib/theme.js`**

```js
// Rutas (router.pathname, sin prefijo de idioma) cuyo contenido ya usa los tokens de tema.
// En las demás se fuerza el modo claro y el botón se oculta, para no mostrar páginas a medio migrar.
export const DARK_READY_ROUTES = [];

export const THEME_STORAGE_KEY = "sc-theme";

export function isDarkReady(pathname) {
  return DARK_READY_ROUTES.includes(pathname);
}

// Se ejecuta en <head> antes del primer pintado: evita el destello claro → oscuro.
export const themeInitScript = `(function(){try{var d=document.documentElement;if(d.getAttribute("data-dark-ready")!=="true")return;if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")d.setAttribute("data-theme","dark");}catch(e){}})();`;
```

- [ ] **Step 2: Reescribir `src/pages/_document.tsx` como clase**

Hace falta `getInitialProps` para conocer la ruta (`ctx.pathname` es el patrón, p. ej. `/blog/[slug]`, sin locale) al renderizar `<html>`.

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";
import { isDarkReady, themeInitScript } from "../../lib/theme";

type Props = DocumentInitialProps & { darkReady: boolean };

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, darkReady: isDarkReady(ctx.pathname) };
  }

  render() {
    return (
      // Sin lang fijo: Next usa el locale activo, así /en/... declara lang="en".
      <Html data-dark-ready={this.props.darkReady ? "true" : undefined}>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Parkinsans:wght@300..800&family=Roboto:wght@400;500;700&family=Teko:wght@300..700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <GoogleAnalytics gaId="G-9FDM09CLBH" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

- [ ] **Step 3: Crear `src/components/theme/ThemeProvider.jsx`**

`theme` empieza en `null` y solo se lee de `localStorage` tras montar: así el primer render del cliente coincide con el del servidor y el efecto no borra el `data-theme` que puso el script.

```jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isDarkReady, THEME_STORAGE_KEY } from "../../../lib/theme";

const ThemeContext = createContext({ theme: "light", ready: false, toggleTheme: () => {} });

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const { pathname } = useRouter();
  const ready = isDarkReady(pathname);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  // En cada navegación: oscuro solo si la página destino ya está migrada.
  useEffect(() => {
    if (theme === null) return;
    const root = document.documentElement;
    if (ready && theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [ready, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme ?? "light", ready, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

- [ ] **Step 4: Envolver la app en `_app.tsx`**

Añadir el import:

```tsx
import { ThemeProvider } from '../components/theme/ThemeProvider'
```

Y en el `return` de `App`, cambiar `<Component {...pageProps} />` por:

```tsx
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
```

- [ ] **Step 5: Verificar con una ruta de prueba temporal**

Poner temporalmente `export const DARK_READY_ROUTES = ["/"];`, levantar el preview (`preview_start` con el servidor del proyecto; si está ocupado, `npm run build` + `npx next start -p 3001`) y ejecutar con `javascript_tool` en `/`:

```js
localStorage.setItem("sc-theme", "dark"); location.reload();
```

Tras recargar:

```js
[document.documentElement.dataset.darkReady, document.documentElement.dataset.theme, getComputedStyle(document.body).backgroundColor]
```

Expected: `["true", "dark", "rgb(11, 16, 32)"]`. El resto de la home seguirá clara (aún no está migrada); aquí solo se valida el mecanismo.

En `/blog` (no está en la lista):

Expected: `[undefined, undefined, "rgb(253, 253, 253)"]`.

Al terminar, `localStorage.removeItem("sc-theme")` y **devolver `DARK_READY_ROUTES` a `[]`**.

- [ ] **Step 6: Build y commit**

Run: `npm run build` → Expected: sin errores de tipos en `_document.tsx`.

```bash
git add lib/theme.js src/components/theme/ThemeProvider.jsx src/pages/_document.tsx
git add -p src/pages/_app.tsx
git commit -m "feat: aplicar el tema guardado antes del pintado y en cada navegación"
```

---

### Task 3: Botón de tema en el navbar

**Files:**
- Create: `src/components/theme/ThemeToggle.jsx`, `src/components/theme/ThemeToggle.module.css`
- Modify: `src/components/NavBar.jsx` (junto a `<LanguageSwitcher />`)
- Modify: `public/locales/es/common.json`, `public/locales/en/common.json`

**Interfaces:**
- Consumes: `useTheme()` de Task 2.
- Produces: `export default function ThemeToggle()`; claves i18n `theme.toDark`, `theme.toLight`.

- [ ] **Step 1: Textos i18n**

En `public/locales/es/common.json`, añadir al nivel raíz (junto a `"nav"`):

```json
  "theme": {
    "toDark": "Activar modo oscuro",
    "toLight": "Activar modo claro"
  },
```

En `public/locales/en/common.json`:

```json
  "theme": {
    "toDark": "Switch to dark mode",
    "toLight": "Switch to light mode"
  },
```

- [ ] **Step 2: `ThemeToggle.jsx`**

El icono se elige con CSS según `[data-theme]` y no con estado de React: no hay desajuste de hidratación ni salto de icono al cargar.

```jsx
import { useTranslation } from "next-i18next";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { t } = useTranslation("common");
  const { theme, ready, toggleTheme } = useTheme();

  if (!ready) return null;

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t("theme.toLight") : t("theme.toDark")}
      title={isDark ? t("theme.toLight") : t("theme.toDark")}
    >
      <svg className={styles.moon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg className={styles.sun} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
```

- [ ] **Step 3: `ThemeToggle.module.css`**

Mismo tamaño y borde que `LanguageSwitcher` para que queden alineados.

```css
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, background-color 0.2s;
}

.toggle:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toggle:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

.sun {
  display: none;
}

:global([data-theme="dark"]) .sun {
  display: block;
}

:global([data-theme="dark"]) .moon {
  display: none;
}
```

- [ ] **Step 4: Montarlo en `NavBar.jsx`**

Import:

```jsx
import ThemeToggle from "./theme/ThemeToggle";
```

Antes de `<LanguageSwitcher />`:

```jsx
            <ThemeToggle />
            <LanguageSwitcher />
```

- [ ] **Step 5: Verificar**

Con `DARK_READY_ROUTES = ["/"]` temporal, en `/`: `find` "Activar modo oscuro" → existe; clic → `document.documentElement.dataset.theme === "dark"` y `localStorage.getItem("sc-theme") === "dark"`; el aria-label pasa a "Activar modo claro". En `/en`: aria-label en inglés. En `/blog`: `find` no encuentra el botón. Revertir la lista a `[]`.

- [ ] **Step 6: Commit**

```bash
git add src/components/theme/ThemeToggle.jsx src/components/theme/ThemeToggle.module.css src/components/NavBar.jsx
git add -p public/locales/es/common.json public/locales/en/common.json
git commit -m "feat: botón de modo claro/oscuro en el navbar"
```

---

### Task 4: Shell del sitio en oscuro (header, navbar, menú móvil, footer, logo, selector de idioma)

**Files:**
- Create: `scripts/make-dark-logo.mjs` → genera `public/images/locosc-dark.webp`
- Modify: `src/components/Layout.jsx`, `src/components/NavBar.jsx`, `src/components/Footer.jsx`, `src/components/LanguageSwitcher.jsx`, `src/styles/Navbar.module.css`, `src/styles/globals.css` (`.burgerMenuSection`, `.menuItem`)

**Interfaces:**
- Consumes: utilidades `bg-surface`, `text-ink`, `text-muted`, `border-line`, `hover:bg-surface-3`, `bg-brand-solid`, `hover:bg-brand-hover` (Task 1).
- Produces: clases globales `.logoLight` / `.logoDark` para alternar el logo.

- [ ] **Step 1: Generar el logo oscuro**

`scripts/make-dark-logo.mjs`:

```js
// Genera public/images/locosc-dark.webp: la palabra "SALAZAR" (navy) pasa a claro para fondos oscuros.
// El isotipo (x < 200) y "CODE" (azul brillante, verde > 80) no se tocan.
import sharp from "sharp";

const SRC = "public/images/locosc.webp";
const OUT = "public/images/locosc-dark.webp";
const LIGHT = [232, 237, 247]; // --ink oscuro (#e8edf7)

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < info.height; y++) {
  for (let x = 200; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a > 0 && r < 60 && g < 80 && b > r) {
      data[i] = LIGHT[0];
      data[i + 1] = LIGHT[1];
      data[i + 2] = LIGHT[2];
    }
  }
}
await sharp(data, { raw: info }).webp({ quality: 95 }).toFile(OUT);
console.log("ok", OUT);
```

Run: `node scripts/make-dark-logo.mjs` → Expected: `ok public/images/locosc-dark.webp`.
Abrir la imagen con Read: "SALAZAR" claro, "CODE" azul, isotipo intacto. Si quedan bordes navy, subir el umbral de `g` a 90 y regenerar.

- [ ] **Step 2: Alternar logos con CSS en `globals.css`**

```css
.logoDark {
  display: none;
}

[data-theme="dark"] .logoLight {
  display: none;
}

[data-theme="dark"] .logoDark {
  display: block;
}
```

En `NavBar.jsx`, añadir el import `import logoDark from "../../public/images/locosc-dark.webp";` y cambiar el `<Image>` del logo por:

```jsx
              <Image src={logo} width={200} height={60} alt="SalazarCode" className="logoLight" />
              <Image src={logoDark} width={200} height={60} alt="" aria-hidden="true" className="logoDark" />
```

Hacer lo mismo en `Footer.jsx` (`width={300}`).

- [ ] **Step 3: Header y links del navbar**

`Layout.jsx`: `bg-white` → `bg-surface` en el div fijo del navbar.

`NavBar.jsx`: en los 14 `Link`, `text-slate-700 hover:bg-slate-100` → `text-body hover:bg-surface-3`. En el botón de contacto, `bg-[#0575E6]` → `bg-brand-solid`, y `hover:bg-[#021B79] active:bg-[#021B79]` → `hover:bg-brand-hover active:bg-brand-hover`. En el SVG del menú, `stroke-slate-700` → `stroke-[var(--ink)]`.

`globals.css`, `.burgerMenuSection`: `background-color: #fff` → `var(--surface)`. `.menuItem`: `border-bottom: 1px solid #c9c9c9` → `1px solid var(--border)`. Hacer lo mismo en el `.burgerMenuSection` de `Navbar.module.css`.

- [ ] **Step 4: Footer**

`Footer.jsx`: `bg-white` → `bg-surface`, `text-gray-900` → `text-ink`, `text-gray-600` y `text-gray-500` → `text-muted`, `border-gray-200` → `border-line`.

- [ ] **Step 5: Selector de idioma (estilos inline)**

`LanguageSwitcher.jsx`: `border: "1px solid #e2e8f0"` → `"1px solid var(--border)"`, `background: "white"` → `"var(--surface)"`, `color: "#374151"` → `"var(--text)"`. Aplicar lo mismo al menú desplegable del archivo (su `background`, `border` y el `color` de cada opción). El hover de la opción activa va a `var(--surface-3)`.

- [ ] **Step 6: Verificar**

Aún no hay rutas listas; forzar el oscuro en `/blog` con `javascript_tool`:

```js
document.documentElement.setAttribute("data-theme", "dark");
```

Revisar con screenshot el navbar, el menú móvil (`resize_window` preset `mobile`, abrir el menú) y el footer. Expected: fondo `#121a2f`, texto claro, el logo con "SALAZAR" claro y sin ningún blanco suelto. Comprobar que en claro (`removeAttribute("data-theme")`) todo se ve igual que antes. Restaurar `resize_window` a `desktop`.

- [ ] **Step 7: Commit**

```bash
git add scripts/make-dark-logo.mjs public/images/locosc-dark.webp src/components/Layout.jsx src/components/NavBar.jsx src/components/Footer.jsx src/components/LanguageSwitcher.jsx src/styles/Navbar.module.css
git add -p src/styles/globals.css
git commit -m "feat: navbar, footer, logo y selector de idioma con tokens de tema"
```

---

## Receta de migración (la usan las Tasks 5–8)

Cada página se migra con las mismas reglas. **La regla de oro: tokenizar solo lo que está sobre fondo claro.** El texto blanco sobre un hero o banda oscura sigue siendo `#fff`.

**1. CSS Modules y `globals.css`:**

| Valor actual | Si es… | Reemplazo |
|---|---|---|
| `#fff`, `#ffffff`, `white` | `background` de tarjeta o sección | `var(--surface)` |
| `#fdfdfd` | fondo de página | `var(--bg)` |
| `#f8fafc`, `#f9fafb`, `#eff6ff` | fondo suave | `var(--surface-2)` |
| `#f1f5f9`, `#f3f4f6` | chip, botón gris | `var(--surface-3)` |
| `#e5e7eb`, `#e2e8f0`, `#cbd5e1` | `border` | `var(--border)` |
| `#1a1a2e`, `#0f172a`, `#111827` | `color` de título o texto | `var(--ink)` |
| `#212427`, `#374151`, `#334155` | `color` de párrafo | `var(--text)` |
| `#4b5563`, `#64748b`, `#6b7280` | `color` secundario | `var(--text-muted)` |
| `#94a3b8`, `#9ca3af` | `color` de metadatos | `var(--text-subtle)` |
| `#0072ff`, `#0575e6`, `#1152d4` | `color` de link o acento | `var(--brand)` |
| `#0575e6`, `#1152d4` | `background` de botón con texto blanco | `var(--brand-solid)` |
| `#021b79` | `background` en hover | `var(--brand-hover)` |
| `#7c3aed` | `color` de texto | `var(--violet)` |
| `box-shadow: … rgba(0,0,0,.0x)` | sombra de tarjeta | `var(--shadow)` |

No se tocan: los degradados de marca (`#0072ff → #00c6ff`, `#0072ff → #7c3aed`), los fondos navy (`#0d1b4b`, `#1a1a2e` usados como **fondo**), los colores de estado (verde `#10b981`, ámbar `#f59e0b`) ni los colores de marcas ajenas (`#61dafb` de React).

**2. Tailwind:** `bg-white` → `bg-surface` · `bg-slate-50` → `bg-surface-2` · `bg-slate-100` → `bg-surface-3` · `text-slate-900`/`text-gray-900` → `text-ink` · `text-slate-700`/`text-slate-600`/`text-gray-600` → `text-body` o `text-muted` (según el peso visual) · `text-slate-500`/`text-gray-500`/`text-slate-400` → `text-muted`/`text-subtle` · `border-slate-100`/`border-slate-200`/`border-gray-200` → `border-line`. Las clases `text-white`, `bg-white/10`, `border-white/10` y `bg-slate-800/900` suelen estar dentro de secciones oscuras: se quedan.

**3. Estilos inline (`style={{ … }}`):** misma tabla, escribiendo el token como string: `color: "#1a1a2e"` → `color: "var(--ink)"`, `background: "#fff"` → `background: "var(--surface)"`. Las filas zebra `i % 2 ? "#f8fafc" : "#fff"` pasan a `i % 2 ? "var(--surface-2)" : "var(--surface)"`. Si un archivo define objetos de estilo compartidos (`const card = {…}`, `const sectionTitle = {…}`), se cambian ahí una sola vez.

**4. Imágenes y SVG:** los diagramas inline con `fill="#fff"` o `fill="#1a1a2e"` pasan a `fill="var(--surface)"` / `fill="var(--ink)"`. Las capturas PNG/WebP con fondo blanco se dejan, pero dentro de un contenedor con `border-radius` y `border: 1px solid var(--border)` para que no parezcan un recorte.

**5. Cierre de cada lote:** añadir las rutas a `DARK_READY_ROUTES` en `lib/theme.js` (el patrón de `router.pathname`, p. ej. `"/blog/[slug]"`), y comprobar en oscuro **y** en claro.

**Verificación por página** (con `javascript_tool`, en oscuro): este snippet lista los elementos con texto cuyo color tiene menos de 4.5:1 de contraste con su fondo efectivo. Expected: `[]`, o solo elementos dentro de heros con imagen de fondo, que se revisan a ojo.

```js
(() => {
  const lum = (c) => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.backgroundImage !== "none") return null; const m = s.backgroundColor.match(/[\d.]+/g); if (m && (m[3] === undefined || +m[3] > 0.5)) return s.backgroundColor; } return getComputedStyle(document.body).backgroundColor; };
  const bad = [];
  document.querySelectorAll("main *, article *, footer *, nav *").forEach((el) => {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
    const bg = bgOf(el); if (!bg) return;
    const [a, b] = [lum(getComputedStyle(el).color), lum(bg)].sort((x, y) => y - x);
    const r = (a + 0.05) / (b + 0.05);
    if (r < 4.5) bad.push(`${r.toFixed(2)} ${el.tagName} "${el.textContent.trim().slice(0, 40)}"`);
  });
  return bad.slice(0, 30);
})()
```

---

### Task 5: Home (`/`)

**Files:**
- Modify: `src/styles/Index.module.css`, `src/styles/CreativeWebDesign.module.css`, `src/components/HotelAgentsSection.jsx`, `src/components/AIAgentsSection.jsx`, `src/components/WebDevSection.jsx`, `src/components/LogosSlide.jsx`, `src/pages/index.jsx` (solo si tiene colores inline fuera de los componentes), `lib/theme.js`

**Interfaces:**
- Consumes: tokens (Task 1), receta de migración.
- Produces: `DARK_READY_ROUTES = ["/"]`.

- [ ] **Step 1:** Aplicar la receta a `Index.module.css`: `.sectionTitle`/`.profileName` → `var(--ink)`; `.profileCard` → `background: var(--surface)`, `box-shadow: var(--shadow)`, borde `var(--border)`; repetir con el resto de reglas del archivo (bio, highlight cards, tarjetas de posts y proyectos).
- [ ] **Step 2:** `HotelAgentsSection.jsx` y `AIAgentsSection.jsx`: `bg-white` → `bg-surface`, `text-slate-900` → `text-ink`, `text-slate-600/700` → `text-body`/`text-muted`, `#1152d4` como texto → `text-brand`. Las partes `bg-slate-800`, `text-white` y `bg-white/10` ya son de bandas oscuras: se quedan.
- [ ] **Step 3:** `WebDevSection.jsx` ya tiene sus `dark:` (`dark:bg-slate-900`, etc.). Cambiar `dark:bg-slate-900` → `dark:bg-surface` y `dark:border-slate-800` → `dark:border-line` para que use el navy de la paleta y no el slate de Tailwind.
- [ ] **Step 4:** `CreativeWebDesign.module.css` y `LogosSlide.jsx`, según la receta. Si los logos de clientes son PNG oscuros sobre transparente, darles `background: #fff; border-radius: 12px; padding: 8px` en oscuro (`:global([data-theme="dark"]) .logo {…}`), para que no se pierdan sobre el navy.
- [ ] **Step 5:** `lib/theme.js` → `export const DARK_READY_ROUTES = ["/"];`
- [ ] **Step 6: Verificar.** `npm run build`; preview en `/` y `/en` en oscuro: el snippet de contraste devuelve `[]` (o solo elementos de heros con imagen); screenshot de escritorio y móvil; recarga con `sc-theme=dark` sin destello claro; captura en claro idéntica a antes. Probar el botón de WhatsApp sobre el fondo oscuro.
- [ ] **Step 7: Commit**

```bash
git add src/styles/Index.module.css src/styles/CreativeWebDesign.module.css src/components/AIAgentsSection.jsx src/components/WebDevSection.jsx src/components/LogosSlide.jsx lib/theme.js
git add -p src/components/HotelAgentsSection.jsx src/pages/index.jsx
git commit -m "feat: home compatible con modo oscuro"
```

---

### Task 6: Blog — listado y artículos MDX (`/blog`, `/blog/[slug]`)

**Files:**
- Modify: `src/pages/blog/index.jsx`, `src/pages/blog/[slug].tsx:66`, `src/components/MDXComponents.tsx`, `src/components/ViewCounter.tsx`, `src/components/viewsCounter.module.css`, `src/styles/globals.css` (estilos de `prose`), `lib/theme.js`

- [ ] **Step 1:** `[slug].tsx`: `className="prose mx-auto …"` → `className="prose dark:prose-invert mx-auto …"`.
- [ ] **Step 2:** Ajustar la tipografía de los artículos a la paleta en `globals.css`:

```css
.prose {
  --tw-prose-headings: var(--ink);
  --tw-prose-body: var(--text);
  --tw-prose-links: var(--brand);
  --tw-prose-bold: var(--ink);
  --tw-prose-hr: var(--border);
  --tw-prose-quote-borders: var(--brand);
  --tw-prose-invert-headings: var(--ink);
  --tw-prose-invert-body: var(--text);
  --tw-prose-invert-links: var(--brand);
  --tw-prose-invert-bold: var(--ink);
  --tw-prose-invert-hr: var(--border);
}
```

- [ ] **Step 3:** `blog/index.jsx` (7 hex inline y un `text-gray-400`), `MDXComponents.tsx`, `ViewCounter.tsx` y `viewsCounter.module.css`, según la receta.
- [ ] **Step 4:** Revisar los bloques de código: si `mdx-prism` deja `pre` con fondo claro, añadir en `globals.css` `[data-theme="dark"] .prose pre { background: #0a0f1e; border: 1px solid var(--border); }`.
- [ ] **Step 5:** `DARK_READY_ROUTES = ["/", "/blog", "/blog/[slug]"]`.
- [ ] **Step 6: Verificar** en `/blog` y en dos artículos MDX (uno ES y uno EN) con el snippet de contraste y screenshots en ambos temas. `npm run build`.
- [ ] **Step 7: Commit** — `feat: blog y artículos MDX compatibles con modo oscuro` (solo los archivos de esta tarea; `[slug].tsx` tiene cambios ajenos → `git add -p`).

---

### Task 7: Artículos con página dedicada y cursos

**Files:**
- Modify: `src/pages/blog/jev-typesafe-ai-modelo-decisiones.jsx`, `gpt-6-astra-vs-fable-5-1-programar.jsx`, `vision-computadora-mediapipe.jsx`, `ai-agents-programming-2026.jsx`, `agentes-ia-programacion-2026.jsx`, `consejos-skills-claude-code.jsx` (y la página dedicada del traductor de lenguaje de señas, si existe al ejecutar); `src/components/CourseLayout.jsx`, `CourseAnimations.tsx`, `CourseDiagrams.tsx`; `src/pages/cursos/**/index.jsx`; `lib/theme.js`

Son los archivos con más color inline (40–65 cada uno). Casi todos definen objetos compartidos (`sectionTitle`, `sectionLead`, `card`) al principio: empezar por ahí y luego recorrer los `style={{…}}` del JSX con la receta.

- [ ] **Step 1:** Migrar los 6 artículos dedicados (un commit por artículo si el diff es grande). Para cada uno: snippet de contraste en oscuro y screenshot en claro para comparar.
- [ ] **Step 2:** `CourseLayout.jsx` (11 inline + `prose` → `prose dark:prose-invert`) y los diagramas. Según la memoria del proyecto, el texto de los diagramas está en `foreignObject`: su `color` se hereda, así que basta con tokenizar los `fill`/`stroke` de las cajas.
- [ ] **Step 3:** Páginas de `src/pages/cursos/`.
- [ ] **Step 4:** Añadir a `DARK_READY_ROUTES` las rutas exactas de cada página migrada (`"/blog/jev-typesafe-ai-modelo-decisiones"`, `"/cursos"`, `"/cursos/javascript"`, …).
- [ ] **Step 5:** `npm run build` y commit.

---

### Task 8: Resto de páginas por lotes

Mismo procedimiento que la Task 7. Cada lote es un commit y amplía `DARK_READY_ROUTES`:

1. **Portafolio y proyectos:** `portafolio/index.jsx` + `Portfolio.module.css`, `proyectos/index.jsx`, `proyectos/*.jsx` + `ProyectoDetalle.module.css`. `velmax_consultorios`, `colegio_san_justino`, `app_fruver` y `dr_machado_diagnostics` ya tienen clases `dark:`: revisarlas.
2. **Landings comerciales:** `agentes-ai.jsx` (ya tiene `dark:` completo: casi solo hay que añadir la ruta), `agentes-ia-hoteles.jsx`, `consultoria-ia.jsx` + `ConsultoriaIA.module.css`, `desarrollo-web.jsx`, `services/`, `precios/`, `ecommerce/`, `contact/` + `contact.module.css`.
3. **Elementos UI y demos:** `elements/`, `*Page/index.jsx` + sus `*Page.module.css`, `UIComponentsLibrary.module.css`, `VideoCard.module.css`.
4. **Legales y certificados:** `certificados/`, `politicas/`, `terminos/`.

- [ ] **Step final:** cuando todas las páginas con `Layout` estén migradas, reemplazar la lista por `export function isDarkReady() { return true; }`, borrar `DARK_READY_ROUTES` y el atributo `data-dark-ready` (`_document.tsx` y el script), y simplificar `ThemeToggle` quitando el `if (!ready) return null`.

---

## Decisiones tomadas (y por qué)

- **Toggle explícito, claro por defecto:** lo pediste así, y el sitio es claro por diseño. Seguir al sistema operativo haría que media audiencia viera de entrada páginas a medio migrar.
- **`data-theme` + tokens CSS, no pares `dark:`:** hay tres sistemas de estilo (CSS Modules, Tailwind e inline). Las variables CSS funcionan en los tres; `dark:` solo en Tailwind.
- **Migración por rutas habilitadas:** son unas 56 páginas y cientos de colores inline. Sin la lista, activar el oscuro mostraría texto `#1a1a2e` sobre fondo navy en todo lo que falte por migrar.
- **Script inline en `<head>`:** es la única forma de evitar el destello claro → oscuro en un sitio estático/SSR.
- **El azul del modo claro no se toca:** `#0072ff` (4.3:1 sobre blanco) y el botón `#0575e6` (4.47:1) quedan un poco por debajo de AA. Pasar a `#0066e6` lo arreglaría (5.2:1), pero cambia el look actual; queda como mejora aparte.

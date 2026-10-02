# Herramientas para migrar páginas al modo oscuro

El tema son variables CSS (`--ink`, `--surface`, …) definidas en `src/styles/globals.css`. Una página solo
puede ponerse oscura cuando usa esas variables; mientras no esté en `DARK_READY_ROUTES` (`lib/theme.js`)
se muestra siempre en claro y el botón del navbar se oculta.

Para migrar una página **sin** pares `dark:` propios:

```bash
# 1) prueba en seco: lista qué cambiaría
node scripts/dark-mode/darkify-inline.mjs   src/pages/mi-pagina.jsx        # style={{ color: "#..." }}, objetos de estilo, ternarios
node scripts/dark-mode/darkify-css.mjs      src/styles/MiPagina.module.css # CSS Modules (incluye fondos de varias capas)
node scripts/dark-mode/darkify-tailwind.mjs src/pages/mi-pagina.jsx        # clases bg-white, text-slate-900, border-slate-200…

# 2) aplicar (añadir --apply). Son idempotentes: se pueden repetir.
node scripts/dark-mode/darkify-inline.mjs --apply src/pages/mi-pagina.jsx

# 3) archivo con cambios ajenos sin commitear: --index deja en el índice solo mis cambios (HEAD + herramienta)
node scripts/dark-mode/darkify-inline.mjs --apply --index src/pages/mi-pagina.jsx
```

Reglas que aplican las herramientas (el modo claro queda idéntico):

- Títulos → `var(--ink)`, párrafos → `var(--text-soft)` / `var(--text-muted)`, metadatos → `var(--text-subtle)`.
- Fondos blancos/grises → `var(--surface)`, `var(--surface-2)`, `var(--surface-3)`; bordes → `var(--border)`.
- Pastillas de color → `light-dark(<valor original>, <valor oscuro>)`.
- **No tocan** el texto blanco ni los degradados de marca: esas zonas son oscuras en los dos modos.
- No usarlas en páginas que ya traen sus pares `dark:` de Tailwind (`agentes-ai`, `agentes-ia-hoteles`,
  `proyectos/app_fruver`, …): ahí basta con añadir la ruta a la lista.

Después de migrar, abrir la página en oscuro y pegar `browser-checks.js` en la consola:

```js
window.__contrast("body *"); // textos por debajo de 4.5:1
window.__islands();          // bloques grandes que siguen claros
```

Los avisos que ya existen idénticos en modo claro (texto blanco sobre `#0072ff`, marcas de agua, emojis) no
son del tema. `node scripts/check-theme-contrast.mjs` valida la paleta (los pares de tokens).

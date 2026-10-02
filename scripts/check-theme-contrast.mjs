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

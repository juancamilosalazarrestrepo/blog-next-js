// Migra declaraciones de color en CSS Modules a tokens de tema. Idempotente.
// Uso: node scripts/dark-mode/darkify-css.mjs [--apply] archivo.css ...
import { readFileSync, writeFileSync } from "node:fs";

const mapOf = (list, to) => Object.fromEntries(list.map((k) => [k, to]));

const COLOR = {
  ...mapOf(["#0f172a", "#1a1a2e", "#111827", "#1e293b", "#333", "#333333", "#2d3748", "#1f2937", "#212529", "#222", "#222222"], "var(--ink)"),
  ...mapOf(["#374151", "#4b5563", "#334155", "#475569", "#555", "#555555", "#444", "#444444"], "var(--text-soft)"),
  ...mapOf(["#666", "#666666", "#6b7280", "#64748b", "#718096", "#777", "#777777"], "var(--text-muted)"),
  ...mapOf(["#94a3b8", "#9ca3af", "#999", "#999999", "#a0aec0"], "var(--text-subtle)"),
  "#0072ff": "var(--brand)",
  "#0575e6": "var(--brand)",
  "#1152d4": "var(--brand)",
  "#1e3a8a": "light-dark(#1e3a8a, #93c5fd)",
  "#1e40af": "light-dark(#1e40af, #93c5fd)",
  "#7c3aed": "var(--violet)",
};

const BG = {
  ...mapOf(["#fff", "#ffffff", "white"], "var(--surface)"),
  ...mapOf(["#f8fafc", "#f8f9fa", "#f9fafb", "#fafafa", "#f7f7f7"], "var(--surface-2)"),
  ...mapOf(["#f1f5f9", "#f3f4f6", "#f0f0f0", "#eee", "#eeeeee"], "var(--surface-3)"),
  "#f9f9f9": "var(--surface-2)",
  "#f5f5f5": "var(--surface-3)",
  "#f7f9fc": "light-dark(#f7f9fc, var(--bg))",
  "#e2e8f0": "var(--border)",
  "#eff6ff": "light-dark(#eff6ff, rgba(77,154,255,0.14))",
  "#f0fdf4": "light-dark(#f0fdf4, rgba(16,185,129,0.12))",
  "#f0f4ff": "light-dark(#f0f4ff, rgba(77,154,255,0.12))",
  "#f8faff": "light-dark(#f8faff, rgba(77,154,255,0.08))",
};

const BORDER = {
  ...mapOf(["#e2e8f0", "#e5e7eb", "#e1e5e9", "#e0e0e0", "#ddd", "#dddddd"], "var(--border)"),
  "#cbd5e1": "light-dark(#cbd5e1, #3a4a6d)",
  "#f1f5f9": "light-dark(#f1f5f9, #2f3d5e)",
  "#eef2f7": "light-dark(#eef2f7, #2f3d5e)",
  "rgba(0, 0, 0, 0.04)": "color-mix(in srgb, var(--ink) 4%, transparent)",
  "rgba(0, 0, 0, 0.05)": "color-mix(in srgb, var(--ink) 5%, transparent)",
  "rgba(0, 0, 0, 0.06)": "color-mix(in srgb, var(--ink) 6%, transparent)",
  "rgba(0, 0, 0, 0.08)": "color-mix(in srgb, var(--ink) 8%, transparent)",
};

const DECL = /(^|[;{\s])(color|background|background-color|border|border-top|border-bottom|border-left|border-right|border-color)(\s*:\s*)([^;}\n]+)/g;

function mapValue(prop, value, stats) {
  const v = value.trim();
  const key = v.toLowerCase();
  let out;
  if (prop === "color") out = COLOR[key];
  else if (prop === "background" || prop === "background-color") out = BG[key];
  else {
    // border*: sustituir solo el color (último token / rgba)
    const m = v.match(/^(.*?)(#[0-9a-fA-F]{3,6}|rgba?\([^)]*\)|\bwhite\b)\s*$/);
    if (m) {
      const c = m[2].toLowerCase();
      const to = BORDER[c] ?? (prop === "border-color" ? BG[c] : undefined);
      if (to) out = m[1] + to;
    }
  }
  if (out === undefined && (prop === "background" || prop === "background-color")) {
    const m = v.match(/^(.*,\s*)(#fff(?:fff)?|white)$/i);
    if (m) out = m[1] + "var(--surface)";
  }
  if (out === undefined) return value;
  stats[`${prop}: ${v}  ->  ${out}`] = (stats[`${prop}: ${v}  ->  ${out}`] || 0) + 1;
  return value.replace(v, out);
}

export function transformCss(text, stats = {}) {
  return text.replace(DECL, (whole, pre, prop, sep, value) => pre + prop + sep + mapValue(prop, value, stats));
}

if (process.argv[1] && process.argv[1].endsWith("darkify-css.mjs")) {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const files = args.filter((a) => !a.startsWith("--"));
  const total = {};
  for (const f of files) {
    const raw = readFileSync(f, "utf8");
    const crlf = raw.includes("\r\n");
    const stats = {};
    const out = transformCss(raw.replace(/\r\n/g, "\n"), stats);
    const n = Object.values(stats).reduce((a, b) => a + b, 0);
    console.log(`${apply ? "APLICA" : "seco  "} ${f}: ${n} reemplazos`);
    for (const [k, v] of Object.entries(stats)) total[k] = (total[k] || 0) + v;
    if (apply) writeFileSync(f, crlf ? out.replace(/\n/g, "\r\n") : out);
  }
  if (!apply || process.env.DETAIL) {
    console.log("\nDetalle agregado:");
    for (const [k, v] of Object.entries(total).sort((a, b) => b[1] - a[1])) console.log(String(v).padStart(4), k);
  }
}

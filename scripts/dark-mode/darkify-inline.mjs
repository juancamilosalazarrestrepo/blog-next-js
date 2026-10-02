// Migra colores inline (objetos de estilo / style={{}}) a tokens de tema. Solo toca pares `propiedad: "valor"`
// y expresiones con ternario de esas propiedades. Idempotente.
// Uso: node scripts/dark-mode/darkify-inline.mjs [--apply] [--index] archivo1 archivo2 ...   (sin --apply = prueba en seco)
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const INK = ["#1a1a2e", "#0f172a", "#1e293b", "#111827"];
const SOFT = ["#374151", "#4b5563", "#334155"];
const MUTED = ["#6b7280", "#64748b"];
const SUBTLE = ["#94a3b8", "#9ca3af"];
const mapOf = (list, to) => Object.fromEntries(list.map((k) => [k, to]));

// texto
const COLOR = {
  ...mapOf(INK, "var(--ink)"),
  ...mapOf(SOFT, "var(--text-soft)"),
  ...mapOf(MUTED, "var(--text-muted)"),
  ...mapOf(SUBTLE, "var(--text-subtle)"),
  "#0072ff": "var(--brand)",
  "#7c3aed": "var(--violet)",
  "#8b5cf6": "var(--violet)",
  "#1e40af": "light-dark(#1e40af, #93c5fd)",
  "#166534": "light-dark(#166534, #86efac)",
};

// fondos (valor exacto de la propiedad)
const BG = {
  "#fff": "var(--surface)",
  "#ffffff": "var(--surface)",
  white: "var(--surface)",
  "#f8fafc": "var(--surface-2)",
  "#f9fafb": "var(--surface-2)",
  "#f9f9f9": "var(--surface-2)",
  "#f5f5f5": "var(--surface-3)",
  "#f1f5f9": "var(--surface-3)",
  "#f3f4f6": "var(--surface-3)",
  "#dcfce7": "light-dark(#dcfce7, rgba(16,185,129,0.18))",
  "#e0e7ff": "light-dark(#e0e7ff, rgba(99,102,241,0.2))",
  "#eff6ff": "light-dark(#eff6ff, rgba(77,154,255,0.14))",
  "#f0fdf4": "light-dark(#f0fdf4, rgba(16,185,129,0.12))",
  "linear-gradient(135deg, #f0f7ff, #f5f3ff)":
    "linear-gradient(135deg, light-dark(#f0f7ff, rgba(0,114,255,0.12)), light-dark(#f5f3ff, rgba(124,58,237,0.12)))",
  "linear-gradient(135deg, #f0fdf4, #f5f3ff)":
    "linear-gradient(135deg, light-dark(#f0fdf4, rgba(16,185,129,0.12)), light-dark(#f5f3ff, rgba(124,58,237,0.12)))",
};

// color dentro de bordes (se sustituye solo el literal hex)
const BORDER_COLOR = {
  "#e5e7eb": "var(--border)",
  "#e2e8f0": "var(--border)",
  "#f1f5f9": "light-dark(#f1f5f9, #2f3d5e)",
  "#dbeafe": "light-dark(#dbeafe, rgba(77,154,255,0.3))",
  "#bfdbfe": "light-dark(#bfdbfe, rgba(77,154,255,0.3))",
  "#d9f99d": "light-dark(#d9f99d, rgba(163,230,53,0.35))",
  "#f8fafc": "var(--surface-2)",
};

function mapLiteral(prop, val) {
  const k = val.toLowerCase();
  if (prop === "color") return COLOR[k];
  if (prop === "background" || prop === "backgroundColor") return BG[k] ?? BG[val];
  const m = val.match(/^(.*?)(#[0-9a-fA-F]{3,6})$/);
  return m && BORDER_COLOR[m[2].toLowerCase()] ? m[1] + BORDER_COLOR[m[2].toLowerCase()] : undefined;
}

function note(stats, key) {
  stats[key] = (stats[key] || 0) + 1;
}

// 1) pares simples  prop: "valor"
const PROP_RE = /\b(color|background|backgroundColor|border|borderTop|borderBottom|borderLeft|borderRight)(\s*:\s*)(["'])([^"'\n]*?)\3/g;
function simplePass(text, stats) {
  return text.replace(PROP_RE, (whole, prop, sep, q, val) => {
    const out = mapLiteral(prop, val);
    if (out === undefined) return whole;
    note(stats, `${prop}: ${val}  ->  ${out}`);
    return `${prop}${sep}${q}${out}${q}`;
  });
}

// 2) ternarios  prop: cond ? "a" : "b"   (se recorre la expresión hasta la coma/llave de nivel 0)
const TERN_PROPS = /\b(color|background|backgroundColor|border|borderTop|borderBottom|borderLeft|borderRight)\s*:\s*/g;
function ternaryPass(text, stats) {
  let out = "";
  let last = 0;
  let m;
  TERN_PROPS.lastIndex = 0;
  while ((m = TERN_PROPS.exec(text))) {
    const start = m.index + m[0].length;
    let i = start;
    let depth = 0;
    let q = null;
    for (; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === q && text[i - 1] !== "\\") q = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        q = c;
        continue;
      }
      if (c === "(" || c === "[" || c === "{") depth++;
      else if (c === ")" || c === "]" || c === "}") {
        if (depth === 0) break;
        depth--;
      } else if (c === "," && depth === 0) break;
      else if (c === "\n" && depth === 0) break;
    }
    const expr = text.slice(start, i);
    if (!expr.includes("?") || expr.includes("`")) continue;
    const prop = m[1];
    const newExpr = expr.replace(/(["'])([^"'\n]*?)\1/g, (w, qq, val) => {
      const to = mapLiteral(prop, val);
      if (to === undefined) return w;
      note(stats, `${prop} (ternario): ${val}  ->  ${to}`);
      return qq + to + qq;
    });
    out += text.slice(last, start) + newExpr;
    last = i;
  }
  return out + text.slice(last);
}

export function transform(text, stats = {}) {
  return ternaryPass(simplePass(text, stats), stats);
}

// ---- CLI
if (process.argv[1] && process.argv[1].endsWith("darkify-inline.mjs")) {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const withIndex = args.includes("--index"); // archivo con cambios ajenos: árbol de trabajo + índice desde HEAD
  const files = args.filter((a) => !a.startsWith("--"));
  const total = {};
  for (const f of files) {
    const raw = readFileSync(f, "utf8");
    const crlf = raw.includes("\r\n");
    const stats = {};
    const out = transform(raw.replace(/\r\n/g, "\n"), stats);
    const n = Object.values(stats).reduce((a, b) => a + b, 0);
    console.log(`${apply ? "APLICA" : "seco  "} ${f}: ${n} reemplazos`);
    for (const [k, v] of Object.entries(stats)) total[k] = (total[k] || 0) + v;
    if (apply) {
      writeFileSync(f, crlf ? out.replace(/\n/g, "\r\n") : out);
      if (withIndex) {
        const head = execFileSync("git", ["show", `HEAD:${f}`], { encoding: "utf8" }).replace(/\r\n/g, "\n");
        const hash = execFileSync("git", ["hash-object", "-w", "--stdin"], { input: transform(head), encoding: "utf8" }).trim();
        execFileSync("git", ["update-index", "--cacheinfo", `100644,${hash},${f}`]);
        console.log("   índice actualizado desde HEAD");
      }
    }
  }
  if (!apply || process.env.DETAIL) {
    console.log("\nDetalle agregado:");
    for (const [k, v] of Object.entries(total).sort((a, b) => b[1] - a[1])) console.log(String(v).padStart(4), k);
  }
}

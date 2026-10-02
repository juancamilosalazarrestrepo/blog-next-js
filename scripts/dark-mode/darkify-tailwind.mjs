// Migra clases de Tailwind de color a utilidades de tema, por cadena de className. Idempotente.
// Uso: node scripts/dark-mode/darkify-tailwind.mjs [--apply] archivo.jsx ...
import { readFileSync, writeFileSync } from "node:fs";

const TOK = "(?<![\\w:/-])"; // el token no va precedido de carácter de clase (permite prefijos de variante: hover:, md: ...)
const NEXT = "(?![\\w/-])"; // ni seguido de sufijo (evita bg-white/10, bg-white-x)

// [regex del token, reemplazo, grupo]; grupo "bg" siempre; "text" se omite si la cadena es de superficie fija
const RULES = [
  ["bg", "bg-white", "bg-surface"],
  ["bg", "bg-slate-50", "bg-surface-2"],
  ["bg", "bg-gray-50", "bg-surface-2"],
  ["bg", "bg-slate-100", "bg-surface-3"],
  ["bg", "bg-gray-100", "bg-surface-3"],
  ["border", "border-slate-200", "border-line"],
  ["border", "border-slate-100", "border-line"],
  ["border", "border-gray-200", "border-line"],
  ["border", "border-gray-100", "border-line"],
  ["text", "text-slate-950", "text-ink"],
  ["text", "text-slate-900", "text-ink"],
  ["text", "text-slate-800", "text-ink"],
  ["text", "text-gray-900", "text-ink"],
  ["text", "text-slate-700", "text-soft"],
  ["text", "text-slate-600", "text-soft"],
  ["text", "text-gray-700", "text-soft"],
  ["text", "text-gray-600", "text-soft"],
  ["text", "text-slate-500", "text-muted"],
  ["text", "text-gray-500", "text-muted"],
];

// Una cadena es "superficie fija" si pinta su propio fondo oscuro/translúcido/de color: ahí el texto no debe seguir el tema.
const FIXED_SURFACE = /(^|[\s:])(bg-white\/|bg-black|bg-slate-(800|900|950)|bg-gray-(800|900)|bg-\[#(0|1)[0-9a-f]{5}\]|bg-(blue|indigo|emerald|green|red|amber|violet|sky|teal)-[5-9]00|bg-gradient-)/;

function transformString(s, stats) {
  const fixed = FIXED_SURFACE.test(s);
  let out = s;
  for (const [group, from, to] of RULES) {
    if (group === "text" && fixed) continue;
    // `bg-white` con texto azul explícito = botón/CTA sobre una sección de color: se queda blanco en ambos temas
    if (from === "bg-white" && /text-(blue|indigo)-\d|text-\[#/.test(s)) continue;
    const re = new RegExp(TOK + from.replace(/[-]/g, "\\-") + NEXT, "g");
    out = out.replace(re, () => {
      stats[`${from} -> ${to}`] = (stats[`${from} -> ${to}`] || 0) + 1;
      return to;
    });
    // variante con opacidad explícita sobre borde: border-slate-200/50 -> border-line/50
    if (group === "border") {
      const re2 = new RegExp(TOK + from.replace(/[-]/g, "\\-") + "/(\\d+)", "g");
      out = out.replace(re2, (_, a) => {
        stats[`${from}/N -> ${to}/N`] = (stats[`${from}/N -> ${to}/N`] || 0) + 1;
        return `${to}/${a}`;
      });
    }
  }
  return out;
}

export function transformTw(text, stats = {}) {
  // className="..." / className={`...`} y cadenas dentro de className={...}
  return text.replace(/(className\s*=\s*)(\{?)(["'`])([^"'`]*?)\3/g, (whole, a, brace, q, val) => {
    const out = transformString(val, stats);
    return out === val ? whole : `${a}${brace}${q}${out}${q}`;
  });
}

if (process.argv[1] && process.argv[1].endsWith("darkify-tailwind.mjs")) {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const total = {};
  for (const f of args.filter((a) => !a.startsWith("--"))) {
    const raw = readFileSync(f, "utf8");
    const crlf = raw.includes("\r\n");
    const stats = {};
    const out = transformTw(raw.replace(/\r\n/g, "\n"), stats);
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

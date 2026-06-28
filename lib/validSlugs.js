import fs from "fs";
import path from "path";

const root = process.cwd();

// Recolecta los slugs válidos (nombres de archivos .mdx) de las carpetas de contenido.
// Se cachea en memoria tras la primera lectura.
let cache = null;

export function getValidSlugs() {
  if (cache) return cache;

  const slugs = new Set();
  const dirs = [
    path.join(root, "data", "posts"),
    path.join(root, "data", "posts", "es"),
    path.join(root, "data", "posts", "en"),
  ];

  for (const dir of dirs) {
    try {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith(".mdx")) slugs.add(file.replace(/\.mdx$/, ""));
      }
    } catch {
      // Ignorar carpetas inaccesibles.
    }
  }

  cache = slugs;
  return cache;
}

export function isValidSlug(slug) {
  if (typeof slug !== "string") return false;
  // Formato seguro: letras, números y guiones.
  if (!/^[a-z0-9-]{1,120}$/i.test(slug)) return false;
  return getValidSlugs().has(slug);
}

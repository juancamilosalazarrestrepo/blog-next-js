// Comprobaciones del modo oscuro para pegar en la consola del navegador (o servir temporalmente desde public/).
// Uso:  window.__contrast("body *")  -> textos por debajo de 4.5:1 (compone capas con transparencia, entiende oklch/color-mix)
//       window.__islands()          -> bloques grandes que siguen claros en una página oscura
// Se ejecutan con el tema oscuro activo (botón del navbar o localStorage "sc-theme" = "dark").
window.__contrast = (scope = "main *, article *, footer *, nav *") => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const over = (t, b) => { const a = t[3]; return [0, 1, 2].map((i) => t[i] * a + b[i] * (1 - a)).concat(1); };
  const effBg = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== "none") return null;
      const c = rgba(s.backgroundColor);
      if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) break;
    }
    let acc = layers.length && layers[layers.length - 1][3] >= 1 ? layers.pop() : rgba(getComputedStyle(document.body).backgroundColor);
    while (layers.length) acc = over(layers.pop(), acc);
    return acc;
  };
  const bad = []; let checked = 0, skipped = 0;
  document.querySelectorAll(scope).forEach((el) => {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
    if (el.closest("script,style,noscript")) return;
    const bg = effBg(el); if (!bg) { skipped++; return; }
    const fg = over(rgba(getComputedStyle(el).color), bg);
    const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
    const r = (a + 0.05) / (b + 0.05); checked++;
    if (r < 4.5) bad.push(`${r.toFixed(2)} ${el.tagName} "${el.textContent.trim().slice(0, 38)}" fg=${getComputedStyle(el).color.slice(0, 22)}`);
  });
  return { path: location.pathname, theme: document.documentElement.dataset.theme ?? null, checked, skipped, bad: bad.slice(0, 40), badTotal: bad.length };
};

// Islas claras: elementos grandes con fondo sólido claro dentro de una página oscura
window.__islands = (minArea = 30000) => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const out = [];
  document.querySelectorAll("body *").forEach((el) => {
    if (el.closest("header,nav")) return;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return;
    const c = rgba(s.backgroundColor);
    if (c[3] < 0.9 || lum(c) < 0.55) return;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < minArea) return;
    out.push(`${Math.round(r.width)}x${Math.round(r.height)} ${el.tagName}.${String(el.className).slice(0, 36)} bg=${s.backgroundColor} text="${(el.textContent || "").trim().slice(0, 24)}"`);
  });
  return { path: location.pathname, count: out.length, islands: out.slice(0, 8) };
};

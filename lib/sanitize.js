// Utilidades de sanitización para entradas de usuario.

const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Escapa caracteres HTML para evitar inyección al interpolar en plantillas de correo.
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);
}

// Elimina saltos de línea para prevenir inyección de cabeceras de correo (CRLF).
export function stripNewlines(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

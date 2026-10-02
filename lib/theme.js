// Rutas (router.pathname, sin prefijo de idioma) cuyo contenido ya usa los tokens de tema.
// En las demás se fuerza el modo claro y el botón se oculta, para no mostrar páginas a medio migrar.
export const DARK_READY_ROUTES = [];

export const THEME_STORAGE_KEY = "sc-theme";

export function isDarkReady(pathname) {
  return DARK_READY_ROUTES.includes(pathname);
}

// Se ejecuta en <head> antes del primer pintado: evita el destello claro → oscuro.
export const themeInitScript = `(function(){try{var d=document.documentElement;if(d.getAttribute("data-dark-ready")!=="true")return;if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")d.setAttribute("data-theme","dark");}catch(e){}})();`;

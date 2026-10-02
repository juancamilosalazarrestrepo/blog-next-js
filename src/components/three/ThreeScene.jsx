import { useEffect, useRef } from "react";

/**
 * Contenedor genérico para las escenas three.js de la biblioteca de componentes.
 * `load` debe ser estable (definido a nivel de módulo) y devolver un módulo cuyo default sea
 * `(container, options) => cleanup`. three.js se descarga en un chunk aparte, solo en el cliente.
 */
export default function ThreeScene({ load, background, className, style, options }) {
  const ref = useRef(null);

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    load().then((mod) => {
      if (cancelled || !ref.current) return;
      cleanup = mod.default(ref.current, { ...options, reducedMotion });
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", background, ...style }}
    />
  );
}

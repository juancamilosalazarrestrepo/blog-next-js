import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Utilidades compartidas                                                     */
/* -------------------------------------------------------------------------- */

const FONT_MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const C = {
  blue: "#0072ff",
  blueSoft: "#eff6ff",
  green: "#10b981",
  greenSoft: "#ecfdf5",
  greenInk: "#065f46",
  amber: "#f59e0b",
  amberSoft: "#fef3c7",
  amberInk: "#92400e",
  slate: "#64748b",
  line: "#e2e8f0",
  ink: "#1f2937",
};

const shell: React.CSSProperties = {
  margin: "24px 0",
  border: `1px solid ${C.line}`,
  borderRadius: 14,
  background: "#ffffff",
  overflow: "hidden",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  padding: "10px 14px",
  background: "#f8fafc",
  borderBottom: `1px solid ${C.line}`,
  fontSize: "0.8rem",
  color: C.slate,
};

/** Fila de celdas de un array, con el indice debajo de cada caja. */
function ArrayCells({
  items,
  active,
  visited = [],
}: {
  items: string[];
  active?: number | null;
  visited?: number[];
}) {
  return (
    <div style={{ overflowX: "auto", padding: "4px 0" }}>
      <div style={{ display: "flex", gap: 8, minWidth: "min-content" }}>
        {items.map((item, i) => {
          const isActive = active === i;
          const isVisited = visited.includes(i) && !isActive;
          return (
            <div key={i} style={{ textAlign: "center", flex: "0 0 auto" }}>
              <div
                style={{
                  minWidth: 58,
                  padding: "12px 10px",
                  borderRadius: 10,
                  fontSize: "1.25rem",
                  lineHeight: 1.2,
                  border: `2px solid ${isActive ? C.amber : isVisited ? C.green : C.line}`,
                  background: isActive ? C.amberSoft : isVisited ? C.greenSoft : "#ffffff",
                  transform: isActive ? "translateY(-4px)" : "none",
                  boxShadow: isActive ? "0 6px 14px rgba(245, 158, 11, 0.25)" : "none",
                  transition: "all 220ms ease",
                }}
              >
                {item}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: FONT_MONO,
                  fontSize: "0.72rem",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? C.amberInk : C.slate,
                  transition: "color 220ms ease",
                }}
              >
                {i}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Array: que es y como se numera                                             */
/* -------------------------------------------------------------------------- */

export function ArrayDiagram({
  name = "frutas",
  items = ["🍎", "🍌", "🍇", "🍓"],
  highlight = null,
}: {
  name?: string;
  items?: string[];
  highlight?: number | null;
}) {
  const literal = `const ${name} = [${items.map((i) => `"${i}"`).join(", ")}];`;

  return (
    <div style={shell}>
      <div style={headerStyle}>
        <span style={{ fontFamily: FONT_MONO, color: C.ink }}>{literal}</span>
        <span>
          un array es una lista ordenada — la posición se llama <strong>índice</strong>
        </span>
      </div>

      <div style={{ padding: "16px 14px" }}>
        <ArrayCells items={items} active={highlight} />

        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            fontSize: "0.82rem",
            color: C.slate,
          }}
        >
          <span
            style={{
              background: C.blueSoft,
              border: `1px solid ${C.blue}`,
              color: "#1e40af",
              borderRadius: 999,
              padding: "4px 10px",
              fontFamily: FONT_MONO,
            }}
          >
            {name}[0] → {items[0]}
          </span>
          <span
            style={{
              background: C.greenSoft,
              border: `1px solid ${C.green}`,
              color: C.greenInk,
              borderRadius: 999,
              padding: "4px 10px",
              fontFamily: FONT_MONO,
            }}
          >
            {name}.length → {items.length}
          </span>
          <span
            style={{
              background: "#fef2f2",
              border: "1px solid #ef4444",
              color: "#991b1b",
              borderRadius: 999,
              padding: "4px 10px",
              fontFamily: FONT_MONO,
            }}
          >
            {name}[{items.length}] → undefined
          </span>
        </div>

        <p style={{ margin: "12px 0 0", fontSize: "0.82rem", color: C.slate, lineHeight: 1.5 }}>
          Ojo: los índices <strong>empiezan en 0</strong>, así que el último elemento siempre está
          en <code style={{ fontFamily: FONT_MONO }}>{`${name}[${name}.length - 1]`}</code>.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bucle for paso a paso (animado)                                            */
/* -------------------------------------------------------------------------- */

type Phase = "init" | "check" | "body" | "inc" | "end";

type Frame = {
  phase: Phase;
  i: number;
  active: number | null;
  visited: number[];
  out: string[];
  note: string;
};

function buildFrames(name: string, items: string[]): Frame[] {
  const n = items.length;
  const frames: Frame[] = [];
  const out: string[] = [];
  const visited: number[] = [];

  frames.push({
    phase: "init",
    i: 0,
    active: null,
    visited: [],
    out: [],
    note: "Inicialización: let i = 0. Solo ocurre una vez, al empezar.",
  });

  for (let i = 0; i < n; i++) {
    frames.push({
      phase: "check",
      i,
      active: null,
      visited: [...visited],
      out: [...out],
      note: `Condición: ¿${i} < ${n}? → true, entramos al cuerpo del bucle.`,
    });

    out.push(items[i]);
    visited.push(i);
    frames.push({
      phase: "body",
      i,
      active: i,
      visited: [...visited],
      out: [...out],
      note: `Cuerpo: console.log(${name}[${i}]) imprime ${items[i]}`,
    });

    frames.push({
      phase: "inc",
      i,
      active: i,
      visited: [...visited],
      out: [...out],
      note: `Incremento: i++ → ahora i vale ${i + 1}. Volvemos a la condición.`,
    });
  }

  frames.push({
    phase: "check",
    i: n,
    active: null,
    visited: [...visited],
    out: [...out],
    note: `Condición: ¿${n} < ${n}? → false. El bucle termina.`,
  });

  frames.push({
    phase: "end",
    i: n,
    active: null,
    visited: [...visited],
    out: [...out],
    note: "Fin del bucle. El programa sigue con la línea de abajo.",
  });

  return frames;
}

function Token({
  children,
  on,
  tone = C.amber,
  bg = C.amberSoft,
  ink = C.amberInk,
}: {
  children: React.ReactNode;
  on: boolean;
  tone?: string;
  bg?: string;
  ink?: string;
}) {
  return (
    <span
      style={{
        borderRadius: 5,
        padding: "1px 4px",
        margin: "0 -1px",
        background: on ? bg : "transparent",
        color: on ? ink : "inherit",
        boxShadow: on ? `inset 0 0 0 1px ${tone}` : "none",
        fontWeight: on ? 700 : 400,
        transition: "all 200ms ease",
      }}
    >
      {children}
    </span>
  );
}

export function ForLoopAnimation({
  name = "frutas",
  items = ["🍎", "🍌", "🍇", "🍓"],
  speed = 1300,
}: {
  name?: string;
  items?: string[];
  speed?: number;
}) {
  const frames = useMemo(() => buildFrames(name, items), [name, items]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const frame = frames[Math.min(step, frames.length - 1)];
  const atEnd = step >= frames.length - 1;

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, frames.length - 1));
  }, [frames.length]);

  const reset = useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);

  // Arranca sola cuando el panel entra en pantalla, salvo que el usuario prefiera
  // menos movimiento. IntersectionObserver es la vía principal, pero no siempre
  // entrega callbacks (webviews, pestañas en segundo plano, prerender), así que
  // medimos también con getBoundingClientRect al hacer scroll: si el observer falla,
  // la animación arranca igual, y si no hay nada visible no arranca antes de tiempo.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const node = rootRef.current;
    if (!node) return;

    let observer: IntersectionObserver | undefined;
    let timer = 0;
    let hecho = false;

    function estaEnPantalla() {
      const r = node!.getBoundingClientRect();
      const alto = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(r.bottom, alto) - Math.max(r.top, 0);
      return visible >= Math.min(r.height, alto) * 0.35;
    }

    function arrancar() {
      if (hecho) return;
      hecho = true;
      limpiar();
      setPlaying(true);
    }

    function revisar() {
      if (estaEnPantalla()) arrancar();
    }

    function limpiar() {
      observer?.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) arrancar();
        },
        { threshold: 0.35 }
      );
      observer.observe(node);
    }
    window.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("resize", revisar, { passive: true });
    timer = window.setTimeout(revisar, 400);

    return limpiar;
  }, []);

  useEffect(() => {
    if (!playing || atEnd) return;
    const id = window.setTimeout(next, speed);
    return () => window.clearTimeout(id);
  }, [playing, atEnd, step, next, speed]);

  useEffect(() => {
    if (atEnd) setPlaying(false);
  }, [atEnd]);

  const btn: React.CSSProperties = {
    border: `1px solid ${C.line}`,
    background: "#ffffff",
    borderRadius: 8,
    padding: "5px 11px",
    fontSize: "0.78rem",
    color: C.ink,
    cursor: "pointer",
    lineHeight: 1.4,
  };

  return (
    <div style={shell} ref={rootRef}>
      <div style={headerStyle}>
        <span>
          Recorrer un array con <strong>for</strong>, paso a paso
        </span>
        <span style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            style={btn}
            onClick={() => (atEnd ? reset() : setPlaying((p) => !p))}
            aria-label={atEnd ? "Repetir animación" : playing ? "Pausar" : "Reproducir"}
          >
            {atEnd ? "↺ repetir" : playing ? "⏸ pausa" : "▶ reproducir"}
          </button>
          <button
            type="button"
            style={btn}
            onClick={() => {
              setPlaying(false);
              next();
            }}
            disabled={atEnd}
            aria-label="Siguiente paso"
          >
            ⏭ paso
          </button>
        </span>
      </div>

      <div style={{ padding: "16px 14px" }}>
        {/* Codigo con la parte activa resaltada */}
        <pre
          style={{
            margin: 0,
            padding: "12px 14px",
            borderRadius: 10,
            background: "#f8fafc",
            border: `1px solid ${C.line}`,
            fontFamily: FONT_MONO,
            fontSize: "0.83rem",
            lineHeight: 1.7,
            color: C.ink,
            overflowX: "auto",
          }}
        >
          <code>
            {"for ("}
            <Token on={frame.phase === "init"}>{"let i = 0"}</Token>
            {"; "}
            <Token on={frame.phase === "check"}>{`i < ${name}.length`}</Token>
            {"; "}
            <Token on={frame.phase === "inc"}>{"i++"}</Token>
            {") {\n  "}
            <Token on={frame.phase === "body"} tone={C.green} bg={C.greenSoft} ink={C.greenInk}>
              {`console.log(${name}[i]);`}
            </Token>
            {"\n}"}
          </code>
        </pre>

        {/* Valor actual de i */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "14px 0 10px",
            fontSize: "0.82rem",
            color: C.slate,
          }}
        >
          <span
            style={{
              fontFamily: FONT_MONO,
              fontWeight: 700,
              color: C.amberInk,
              background: C.amberSoft,
              border: `1px solid ${C.amber}`,
              borderRadius: 8,
              padding: "3px 10px",
            }}
          >
            i = {frame.i}
          </span>
          <span>{frame.note}</span>
        </div>

        <ArrayCells items={items} active={frame.active} visited={frame.visited} />

        {/* Consola */}
        <div
          style={{
            marginTop: 14,
            borderRadius: 10,
            border: `1px solid ${C.line}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              background: "#f1f5f9",
              fontSize: "0.72rem",
              color: C.slate,
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            consola
          </div>
          <div
            style={{
              padding: "10px 12px",
              minHeight: 72,
              fontFamily: FONT_MONO,
              fontSize: "0.85rem",
              color: C.greenInk,
              lineHeight: 1.7,
            }}
          >
            {frame.out.length === 0 ? (
              <span style={{ color: "#94a3b8" }}>(todavía no se imprimió nada)</span>
            ) : (
              frame.out.map((line, i) => <div key={i}>{line}</div>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

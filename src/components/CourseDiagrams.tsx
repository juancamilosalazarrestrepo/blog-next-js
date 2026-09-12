import { ReactNode } from "react";

export function Callout({
  type = "tip",
  children,
}: {
  type?: "tip" | "nota";
  children: ReactNode;
}) {
  const isTip = type === "tip";
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        background: isTip ? "#ecfdf5" : "#eff6ff",
        border: `1px solid ${isTip ? "#10b981" : "#0072ff"}`,
        borderRadius: "10px",
        padding: "16px 18px",
        margin: "20px 0",
      }}
    >
      <span style={{ fontSize: "20px", lineHeight: 1 }}>{isTip ? "💡" : "📌"}</span>
      <div style={{ fontSize: "0.95rem", color: "#1f2937", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export function VariableDiagram({
  name = "edad",
  value = "25",
  type = "number",
}: {
  name?: string;
  value?: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 420 140" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
        <text x="210" y="20" textAnchor="middle" fontSize="13" fill="#64748b" fontFamily="monospace">
          {`let ${name} = ${value};`}
        </text>
        <rect x="30" y="40" width="180" height="80" rx="12" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="120" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0072ff" fontFamily="sans-serif">
          {name}
        </text>
        <text x="120" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="sans-serif">
          (la caja / variable)
        </text>
        <line x1="210" y1="80" x2="260" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#varArrow)" />
        <rect x="270" y="50" width="120" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="330" y="77" textAnchor="middle" fontSize="16" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          {value}
        </text>
        <text x="330" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="sans-serif">
          {type}
        </text>
        <defs>
          <marker id="varArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function ConditionalDiagram({
  condition = "edad >= 18",
  ifTrue = "Es mayor de edad",
  ifFalse = "Es menor de edad",
}: {
  condition?: string;
  ifTrue?: string;
  ifFalse?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 240" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        <rect x="170" y="10" width="140" height="46" rx="10" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="240" y="38" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0072ff" fontFamily="sans-serif">
          Inicio
        </text>
        <line x1="240" y1="56" x2="240" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#condArrow)" />
        <polygon points="240,80 320,125 240,170 160,125" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="240" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e" fontFamily="monospace">
          {condition}
        </text>
        <text x="240" y="137" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="sans-serif">
          ¿verdadero?
        </text>

        <line x1="160" y1="125" x2="70" y2="125" stroke="#10b981" strokeWidth="2" markerEnd="url(#condArrowGreen)" />
        <text x="112" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          true
        </text>
        <rect x="10" y="145" width="120" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <foreignObject x="14" y="149" width="112" height="52">
          <div style={{ fontSize: 10, textAlign: "center", color: "#065f46", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {ifTrue}
          </div>
        </foreignObject>

        <line x1="320" y1="125" x2="410" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#condArrowRed)" />
        <text x="365" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444" fontFamily="sans-serif">
          false
        </text>
        <rect x="350" y="145" width="120" height="60" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <foreignObject x="354" y="149" width="112" height="52">
          <div style={{ fontSize: 10, textAlign: "center", color: "#991b1b", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {ifFalse}
          </div>
        </foreignObject>

        <defs>
          <marker id="condArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
          </marker>
          <marker id="condArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
          <marker id="condArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function LoopDiagram({
  condition = "i < 5",
  body = "console.log(i)",
}: {
  condition?: string;
  body?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 420 220" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
        <polygon points="210,10 280,55 210,100 140,55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="210" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e" fontFamily="monospace">
          {condition}
        </text>

        <line x1="210" y1="100" x2="210" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#loopArrowGreen)" />
        <text x="230" y="122" fontSize="10" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          true
        </text>
        <rect x="130" y="140" width="160" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <foreignObject x="134" y="144" width="152" height="42">
          <div style={{ fontSize: 10, textAlign: "center", color: "#065f46", fontFamily: "monospace", lineHeight: 1.3 }}>
            {body}
          </div>
        </foreignObject>

        <path d="M130,165 C40,165 40,55 140,55" fill="none" stroke="#0072ff" strokeWidth="2" markerEnd="url(#loopArrowBlue)" />

        <line x1="280" y1="55" x2="360" y2="55" stroke="#ef4444" strokeWidth="2" markerEnd="url(#loopArrowRed)" />
        <text x="320" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444" fontFamily="sans-serif">
          false
        </text>
        <text x="320" y="72" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="sans-serif">
          fin del bucle
        </text>

        <defs>
          <marker id="loopArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
          <marker id="loopArrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#0072ff" />
          </marker>
          <marker id="loopArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function FunctionDiagram({
  name = "sumar",
  params = ["a", "b"],
  returns = "a + b",
}: {
  name?: string;
  params?: string[];
  returns?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 180" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        {params.map((p, i) => (
          <g key={p}>
            <text x="20" y={50 + i * 26} fontSize="12" fill="#0072ff" fontFamily="monospace">
              {p}
            </text>
            <line x1="45" y1={46 + i * 26} x2="150" y2="70" stroke="#0072ff" strokeWidth="2" markerEnd="url(#fnArrowIn)" />
          </g>
        ))}
        <rect x="160" y="40" width="160" height="80" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="240" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" fontFamily="monospace">
          {`function ${name}()`}
        </text>
        <text x="240" y="95" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="sans-serif">
          recibe parámetros, devuelve un valor
        </text>

        <line x1="320" y1="80" x2="410" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#fnArrowOut)" />
        <text x="415" y="76" fontSize="11" fill="#10b981" fontFamily="sans-serif">
          return
        </text>
        <text x="415" y="92" fontSize="12" fontWeight="700" fill="#10b981" fontFamily="monospace">
          {returns}
        </text>

        <defs>
          <marker id="fnArrowIn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#0072ff" />
          </marker>
          <marker id="fnArrowOut" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function EscribiendoPromptsDiagram({
  idea = "Le dices a la IA lo que quieres",
  resultado = "La IA te entrega código + página funcionando",
}: {
  idea?: string;
  resultado?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 160" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="35" width="140" height="90" rx="12" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="85" y="72" textAnchor="middle" fontSize="24">💬</text>
        <foreignObject x="19" y="85" width="132" height="36">
          <div style={{ fontSize: 10, textAlign: "center", color: "#1e40af", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {idea}
          </div>
        </foreignObject>

        <line x1="155" y1="80" x2="185" y2="80" stroke="#7c3aed" strokeWidth="3" markerEnd="url(#promptArrow)" />

        <rect x="195" y="25" width="90" height="110" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="240" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9" fontFamily="sans-serif">
          OPENCODE
        </text>
        <text x="240" y="75" textAnchor="middle" fontSize="9" fill="#6d28d9" fontFamily="sans-serif">
          (agente de IA)
        </text>
        <text x="240" y="98" textAnchor="middle" fontSize="22">🤖</text>

        <line x1="285" y1="80" x2="322" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#promptArrowGreen)" />

        <rect x="330" y="35" width="135" height="90" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="397" y="70" textAnchor="middle" fontSize="22">🚀</text>
        <foreignObject x="334" y="85" width="127" height="36">
          <div style={{ fontSize: 10, textAlign: "center", color: "#065f46", fontFamily: "sans-serif", lineHeight: 1.3 }}>
            {resultado}
          </div>
        </foreignObject>

        <defs>
          <marker id="promptArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#7c3aed" />
          </marker>
          <marker id="promptArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function ComponenteDiagram({
  root = "App",
  children = ["Header", "Contenido", "Footer"],
}: {
  root?: string;
  children?: string[];
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 220" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        <rect x="165" y="10" width="150" height="48" rx="12" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="240" y="38" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0072ff" fontFamily="sans-serif">
          {`<${root}>`}
        </text>

        {children.map((child, i) => {
          const x = 20 + i * 155;
          return (
            <g key={child}>
              <line x1="240" y1="45" x2={x + 55} y2="95" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#compArrow)" />
              <rect x={x} y="100" width="110" height="52" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
              <text x={x + 55} y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9" fontFamily="monospace">
                {child}
              </text>
              <text x={x + 55} y="141" textAnchor="middle" fontSize="9" fill="#8b5cf6" fontFamily="sans-serif">
                (componente)
              </text>
            </g>
          );
        })}

        <defs>
          <marker id="compArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function StateFlowDiagram({
  label = "contador",
  escribe = "setContador",
  paraQueSirve = "Controla qué se dibuja en pantalla",
}: {
  label?: string;
  escribe?: string;
  paraQueSirve?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg viewBox="0 0 480 200" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="65" width="150" height="70" rx="12" fill="#eff6ff" stroke="#0072ff" strokeWidth="2" />
        <text x="90" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0072ff" fontFamily="monospace">
          {`const [${label}]`}
        </text>
        <text x="90" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0072ff" fontFamily="monospace">
          {`= useState(0)`}
        </text>
        <text x="90" y="132" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="sans-serif">
          el estado
        </text>

        <line x1="165" y1="100" x2="215" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#stateArrowYellow)" />
        <text x="190" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b" fontFamily="sans-serif">
          cambiar
        </text>

        <rect x="225" y="60" width="140" height="80" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="295" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e" fontFamily="monospace">
          {escribe}
        </text>
        <text x="295" y="114" textAnchor="middle" fontSize="11" fill="#92400e" fontFamily="sans-serif">
          (función que cambia)
        </text>

        <line x1="365" y1="100" x2="415" y2="100" stroke="#10b981" strokeWidth="3" markerEnd="url(#stateArrowGreen)" />
        <text x="390" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981" fontFamily="sans-serif">
          redibuja
        </text>

        <rect x="425" y="65" width="48" height="70" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="449" y="100" textAnchor="middle" fontSize="13">🖥️</text>

        <text x="240" y="185" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="sans-serif">
          {paraQueSirve}
        </text>

        <defs>
          <marker id="stateArrowYellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b" />
          </marker>
          <marker id="stateArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

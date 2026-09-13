import { ReactNode, useId } from "react";

/* -------------------------------------------------------------------------- */
/*  Utilidades compartidas                                                     */
/* -------------------------------------------------------------------------- */

const FONT_SANS =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const COLORS = {
  slate: "#94a3b8",
  blue: "#0072ff",
  green: "#10b981",
  red: "#ef4444",
  purple: "#7c3aed",
  amber: "#f59e0b",
} as const;

type ColorName = keyof typeof COLORS;

/**
 * Texto dentro de una caja de tamano fijo.
 *
 * Usa <foreignObject> en lugar de <text> porque <text> no hace salto de linea:
 * si la cadena es mas larga que la figura se desborda y se monta encima de las
 * flechas y las etiquetas de alrededor.
 */
function FitText({
  x,
  y,
  w,
  h,
  children,
  color = "#1f2937",
  size = 11,
  mono = false,
  bold = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children: ReactNode;
  color?: string;
  size?: number;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color,
          fontSize: `${size}px`,
          fontWeight: bold ? 700 : 400,
          fontFamily: mono ? FONT_MONO : FONT_SANS,
          lineHeight: 1.25,
          overflowWrap: "anywhere",
        }}
      >
        <span>{children}</span>
      </div>
    </foreignObject>
  );
}

/** Puntas de flecha con ids unicos por instancia (evita ids duplicados en la pagina). */
function Arrowheads({ uid }: { uid: string }) {
  return (
    <defs>
      {(Object.keys(COLORS) as ColorName[]).map((name) => (
        <marker
          key={name}
          id={`${uid}-${name}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={COLORS[name]} />
        </marker>
      ))}
    </defs>
  );
}

function Figure({
  viewBox,
  maxWidth,
  children,
}: {
  viewBox: string;
  maxWidth: number;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <svg
        viewBox={viewBox}
        width="100%"
        style={{ maxWidth, height: "auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Callout                                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Variables                                                                  */
/* -------------------------------------------------------------------------- */

export function VariableDiagram({
  name = "edad",
  value = "25",
  type = "number",
}: {
  name?: string;
  value?: string;
  type?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Figure viewBox="0 0 460 150" maxWidth={460}>
      <Arrowheads uid={uid} />
      <FitText x={10} y={4} w={440} h={26} size={12} mono color="#64748b">
        {`let ${name} = ${value};`}
      </FitText>

      <rect x="30" y="38" width="180" height="84" rx="12" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
      <FitText x={38} y={46} w={164} h={40} size={14} bold mono color={COLORS.blue}>
        {name}
      </FitText>
      <FitText x={38} y={86} w={164} h={30} size={10} color="#64748b">
        (la caja / variable)
      </FitText>

      <line
        x1="212"
        y1="80"
        x2="256"
        y2="80"
        stroke={COLORS.slate}
        strokeWidth="2"
        markerEnd={`url(#${uid}-slate)`}
      />

      <rect x="266" y="38" width="170" height="84" rx="10" fill="#ecfdf5" stroke={COLORS.green} strokeWidth="2" />
      <FitText x={272} y={44} w={158} h={48} size={14} bold mono color="#059669">
        {value}
      </FitText>
      <FitText x={272} y={92} w={158} h={24} size={10} color="#64748b">
        {type}
      </FitText>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Condicionales                                                              */
/* -------------------------------------------------------------------------- */

export function ConditionalDiagram({
  condition = "edad >= 18",
  ifTrue = "Es mayor de edad",
  ifFalse = "Es menor de edad",
}: {
  condition?: string;
  ifTrue?: string;
  ifFalse?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Figure viewBox="0 0 560 266" maxWidth={560}>
      <Arrowheads uid={uid} />

      <rect x="225" y="6" width="110" height="40" rx="10" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
      <FitText x={231} y={10} w={98} h={32} size={13} bold color={COLORS.blue}>
        Inicio
      </FitText>
      <line
        x1="280"
        y1="46"
        x2="280"
        y2="66"
        stroke={COLORS.slate}
        strokeWidth="2"
        markerEnd={`url(#${uid}-slate)`}
      />

      <polygon points="280,68 400,140 280,212 160,140" fill="#fef3c7" stroke={COLORS.amber} strokeWidth="2" />
      <FitText x={220} y={104} w={120} h={72} size={10.5} color="#92400e">
        <span>
          <span style={{ fontFamily: FONT_MONO, fontWeight: 700, display: "block" }}>{condition}</span>
          <span style={{ display: "block", fontSize: "9px", color: "#b45309", marginTop: 2 }}>
            ¿verdadero?
          </span>
        </span>
      </FitText>

      <path
        d="M160,140 H78 V172"
        fill="none"
        stroke={COLORS.green}
        strokeWidth="2"
        markerEnd={`url(#${uid}-green)`}
      />
      <FitText x={78} y={112} w={80} h={22} size={11} bold color={COLORS.green}>
        true
      </FitText>
      <rect x="14" y="176" width="128" height="74" rx="10" fill="#ecfdf5" stroke={COLORS.green} strokeWidth="2" />
      <FitText x={20} y={182} w={116} h={62} size={10.5} color="#065f46">
        {ifTrue}
      </FitText>

      <path
        d="M400,140 H482 V172"
        fill="none"
        stroke={COLORS.red}
        strokeWidth="2"
        markerEnd={`url(#${uid}-red)`}
      />
      <FitText x={402} y={112} w={80} h={22} size={11} bold color={COLORS.red}>
        false
      </FitText>
      <rect x="418" y="176" width="128" height="74" rx="10" fill="#fef2f2" stroke={COLORS.red} strokeWidth="2" />
      <FitText x={424} y={182} w={116} h={62} size={10.5} color="#991b1b">
        {ifFalse}
      </FitText>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bucles                                                                     */
/* -------------------------------------------------------------------------- */

export function LoopDiagram({
  condition = "i < 5",
  body = "console.log(i)",
}: {
  condition?: string;
  body?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Figure viewBox="0 0 480 236" maxWidth={460}>
      <Arrowheads uid={uid} />

      <polygon points="215,10 320,62 215,114 110,62" fill="#fef3c7" stroke={COLORS.amber} strokeWidth="2" />
      <FitText x={163} y={36} w={104} h={52} size={10.5} bold mono color="#92400e">
        {condition}
      </FitText>

      <line
        x1="215"
        y1="114"
        x2="215"
        y2="150"
        stroke={COLORS.green}
        strokeWidth="2"
        markerEnd={`url(#${uid}-green)`}
      />
      <FitText x={224} y={120} w={56} h={20} size={10} bold color={COLORS.green}>
        true
      </FitText>

      <rect x="120" y="154" width="190" height="58" rx="10" fill="#ecfdf5" stroke={COLORS.green} strokeWidth="2" />
      <FitText x={126} y={158} w={178} h={50} size={10.5} mono color="#065f46">
        {body}
      </FitText>

      <path
        d="M120,183 C50,183 44,62 108,62"
        fill="none"
        stroke={COLORS.blue}
        strokeWidth="2"
        markerEnd={`url(#${uid}-blue)`}
      />
      <FitText x={52} y={112} w={52} h={20} size={9} bold color={COLORS.blue}>
        repite
      </FitText>

      <line
        x1="320"
        y1="62"
        x2="392"
        y2="62"
        stroke={COLORS.red}
        strokeWidth="2"
        markerEnd={`url(#${uid}-red)`}
      />
      <FitText x={326} y={36} w={66} h={20} size={10} bold color={COLORS.red}>
        false
      </FitText>
      <FitText x={326} y={70} w={140} h={20} size={9.5} color="#64748b">
        fin del bucle
      </FitText>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Funciones                                                                  */
/* -------------------------------------------------------------------------- */

export function FunctionDiagram({
  name = "sumar",
  params = ["a", "b"],
  returns = "a + b",
}: {
  name?: string;
  params?: string[];
  returns?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const top = 24;
  const gap = 46;
  const blockH = Math.max(params.length, 1) * gap;
  const cy = Math.round(top + blockH / 2);
  const vbH = Math.max(150, top + blockH + 16);

  return (
    <Figure viewBox={`0 0 560 ${vbH}`} maxWidth={560}>
      <Arrowheads uid={uid} />

      {params.map((p, i) => {
        const boxY = top + i * gap + 5;
        return (
          <g key={`${p}-${i}`}>
            <rect x="10" y={boxY} width="96" height="36" rx="8" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
            <FitText x={14} y={boxY + 3} w={88} h={30} size={11} bold mono color={COLORS.blue}>
              {p}
            </FitText>
            <line
              x1="108"
              y1={boxY + 18}
              x2="178"
              y2={cy}
              stroke={COLORS.blue}
              strokeWidth="2"
              markerEnd={`url(#${uid}-blue)`}
            />
          </g>
        );
      })}

      <rect
        x="186"
        y={cy - 43}
        width="190"
        height="86"
        rx="12"
        fill="#f5f3ff"
        stroke={COLORS.purple}
        strokeWidth="2"
      />
      <FitText x={192} y={cy - 35} w={178} h={36} size={13.5} bold mono color={COLORS.purple}>
        {`function ${name}()`}
      </FitText>
      <FitText x={192} y={cy + 1} w={178} h={34} size={9.5} color="#64748b">
        recibe parámetros, devuelve un valor
      </FitText>

      <line
        x1="378"
        y1={cy}
        x2="430"
        y2={cy}
        stroke={COLORS.green}
        strokeWidth="2"
        markerEnd={`url(#${uid}-green)`}
      />

      <rect
        x="438"
        y={cy - 31}
        width="112"
        height="62"
        rx="10"
        fill="#ecfdf5"
        stroke={COLORS.green}
        strokeWidth="2"
      />
      <FitText x={442} y={cy - 27} w={104} h={22} size={10} color="#059669">
        return
      </FitText>
      <FitText x={442} y={cy - 5} w={104} h={32} size={12} bold mono color="#059669">
        {returns}
      </FitText>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Prompts / agente de IA                                                     */
/* -------------------------------------------------------------------------- */

export function EscribiendoPromptsDiagram({
  idea = "Le dices a la IA lo que quieres",
  resultado = "La IA te entrega código + página funcionando",
}: {
  idea?: string;
  resultado?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Figure viewBox="0 0 480 156" maxWidth={480}>
      <Arrowheads uid={uid} />

      <rect x="10" y="30" width="142" height="110" rx="12" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
      <text x="81" y="70" textAnchor="middle" fontSize="24">
        💬
      </text>
      <FitText x={14} y={78} w={134} h={58} size={10} color="#1e40af">
        {idea}
      </FitText>

      <line
        x1="154"
        y1="85"
        x2="182"
        y2="85"
        stroke={COLORS.purple}
        strokeWidth="3"
        markerEnd={`url(#${uid}-purple)`}
      />

      <rect x="190" y="24" width="96" height="122" rx="12" fill="#f5f3ff" stroke={COLORS.purple} strokeWidth="2" />
      <FitText x={194} y={34} w={88} h={22} size={10.5} bold color="#6d28d9">
        OPENCODE
      </FitText>
      <FitText x={194} y={56} w={88} h={18} size={9} color="#6d28d9">
        (agente de IA)
      </FitText>
      <text x="238" y="112" textAnchor="middle" fontSize="24">
        🤖
      </text>

      <line
        x1="288"
        y1="85"
        x2="320"
        y2="85"
        stroke={COLORS.green}
        strokeWidth="3"
        markerEnd={`url(#${uid}-green)`}
      />

      <rect x="328" y="30" width="142" height="110" rx="12" fill="#ecfdf5" stroke={COLORS.green} strokeWidth="2" />
      <text x="399" y="70" textAnchor="middle" fontSize="24">
        🚀
      </text>
      <FitText x={332} y={78} w={134} h={58} size={10} color="#065f46">
        {resultado}
      </FitText>
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Componentes de React                                                       */
/* -------------------------------------------------------------------------- */

export function ComponenteDiagram({
  root = "App",
  children = ["Header", "Contenido", "Footer"],
}: {
  root?: string;
  children?: string[];
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cardW = 128;
  const gap = 16;
  const n = Math.max(children.length, 1);
  const rowW = n * cardW + (n - 1) * gap;
  const vbW = Math.max(480, rowW + 40);
  const startX = (vbW - rowW) / 2;
  const cx = vbW / 2;

  return (
    <Figure viewBox={`0 0 ${vbW} 180`} maxWidth={Math.min(vbW, 640)}>
      <Arrowheads uid={uid} />

      <rect x={cx - 80} y="8" width="160" height="48" rx="12" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
      <FitText x={cx - 74} y={14} w={148} h={36} size={13.5} bold mono color={COLORS.blue}>
        {`<${root}>`}
      </FitText>

      {children.map((child, i) => {
        const x = startX + i * (cardW + gap);
        return (
          <g key={`${child}-${i}`}>
            <line
              x1={cx}
              y1="58"
              x2={x + cardW / 2}
              y2="100"
              stroke={COLORS.slate}
              strokeWidth="2"
              markerEnd={`url(#${uid}-slate)`}
            />
            <rect
              x={x}
              y="104"
              width={cardW}
              height="60"
              rx="10"
              fill="#f5f3ff"
              stroke={COLORS.purple}
              strokeWidth="2"
            />
            <FitText x={x + 6} y={110} w={cardW - 12} h={30} size={11} bold mono color="#6d28d9">
              {child}
            </FitText>
            <FitText x={x + 6} y={140} w={cardW - 12} h={20} size={9} color="#8b5cf6">
              (componente)
            </FitText>
          </g>
        );
      })}
    </Figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Estado en React                                                            */
/* -------------------------------------------------------------------------- */

export function StateFlowDiagram({
  label = "contador",
  escribe = "setContador",
  paraQueSirve = "Controla qué se dibuja en pantalla",
}: {
  label?: string;
  escribe?: string;
  paraQueSirve?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <Figure viewBox="0 0 520 200" maxWidth={520}>
      <Arrowheads uid={uid} />

      <rect x="10" y="54" width="164" height="86" rx="12" fill="#eff6ff" stroke={COLORS.blue} strokeWidth="2" />
      <FitText x={16} y={62} w={152} h={46} size={12} bold mono color={COLORS.blue}>
        {`const [${label}] = useState(0)`}
      </FitText>
      <FitText x={16} y={110} w={152} h={22} size={10} color="#64748b">
        el estado
      </FitText>

      <line
        x1="176"
        y1="97"
        x2="220"
        y2="97"
        stroke={COLORS.amber}
        strokeWidth="3"
        markerEnd={`url(#${uid}-amber)`}
      />
      <FitText x={176} y={72} w={48} h={20} size={9.5} bold color="#d97706">
        cambiar
      </FitText>

      <rect x="230" y="54" width="150" height="86" rx="12" fill="#fef3c7" stroke={COLORS.amber} strokeWidth="2" />
      <FitText x={236} y={62} w={138} h={40} size={12.5} bold mono color="#92400e">
        {escribe}
      </FitText>
      <FitText x={236} y={104} w={138} h={30} size={9.5} color="#92400e">
        (función que cambia)
      </FitText>

      <line
        x1="382"
        y1="97"
        x2="424"
        y2="97"
        stroke={COLORS.green}
        strokeWidth="3"
        markerEnd={`url(#${uid}-green)`}
      />
      <FitText x={380} y={72} w={48} h={20} size={9.5} bold color={COLORS.green}>
        redibuja
      </FitText>

      <rect x="432" y="62" width="76" height="70" rx="12" fill="#ecfdf5" stroke={COLORS.green} strokeWidth="2" />
      <text x="470" y="106" textAnchor="middle" fontSize="26">
        🖥️
      </text>

      <FitText x={60} y={152} w={400} h={36} size={11} color="#64748b">
        {paraQueSirve}
      </FitText>
    </Figure>
  );
}

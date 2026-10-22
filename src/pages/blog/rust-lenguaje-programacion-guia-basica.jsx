import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SLUG = "rust-lenguaje-programacion-guia-basica";
const TITLE = "Rust: qué es, por qué se usa ahora y cómo se escribe (guía básica con código)";
const SUBTITLE =
  "Qué es Rust, por qué se usa ahora y cómo se escribe: sintaxis, arrays, Vec, iteradores y ownership explicados desde cero, con código real que compila.";
const DATE = "21 de octubre de 2026";
const READ_TIME = "7 min de lectura";
const slide = (n) => `/images/rust-guia-basica-slide-${String(n).padStart(2, "0")}.webp`;

const reasons = [
  {
    num: "01",
    title: "La velocidad se nota",
    color: "var(--brand)",
    body: "Herramientas que usas a diario ya corren sobre Rust: SWC, Biome, Ruff y uv. Reescribir lo lento en un lenguaje nativo cambia la experiencia del día a día.",
  },
  {
    num: "02",
    title: "La memoria es el riesgo",
    color: "var(--violet)",
    body: "Chromium y Microsoft han reportado que cerca del 70% de sus vulnerabilidades graves son problemas de memoria, justo lo que Rust ataca desde el compilador.",
  },
  {
    num: "03",
    title: "Ya es oficial",
    color: "#0ea5e9",
    body: "En el kernel de Linux terminó el experimento: Rust se quedó como lenguaje del kernel, no como prueba.",
  },
];

const compare = [
  { k: "Qué genera", a: "Bytecode", b: "Código máquina nativo" },
  { k: "Cuándo se traduce", a: "Mientras corre", b: "Antes de correr" },
  { k: "Máquina virtual o intérprete", a: "Sí", b: "No" },
  { k: "Garbage collector", a: "Sí", b: "No" },
];

const advantages = [
  { num: "01", title: "Rendimiento", color: "var(--brand)", body: "Código nativo, sin máquina virtual ni garbage collector." },
  { num: "02", title: "Memoria segura", color: "var(--violet)", body: "Sin null ni use-after-free en código safe." },
  { num: "03", title: "Concurrencia", color: "#0ea5e9", body: "Los data races no compilan." },
  { num: "04", title: "El precio", color: "#f97316", body: "La curva de aprendizaje: al inicio vas a pelear con el compilador." },
];

const faqs = [
  {
    q: "¿Rust es más rápido que C?",
    a: "Rinde en el mismo orden que C y C++, porque compila a código máquina nativo con LLVM. La gran diferencia no está en la velocidad bruta sino en la seguridad: Rust te evita en tiempo de compilación errores de memoria que en C solo descubres corriendo el programa.",
  },
  {
    q: "¿Rust tiene garbage collector?",
    a: "No. La memoria se libera sola gracias al sistema de ownership: cada valor tiene un dueño y se libera cuando ese dueño sale de alcance. No hay pausas de recolección ni una máquina virtual por debajo.",
  },
  {
    q: "¿Rust usa bytecode como Java?",
    a: "No. Java, C# y Python pasan por bytecode y una máquina virtual o intérprete. Rust compila directo a código máquina nativo. Lo más parecido a un bytecode es WebAssembly, el formato binario al que Rust puede compilar para correr en el navegador.",
  },
  {
    q: "¿Cuál es la diferencia entre un array y un Vec?",
    a: "Un array tiene tamaño fijo, que es parte de su tipo ([i32; 3]), y vive en el stack. Un Vec puede crecer y achicarse y guarda sus datos en el heap. En la práctica usarás Vec casi siempre.",
  },
  {
    q: "¿Vale la pena aprender Rust si hago desarrollo web?",
    a: "Si trabajas con JavaScript, TypeScript o Python, probablemente ya usas Rust sin saberlo a través de herramientas como SWC, Biome, Ruff o uv. Aprenderlo te sirve para escribir partes críticas en WebAssembly o módulos nativos, y para entender mejor cómo funciona la memoria.",
  },
];

const sources = [
  { label: "Chromium: memory safety", href: "https://chromium.org/Home/chromium-security/memory-safety" },
  { label: "Microsoft MSRC: why Rust for safe systems programming", href: "https://www.microsoft.com/msrc/blog/2019/07/why-rust-for-safe-systems-programming" },
  { label: "Phoronix: Rust se queda en el kernel de Linux", href: "https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel" },
  { label: "Astral: Ruff y uv", href: "https://astral.sh/about" },
];

const code = {
  syntax: `let precio = 100;     // inmutable
let mut stock = 5;    // mut: cambia
stock += 1;

fn sumar(a: i32, b: i32) -> i32 {
    a + b             // sin ; = return
}`,
  arrays: `let a = [1, 2, 3];          // array: fijo

let mut v = vec![1, 2, 3];  // Vec: crece
v.push(4);`,
  iter: `let nums = vec![1, 2, 3, 4, 5, 6];

for n in &nums {
    println!("{n}");
}

let dobles: Vec<i32> = nums
    .iter()
    .map(|n| n * 2)
    .collect();  // [2, 4, 6, 8, 10, 12]

let pares: Vec<i32> = nums
    .iter()
    .copied()
    .filter(|n| n % 2 == 0)
    .collect();  // [2, 4, 6]

let total: i32 = nums.iter().sum(); // 21`,
  own: `let a = String::from("hola");
let b = a;           // a se mueve a b
println!("{a}");     // ERROR al compilar`,
  ownFix: `// 1. Clonar: haces una copia
let b = a.clone();

// 2. Prestar: pasas una referencia con &
fn largo(s: &String) -> usize {
    s.len()
}
let n = largo(&a);`,
  start: `cargo new hola
cd hola && cargo run
# Hello, world!`,
};

function CodeBlock({ code, label, tone }) {
  const color = tone === "bad" ? "#ef4444" : tone === "good" ? "#10b981" : "#93c5fd";
  return (
    <div style={{ marginTop: "14px" }}>
      {label && (
        <span
          style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color,
            marginBottom: "6px",
          }}
        >
          {label}
        </span>
      )}
      <pre
        style={{
          background: "#0f172a",
          borderRadius: "12px",
          padding: "16px 20px",
          margin: 0,
          fontSize: "0.84rem",
          color: "#e2e8f0",
          overflowX: "auto",
          lineHeight: 1.7,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SlideImage({ n, alt }) {
  return (
    <Image
      src={slide(n)}
      alt={alt}
      width={1080}
      height={1350}
      sizes="(max-width: 700px) 90vw, 360px"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
      }}
    />
  );
}

function Block({ kicker, title, color = "var(--brand)", slideN, alt, flip, bg, children }) {
  return (
    <div style={{ background: bg || "var(--surface)", padding: "72px 24px" }}>
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div style={{ order: flip ? 2 : 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </span>
          <h2
            style={{
              fontSize: "1.7rem",
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.25,
              margin: "8px 0 18px",
            }}
          >
            {title}
          </h2>
          <div style={{ color: "var(--text-soft)", lineHeight: 1.75, fontSize: "1rem" }}>{children}</div>
        </div>
        <div style={{ order: flip ? 1 : 2, maxWidth: "360px", width: "100%", justifySelf: "center" }}>
          <SlideImage n={slideN} alt={alt} />
        </div>
      </div>
    </div>
  );
}

const inlineCode = {
  background: "rgba(0,114,255,0.12)",
  color: "var(--brand)",
  padding: "2px 7px",
  borderRadius: "6px",
  fontSize: "0.9em",
};

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "1rem", lineHeight: 1.5 }}>{faq.q}</span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open ? "linear-gradient(135deg, #0072ff, #7c3aed)" : "var(--surface-3)",
            color: open ? "#fff" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p style={{ color: "var(--text-soft)", lineHeight: 1.75, paddingBottom: "20px", margin: 0, fontSize: "0.97rem" }}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default function RustGuiaBasica() {
  return (
    <Layout>
      <Head>
        <title>{TITLE} | Juan Camilo Salazar</title>
        <meta name="description" content={SUBTITLE} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={SUBTITLE} />
        <meta property="og:image" content={`/images/${SLUG}.webp`} />
        <meta property="article:published_time" content="2026-10-21" />
        <meta
          name="keywords"
          content="Rust, lenguaje Rust, aprender Rust, ownership Rust, Vec Rust, iteradores Rust, Rust vs C, Rust WebAssembly, programación de sistemas, Cargo Rust"
        />
      </Head>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "420px" }}>
        <Image
          src={`/images/${SLUG}.webp`}
          alt="Logo de Rust sobre fondo tecnológico azul con código"
          width={1280}
          height={500}
          priority
          style={{ width: "100%", height: "420px", objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,26,0.45) 0%, rgba(10,10,26,0.9) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", zIndex: 1 }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
              {["Rust", "Programación de sistemas", "Rendimiento"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,114,255,0.25)",
                    border: "1px solid rgba(0,114,255,0.5)",
                    color: "#93c5fd",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              {TITLE}
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "700px" }}>
              {SUBTITLE}
            </p>
            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0072ff, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  JC
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>Juan Camilo Salazar</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: "0.78rem" }}>{DATE}</div>
                </div>
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>·</span>
              <span style={{ color: "var(--text-subtle)", fontSize: "0.85rem" }}>⏱ {READ_TIME}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BANNER RESUMEN ── */}
      <div style={{ background: "linear-gradient(135deg, #0d1b4b, #1a1a2e)", padding: "40px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--text-subtle)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "700px", margin: "0 auto" }}>
            Rust se está metiendo donde antes mandaban C y C++: navegadores, sistemas operativos y las herramientas que
            usas todos los días para programar. Esta guía sale de un carrusel de Instagram, con cada slide explicado y
            con código que compilé de verdad.
          </p>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { num: "10", label: "Slides del carrusel" },
              { num: "4", label: "Ventajas clave" },
              { num: "7", label: "Min de lectura" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--brand)" }}>{s.num}</div>
                <div style={{ color: "var(--text-subtle)", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUÉ ES ── */}
      <Block
        kicker="Fundamentos"
        title="Qué es Rust (y qué significa “lenguaje de sistemas”)"
        slideN={2}
        alt="Slide: qué es Rust, compilado, sin garbage collector y tipado estático"
      >
        <p style={{ marginBottom: "14px" }}>
          Nació como un proyecto dentro de Mozilla y llegó a su versión 1.0 en 2015. “Nivel sistema” quiere decir que
          escribes software que habla casi directo con el hardware y la memoria: sistemas operativos, navegadores,
          motores gráficos, bases de datos.
        </p>
        <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong style={{ color: "var(--ink)" }}>Compilado:</strong> se convierte en código máquina nativo.</li>
          <li><strong style={{ color: "var(--ink)" }}>Sin garbage collector:</strong> la memoria se libera sola, sin pausas.</li>
          <li><strong style={{ color: "var(--ink)" }}>Tipado estático:</strong> muchos errores salen al compilar, no en producción.</li>
        </ul>
      </Block>

      {/* ── POR QUÉ AHORA ── */}
      <div style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--violet)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Contexto
              </span>
              <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, margin: "8px 0 24px" }}>
                Por qué se usa ahora
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {reasons.map((r) => (
                  <div
                    key={r.num}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "20px 22px",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: r.color }} />
                    <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "6px" }}>
                      <span style={{ color: r.color, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.08em" }}>{r.num}</span>
                      <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>{r.title}</h3>
                    </div>
                    <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7, fontSize: "0.95rem" }}>{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: "360px", width: "100%", justifySelf: "center" }}>
              <SlideImage n={3} alt="Slide: por qué se usa Rust ahora" />
            </div>
          </div>
        </div>
      </div>

      {/* ── BYTECODE ── */}
      <Block
        kicker="Rendimiento"
        title="Rust no usa bytecode: compila a código máquina"
        color="#0ea5e9"
        slideN={4}
        alt="Slide: Rust sin bytecode ni máquina virtual, comparado con Java, C# y Python"
        flip
      >
        <p style={{ marginBottom: "14px" }}>
          Es un malentendido común. Java, C# y Python pasan por bytecode y por una máquina virtual o un intérprete que lo
          traduce mientras el programa corre. Rust no: el compilador, que usa LLVM por debajo, entrega código máquina
          nativo antes de ejecutar nada.
        </p>
        <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid var(--border)", marginBottom: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}> </th>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Java · C# · Python</th>
                <th style={{ padding: "12px 14px", textAlign: "left", color: "#93c5fd", fontWeight: 700 }}>Rust</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row, i) => (
                <tr key={row.k} style={{ background: i % 2 ? "var(--surface-2)" : "var(--surface)" }}>
                  <td style={{ padding: "12px 14px", color: "var(--ink)", fontWeight: 600 }}>{row.k}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text-soft)" }}>{row.a}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "3px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.b}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ margin: 0 }}>
          Menos capas entre tu código y el CPU significa más rendimiento y menos memoria. Para la web, Rust compila a{" "}
          <strong style={{ color: "var(--ink)" }}>WebAssembly</strong>: un formato binario compacto que el navegador
          ejecuta a velocidad casi nativa.
        </p>
      </Block>

      {/* ── SINTAXIS ── */}
      <Block
        kicker="Sintaxis 01 / 03"
        title="Sintaxis básica: variables y funciones"
        bg="var(--surface-2)"
        slideN={5}
        alt="Slide: sintaxis básica de Rust con let, mut y funciones"
      >
        <p style={{ marginBottom: 0 }}>
          Las variables son inmutables por defecto. Si quieres cambiarlas, las declaras con <code style={inlineCode}>mut</code>.
        </p>
        <CodeBlock code={code.syntax} label="main.rs" />
        <p style={{ marginTop: "14px", marginBottom: 0 }}>
          El tipo va después del nombre (<code style={inlineCode}>a: i32</code>) y el tipo de retorno se declara con{" "}
          <code style={inlineCode}>-&gt;</code>. La última expresión de una función, sin punto y coma, es lo que devuelve.
        </p>
      </Block>

      {/* ── ARRAYS ── */}
      <Block
        kicker="Sintaxis 02 / 03"
        title="Arrays y Vec"
        color="var(--violet)"
        slideN={6}
        alt="Slide: arrays y Vec en Rust"
        flip
      >
        <p style={{ marginBottom: 0 }}>Un array es una lista de valores del mismo tipo. Rust te da dos versiones:</p>
        <CodeBlock code={code.arrays} label="main.rs" />
        <ul style={{ paddingLeft: "20px", margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>
            <strong style={{ color: "var(--ink)" }}>Array</strong> (<code style={inlineCode}>[i32; 3]</code>): tamaño fijo, vive en el stack.
          </li>
          <li>
            <strong style={{ color: "var(--ink)" }}>Vec</strong> (<code style={inlineCode}>Vec&lt;i32&gt;</code>): crece y se achica, vive en el heap. Casi siempre usarás este.
          </li>
        </ul>
      </Block>

      {/* ── ITERADORES ── */}
      <Block
        kicker="Sintaxis 03 / 03"
        title="Recorrer y transformar con iteradores"
        bg="var(--surface-2)"
        color="#0ea5e9"
        slideN={7}
        alt="Slide: iteradores en Rust con map, filter y sum"
      >
        <p style={{ marginBottom: 0 }}>
          Para recorrer un <code style={inlineCode}>Vec</code> usas <code style={inlineCode}>for</code>. Para transformarlo, los iteradores.
        </p>
        <CodeBlock code={code.iter} label="main.rs" />
        <p style={{ marginTop: "14px", marginBottom: 0 }}>
          <code style={inlineCode}>.map()</code> transforma, <code style={inlineCode}>.filter()</code> filtra y{" "}
          <code style={inlineCode}>.sum()</code> suma. Los iteradores son perezosos: no hacen nada hasta que llamas a{" "}
          <code style={inlineCode}>.collect()</code> o a <code style={inlineCode}>.sum()</code>, y se compilan a un loop optimizado.
        </p>
      </Block>

      {/* ── OWNERSHIP ── */}
      <Block
        kicker="Ownership"
        title="La regla que lo cambia todo: un dueño por valor"
        color="#f97316"
        slideN={8}
        alt="Slide: ownership en Rust, un dueño por valor"
        flip
      >
        <p style={{ marginBottom: 0 }}>Cada valor en Rust tiene un solo dueño. Si lo mueves, el anterior ya no puede usarlo.</p>
        <CodeBlock code={code.own} label="✗ Mal" tone="bad" />
        <p style={{ margin: "14px 0 0" }}>
          El compilador responde con <code style={inlineCode}>error[E0382]: borrow of moved value: a</code>. Así Rust libera
          la memoria sin garbage collector y atrapa el error al compilar, no en producción. Tienes dos formas de arreglarlo:
        </p>
        <CodeBlock code={code.ownFix} label="✓ Bien" tone="good" />
      </Block>

      {/* ── VENTAJAS ── */}
      <div style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--brand)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Resumen
              </span>
              <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, margin: "8px 0 24px" }}>
                Ventajas… y el precio
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                {advantages.map((a) => (
                  <div
                    key={a.num}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderTop: `4px solid ${a.color}`,
                      borderRadius: "14px",
                      padding: "18px 20px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ color: a.color, fontWeight: 800, fontSize: "1.4rem" }}>{a.num}</div>
                    <h3 style={{ margin: "4px 0 6px", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>{a.title}</h3>
                    <p style={{ margin: 0, color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6 }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: "360px", width: "100%", justifySelf: "center" }}>
              <SlideImage n={9} alt="Slide: ventajas de Rust y el precio de aprenderlo" />
            </div>
          </div>
        </div>
      </div>

      {/* ── EMPEZAR ── */}
      <Block
        kicker="Empieza hoy"
        title="¿Lo pruebas? Tu primer proyecto en dos comandos"
        slideN={10}
        alt="Slide de cierre: lo pruebas, cargo new hola"
        flip
      >
        <p style={{ marginBottom: 0 }}>
          Instala Rust con <code style={inlineCode}>rustup</code> desde rust-lang.org y crea tu primer proyecto con Cargo, su gestor de paquetes y compilador.
        </p>
        <CodeBlock code={code.start} label="terminal" />
        <p style={{ margin: "14px 0 0" }}>
          Guarda este artículo para cuando abras tu primer proyecto. Si quieres la parte 2 sobre{" "}
          <strong style={{ color: "var(--ink)" }}>borrowing y lifetimes</strong>, escríbeme por Instagram (@salazarcode14).
        </p>
      </Block>

      {/* ── FAQ ── */}
      <div style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--ink)", textAlign: "center", marginBottom: "40px" }}>
            Preguntas Frecuentes
          </h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>

      {/* ── FUENTES ── */}
      <div style={{ background: "var(--surface)", padding: "48px 24px 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "14px" }}>Fuentes</h2>
          <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontSize: "0.92rem" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "var(--surface)", padding: "56px 24px 72px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0d1b4b)",
              borderRadius: "24px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>⚡</div>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              ¿Quieres la parte 2 de Rust?
            </h2>
            <p style={{ color: "var(--text-subtle)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px" }}>
              Si te quedaste con ganas de entender <strong style={{ color: "#93c5fd" }}>borrowing y lifetimes</strong>,
              cuéntamelo y lo armo con el mismo formato. Más contenido de desarrollo en Instagram:{" "}
              <strong style={{ color: "#93c5fd" }}>@salazarcode14</strong>.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/blog"
                style={{
                  background: "linear-gradient(135deg, #0072ff, #0d47a1)",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Ver más artículos →
              </a>
              <a
                href="/"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

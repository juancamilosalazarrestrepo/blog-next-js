import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RustGuideArticle, { C, B } from "@/components/RustGuideArticle";

const SLUG = "rust-lenguaje-programacion-guia-basica";

const content = {
  lang: "es",
  slug: SLUG,
  slidePrefix: "rust-guia-basica-slide",
  ogFile: `${SLUG}-og`,
  alternatePaths: {
    es: `/blog/${SLUG}`,
    en: "/blog/rust-programming-language-beginners-guide",
  },
  title: "Rust: qué es, por qué se usa ahora y cómo se escribe (guía básica con código)",
  seoTitle: "Rust: qué es, para qué sirve y cómo se escribe (guía básica)",
  shortTitle: "Rust: guía básica con código",
  subtitle:
    "Qué es Rust, por qué se usa ahora y cómo se escribe: sintaxis, arrays, Vec, iteradores y ownership explicados desde cero, con código real que compila.",
  isoDate: "2026-10-21",
  dateLabel: "21 de octubre de 2026",
  readTime: "7 min de lectura",
  section: "Programación",
  tags: ["Rust", "Programación de sistemas", "Rendimiento"],
  keywords: [
    "Rust",
    "lenguaje Rust",
    "aprender Rust",
    "ownership Rust",
    "Vec Rust",
    "iteradores Rust",
    "Rust vs C",
    "Rust WebAssembly",
    "programación de sistemas",
    "Cargo Rust",
  ],
  heroAlt: "Logo de Rust sobre fondo tecnológico azul con código",
  ogAlt: "Rust: guía básica con código. Sintaxis, arrays y ownership",
  intro:
    "Rust es un lenguaje de programación de sistemas: compila a código máquina nativo, no usa garbage collector ni máquina virtual y atrapa los errores de memoria al compilar. Rinde como C y C++, pero con más seguridad. Por eso hoy corre en navegadores, el kernel de Linux y herramientas como Ruff y uv.",
  toc: [
    ["que-es", "Qué es Rust"],
    ["por-que-ahora", "Por qué se usa ahora"],
    ["bytecode", "Sin bytecode: código máquina"],
    ["sintaxis", "Sintaxis: variables y funciones"],
    ["arrays", "Arrays y Vec"],
    ["iteradores", "Iteradores"],
    ["ownership", "Ownership"],
    ["ventajas", "Ventajas y el precio"],
    ["empezar", "Cómo empezar"],
    ["faq", "Preguntas frecuentes"],
  ],
  ui: {
    home: "Inicio",
    quickAnswer: "Respuesta rápida",
    toc: "En este artículo",
    bad: "✗ Mal",
    good: "✓ Bien",
    faq: "Preguntas Frecuentes",
    related: "Sigue leyendo",
    sources: "Fuentes",
  },
  reasons: [
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
  ],
  compare: [
    { k: "Qué genera", a: "Bytecode", b: "Código máquina nativo" },
    { k: "Cuándo se traduce", a: "Mientras corre", b: "Antes de correr" },
    { k: "Máquina virtual o intérprete", a: "Sí", b: "No" },
    { k: "Garbage collector", a: "Sí", b: "No" },
  ],
  advantages: [
    { num: "01", title: "Rendimiento", color: "var(--brand)", body: "Código nativo, sin máquina virtual ni garbage collector." },
    { num: "02", title: "Memoria segura", color: "var(--violet)", body: "Sin null ni use-after-free en código safe." },
    { num: "03", title: "Concurrencia", color: "#0ea5e9", body: "Los data races no compilan." },
    { num: "04", title: "El precio", color: "#f97316", body: "La curva de aprendizaje: al inicio vas a pelear con el compilador." },
  ],
  s: {
    what: {
      kicker: "Fundamentos",
      title: "Qué es Rust (y qué significa “lenguaje de sistemas”)",
      alt: "Slide: qué es Rust, compilado, sin garbage collector y tipado estático",
      body: (
        <>
          <p style={{ marginBottom: "14px" }}>
            Nació como un proyecto dentro de Mozilla y llegó a su versión 1.0 en 2015. “Nivel sistema” quiere decir que
            escribes software que habla casi directo con el hardware y la memoria: sistemas operativos, navegadores,
            motores gráficos, bases de datos.
          </p>
          <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            <li><B>Compilado:</B> se convierte en código máquina nativo.</li>
            <li><B>Sin garbage collector:</B> la memoria se libera sola, sin pausas.</li>
            <li><B>Tipado estático:</B> muchos errores salen al compilar, no en producción.</li>
          </ul>
        </>
      ),
    },
    why: {
      kicker: "Contexto",
      title: "Por qué se usa ahora",
      alt: "Slide: por qué se usa Rust ahora",
    },
    bytecode: {
      kicker: "Rendimiento",
      title: "Rust no usa bytecode: compila a código máquina",
      alt: "Slide: Rust sin bytecode ni máquina virtual, comparado con Java, C# y Python",
      caption: "Comparación entre Java, C# y Python frente a Rust",
      intro:
        "Es un malentendido común. Java, C# y Python pasan por bytecode y por una máquina virtual o un intérprete que lo traduce mientras el programa corre. Rust no: el compilador, que usa LLVM por debajo, entrega código máquina nativo antes de ejecutar nada.",
      outro: (
        <>
          Menos capas entre tu código y el CPU significa más rendimiento y menos memoria. Para la web, Rust compila a{" "}
          <B>WebAssembly</B>: un formato binario compacto que el navegador ejecuta a velocidad casi nativa.
        </>
      ),
    },
    syntax: {
      kicker: "Sintaxis 01 / 03",
      title: "Sintaxis básica: variables y funciones",
      alt: "Slide: sintaxis básica de Rust con let, mut y funciones",
      intro: (
        <>
          Las variables son inmutables por defecto. Si quieres cambiarlas, las declaras con <C>mut</C>.
        </>
      ),
      outro: (
        <>
          El tipo va después del nombre (<C>a: i32</C>) y el tipo de retorno se declara con <C>-&gt;</C>. La última
          expresión de una función, sin punto y coma, es lo que devuelve.
        </>
      ),
    },
    arrays: {
      kicker: "Sintaxis 02 / 03",
      title: "Arrays y Vec",
      alt: "Slide: arrays y Vec en Rust",
      intro: "Un array es una lista de valores del mismo tipo. Rust te da dos versiones:",
      items: [
        <><B>Array</B> (<C>[i32; 3]</C>): tamaño fijo, vive en el stack.</>,
        <><B>Vec</B> (<C>Vec&lt;i32&gt;</C>): crece y se achica, vive en el heap. Casi siempre usarás este.</>,
      ],
    },
    iter: {
      kicker: "Sintaxis 03 / 03",
      title: "Recorrer y transformar con iteradores",
      alt: "Slide: iteradores en Rust con map, filter y sum",
      intro: (
        <>
          Para recorrer un <C>Vec</C> usas <C>for</C>. Para transformarlo, los iteradores.
        </>
      ),
      outro: (
        <>
          <C>.map()</C> transforma, <C>.filter()</C> filtra y <C>.sum()</C> suma. Los iteradores son perezosos: no hacen
          nada hasta que llamas a <C>.collect()</C> o a <C>.sum()</C>, y se compilan a un loop optimizado.
        </>
      ),
    },
    own: {
      kicker: "Ownership",
      title: "La regla que lo cambia todo: un dueño por valor",
      alt: "Slide: ownership en Rust, un dueño por valor",
      intro: "Cada valor en Rust tiene un solo dueño. Si lo mueves, el anterior ya no puede usarlo.",
      mid: (
        <>
          El compilador responde con <C>error[E0382]: borrow of moved value: a</C>. Así Rust libera la memoria sin
          garbage collector y atrapa el error al compilar, no en producción. Tienes dos formas de arreglarlo:
        </>
      ),
    },
    adv: {
      kicker: "Resumen",
      title: "Ventajas… y el precio",
      alt: "Slide: ventajas de Rust y el precio de aprenderlo",
    },
    start: {
      kicker: "Empieza hoy",
      title: "¿Lo pruebas? Tu primer proyecto en dos comandos",
      alt: "Slide de cierre: lo pruebas, cargo new hola",
      intro: (
        <>
          Instala Rust con <C>rustup</C> desde rust-lang.org y crea tu primer proyecto con Cargo, su gestor de paquetes
          y compilador.
        </>
      ),
      outro: (
        <>
          Guarda este artículo para cuando abras tu primer proyecto. Si quieres la parte 2 sobre{" "}
          <B>borrowing y lifetimes</B>, escríbeme por Instagram (@salazarcode14).
        </>
      ),
    },
  },
  code: {
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
  },
  faqs: [
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
  ],
  related: [
    {
      href: "/blog/tendencias-desarrolloweb",
      title: "Tendencias en Desarrollo Web: nuevas tecnologías",
      desc: "Hacia dónde va el desarrollo web y qué herramientas conviene mirar.",
    },
    {
      href: "/blog/codigo-limpio",
      title: "“Código Limpio”: una guía para desarrolladores",
      desc: "Cómo escribir código que otros puedan leer, en cualquier lenguaje.",
    },
    {
      href: "/blog/agentes-ia-programacion-2026",
      title: "Agentes de IA en el desarrollo en 2026",
      desc: "Claude Code, Cursor y GitHub Copilot: cuál elegir según tu flujo.",
    },
  ],
  sources: [
    { label: "Chromium: memory safety", href: "https://chromium.org/Home/chromium-security/memory-safety" },
    { label: "Microsoft MSRC: why Rust for safe systems programming", href: "https://www.microsoft.com/msrc/blog/2019/07/why-rust-for-safe-systems-programming" },
    { label: "Phoronix: Rust se queda en el kernel de Linux", href: "https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel" },
    { label: "Astral: Ruff y uv", href: "https://astral.sh/about" },
  ],
  cta: {
    title: "¿Quieres la parte 2 de Rust?",
    body: (
      <>
        Si te quedaste con ganas de entender <strong style={{ color: "#93c5fd" }}>borrowing y lifetimes</strong>,
        cuéntamelo y lo armo con el mismo formato. Más contenido de desarrollo en Instagram:{" "}
        <strong style={{ color: "#93c5fd" }}>@salazarcode14</strong>.
      </>
    ),
    more: "Ver más artículos →",
    contact: "Contactar",
  },
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default function RustGuiaBasica() {
  return <RustGuideArticle content={content} />;
}

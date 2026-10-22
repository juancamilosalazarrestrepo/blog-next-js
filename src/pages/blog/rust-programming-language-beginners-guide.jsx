import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RustGuideArticle, { C, B } from "@/components/RustGuideArticle";

const SLUG = "rust-programming-language-beginners-guide";

const content = {
  lang: "en",
  slug: SLUG,
  slidePrefix: "rust-guide-slide",
  ogFile: `${SLUG}-og`,
  alternatePaths: {
    es: "/blog/rust-lenguaje-programacion-guia-basica",
    en: `/blog/${SLUG}`,
  },
  title: "Rust Programming Language: What It Is, Why It's Everywhere and How to Write It (Beginner's Guide)",
  seoTitle: "Rust Programming Language: Beginner's Guide with Code",
  shortTitle: "Rust: beginner's guide with code",
  subtitle:
    "What Rust is, why it's taking over systems programming and how to write it: syntax, arrays, Vec, iterators and ownership explained from scratch with code that compiles.",
  isoDate: "2026-10-21",
  dateLabel: "October 21, 2026",
  readTime: "7 min read",
  section: "Programming",
  tags: ["Rust", "Systems programming", "Performance"],
  keywords: [
    "Rust programming language",
    "learn Rust",
    "Rust for beginners",
    "Rust ownership",
    "Rust Vec",
    "Rust iterators",
    "Rust vs C",
    "Rust WebAssembly",
    "systems programming",
    "Cargo Rust",
  ],
  heroAlt: "Rust logo over a blue tech background with code",
  ogAlt: "Rust beginner's guide: syntax, arrays and ownership",
  intro:
    "Rust is a systems programming language: it compiles to native machine code, has no garbage collector or virtual machine, and catches memory errors at compile time. It performs like C and C++ but with far more safety, which is why it now runs in browsers, the Linux kernel and tools like Ruff and uv.",
  toc: [
    ["what-is-rust", "What is Rust"],
    ["why-now", "Why it's used now"],
    ["no-bytecode", "No bytecode: machine code"],
    ["syntax", "Syntax: variables and functions"],
    ["arrays-vec", "Arrays and Vec"],
    ["iterators", "Iterators"],
    ["ownership", "Ownership"],
    ["advantages", "Advantages and the price"],
    ["get-started", "How to get started"],
    ["faq", "FAQ"],
  ],
  ui: {
    home: "Home",
    quickAnswer: "Quick answer",
    toc: "In this article",
    bad: "✗ Bad",
    good: "✓ Good",
    faq: "Frequently Asked Questions",
    related: "Keep reading",
    sources: "Sources",
  },
  reasons: [
    {
      num: "01",
      title: "Speed is noticeable",
      color: "var(--brand)",
      body: "Tools you use every day already run on Rust: SWC, Biome, Ruff and uv. Rewriting the slow parts in a native language changes the day-to-day experience.",
    },
    {
      num: "02",
      title: "Memory is the risk",
      color: "var(--violet)",
      body: "Chromium and Microsoft have reported that around 70% of their serious vulnerabilities are memory problems, exactly what Rust attacks from the compiler.",
    },
    {
      num: "03",
      title: "It's official",
      color: "#0ea5e9",
      body: "The Rust experiment in the Linux kernel is over: Rust stayed as a kernel language, not as a trial.",
    },
  ],
  compare: [
    { k: "What it produces", a: "Bytecode", b: "Native machine code" },
    { k: "When it's translated", a: "While running", b: "Before running" },
    { k: "Virtual machine or interpreter", a: "Yes", b: "No" },
    { k: "Garbage collector", a: "Yes", b: "No" },
  ],
  advantages: [
    { num: "01", title: "Performance", color: "var(--brand)", body: "Native code, no virtual machine and no garbage collector." },
    { num: "02", title: "Memory safety", color: "var(--violet)", body: "No null and no use-after-free in safe code." },
    { num: "03", title: "Concurrency", color: "#0ea5e9", body: "Data races don't compile." },
    { num: "04", title: "The price", color: "#f97316", body: "The learning curve: at first you'll fight the compiler." },
  ],
  s: {
    what: {
      kicker: "Basics",
      title: "What is Rust (and what “systems language” means)",
      alt: "Slide: what Rust is, compiled, no garbage collector and statically typed",
      body: (
        <>
          <p style={{ marginBottom: "14px" }}>
            It started as a project inside Mozilla and reached version 1.0 in 2015. “System level” means you write
            software that talks almost directly to the hardware and memory: operating systems, browsers, game engines,
            databases.
          </p>
          <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            <li><B>Compiled:</B> it turns into native machine code.</li>
            <li><B>No garbage collector:</B> memory is freed on its own, with no pauses.</li>
            <li><B>Statically typed:</B> many errors show up at compile time, not in production.</li>
          </ul>
        </>
      ),
    },
    why: {
      kicker: "Context",
      title: "Why Rust is used now",
      alt: "Slide: why Rust is being used now",
    },
    bytecode: {
      kicker: "Performance",
      title: "Rust doesn't use bytecode: it compiles to machine code",
      alt: "Slide: Rust with no bytecode or virtual machine, compared with Java, C# and Python",
      caption: "Java, C# and Python compared with Rust",
      intro:
        "This is a common misunderstanding. Java, C# and Python go through bytecode and a virtual machine or interpreter that translates it while the program runs. Rust doesn't: the compiler, which uses LLVM underneath, delivers native machine code before anything executes.",
      outro: (
        <>
          Fewer layers between your code and the CPU means more performance and less memory. For the web, Rust compiles
          to <B>WebAssembly</B>: a compact binary format that the browser runs at near-native speed.
        </>
      ),
    },
    syntax: {
      kicker: "Syntax 01 / 03",
      title: "Basic syntax: variables and functions",
      alt: "Slide: basic Rust syntax with let, mut and functions",
      intro: (
        <>
          Variables are immutable by default. If you want to change them, declare them with <C>mut</C>.
        </>
      ),
      outro: (
        <>
          The type goes after the name (<C>a: i32</C>) and the return type is declared with <C>-&gt;</C>. The last
          expression of a function, without a semicolon, is what it returns.
        </>
      ),
    },
    arrays: {
      kicker: "Syntax 02 / 03",
      title: "Arrays and Vec",
      alt: "Slide: arrays and Vec in Rust",
      intro: "An array is a list of values of the same type. Rust gives you two versions:",
      items: [
        <><B>Array</B> (<C>[i32; 3]</C>): fixed size, lives on the stack.</>,
        <><B>Vec</B> (<C>Vec&lt;i32&gt;</C>): grows and shrinks, lives on the heap. You'll use this one almost always.</>,
      ],
    },
    iter: {
      kicker: "Syntax 03 / 03",
      title: "Looping and transforming with iterators",
      alt: "Slide: Rust iterators with map, filter and sum",
      intro: (
        <>
          To loop over a <C>Vec</C> you use <C>for</C>. To transform it, you use iterators.
        </>
      ),
      outro: (
        <>
          <C>.map()</C> transforms, <C>.filter()</C> filters and <C>.sum()</C> adds up. Iterators are lazy: they do
          nothing until you call <C>.collect()</C> or <C>.sum()</C>, and they compile down to an optimized loop.
        </>
      ),
    },
    own: {
      kicker: "Ownership",
      title: "The rule that changes everything: one owner per value",
      alt: "Slide: ownership in Rust, one owner per value",
      intro: "Every value in Rust has a single owner. If you move it, the previous owner can no longer use it.",
      mid: (
        <>
          The compiler answers with <C>error[E0382]: borrow of moved value: a</C>. That's how Rust frees memory without
          a garbage collector and catches the error at compile time, not in production. There are two ways to fix it:
        </>
      ),
    },
    adv: {
      kicker: "Summary",
      title: "Advantages… and the price",
      alt: "Slide: Rust advantages and the price of learning it",
    },
    start: {
      kicker: "Start today",
      title: "Want to try it? Your first project in two commands",
      alt: "Closing slide: try it, cargo new hello",
      intro: (
        <>
          Install Rust with <C>rustup</C> from rust-lang.org and create your first project with Cargo, its package
          manager and build tool.
        </>
      ),
      outro: (
        <>
          Save this article for when you open your first project. If you want part 2 on{" "}
          <B>borrowing and lifetimes</B>, message me on Instagram (@salazarcode14).
        </>
      ),
    },
  },
  code: {
    syntax: `let price = 100;      // immutable
let mut stock = 5;    // mut: can change
stock += 1;

fn add(a: i32, b: i32) -> i32 {
    a + b             // no ; = return
}`,
    arrays: `let a = [1, 2, 3];          // array: fixed

let mut v = vec![1, 2, 3];  // Vec: grows
v.push(4);`,
    iter: `let nums = vec![1, 2, 3, 4, 5, 6];

for n in &nums {
    println!("{n}");
}

let doubled: Vec<i32> = nums
    .iter()
    .map(|n| n * 2)
    .collect();  // [2, 4, 6, 8, 10, 12]

let evens: Vec<i32> = nums
    .iter()
    .copied()
    .filter(|n| n % 2 == 0)
    .collect();  // [2, 4, 6]

let total: i32 = nums.iter().sum(); // 21`,
    own: `let a = String::from("hello");
let b = a;           // a moves to b
println!("{a}");     // ERROR at compile time`,
    ownFix: `// 1. Clone: make a copy
let b = a.clone();

// 2. Borrow: pass a reference with &
fn length(s: &String) -> usize {
    s.len()
}
let n = length(&a);`,
    start: `cargo new hello
cd hello && cargo run
# Hello, world!`,
  },
  faqs: [
    {
      q: "Is Rust faster than C?",
      a: "It performs in the same range as C and C++, because it compiles to native machine code with LLVM. The big difference isn't raw speed but safety: Rust prevents at compile time memory errors that in C you only discover by running the program.",
    },
    {
      q: "Does Rust have a garbage collector?",
      a: "No. Memory is freed automatically thanks to the ownership system: every value has an owner and is released when that owner goes out of scope. There are no collection pauses and no virtual machine underneath.",
    },
    {
      q: "Does Rust use bytecode like Java?",
      a: "No. Java, C# and Python go through bytecode and a virtual machine or interpreter. Rust compiles straight to native machine code. The closest thing to bytecode is WebAssembly, the binary format Rust can compile to in order to run in the browser.",
    },
    {
      q: "What is the difference between an array and a Vec?",
      a: "An array has a fixed size, which is part of its type ([i32; 3]), and lives on the stack. A Vec can grow and shrink and keeps its data on the heap. In practice you'll use Vec almost all the time.",
    },
    {
      q: "Is Rust worth learning if I do web development?",
      a: "If you work with JavaScript, TypeScript or Python, you probably already use Rust without knowing it through tools like SWC, Biome, Ruff or uv. Learning it lets you write performance-critical parts in WebAssembly or native modules, and helps you understand how memory really works.",
    },
  ],
  related: [
    {
      href: "/blog/web-development-trends",
      title: "Web Development Trends: New Technologies",
      desc: "Where web development is heading and which tools are worth watching.",
    },
    {
      href: "/blog/clean-code",
      title: "“Clean Code”: A Guide for Developers",
      desc: "How to write code other people can read, in any language.",
    },
    {
      href: "/blog/ai-agents-programming-2026",
      title: "The Importance of Using AI Agents in Development in 2026",
      desc: "Claude Code, Cursor and GitHub Copilot: which to choose for your workflow.",
    },
  ],
  sources: [
    { label: "Chromium: memory safety", href: "https://chromium.org/Home/chromium-security/memory-safety" },
    { label: "Microsoft MSRC: why Rust for safe systems programming", href: "https://www.microsoft.com/msrc/blog/2019/07/why-rust-for-safe-systems-programming" },
    { label: "Phoronix: Rust is here to stay in the Linux kernel", href: "https://www.phoronix.com/news/Rust-To-Stay-Linux-Kernel" },
    { label: "Astral: Ruff and uv", href: "https://astral.sh/about" },
  ],
  cta: {
    title: "Want part 2 of Rust?",
    body: (
      <>
        If you're curious about <strong style={{ color: "#93c5fd" }}>borrowing and lifetimes</strong>, let me know and
        I'll build it in the same format. More development content on Instagram:{" "}
        <strong style={{ color: "#93c5fd" }}>@salazarcode14</strong>.
      </>
    ),
    more: "More articles →",
    contact: "Contact",
  },
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
}

export default function RustBeginnersGuide() {
  return <RustGuideArticle content={content} />;
}

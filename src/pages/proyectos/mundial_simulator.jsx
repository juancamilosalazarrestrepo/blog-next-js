import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import heroShot from "../../../public/images/mundial-simulator-hero.webp";
import gruposShot from "../../../public/images/mundial-simulator-grupos.webp";
import cardShot from "../../../public/images/mundial-simulator-card.webp";
import cardsShot from "../../../public/images/mundial-simulator-cards.webp";
import rankingShot from "../../../public/images/mundial-simulator-ranking.webp";

const LIVE_URL = "https://mundial-simulator.vercel.app/";
// TODO: reemplaza con el link real de descarga del APK cuando lo publiques
const APK_URL = "#apk";

const content = {
  es: {
    seoTitle: "Mundial Simulator | Simula el Mundial 2026 + Juego de Cartas TCG",
    seoDescription:
      "Plataforma web y app móvil para simular el Mundial 2026: predice los 104 partidos, arma el bracket y compite en el ranking global. Incluye un TCG con cartas de fútbol coleccionables por rareza.",
    seoImageAlt: "Mundial Simulator - Simulador del Mundial 2026 y juego de cartas de fútbol",
    badge: "Plataforma Web + App Móvil",
    heroTitlePre: "Mundial ",
    heroTitleHl: "Simulator",
    heroSubtitle:
      "Simula tu propio Mundial 2026: predice cada uno de los 104 partidos, arma tu camino hasta la final y compite con la comunidad. Todo potenciado con un juego de cartas de fútbol (TCG) coleccionables.",
    techPills: ["Next.js", "React", "React Native", "Expo", "Vercel"],
    liveBtn: "Ver plataforma en vivo",
    apkBtn: "Descargar APK Android",
    stats: [
      { n: "48", l: "Selecciones" },
      { n: "12", l: "Grupos" },
      { n: "104", l: "Partidos" },
      { n: "1", l: "Campeón" },
    ],
    pillarsTitle: "Dos productos en una sola plataforma",
    pillarsSubtitle: "Un simulador completo del Mundial y un juego de cartas de fútbol, conectados por la misma cuenta y economía.",
    p1Title: "Simulador del Mundial",
    p1Text: "Predice partido a partido la fase de grupos, deja que el sistema arme el bracket automático y descubre quién levanta la copa en tu mundial.",
    p2Title: "TCG — Cartas de Fútbol",
    p2Text: "Abre sobres, colecciona a las estrellas en versiones desde comunes hasta ultra raras y completa tu álbum del Mundial 2026.",
    p3Title: "Ranking + Mundial Real",
    p3Text: "Compara tus pronósticos contra los resultados reales del torneo y escala en el ranking global de la comunidad.",
    rowsTitle: "Un recorrido por la plataforma",
    rowsSubtitle: "Capturas reales del producto desplegado.",
    row1Badge: "Simulador",
    row1Title: "Fase de grupos y bracket automático",
    row1Text:
      "Ingresa los resultados partido a partido y mira la tabla recalcularse al instante con todos los desempates FIFA. El sistema calcula los clasificados y los 8 mejores terceros, y arma las llaves eliminatorias por ti.",
    row1List: [
      "Fase de grupos en tiempo real con desempates FIFA",
      "Bracket automático: 16avos, octavos, cuartos, semis y final",
      "Guarda múltiples escenarios y edítalos cuando quieras",
    ],
    row2Badge: "Mundial TCG",
    row2Title: "Colecciona a las estrellas del Mundial",
    row2Text:
      "Abre sobres, descubre cartas de tus jugadores favoritos y completa tu álbum. Cada carta tiene su rareza: desde comunes hasta ultra raras imposibles de soltar.",
    row2List: [
      "Sobres con cartas aleatorias por rareza",
      "Cartas ultra raras de las grandes figuras",
      "Completa tu colección y revísala cuando quieras",
    ],
    row3Badge: "Cartas Míticas",
    row3Title: "Versiones legendarias y míticas",
    row3Text:
      "Messi, Mbappé, Haaland, Kane, Salah y más en sus versiones legendarias y míticas. Gana monedas con tus aciertos y aciertos diarios para abrir sobres épicos.",
    row3List: [
      "24 cartas nuevas — legendarias y míticas",
      "Sobre Épico: 3+ cartas épicas por monedas",
      "Economía de monedas: recompensas diarias y por aciertos",
    ],
    rarities: ["Común", "Épica", "Legendaria", "Mítica", "Ultra Rara"],
    row4Badge: "Comunidad",
    row4Title: "Ranking global contra el Mundial Real",
    row4Text:
      "Las simulaciones de toda la comunidad se ordenan por puntos comparándolas con el Mundial Real. Sigue los resultados reales del torneo y mira quién acierta más.",
    row4List: [
      "Ranking global ordenado por puntos vs el Mundial Real",
      "Seguimiento de resultados reales partido a partido",
      "Puntos extra por acertar goleadores",
    ],
    howTitle: "¿Cómo funciona el simulador?",
    howSteps: [
      { n: "1", title: "Crea tu simulación", text: "Ponle un nombre y empieza con los 12 grupos." },
      { n: "2", title: "Ingresa resultados", text: "Marca los goles de los 72 partidos de grupos." },
      { n: "3", title: "Avanza el bracket", text: "16avos, octavos, cuartos, semis y final." },
      { n: "4", title: "Corona al campeón", text: "Descubre quién levanta la copa en tu mundial." },
    ],
    stackTitle: "Stack Tecnológico",
    stackWeb: "Plataforma Web",
    stackMobile: "App Móvil",
    techWeb: [
      { name: "Next.js", desc: "Framework React para web (SSR/SSG)", icon: "▲" },
      { name: "React", desc: "Interfaz interactiva del simulador", icon: "⚛️" },
      { name: "Tailwind CSS", desc: "Sistema de diseño y tema oscuro", icon: "🎨" },
      { name: "Vercel", desc: "Despliegue y hosting de la plataforma", icon: "☁️" },
    ],
    techMobile: [
      { name: "React Native", desc: "App móvil multiplataforma", icon: "📱" },
      { name: "Expo", desc: "Build y distribución simplificados", icon: "🚀" },
      { name: "Autenticación", desc: "Inicio de sesión, incluido Google", icon: "🔐" },
      { name: "Economía in-app", desc: "Monedas, sobres y colección de cartas", icon: "🪙" },
    ],
    ctaTitle: "¿Tienes una idea para una plataforma?",
    ctaText: "Desarrollo plataformas web y apps móviles a medida, desde el simulador hasta el juego. Diseño, frontend y experiencia de usuario de principio a fin.",
    ctaButton: "Ver plataforma en vivo",
    ctaSecondary: "Hablemos de tu proyecto",
    ctaTertiary: "Ver más proyectos",
  },
  en: {
    seoTitle: "Mundial Simulator | Simulate the 2026 World Cup + TCG Card Game",
    seoDescription:
      "Web platform and mobile app to simulate the 2026 World Cup: predict all 104 matches, build the bracket and compete in the global ranking. Includes a football TCG with collectible cards by rarity.",
    seoImageAlt: "Mundial Simulator - 2026 World Cup simulator and football card game",
    badge: "Web Platform + Mobile App",
    heroTitlePre: "Mundial ",
    heroTitleHl: "Simulator",
    heroSubtitle:
      "Simulate your own 2026 World Cup: predict each of the 104 matches, build your road to the final and compete with the community. All powered by a collectible football trading card game (TCG).",
    techPills: ["Next.js", "React", "React Native", "Expo", "Vercel"],
    liveBtn: "View live platform",
    apkBtn: "Download Android APK",
    stats: [
      { n: "48", l: "Teams" },
      { n: "12", l: "Groups" },
      { n: "104", l: "Matches" },
      { n: "1", l: "Champion" },
    ],
    pillarsTitle: "Two products in a single platform",
    pillarsSubtitle: "A complete World Cup simulator and a football card game, connected by the same account and economy.",
    p1Title: "World Cup Simulator",
    p1Text: "Predict the group stage match by match, let the system build the bracket automatically and find out who lifts the cup in your World Cup.",
    p2Title: "TCG — Football Cards",
    p2Text: "Open packs, collect the stars in versions from common to ultra rare and complete your 2026 World Cup album.",
    p3Title: "Ranking + Real World Cup",
    p3Text: "Compare your predictions against the real tournament results and climb the community's global ranking.",
    rowsTitle: "A tour of the platform",
    rowsSubtitle: "Real screenshots from the deployed product.",
    row1Badge: "Simulator",
    row1Title: "Group stage and automatic bracket",
    row1Text:
      "Enter results match by match and watch the table recalculate instantly with all the FIFA tie-breakers. The system computes the qualified teams and the 8 best third-placed sides, and builds the knockout bracket for you.",
    row1List: [
      "Real-time group stage with FIFA tie-breakers",
      "Automatic bracket: round of 32, 16, quarters, semis and final",
      "Save multiple scenarios and edit them anytime",
    ],
    row2Badge: "World Cup TCG",
    row2Title: "Collect the stars of the World Cup",
    row2Text:
      "Open packs, discover cards of your favorite players and complete your album. Each card has its rarity: from common to ultra rare cards impossible to pull.",
    row2List: [
      "Packs with random cards by rarity",
      "Ultra rare cards of the biggest names",
      "Complete your collection and review it anytime",
    ],
    row3Badge: "Mythic Cards",
    row3Title: "Legendary and mythic versions",
    row3Text:
      "Messi, Mbappé, Haaland, Kane, Salah and more in their legendary and mythic versions. Earn coins from your correct predictions and daily rewards to open epic packs.",
    row3List: [
      "24 new cards — legendary and mythic",
      "Epic Pack: 3+ epic cards for coins",
      "Coin economy: daily and prediction-based rewards",
    ],
    rarities: ["Common", "Epic", "Legendary", "Mythic", "Ultra Rare"],
    row4Badge: "Community",
    row4Title: "Global ranking against the Real World Cup",
    row4Text:
      "The whole community's simulations are ranked by points by comparing them with the Real World Cup. Follow the real tournament results and see who predicts best.",
    row4List: [
      "Global ranking by points vs the Real World Cup",
      "Real results tracking match by match",
      "Bonus points for predicting goalscorers",
    ],
    howTitle: "How does the simulator work?",
    howSteps: [
      { n: "1", title: "Create your simulation", text: "Give it a name and start with the 12 groups." },
      { n: "2", title: "Enter results", text: "Set the goals for the 72 group-stage matches." },
      { n: "3", title: "Advance the bracket", text: "Round of 32, 16, quarters, semis and final." },
      { n: "4", title: "Crown the champion", text: "Find out who lifts the cup in your World Cup." },
    ],
    stackTitle: "Tech Stack",
    stackWeb: "Web Platform",
    stackMobile: "Mobile App",
    techWeb: [
      { name: "Next.js", desc: "React framework for web (SSR/SSG)", icon: "▲" },
      { name: "React", desc: "Interactive simulator interface", icon: "⚛️" },
      { name: "Tailwind CSS", desc: "Design system and dark theme", icon: "🎨" },
      { name: "Vercel", desc: "Platform deployment and hosting", icon: "☁️" },
    ],
    techMobile: [
      { name: "React Native", desc: "Cross-platform mobile app", icon: "📱" },
      { name: "Expo", desc: "Simplified build and distribution", icon: "🚀" },
      { name: "Authentication", desc: "Sign in, including Google", icon: "🔐" },
      { name: "In-app economy", desc: "Coins, packs and card collection", icon: "🪙" },
    ],
    ctaTitle: "Do you have an idea for a platform?",
    ctaText: "I build custom web platforms and mobile apps, from the simulator to the game. Design, frontend and user experience end to end.",
    ctaButton: "View live platform",
    ctaSecondary: "Let's talk about your project",
    ctaTertiary: "See more projects",
  },
};

const rarityColors = {
  0: "bg-slate-500/20 text-slate-300 border-slate-400/30",
  1: "bg-sky-500/20 text-sky-300 border-sky-400/30",
  2: "bg-violet-500/20 text-violet-300 border-violet-400/30",
  3: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30",
  4: "bg-amber-500/20 text-amber-300 border-amber-400/30",
};

// Marco de navegador para las capturas reales
const BrowserFrame = ({ children }) => (
  <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0c1f]">
    <div className="flex items-center gap-2 px-4 py-3 bg-[#15152e] border-b border-white/5">
      <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
      <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
      <span className="ml-3 flex-1 text-[11px] text-white/40 bg-white/5 rounded-md px-3 py-1 truncate">
        mundial-simulator.vercel.app
      </span>
    </div>
    {children}
  </div>
);

const MundialSimulator = () => {
  const { locale } = useRouter();
  const c = content[locale] || content.es;

  const rows = [
    { badge: c.row1Badge, title: c.row1Title, text: c.row1Text, list: c.row1List, img: gruposShot, accent: "violet", rarities: null },
    { badge: c.row2Badge, title: c.row2Title, text: c.row2Text, list: c.row2List, img: cardShot, accent: "amber", rarities: null },
    { badge: c.row3Badge, title: c.row3Title, text: c.row3Text, list: c.row3List, img: cardsShot, accent: "fuchsia", rarities: c.rarities },
    { badge: c.row4Badge, title: c.row4Title, text: c.row4Text, list: c.row4List, img: rankingShot, accent: "emerald", rarities: null },
  ];

  const accentMap = {
    violet: { badge: "bg-violet-500/15 text-violet-300 border-violet-400/20", check: "text-violet-400" },
    amber: { badge: "bg-amber-500/15 text-amber-300 border-amber-400/20", check: "text-amber-400" },
    fuchsia: { badge: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/20", check: "text-fuchsia-400" },
    emerald: { badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20", check: "text-emerald-400" },
  };

  return (
    <Layout>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={[
          "simulador mundial 2026",
          "predecir mundial 2026",
          "juego de cartas de futbol",
          "tcg futbol",
          "bracket mundial",
          "mundial simulator",
          "juan camilo salazar",
        ]}
        image="/images/mundial-simulator-hero.webp"
        imageAlt={c.seoImageAlt}
        type="website"
        category="Desarrollo Web y Móvil"
      />

      <main className="font-sans bg-[#070713] text-slate-100">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes mfloat { 0%{transform:translateY(0)} 50%{transform:translateY(-12px)} 100%{transform:translateY(0)} }
            @keyframes mglow { 0%,100%{opacity:.35} 50%{opacity:.6} }
          `,
        }} />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-16 md:py-24">
          {/* glows de fondo */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-violet-600/25 blur-[120px] animate-[mglow_7s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 w-[34rem] h-[34rem] rounded-full bg-lime-500/15 blur-[120px] animate-[mglow_9s_ease-in-out_infinite]" />

          <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            <div className="w-full lg:flex-1 text-center lg:text-left z-10">
              <span className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                {c.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.03] tracking-tight">
                {c.heroTitlePre}
                <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                  {c.heroTitleHl}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {c.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-9">
                {c.techPills.map((tech) => (
                  <span key={tech} className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-7 py-3.5 rounded-xl font-bold shadow-[0_10px_30px_rgba(124,58,237,0.45)] transition-all transform hover:-translate-y-0.5"
                >
                  {c.liveBtn}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href={APK_URL}
                  className="inline-flex items-center gap-2 bg-white/5 border border-lime-400/40 hover:border-lime-400 hover:bg-lime-400/10 text-lime-300 px-7 py-3.5 rounded-xl font-bold transition-all transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 18.5l-6-6m6 6l6-6m-6 6V3" />
                  </svg>
                  {c.apkBtn}
                </a>
              </div>
            </div>

            <div className="w-full lg:flex-1 z-10 animate-[mfloat_6s_ease-in-out_infinite]">
              <BrowserFrame>
                <Image
                  src={heroShot}
                  alt={c.seoImageAlt}
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto"
                />
              </BrowserFrame>
            </div>
          </div>

          {/* Stats */}
          <div className="relative max-w-4xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.stats.map((s) => (
              <div key={s.l} className="text-center rounded-2xl bg-white/5 border border-white/10 py-6 backdrop-blur-sm">
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">{s.n}</p>
                <p className="text-[11px] md:text-xs uppercase tracking-widest text-slate-400 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pilares */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{c.pillarsTitle}</h2>
              <p className="text-slate-400 text-lg mt-4">{c.pillarsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: c.p1Title, d: c.p1Text, color: "from-violet-500/20 to-violet-500/5 border-violet-400/20", ic: "text-violet-300", path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
                { t: c.p2Title, d: c.p2Text, color: "from-amber-500/20 to-amber-500/5 border-amber-400/20", ic: "text-amber-300", path: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                { t: c.p3Title, d: c.p3Text, color: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/20", ic: "text-emerald-300", path: "M16 8v8m-4-5v5M8 14v2m-5 5h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" },
              ].map((p) => (
                <div key={p.t} className={`flex flex-col gap-5 p-8 rounded-3xl bg-gradient-to-b ${p.color} border backdrop-blur-sm`}>
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${p.ic}`}>
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={p.path} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{p.t}</h3>
                    <p className="text-slate-400 leading-relaxed">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detalle por filas con capturas reales */}
        <section className="px-6 py-16 bg-[#0a0a1c]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{c.rowsTitle}</h2>
              <p className="text-slate-400 text-lg mt-4">{c.rowsSubtitle}</p>
            </div>

            <div className="flex flex-col gap-20">
              {rows.map((r, i) => {
                const a = accentMap[r.accent];
                return (
                  <div key={r.title} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-14`}>
                    <div className="flex-1 text-center md:text-left">
                      <span className={`inline-block ${a.badge} border text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4`}>{r.badge}</span>
                      <h3 className="text-2xl md:text-3xl font-black mb-4">{r.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed mb-6">{r.text}</p>
                      <ul className="flex flex-col gap-3 mb-5 text-left max-w-md mx-auto md:mx-0">
                        {r.list.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-slate-300">
                            <svg className={`w-5 h-5 ${a.check} shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {r.rarities && (
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {r.rarities.map((rar, idx) => (
                            <span key={rar} className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md border ${rarityColors[idx]}`}>
                              {rar}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <BrowserFrame>
                        <Image
                          src={r.img}
                          alt={r.title}
                          placeholder="blur"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto"
                        />
                      </BrowserFrame>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-14">{c.howTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {c.howSteps.map((s, i) => {
                const ring = ["border-violet-400/60 text-violet-300", "border-sky-400/60 text-sky-300", "border-emerald-400/60 text-emerald-300", "border-fuchsia-400/60 text-fuchsia-300"][i];
                return (
                  <div key={s.n} className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full border-2 ${ring} flex items-center justify-center text-xl font-black mb-5`}>{s.n}</div>
                    <h3 className="text-lg font-black uppercase tracking-wide mb-2">{s.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="px-6 py-20 bg-[#0a0a1c]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-12 justify-center">
              <span className="h-px w-16 bg-white/15"></span>
              <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{c.stackTitle}</span>
              <span className="h-px w-16 bg-white/15"></span>
            </div>
            <div className="bg-white/[0.03] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {[
                  { label: c.stackWeb, items: c.techWeb },
                  { label: c.stackMobile, items: c.techMobile },
                ].map((col) => (
                  <div key={col.label} className="p-10 flex flex-col gap-6">
                    <h3 className="text-xl font-black">{col.label}</h3>
                    <div className="flex flex-col gap-4">
                      {col.items.map((t) => (
                        <div key={t.name} className="flex items-start gap-4">
                          <span className="text-2xl w-8 text-center">{t.icon}</span>
                          <div>
                            <p className="font-bold">{t.name}</p>
                            <p className="text-sm text-slate-400">{t.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 bg-violet-500/15 rounded-full flex items-center justify-center mb-8 text-violet-300">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{c.ctaTitle}</h2>
            <p className="text-slate-400 mb-10 text-xl max-w-xl mx-auto">{c.ctaText}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-center">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-9 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(124,58,237,0.45)] transition-all transform hover:-translate-y-1 text-center"
              >
                {c.ctaButton}
              </a>
              <a
                href={APK_URL}
                className="inline-flex items-center justify-center gap-2 border border-lime-400/40 hover:border-lime-400 hover:bg-lime-400/10 text-lime-300 px-9 py-4 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5l-6-6m6 6l6-6m-6 6V3" />
                </svg>
                {c.apkBtn}
              </a>
              <Link
                href="/contact"
                className="bg-white/5 border border-white/15 hover:border-white/40 text-slate-100 px-9 py-4 rounded-2xl font-bold text-lg transition-all text-center"
              >
                {c.ctaSecondary}
              </Link>
              <Link
                href="/proyectos"
                className="text-slate-400 hover:text-white px-9 py-4 rounded-2xl font-bold text-lg transition-all text-center"
              >
                {c.ctaTertiary}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "es", ["common"])),
    },
  };
}

export default MundialSimulator;

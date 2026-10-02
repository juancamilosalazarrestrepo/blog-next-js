import Link from "next/link";
import DotWaveField from "./DotWaveField";
import styles from "../styles/ServicesPage.module.css";

const BLUE_PALETTE = { low: "#1a56e8", mid: "#3aa5ff", high: "#c4f1ff" };
const BLUE_BACKGROUND = "radial-gradient(ellipse at 50% 25%, #0a2260 0%, #040a24 60%, #02061a 100%)";

const icon = (children) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const SERVICES = [
  {
    title: "E-commerce en Shopify",
    description:
      "Tiendas online profesionales y a medida, optimizadas para vender más: velocidad, conversión, pasarelas de pago seguras, inventario y estrategia de marketing digital.",
    tags: ["Shopify", "Pagos", "Conversión"],
    wide: true,
    icon: icon(<><path d="M6 7h13l-1.5 8H8z" /><path d="M6 7 5 3H2" /><circle cx="9" cy="19" r="1.3" /><circle cx="17" cy="19" r="1.3" /></>),
  },
  {
    title: "Software personalizado",
    description: "Paneles administrativos, sistemas de gestión y plataformas de automatización escalables, seguras y con diseño intuitivo.",
    tags: ["A medida", "Automatización"],
    icon: icon(<><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13.5 5-3 14" /></>),
  },
  {
    title: "Frontend en Next.js",
    description: "Interfaces modernas, rápidas y optimizadas para SEO, con renderizado del lado del servidor y foco en accesibilidad.",
    tags: ["Next.js", "React", "SEO"],
    icon: icon(<><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>),
  },
  {
    title: "Backends en .NET",
    description: "Arquitecturas robustas para aplicaciones empresariales: autenticación, integraciones y bases de datos complejas.",
    tags: [".NET", "SQL", "Azure"],
    icon: icon(<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>),
  },
  {
    title: "Backend en Node.js",
    description: "APIs y microservicios para alto tráfico y tiempo real con Express o Nest.js, con pruebas y despliegues en la nube.",
    tags: ["Node.js", "APIs", "Tiempo real"],
    icon: icon(<><path d="M12 3 4 7.5v9L12 21l8-4.5v-9z" /><path d="M12 12v9M12 12 4 7.5M12 12l8-4.5" /></>),
  },
  {
    title: "Diseño UX/UI de landing pages",
    description:
      "Landing pages atractivas y enfocadas en conversión: UX clara, diseño responsivo y psicología del color para que cada visitante dé el siguiente paso.",
    tags: ["UX/UI", "Conversión", "Responsive"],
    wide: true,
    link: "/desarrollo-web",
    icon: icon(<><path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="15" cy="7.5" r="1" /></>),
  },
  {
    title: "Maquetación web profesional",
    description: "Tus diseños convertidos en sitios fieles, semánticos, rápidos y compatibles con cualquier dispositivo o navegador.",
    tags: ["HTML/CSS", "Pixel perfect"],
    icon: icon(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>),
  },
];

const STEPS = [
  { title: "Descubrimiento", text: "Entendemos tu negocio, tus usuarios y el objetivo medible." },
  { title: "Diseño", text: "Prototipo y arquitectura validados antes de escribir código." },
  { title: "Desarrollo", text: "Entregas iterativas, código limpio y pruebas automatizadas." },
  { title: "Lanzamiento", text: "Despliegue, monitoreo y mejora continua después del go-live." },
];

const STATS = [
  { value: "7", label: "servicios" },
  { value: "Full Stack", label: "de punta a punta" },
  { value: "IA", label: "agentes y automatización" },
];

function spotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export default function ServicesShowcase() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <DotWaveField palette={BLUE_PALETTE} background={BLUE_BACKGROUND} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i aria-hidden="true" /> Servicios · Desarrollo web e IA
          </span>
          <h1 className={styles.title}>
            Software, e-commerce e <span>inteligencia artificial</span> que mueven tu negocio
          </h1>
          <p className={styles.subtitle}>
            Aceleramos tu producto con desarrollo a medida, modelos personalizados, automatización y despliegue. Sesión inicial gratuita.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Solicitar consultoría
            </Link>
            <Link href="/consultoria-ia" className={styles.ctaGhost}>
              Ver consultoría IA
            </Link>
          </div>
          <dl className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="servicios-titulo">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Lo que hacemos</span>
          <h2 id="servicios-titulo">Todo lo que tu producto necesita</h2>
          <p>Del diseño al backend, un solo equipo responsable de que funcione, escale y convierta.</p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <article key={service.title} className={`${styles.card} ${service.wide ? styles.wide : ""}`} onMouseMove={spotlight}>
              <div className={styles.cardTop}>
                <span className={styles.iconBox}>{service.icon}</span>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className={styles.tags}>
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {service.link && (
                <Link href={service.link} className={styles.more}>
                  Ver más <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process} aria-labelledby="proceso-titulo">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Cómo trabajamos</span>
          <h2 id="proceso-titulo">Un proceso simple y transparente</h2>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.finalCta}>
          <h2>¿Listo para construir algo que funcione?</h2>
          <p>Cuéntanos tu idea y te respondemos con un plan claro.</p>
          <Link href="/contact" className={styles.ctaPrimary}>
            Hablemos de tu proyecto
          </Link>
        </div>
      </section>
    </div>
  );
}

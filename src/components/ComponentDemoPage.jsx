import Link from "next/link";
import styles from "../styles/ComponentDemoPage.module.css";

const DARK = {
  "--heading": "#ffffff",
  "--text": "#c3cbe0",
  "--muted": "#8b95b0",
  "--banner-heading": "#ffffff",
  "--banner-text": "#d6dcec",
  "--on-accent": "#05060f",
  "--secondary-bg": "rgba(255, 255, 255, 0.06)",
  "--badge-bg": "rgba(5, 6, 15, 0.45)",
  "--border-strong": "rgba(255, 255, 255, 0.22)",
  "--code-text": "#d6dcec",
  "--text-shadow": "0 2px 18px rgba(0, 0, 0, 0.55)",
};

const LIGHT = {
  "--heading": "#14112b",
  "--text": "#3f3d56",
  "--muted": "#5f5b78",
  "--banner-heading": "#14112b",
  "--banner-text": "#34314d",
  "--on-accent": "#ffffff",
  "--secondary-bg": "rgba(255, 255, 255, 0.7)",
  "--badge-bg": "rgba(255, 255, 255, 0.65)",
  "--border-strong": "rgba(20, 17, 43, 0.18)",
  "--code-text": "#2a2742",
  "--text-shadow": "none",
};

/**
 * Página demo de un componente de la biblioteca: cabecera, banner de vista previa, características y uso.
 * `theme` define bg, surface, border, accent, accentGlow, codeBg y scrim; `light` cambia la tipografía a oscura.
 */
export default function ComponentDemoPage({
  title,
  subtitle,
  tags = [],
  theme,
  light = false,
  preview,
  hint,
  banner,
  features,
  usage,
}) {
  const vars = {
    ...(light ? LIGHT : DARK),
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--border": theme.border,
    "--accent": theme.accent,
    "--accent-glow": theme.accentGlow,
    "--code-bg": theme.codeBg,
    "--scrim": theme.scrim,
    "--scrim-mobile": theme.scrimMobile ?? theme.scrim,
  };

  return (
    <div className={styles.page} style={vars}>
      <div className={styles.pageHeader}>
        <Link href="/elements" className={styles.backLink}>
          ← Biblioteca de Componentes
        </Link>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.demoSection}>
        <div className={styles.demoLabel}>Vista previa — interactivo</div>
        <div className={styles.bannerWrapper} data-demo-banner>
          {preview}
          <div className={styles.scrim} />
          <div className={styles.bannerContent}>
            <span className={styles.badge}>{banner.badge}</span>
            <h2 className={styles.title}>
              {banner.title}
              <br />
              <span className={styles.titleLight}>{banner.titleLight}</span>
            </h2>
            <p className={styles.tagline}>{banner.tagline}</p>
            <div className={styles.buttons}>
              <button className={styles.btnPrimary}>{banner.primary}</button>
              <button className={styles.btnSecondary}>{banner.secondary}</button>
            </div>
          </div>
          {hint && <span className={styles.hint}>{hint}</span>}
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Características</h3>
            <ul className={styles.list}>
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Uso</h3>
            <pre className={styles.code}>{usage}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

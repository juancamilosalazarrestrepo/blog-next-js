import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import styles from "../styles/AgentsHero.module.css";
import { HERO_AGENTS, HERO_MODULES } from "./agentsHero/config";

const LOG_SIZE = 4;
const INITIAL_LOG = [
  { id: "init-ops", agent: 4 },
  { id: "init-support", agent: 1 },
];

export default function AgentsHero() {
  const { t } = useTranslation("common");
  const sceneRef = useRef(null);
  const agentLabelRefs = useRef([]);
  const moduleLabelRefs = useRef([]);
  const [ready, setReady] = useState(false);
  const [activeAgent, setActiveAgent] = useState(-1);
  const [log, setLog] = useState(INITIAL_LOG);

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    let counter = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // three.js se carga solo en el cliente y en un chunk aparte, para no frenar el primer render.
    import("./agentsHero/scene").then(({ createAgentsScene }) => {
      if (cancelled || !sceneRef.current) return;
      cleanup = createAgentsScene({
        container: sceneRef.current,
        agentLabels: agentLabelRefs.current,
        moduleLabels: moduleLabelRefs.current,
        reducedMotion,
        onReady: () => setReady(true),
        onActivate: (index) => {
          setActiveAgent(index);
          counter += 1;
          setLog((entries) => [...entries, { id: `live-${counter}`, agent: index }].slice(-LOG_SIZE));
        },
      });
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <div ref={sceneRef} className={`${styles.scene} ${ready ? styles.sceneReady : ""}`} aria-hidden="true">
        <div className={styles.labels}>
          {HERO_AGENTS.map((agent, i) => (
            <span
              key={agent.key}
              ref={(el) => (agentLabelRefs.current[i] = el)}
              className={styles.agentLabel}
              data-active={activeAgent === i}
              style={{ "--agent-color": agent.color }}
            >
              <span className={styles.agentDot} />
              {t(`hero.agents.${agent.key}`)}
            </span>
          ))}
          {HERO_MODULES.map((module, i) => (
            <span key={module.key} ref={(el) => (moduleLabelRefs.current[i] = el)} className={styles.moduleLabel}>
              {"</>"} {t(`hero.modules.${module.key}`)}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            {t("hero.badge")}
          </span>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.gradientAgents}>{t("hero.title1")}</span> {t("hero.titleJoin")}{" "}
            <span className={styles.gradientSoftware}>{t("hero.title2")}</span>
            <span className={styles.titleTail}>{t("hero.titleTail")}</span>
          </h1>

          <p className={styles.description}>{t("hero.description")}</p>

          <div className={styles.ctas}>
            <Link href="/contact" className={styles.ctaPrimary}>
              {t("hero.ctaPrimary")}
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="/agentes-ai" className={styles.ctaSecondary}>
              {t("hero.ctaSecondary")}
            </Link>
          </div>

          <ul className={styles.chips}>
            {["chip1", "chip2", "chip3"].map((chip) => (
              <li key={chip}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                {t(`hero.${chip}`)}
              </li>
            ))}
          </ul>

          <p className={styles.author}>
            <strong>Juan Camilo Salazar Restrepo</strong> · {t("hero.role")}
          </p>
        </div>
      </div>

      <div className={styles.logCard} aria-hidden="true">
        <div className={styles.logHeader}>
          <span className={styles.logDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.logTitle}>agents.live</span>
          <span className={styles.logStatus}>● {t("hero.logStatus")}</span>
        </div>
        <ol className={styles.logBody}>
          {log.map((entry) => {
            const agent = HERO_AGENTS[entry.agent];
            return (
              <li key={entry.id} className={styles.logLine}>
                <span className={styles.logPrompt}>›</span>
                <span>
                  <span className={styles.logAgent} style={{ color: agent.color }}>
                    {t(`hero.agents.${agent.key}`)}
                  </span>{" "}
                  {t(`hero.log.${agent.key}`)} <span className={styles.logOk}>✓</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

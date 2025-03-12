import styles from "../styles/BenefitsSection.module.css"; // Importa los estilos como módulo

const BenefitsSection = () => {
  const benefits = [
    { icon: "🚀", title: "Tienda optimizada para ventas", description: "Maximiza conversiones con un diseño intuitivo y embudos de venta efectivos." },
    { icon: "🎨", title: "Diseño moderno y atractivo", description: "Creamos tiendas visualmente atractivas que reflejan tu marca y generan confianza." },
    { icon: "📱", title: "100% Adaptada a móviles", description: "Tu tienda se verá y funcionará perfectamente en cualquier dispositivo." },
    { icon: "💳", title: "Integración con pagos y envíos", description: "Configuramos pasarelas de pago seguras y métodos de envío eficientes." },
    { icon: "⚡", title: "SEO y velocidad optimizados", description: "Tiendas rápidas y bien posicionadas en Google para atraer más tráfico orgánico." },
    { icon: "🛠️", title: "Soporte y escalabilidad", description: "Mantenimiento, mejoras y escalabilidad para que tu tienda crezca sin límites." }
  ];

  return (
    <div className={styles.benefitsContainer}>
      <div className={styles.benefitsRow}>
        {benefits.slice(0, 3).map((benefit, index) => (
          <div key={index} className={styles.benefitCard}>
            <div className={styles.benefitIcon}>{benefit.icon}</div>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDescription}>{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.benefitsRow}>
        {benefits.slice(3, 6).map((benefit, index) => (
          <div key={index} className={styles.benefitCard}>
            <div className={styles.benefitIcon}>{benefit.icon}</div>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDescription}>{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;

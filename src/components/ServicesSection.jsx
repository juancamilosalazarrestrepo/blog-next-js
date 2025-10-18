import styles from "../styles/BenefitsSection.module.css"; // Importa los estilos como módulo

const ServicesSection = () => {
  const benefits = [
    {
      icon: "🛒",
      title: "E-commerce en Shopify",
      description:
        "Creamos tiendas online profesionales y personalizadas en Shopify, optimizadas para aumentar tus ventas y mejorar la experiencia de tus clientes. Nos enfocamos en la velocidad, la conversión y la usabilidad, integrando pasarelas de pago seguras, sistemas de inventario y estrategias de marketing digital para potenciar tu marca."
    },
    {
      icon: "💻",
      title: "Software personalizado",
      description:
        "Desarrollamos software a medida que se adapta exactamente a las necesidades de tu negocio. Desde paneles administrativos y sistemas de gestión hasta plataformas de automatización, construimos soluciones escalables y seguras. Nuestro enfoque combina tecnología moderna, rendimiento y diseño intuitivo para impulsar tu productividad y eficiencia operativa."
    },
    {
      icon: "⚛️",
      title: "Desarrollo Frontend en Next.js",
      description:
        "Creamos interfaces modernas, rápidas y optimizadas para SEO utilizando Next.js. Nuestro enfoque está en la velocidad, la accesibilidad y la experiencia del usuario, garantizando un diseño atractivo y funcional. Implementamos buenas prácticas de rendimiento y renderizado del lado del servidor para ofrecer aplicaciones web con la mejor calidad técnica posible."
    },
    {
      icon: "🧩",
      title: "Desarrollo de backends en .NET",
      description:
        "Diseñamos y desarrollamos backends robustos y seguros con .NET, ideales para aplicaciones empresariales y de alto rendimiento. Creamos arquitecturas escalables con autenticación, gestión de usuarios, integraciones con servicios externos y bases de datos complejas. Nuestro enfoque garantiza estabilidad, eficiencia y mantenimiento a largo plazo."
    },
    {
      icon: "🚀",
      title: "Desarrollo de backend en Node.js",
      description:
        "Construimos APIs y microservicios escalables con Node.js para soportar aplicaciones modernas de alto tráfico. Nuestras soluciones priorizan el rendimiento, la eficiencia y la comunicación en tiempo real, utilizando frameworks como Express o Nest.js. Implementamos buenas prácticas de seguridad, pruebas automatizadas y despliegues optimizados en la nube."
    },
    {
      icon: "🎨",
      title: "Diseño UX/UI de landing pages",
      description:
        "Diseñamos landing pages atractivas, funcionales y enfocadas en la conversión. Combinamos una estética moderna con una experiencia de usuario clara e intuitiva para maximizar resultados. Aplicamos principios de UX/UI, diseño responsivo y psicología del color, garantizando que cada visitante encuentre valor y dé el siguiente paso hacia tu objetivo."
    }
  ];


  return (
    <div className={styles.benefitsContainer}>
      {benefits.map((benefit, index) => (
        <div key={index} className={styles.serviceCard}>
          <div className={styles.serviceImage}>{benefit.icon}</div>
          <div className={styles.servicesContent}>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.serviceDescription}>{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>

  );
};

export default ServicesSection;

import styles from "../styles/ShopifyServices.module.css";

const ShopifyServices = () => {
  const services = [
    { icon: "🛍️", title: "Tienda desde Cero", description: "Diseño, desarrollo y configuración completa para lanzar tu tienda en Shopify." },
    { icon: "🎨", title: "Rediseño y Mejoras", description: "Optimización de una tienda existente para mejorar ventas y experiencia de usuario." },
    { icon: "🔗", title: "Integraciones Personalizadas", description: "Conexión con pasarelas de pago, apps externas y APIs para ampliar funcionalidades." },
    { icon: "🛠️", title: "Mantenimiento y Soporte", description: "Actualizaciones, mejoras continuas y resolución de problemas en tu tienda." }
  ];

  return (
    <section className={styles.servicesContainer}>
      <h2 className={styles.sectionTitle}>Tipos de Servicios en Shopify</h2>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopifyServices;

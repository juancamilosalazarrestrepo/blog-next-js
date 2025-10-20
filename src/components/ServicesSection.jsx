import styles from "../styles/BenefitsSection.module.css"; // Importa los estilos como módulo
import Image from "next/image";
import shopifyImage from "../../public/images/shopify.webp";
import customApp from "../../public/images/customApp.webp";
import nextFrontend from "../../public/images/next.webp";
import dotNetBackend from "../../public/images/backend.webp";
import nodeBackend from "../../public/images/NodeJS-for-Backend.webp";
import uiuxImage from "../../public/images/uiux.webp";
import webLayoutImage from "../../public/images/Maquetacion.webp";


const ServicesSection = () => {
  const services = [
    {
      // ahora la propiedad se llama `image` y usamos shopifyImage en todos
      image: shopifyImage,
      title: "E-commerce en Shopify",
      description:
        "Creamos tiendas online profesionales y personalizadas en Shopify, optimizadas para aumentar tus ventas y mejorar la experiencia de tus clientes. Nos enfocamos en la velocidad, la conversión y la usabilidad, integrando pasarelas de pago seguras, sistemas de inventario y estrategias de marketing digital para potenciar tu marca."
    },
    {
      image: customApp,
      title: "Software personalizado",
      description:
        "Desarrollamos software a medida que se adapta exactamente a las necesidades de tu negocio. Desde paneles administrativos y sistemas de gestión hasta plataformas de automatización, construimos soluciones escalables y seguras. Nuestro enfoque combina tecnología moderna, rendimiento y diseño intuitivo para impulsar tu productividad y eficiencia operativa."
    },
    {
      image: nextFrontend,
      title: "Desarrollo Frontend en Next.js",
      description:
        "Creamos interfaces modernas, rápidas y optimizadas para SEO utilizando Next.js. Nuestro enfoque está en la velocidad, la accesibilidad y la experiencia del usuario, garantizando un diseño atractivo y funcional. Implementamos buenas prácticas de rendimiento y renderizado del lado del servidor para ofrecer aplicaciones web con la mejor calidad técnica posible."
    },
    {
      image: dotNetBackend,
      title: "Desarrollo de backends en .NET",
      description:
        "Diseñamos y desarrollamos backends robustos y seguros con .NET, ideales para aplicaciones empresariales y de alto rendimiento. Creamos arquitecturas escalables con autenticación, gestión de usuarios, integraciones con servicios externos y bases de datos complejas. Nuestro enfoque garantiza estabilidad, eficiencia y mantenimiento a largo plazo."
    },
    {
      image: nodeBackend,
      title: "Desarrollo de backend en Node.js",
      description:
        "Construimos APIs y microservicios escalables con Node.js para soportar aplicaciones modernas de alto tráfico. Nuestras soluciones priorizan el rendimiento, la eficiencia y la comunicación en tiempo real, utilizando frameworks como Express o Nest.js. Implementamos buenas prácticas de seguridad, pruebas automatizadas y despliegues optimizados en la nube."
    },
    {
      image: uiuxImage,
      title: "Diseño UX/UI de landing pages",
      description:
        "Diseñamos landing pages atractivas, funcionales y enfocadas en la conversión. Combinamos una estética moderna con una experiencia de usuario clara e intuitiva para maximizar resultados. Aplicamos principios de UX/UI, diseño responsivo y psicología del color, garantizando que cada visitante encuentre valor y dé el siguiente paso hacia tu objetivo."
    },
    {
  image: webLayoutImage,
  title: "Maquetación web profesional",
  description:
    "Convertimos tus diseños en sitios web totalmente funcionales, optimizados y responsivos. Nos enfocamos en una estructura limpia, semántica y adaptable a cualquier dispositivo. Garantizamos una maquetación fiel al diseño original, con tiempos de carga rápidos y compatibilidad entre navegadores, asegurando una experiencia fluida para todos los usuarios."
}
  ];


  return (
    <div className={styles.servicesContainer}>
      {services.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
          <Image
            src={service.image}
            alt={service.title}
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />

          <div className={styles.servicesContent}>
            <h3 className={styles.benefitTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        </div>
      ))}
    </div>

  );
};

export default ServicesSection;

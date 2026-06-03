import Image from "next/image";
import Layout from "../../components/Layout";
import Banners from "../../components/Banners";
import SEO from "../../components/SEO";
import banner1 from "../../../public/images/background.webp"
import banner2 from "../../../public/images/banner2.webp";
import moviles from "../../../public/images/phones.png"
import LogosSlider from "../../components/LogosSlide";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

const content = {
  es: {
    seoTitle: "App Móvil para Restaurantes con React Native",
    seoDescription: "Aplicación móvil para restaurantes desarrollada con React Native, con suscripción a newsletter y funcionalidades para el sector gastronómico.",
    title: "Aplicación móvil para restaurantes",
    intro: <>Desarrollé una <strong>aplicación móvil para restaurantes</strong> utilizando <strong>React Native</strong>, diseñada para mejorar la experiencia de los clientes y optimizar la gestión operativa del restaurante. La aplicación cuenta con una interfaz intuitiva y moderna, adaptada tanto para iOS como para Android, que permite a los usuarios explorar menús, realizar pedidos en línea y gestionar reservas con facilidad.</>,
    featuresTitle: "Características Principales",
    features: [
      <><strong>Exploración de Menús:</strong> Visualización de platos con descripciones, imágenes y precios organizados por categorías.</>,
      <><strong>Pedidos en Línea:</strong> Integración para realizar pedidos directamente desde la app con opciones de entrega o recogida.</>,
      <><strong>Gestión de Reservas:</strong> Sistema de reservas en tiempo real con confirmaciones automáticas.</>,
      <><strong>Notificaciones Push:</strong> Alertas para promociones, estados de pedidos o recordatorios de reservas.</>,
      <><strong>Integración de Pago:</strong> Pasarela de pago segura para transacciones rápidas y confiables.</>,
      <><strong>Panel Administrativo:</strong> Funcionalidad básica para que los restaurantes gestionen productos, reservas y pedidos.</>,
    ],
    techTitle: "Tecnologías Utilizadas",
    tech: [
      <><strong>Frontend:</strong> React Native, Redux para la gestión de estado.</>,
      <><strong>Backend:</strong> Node.js con Express para la API.</>,
      <><strong>Base de Datos:</strong> MongoDB para almacenamiento de datos.</>,
      <><strong>Otros:</strong> Firebase para notificaciones push y autenticación de usuarios.</>,
    ],
    outro: <>El proyecto destaca por su enfoque en la <strong>usabilidad</strong>, optimización de rendimiento y diseño atractivo, ofreciendo una solución completa para modernizar las operaciones en el sector gastronómico.</>,
  },
  en: {
    seoTitle: "Mobile App for Restaurants with React Native",
    seoDescription: "Mobile app for restaurants built with React Native, with newsletter subscription and features for the food service industry.",
    title: "Mobile app for restaurants",
    intro: <>I developed a <strong>mobile app for restaurants</strong> using <strong>React Native</strong>, designed to improve the customer experience and optimize the restaurant's operational management. The app features an intuitive, modern interface adapted for both iOS and Android, allowing users to browse menus, place orders online and manage reservations with ease.</>,
    featuresTitle: "Key Features",
    features: [
      <><strong>Menu Browsing:</strong> View dishes with descriptions, images and prices organized by category.</>,
      <><strong>Online Ordering:</strong> Integration to place orders directly from the app with delivery or pickup options.</>,
      <><strong>Reservation Management:</strong> Real-time booking system with automatic confirmations.</>,
      <><strong>Push Notifications:</strong> Alerts for promotions, order status or reservation reminders.</>,
      <><strong>Payment Integration:</strong> Secure payment gateway for fast and reliable transactions.</>,
      <><strong>Admin Panel:</strong> Basic functionality for restaurants to manage products, reservations and orders.</>,
    ],
    techTitle: "Technologies Used",
    tech: [
      <><strong>Frontend:</strong> React Native, Redux for state management.</>,
      <><strong>Backend:</strong> Node.js with Express for the API.</>,
      <><strong>Database:</strong> MongoDB for data storage.</>,
      <><strong>Others:</strong> Firebase for push notifications and user authentication.</>,
    ],
    outro: <>The project stands out for its focus on <strong>usability</strong>, performance optimization and attractive design, offering a complete solution to modernize operations in the food service sector.</>,
  },
};

const AplicacionMovilParaRestaurantes = ({ c }) => {
  const images = [banner1, banner2];

  return (
    <div>
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <Banners images={images} />
      </div>

      <main className="container">
        <section className="container">
          <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "1rem" }}>
            {c.title}
          </h1>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image src={moviles} width={800} alt={c.title} />
          </div>
          <p style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            {c.intro}
          </p>

          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "1rem" }}>
            {c.featuresTitle}
          </h3>
          <ul>
            {c.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>

          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "1rem" }}>
            {c.techTitle}
          </h3>
          <div style={{ width: "100%", margin: "50px" }}><LogosSlider /></div>

          <ul>
            {c.tech.map((tch, i) => <li key={i}>{tch}</li>)}
          </ul>

          <p>{c.outro}</p>
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default function BlogTemplate() {
  const { locale } = useRouter();
  const c = content[locale] || content.es;
  return (
    <Layout>
      <SEO title={c.seoTitle} description={c.seoDescription} />
      <AplicacionMovilParaRestaurantes c={c} />
    </Layout>
  );
}

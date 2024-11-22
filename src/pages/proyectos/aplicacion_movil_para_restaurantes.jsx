import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
import banner2 from "../../../public/images/banner2.webp";

const AplicacionMovilParaRestaurantes = ({ posts }) => {
  const images = [banner1, banner2];

  return (
    <div>
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <Banners images={images} />
      </div>

      <main className="container">
        <section className="container">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Descripción del Proyecto
          </h1>
          <p
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Desarrollé una <strong>aplicación móvil para restaurantes</strong>{" "}
            utilizando
            <strong>React Native</strong>, diseñada para mejorar la experiencia
            de los clientes y optimizar la gestión operativa del restaurante. La
            aplicación cuenta con una interfaz intuitiva y moderna, adaptada
            tanto para iOS como para Android, que permite a los usuarios
            explorar menús, realizar pedidos en línea y gestionar reservas con
            facilidad.
          </p>

          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Características Principales
          </h3>
          <ul>
            <li>
              <strong>Exploración de Menús:</strong> Visualización de platos con
              descripciones, imágenes y precios organizados por categorías.
            </li>
            <li>
              <strong>Pedidos en Línea:</strong> Integración para realizar
              pedidos directamente desde la app con opciones de entrega o
              recogida.
            </li>
            <li>
              <strong>Gestión de Reservas:</strong> Sistema de reservas en
              tiempo real con confirmaciones automáticas.
            </li>
            <li>
              <strong>Notificaciones Push:</strong> Alertas para promociones,
              estados de pedidos o recordatorios de reservas.
            </li>
            <li>
              <strong>Integración de Pago:</strong> Pasarela de pago segura para
              transacciones rápidas y confiables.
            </li>
            <li>
              <strong>Panel Administrativo:</strong> Funcionalidad básica para
              que los restaurantes gestionen productos, reservas y pedidos.
            </li>
          </ul>

          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Tecnologías Utilizadas
          </h3>
          <ul>
            <li>
              <strong>Frontend:</strong> React Native, Redux para la gestión de
              estado.
            </li>
            <li>
              <strong>Backend:</strong> Node.js con Express para la API.
            </li>
            <li>
              <strong>Base de Datos:</strong> MongoDB para almacenamiento de
              datos.
            </li>
            <li>
              <strong>Otros:</strong> Firebase para notificaciones push y
              autenticación de usuarios.
            </li>
          </ul>

          <p>
            El proyecto destaca por su enfoque en la <strong>usabilidad</strong>
            , optimización de rendimiento y diseño atractivo, ofreciendo una
            solución completa para modernizar las operaciones en el sector
            gastronómico.
          </p>
        </section>
      </main>
    </div>
  );
};

export default function BlogTemplate() {
  return (
    <Layout>
      <AplicacionMovilParaRestaurantes />
    </Layout>
  );
}

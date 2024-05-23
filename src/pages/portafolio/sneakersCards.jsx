import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
import bannerGlass from "../../../public/images/bannerGlass.jpg";
import glassCard from "../../../public/images/tarjeta.webp";

const SneakersCards = ({ posts }) => {
  const images = [bannerGlass];

  return (
    <div className="">
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-44">
        <h2 className="text-center text-3xl font-bold mb-8">
          {" "}
          Proyecto: Tarjeta Animada con Glasmorfismo:
        </h2>
        <iframe
          className="mx-auto rounded-md mt-8"
          src="https://awesome-lalande-09ef8d.netlify.app/"
          width="1200"
          height="500"
          title="glassmorfism card"
        ></iframe>
        {/*         <Image className="mx-auto rounded-md" src={glassCard} alt="" width={400}/>
         */}
        <div>
          <section>
            <h2 class="text-2xl font-semibold mt-6 mb-4">Descripción</h2>
            <p>
              Este proyecto es una tarjeta animada interactiva, diseñada
              utilizando HTML, CSS y JavaScript, que destaca por su moderno
              estilo de <strong>glasmorfismo</strong>. La tarjeta presenta un
              sneaker cuya apariencia puede ser personalizada por el usuario a
              través de una selección de colores.
            </p>
          </section>
          <section>
            <h2 class="text-2xl font-semibold mt-6 mb-4">Características</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                <strong>Estilo de Glasmorfismo</strong>: La tarjeta cuenta con
                un diseño elegante y futurista que emplea efectos de
                transparencia, desenfoque y sombra, creando una estética de
                vidrio esmerilado.
              </li>
              <li>
                <strong>Interactividad Dinámica</strong>: Utilizando JavaScript,
                la tarjeta permite al usuario cambiar el color del sneaker,
                proporcionando una experiencia de usuario atractiva y
                personalizada.
              </li>
              <li>
                <strong>Animaciones Suaves</strong>: Las transiciones y
                animaciones están cuidadosamente diseñadas para ofrecer una
                experiencia visual fluida y agradable.
              </li>
              <li>
                <strong>Responsividad</strong>: La tarjeta se adapta a
                diferentes tamaños de pantalla, asegurando una visualización
                óptima tanto en dispositivos móviles como en escritorios.
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl font-semibold mt-6 mb-4">
              Tecnologías Utilizadas
            </h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                <strong>HTML5</strong>: Para estructurar el contenido de la
                tarjeta.
              </li>
              <li>
                <strong>CSS3</strong>: Para aplicar el estilo de glasmorfismo y
                las animaciones.
              </li>
              <li>
                <strong>JavaScript</strong>: Para manejar la lógica de cambio de
                color del sneaker y la interactividad de la tarjeta.
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl font-semibold mt-6 mb-4">Funcionalidad</h2>
            <p>
              Al seleccionar un color, el sneaker en la tarjeta cambia
              instantáneamente a la opción elegida, demostrando la capacidad de
              personalización y la interacción en tiempo real. Este proyecto es
              un ejemplo perfecto de cómo combinar diseño moderno y
              funcionalidad interactiva para crear una pieza visualmente
              atractiva y tecnológicamente avanzada.
            </p>
          </section>
          <h2 class="text-2xl font-semibold mt-6 mb-4">Demo:</h2>

          <a  target="_blank"
            className="font-semibold"
            href="          https://awesome-lalande-09ef8d.netlify.app/">Demo en Heroku</a><br/>
          <a
            target="_blank"
            className="font-semibold"
            href="https://github.com/juancamilosalazarrestrepo/Product-Card-Glassmorphism"
          >
            codigo Fuente{" "}
          </a>
        </div>
      </main>
    </div>
  );
};

export default function BlogTemplate() {
  return (
    <Layout>
      <SneakersCards />
    </Layout>
  );
}

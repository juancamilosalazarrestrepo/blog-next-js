import * as React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banners from "../../components/Banners";
import banner1 from "../../../public/images/banneBlog.webp";
import banner2 from "../../../public/images/banner2.webp";

const Calculadora = ({ posts }) => {
  const images = [banner1, banner2];

  return (
    <div className="">
      <div style={{ width: "1wv", margin: "0", zIndex: "-15" }}>
        <Banners images={images} />
      </div>

      <main className="py-8 container mx-auto px-44">
        <p>
          calculadora desarrollada con React Native, una plataforma de
          desarrollo de aplicaciones móviles multiplataforma. La calculadora
          cuenta con un diseño moderno y atractivo que incluye un modo oscuro,
          lo que permite a los usuarios alternar entre la apariencia clara y
          oscura según sus preferencias y necesidades. La aplicación es fácil de
          usar e intuitiva, con botones grandes y claros para realizar
          operaciones matemáticas básicas, como sumar, restar, multiplicar y
          dividir. Además, cuenta con otras funciones útiles, como borrar el
          último número ingresado y borrar toda la pantalla, lo que facilita el
          uso y mejora la experiencia del usuario. El proyecto muestra
          habilidades en el desarrollo de aplicaciones móviles utilizando React
          Native, un conocimiento fundamental en la construcción de aplicaciones
          modernas para dispositivos móviles. La inclusión de un modo oscuro
          muestra atención al detalle y la capacidad de implementar diseños
          atractivos e intuitivos para mejorar la experiencia del usuario. En
          resumen, el proyecto es una muestra de habilidades y experiencia en el
          desarrollo de aplicaciones móviles con React Native.
        </p>
      </main>

     
    </div>
  );
};

export default function BlogTemplate() {
  return (
    <Layout>
      <Calculadora />
    </Layout>
  );
}

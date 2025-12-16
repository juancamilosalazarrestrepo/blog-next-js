import calculatorDark from "../../public/images/calculadoradark.webp";
import cloneChatgpt from "../../public/images/cloneChatGPT.webp";
import mercadoLiebre from "../../public/images/mercadoliebre.webp";
import tarjeta from "../../public/images/tarjeta.webp";
import parallaxLanding from "../../public/images/parallax.webp";
import littleLemonApp from "../../public/images/littleLemonApp.png";
import realEstateApp from "../../public/images/realEstateApp.webp";
import niceGradientApp from "../../public/images/nice-gradient-mockup.webp";


const proyectos = [
  {
    titulo: "Nice Gradient - Gradientes con IA",
    imagen: niceGradientApp, 
    description:
      "Generador de gradientes impulsado por IA con Next.js 14. Colección curada de gradientes, editor visual y exportación CSS/PNG.",
    url: "/proyectos/nice_gradient",
  },
  {
    titulo: "Sistema de Gestión Inmobiliaria",
    imagen: realEstateApp, 
    description:
      "Plataforma inmobiliaria: gestiona propiedades, precios y usuarios con backend .NET (Clean Architecture) y frontend Next.js moderno.",
    url: "/proyectos/sistema_gestion_inmobiliaria",
  },
  {
    titulo: "Aplicación Movil para Restaurante",
    imagen: littleLemonApp,
    description:
      "Aplicación Movil Para Restaurantes , realizada con React Native , esta aplicaicion permite subscribirse a un newsletter. ",
    url: "/proyectos/aplicacion_movil_para_restaurantes",
  },
  {
    titulo: "E-commerce Clon de Mercadolibre",
    imagen: mercadoLiebre,
    description:
      "Clon de Mercado libre creado con javascript , que permite interactuar , con secciones para  ver productos , ver categorias. ",
    url: "/portafolio/calculadora",
  },
  {
    titulo: "Tarjeta Animada con estilo Glasmorfismo",
    imagen: tarjeta,
    description:
      "Tarjeta interactiva hecha con css para venta de zapatos, cambia de color dependiendo el zapato que elijan.",
    url: "/portafolio/sneakersCards",
  },
  {
    titulo: "Landing page con efecto parallax",
    imagen: parallaxLanding,
    description:
      "Landing page diseñada con un efecto moderno de parallax que se forma con unas ilustraciones de un barrancon en un desierto en la noche.",
    url: "/portafolio/calculadora",
  },
  {
    titulo: "Calculadora en React Native",
    imagen: calculatorDark,
    description:
      "Calculadora desarrollada en React Native, con un diseño moderno y un modo oscuro para mejorar la experiencia del usuario al realizar operaciones matemáticas básicas.",
    url: "/portafolio/calculadora",
  },
  {
    titulo: "Clon de ChatGpt con Next.js",
    imagen: cloneChatgpt,
    description:
      "Clon de ChatGPT creado con Next.js y Tailwind CSS, que permite interactuar con un chatbot generador de respuestas a través de la API de GPT-3 de OpenAI",
    url: "/portafolio/clonechatgpt",
  },

];

export default proyectos;

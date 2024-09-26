import calculatorDark from "../../public/images/calculadoradark.webp";
import cloneChatgpt from "../../public/images/cloneChatGPT.webp";
import mercadoLiebre from "../../public/images/mercadoliebre.webp";
import tarjeta from "../../public/images/tarjeta.webp";
import parallaxLanding from "../../public/images/parallax.webp";

const proyectos = [
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

import styles from "../styles/UIComponentsLibrary.module.css";
import Image from "next/image";
import Link from "next/link";
/*  */
// Imágenes placeholder de los assets existentes — reemplazalas por screenshots reales
import img1 from "../../public/images/tarjetavideo.webp";
import imgLava from "../../public/images/lava_lamp.webp";
import imgParticle from "../../public/images/background.webp";
/* import img2 from "../../public/images/niceGradient.webp";
import img3 from "../../public/images/parallax.webp";
import img4 from "../../public/images/calculadoradark.webp";
import img5 from "../../public/images/cloneChatGPT.webp";
import img6 from "../../public/images/423shots_so.webp";
import img7 from "../../public/images/nice-gradient-mockup2.webp";
import img8 from "../../public/images/jsframeworks.webp"; */

const uiComponents = [
    {
        id: "particle-constellation",
        title: "Particle Constellation",
        description:
            "Partículas flotantes conectadas con líneas degradadas. Reaccionan al cursor con repulsión suave, pulso individual y glow radial. Canvas 2D puro.",
        category: "Fondos",
        image: imgParticle,
        href: "/particleConstellationPage",
        available: true,
    },
    {
        id: "lava-banner",
        title: "Lava Lamp Banner",
        description:
            "Banner hero con fondo animado de lámpara de lava azul. Blobs orgánicos con filtro SVG goo y blob interactivo que sigue el cursor.",
        category: "Banners",
        image: imgLava,
        href: "/lavaBannerElementPage",
        available: true,
    },
    {
        id: "video-card",
        title: "Video Card Component",
        description:
            "Tarjeta con video de fondo, avatar circular y estadísticas de perfil con efecto glassmorphism.",
        category: "Cards",
        image: img1,
        href: "/videoCardElementPage",
        available: true,
    },
    {
        id: "bubble-field",
        title: "Bubble Field",
        description:
            "Burbujas semitransparentes con gradiente esférico que ascienden en trayectoria sinusoidal. El cursor las hace explotar con animación de pop.",
        category: "Fondos",
        image: imgParticle,
        href: "/bubbleFieldPage",
        available: true,
    },
    {
        id: "aurora-borealis",
        title: "Aurora Borealis",
        description:
            "Aurora boreal animada con 6 bandas sinusoidales en blend mode screen sobre cielo estrellado. Movimiento orgánico fluido.",
        category: "Fondos",
        image: imgParticle,
        href: "/auroraPage",
        available: true,
    },
    {
        id: "ink-drop",
        title: "Ink Drop",
        description:
            "Manchas de tinta que se expanden al mover el cursor sobre fondo papel crema. Blend mode multiply para mezcla realista de pigmentos.",
        category: "Fondos",
        image: imgParticle,
        href: "/inkDropPage",
        available: true,
    },
    {
        id: "electric-plasma",
        title: "Electric Plasma",
        description:
            "Rayos eléctricos generados por desplazamiento de punto medio recursivo con ramificaciones. El cursor atrae las descargas.",
        category: "Fondos",
        image: imgParticle,
        href: "/electricPlasmaPage",
        available: true,
    },
    {
        id: "fireflies",
        title: "Fireflies",
        description:
            "90 luciérnagas con movimiento orgánico, trail luminoso y pulso individual. El cursor las dispersa al acercarse a menos de 90px.",
        category: "Fondos",
        image: imgParticle,
        href: "/firefliesPage",
        available: true,
    }/* ,
    {
        id: "glassmorphism-button",
        title: "Glassmorphism Button",
        description:
            "Botón con efecto de cristal translúcido, bordes difuminados y animación de brillo al hover.",
        category: "Botones",
        image: img2,
        href: "#",
        available: false,
    },
    {
        id: "animated-navbar",
        title: "Animated Navbar",
        description:
            "Barra de navegación con transiciones suaves, indicador activo animado y menú hamburguesa.",
        category: "Navegación",
        image: img3,
        href: "#",
        available: false,
    },
    {
        id: "pricing-table",
        title: "Pricing Table",
        description:
            "Tabla de precios con tres planes, destacado central, toggle mensual/anual y micro-animaciones.",
        category: "Tablas",
        image: img4,
        href: "#",
        available: false,
    },
    {
        id: "testimonial-carousel",
        title: "Testimonial Carousel",
        description:
            "Carrusel de testimonios con autoplay, controles de navegación y transición fade elegante.",
        category: "Carruseles",
        image: img5,
        href: "#",
        available: false,
    },
    {
        id: "dark-mode-toggle",
        title: "Dark Mode Toggle",
        description:
            "Switch de modo oscuro con animación sol/luna y transición suave de colores en toda la UI.",
        category: "Utilidades",
        image: img6,
        href: "#",
        available: false,
    },
    {
        id: "gradient-card",
        title: "Gradient Card",
        description:
            "Tarjeta con borde degradado dinámico que sigue el cursor y efecto parallax sutil.",
        category: "Cards",
        image: img7,
        href: "#",
        available: false,
    },
    {
        id: "notification-toast",
        title: "Notification Toast",
        description:
            "Notificaciones tipo toast con animación slide-in, variantes de estado y auto-dismiss.",
        category: "Feedback",
        image: img8,
        href: "#",
        available: false,
    }, */
];

const UIComponentsLibrary = () => {
    return (
        <div>
            {/* Hero */}
            <div className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Biblioteca de Componentes UI</h1>
                <p className={styles.heroSubtitle}>
                    Explora mi colección de componentes de interfaz reutilizables,
                    construidos con HTML, CSS y React.
                </p>
            </div>

            {/* Grid de componentes */}
            <div className={styles.gridContainer}>
                {uiComponents.map((comp) => (
                    <div
                        key={comp.id}
                        className={`${styles.card} ${!comp.available ? styles.cardDisabled : ""}`}
                    >
                        {/* Imagen */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={comp.image}
                                alt={comp.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                style={{ objectFit: "cover" }}
                            />
                            <span className={styles.categoryBadge}>{comp.category}</span>
                            {!comp.available && (
                                <span className={styles.comingSoonTag}>Próximamente</span>
                            )}
                            <div className={styles.imageOverlay} />
                        </div>

                        {/* Contenido */}
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{comp.title}</h3>
                            <p className={styles.cardDescription}>{comp.description}</p>

                            {comp.available ? (
                                <Link href={comp.href} className={styles.cardButton}>
                                    Ver componente
                                    <span className={styles.cardButtonArrow}>→</span>
                                </Link>
                            ) : (
                                <span className={styles.cardButton}>
                                    Próximamente
                                    <span className={styles.cardButtonArrow}>🔒</span>
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UIComponentsLibrary;

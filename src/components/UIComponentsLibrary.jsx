import styles from "../styles/UIComponentsLibrary.module.css";
import Image from "next/image";
import Link from "next/link";

// Capturas reales de cada componente (public/images/components/<id>.webp).
const shot = (id) => `/images/components/${id}.webp`;

const uiComponents = [
    {
        id: "particle-constellation",
        title: "Particle Constellation",
        description:
            "Partículas flotantes conectadas con líneas degradadas. Reaccionan al cursor con repulsión suave, pulso individual y glow radial. Canvas 2D puro.",
        category: "Fondos",
        image: shot("particle-constellation"),
        href: "/particleConstellationPage",
        available: true,
    },
    {
        id: "lava-banner",
        title: "Lava Lamp Banner",
        description:
            "Banner hero con fondo animado de lámpara de lava azul. Blobs orgánicos con filtro SVG goo y blob interactivo que sigue el cursor.",
        category: "Banners",
        image: shot("lava-banner"),
        href: "/lavaBannerElementPage",
        available: true,
    },
    {
        id: "video-card",
        title: "Video Card Component",
        description:
            "Tarjeta con video de fondo, avatar circular y estadísticas de perfil con efecto glassmorphism.",
        category: "Cards",
        image: shot("video-card"),
        href: "/videoCardElementPage",
        available: true,
    },
    {
        id: "bubble-field",
        title: "Bubble Field",
        description:
            "Burbujas semitransparentes con gradiente esférico que ascienden en trayectoria sinusoidal. El cursor las hace explotar con animación de pop.",
        category: "Fondos",
        image: shot("bubble-field"),
        href: "/bubbleFieldPage",
        available: true,
    },
    {
        id: "aurora-borealis",
        title: "Aurora Borealis",
        description:
            "Aurora boreal animada con 6 bandas sinusoidales en blend mode screen sobre cielo estrellado. Movimiento orgánico fluido.",
        category: "Fondos",
        image: shot("aurora-borealis"),
        href: "/auroraPage",
        available: true,
    },
    {
        id: "ink-drop",
        title: "Ink Drop",
        description:
            "Manchas de tinta que se expanden al mover el cursor sobre fondo papel crema. Blend mode multiply para mezcla realista de pigmentos.",
        category: "Fondos",
        image: shot("ink-drop"),
        href: "/inkDropPage",
        available: true,
    },
    {
        id: "electric-plasma",
        title: "Electric Plasma",
        description:
            "Rayos eléctricos generados por desplazamiento de punto medio recursivo con ramificaciones. El cursor atrae las descargas.",
        category: "Fondos",
        image: shot("electric-plasma"),
        href: "/electricPlasmaPage",
        available: true,
    },
    {
        id: "fireflies",
        title: "Fireflies",
        description:
            "90 luciérnagas con movimiento orgánico, trail luminoso y pulso individual. El cursor las dispersa al acercarse a menos de 90px.",
        category: "Fondos",
        image: shot("fireflies"),
        href: "/firefliesPage",
        available: true,
    },
    {
        id: "liquid-orb",
        title: "Liquid Orb",
        description:
            "Esfera líquida iridiscente en Three.js. Ruido simplex 3D en el vertex shader deforma la superficie y el cursor la agita.",
        category: "3D · WebGL",
        image: shot("liquid-orb"),
        href: "/liquidOrbPage",
        available: true,
    },
    {
        id: "particle-galaxy",
        title: "Particle Galaxy",
        description:
            "Galaxia espiral de ~50.000 partículas animada en GPU, con brazos que respiran. La cámara orbita siguiendo al cursor.",
        category: "3D · WebGL",
        image: shot("particle-galaxy"),
        href: "/particleGalaxyPage",
        available: true,
    },
    {
        id: "synthwave-terrain",
        title: "Synthwave Terrain",
        description:
            "Paisaje retro infinito: terreno de grilla neón, sol a franjas y niebla al horizonte. Mantén pulsado para acelerar.",
        category: "3D · WebGL",
        image: shot("synthwave-terrain"),
        href: "/synthwaveTerrainPage",
        available: true,
    },
    {
        id: "warp-tunnel",
        title: "Warp Tunnel",
        description:
            "Salto al hiperespacio con miles de estelas instanciadas en un solo draw call. Pulsa para la velocidad warp.",
        category: "3D · WebGL",
        image: shot("warp-tunnel"),
        href: "/warpTunnelPage",
        available: true,
    },
    {
        id: "particle-morph",
        title: "Particle Morph",
        description:
            "16.000 partículas que se transforman entre esfera, nudo toroidal, ADN y planeta. El cursor las aparta a su paso.",
        category: "3D · WebGL",
        image: shot("particle-morph"),
        href: "/particleMorphPage",
        available: true,
    },
    {
        id: "silk-waves",
        title: "Silk Waves",
        description:
            "Tela satinada pastel que ondula con olas y ruido, con brillo especular tipo seda. Versión clara para landings luminosas.",
        category: "3D · WebGL",
        image: shot("silk-waves"),
        href: "/silkWavesPage",
        available: true,
    },
    {
        id: "holo-globe",
        title: "Holo Globe",
        description:
            "Globo holográfico de puntos con continentes procedurales, atmósfera fresnel y arcos de datos que viajan entre ciudades.",
        category: "3D · WebGL",
        image: shot("holo-globe"),
        href: "/holoGlobePage",
        available: true,
    },
    {
        id: "dot-wave-field",
        title: "Dot Wave Field",
        description:
            "Océano de 26.000 puntos que ondula en perspectiva. El cursor levanta una colina y cada clic lanza una onda expansiva.",
        category: "3D · WebGL",
        image: shot("dot-wave-field"),
        href: "/dotWaveFieldPage",
        available: true,
    },
    {
        id: "flow-ribbons",
        title: "Flow Ribbons",
        description:
            "Cintas 3D que fluyen y se retuercen con degradado atardecer, brillo especular y fresnel. El cursor las atrae.",
        category: "3D · WebGL",
        image: shot("flow-ribbons"),
        href: "/flowRibbonsPage",
        available: true,
    },
    {
        id: "liquid-metal",
        title: "Liquid Metal",
        description:
            "Gotas de cromo iridiscente que se fusionan, renderizadas con raymarching de SDFs. Una gota sigue al cursor.",
        category: "3D · WebGL",
        image: shot("liquid-metal"),
        href: "/liquidMetalPage",
        available: true,
    },
    /* {
        id: "glassmorphism-button",
        title: "Glassmorphism Button",
        description:
            "Botón con efecto de cristal translúcido, bordes difuminados y animación de brillo al hover.",
        category: "Botones",
        image: shot("glassmorphism-button"),
        href: "#",
        available: false,
    },
    {
        id: "animated-navbar",
        title: "Animated Navbar",
        description:
            "Barra de navegación con transiciones suaves, indicador activo animado y menú hamburguesa.",
        category: "Navegación",
        image: shot("animated-navbar"),
        href: "#",
        available: false,
    },
    {
        id: "pricing-table",
        title: "Pricing Table",
        description:
            "Tabla de precios con tres planes, destacado central, toggle mensual/anual y micro-animaciones.",
        category: "Tablas",
        image: shot("pricing-table"),
        href: "#",
        available: false,
    },
    {
        id: "testimonial-carousel",
        title: "Testimonial Carousel",
        description:
            "Carrusel de testimonios con autoplay, controles de navegación y transición fade elegante.",
        category: "Carruseles",
        image: shot("testimonial-carousel"),
        href: "#",
        available: false,
    },
    {
        id: "dark-mode-toggle",
        title: "Dark Mode Toggle",
        description:
            "Switch de modo oscuro con animación sol/luna y transición suave de colores en toda la UI.",
        category: "Utilidades",
        image: shot("dark-mode-toggle"),
        href: "#",
        available: false,
    },
    {
        id: "gradient-card",
        title: "Gradient Card",
        description:
            "Tarjeta con borde degradado dinámico que sigue el cursor y efecto parallax sutil.",
        category: "Cards",
        image: shot("gradient-card"),
        href: "#",
        available: false,
    },
    {
        id: "notification-toast",
        title: "Notification Toast",
        description:
            "Notificaciones tipo toast con animación slide-in, variantes de estado y auto-dismiss.",
        category: "Feedback",
        image: shot("notification-toast"),
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

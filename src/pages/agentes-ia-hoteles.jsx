import { useState } from "react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import HotelAgentDemo from "../components/HotelAgentDemo";
import { SITE_URL } from "../../lib/site";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale || "es", ["common"])),
        },
    };
}

const PHONE = "573042093951";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hola, tengo un hotel y quiero saber más sobre los agentes de IA para reservas."
)}`;

const PAGE_URL = `${SITE_URL}/agentes-ia-hoteles`;
const OG_IMAGE = "/assets/ai/og-agentes-ia-hoteles.jpg";
// Sin sufijo de marca: con él el título pasaba de 60 caracteres y Google cortaba la keyword.
const SEO_TITLE = "Agentes de IA para Hoteles: Reservas 24/7 por WhatsApp";
const SEO_DESCRIPTION =
    "Chatbot con IA para hoteles que atiende huéspedes 24/7, consulta tu PMS y cierra reservas por WhatsApp. Más reservas directas, menos comisiones. Demo gratis.";

// Cifras de referencia del sector hotelero, no resultados propios.
const PAIN_POINTS = [
    {
        stat: "46%",
        label: "de las consultas llegan fuera de horario",
        detail:
            "Entre las 6 p. m. y las 9 a. m. no hay quien responda. El huésped no espera: reserva en otro lado.",
    },
    {
        stat: "5 min",
        label: "es la ventana para responder",
        detail:
            "Pasados los primeros minutos, la probabilidad de cerrar la reserva cae en picada.",
    },
    {
        stat: "15–25%",
        label: "se va en comisiones de OTAs",
        detail:
            "Cada reserva que no entra por canal directo le regala margen a Booking o Expedia.",
    },
    {
        stat: "70%",
        label: "de las preguntas se repiten",
        detail:
            "Horarios, wifi, parqueadero, mascotas, cómo llegar. Tu recepción contesta lo mismo todo el día.",
    },
];

const COMPARISON = [
    {
        topic: "Disponibilidad",
        bot: "Responde con un texto fijo y te pide llamar al hotel",
        agent: "Consulta el PMS en vivo y dice qué habitaciones quedan",
    },
    {
        topic: "Reservas",
        bot: "Envía un enlace y espera que el huésped se apañe",
        agent: "Crea la reserva, la bloquea y devuelve el código de confirmación",
    },
    {
        topic: "Preguntas fuera del guion",
        bot: "«No entendí tu pregunta, intenta de nuevo»",
        agent: "Razona con las políticas reales del hotel y responde",
    },
    {
        topic: "Upselling",
        bot: "No existe",
        agent: "Ofrece late check-out, upgrade o traslado en el momento justo",
    },
    {
        topic: "Cuando se complica",
        bot: "Deja al huésped en un callejón sin salida",
        agent: "Escala a recepción con el contexto completo de la conversación",
    },
];

const CAPABILITIES = [
    {
        icon: "🗓️",
        title: "Reservas y disponibilidad",
        text: "Consulta tu calendario en tiempo real, propone habitaciones con tarifa y cierra la reserva dentro del chat.",
    },
    {
        icon: "🔑",
        title: "Check-in y check-out",
        text: "Recoge datos, envía instrucciones de llegada y gestiona salidas tardías sin pasar por recepción.",
    },
    {
        icon: "📈",
        title: "Upselling automático",
        text: "Detecta el momento para ofrecer upgrade, desayuno o traslado, y sube el ticket medio sin sonar a venta.",
    },
    {
        icon: "🌍",
        title: "Multiidioma nativo",
        text: "Atiende en español, inglés, portugués o el idioma en que le escriban, con el mismo tono de tu marca.",
    },
    {
        icon: "📍",
        title: "Conserjería local",
        text: "Recomienda restaurantes, planes y transporte de la zona con la información que tú le cargues.",
    },
    {
        icon: "🙋",
        title: "Escalado a humano",
        text: "Cuando el caso lo amerita, pasa la conversación a tu equipo con todo el historial resumido.",
    },
];

const CHANNELS = [
    "WhatsApp Business",
    "Tu sitio web",
    "Instagram DM",
    "Facebook Messenger",
    "Correo electrónico",
    "PMS y channel manager",
];

const STEPS = [
    {
        n: "01",
        title: "Diagnóstico",
        text: "Revisamos tus canales, tus tarifas y las preguntas que más recibes. Salimos con el alcance exacto del agente.",
    },
    {
        n: "02",
        title: "Conexión",
        text: "Integramos el agente con tu PMS o channel manager y con los canales donde te escriben tus huéspedes.",
    },
    {
        n: "03",
        title: "Entrenamiento",
        text: "Cargamos tus políticas, tarifas, servicios y tono de marca. El agente responde como lo haría tu mejor recepcionista.",
    },
    {
        n: "04",
        title: "En marcha",
        text: "Sale a producción en dos semanas. Monitoreamos las conversaciones y ajustamos con datos reales.",
    },
];

const PLANS = [
    {
        name: "Recepción IA",
        tagline: "Para dejar de repetir lo mismo",
        setup: "USD 900",
        monthly: "USD 149",
        priceMonthly: 149,
        featured: false,
        features: [
            "Respuestas 24/7 a preguntas frecuentes",
            "Información del hotel y conserjería local",
            "Un canal a elección (WhatsApp o web)",
            "Multiidioma",
            "Escalado a tu equipo",
        ],
    },
    {
        name: "Reservas IA",
        tagline: "El agente que sí cierra reservas",
        setup: "USD 1.900",
        monthly: "USD 299",
        priceMonthly: 299,
        featured: true,
        features: [
            "Todo lo de Recepción IA",
            "Disponibilidad en vivo conectada a tu PMS",
            "Creación de reservas y link de pago",
            "Dos canales simultáneos",
            "Upselling automático",
            "Panel de conversaciones",
        ],
    },
    {
        name: "Suite Hotel",
        tagline: "Para grupos y multi-propiedad",
        setup: "a medida",
        monthly: "desde USD 590",
        priceMonthly: 590,
        priceFrom: true,
        featured: false,
        features: [
            "Todo lo de Reservas IA",
            "Varias propiedades en un solo agente",
            "Todos los canales conectados",
            "Analítica de conversión e ingresos",
            "Integraciones a medida",
            "Soporte prioritario",
        ],
    },
];

const FAQS = [
    {
        q: "¿Qué es un agente de IA para hoteles?",
        a: "Es un asistente autónomo que atiende a tus huéspedes por WhatsApp, web o Instagram. A diferencia de un chatbot tradicional, no se limita a responder con un guion: consulta la disponibilidad en tu PMS, propone habitaciones con tarifa, crea la reserva y envía la confirmación sin que intervenga nadie de tu equipo.",
    },
    {
        q: "¿Cuánto cuesta un chatbot con IA para un hotel?",
        a: "Depende de lo que tenga que hacer. Un agente que responde preguntas frecuentes arranca en USD 149 al mes más USD 900 de implementación; uno que consulta disponibilidad y cierra reservas conectado a tu PMS cuesta USD 299 al mes más USD 1.900. No cobramos comisión por reserva.",
    },
    {
        q: "¿Qué pasa si el agente se equivoca con una tarifa o una reserva?",
        a: "El agente no inventa precios: los lee de tu PMS. Además definimos límites duros — descuentos máximos, tipos de habitación que puede vender, casos que debe escalar sí o sí. Si algo se sale de ese marco, pasa la conversación a tu equipo en vez de improvisar.",
    },
    {
        q: "¿Esto reemplaza a mi recepción?",
        a: "No, le quita el trabajo repetitivo. El agente absorbe las consultas de siempre y las reservas de madrugada; tu equipo se queda con el huésped que ya está en el hotel y con los casos que necesitan criterio humano.",
    },
    {
        q: "¿Se conecta con el PMS que ya uso?",
        a: "En el diagnóstico revisamos tu PMS o channel manager. Si expone API, lo conectamos directo. Si no, trabajamos sobre el channel manager o con una sincronización intermedia. Te lo confirmamos antes de que contrates nada.",
    },
    {
        q: "¿Qué pasa con los datos de mis huéspedes?",
        a: "Los datos siguen siendo tuyos. Se procesa solo lo necesario para atender la consulta, las conversaciones quedan en tu panel y firmamos el acuerdo de tratamiento de datos que necesites para cumplir con la normativa local.",
    },
    {
        q: "¿En cuántos idiomas atiende?",
        a: "Detecta el idioma del huésped y responde en el mismo. Español, inglés y portugués vienen afinados de fábrica; cualquier otro se puede ajustar con tu contenido.",
    },
    {
        q: "¿Tengo que firmar permanencia?",
        a: "No. La implementación se paga una vez y la mensualidad va mes a mes. Si decides parar, exportamos tus conversaciones y cancelas sin penalización.",
    },
];

const ROOM_RANGES = [
    "Menos de 20",
    "20 a 50",
    "51 a 100",
    "101 a 300",
    "Más de 300",
];

export default function AgentesIAHoteles() {
    const [formData, setFormData] = useState({
        hotel: "",
        name: "",
        email: "",
        whatsapp: "",
        rooms: "",
        pms: "",
        challenge: "",
    });
    const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!formData.hotel.trim() || !formData.name.trim() || !formData.email.trim()) {
            setErrorMessage("Completa el nombre del hotel, tu nombre y tu correo.");
            setFormStatus("error");
            return;
        }

        setFormStatus("loading");

        try {
            const res = await fetch("/api/hoteles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormStatus("success");
                setFormData({
                    hotel: "",
                    name: "",
                    email: "",
                    whatsapp: "",
                    rooms: "",
                    pms: "",
                    challenge: "",
                });
            } else {
                const data = await res.json();
                setErrorMessage(data.error || "Hubo un error al enviar. Intenta de nuevo.");
                setFormStatus("error");
            }
        } catch {
            setErrorMessage("Error de conexión. Verifica tu internet e intenta de nuevo.");
            setFormStatus("error");
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${PAGE_URL}#webpage`,
                url: PAGE_URL,
                name: SEO_TITLE,
                description: SEO_DESCRIPTION,
                inLanguage: "es-ES",
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}${OG_IMAGE}`,
                    width: 1200,
                    height: 630,
                },
                breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
                about: { "@id": `${PAGE_URL}#service` },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${PAGE_URL}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Agentes de IA", item: `${SITE_URL}/agentes-ai` },
                    { "@type": "ListItem", position: 3, name: "Agentes de IA para hoteles", item: PAGE_URL },
                ],
            },
            {
                "@type": "Service",
                "@id": `${PAGE_URL}#service`,
                url: PAGE_URL,
                name: "Agentes de IA para hoteles",
                serviceType: "Automatización de atención al huésped y reservas con IA",
                description:
                    "Agentes autónomos de IA que atienden a los huéspedes 24/7, consultan disponibilidad en el PMS y cierran reservas por WhatsApp y web.",
                provider: {
                    "@type": "Organization",
                    name: "Salazar Code",
                    url: SITE_URL,
                },
                areaServed: "Latinoamérica y España",
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Planes de agentes de IA para hoteles",
                    itemListElement: PLANS.map((plan) => ({
                        "@type": "Offer",
                        name: plan.name,
                        description: plan.tagline,
                        url: `${PAGE_URL}#precios`,
                        priceSpecification: {
                            "@type": "UnitPriceSpecification",
                            priceCurrency: "USD",
                            unitCode: "MON",
                            ...(plan.priceFrom
                                ? { minPrice: plan.priceMonthly }
                                : { price: plan.priceMonthly }),
                        },
                    })),
                },
                audience: {
                    "@type": "BusinessAudience",
                    name: "Hoteles, hostales y alojamientos turísticos",
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
        ],
    };

    const inputClass =
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500";
    const labelClass =
        "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300";

    return (
        <Layout>
            <SEO
                title={SEO_TITLE}
                appendSiteName={false}
                description={SEO_DESCRIPTION}
                languages={["es"]}
                image={OG_IMAGE}
                imageAlt="Agente de IA para hoteles confirmando una reserva por WhatsApp"
                keywords={[
                    "agentes de ia para hoteles",
                    "chatbot para hoteles",
                    "reservas automáticas con ia",
                    "atención al huésped 24/7",
                    "automatización hotelera",
                    "whatsapp para hoteles",
                    "ia para reservas de hotel",
                    "recepcionista virtual",
                ]}
                schema={schema}
            />
            <div className="bg-[#f6f8fa] font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0a1017] dark:text-slate-100">
                {/* WhatsApp flotante */}
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir por WhatsApp"
                    className="group fixed bottom-8 right-8 z-[100] rounded-full bg-[#25D366] p-4 text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
                >
                    <svg
                        className="h-8 w-8 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>

                {/* ===== Hero ===== */}
                <section className="relative overflow-hidden bg-[#071019] px-6 py-20 lg:px-20 lg:py-28">
                    {/* Fondo decorativo */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 15% 20%, rgba(13,148,136,0.35), transparent 45%), radial-gradient(circle at 85% 15%, rgba(2,132,199,0.30), transparent 50%), radial-gradient(circle at 60% 95%, rgba(14,165,233,0.18), transparent 55%)",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />

                    <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
                        <div className="flex flex-col gap-8">
                            {/* La etiqueta va dentro del H1 para que la keyword abra el encabezado principal. */}
                            <h1 className="flex flex-col gap-8">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300">
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                                    Agentes de IA para hoteles
                                </span>
                                <span className="block text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                                    Tu recepción duerme.
                                    <br />
                                    <span className="bg-gradient-to-r from-teal-300 to-sky-400 bg-clip-text text-transparent">
                                        Tu agente de IA no.
                                    </span>
                                </span>
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                                Un agente autónomo que atiende a los huéspedes de tu hotel por
                                WhatsApp en segundos, consulta la disponibilidad real en tu PMS
                                y cierra la reserva solo — a las tres de la mañana, en inglés y
                                sin pagarle comisión a nadie.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#demo-gratis"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-500 px-8 py-4 text-lg font-bold text-slate-950 shadow-[0_10px_40px_rgba(13,148,136,0.4)] transition-all hover:scale-105"
                                >
                                    Pedir una demo gratis
                                </a>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
                                >
                                    Hablar por WhatsApp
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-2 text-sm font-medium text-slate-400">
                                <span className="flex items-center gap-2">
                                    <span className="text-teal-400">✓</span> En marcha en 2 semanas
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-teal-400">✓</span> Sin permanencia
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-teal-400">✓</span> Se conecta a tu PMS
                                </span>
                            </div>
                        </div>

                        {/* El demo aparece una sola vez en toda la página */}
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute -inset-5 rounded-[2.5rem] bg-teal-400/10 blur-3xl"
                            />
                            <HotelAgentDemo className="relative" />
                        </div>
                    </div>
                </section>

                {/* ===== Dolor ===== */}
                <section className="px-6 py-24 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 max-w-3xl">
                            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                                Cada consulta sin responder es una reserva que se va
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                No es un problema de actitud de tu equipo. Es que nadie puede
                                atender un chat a las 2 a. m. mientras hace el check-in de la
                                habitación 304.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {PAIN_POINTS.map((p) => (
                                <div
                                    key={p.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    <p className="bg-gradient-to-br from-teal-500 to-sky-600 bg-clip-text text-4xl font-black text-transparent">
                                        {p.stat}
                                    </p>
                                    <p className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                                        {p.label}
                                    </p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                        {p.detail}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-xs text-slate-500 dark:text-slate-500">
                            Cifras de referencia del sector hotelero y de estudios de tiempo de
                            respuesta comercial. El impacto real depende de cada propiedad.
                        </p>
                    </div>
                </section>

                {/* ===== Chatbot vs agente ===== */}
                <section className="bg-white px-6 py-24 lg:px-20 dark:bg-slate-900/40">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-black sm:text-4xl">
                                Esto no es otro chatbot para hoteles
                            </h2>
                            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-400 to-sky-500" />
                            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                                La diferencia que acabas de ver arriba: un chatbot contesta con
                                un guion, un agente consulta sistemas y{" "}
                                <strong className="text-slate-900 dark:text-white">
                                    ejecuta acciones
                                </strong>
                                .
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                                <thead>
                                    <tr>
                                        <th className="bg-slate-50 px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                            Situación
                                        </th>
                                        <th className="bg-slate-50 px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                            Chatbot tradicional
                                        </th>
                                        <th className="bg-gradient-to-r from-teal-500 to-sky-600 px-6 py-5 text-left text-sm font-bold uppercase tracking-wider text-white">
                                            Agente autónomo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map((row, i) => (
                                        <tr
                                            key={row.topic}
                                            className={
                                                i % 2
                                                    ? "bg-slate-50/60 dark:bg-slate-900/30"
                                                    : "bg-white dark:bg-transparent"
                                            }
                                        >
                                            <td className="border-t border-slate-200 px-6 py-5 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
                                                {row.topic}
                                            </td>
                                            <td className="border-t border-slate-200 px-6 py-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                                <span className="mr-2 text-red-400">✕</span>
                                                {row.bot}
                                            </td>
                                            <td className="border-t border-slate-200 bg-teal-50/50 px-6 py-5 text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-teal-500/5 dark:text-slate-200">
                                                <span className="mr-2 text-teal-500">✓</span>
                                                {row.agent}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ===== Capacidades ===== */}
                <section className="px-6 py-24 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-black sm:text-4xl">
                                Qué hace un agente de IA en tu hotel
                            </h2>
                            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-400 to-sky-500" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {CAPABILITIES.map((c) => (
                                <div
                                    key={c.title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-teal-400/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/15 to-sky-500/15 text-2xl">
                                        {c.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{c.title}</h3>
                                    <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                        {c.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== Integraciones ===== */}
                <section className="bg-white px-6 py-20 lg:px-20 dark:bg-slate-900/40">
                    <div className="mx-auto max-w-5xl text-center">
                        <h2 className="text-2xl font-black sm:text-3xl">
                            Atiende por WhatsApp, web e Instagram
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                            El agente es uno solo y mantiene el contexto sin importar por dónde
                            llegue la conversación.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            {CHANNELS.map((ch) => (
                                <span
                                    key={ch}
                                    className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-400/60 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:text-teal-400"
                                >
                                    {ch}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== Cómo funciona ===== */}
                <section className="px-6 py-24 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-black sm:text-4xl">
                                De la primera llamada a producción en 2 semanas
                            </h2>
                            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-400 to-sky-500" />
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((s) => (
                                <div key={s.n} className="relative">
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 text-xl font-black text-white shadow-lg">
                                        {s.n}
                                    </div>
                                    <h3 className="text-xl font-bold">{s.title}</h3>
                                    <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                        {s.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-14 text-center text-slate-600 dark:text-slate-400">
                            ¿Aún no sabes qué automatizar primero? Empieza con una{" "}
                            <Link
                                href="/consultoria-ia"
                                className="font-semibold text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
                            >
                                consultoría y diagnóstico de IA
                            </Link>
                            . ¿Tu negocio no es un hotel? Mira nuestros{" "}
                            <Link
                                href="/agentes-ai"
                                className="font-semibold text-teal-600 underline-offset-4 hover:underline dark:text-teal-400"
                            >
                                agentes de IA para empresas
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                {/* ===== Precios ===== */}
                <section
                    id="precios"
                    className="bg-white px-6 py-24 lg:px-20 dark:bg-slate-900/40"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-black sm:text-4xl">
                                Precios de los agentes de IA para hoteles
                            </h2>
                            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-400 to-sky-500" />
                            <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-400">
                                Un pago de implementación y una mensualidad. Nada de comisiones
                                por reserva.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                            {PLANS.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all ${
                                        plan.featured
                                            ? "border-teal-400/60 bg-[#071019] text-white shadow-[0_20px_60px_rgba(13,148,136,0.25)] lg:-mt-4 lg:scale-105"
                                            : "border-slate-200 bg-slate-50 hover:-translate-y-1.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60"
                                    }`}
                                >
                                    {plan.featured && (
                                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-4 py-1 text-xs font-black uppercase tracking-wider text-slate-950">
                                            Más elegido
                                        </span>
                                    )}

                                    <h3
                                        className={`text-2xl font-black ${
                                            plan.featured ? "text-white" : ""
                                        }`}
                                    >
                                        {plan.name}
                                    </h3>
                                    <p
                                        className={`mt-1 text-sm font-medium ${
                                            plan.featured
                                                ? "text-teal-300"
                                                : "text-slate-500 dark:text-slate-400"
                                        }`}
                                    >
                                        {plan.tagline}
                                    </p>

                                    <div
                                        className={`mt-7 border-t pt-6 ${
                                            plan.featured
                                                ? "border-white/10"
                                                : "border-slate-200 dark:border-slate-800"
                                        }`}
                                    >
                                        <p className="flex items-baseline gap-1.5">
                                            <span className="text-4xl font-black">
                                                {plan.monthly}
                                            </span>
                                            <span
                                                className={`text-sm font-medium ${
                                                    plan.featured
                                                        ? "text-slate-400"
                                                        : "text-slate-500 dark:text-slate-400"
                                                }`}
                                            >
                                                / mes
                                            </span>
                                        </p>
                                        <p
                                            className={`mt-1.5 text-sm ${
                                                plan.featured
                                                    ? "text-slate-400"
                                                    : "text-slate-500 dark:text-slate-400"
                                            }`}
                                        >
                                            Implementación:{" "}
                                            <strong
                                                className={
                                                    plan.featured
                                                        ? "text-white"
                                                        : "text-slate-800 dark:text-slate-200"
                                                }
                                            >
                                                {plan.setup}
                                            </strong>
                                        </p>
                                    </div>

                                    <ul className="mt-7 flex-1 space-y-3.5">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex gap-3 text-sm leading-relaxed">
                                                <span className="mt-0.5 shrink-0 font-bold text-teal-500">
                                                    ✓
                                                </span>
                                                <span
                                                    className={
                                                        plan.featured
                                                            ? "text-slate-300"
                                                            : "text-slate-600 dark:text-slate-400"
                                                    }
                                                >
                                                    {f}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href="#demo-gratis"
                                        className={`mt-8 block rounded-xl px-6 py-3.5 text-center font-bold transition-all hover:scale-[1.03] ${
                                            plan.featured
                                                ? "bg-gradient-to-r from-teal-400 to-sky-500 text-slate-950"
                                                : "border-2 border-slate-300 text-slate-800 hover:border-teal-400 dark:border-slate-700 dark:text-slate-200"
                                        }`}
                                    >
                                        Empezar con {plan.name}
                                    </a>
                                </div>
                            ))}
                        </div>

                        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
                            Precios en dólares, sin IVA. La implementación incluye diagnóstico,
                            conexión, entrenamiento y puesta en marcha.
                        </p>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <section className="px-6 py-24 lg:px-20">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-black sm:text-4xl">
                                Preguntas frecuentes sobre IA para hoteles
                            </h2>
                            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-400 to-sky-500" />
                        </div>

                        <div className="space-y-3">
                            {FAQS.map((faq, i) => {
                                const isOpen = openFaq === i;
                                return (
                                    <div
                                        key={faq.q}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"
                                    >
                                        <button
                                            type="button"
                                            id={`faq-q-${i}`}
                                            onClick={() => setOpenFaq(isOpen ? null : i)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-${i}`}
                                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-slate-800/40"
                                        >
                                            <span className="text-base font-bold">{faq.q}</span>
                                            <span
                                                aria-hidden="true"
                                                className={`shrink-0 text-xl font-light text-teal-500 transition-transform duration-300 ${
                                                    isOpen ? "rotate-45" : ""
                                                }`}
                                            >
                                                +
                                            </span>
                                        </button>
                                        {/* Siempre en el HTML para que Google indexe la respuesta; solo se oculta. */}
                                        <p
                                            id={`faq-${i}`}
                                            role="region"
                                            aria-labelledby={`faq-q-${i}`}
                                            hidden={!isOpen}
                                            className="border-t border-slate-100 px-6 py-5 leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400"
                                        >
                                            {faq.a}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ===== Formulario ===== */}
                <section
                    id="demo-gratis"
                    className="scroll-mt-24 bg-[#071019] px-6 py-24 lg:px-20"
                >
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
                        <div className="text-white">
                            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                                Mira tu propio agente antes de decidir
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-slate-300">
                                Cuéntanos de tu hotel y preparamos una demo con tus habitaciones,
                                tus tarifas y tus preguntas reales. Sin costo y sin compromiso.
                            </p>

                            <ul className="mt-9 space-y-4">
                                {[
                                    "Respondemos en menos de 24 horas hábiles",
                                    "La demo se arma con la información de tu hotel",
                                    "Te decimos de entrada si tu PMS se puede conectar",
                                    "Si no te sirve, te lo decimos y ya",
                                ].map((item) => (
                                    <li key={item} className="flex gap-3 text-slate-300">
                                        <span className="mt-0.5 shrink-0 font-bold text-teal-400">
                                            ✓
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm text-slate-400">
                                    ¿Prefieres escribir directo?
                                </p>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-[#25D366] hover:underline"
                                >
                                    Hablemos por WhatsApp →
                                </a>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900 sm:p-10">
                            {formStatus === "success" ? (
                                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-3xl dark:bg-teal-500/15">
                                        ✅
                                    </div>
                                    <h3 className="text-2xl font-black">¡Solicitud enviada!</h3>
                                    <p className="mt-3 max-w-sm text-slate-600 dark:text-slate-400">
                                        Revisamos la información de tu hotel y te escribimos en menos
                                        de 24 horas hábiles con la demo.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setFormStatus("idle")}
                                        className="mt-7 text-sm font-bold text-teal-600 hover:underline dark:text-teal-400"
                                    >
                                        Enviar otra solicitud
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <h3 className="text-2xl font-black">Solicita tu demo</h3>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Los campos con * son obligatorios.
                                    </p>

                                    <div className="mt-7 space-y-5">
                                        <div>
                                            <label className={labelClass} htmlFor="hotel">
                                                Nombre del hotel *
                                            </label>
                                            <input
                                                id="hotel"
                                                name="hotel"
                                                type="text"
                                                value={formData.hotel}
                                                onChange={handleInputChange}
                                                placeholder="Hotel Casa del Sol"
                                                maxLength={200}
                                                className={inputClass}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className={labelClass} htmlFor="name">
                                                    Tu nombre *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="María Gómez"
                                                    maxLength={200}
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="whatsapp">
                                                    WhatsApp
                                                </label>
                                                <input
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    type="tel"
                                                    value={formData.whatsapp}
                                                    onChange={handleInputChange}
                                                    placeholder="+57 300 000 0000"
                                                    maxLength={40}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="email">
                                                Correo electrónico *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="reservas@tuhotel.com"
                                                maxLength={320}
                                                className={inputClass}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className={labelClass} htmlFor="rooms">
                                                    Nº de habitaciones
                                                </label>
                                                <select
                                                    id="rooms"
                                                    name="rooms"
                                                    value={formData.rooms}
                                                    onChange={handleInputChange}
                                                    className={inputClass}
                                                >
                                                    <option value="">Selecciona…</option>
                                                    {ROOM_RANGES.map((r) => (
                                                        <option key={r} value={r}>
                                                            {r}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="pms">
                                                    PMS o channel manager
                                                </label>
                                                <input
                                                    id="pms"
                                                    name="pms"
                                                    type="text"
                                                    value={formData.pms}
                                                    onChange={handleInputChange}
                                                    placeholder="Cloudbeds, Zeus, ninguno…"
                                                    maxLength={200}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass} htmlFor="challenge">
                                                ¿Cuál es tu mayor reto hoy?
                                            </label>
                                            <textarea
                                                id="challenge"
                                                name="challenge"
                                                rows={4}
                                                value={formData.challenge}
                                                onChange={handleInputChange}
                                                placeholder="Perdemos reservas de noche y pagamos mucha comisión a las OTAs…"
                                                maxLength={5000}
                                                className={`${inputClass} resize-y`}
                                            />
                                        </div>
                                    </div>

                                    {formStatus === "error" && errorMessage && (
                                        <p
                                            role="alert"
                                            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                                        >
                                            {errorMessage}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={formStatus === "loading"}
                                        className="mt-7 w-full rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                    >
                                        {formStatus === "loading"
                                            ? "Enviando…"
                                            : "Quiero mi demo gratis"}
                                    </button>

                                    <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                        Usamos tus datos solo para contactarte sobre esta solicitud.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

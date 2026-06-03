import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import colegioMockup from "../../../public/images/proyecto-colegio/web-colegio-mockup.avif";
import colegioBanner from "../../../public/images/proyecto-colegio/banner-backgroud.webp";

const ColegioSanJustino = () => {
    return (
        <Layout>
            <SEO
                title="Colegio San Justino | Sitio Web Institucional"
                description="Desarrollo del sitio web institucional del Colegio San Justino. Diseño moderno, información académica, noticias y contacto para la comunidad educativa."
                keywords={["diseño web colegio", "desarrollo web educativo", "colegio san justino", "sitio web institucional escuela", "pagina web educativa", "juan camilo salazar desarrollo web"]}
                image="/images/proyecto-colegio/web-colegio-mockup.avif"
                imageAlt="Mockup sitio web Colegio San Justino - Juan Camilo Salazar"
                type="website"
                category="Desarrollo Web"
            />

            <main className="font-sans text-slate-900 dark:text-slate-100">

                {/* Hero Section */}
                <section
                    className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32"
                    style={{
                        color: '#ffffff',
                        backgroundImage: `linear-gradient(to right, rgba(42,42,114,0.88), rgba(0,159,253,0.75), rgba(26,41,128,0.88)), url(${colegioBanner.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes float {
                                0% { transform: translateY(0px); }
                                50% { transform: translateY(-15px); }
                                100% { transform: translateY(0px); }
                            }
                        `
                    }} />

                    <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                        <div className="w-full lg:flex-1 max-w-2xl lg:max-w-none text-center lg:text-left z-20">
                            <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 inline-block backdrop-blur-sm border border-white/10 shadow-lg">
                                Sitio Web Institucional Educativo
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                                Colegio <span className="text-[#fbbf24]">San Justino</span>
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Diseño y desarrollo del sitio web institucional del Colegio San Justino. Una plataforma moderna que conecta a la comunidad educativa con información académica, noticias y canales de contacto.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                                {["Next.js", "Tailwind CSS", "Responsive Design", "SEO"].map((tech) => (
                                    <span key={tech} className="bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Mockup Image */}
                        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center z-10 mt-10 lg:mt-0">
                            <div className="relative w-full max-w-[720px] lg:scale-95 xl:scale-100 origin-center lg:origin-right flex items-center justify-center animate-[float_5s_ease-in-out_infinite] drop-shadow-2xl ml-auto">
                                <Image
                                    src={colegioMockup}
                                    alt="Mockup web Colegio San Justino"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto block object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-16 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">¿Qué incluye el sitio?</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Una plataforma pensada para la comunidad del colegio: alumnos, padres y docentes.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#0f3460]/10 flex items-center justify-center text-[#0f3460] dark:text-[#fbbf24]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Información Institucional</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Presentación del colegio, misión, visión, niveles educativos y propuesta pedagógica de forma clara y atractiva.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#1a56a0]/10 flex items-center justify-center text-[#1a56a0] dark:text-[#93c5fd]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Novedades y Eventos</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Sección de noticias y calendario de eventos para mantener a la comunidad educativa siempre informada.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#fbbf24]/10 flex items-center justify-center text-[#d97706]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Contacto Directo</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Formulario de contacto, datos de la institución e integración con WhatsApp para consultas de inscripción y administración.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="px-6 py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 justify-center">
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Resultados del Proyecto</span>
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                        </div>

                        <div className="bg-white dark:bg-[#151c2f] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
                            {/* Stats panel */}
                            <div className="md:w-5/12 bg-gradient-to-br from-[#0f3460] to-[#1a56a0] flex flex-col items-center justify-center p-12 gap-8">
                                <div className="text-center">
                                    <span className="block text-5xl font-black text-white mb-1">100%</span>
                                    <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Responsive</span>
                                </div>
                                <div className="w-16 h-px bg-white/20"></div>
                                <div className="text-center">
                                    <span className="block text-5xl font-black text-[#fbbf24] mb-1">SEO</span>
                                    <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Optimizado</span>
                                </div>
                                <div className="w-16 h-px bg-white/20"></div>
                                <div className="text-center">
                                    <span className="block text-5xl font-black text-white mb-1">+</span>
                                    <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Visibilidad Digital</span>
                                </div>
                            </div>

                            <div className="md:w-7/12 p-10 lg:p-14 flex flex-col justify-center">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Presencia digital para una institución de confianza</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                                    El Colegio San Justino necesitaba un sitio web que reflejara la seriedad y calidez de su propuesta educativa. Desarrollé una plataforma moderna, rápida y fácil de navegar, adaptada tanto para familias que buscan información como para la gestión interna del colegio.
                                </p>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        "Diseño institucional profesional alineado con la identidad del colegio",
                                        "Arquitectura de contenido pensada para familias y alumnos",
                                        "Integración de formularios y canales de comunicación directa",
                                        "Velocidad de carga optimizada con Next.js y buenas prácticas",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                            <svg className="w-5 h-5 mt-0.5 text-[#1a56a0] dark:text-[#fbbf24] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-base leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process / Tech Section */}
                <section className="px-6 py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-16 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Proceso de Desarrollo</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">De la idea al sitio publicado: cómo construí la plataforma del colegio paso a paso.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    step: "01",
                                    title: "Relevamiento y Diseño",
                                    desc: "Reuniones con el equipo del colegio para entender sus necesidades, público objetivo y contenidos clave. Creación de wireframes y paleta de colores institucional.",
                                    color: "#0f3460",
                                },
                                {
                                    step: "02",
                                    title: "Maquetado Responsive",
                                    desc: "Desarrollo del layout completo con Tailwind CSS, garantizando una experiencia perfecta en móviles, tablets y escritorio desde el primer día.",
                                    color: "#1a56a0",
                                },
                                {
                                    step: "03",
                                    title: "Contenido y SEO",
                                    desc: "Estructuración de textos, metadatos, Open Graph y optimización técnica para mejorar el posicionamiento en Google y buscadores locales.",
                                    color: "#d97706",
                                },
                                {
                                    step: "04",
                                    title: "Entrega y Capacitación",
                                    desc: "Publicación del sitio en producción y entrega de guía de uso para que el equipo del colegio pueda actualizar contenidos de forma autónoma.",
                                    color: "#059669",
                                },
                            ].map(({ step, title, desc, color }) => (
                                <div key={step} className="flex gap-6 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <span className="text-5xl font-black opacity-10 leading-none shrink-0" style={{ color }}>{step}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="px-6 py-16 bg-slate-50 dark:bg-slate-800/30">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Stack Tecnológico</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { name: "Next.js", icon: "⚡" },
                                { name: "React", icon: "⚛️" },
                                { name: "Tailwind CSS", icon: "🎨" },
                                { name: "Vercel", icon: "▲" },
                                { name: "SEO Técnico", icon: "🔍" },
                                { name: "WhatsApp API", icon: "💬" },
                            ].map(({ name, icon }) => (
                                <div key={name} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl shadow-sm">
                                    <span className="text-xl">{icon}</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24 text-center bg-white dark:bg-slate-900">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#0f3460]/10 rounded-full flex items-center justify-center mb-8 text-[#0f3460] dark:text-[#fbbf24]">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            ¿Tu institución necesita un sitio web?
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl md:max-w-xl mx-auto">
                            Creo sitios web profesionales para colegios, institutos y organizaciones educativas. Rápidos, modernos y fáciles de gestionar.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            <Link
                                href="/contact"
                                className="bg-[#0f3460] hover:bg-[#1a56a0] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(15,52,96,0.4)] transition-all transform hover:-translate-y-1 text-center"
                            >
                                Hablemos de tu Proyecto
                            </Link>
                            <Link
                                href="/proyectos"
                                className="border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0f3460] dark:hover:border-[#fbbf24] px-10 py-5 rounded-2xl font-bold text-xl transition-all text-center"
                            >
                                Ver Más Proyectos
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default ColegioSanJustino;

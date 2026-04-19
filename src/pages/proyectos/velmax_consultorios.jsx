import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import velmax from "../../../public/images/velmax.png";

const VelmaxConsultorios = () => {
    return (
        <Layout>
            <Head>
                <title>Velmax Consultorios | Caso de Éxito de Desarrollo Web Médico</title>
                <meta
                    name="description"
                    content="Desarrollo de página web moderna y optimizada para Velmax Consultorios Médicos. Más de 30 especialidades con agendamiento online."
                />
            </Head>

            <main className="font-sans text-slate-900 dark:text-slate-100">
                {/* Hero Section */}
                <section
                    className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#004e4a] via-[#008f86] to-[#004e4a]"
                    style={{
                        borderBottomLeftRadius: 'clamp(20px, 10vw, 80px)',
                        borderBottomRightRadius: 'clamp(20px, 10vw, 80px)',
                        color: '#ffffff',
                    }}
                >
                    {/* Adding keyframes for the float animation */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                    @keyframes float-delayed {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                    }
                `}} />

                    <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 overflow-visible">
                        <div className="w-full lg:flex-1 max-w-2xl lg:max-w-none text-center lg:text-left z-20">
                            <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 inline-block backdrop-blur-sm border border-white/10 shadow-lg">
                                Plataforma Clínica Integral
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                                Proyecto <span className="text-[#a8e6cf]">Velmax</span> Consultorios
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Diseño y desarrollo de una plataforma web completa de alto rendimiento para el centro médico más grande de Berazategui, con más de 30 especialidades y agendamiento integrado.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-[7000]">
                                <a
                                    href="https://velmaxsalud.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-[#004e4a] px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl text-center active:scale-95"
                                >
                                    Ver Sitio en Vivo
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center z-10 mt-10 lg:mt-0">
                            <div className="relative w-full max-w-[800px] h-full flex items-center justify-center animate-[float_5s_ease-in-out_infinite] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/20">
                                <Image
                                    src={velmax}
                                    alt="Velmax Consultorios Médicos Mockup"
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
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Características de la Solución</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Una plataforma diseñada para optimizar la experiencia del paciente y agilizar los procesos del centro médico.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#008f86]/10 flex items-center justify-center text-[#008f86]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Directorio Médico</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Sección dedicada para el staff de más de 50 profesionales, filtrables por más de 30 especialidades.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#004e4a]/10 flex items-center justify-center text-[#004e4a] dark:text-[#a8e6cf]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Citas Online</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Integración fluida con WhatsApp y formularios inteligentes para solicitar turnos las 24 horas del día.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#2a9d8f]/10 flex items-center justify-center text-[#2a9d8f]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">SEO y Performance</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Optimización del rendimiento y posicionamiento web local para liderar las búsquedas de médicos en la región.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Case Study Section */}
                <section className="px-6 py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 justify-center">
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Impacto del Proyecto</span>
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                        </div>

                        <div className="bg-white dark:bg-[#151c2f] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
                            <div className="md:w-5/12 relative min-h-[300px] md:min-h-full">
                                <Image
                                    src={velmax}
                                    alt="Velmax"
                                    layout="fill"
                                    objectFit="cover"
                                    className="opacity-90 mt-4 md:mt-0 object-left"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#004e4a]/90 to-transparent flex items-end md:items-center p-8">
                                    <h3 className="text-white text-3xl font-black leading-tight drop-shadow-md">
                                        Evolución<br />Digital
                                    </h3>
                                </div>
                            </div>

                            <div className="md:w-7/12 p-10 lg:p-14 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="bg-[#008f86]/5 p-6 rounded-3xl text-center border border-[#008f86]/20">
                                        <span className="block text-4xl font-black text-[#008f86] mb-1">30+</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Especialidades</span>
                                    </div>
                                    <div className="bg-[#2a9d8f]/5 p-6 rounded-3xl text-center border border-[#2a9d8f]/20">
                                        <span className="block text-4xl font-black text-[#2a9d8f] mb-1">3x</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Tráfico Web</span>
                                    </div>
                                </div>
                                <blockquote className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl leading-relaxed italic mb-8 font-medium relative">
                                    <span className="absolute -top-6 -left-4 text-6xl text-slate-200 dark:text-slate-700/50">"</span>
                                    La nueva web nos ha permitido comunicar eficazmente la calidad y la amplia gama de servicios que ofrecemos. Agilizar el proceso de turnos ha sido clave para mejorar la atención de nuestros pacientes desde el primer momento.
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24 text-center bg-white dark:bg-slate-900">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#008f86]/10 rounded-full flex items-center justify-center mb-8 text-[#008f86]">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">¿Estás listo para un proyecto similar?</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl md:max-w-xl mx-auto">Transforma la presencia digital de tu clínica o consultorio. Creamos soluciones a medida para el sector salud.</p>

                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            <Link
                                href="/contact"
                                className="bg-[#004e4a] hover:bg-[#006e68] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(0,78,74,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                Iniciar Mi Proyecto
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default VelmaxConsultorios;

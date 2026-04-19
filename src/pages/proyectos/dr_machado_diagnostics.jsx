import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import mockupMedico from "../../../public/images/mockupMedico.png";
import mockupCelMedico from "../../../public/images/MockupCelMedico.png";
import doctor3 from "../../../public/images/doctor3.webp";

const DrMachadoDiagnostics = () => {
    return (
        <Layout>
            <SEO 
                title="MedWeb | Páginas Web para Doctores y Clínicas"
                description="Diseño profesional y funcional exclusivo para especialistas de la salud. Potencia tu presencia digital y atrae más pacientes."
                keywords={["diseño web medicos", "paginas web doctores", "marketing salud", "sitios web clinicas", "medweb"]}
            />

            <main className="font-sans text-slate-900 dark:text-slate-100">
                {/* Hero Section */}
                <section
                    className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#2a2a72] via-[#009ffd] to-[#1a2980]"
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
                                Exclusivo para Médicos
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                                Páginas web para <span className="text-blue-200">doctores</span>
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Diseño profesional y funcional exclusivo para especialistas de la salud. Potencia tu presencia digital y atrae más pacientes con una plataforma optimizada.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-[7000]">
                                <a
                                    href="#planes"
                                    className="bg-white text-[#1a2980] px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl text-center active:scale-95"
                                >
                                    Ver Planes
                                </a>
                                <a
                                    href="#demo"
                                    className="bg-white/10 border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-xl text-center active:scale-95"
                                >
                                    Agendar Demo
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] z-10">
                            <div className="relative w-full max-w-[450px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px] h-full flex items-center justify-center">
                                {/* Mobile Mockup on the Left (positioned absolutely over the laptop) */}
                                <div className="absolute z-30 w-[55%] sm:w-[50%] md:w-[48%] lg:w-[60%] -left-[5%] sm:left-0 md:left-[5%] lg:left-[10%] bottom-[5%] animate-[float-delayed_4s_ease-in-out_infinite]">
                                    <Image
                                        src={mockupCelMedico}
                                        alt="Dr. Machado Mobile Mockup"
                                        width={500}
                                        height={1000}
                                        className="w-full h-auto"
                                        priority
                                    />
                                </div>
                                {/* Desktop Mockup on the Right/Center */}
                                <div className="w-[90%] sm:w-[85%] md:w-[82%] lg:w-[85%] z-10 ml-auto animate-[float_5s_ease-in-out_infinite]">
                                    <Image
                                        src={mockupMedico}
                                        alt="Dr. Machado Desktop Mockup"
                                        width={800}
                                        height={533}
                                        className="w-full h-auto block"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-16 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Soluciones para tu Clínica</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Creamos herramientas digitales que facilitan tu trabajo y generan confianza inmediata para tus pacientes.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#009ffd]/10 flex items-center justify-center text-[#009ffd]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Diseño Profesional</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Estética premium que comunica autoridad y genera confianza desde el primer clic.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#a200ff]/10 flex items-center justify-center text-[#a200ff]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Agendamiento de Citas</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Sistema inteligente para que tus pacientes reserven su consulta fácilmente las 24 horas del día.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#2a2a72]/10 flex items-center justify-center text-[#2a2a72] dark:text-[#6e6eff]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">SEO Local</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Aparece en los primeros resultados cuando los pacientes busquen especialistas en tu ciudad o zona.</p>
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
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Caso de Éxito Real</span>
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                        </div>

                        <div className="bg-white dark:bg-[#151c2f] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
                            <div className="md:w-5/12 relative min-h-[300px] md:min-h-full">
                                <Image
                                    src={doctor3}
                                    alt="Dr. Cristian Machado - Caso de Éxito"
                                    layout="fill"
                                    objectFit="cover"
                                    className="opacity-90 mt-4 md:mt-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a2980]/90 to-transparent flex items-end md:items-center p-8">
                                    <h3 className="text-white text-3xl font-black leading-tight drop-shadow-md">
                                        Dr. Cristian<br />Machado
                                    </h3>
                                </div>
                            </div>

                            <div className="md:w-7/12 p-10 lg:p-14 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="bg-[#009ffd]/5 p-6 rounded-3xl text-center border border-[#009ffd]/20">
                                        <span className="block text-4xl font-black text-[#009ffd] mb-1">+150%</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Pacientes nuevos</span>
                                    </div>
                                    <div className="bg-[#a200ff]/5 p-6 rounded-3xl text-center border border-[#a200ff]/20">
                                        <span className="block text-4xl font-black text-[#a200ff] mb-1">10k+</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Visitas orgánicas</span>
                                    </div>
                                </div>
                                <blockquote className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl leading-relaxed italic mb-8 font-medium relative">
                                    <span className="absolute -top-6 -left-4 text-6xl text-slate-200 dark:text-slate-700/50">"</span>
                                    MedWeb transformó mi práctica privada en Buenos Aires. Mi agenda ahora se llena automáticamente y los pacientes constantemente comentan lo profesional y confiable que se ve mi sitio web. Es la mejor inversión que he hecho para mi clínica.
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                                        <Image src={doctor3} alt="Avatar" layout="fill" objectFit="cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Dr. Cristian Machado Otero</p>
                                        <p className="text-slate-500 text-sm">Especialista en Diagnóstico y Radiología</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24 text-center bg-white dark:bg-slate-900">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#009ffd]/10 rounded-full flex items-center justify-center mb-8 text-[#009ffd]">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">Haz crecer tu consultorio médico hoy</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl md:max-w-xl mx-auto">Únete a los doctores élite que ya digitalizaron su éxito y automatizaron la atracción de pacientes.</p>

                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            <Link
                                href="/contact"
                                className="bg-[#1a2980] hover:bg-[#2a2a72] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(26,41,128,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                Comenzar Proyecto
                            </Link>
                        </div>
                        <p className="mt-8 text-slate-400 text-sm font-semibold uppercase tracking-widest">Primera consulta gratuita de descubrimiento</p>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default DrMachadoDiagnostics;

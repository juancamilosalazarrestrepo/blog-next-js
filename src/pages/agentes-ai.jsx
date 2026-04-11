import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function AgentesAI() {
    const phoneNumber = "573042093951";

    return (
        <Layout>
            <SEO 
                title="Agentes de Inteligencia Artificial para Empresas"
                description="Automatiza la atención al cliente y optimiza tus ventas 24/7 con Agentes de Inteligencia Artificial integrados. Reduce costos operativos hoy."
                keywords={['agentes de inteligencia artificial', 'ia para empresas', 'automatización de ventas', 'chatbots', 'whatsapp bots con ia', 'desarrollo de ia']}
                image="/assets/ai/ai_hero.png"
            />
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

                {/* Floating WhatsApp Action */}
                <a className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group" href={`https://wa.me/${phoneNumber}`}>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                    </svg>
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100">
                        ¿Hablamos sobre IA?
                    </div>
                </a>

                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 lg:px-20 py-12 lg:py-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_process.png')" }}>
                    {/* Overlay Degradado Azul */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#072461] via-[#1152d4]/90 to-[#1152d4]/60 z-0"></div>

                    <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                        <div className="flex flex-col gap-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">Revolución en Automatización</span>
                                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-white">
                                    Agentes de <span className="text-blue-300">Inteligencia Artificial</span> para tu Empresa
                                </h1>
                                <p className="text-lg lg:text-xl text-blue-50 leading-relaxed max-w-xl">
                                    Creamos asistentes inteligentes, automatizamos procesos complejos y mejoramos la atención al cliente operando 24/7 de manera autónoma.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href={`https://wa.me/${phoneNumber}`} className="flex items-center justify-center gap-2 bg-white text-[#1152d4] px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.3)] cursor-pointer">
                                    Agendar Consultoría
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </a>
                                <Link href="/services" className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
                                    Ver Casos de Uso
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-[#1152d4] bg-slate-200 bg-cover shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt5RbSF5nYt1jRh3yXZHbG6Y_kvJ3wTn-7unSU07TWnoM4trC9NIKYPpVfrwWPBZFca7rw6c-KleVJ4mzOHK8u6whUArzbIAZUE3VdXYJ7H3efJLUDWVGjHTCKZvEcF023TZAvVGPZFOU3iXJxJHgvmr3iRM6XAym3aL7ZFVpRNWBaErU7pCNUM0RZ_Lg1G07dDs0evd3Pf-2mgRRZMhNPKlhzh2IrKQlwvPEBkQK3VQgGI7RI8bbxkKAfYXkupnj5tmqsKg-9aEc')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-[#1152d4] bg-slate-200 bg-cover shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEBgcVd954T6NjHSRtD0rOrq3sJFmCRunvBYWhrKZUCALSB4SN1VMMaurHwYIlWe9LS8DFdbmdz7R9hYHm6wkGzU-tCmAoy9EDSl-kt8j7rnJinrX2UWPUeBIrxxrq6UWkIbS1Tx9AO5BoSLTUke1pAFLN78MtWbZBwtf3MCGxxW3iYiPnEeQ05AZw8Ou5KS0Nk-EtoEQprXvkHrL9uNxZbN_qyIwNNpvP2XYvW-rno9AR-02Vj6mToWmIU_LGCkpdLeSVLUxc_t0')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-[#1152d4] bg-slate-200 bg-cover shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs8L7MDWzNANCquCUnLZaOhM6k0VVwj70LETcUFKNR9qV-3z9O9R8U8hp3aqT78vxR1ARmIxy-NdLQT8uf_diLKNMOcnVimC7Mkow9lQiLiwen6r0NWJCVsdzf_vVTWYX1ocIzQNuSDb7iyXhMtg10VSXPY86F95Pg0HhH7sx5Gck-2_GXtPzN768ZqQJaeDG3dV1qlL_RGPAjlihar4VwXk83hdMPIZ5wZg_eHaDXqZ3T3PnqBS0m6T0z9bURgVF5YjL2xkOCgvo')" }}></div>
                                </div>
                                <p className="text-sm font-medium text-blue-100 drop-shadow-md">Más de <span className="text-white font-bold">50+</span> implementaciones exitosas</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-400/10 rounded-[2rem] blur-2xl group-hover:bg-blue-400/30 transition-all"></div>
                                <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full bg-slate-200 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_hero.png')" }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section / Ventajas */}
                <section className="py-24 px-6 bg-white dark:bg-slate-900/50" id="ventajas">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Posibles Soluciones e Impacto Real</h2>
                            <div className="w-20 h-1.5 bg-[#1152d4] mx-auto rounded-full"></div>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">La Inteligencia Artificial no es el futuro, es tu ventaja competitiva actual. Implementa agentes diseñados específicamente para resolver los retos diarios de tu operación.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_support.png')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">headset_mic</span>
                                        <h3 className="text-2xl font-bold">Atención al Cliente 24/7</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Bots inteligentes capaces de entender lenguaje natural, resolver consultas complejas y mantener soporte ilimitado, en cualquier idioma y a cualquier hora.</p>
                                </div>
                            </div>
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_sales.png')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">smart_toy</span>
                                        <h3 className="text-2xl font-bold">Ventas y Calificación de Leads</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Automatiza tus embudos de ventas. Los agentes son capaces de calificar leads, agendar reuniones e incluso cerrar ventas directamente desde WhatsApp o tu web.</p>
                                </div>
                            </div>
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_process.png')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">work_history</span>
                                        <h3 className="text-2xl font-bold">Eficiencia Interna y Procesos</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Reduce drásticamente los costos operativos creando agentes que generen reportes, gestionen inventarios y sincronicen datos en tu ERP/CRM.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Process Section */}
                <section className="py-24 px-6 overflow-hidden" id="proceso">
                    <div className="max-w-7xl mx-auto space-y-32">
                        <div className="text-center space-y-4 mb-24">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">¿Cómo Implementamos Inteligencia Artificial en tu Empresa?</h2>
                            <div className="w-20 h-1.5 bg-[#1152d4] mx-auto rounded-full"></div>
                        </div>
                        {/* Step 1 */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -left-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">01</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_consulting.png')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Identificación y Consultoría</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Estudiamos los cuellos de botella en tu negocio para entender qué partes de la operación requieren intervención manual repetitiva y las mapeamos para ser manejadas por la IA.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Análisis de procesos actuales</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Elección de herramientas (Custom, OpenAI, RAG)</li>
                                </ul>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -right-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">02</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_training.png')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Desarrollo y Entrenamiento del Agente</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Construimos el agente inteligente inyectándole los datos, manuales base de conocimiento de tu empresa, asegurándonos de que hable como tú y tenga la información precisa para tomar control.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Integración y lectura de Base de Conocimientos</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Conexión por API a tus herramientas y CRM</li>
                                </ul>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -left-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">03</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_deployment.png')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Despliegue y Optimización Continua</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Conectamos el agente en vivo (en WhatsApp, Redes Sociales o Sitios Web) y empezamos un ciclo de monitoreo donde el agente aprende de la fricción y las dudas para mejorar constantemente sus resoluciones.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Despliegue en canales (WhatsApp, Web, API)</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Reportes de uso y analíticas de efectividad</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Footer */}
                <section className="bg-gradient-to-r from-blue-700 to-[#072461] text-white py-24 px-6 text-center" id="contacto">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tight">El Futuro de tu Empresa Inicia Hoy</h2>
                            <p className="text-xl text-blue-100">Da el siguiente paso evolutivo en tu negocio. Hablemos sobre cómo un Agente de IA puede transformar el rendimiento y reducir tus costos diarios.</p>
                        </div>
                        <div className="flex flex-col items-center gap-8">
                            <a className="group flex items-center gap-4 bg-white text-blue-700 hover:scale-105 transition-transform duration-300 px-10 py-5 rounded-2xl shadow-2xl shadow-[#1152d4]/20" href={`https://wa.me/${phoneNumber}`}>
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                </svg>
                                <span className="text-2xl font-extrabold">Hablar con un Experto en IA</span>
                            </a>
                            <div className="space-y-2">
                                <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">O llámanos directamente</p>
                                <a className="text-3xl font-light text-white hover:underline transition-all tracking-tighter" href={`tel:+${phoneNumber}`}>+57 304 209 3951</a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}

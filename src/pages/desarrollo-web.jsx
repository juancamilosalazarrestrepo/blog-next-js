import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function DesarrolloWeb() {
    const phoneNumber = "573042093951";

    return (
        <Layout>
            <Head>
                <title>Desarrollo de Páginas Web Profesionales - Salazar Code</title>
                <meta
                    name="description"
                    content="Diseño y desarrollo de páginas web modernas, rápidas y optimizadas para SEO. Expertos en Next.js, React y Shopify. ¡Impulsa tu negocio hoy!"
                />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

                {/* Floating WhatsApp Action from Stitch (adapted) */}
                <a className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group" href={`https://wa.me/${phoneNumber}`}>
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                    </svg>
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100">
                        ¿Necesitas ayuda? ¡Escríbenos!
                    </div>
                </a>

                {/* Hero Section: Split Screen */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 lg:px-20 py-12 lg:py-0">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1.5 bg-[#1152d4]/10 text-[#1152d4] text-xs font-bold uppercase tracking-widest rounded-full">Soluciones Digitales de Élite</span>
                                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900 dark:text-white">
                                    Diseñamos Webs que <span className="text-[#1152d4]">Venden</span> y Convierten
                                </h1>
                                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                    No solo creamos sitios web, construimos herramientas de marketing poderosas que transforman cada visita en una oportunidad de negocio real.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href={`https://wa.me/${phoneNumber}`} className="flex items-center justify-center gap-2 bg-[#1152d4] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1152d4]/90 transition-all shadow-xl shadow-[#1152d4]/30 cursor-pointer">
                                    Solicitar Cotización Gratis
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </a>
                                <Link href="/proyectos/calculadora" className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
                                    Ver Portafolio
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt5RbSF5nYt1jRh3yXZHbG6Y_kvJ3wTn-7unSU07TWnoM4trC9NIKYPpVfrwWPBZFca7rw6c-KleVJ4mzOHK8u6whUArzbIAZUE3VdXYJ7H3efJLUDWVGjHTCKZvEcF023TZAvVGPZFOU3iXJxJHgvmr3iRM6XAym3aL7ZFVpRNWBaErU7pCNUM0RZ_Lg1G07dDs0evd3Pf-2mgRRZMhNPKlhzh2IrKQlwvPEBkQK3VQgGI7RI8bbxkKAfYXkupnj5tmqsKg-9aEc')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEBgcVd954T6NjHSRtD0rOrq3sJFmCRunvBYWhrKZUCALSB4SN1VMMaurHwYIlWe9LS8DFdbmdz7R9hYHm6wkGzU-tCmAoy9EDSl-kt8j7rnJinrX2UWPUeBIrxxrq6UWkIbS1Tx9AO5BoSLTUke1pAFLN78MtWbZBwtf3MCGxxW3iYiPnEeQ05AZw8Ou5KS0Nk-EtoEQprXvkHrL9uNxZbN_qyIwNNpvP2XYvW-rno9AR-02Vj6mToWmIU_LGCkpdLeSVLUxc_t0')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs8L7MDWzNANCquCUnLZaOhM6k0VVwj70LETcUFKNR9qV-3z9O9R8U8hp3aqT78vxR1ARmIxy-NdLQT8uf_diLKNMOcnVimC7Mkow9lQiLiwen6r0NWJCVsdzf_vVTWYX1ocIzQNuSDb7iyXhMtg10VSXPY86F95Pg0HhH7sx5Gck-2_GXtPzN768ZqQJaeDG3dV1qlL_RGPAjlihar4VwXk83hdMPIZ5wZg_eHaDXqZ3T3PnqBS0m6T0z9bURgVF5YjL2xkOCgvo')" }}></div>
                                </div>
                                <p className="text-sm font-medium text-slate-500">Más de <span className="text-slate-900 dark:text-white font-bold">500+</span> empresas confían en nosotros</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-[#1152d4]/20 rounded-[2rem] blur-2xl group-hover:bg-[#1152d4]/30 transition-all"></div>
                                <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full bg-slate-200 rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq-uZ4Mu0RrGEn3tp_uEKvV10vw5bDb1zNc5UM6qMF9YpU1SFpkLIgdgHzxVxG5j3lf7rqIuCpRZcjtbSsTr5Jghv8Kw9gBl_6Au4oKcFrxx9Qh57HvgbTMM4aLg6WmCiywj8xEDIWbClb5onUm7BzoKCt8pCLC4zlescOFvB04otiP0tIqHL4r0Tk0t_rCf7F_wwZX7TdGOYCLk3k8pm6NHV7tnq3pF3LRrSEde3_Sukvquwm12SDwICqveWQgMIYvB8cQDx8R-w')" }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us: 3 Large Cards */}
                <section className="py-24 px-6 bg-white dark:bg-slate-900/50" id="servicios">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">¿Por qué elegirnos?</h2>
                            <div className="w-20 h-1.5 bg-[#1152d4] mx-auto rounded-full"></div>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Combinamos tecnología de punta con diseño centrado en el usuario para garantizar resultados excepcionales.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Speed Card */}
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBchIqrxuuDDDGpsv4wUHhA6CFZK12THQVs0Z6h7Y90GzD-OBLX4tUe0avRr2wNnNyDO4pcYsMVKUzMebpbFsSrmLrNKxuhQdma8KnFfQVlKVaWqjc487GvYaXYxHnV39MT9b2TYdtnYu97Xc8eNhFELvnLWuU8DIVwZ4XlI1Am-DTtHWBKkeZJ1jhxY0azYvfjwqwncoAXVF-3HMYne6K8aMK9r2bRcVqOL5J1pZilBoCAZ36vpOdkJZ8ptb4URJ6OpeNtv-6PBMc')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">bolt</span>
                                        <h3 className="text-2xl font-bold">Velocidad Extrema</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Sitios optimizados para cargar en menos de 1 segundo, mejorando tu SEO y la experiencia del usuario.</p>
                                </div>
                            </div>
                            {/* Design Card */}
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3p4ej51yuXiYPt6vAl32p-shiw_JzZFWaW6sWGgF6fKdLWIrQvAYeVbWoChCAW8i6rBWYgLBZUIPl4gI7GVl-A_QX-Q5faohiisJ5-iPEI4hNJ2-i6JXzYJ-lY7trDx-nwbg1b4DO2Ouiy1Wf7gUYhKe8nIi2Uj4Bv7X2235YQyHy6cJ1iAICxQ1EXqYcPQvVb3aW4Do1PbZU_LIa1O9ktCHpnv6LJVNaZMRtvXtmaYpPxwgKCamj8wOwncsZVbgtYJ5VbzMDSRI')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">palette</span>
                                        <h3 className="text-2xl font-bold">Diseño Premium</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Interfaces estéticas y funcionales que reflejan la autoridad y el prestigio de tu marca en el mercado.</p>
                                </div>
                            </div>
                            {/* Support Card */}
                            <div className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTBBS589vfq4osalOpAXdw6tYS9C9iKu3FattkP854O4ed3oWnNc3S2bHyAwUcQEqBk7UIpU_xcVhrID4OSLmOdmO8DR1mte6HgLof-w_JSHjEbM1rXbElc2SxbD7FvZkzYhM_gijlmTbk6b88omqkoGbCL7IcLEVqUJsoc8nNXbCmg4ktEXcn69wB-96aLcugrLQ9uu1XcJjxMnvVXSuyovjGeM0vdisLCDGSW4T8xRvQDj6mmCZdlOJyg_EkpjZ6D-b3PO4vWk8')" }}></div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-[#1152d4] font-bold">support_agent</span>
                                        <h3 className="text-2xl font-bold">Soporte Directo</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">Atención personalizada y rápida. Estamos contigo en cada paso, desde la idea hasta el mantenimiento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Process Section: Alternating Layout */}
                <section className="py-24 px-6 overflow-hidden" id="proceso">
                    <div className="max-w-7xl mx-auto space-y-32">
                        <div className="text-center space-y-4 mb-24">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Nuestro Proceso de Trabajo</h2>
                            <div className="w-20 h-1.5 bg-[#1152d4] mx-auto rounded-full"></div>
                        </div>
                        {/* Step 1 */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -left-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">01</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLw3fxX0my5XYwE27YzwuiAabPIMBcy0x9GqMY8ZcyvzjmTvEvsY3hx4CqtorpZLFOMx6zOqNhnwgxw-7c-yGuukXHKB8ykSFcidnWcCgS5ZgJuBCgFUPIFNjt6EU3dSYF2P4ehBCn0T0METoB0kMAjYVeSNU1PoZj8TUAOrOsdikW6BEw4eGLmuJv8pYLVJUlc-Mdk8DyLlvDVL2OxqI0njrW-HYLrHqZ_nZDsZPlOA7WPiGnZFTNycDdEa1J5QqTncZgDNDGxNs')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Consultoría &amp; Estrategia</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Analizamos a fondo tus objetivos comerciales, tu audiencia y tu competencia para trazar la hoja de ruta más efectiva hacia el éxito digital. No programamos sin antes entender qué hace vibrar a tu negocio.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Definición de KPIs</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Arquitectura de Información</li>
                                </ul>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -right-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">02</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5RP82JRYwTd4gHp-Enxj7xemRuwAbccVlaZ4MB1h1NFoVTBRiswplaPw5yKSnk27j_1-QHf73BODhP9W5PT5lOA1T4xxKyw3pdyzYlGEMGfbJFEsBp4-aUeqNdiCJhQX0sRpRCicdHUumPhUYf3m7y6xsgR5eyfz8sWO3QLR3k0I3JePHVVf-B5xUs6J12fddAet096HAdtSz7-7EQvK1gOuZC_uprfQv7NerGcCfSCO02tjEz0erFhZ94SIADZbtwm_LFGAaAFU')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Desarrollo &amp; Diseño</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Nuestros expertos en UX/UI y desarrolladores senior trabajan en conjunto para dar vida a una plataforma rápida, segura y estéticamente impecable que funciona perfectamente en cualquier dispositivo.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Tecnologías modernas (Next.js, Tailwind)</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> UX centrado en la conversión</li>
                                </ul>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-10 -left-10 text-[180px] font-black text-slate-100 dark:text-slate-800/30 -z-10">03</div>
                                <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-xl bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLTYtykbWnUvGrzLMj-D4GzHkaCjT_RxqIAFkJxTy8iowg0OKTlT_j3r1PHWiHNrLG7RsdrqeqtaY8BLw8PCJZc3M0zwMXkjWZXcj6pqs121ol_HudAZVXXGFEci_is-wDfEK9sELX1wlK3kAMB4H20PkrOX1JoV7P_HRtYEhsL_7zafTsfQSldCSF2mLp6fYr8_uDqXYQbSAFsSa0yYoZzWVlgmPKZz1EtX4TbgkA0Kj81c3M8B1rhK977FdFRiSL7OMsc6I_Fdw')" }}></div>
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Lanzamiento &amp; Crecimiento</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    No solo entregamos el sitio; nos aseguramos de que despegue con éxito. Realizamos pruebas de rendimiento finales, configuración de analytics y capacitación para que gestiones tu contenido sin fricciones.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Optimización de rendimiento (Lighthouse 100)</li>
                                    <li className="flex items-center gap-3 font-semibold"><span className="material-symbols-outlined text-[#1152d4]">check_circle</span> Monitoreo post-lanzamiento</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Footer */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center" id="contacto">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tight">¿Listo para empezar?</h2>
                            <p className="text-xl text-blue-100">Hablemos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus metas este año.</p>
                        </div>
                        <div className="flex flex-col items-center gap-8">
                            <a className="group flex items-center gap-4 bg-white text-blue-600 hover:scale-105 transition-transform duration-300 px-10 py-5 rounded-2xl shadow-2xl shadow-blue-900/20" href={`https://wa.me/${phoneNumber}`}>
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                </svg>
                                <span className="text-2xl font-extrabold">Escríbenos al WhatsApp</span>
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

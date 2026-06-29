import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import velmaxMockup from "../../../public/images/velmax-mockup.webp";
import velmaxMobile1 from "../../../public/images/proyecto-velmax/velmax-mobile-design.webp";
import velmaxMobile2 from "../../../public/images/proyecto-velmax/velmax-mobile-design-2.webp";
import velmaxMobile3 from "../../../public/images/proyecto-velmax/velmax-mobile-design-3.webp";
import velmaxDesktop3 from "../../../public/images/proyecto-velmax/velmax-desktop-design-3.webp";
import velmaxDesktop4 from "../../../public/images/proyecto-velmax/velmax-desktop-design-4.webp";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

const content = {
  es: {
    seoTitle: "Velmax Consultorios | Caso de Éxito de Desarrollo Web Médico",
    seoDescription: "Desarrollo de página web moderna y optimizada para Velmax Consultorios Médicos. Más de 30 especialidades con agendamiento online.",
    badge: "Plataforma Clínica Integral",
    heroTitlePre: "Proyecto ",
    heroTitleHl: "Velmax",
    heroTitlePost: " Consultorios",
    heroSubtitle: "Diseño y desarrollo de una plataforma web completa de alto rendimiento para el centro médico más grande de Berazategui, con más de 30 especialidades y agendamiento integrado.",
    ctaLive: "Ver Sitio en Vivo",
    featuresTitle: "Características de la Solución",
    featuresSubtitle: "Una plataforma diseñada para optimizar la experiencia del paciente y agilizar los procesos del centro médico.",
    f1Title: "Directorio Médico",
    f1Text: "Sección dedicada para el staff de más de 50 profesionales, filtrables por más de 30 especialidades.",
    f2Title: "Citas Online",
    f2Text: "Integración fluida con WhatsApp y formularios inteligentes para solicitar turnos las 24 horas del día.",
    f3Title: "SEO y Performance",
    f3Text: "Optimización del rendimiento y posicionamiento web local para liderar las búsquedas de médicos en la región.",
    impactLabel: "Impacto del Proyecto",
    statSpecialties: "Especialidades",
    statTraffic: "Tráfico Web",
    quote: "La nueva web nos ha permitido comunicar eficazmente la calidad y la amplia gama de servicios que ofrecemos. Agilizar el proceso de turnos ha sido clave para mejorar la atención de nuestros pacientes desde el primer momento.",
    g1Title: "Landing Page Principal",
    g1Text: "Diseño moderno y profesional para la página de inicio, destacando especialidades y servicios del centro.",
    g2Title: "Galería de Médicos",
    g2Text: "Sección dedicada al staff médico con perfiles completos, especialidades y filtros inteligentes para una búsqueda ágil.",
    g3Title: "Navegación Mobile Intuitiva",
    g3Text: "Diseño mobile-first que garantiza una experiencia de navegación fluida y acceso directo a especialidades médicas desde cualquier dispositivo. Cada elemento está pensado para minimizar la fricción y maximizar la conversión en dispositivos táctiles.",
    g4Title: "Perfiles y Agendamiento Móvil",
    g4Text: "Los pacientes pueden explorar perfiles de profesionales, conocer sus especialidades y agendar turnos directamente desde su celular. Una experiencia optimizada para la acción rápida que reduce los pasos al mínimo indispensable.",
    g5Title: "UX Adaptativo y Conversión",
    g5Text: "Cada pantalla se adapta perfectamente al tamaño de la pantalla del usuario, priorizando el confort visual y la jerarquía de contenido. Una experiencia de usuario pulida que transmite profesionalismo desde el primer clic.",
    ctaTitle: "¿Estás listo para un proyecto similar?",
    ctaText: "Transforma la presencia digital de tu clínica o consultorio. Creamos soluciones a medida para el sector salud.",
    ctaButton: "Iniciar Mi Proyecto",
  },
  en: {
    seoTitle: "Velmax Medical Offices | Medical Web Development Success Story",
    seoDescription: "Development of a modern, optimized website for Velmax Medical Offices. Over 30 specialties with online appointment booking.",
    badge: "Comprehensive Clinical Platform",
    heroTitlePre: "Project ",
    heroTitleHl: "Velmax",
    heroTitlePost: " Medical Offices",
    heroSubtitle: "Design and development of a complete, high-performance web platform for the largest medical center in Berazategui, with over 30 specialties and integrated appointment booking.",
    ctaLive: "View Live Site",
    featuresTitle: "Solution Features",
    featuresSubtitle: "A platform designed to optimize the patient experience and streamline the medical center's processes.",
    f1Title: "Medical Directory",
    f1Text: "Dedicated section for a staff of over 50 professionals, filterable by more than 30 specialties.",
    f2Title: "Online Appointments",
    f2Text: "Seamless integration with WhatsApp and smart forms to request appointments 24 hours a day.",
    f3Title: "SEO & Performance",
    f3Text: "Performance optimization and local web positioning to lead doctor searches in the region.",
    impactLabel: "Project Impact",
    statSpecialties: "Specialties",
    statTraffic: "Web Traffic",
    quote: "The new website has allowed us to effectively communicate the quality and wide range of services we offer. Streamlining the appointment process has been key to improving patient care from the very first moment.",
    g1Title: "Main Landing Page",
    g1Text: "Modern, professional design for the home page, highlighting the center's specialties and services.",
    g2Title: "Doctors Gallery",
    g2Text: "Section dedicated to the medical staff with complete profiles, specialties and smart filters for quick searching.",
    g3Title: "Intuitive Mobile Navigation",
    g3Text: "Mobile-first design that guarantees a smooth browsing experience and direct access to medical specialties from any device. Every element is designed to minimize friction and maximize conversion on touch devices.",
    g4Title: "Mobile Profiles & Booking",
    g4Text: "Patients can explore professional profiles, learn about their specialties and book appointments directly from their phone. An experience optimized for quick action that reduces the steps to the bare minimum.",
    g5Title: "Adaptive UX & Conversion",
    g5Text: "Each screen adapts perfectly to the user's screen size, prioritizing visual comfort and content hierarchy. A polished user experience that conveys professionalism from the very first click.",
    ctaTitle: "Ready for a similar project?",
    ctaText: "Transform the digital presence of your clinic or practice. We build tailor-made solutions for the healthcare sector.",
    ctaButton: "Start My Project",
  },
};

const VelmaxConsultorios = () => {
    const { locale } = useRouter();
    const c = content[locale] || content.es;
    return (
        <Layout>
            <SEO
                title={c.seoTitle}
                description={c.seoDescription}
                keywords={["diseño web médico", "desarrollo web clinica", "velmax consultorios", "agendamiento medico online"]}
            />

            <main className="font-sans text-slate-900 dark:text-slate-100">
                {/* Hero Section */}
                <section
                    className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32"
                    style={{
                        color: '#ffffff',
                        backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(30, 58, 138, 0.9)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                                {c.badge}
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                                {c.heroTitlePre}<span className="text-[#7dd3fc]">{c.heroTitleHl}</span>{c.heroTitlePost}
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {c.heroSubtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-[7000]">
                                <a
                                    href="https://velmaxsalud.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-[#1e3a8a] px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl text-center active:scale-95"
                                >
                                    {c.ctaLive}
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center z-10 mt-10 lg:mt-0">
                            <div className="relative w-full max-w-[1000px] lg:scale-110 xl:scale-125 origin-center lg:origin-right h-full flex items-center justify-center animate-[float_5s_ease-in-out_infinite] drop-shadow-2xl">
                                <Image
                                    src={velmaxMockup}
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
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{c.featuresTitle}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">{c.featuresSubtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.f1Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{c.f1Text}</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a] dark:text-[#7dd3fc]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.f2Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{c.f2Text}</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.f3Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{c.f3Text}</p>
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
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{c.impactLabel}</span>
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                        </div>

                        <div className="bg-white dark:bg-[#151c2f] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">
                            <div className="md:w-5/12 relative min-h-[300px] md:min-h-full">
                                <Image
                                    src={velmaxMockup}
                                    alt="Velmax"
                                    layout="fill"
                                    objectFit="cover"
                                    className="opacity-90 mt-4 md:mt-0 object-left"
                                />
                            </div>

                            <div className="md:w-7/12 p-10 lg:p-14 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="bg-[#2563eb]/5 p-6 rounded-3xl text-center border border-[#2563eb]/20">
                                        <span className="block text-4xl font-black text-[#2563eb] mb-1">30+</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{c.statSpecialties}</span>
                                    </div>
                                    <div className="bg-[#3b82f6]/5 p-6 rounded-3xl text-center border border-[#3b82f6]/20">
                                        <span className="block text-4xl font-black text-[#3b82f6] mb-1">3x</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{c.statTraffic}</span>
                                    </div>
                                </div>
                                <blockquote className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl leading-relaxed italic mb-8 font-medium relative">
                                    <span className="absolute -top-6 -left-4 text-6xl text-slate-200 dark:text-slate-700/50">"</span>
                                    {c.quote}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="px-6 py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-20">
                            {/* Mobile Design 1 - Image left, Text right */}
                            {/* Desktop Design 1 - Landing Page - Image left, Text right */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-visible">
                                <div className="flex-1 relative z-10 flex justify-center overflow-visible">
                                    <Image src={velmaxDesktop4} alt="Landing Page Velmax" width={1600} height={1200} className="w-full h-auto object-contain" />
                                </div>
                                <div className="flex-1 z-20 relative text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{c.g1Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{c.g1Text}</p>
                                </div>
                            </div>

                            {/* Desktop Design 2 - Galería de Médicos - Image right, Text left */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-visible">
                                <div className="flex-1 z-20 relative text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{c.g2Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{c.g2Text}</p>
                                </div>
                                <div className="flex-1 relative z-10 flex justify-center overflow-visible">
                                    <Image src={velmaxDesktop3} alt="Galería de Médicos Velmax" width={1600} height={1200} className="w-full h-auto object-contain" />
                                </div>
                            </div>

                            {/* Mobile Design 1 - Image left, Text right */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-visible">
                                <div className="flex-1 relative z-10 flex justify-center overflow-visible md:-mr-40">
                                    <Image src={velmaxMobile1} alt="Diseño mobile Velmax" width={1400} height={2800} className="w-full h-auto object-contain" />
                                </div>
                                <div className="flex-1 relative z-0 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{c.g3Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{c.g3Text}</p>
                                </div>
                            </div>

                            {/* Mobile Design 2 - Text left, Image right */}
                            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 overflow-visible">
                                <div className="flex-1 relative z-10 flex justify-center overflow-visible md:-ml-40">
                                    <Image src={velmaxMobile2} alt="Diseño mobile Velmax 2" width={1400} height={2800} className="w-full h-auto object-contain" />
                                </div>
                                <div className="flex-1 relative z-0 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{c.g4Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{c.g4Text}</p>
                                </div>
                            </div>

                            {/* Mobile Design 3 - Image left, Text right */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-visible">
                                <div className="flex-1 relative z-10 flex justify-center overflow-visible md:-mr-40">
                                    <Image src={velmaxMobile3} alt="Diseño mobile Velmax 3" width={1400} height={2800} className="w-full h-auto object-contain" />
                                </div>
                                <div className="flex-1 relative z-0 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{c.g5Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{c.g5Text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-24 text-center bg-white dark:bg-slate-900">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#2563eb]/10 rounded-full flex items-center justify-center mb-8 text-[#2563eb]">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{c.ctaTitle}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl md:max-w-xl mx-auto">{c.ctaText}</p>

                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            <Link
                                href="/contact"
                                className="bg-[#1e3a8a] hover:bg-[#2563eb] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(30,58,138,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                {c.ctaButton}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default VelmaxConsultorios;

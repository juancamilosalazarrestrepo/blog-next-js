import Link from 'next/link';

export default function WebDevSection() {
    return (
        <section className="w-full py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative group overflow-hidden border-y border-slate-200 dark:border-slate-800">
            {/* Inner Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                    <div className="w-full lg:w-1/2 space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-[#1152d4]/10 text-[#1152d4] dark:bg-[#1152d4]/20 dark:text-blue-300 text-xs font-bold uppercase tracking-widest rounded-full">Diseño y Desarrollo Web</span>
                        <h2 className="text-4xl lg:text-5xl font-black leading-[1.1]">
                            Páginas web que <span className="text-[#1152d4] dark:text-blue-400">Venden</span> y Convierten
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                            No solo construimos webs bonitas; desarrollamos plataformas de alto rendimiento. Optimización SEO perfecta, tiempos de carga ultra rápidos y diseño UX/UI pensado para maximizar las conversiones de tu negocio.
                        </p>
                        <div className="pt-4 flex items-center gap-4">
                            <Link href="/desarrollo-web" className="inline-flex items-center justify-center gap-2 bg-[#1152d4] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:bg-[#1152d4]/90 transition-all duration-300 shadow-xl shadow-[#1152d4]/30">
                                Ver Servicios Web
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full aspect-video lg:aspect-square lg:max-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq-uZ4Mu0RrGEn3tp_uEKvV10vw5bDb1zNc5UM6qMF9YpU1SFpkLIgdgHzxVxG5j3lf7rqIuCpRZcjtbSsTr5Jghv8Kw9gBl_6Au4oKcFrxx9Qh57HvgbTMM4aLg6WmCiywj8xEDIWbClb5onUm7BzoKCt8pCLC4zlescOFvB04otiP0tIqHL4r0Tk0t_rCf7F_wwZX7TdGOYCLk3k8pm6NHV7tnq3pF3LRrSEde3_Sukvquwm12SDwICqveWQgMIYvB8cQDx8R-w')" }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        Carga Rápida
                                    </div>
                                    <div className="bg-[#1152d4]/90 backdrop-blur text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                        Optimizado SEO
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

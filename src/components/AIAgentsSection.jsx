import Link from 'next/link';
import Image from 'next/image';

export default function AIAgentsSection() {
    return (
        <section className="w-full py-24 md:py-32 mb-12 text-white shadow-2xl relative group overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/assets/ai/ai_deployment.png')" }}>
            {/* Overlay Degradado Azul c/ Opacidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#072461]/95 via-[#1152d4]/90 to-[#1152d4]/70 z-0"></div>

            {/* Inner Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 mix-blend-overlay"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-3/5 space-y-6">
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">Nuevo Servicio Premium</span>
                    <h2 className="text-4xl lg:text-5xl font-black leading-[1.1]">
                        Automatiza tu negocio con <span className="text-blue-300 drop-shadow-md">Agentes de IA</span>
                    </h2>
                    <p className="text-lg text-blue-100/90 leading-relaxed max-w-2xl">
                        Atención al cliente 24/7, calificación de leads en piloto automático y procesos operativos optimizados. Implementamos Inteligencia Artificial a la medida de los retos de tu empresa.
                    </p>
                    <div className="pt-4 flex items-center gap-4">
                        <Link href="/agentes-ai" className="inline-flex items-center justify-center gap-2 bg-white text-[#1152d4] px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            Explorar Soluciones
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                    </div>
                </div>
                
                <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 group-hover:rotate-1 group-hover:scale-[1.03] transition-all duration-500 bg-slate-800 bg-cover bg-center" style={{ backgroundImage: "url('/assets/ai/ai_process.png')" }}>
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#1152d4]/20 to-[#072461]/80"></div>
                        <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                                <p className="text-sm font-bold text-white uppercase tracking-wider">Agente Operativo 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}

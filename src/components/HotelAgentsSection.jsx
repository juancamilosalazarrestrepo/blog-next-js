import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import HotelAgentDemo from './HotelAgentDemo';

// Sección blanca a propósito: separa el bloque azul de agentes del bloque oscuro
// de desarrollo web, por eso no tiene variante dark.
export default function HotelAgentsSection() {
    const { t } = useTranslation('common');
    const points = ['point1', 'point2', 'point3'];

    return (
        <section className="w-full py-24 md:py-28 bg-white text-slate-900 relative overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 90% 10%, rgba(45,212,191,0.12), transparent 40%), radial-gradient(circle at 5% 90%, rgba(17,82,212,0.08), transparent 45%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full lg:w-1/2 space-y-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                            {t('hotelSection.badge')}
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-black leading-[1.1]">
                            {t('hotelSection.title')}{' '}
                            <span className="bg-gradient-to-r from-teal-500 to-[#1152d4] bg-clip-text text-transparent">
                                {t('hotelSection.titleHighlight')}
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                            {t('hotelSection.description')}
                        </p>
                        <ul className="space-y-3">
                            {points.map((key) => (
                                <li key={key} className="flex items-center gap-3 font-semibold text-slate-700">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-sm">✓</span>
                                    {t(`hotelSection.${key}`)}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Link href="/agentes-ia-hoteles" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-[#1152d4] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl shadow-teal-500/25">
                                {t('hotelSection.cta')}
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                            <span className="text-sm font-medium text-slate-500">{t('hotelSection.secondary')}</span>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 max-w-[520px]">
                        <div className="relative">
                            <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-teal-400/20 blur-3xl" />
                            <HotelAgentDemo className="relative" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

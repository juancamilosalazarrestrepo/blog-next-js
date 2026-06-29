import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";

const content = {
  es: {
    seoTitle: "App Fruver | Control de Inventario, Ventas y Ganancias para Android",
    seoDescription: "Aplicación Android para fruvers y verdulerías. Gestión de inventario, registro de ventas y seguimiento de ganancias en tiempo real desde el celular.",
    seoImageAlt: "App Fruver - Control de inventario y ventas para Android",
    badge: "Aplicación Móvil Android",
    heroTitlePre: "App ",
    heroTitleHl: "Fruver",
    heroSubtitle: "Aplicación Android para llevar el control total de tu frutería y verdulería: inventario en tiempo real, registro de ventas y seguimiento de ganancias, todo desde tu celular.",
    phoneInventory: "📦 Inventario",
    phoneProfit: "💰 Ganancias",
    phoneToday: "Hoy",
    phoneTotalDay: "Total del Día",
    phoneSales: "Ventas",
    phoneProfitLabel: "Ganancia",
    phoneLast7: "Últimos 7 días",
    phoneSalesTitle: "🛒 Ventas",
    featuresTitle: "¿Qué hace la app?",
    featuresSubtitle: "Todo lo que el dueño de un fruver necesita, en la palma de la mano.",
    f1Title: "Control de Inventario",
    f1Text: "Registra cada producto con nombre, cantidad, unidad (kg, unidad, libra) y precio de compra. El stock se actualiza automáticamente con cada venta.",
    f2Title: "Registro de Ventas",
    f2Text: "Registra cada venta en segundos: selecciona el producto, la cantidad y el precio de venta. Historial completo con hora y fecha de cada transacción.",
    f3Title: "Seguimiento de Ganancias",
    f3Text: "Dashboard con ganancias del día, la semana y el mes. Calcula automáticamente la diferencia entre precio de compra y precio de venta.",
    row1Badge: "Inventario",
    row1Title: "Stock siempre al día",
    row1Text: "Agrega productos con su cantidad disponible, unidad de medida y precio de compra. La app descuenta automáticamente del stock cada vez que registras una venta, así siempre sabes cuánto te queda.",
    row1List: ["Alta y edición de productos en segundos", "Unidades: kg, libra, arroba, unidad", "Alertas visuales cuando el stock es bajo", "Historial de entradas de mercancía"],
    row2Badge: "Ventas",
    row2Title: "Registra cada venta en segundos",
    row2Text: "Con solo seleccionar el producto y la cantidad, la app calcula el total y lo guarda con fecha y hora. Al final del día tienes un resumen claro de todo lo que vendiste.",
    row2List: ["Registro rápido desde pantalla principal", "Cálculo automático de totales", "Historial de ventas por día / semana / mes", "Edición y eliminación de registros"],
    row3Badge: "Ganancias",
    row3Title: "Sabe exactamente cuánto ganás",
    row3Text: "La app calcula automáticamente la diferencia entre lo que pagaste por la mercancía y lo que cobraste al venderla. Sin hojas de cálculo, sin calculadora, sin confusiones.",
    row3List: ["Ganancia neta por producto y por período", "Gráfica de ventas de los últimos 7 días", "Resumen diario, semanal y mensual", "Comparativa entre períodos"],
    phoneNewSale: "🛒 Nueva Venta",
    phoneProduct: "Producto",
    phoneQty: "Cantidad",
    phonePricePerKg: "Precio por kg",
    phoneTotal: "Total",
    phoneRegisterSale: "✓ Registrar Venta",
    phoneDashboard: "💰 Dashboard",
    phoneNetProfit: "Ganancia Neta",
    phoneCost: "Costo",
    stackTitle: "Stack Tecnológico",
    stackFrontend: "Frontend / App",
    stackData: "Datos & Almacenamiento",
    techFrontend: [
      { name: "React Native", desc: "Framework principal para la app Android", icon: "⚛️" },
      { name: "Expo", desc: "Build y distribución simplificados", icon: "📱" },
      { name: "React Navigation", desc: "Navegación entre pantallas", icon: "🧭" },
      { name: "Victory Native", desc: "Gráficas y visualización de datos", icon: "📊" },
    ],
    techData: [
      { name: "SQLite", desc: "Base de datos local sin conexión a internet", icon: "🗄️" },
      { name: "AsyncStorage", desc: "Persistencia de configuración del usuario", icon: "💾" },
      { name: "Context API", desc: "Gestión de estado global de la app", icon: "🔄" },
      { name: "Android APK", desc: "Distribución directa sin tienda", icon: "🤖" },
    ],
    ctaTitle: "¿Tienes una idea para una app?",
    ctaText: "Desarrollo aplicaciones móviles Android a medida para negocios pequeños y medianos. Simples, rápidas y sin complicaciones.",
    ctaButton: "Hablemos de tu Proyecto",
    ctaSecondary: "Ver Más Proyectos",
  },
  en: {
    seoTitle: "Fruver App | Inventory, Sales and Profit Control for Android",
    seoDescription: "Android app for produce stores. Inventory management, sales tracking and real-time profit monitoring right from your phone.",
    seoImageAlt: "Fruver App - Inventory and sales control for Android",
    badge: "Android Mobile App",
    heroTitlePre: "Fruver ",
    heroTitleHl: "App",
    heroSubtitle: "Android app to take full control of your produce store: real-time inventory, sales tracking and profit monitoring, all from your phone.",
    phoneInventory: "📦 Inventory",
    phoneProfit: "💰 Profit",
    phoneToday: "Today",
    phoneTotalDay: "Daily Total",
    phoneSales: "Sales",
    phoneProfitLabel: "Profit",
    phoneLast7: "Last 7 days",
    phoneSalesTitle: "🛒 Sales",
    featuresTitle: "What does the app do?",
    featuresSubtitle: "Everything a produce store owner needs, in the palm of their hand.",
    f1Title: "Inventory Control",
    f1Text: "Register each product with name, quantity, unit (kg, unit, pound) and purchase price. Stock updates automatically with every sale.",
    f2Title: "Sales Tracking",
    f2Text: "Register each sale in seconds: select the product, quantity and selling price. Complete history with the time and date of each transaction.",
    f3Title: "Profit Monitoring",
    f3Text: "Dashboard with daily, weekly and monthly profit. Automatically calculates the difference between purchase price and selling price.",
    row1Badge: "Inventory",
    row1Title: "Stock always up to date",
    row1Text: "Add products with their available quantity, unit of measure and purchase price. The app automatically deducts from stock every time you register a sale, so you always know how much you have left.",
    row1List: ["Add and edit products in seconds", "Units: kg, pound, arroba, unit", "Visual alerts when stock is low", "Merchandise entry history"],
    row2Badge: "Sales",
    row2Title: "Register every sale in seconds",
    row2Text: "Just by selecting the product and quantity, the app calculates the total and saves it with date and time. At the end of the day you get a clear summary of everything you sold.",
    row2List: ["Quick registration from the main screen", "Automatic total calculation", "Sales history by day / week / month", "Edit and delete records"],
    row3Badge: "Profit",
    row3Title: "Know exactly how much you earn",
    row3Text: "The app automatically calculates the difference between what you paid for the merchandise and what you charged when selling it. No spreadsheets, no calculator, no confusion.",
    row3List: ["Net profit by product and period", "Sales chart for the last 7 days", "Daily, weekly and monthly summary", "Comparison between periods"],
    phoneNewSale: "🛒 New Sale",
    phoneProduct: "Product",
    phoneQty: "Quantity",
    phonePricePerKg: "Price per kg",
    phoneTotal: "Total",
    phoneRegisterSale: "✓ Register Sale",
    phoneDashboard: "💰 Dashboard",
    phoneNetProfit: "Net Profit",
    phoneCost: "Cost",
    stackTitle: "Tech Stack",
    stackFrontend: "Frontend / App",
    stackData: "Data & Storage",
    techFrontend: [
      { name: "React Native", desc: "Main framework for the Android app", icon: "⚛️" },
      { name: "Expo", desc: "Simplified build and distribution", icon: "📱" },
      { name: "React Navigation", desc: "Navigation between screens", icon: "🧭" },
      { name: "Victory Native", desc: "Charts and data visualization", icon: "📊" },
    ],
    techData: [
      { name: "SQLite", desc: "Local database with no internet connection", icon: "🗄️" },
      { name: "AsyncStorage", desc: "Persistence of user settings", icon: "💾" },
      { name: "Context API", desc: "Global app state management", icon: "🔄" },
      { name: "Android APK", desc: "Direct distribution without an app store", icon: "🤖" },
    ],
    ctaTitle: "Do you have an idea for an app?",
    ctaText: "I build custom Android mobile apps for small and medium businesses. Simple, fast and hassle-free.",
    ctaButton: "Let's Talk About Your Project",
    ctaSecondary: "See More Projects",
  },
};

const AppFruver = () => {
    const { locale } = useRouter();
    const c = content[locale] || content.es;
    return (
        <Layout>
            <SEO
                title={c.seoTitle}
                description={c.seoDescription}
                keywords={["app android fruver", "control de inventario verduleria", "app ventas fruteria", "gestion fruver android", "react native inventario", "juan camilo salazar"]}
                image="/images/camiloPaginaWeb.webp"
                imageAlt={c.seoImageAlt}
                type="website"
                category="Desarrollo Móvil"
            />

            <main className="font-sans text-slate-900 dark:text-slate-100">

                {/* Hero Section */}
                <section
                    className="relative w-full overflow-hidden flex flex-col items-center px-6 py-12 md:py-24 lg:py-32"
                    style={{
                        color: '#ffffff',
                        backgroundImage: "linear-gradient(to right, rgba(20, 83, 45, 0.92), rgba(34, 197, 94, 0.75), rgba(21, 128, 61, 0.92))",
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
                        {/* Text */}
                        <div className="w-full lg:flex-1 max-w-2xl lg:max-w-none text-center lg:text-left z-20">
                            <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 inline-block backdrop-blur-sm border border-white/10 shadow-lg">
                                {c.badge}
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
                                {c.heroTitlePre}<span className="text-[#bbf7d0]">{c.heroTitleHl}</span>
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {c.heroSubtitle}
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                                {["React Native", "Android", "SQLite", "Expo"].map((tech) => (
                                    <span key={tech} className="bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Phone mockup illustration */}
                        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end items-center z-10 mt-6 lg:mt-0">
                            <div className="animate-[float_5s_ease-in-out_infinite] drop-shadow-2xl flex gap-4 lg:gap-6 items-end">
                                {/* Phone 1 */}
                                <div className="w-36 md:w-44 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-3 shadow-2xl">
                                    <div className="bg-[#14532d] rounded-[1.5rem] overflow-hidden h-64 md:h-80 flex flex-col">
                                        <div className="bg-[#166534] px-4 py-3 flex items-center justify-between">
                                            <span className="text-white text-xs font-bold">{c.phoneInventory}</span>
                                            <span className="text-green-300 text-xs">●</span>
                                        </div>
                                        <div className="flex-1 p-3 flex flex-col gap-2">
                                            {[
                                                { name: "Manzana", qty: "48 kg", color: "bg-red-400" },
                                                { name: "Banano", qty: "30 kg", color: "bg-yellow-400" },
                                                { name: "Tomate", qty: "22 kg", color: "bg-red-500" },
                                                { name: "Papa", qty: "60 kg", color: "bg-amber-600" },
                                                { name: "Limón", qty: "15 kg", color: "bg-lime-400" },
                                            ].map((item) => (
                                                <div key={item.name} className="flex items-center gap-2 bg-white/10 rounded-xl px-2 py-1.5">
                                                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`}></span>
                                                    <span className="text-white text-[10px] font-medium flex-1">{item.name}</span>
                                                    <span className="text-green-300 text-[10px] font-bold">{item.qty}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Phone 2 — taller, center */}
                                <div className="w-36 md:w-44 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-3 shadow-2xl mb-8">
                                    <div className="bg-[#14532d] rounded-[1.5rem] overflow-hidden h-72 md:h-96 flex flex-col">
                                        <div className="bg-[#166534] px-4 py-3 flex items-center justify-between">
                                            <span className="text-white text-xs font-bold">{c.phoneProfit}</span>
                                            <span className="text-green-300 text-xs">{c.phoneToday}</span>
                                        </div>
                                        <div className="flex-1 p-3 flex flex-col gap-3">
                                            <div className="bg-white/10 rounded-2xl p-3 text-center">
                                                <p className="text-green-300 text-[10px] font-bold uppercase tracking-wide mb-1">{c.phoneTotalDay}</p>
                                                <p className="text-white text-xl font-black">$184.500</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-white/10 rounded-xl p-2 text-center">
                                                    <p className="text-green-300 text-[9px] font-bold">{c.phoneSales}</p>
                                                    <p className="text-white text-sm font-black">37</p>
                                                </div>
                                                <div className="bg-white/10 rounded-xl p-2 text-center">
                                                    <p className="text-green-300 text-[9px] font-bold">{c.phoneProfitLabel}</p>
                                                    <p className="text-white text-sm font-black">$52k</p>
                                                </div>
                                            </div>
                                            {/* Mini bar chart */}
                                            <div className="flex items-end gap-1 h-14 px-1">
                                                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-green-400/60 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                                ))}
                                            </div>
                                            <p className="text-white/40 text-[9px] text-center">{c.phoneLast7}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone 3 */}
                                <div className="w-36 md:w-44 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-3 shadow-2xl">
                                    <div className="bg-[#14532d] rounded-[1.5rem] overflow-hidden h-64 md:h-80 flex flex-col">
                                        <div className="bg-[#166534] px-4 py-3 flex items-center justify-between">
                                            <span className="text-white text-xs font-bold">{c.phoneSalesTitle}</span>
                                            <span className="text-green-300 text-xs">Live</span>
                                        </div>
                                        <div className="flex-1 p-3 flex flex-col gap-2">
                                            {[
                                                { hora: "09:14", prod: "Banano 2kg", val: "$4.200" },
                                                { hora: "09:32", prod: "Papa 5kg", val: "$9.500" },
                                                { hora: "10:05", prod: "Tomate 1kg", val: "$3.800" },
                                                { hora: "10:47", prod: "Manzana 3kg", val: "$7.200" },
                                            ].map((v) => (
                                                <div key={v.hora} className="bg-white/10 rounded-xl px-2 py-1.5">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <span className="text-white/60 text-[9px]">{v.hora}</span>
                                                        <span className="text-green-300 text-[10px] font-bold">{v.val}</span>
                                                    </div>
                                                    <p className="text-white text-[10px] font-medium">{v.prod}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.f1Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{c.f1Text}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.f2Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{c.f2Text}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-600 dark:text-lime-400">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

                {/* Detail features */}
                <section className="px-6 py-20 bg-slate-50 dark:bg-slate-800/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-20">

                            {/* Row 1 */}
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                                <div className="flex-1 text-center md:text-left">
                                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">{c.row1Badge}</span>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{c.row1Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{c.row1Text}</p>
                                    <ul className="flex flex-col gap-3">
                                        {c.row1List.map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="w-52 bg-[#14532d] rounded-[2rem] p-4 shadow-2xl">
                                        <div className="bg-[#166534] rounded-2xl px-4 py-3 mb-3 flex items-center justify-between">
                                            <span className="text-white font-black text-sm">{c.phoneInventory}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {[
                                                { name: "🍌 Banano", qty: "30 kg", pct: 60, color: "bg-yellow-400" },
                                                { name: "🍅 Tomate", qty: "22 kg", pct: 44, color: "bg-red-400" },
                                                { name: "🥔 Papa", qty: "60 kg", pct: 90, color: "bg-amber-500" },
                                                { name: "🍋 Limón", qty: "8 kg", pct: 16, color: "bg-lime-400" },
                                                { name: "🫑 Pimentón", qty: "12 kg", pct: 30, color: "bg-orange-400" },
                                            ].map(item => (
                                                <div key={item.name} className="bg-white/10 rounded-xl p-2.5">
                                                    <div className="flex justify-between items-center mb-1.5">
                                                        <span className="text-white text-xs font-semibold">{item.name}</span>
                                                        <span className="text-green-300 text-xs font-bold">{item.qty}</span>
                                                    </div>
                                                    <div className="w-full bg-white/10 rounded-full h-1.5">
                                                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.pct}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
                                <div className="flex-1 text-center md:text-left">
                                    <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">{c.row2Badge}</span>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{c.row2Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{c.row2Text}</p>
                                    <ul className="flex flex-col gap-3">
                                        {c.row2List.map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="w-52 bg-[#14532d] rounded-[2rem] p-4 shadow-2xl">
                                        <div className="bg-[#166534] rounded-2xl px-4 py-3 mb-3 flex items-center justify-between">
                                            <span className="text-white font-black text-sm">{c.phoneNewSale}</span>
                                        </div>
                                        <div className="flex flex-col gap-2.5">
                                            <div className="bg-white/10 rounded-xl p-3">
                                                <p className="text-white/60 text-[10px] mb-1">{c.phoneProduct}</p>
                                                <p className="text-white font-bold text-sm">🍌 Banano</p>
                                            </div>
                                            <div className="bg-white/10 rounded-xl p-3">
                                                <p className="text-white/60 text-[10px] mb-1">{c.phoneQty}</p>
                                                <p className="text-white font-bold text-sm">2 kg</p>
                                            </div>
                                            <div className="bg-white/10 rounded-xl p-3">
                                                <p className="text-white/60 text-[10px] mb-1">{c.phonePricePerKg}</p>
                                                <p className="text-white font-bold text-sm">$2.100</p>
                                            </div>
                                            <div className="bg-green-500 rounded-xl p-3 text-center">
                                                <p className="text-white/80 text-[10px]">{c.phoneTotal}</p>
                                                <p className="text-white font-black text-lg">$4.200</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-2.5 text-center">
                                                <p className="text-white font-bold text-xs">{c.phoneRegisterSale}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                                <div className="flex-1 text-center md:text-left">
                                    <span className="inline-block bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">{c.row3Badge}</span>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{c.row3Title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{c.row3Text}</p>
                                    <ul className="flex flex-col gap-3">
                                        {c.row3List.map(item => (
                                            <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <svg className="w-5 h-5 text-lime-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="w-52 bg-[#14532d] rounded-[2rem] p-4 shadow-2xl">
                                        <div className="bg-[#166534] rounded-2xl px-4 py-3 mb-3 flex items-center justify-between">
                                            <span className="text-white font-black text-sm">{c.phoneDashboard}</span>
                                            <span className="text-green-300 text-xs">Hoy</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-green-500/30 border border-green-500/40 rounded-xl p-3 text-center">
                                                <p className="text-green-300 text-[10px] font-bold uppercase tracking-wide">{c.phoneNetProfit}</p>
                                                <p className="text-white text-2xl font-black">$52.000</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-white/10 rounded-xl p-2 text-center">
                                                    <p className="text-white/60 text-[9px]">{c.phoneSales}</p>
                                                    <p className="text-white font-black">$184k</p>
                                                </div>
                                                <div className="bg-white/10 rounded-xl p-2 text-center">
                                                    <p className="text-white/60 text-[9px]">{c.phoneCost}</p>
                                                    <p className="text-white font-black">$132k</p>
                                                </div>
                                            </div>
                                            {/* Bar chart */}
                                            <div className="bg-white/5 rounded-xl p-2">
                                                <p className="text-white/40 text-[9px] mb-2">{c.phoneLast7}</p>
                                                <div className="flex items-end gap-1 h-12">
                                                    {[40, 65, 50, 80, 45, 90, 70].map((h, i) => (
                                                        <div key={i} className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-green-400' : 'bg-green-400/40'}`} style={{ height: `${h}%` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="px-6 py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 justify-center">
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{c.stackTitle}</span>
                            <span className="h-px w-16 bg-slate-300 dark:bg-slate-700"></span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
                                <div className="p-10 flex flex-col gap-6">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{c.stackFrontend}</h3>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            ...c.techFrontend
                                        ].map(t => (
                                            <div key={t.name} className="flex items-start gap-4">
                                                <span className="text-2xl">{t.icon}</span>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col gap-6">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{c.stackData}</h3>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            ...c.techData
                                        ].map(t => (
                                            <div key={t.name} className="flex items-start gap-4">
                                                <span className="text-2xl">{t.icon}</span>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 py-24 text-center bg-slate-50 dark:bg-slate-800/30">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 text-green-600 dark:text-green-400">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            {c.ctaTitle}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-xl md:max-w-xl mx-auto">
                            {c.ctaText}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                            <Link
                                href="/contact"
                                className="bg-green-700 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_10px_30px_rgba(21,128,61,0.4)] transition-all transform hover:-translate-y-1 text-center"
                            >
                                {c.ctaButton}
                            </Link>
                            <Link
                                href="/proyectos"
                                className="border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-green-600 dark:hover:border-green-400 px-10 py-5 rounded-2xl font-bold text-xl transition-all text-center"
                            >
                                {c.ctaSecondary}
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

export default AppFruver;

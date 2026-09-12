import { useEffect, useRef, useState } from "react";

// Guion de la conversación. Los pasos `tool` son la diferencia visual entre un
// chatbot con guion y un agente que consulta el PMS y ejecuta la reserva.
const SCRIPT = [
    {
        type: "guest",
        text: "Hola, buenas noches 👋 ¿Tienen una habitación doble libre del 12 al 14 de diciembre?",
    },
    {
        type: "tool",
        label: "Consultando disponibilidad",
        detail: "PMS · doble · 12–14 dic",
    },
    {
        type: "agent",
        text: "¡Hola! Sí, nos quedan dos opciones para esas fechas:\n\n• Doble Superior con vista al jardín — $320.000 / noche\n• Doble Deluxe con balcón — $410.000 / noche\n\nAmbas incluyen wifi y parqueadero. ¿Cuál prefieres?",
    },
    {
        type: "guest",
        text: "La Superior está bien. ¿El desayuno va incluido?",
    },
    {
        type: "agent",
        text: "Sí, desayuno bufé incluido de 6:30 a 10:00 a. m. 🥐\n\nY como llegas un viernes, puedo añadir late check-out hasta las 3 p. m. por $45.000. ¿Te lo agrego?",
    },
    {
        type: "guest",
        text: "Perfecto, agrégalo. Confirmo la reserva.",
    },
    {
        type: "tool",
        label: "Creando reserva",
        detail: "2 noches · 1 upsell · pago por link seguro",
    },
    {
        type: "agent",
        text: "¡Listo! Reserva confirmada ✅\n\nCódigo: **HTL-4827**\nDoble Superior · 12–14 dic · late check-out\n\nTe envié el detalle y el link de pago a tu correo. ¿Necesitas transporte desde el aeropuerto?",
    },
];

// Renderiza **negritas** y saltos de línea sin meter HTML crudo en el DOM.
function renderText(text) {
    return text.split("\n").map((line, i) => (
        <span key={i} className="block">
            {line.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
                chunk.startsWith("**") && chunk.endsWith("**") ? (
                    <strong key={j} className="font-bold">
                        {chunk.slice(2, -2)}
                    </strong>
                ) : (
                    chunk
                )
            )}
        </span>
    ));
}

export default function HotelAgentDemo({ className = "" }) {
    const [visible, setVisible] = useState(0);
    const [typing, setTyping] = useState(false);
    const [reduced, setReduced] = useState(false);
    const scrollRef = useRef(null);

    // Con movimiento reducido mostramos la conversación completa, sin temporizadores.
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const onChange = (e) => setReduced(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (reduced) {
            setVisible(SCRIPT.length);
            setTyping(false);
            return;
        }
        if (visible >= SCRIPT.length) {
            setTyping(false);
            return;
        }

        const next = SCRIPT[visible];
        const pause = next.type === "guest" ? 950 : 650;
        const think = next.type === "tool" ? 1100 : 1500;

        let revealTimer;
        const pauseTimer = setTimeout(() => {
            if (next.type !== "guest") setTyping(true);
            revealTimer = setTimeout(
                () => {
                    setTyping(false);
                    setVisible((v) => v + 1);
                },
                next.type === "guest" ? 0 : think
            );
        }, pause);

        return () => {
            clearTimeout(pauseTimer);
            clearTimeout(revealTimer);
        };
    }, [visible, reduced]);

    // Solo desplaza el contenedor del chat, nunca la página.
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [visible, typing]);

    const done = visible >= SCRIPT.length;

    return (
        <div
            className={`relative flex flex-col rounded-3xl border border-white/15 bg-[#0b1220]/90 shadow-[0_24px_70px_rgba(2,8,23,0.55)] backdrop-blur-xl overflow-hidden ${className}`}
        >
            {/* Cabecera del chat */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
                <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-lg">
                        🤖
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0b1220] bg-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                        Agente de Reservas
                    </p>
                    <p className="text-xs font-medium text-emerald-300">
                        En línea · responde en segundos
                    </p>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    WhatsApp
                </span>
            </div>

            {/* Conversación */}
            <div
                ref={scrollRef}
                aria-live="polite"
                className="flex h-[420px] flex-col gap-3 overflow-y-auto px-4 py-5 sm:px-5"
            >
                {SCRIPT.slice(0, visible).map((msg, i) => {
                    if (msg.type === "tool") {
                        return (
                            <div key={i} className="my-1 flex justify-center">
                                <div className="flex w-full max-w-[92%] items-center gap-3 rounded-xl border border-teal-400/30 bg-teal-400/10 px-3.5 py-2.5">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-400/20 text-xs">
                                        ⚙️
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-teal-200">
                                            {msg.label}
                                        </p>
                                        <p className="truncate font-mono text-[11px] text-teal-300/70">
                                            {msg.detail}
                                        </p>
                                    </div>
                                    <span className="ml-auto shrink-0 text-xs font-bold text-emerald-400">
                                        ✓
                                    </span>
                                </div>
                            </div>
                        );
                    }

                    const isGuest = msg.type === "guest";
                    return (
                        <div
                            key={i}
                            className={`flex ${isGuest ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                                    isGuest
                                        ? "rounded-br-md bg-gradient-to-br from-sky-500 to-blue-600 text-white"
                                        : "rounded-bl-md border border-white/10 bg-slate-800/90 text-slate-100"
                                }`}
                            >
                                {renderText(msg.text)}
                            </div>
                        </div>
                    );
                })}

                {typing && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-slate-800/90 px-4 py-3.5">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        </div>
                    </div>
                )}
            </div>

            {/* Pie con el resultado y el reinicio */}
            <div className="flex items-center gap-3 border-t border-white/10 bg-white/5 px-5 py-3.5">
                <p className="flex-1 text-xs font-medium text-slate-400">
                    {done ? (
                        <span className="text-emerald-300">
                            Reserva cerrada sin intervención humana · 1:24 min
                        </span>
                    ) : (
                        "Conversación real de reserva, paso a paso…"
                    )}
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setTyping(false);
                        setVisible(0);
                    }}
                    className="shrink-0 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
}

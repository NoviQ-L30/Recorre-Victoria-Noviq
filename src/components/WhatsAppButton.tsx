"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function WhatsAppButton() {
    const [hover, setHover] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [pulse, setPulse] = useState(false);
    const [showClose, setShowClose] = useState(false);

    const hideTimeout = useRef<NodeJS.Timeout | null>(null);

    const phoneNumber = "528341234567";
    const message = "Hola, quiero información sobre las rutas.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // 🔥 Mostrar al 80% del scroll
    useEffect(() => {
        const handleScroll = () => {
            if (dismissed) return;

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            const scrollPercentage =
                (scrollTop + windowHeight) / fullHeight;

            if (scrollPercentage >= 0.8) {
                setVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dismissed]);

    // 🔥 Pulse cada 30 segundos
    useEffect(() => {
        if (!visible || dismissed) return;

        const interval = setInterval(() => {
            setPulse(true);
            setTimeout(() => setPulse(false), 3000);
        }, 15000);

        return () => clearInterval(interval);
    }, [visible, dismissed]);

    if (!visible || dismissed) return null;

    const handleMouseEnter = () => {
        setHover(true);
        setShowClose(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };

    const handleMouseLeave = () => {
        setHover(false);
        hideTimeout.current = setTimeout(() => {
            setShowClose(false);
        }, 3000);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
        fixed bottom-6 right-6 z-50 flex items-center
        opacity-0 translate-y-[-20px]
        animate-fadeSlideIn
      "
        >
            {hover && (
                <div className="mr-3 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md text-sm transition-all duration-300">
                    ¿Necesitas ayuda?
                </div>
            )}

            <div className="relative">
                {/* Halo animado */}
                {pulse && (
                    <span className="absolute inset-0 rounded-full bg-green-500 opacity-60 animate-ping"></span>
                )}

                {/* Botón cerrar transparente */}
                {showClose && (
                    <button
                        onClick={() => setDismissed(true)}
                        className="
    absolute -top-4 -right-4
    bg-[#FFF7F7]/80
    text-gray-700
    text-xs
    rounded-full h-6 w-6 flex items-center justify-center
    opacity-80 hover:opacity-100
    transition-all duration-200
  "
                    >
                        ✕
                    </button>
                )}

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center
                     bg-green-500 hover:bg-green-600
                     text-white
                     w-14 h-14
                     rounded-full
                     shadow-lg hover:scale-110
                     transition-all duration-300"
                >
                    <FaWhatsapp size={26} />
                </a>
            </div>
        </div>
    );
}
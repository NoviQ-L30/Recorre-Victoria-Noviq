"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, X } from "lucide-react";

interface WeatherData {
  temp: number;
  description: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");

        if (!res.ok) {
          throw new Error(`Weather request failed: ${res.status}`);
        }

        const data = await res.json();

        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching weather:", fetchError);
        setError("No disponible");
      }
    }

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      setShowHint(false);
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
      return;
    }

    const hintIntervalId = setInterval(() => {
      setShowHint(true);

      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }

      hintTimeoutRef.current = setTimeout(() => {
        setShowHint(false);
      }, 3500);
    }, 30000);

    return () => {
      clearInterval(hintIntervalId);
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
    };
  }, [isExpanded]);

  // helper para formatear la fecha
  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="absolute top-16 left-6 z-[9999] pointer-events-auto">
      {showHint && !isExpanded && (
        <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-lg">
          abreme para saber el clima ☀️
        </div>
      )}

      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Abrir widget del clima"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:bg-white/20"
        >
          <Sun size={26} />
        </button>
      ) : (
        <div
          className="
            relative
            backdrop-blur-md
            bg-white/10
            border border-white/20
            rounded-xl
            px-5 py-4
            shadow-xl
            text-white
            w-[220px]
          "
        >
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Cerrar widget del clima"
            className="absolute right-2 top-2 rounded-full p-1 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X size={14} />
          </button>

          {/* encabezado con ciudad y fecha juntos */}
          <div className="flex items-baseline space-x-2">
            <p className="text-sm opacity-80">Ciudad Victoria</p>
            <p className="text-s opacity-70">{getFormattedDate()}</p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-semibold">
              {weather ? `${Math.round(weather.temp)}\u00B0C` : `--\u00B0C`}
            </span>
            <Sun size={28} />
          </div>

          <p className="mt-1 text-sm capitalize opacity-90">
            {weather?.description ?? error ?? "Cargando..."}
          </p>
        </div>
      )}
    </div>
  );
}

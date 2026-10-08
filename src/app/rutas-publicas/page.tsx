"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Compass, MapPin, Search } from "lucide-react";
import { Footer, Navbar } from "@/components";

type RouteCategory = "Historia" | "Cultura" | "Naturaleza";

type PublicRoute = {
  id: string;
  title: string;
  category: RouteCategory;
  description: string;
  image: string;
  imageAlt: string;
  stops: string[];
};

const routes: PublicRoute[] = [
  {
    id: "historica",
    title: "Ruta histórica",
    category: "Historia",
    description:
      "Un paseo por algunos de los sitios que cuentan la historia de Ciudad Victoria.",
    image: "/image/edificio.png",
    imageAlt: "Edificio representativo de Ciudad Victoria",
    stops: [
      "Palacio de Gobierno",
      "Catedral de Ciudad Victoria",
      "Museo Regional",
      "Planetario y Tamux",
    ],
  },
  {
    id: "arte-cultura",
    title: "Arte y cultura",
    category: "Cultura",
    description:
      "Espacios y actividades para acercarse a la vida cultural de la ciudad.",
    image: "/image/caras.png",
    imageAlt: "Máscaras que representan las artes escénicas",
    stops: [
      "Teatro Amalia G. de Castillo Ledón",
      "Casa del Arte de Ciudad Victoria",
      "Eventos musicales y danzas",
      "Marchas y desfiles locales",
    ],
  },
  {
    id: "naturaleza-activa",
    title: "Naturaleza activa",
    category: "Naturaleza",
    description:
      "Miradores, senderos y rincones al aire libre para descubrir el entorno local.",
    image: "/image/monta.png",
    imageAlt: "Montañas y paisaje natural de Tamaulipas",
    stops: [
      "El Ojito de Santa Ana",
      "Mirador de Ciudad Victoria",
      "Camino Real a Tula (Camino Rojo)",
      "Río San Marcos",
    ],
  },
];

const categories = ["Todas", "Historia", "Cultura", "Naturaleza"] as const;

export default function RutasPublicas() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Todas");
  const [search, setSearch] = useState("");
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const normalizedSearch = search.trim().toLocaleLowerCase("es");
  const visibleRoutes = routes.filter((route) => {
    const matchesCategory = activeCategory === "Todas" || route.category === activeCategory;
    const searchableContent = `${route.title} ${route.category} ${route.description} ${route.stops.join(" ")}`;
    return matchesCategory && searchableContent.toLocaleLowerCase("es").includes(normalizedSearch);
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#f1f5f3] text-[#172b2c]">
      <Navbar />

      <section className="relative isolate min-h-[540px] overflow-hidden bg-[#366f78] px-5 pb-20 pt-36 text-white sm:px-10 lg:min-h-[590px] lg:px-16 lg:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(19,55,61,0.96),rgba(45,111,120,0.88)_58%,rgba(89,141,137,0.78))]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 top-12 -z-10 h-[430px] w-[430px] rounded-full border border-white/15 sm:right-[8%] sm:h-[520px] sm:w-[520px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-2 top-28 -z-10 h-[320px] w-[320px] rounded-full border border-white/15 sm:right-[14%] sm:h-[390px] sm:w-[390px]"
        />

        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#f7dfa0]">
              <Compass size={17} aria-hidden="true" />
              Recorre Victoria
            </p>
            <h1 className="font-gentium text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">
              Rutas para vivir la ciudad
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Historia, cultura y naturaleza en recorridos para conocer Ciudad Victoria a tu propio ritmo.
            </p>
            <a
              href="#catalogo-rutas"
              className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#f7dfa0] bg-[#f7dfa0] px-5 py-3 font-semibold text-[#243c3d] transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Ver recorridos <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="relative mx-auto hidden h-[330px] w-full max-w-[470px] sm:block lg:h-[360px]">
            <div className="absolute inset-x-8 bottom-5 top-5 rotate-3 border border-white/30" />
            <div className="absolute inset-0 overflow-hidden border-[10px] border-white/90 shadow-[0_24px_70px_rgba(13,35,38,0.28)]">
              <Image
                src="/image/Monte-FONDO.png"
                alt="Paisaje de montaña alrededor de Ciudad Victoria"
                fill
                priority
                sizes="(min-width: 1024px) 470px, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163a3f]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-medium text-white">
                <MapPin size={17} aria-hidden="true" />
                Ciudad Victoria, Tamaulipas
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo-rutas" className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-8 border-b border-[#c8d5d1] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#54838a]">Explora por interés</p>
            <h2 className="font-gentium text-4xl text-[#183a3e] sm:text-5xl">Elige tu recorrido</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#536668]">
              Encuentra una ruta y consulta sus puntos de interés. Este catálogo puede crecer con nuevos recorridos.
            </p>
          </div>

          <label className="flex min-h-12 w-full items-center gap-3 border border-[#b8c9c5] bg-white px-4 focus-within:border-[#3e7d83] focus-within:ring-2 focus-within:ring-[#3e7d83]/20 lg:max-w-[330px]">
            <Search size={19} className="shrink-0 text-[#54838a]" aria-hidden="true" />
            <span className="sr-only">Buscar rutas o puntos de interés</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar ruta o lugar"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#172b2c] outline-none placeholder:text-[#718184]"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 py-6" role="group" aria-label="Filtrar rutas por categoría">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-10 border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e7d83] ${
                  isActive
                    ? "border-[#315e63] bg-[#315e63] text-white"
                    : "border-[#b8c9c5] bg-white text-[#36575a] hover:border-[#54838a] hover:bg-[#e5efec]"
                }`}
              >
                {category}
              </button>
            );
          })}
          <span className="ml-auto self-center text-sm text-[#647779]" aria-live="polite">
            {visibleRoutes.length} {visibleRoutes.length === 1 ? "ruta" : "rutas"}
          </span>
        </div>

        {visibleRoutes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleRoutes.map((route, index) => {
              const isExpanded = expandedRoute === route.id;
              return (
                <article
                  key={route.id}
                  className="group flex min-w-0 flex-col border border-[#d5dfdc] bg-white shadow-[0_8px_28px_rgba(29,63,64,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(29,63,64,0.13)]"
                >
                  <div className="relative h-[220px] overflow-hidden bg-[#dce8e3]">
                    <Image
                      src={route.image}
                      alt={route.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                      className="object-contain p-8 transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-[#f7dfa0] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#314b4c]">
                      {route.category}
                    </span>
                    <span className="absolute bottom-4 right-4 font-gentium text-5xl text-white/90 drop-shadow-md">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-gentium text-3xl text-[#183a3e]">{route.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#5b6e70]">{route.description}</p>

                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={`stops-${route.id}`}
                      onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                      className="mt-6 flex min-h-11 w-full items-center justify-between border-t border-[#dbe4e1] pt-4 text-left text-sm font-bold text-[#315e63] transition hover:text-[#a06d25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e7d83]"
                    >
                      <span>{isExpanded ? "Ocultar puntos" : "Ver puntos de interés"}</span>
                      {isExpanded ? <ArrowDown size={18} className="rotate-180" aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
                    </button>

                    {isExpanded && (
                      <ol id={`stops-${route.id}`} className="mt-4 space-y-3 border-l-2 border-[#d4b76d] pl-4">
                        {route.stops.map((stop) => (
                          <li key={stop} className="flex items-start gap-2 text-sm leading-5 text-[#42595b]">
                            <MapPin size={15} className="mt-0.5 shrink-0 text-[#54838a]" aria-hidden="true" />
                            {stop}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-[#b8c9c5] bg-white px-6 py-14 text-center">
            <MapPin size={28} className="mx-auto text-[#54838a]" aria-hidden="true" />
            <p className="mt-4 font-gentium text-2xl text-[#183a3e]">No encontramos recorridos</p>
            <p className="mt-2 text-sm text-[#647779]">Prueba con otro lugar o selecciona una categoría diferente.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
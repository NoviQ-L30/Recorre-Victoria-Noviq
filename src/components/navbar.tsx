"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
  Collapse,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  HomeIcon,
  IdentificationIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NAV_MENU = [
  { name: "Rutas públicas", icon: MapPinIcon, href: "/rutas-publicas" },
  { name: "HOME", icon: HomeIcon, href: "/" },
  { name: "Contactos", icon: IdentificationIcon, href: "/contactos" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);

  const lastScroll = React.useRef(0);
  const collapseRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [showHeader, setShowHeader] = React.useState(false);

  function handleOpen() {
    setShowHeader(true);
    setOpen(true);
  }

  function handleCloseWithAnimation() {
    setIsClosing(true);

    setTimeout(() => {
      setShowHeader(false); // 🔥 desmonta imagen primero
      setOpen(false);       // luego cierra collapse
      setIsClosing(false);
    }, 200);
  }

  // 🔥 Scroll (UNIFICADO)
  React.useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      setIsScrolling(currentScroll > 10);

      if (currentScroll <= 5 && open) {
        handleCloseWithAnimation();
      }

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScroll.current = currentScroll;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // 🔥 Click afuera + Escape
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (
        collapseRef.current &&
        !collapseRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        handleCloseWithAnimation();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleCloseWithAnimation();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color="transparent"
      className={`
    fixed top-0 z-[9998]
    transition-all duration-500 ease-in-out
    /* 👇 AGREGAR ESTO: Evita que la Navbar bloquee lo que hay detrás */
    pointer-events-none 
    
    ${visible ? "translate-y-0" : "-translate-y-full"}
    ${open
          ? "bg-white py-6 shadow-md"
          : isScrolling
            ? "backdrop-blur-md bg-white/70 py-3 shadow-sm"
            : "bg-transparent py-6"
        }
  `}
    >
      <div className="relative w-full flex items-center px-4 md:px-8 pointer-events-auto">
        <div className="flex-1" />

        {/* Menú centrado */}
        <ul
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            flex gap-6
            text-base sm:text-lg
            whitespace-nowrap
            transition-all duration-500
            ${isScrolling
              ? "opacity-0 pointer-events-none"
              : "opacity-100 text-white"
            }
          `}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <Link href={href}>
                <Typography
                  as="span"
                  variant="paragraph"
                  className="flex items-center gap-2 font-medium hover:text-gray-200 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                  {name}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa */}
        <div className="flex-1 flex justify-end">
          <IconButton
            ref={buttonRef}
            variant="text"
            onClick={open ? handleCloseWithAnimation : handleOpen}
            className={`transition-all duration-300 ${isScrolling ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <div className="relative w-7 h-7">
              <Bars3Icon
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100"
                  }`}
              />
              <XMarkIcon
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ${open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
                  }`}
              />
            </div>
          </IconButton>
        </div>
      </div>

      {/* Collapse */}
      <Collapse open={open} className="pointer-events-auto">
        <div
          ref={collapseRef}
          className="relative w-full max-w-[1800px] mx-auto px-8 md:px-12 md:rounded-2xl py-2"
        >
          {/* HEADER */}
          <div className="relative flex items-start justify-end mb-8">

            {/* Imagen título (posición absoluta para que no afecte layout) */}
            {showHeader && (
              <div className="absolute left-0 top-0">
                <img
                  src="/image/Titulo-navbar3.png"
                  alt="Visita esta maravillosa ciudad"
                  className={`
              w-72 md:w-96 h-auto object-contain
              transition-opacity duration-300 ease-in-out
              ${isClosing ? "opacity-0" : "opacity-100"}
            `}
                />
              </div>
            )}

            {/* Botón login (SIEMPRE fijo a la derecha) */}
            <div
              className="
          flex items-center gap-2
          bg-[#48809A]
          text-white
          px-6 py-3
          rounded-xl
          cursor-pointer
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_6px_18px_rgba(72,128,154,0.35)]
          active:scale-95
          mt-[35px]
        "
            >
              <Image
                src="/image/Usuario2.png"
                alt="Usuario"
                width={22}
                height={22}
                className="object-contain"
              />
              <span className="text-sm md:text-base tracking-wide">
                Inicio de sesión
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 mb-2 -mt-[25px]" />

          <div className="space-y-3">
            {NAV_MENU.map(({ name, icon: Icon, href }, index) => (
              <Link href={href} key={name}>
                <div
                  onClick={handleCloseWithAnimation}
                  className={`
        flex items-center justify-between
        w-full
        px-6 py-3
        rounded-xl
        border border-gray-100
        shadow-[0_2px_6px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]
        transition-all duration-300
        cursor-pointer
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm md:text-base">
                      {name}
                    </span>
                  </div>

                  <span className="text-gray-400 text-lg">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
"use client";
import React from "react";
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NAV_MENU = ["Rutas públicas", "HOME", "Contactos"];

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        className="flex items-center gap-2 font-medium text-black"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Izquierda: espacio vacío o logo */}
        <div className="w-1/3"></div>

        {/* Centro: Menú visible siempre */}
        <div className="w-1/3 flex justify-center">
          {!isScrolling && ( // Oculta el menú al hacer scroll
            <ul
              className={`flex items-center gap-6 text-lg ${
                isScrolling ? "text-black" : "text-white"
              }`}
            >
              {NAV_MENU.map((name) => (
                <li key={name}>
                  <Typography
                    as="a"
                    href="#"
                    variant="paragraph"
                    className="flex items-center gap-2 font-medium"
                  >
                    {name}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Derecha: Botón hamburguesa (solo visible con scroll) */}
        <div className="w-1/3 flex justify-end">
          {isScrolling && (
            <IconButton
              variant="text"
              onClick={handleOpen}
              color="black"
              className=""
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          )}
        </div>
      </div>

      {/* Menú colapsable (desplegable) */}
      <Collapse open={open}>
        <div className="container mx-auto bg-white rounded-lg py-4 px-6 mt-3 border-t border-gray-200">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map((name) => (
              <NavItem key={name}>{name}</NavItem>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;

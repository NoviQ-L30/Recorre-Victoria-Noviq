"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/FONDO-GOD.jpg')] bg-cover bg-no-repeat">
      {/* Fondo oscuro superpuesto */}
      <div className="absolute inset-0 h-full w-full bg-gray-900/75" />

      {/* Contenido principal */}
      <div className="grid min-h-screen px-8 relative z-10">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          {/* Título principal */}
          <Typography
            variant="h1"
            color="white"
            className="text-6xl"
          >
            Recorre Victoria
          </Typography>

          {/* Texto principal */}
          <Typography
            variant="lead"
            color="white"
            className="mt-4 mb-12 w-full text-lg md:max-w-full lg:max-w-3xl lg:text-xl"
          >
            Bienvenido a la página oficial de la ciudad de Victoria, Tamaulipas.
            Descubre todo lo que esta ciudad tiene para ofrecerte
          </Typography>

          {/* Texto de contacto */}
          <Typography
            variant="paragraph"
            color="white"
            className="mt-1 mb-7 font-medium uppercase text-base"
          >
            Contacta con nosotros:
          </Typography>

          {/* Iconos de redes sociales */}
          <div className="gap-8 flex">
            <IconButton
              variant="text"
              color="white"
              size="sm"
            >
              <i className="fa-brands fa-twitter text-xl" />
            </IconButton>
            <IconButton
              variant="text"
              color="white"
              size="sm"
            >
              <i className="fa-brands fa-facebook text-xl" />
            </IconButton>
            <IconButton
              variant="text"
              color="white"
              size="sm"
            >
              <i className="fa-brands fa-instagram text-xl" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

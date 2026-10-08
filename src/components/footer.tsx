import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Compañia",
    items: ["Sobre nosotros", "Carreras"],
  },
  {
    title: "Paginas",
    items: ["Iniciar sesión", "Registrar"],
  },
  {
    title: "Legal",
    items: ["Terminos", "Privacidad"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-0 w-full bg-[#FEE0C8] px-6 pt-16 pb-10 sm:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* PARTE SUPERIOR */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

          {/* TITULO */}
          <div>
            <Typography
              as="a"
              href="https://www.material-tailwind.com"
              target="_blank"
              variant="h4"
              className="mb-6"
            >
              Únete a nuestra comunidad
            </Typography>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" className="mb-4">
                  {title}
                </Typography>

                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      className="block py-1 font-normal text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* PARTE INFERIOR */}
        <div className="mt-16 border-t border-black/10 pt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div className="max-w-[600px]">
            <Typography variant="h5" className="mb-2">
              El camino hacia los sueños se construye con 3 grandes pilares:
            </Typography>
            <Typography className="text-gray-700">
              Esfuerzo constante, dedicación inquebrantable y la firme decisión
              de nunca rendirse.
            </Typography>
          </div>

          <Typography className="text-gray-700 text-center md:text-right">
            &copy; {CURRENT_YEAR} Pagina hecha con tailwind por Noviq_L30.
          </Typography>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
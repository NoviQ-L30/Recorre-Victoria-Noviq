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
    <footer className="mt-10 px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography
            as="a"
            href="https://www.material-tailwind.com"
            target="_blank"
            variant="h4"
            className="mb-6"
          >
            Únete a nuestra comunidad
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-4"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-center gap-y-4 gap-x-8 border-t border-blue-gray-50 py-6 md:justify-between">
          <div className="text-center md:text-start">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              El camino hacia los sueños se construye con 3 grandes pilares:
            </Typography>
            <Typography
              className="font-normal !text-gray-700"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Esfuerzo constante, dedicación inquebrantable y la firme decisión
              de nunca rendirse.
            </Typography>
          </div>
          <Typography
            color="gray"
            className="text-center font-normal !text-gray-700"
          >
            &copy; {CURRENT_YEAR}{" "}
            <a href="https://www.material-tailwind.com" target="_blank">
              Pagina hecha con tailwind
            </a>{" "}
            por{" "}
            <a href="" target="_blank">
              Noviq_L30
            </a>
            .
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

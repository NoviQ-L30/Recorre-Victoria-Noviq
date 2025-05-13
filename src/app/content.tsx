"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import DropdownButton from "@/components/DropdownButton";
import { Katibeh } from "next/font/google";
import { Inria_Serif } from "next/font/google";
import NoticiasRotativas from "@/components/NoticiasRotativas";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// IMPORTACIÓN DINÁMICA CON SSRS DESACTIVADO
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const katibeh = Katibeh({ subsets: ["latin"], weight: "400" });
const inriaSerif = Inria_Serif({ subsets: ["latin"], weight: "400" });

const images = [
  "/image/Imagen-Car3d-1.png",
  "/image/Imagen-Car3d-2.png",
  "/image/Imagen-Car3d-3.jpeg",
  "/image/Imagen-Car3d-4.jpeg",
  "/image/Imagen-Car3d-5.png",
  "/image/Imagen-Car3d-6.png",
];

// Lista de datos curiosos
const DATOS_CURIOSOS = [
  {
    texto:
      "Hay un camino donde la gente hace ejercicio y sube a ver una bandera de 6 metros donde puedes ver toda la ciudad.",
    imagen: "/image/FirmaMural.png",
  },
  {
    texto:
      "En esta misma ciudad, en el panteón del 0, se llevo a cabo el fusilamiento de un revolucionario y educador, conocido como Alberto Carrera Torres el 16 de febrero de 1917.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto: "En esta casa en 1989 no paso absolutamente nada.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "En el oxxo de Av Rosales con Venustiano Carranza, hay una piedra que indicaba el limite de la ciudad en el siglo XIX.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto:
      "Hay una cueva algo escondida en la ciudad, llamada la cueva del indio cerca del tamux (el planetario).",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Cerca de la torre de cristal, hace unos años atrás había una foza de agua a la que mucha gente tenía miedo de lo peligrosa que era para las personas, decían que estaba tan profunda que no se podía ver el fondo.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto:
      'Hay un lugar llamado "La casona" donde mucha gente iba a hacer exploraciones y rituales dentro de la ciudad.',
    imagen: "/image/Mariposas.png",
  },
  {
    texto: "Hay un cuartel militar justo en la parte de detrás del cbtis24.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto:
      'Existe un lugar al que llamaban "El puente negro" donde antes pasaba el ferrocarril en victoria, muchos dicen que se le dio ese nombre por las muertes que pasaron ahí, y otros aseguran que es por las apariciones que se ven pasando las 12pm.',
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Hay un desnivel que pasa justo por las vías del tren, en epocas de lluvia ese lugar parece una picina.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto:
      "En 1900s había una estación de tren que te podia llevar de victoria a tula, reynosa y muchos otros sitios, esto facilitaba mucho moverse antes, y no era un transporte para nada lento.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "En lo que antes era la comisión justo a la izquierda de soriana tamatan, había una alarma que sonaba a mediodía, y a la gente nueva que llegaba nunca faltaba el susto por el ruido tan fuerte.",
    imagen: "/image/MisterioPiedra.png",
  },
  {
    texto:
      "A principios del 2002 y semejantes, se escuchaba rugir al leon del zoologico de victoria, su retumbar se sentía a muchos metros de distancia.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "El río san marcos, como hoy todos lo conocemos, pequeño que tiende a secarse en temporadas, no era nada, comparado a lo que era antes, antes llegaba hasta lo más alto del río, llegando a desbordar la calle y alcanzar con el agua los puentes del 8 y 9",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Se dice que el río san marcos, perdió toda su fuerza por un extraño suceso, se dice que bajó su potencia por la muerte de un sacerdote en él, y que cada que vuelve a crecer, es porque alguien más es llevado por el río.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "El río san marcos en temporada de lluvia estaba tan lleno que en muchas ocasiones arrastraba gente río abajo, desgraciadamente la mayoría de la gente fallecia cuando era atrapada por el río.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      'Hace bastante años atrás ciudad victoria casi fue arrasado por un desastre natural en el que todos la pasaron mal, llamado "El huracan gilberto" que de tanto desastre ocasionado todas las noticias hablaban de él.',
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "En el río san marcos cada cierto tiempo en la ciudad se celebra y se llena de alegría el sitio con musica, comida y eventos que divierten a los ciudadanos que visitan este evento.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      'Se cuenta que hace bastantes años ya, el sitio conocido como "El chaparral" se apareció el diablo bailando entre la multitud de gente.',
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Hace muchísimo tiempo atrás, alrededor de los 1800s, hubo una mañana que en Ciudad Victoria amanecieron las calles llenas de nieve, y la gente no sabía que hacer, ya que nunca había pasado algo así.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "En Ciudad Victoria, es el único lugar en el mundo donde se puede decir orgullosamente que las flautas son de harina!!!",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Si no tienes ganas de ir a la picina, playa o río en las tardes calurosas, hay unos chorros en el parque de tamatan que te quitarán el calor y darán alegría a una tarde en familia.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Existe un mirador en la ciudad, donde puedes ver toda la ciudad desde lo alto, y es un lugar muy visitado por los turistas.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "En una parte escondida por la loma, hay un lugar para enamorados donde dejan muchos candados con los nombres de los enamorados que van ahí.",
    imagen: "/image/Mariposas.png",
  },
  {
    texto:
      "Existe un camino algo escondido en la ciudad, que desde hace mucho tiempo funcionó como el camino real a Tula para nuestros antepasados.",
    imagen: "/image/Mariposas.png",
  },
];

export function Content() {
  const [curiousIndex, setCuriousIndex] = useState(0); // Inicia en 0

  useEffect(() => {
    // Al montar el componente, seleccionar uno aleatorio
    const randomIndex = Math.floor(Math.random() * DATOS_CURIOSOS.length);
    setCuriousIndex(randomIndex);

    // Luego iniciar el temporizador cada minuto
    const interval = setInterval(() => {
      setCuriousIndex((prev) => (prev + 1) % DATOS_CURIOSOS.length);
    }, 5000); // 1 minuto

    return () => clearInterval(interval);
  }, []);

  const { texto, imagen } = DATOS_CURIOSOS[curiousIndex];
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState("");
  const coordenadasColonias: Record<string, LatLngTuple[]> = {
    "Las Flores": [
      [23.730274, -99.17113],
      [23.728925, -99.164168],
      [23.728602, -99.163111],
      [23.72543, -99.160598],
      [23.724324, -99.161925],
      [23.725385, -99.163001],
      [23.722999, -99.165331],
      [23.723399, -99.165763],
      [23.72355, -99.165625],
      [23.723907, -99.166083],
      [23.723957, -99.166045],
      [23.728378, -99.170838],
      [23.730274, -99.17113],
    ],
  };

  const [mostrarPoligono, setMostrarPoligono] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<null | number>(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const [index, setIndex] = useState(0);
  const total = images.length;

  const nextImage = () => setIndex((prev) => (prev + 1) % total);
  const prevImage = () => setIndex((prev) => (prev - 1 + total) % total);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
  });

  const getTransformStyle = (position: number) => {
    const baseZ = -100;
    const scale = position === 0 ? 1.0 : 0.9;
    const rotateY = position * 38;

    return {
      transform: `translateX(${
        position * 250
      }px) translateZ(${baseZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      filter: position === 0 ? "none" : "blur(2px)",
      opacity: position === 0 ? 1 : 0.6,
      zIndex: position === 0 ? 2 : 1,
    };
  };

  const getRelativeIndex = (i: number) => {
    const diff = i - index;
    if (diff === -1 || diff === total - 1) return -1;
    if (diff === 1 || diff === -total + 1) return 1;
    if (diff === 0) return 0;
    return null;
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    console.log("Selected option:", option);
    setDropdownOpen(false);
  };

  // VERIFICA SI ESTÁ EN EL CLIENTE
  useEffect(() => {
    setIsClient(true);
  }, []);

  // EVITA RENDERIZADO EN SSR
  if (!isClient) {
    return <p className="text-center">Cargando mapa...</p>;
  }

  return (
    <>
      <section className="relative inset-0 z-[-1]">
        {/* LÍNEAS DE DECORACIÓN */}
        <div className="absolute top-[20px] left-[20px] w-40 h-20">
          <div className="absolute w-[330px] h-[6px] bg-[#FEBF97] rotate-[150deg] top-[57px] left-[-80px]" />
          <div className="absolute w-[440px] h-[9px] bg-[#FEBF97] rotate-[151deg] top-[72px] left-[-60px]" />
          <div className="absolute w-[550px] h-[12px] bg-[#FEBF97] rotate-[151deg] top-[102px] left-[-60px]" />
          <div className="absolute w-[750px] h-[16px] bg-[#FEBF97] rotate-[151deg] top-[142px] left-[-80px]" />
        </div>
      </section>

      <section className="py-12 px-8 mt-[1500px]">
        {/* DIV CARRUSEL LARGO IMAGENES */}
        <div className="absolute top-[680px] left-[14px] w-[450px] h-[1387px] bg-purple-500 rounded-lg">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
          >
            <div>
              <Image
                src="/image/Carrusel1.jpeg"
                alt="Imagen 1"
                width={2300}
                height={4088}
                className="scale-[1.0] origin-top-left rounded-lg" // Redondea los bordes de la imagen
              />
            </div>
            <div>
              <Image
                src="/image/Carrusel2.jpeg"
                alt="Imagen 2"
                width={800}
                height={2600}
                className="scale-[1.0] origin-top-left rounded-lg" // Redondea los bordes de la imagen
              />
            </div>
            <div>
              <Image
                src="/image/Carrusel3.jpeg"
                alt="Imagen 3"
                width={800}
                height={2600}
                className="scale-[1.0] origin-top-left rounded-lg" // Redondea los bordes de la imagen
              />
            </div>
          </Carousel>
        </div>

        {/* DIV DE EXPLICACIÓN DE LA PAGINA */}
        <div className="absolute top-[680px] left-[480px] w-[860px] h-[357px] bg-blue-200 bg-opacity-0 rounded-lg overflow-hidden">
          {/* Imagen de fondo */}
          <Image
            src="/image/buena1.png"
            alt="Imagen Azul Claro"
            width={815}
            height={415}
            className="rounded-lg object-cover"
            style={{
              marginLeft: "30px",
              marginTop: "0px",
            }}
          />

          {/* Contenedor del primer texto (izquierdo) */}
          <div className="absolute top-[80px] left-[120px] w-[360px] z-10">
            <p
              className={`${inriaSerif.className} text-black text-justify text-[15px] leading-tight`}
            >
              ¿Te ha pasado que preguntas por una colonia y te dicen: “por donde
              da vuelta el camión rojo”? ¿O que terminas en el ejido cuando solo
              querías ir al OXXO? Aquí te entendemos… y por eso hicimos esta
              página. Para que ya no andes preguntando por “la tiendita con un
              gato afuera” o “donde vivía la tía Chona”. Tenemos rutas, mapas, y
              hasta nombres reales de las colonias. Así que deja de parecer un
              foráneo perdido, esta guía es para ti
            </p>
          </div>

          {/* Contenedor del segundo texto (derecho) */}
          <div className="absolute top-[40px] right-[60px] w-[360px] z-10">
            <h2
              className={`${katibeh.className} text-black text-right text-[60px] leading-snug`}
            >
              ¿Qué es esta <br /> página y qué <br /> quiere lograr?
            </h2>
          </div>
        </div>

        {/* DIV DE DATOS CURIOSO DE LA CIUDAD */}
        <div className="absolute top-[1000px] left-[480px] w-[540px] h-[400px] bg-green-200 bg-opacity-0 rounded-lg overflow-hidden">
          <Image
            src="/image/buena2.png"
            alt="Imagen Verde Claro"
            width={558}
            height={457}
            className="w-full h-full object-cover"
            style={{ marginTop: "-5px" }}
          />
          {/* Contenedor centrador con fondo guía */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0">
            <div className="flex flex-col items-center justify-center px-6 text-white text-center">
              <h2 className="text-black text-[64px] leading-snug mb-2 drop-shadow-md font-serif">
                ¿Sabías qué?
              </h2>
              <p className="text-black text-lg font-medium drop-shadow-md mb-4 max-w-[400px]">
                {texto}
              </p>
              <Image
                src={imagen}
                alt="Dato curioso"
                width={120}
                height={80}
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        </div>

        {/* DIV QUE CONTIENE EL MAPA Y EL TITULO DEL MAPA */}
        <div
          className="absolute top-[1420px] left-[480px] w-[558px] h-[646px] rounded-lg"
          style={{
            backgroundColor: "#FAD7C1", // Nuevo color
            zIndex: 1, // Asegura que el mapa esté por debajo de la barra de navegación
          }}
        >
          {/* TÍTULO EN LA MITAD SUPERIOR */}
          <div className="flex items-center justify-center h-[25%]">
            <h2
              className="text-center font-bold"
              style={{
                fontFamily: "Libre Bodoni",
                fontSize: "60px", // Tamaño de letra ajustado a 60px
              }}
            >
              Mapa interactivo de Cd. Victoria
            </h2>
          </div>

          {/* MAPA EN LA MITAD INFERIOR */}
          <div
            className="flex items-center justify-center h-[50%]"
            style={{
              top: "1800px", // Puedes modificar el valor del top
              left: "450px", // Puedes modificar el valor del left
              width: "560px", // Puedes modificar el ancho
              height: "470px", // Puedes modificar la altura
              zIndex: 0, // Asegura que el mapa esté por debajo de la barra de navegación
            }}
          >
            <div className="w-[93%] h-[95%] rounded-lg overflow-hidden shadow-lg bg-black">
              <MapContainer
                center={[23.7285, -99.166]}
                zoom={15}
                className="w-[98%] h-[98%] ml-1 mt-1"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Mostrar el polígono si se selecciona Las Flores */}
                {coloniaSeleccionada === "Las Flores" && (
                  <Polygon
                    positions={coordenadasColonias["Las Flores"]}
                    pathOptions={{ color: "red" }}
                  >
                    <Popup>
                      <h2 className="font-bold text-lg">
                        Fraccionamiento Las Flores
                      </h2>
                      <p className="text-sm text-gray-700">
                        Ubicación: Ciudad Victoria, Tamaulipas
                      </p>
                      <p className="text-sm text-gray-700">
                        Población: Aprox. 1,500 habitantes
                      </p>
                      <p className="text-sm text-gray-700">
                        Áreas verdes, escuelas y tiendas cercanas
                      </p>
                      <Image
                        src="/image/las-flores.jpg"
                        alt="Fraccionamiento Las Flores"
                        width={300}
                        height={200}
                        className="mt-2 rounded-lg"
                      />
                    </Popup>
                  </Polygon>
                )}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE NOTICIAS */}
        <NoticiasRotativas />

        {/* DIV DE LAS OPCIONES DE COLONIAS/FRACCIONAMIENTOS */}
        <div
          className="absolute top-[1905px] left-[1045px] w-[300px] h-[161px] rounded-lg"
          style={{
            backgroundColor: "#FEFAC2", // Nuevo color
          }}
        >
          {/* DIV DE DENTRO BLANCO*/}
          <div
            className="w-[calc(100%-40px)] h-[calc(100%-40px)] bg-[#FFFDFD] rounded-lg mx-auto my-auto border-2 border-black flex items-center justify-center"
            style={{
              margin: "10px", // Espaciado de 10px desde los bordes
            }}
          >
            {/* DROPDOWN */}
            <main className="flex items-center justify-center min-h-screen">
              <DropdownButton onSeleccionar={setColoniaSeleccionada} />
            </main>
          </div>
        </div>
      </section>

      {/* IMAGEN DECORATIVA SUPERIOR */}
      <section className="py-12 px-8 relative">
        <div className="absolute top-[-150px] left-[0px] w-[1350px] h-[150px] rounded-lg bg-green-200 bg-opacity-0">
          <img
            src="/image/buena3.png"
            alt="Decoración superior"
            className="w-[1400px] h-[150px]"
          />
        </div>

        {/* TARJETAS */}
        <div className="flex justify-center gap-8 flex-wrap z-10 relative py-16">
          {/* TARJETA 1 */}
          <div
            className="w-[400px] h-[600px] perspective"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: hoveredCard === 1 ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frente */}
              <div
                className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: "#CFFAFE" }}
              >
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white mt-4">
                  <img
                    src="/image/Imagen-tarjeta-1.jpeg"
                    alt="Ruta ideal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-black text-[28px] text-md font-light mt-6">
                  ¡Hay Muchos Eventos por ver!{" "}
                </p>
                <p
                  className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`}
                >
                  Descubre los eventos más destacados de Ciudad Victoria y no te
                  pierdas ninguna actividad importante. Desde conciertos y
                  exposiciones hasta ferias tradicionales y encuentros
                  culturales, esta sección te mantendrá al tanto de lo que
                  sucede en tu ciudad. Explora la oferta de entretenimiento y
                  participa activamente en la vida local. Con información clara
                  y actualizada, podrás planificar mejor tus días y disfrutar de
                  todo lo que Victoria tiene para ofrecer. ¡La ciudad siempre
                  tiene algo nuevo para ti!
                </p>
              </div>

              {/* Reverso */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "#CFFAFE" }}
              >
                {/* 💡 Contenido del reverso Tarjeta 1 */}
                <p className="text-center text-black">
                  Más información sobre rutas
                </p>
              </div>
            </motion.div>
          </div>

          {/* TARJETA 2 */}
          <div
            className="w-[400px] h-[600px] perspective"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: hoveredCard === 2 ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frente */}
              <div
                className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: "#FEF9C3" }}
              >
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white mt-4">
                  <img
                    src="/image/Imagen-tarjeta-2.jpeg"
                    alt="Zona"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-black text-[28px] text-md font-light mt-6">
                  Conoce la ciudad mejor que nadie
                </p>
                <p
                  className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`}
                >
                  Explora los rincones más destacados de la ciudad y descubre lo
                  que cada zona tiene para ofrecerte. Con esta herramienta
                  podrás conocer puntos de referencia importantes, sitios
                  históricos, lugares populares y zonas de interés cultural que
                  quizá no sabías que existían. Ya sea que seas nuevo en la
                  ciudad o simplemente quieras conocer mejor tu entorno, aquí
                  encontrarás una guía útil para orientarte y disfrutar de cada
                  recorrido. Familiarízate con tu entorno y conecta con tu
                  comunidad de forma fácil y visual.
                </p>
              </div>

              {/* Reverso */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "#FEF9C3" }}
              >
                {/* 💡 Contenido del reverso Tarjeta 2 */}
                <p className="text-center text-black">
                  Descubre lugares cercanos
                </p>
              </div>
            </motion.div>
          </div>

          {/* TARJETA 3 */}
          <div
            className="w-[400px] h-[600px] perspective"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: hoveredCard === 3 ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frente */}
              <div
                className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: "#FCD8B0" }}
              >
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-white mt-4">
                  <img
                    src="/image/Imagen-tarjeta-3.jpeg"
                    alt="Noticias"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-black text-[28px] text-md font-light mt-6">
                  Tu Ciudad, ¡Tu Información!
                </p>
                <p
                  className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`}
                >
                  Mantente al día con lo que sucede en tu ciudad. Desde eventos
                  culturales y deportivos, hasta noticias relevantes, cambios en
                  el transporte y actividades comunitarias. Toda la información
                  está reunida en un solo lugar para que no te pierdas de nada.
                  Con acceso fácil y contenido actualizado, podrás conocer las
                  novedades que impactan tu día a día y participar activamente
                  en la vida urbana. Porque conocer tu ciudad también es formar
                  parte de ella.
                </p>
              </div>

              {/* Reverso */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "#FCD8B0" }}
              >
                {/* 💡 Contenido del reverso Tarjeta 3 */}
                <p className="text-center text-black">
                  Noticias y eventos recientes
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* IMAGEN DECORATIVA INFERIOR */}
        <div className="absolute top-[1570px] left-[0px] w-[1350px] h-[150px] rounded-lg bg-green-200 bg-opacity-0">
          <img
            src="/image/buena4.png"
            alt="Decoración inferior"
            className="w-[1400px] h-[150px]"
          />
        </div>
      </section>

      {/* CARRUSEL DE IMAGENES 3D*/}
      <section className="py-12 px-8 relative mt-[-70px]">
        <div className="absolute top-[60px] left-[0px] w-[1350px] h-[150px] rounded-lg bg-green-200 bg-opacity-0">
          <h2
            className="text-center font-bold"
            style={{
              fontFamily: "Libre Bodoni",
              fontSize: "64px", // Tamaño de letra ajustado a 60px
            }}
          >
            ¡Explora cada rincón de la ciudad!
          </h2>
        </div>
        <div
          {...handlers}
          className="relative w-full h-[800px] flex items-center justify-center overflow-hidden"
        >
          <div className="relative perspective-[1200px] w-full h-full flex items-center justify-center">
            {images.map((src, i) => {
              const pos = getRelativeIndex(i);
              if (pos === null) return null;

              return (
                <motion.div
                  key={i}
                  className="absolute w-[980px] h-[592px] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out"
                  style={getTransformStyle(pos)}
                >
                  <Image
                    src={src}
                    alt={`Imagen ${i + 1}`}
                    width={980}
                    height={592}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 px-8 relative mt-[30px]"></section>
    </>
  );
}

export default Content;

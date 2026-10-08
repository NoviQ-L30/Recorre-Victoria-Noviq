"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Katibeh } from "next/font/google";
import { Inria_Serif } from "next/font/google";
import NoticiasRotativas from "@/components/NoticiasRotativas";
import DropdownColonias from "@/components/DropdownColonias";
import CommentsSection from "@/components/CommentsSection";
import { Lora } from "next/font/google";
import { Jacques_Francois } from "next/font/google";

type CarouselImage = {
  id: string;
  name: string;
  imageUrl: string;
  imageId: string;
};

interface CuriousFact {
  id: string;
  text: string;
  imageUrl?: string | null;
}

interface ContentProps {
  images: CarouselImage[];
  secondaryImages: CarouselImage[];
  curiousFacts: CuriousFact[];
}



const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const jacquesFrancois = Jacques_Francois({ subsets: ["latin"], weight: "400" }); // Agrega esto junto a las otras fuentes

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


const katibeh = Katibeh({ subsets: ["latin"], weight: "400" });

export default function Content({ images, secondaryImages, curiousFacts }: ContentProps) {

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [currentIndex] = useState(0);

  const [curiousIndex, setCuriousIndex] = useState(0); // Inicia en 0

  useEffect(() => {
    // Al montar el componente, seleccionar uno aleatorio
    const randomIndex = Math.floor(Math.random() * curiousFacts.length);
    setCuriousIndex(randomIndex);


    // Luego iniciar el temporizador cada minuto
    const interval = setInterval(() => {
      setCuriousIndex((prev) => (prev + 1) % curiousFacts.length);
    }, 30000); // 1 minuto

    return () => clearInterval(interval);
  }, []);

  const { text, imageUrl } = curiousFacts[curiousIndex];
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

  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<null | number>(null);

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
      transform: `translateX(${position * 250
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

  // VERIFICA SI ESTÁ EN EL CLIENTE
  useEffect(() => {
    setIsClient(true);
  }, []);




  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <div className="w-14 h-14 rounded-full bg-[#8FBFC0] animate-pulse" />
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          Cargando…
        </p>
      </div>
    );
  }



  return (

    <>

      {/* DIV PARA PODER POSICIONAR LAS LINEAS DECORATIVAS DETRAS DE LA PRIMERA SECCION */}
      <div className="relative">

        {/* FONDO DE LAS SECCIONES 1 Y 2 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 bottom-[-60px] z-0 bg-no-repeat pointer-events-none overflow-hidden"
          style={{
            backgroundImage: "url('/image/FONDO-HOME.png')",
            backgroundSize: "100% calc(100% + 4px)",
            backgroundPosition: "center top",
          }}
        />

        {/* SECCIÓN 1 – RESPONSIVE */}
        <section className="relative z-10 w-full py-16 px-4 py-8">
          {/* layout principal de todo el borlote */}
          <div className="max-w-[1480px] mx-auto px-4">
            {/* Card blanca */}
            <div className="bg-white shadow-lg flex flex-col lg:flex-row overflow-hidden w-full max-w-[1480px] h-auto lg:h-[400px]">
              {/* COLUMNA IZQUIERDA – LOGO */}
              <div className="flex items-center justify-center w-full lg:w-1/3 p-0 overflow-visible relative">
                {/* contenedor permite que la imagen salga sin aumentar el card */}
                <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                  <Image
                    src="/image/LOGO-GOD-NEW.png"
                    alt="Logo principal"
                    width={1200}
                    height={900}
                    className="w-full h-full max-w-none object-contain lg:transform lg:scale-[1.4]"
                    style={{ transition: 'transform 200ms ease' }}
                    priority
                  />
                </div>
              </div>
              {/* COLUMNA DERECHA */}
              <div className="relative w-full lg:w-2/3 flex flex-col justify-center p-8 gap-8 overflow-hidden ">
                {/* FONDO DECORATIVO */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-right bg-contain opacity-100 pointer-events-none"
                  style={{
                    backgroundImage: "url('/image/FONDO-GOD3.png')",
                    backgroundSize: "95% 90%",
                    backgroundPosition: "center center",
                  }}
                />
                {/* CONTENEDOR DEL TITULO Y DE LA DESCRIPCION */}
                <motion.div
                  className="relative z-10 grid grid-cols-[1fr_2fr] h-full gap-0 items-stretch"
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >

                  {/* COLUMNA IZQUIERDA – TÍTULO */}
                  <div className="flex items-start w-full h-full pr-6">
                    <h2
                      className={`${katibeh.className} w-full text-left text-4xl md:text-5xl lg:text-6xl leading-[2.5]`}
                      style={{
                        color: "#0A0A0A",
                        WebkitTextStroke: "0.3px #5B80BB",
                        textShadow:
                          "-1px -1px 0 #5B80BB, 1px -1px 0 #5B80BB, -1px 1px 0 #5B80BB, 1px 1px 0 #5B80BB",
                      }}
                    >
                      <span className="block mt-8">¿Qué es esta</span>
                      <span className="block mt-8">página y qué</span>
                      <span className="block mt-8">quiere lograr?</span>
                    </h2>
                  </div>

                  {/* COLUMNA DERECHA – DESCRIPCIÓN */}
                  <div className="flex items-start w-full h-full pl-6 ">
                    <p
                      className={`${katibeh.className} w-full text-black text-justify text-[28px] leading-7 md:leading-8 font-semibold md:font-bold tracking-wide max-w-2xl mt-4 p-4`}
                    >
                      ¿Te ha pasado que preguntas por una colonia y te dicen: “por donde
                      da vuelta el camión rojo”? ¿O que terminas en el ejido cuando solo
                      querías ir al OXXO? Aquí te entendemos… y por eso hicimos esta
                      página. Para que ya no andes preguntando por “la tiendita con un
                      gato afuera” o “donde vivía la tía Chona”. Tenemos rutas, mapas,
                      y hasta nombres reales de las colonias. Así que deja de parecer
                      un foráneo perdido, esta guía es para ti.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECCIÓN 2 ================= */}
        <section className="relative z-20 max-w-[1480px] mx-auto px-4">
          {/* CARD BLANCA */}
          <motion.div
            className="bg-white shadow-lg w-full min-h-[800px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >


            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_360px] gap-8 p-2">

              {/* ================= COLUMNA IZQUIERDA – CARRUSEL ================= */}
              <div className="w-full flex justify-center lg:justify-start  bg-green-300 bg-opacity-0 min-h-[700px]">
                <div
                  className="
            w-full
            max-w-[400px]
            h-[520px]
            sm:h-[620px]
            md:h-[720px]
            lg:h-[1000px]
            overflow-hidden
            rounded-[23px]
          "
                >
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    swipeable
                    emulateTouch
                  >
                    {/* CARRUSEL SECUNDARIO DE IMAGENES */}
                    {secondaryImages.map((image) => (
                      <div
                        key={image.id}
                        className="w-[400px] h-[1000px]"
                        style={{
                          backgroundImage: `url(${image.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "23px",
                        }}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>

              {/* ================= COLUMNA 2 – DATOS CURIOSOS + MAPA ================= */}
              <div
                className="
    relative
    w-full
    rounded-[23px]
    bg-white
    p-0
    lg:w-[700px]
    min-h-[1000px]
    overflow-hidden
    flex flex-col
    -ml-5
  "
              >
                {/* ================= BLOQUE CURIOSIDADES ================= */}
                <motion.div
                  className="
    relative
    max-w-[700px]
    min-h-[350px]
    overflow-hidden
    flex flex-col
    bg-[#E7EFF2]
    rounded-[23px]
  "
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* ICONO EXCLAMACIÓN */}
                  <div className="absolute top-5 left-0 -translate-x-6 -translate-y-6 pointer-events-none">
                    <Image
                      src="/image/signo-de-exclamacion.png"
                      alt="Signo de exclamación"
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  {/* TÍTULO */}
                  <h2 className="text-center text-[28px] md:text-[36px] font-serif drop-shadow-md mb-1">
                    ¿Sabías qué?
                  </h2>
                  {/* CONTENIDO */}
                  <div className="grid grid-cols-[100px_1fr] gap-2 flex-1 w-full overflow-hidden -mt-5">
                    <div></div>
                    <div className="p-4">
                      {imageUrl && (
                        <div className="float-right ml-4 mb-2 rounded-2xl p-1">
                          <Image
                            src={imageUrl}
                            alt="Imagen curiosidad"
                            width={160}
                            height={160}
                            className="object-cover rounded-2xl shadow-xl border-2 border-white"
                          />
                        </div>
                      )}

                      <p className="text-[14px] md:text-[16px] lg:text-[17px] leading-relaxed italic font-serif text-gray-800 text-justify">
                        {text}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {/* ================= BLOQUE MAPA ================= */}
                <div className="flex-1 flex flex-col items-center px-4 ">

                  {/* TÍTULO DEL MAPA - Quitamos el mt-[70px] de aquí */}
                  <div className="flex items-center gap-3 mb-2 ml-3 -mt-[10px]">
                    <h2
                      className="font-bold text-black leading-none"
                      style={{ fontFamily: "Libre Bodoni", fontSize: "56px" }}
                    >
                      Explora tu Colonia
                    </h2>
                    <img src="/image/brujula.png" alt="Brújula" className="w-20 h-20 mt-2" />
                  </div>

                  {/* SUBTÍTULO - Quitamos el mt-[70px] de aquí */}
                  <p
                    className="text-gray-700 mb-6 text-center -mt-[10px] -ml-2"
                    style={{ fontFamily: "Libre Bodoni", fontSize: "20px" }}
                  >
                    Encuentra información útil acerca de donde vives.
                  </p>

                  {/* MAPA */}
                  <motion.div
                    // 1. Estilos visuales del mapa (Snippet 2)
                    className="w-full max-w-[700px] h-[530px] overflow-hidden border-2 border-black -mt-[10px]"
                    style={{ borderRadius: "29px" }}

                    // 2. Propiedades de animación (Snippet 1)
                    variants={{
                      hidden: { opacity: 0, y: 32 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, delay: 0.15 },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <MapContainer
                      center={[23.7285, -99.166]}
                      zoom={15}
                      className="w-full h-full"
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
                            <Image
                              src="/image/avatar3.jpg"
                              alt="Fraccionamiento Las Flores"
                              width={300}
                              height={200}
                              className="mt-2 rounded-lg"
                            />
                          </Popup>
                        </Polygon>
                      )}
                    </MapContainer>
                  </motion.div>
                </div>
              </div>
              {/* ================= COLUMNA DERECHA – NOTICIAS + DROPDOWN ================= */}
              <div
                className="
                w-full 
                flex 
                flex-col 
                gap-6 
                items-center 
                lg:-ml-[30px] 
                lg:sticky 
                lg:top-24 
                bg-red-300 
                bg-opacity-0 
                min-h-[1000px]
              "
              >
                {/* SECCIÓN DE NOTICIAS */}
                <NoticiasRotativas />
                {/* FIN NOTICIAS */}

                {/* ================= DROPDOWN COLONIAS / FRACCIONAMIENTOS ================= */}
                <div
                  className="
      w-full
      max-w-[300px]
      min-h-[165px]
      flex
      flex-col
      items-center
      justify-center
      bg-white
      rounded-lg
      border-4
      border-[#FEFAC2]
      shadow-md
      lg:-ml-[20px]
    "
                >
                  {/* TÍTULO */}
                  <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-wide font-[var(--font-playfair)] text-black text-center px-2">
                    Fraccionamientos / Colonias
                  </h2>

                  {/* DROPDOWN */}
                  <DropdownColonias
                    coloniaSeleccionada={coloniaSeleccionada}
                    setColoniaSeleccionada={setColoniaSeleccionada}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        {/* =============== FIN SECCIÓN 2 =============== */}
      </div>   {/* =============== DIV DE LAS LINEAS DECORATIVAS =============== */}


      {/* =============== SECCIÓN 3 =============== */}
      <section className="w-full flex justify-center mt-[20px] relative overflow-visible">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 w-full bg-white pointer-events-none"
          style={{ height: "3500px", zIndex: 0 }}
        />
        <div
          className="
    w-full
    bg-transparent
    relative
    flex-1
    z-10
  "
        >

          {/* DECORACIÓN SUPERIOR */}
          <div className="relative w-full h-[150px]">
            <img
              src="/image/DECORACION-FLECHA-2.png"
              alt="Decoración superior"
              className="w-full h-full object-fill"
            />
          </div>

          {/* TARJETAS INFORMATIVAS */}
          <div
            className="
    relative
    w-full
    flex
    justify-center
    gap-8
    flex-wrap
    py-24
    px-6
    z-10
  "
          >
            {/* FONDO DE TARJETAS */}
            <img
              src="/image/FONDO-TARJETAS.png"
              alt="Fondo tarjetas"
              className="absolute top-[242px] inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
            />

            {/* TARJETA 1 */}
            <div
              className="w-full max-w-[400px] h-[660px] perspective rounded-[23px]"
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
                  className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-[23px] shadow-lg overflow-hidden"
                  style={{ backgroundColor: "#CFFAFE" }}
                >
                  {/* Fondo detrás del círculo de la tarjeta */}
                  <img
                    src="/image/fondo3.png"
                    alt="Fondo"
                    className="absolute top-[0px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />

                  {/* Fondo de la parte baja de la tarjeta */}
                  <img
                    src="/image/fondo6.png"
                    alt="Fondo"
                    className="absolute top-[340px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />

                  <div className="relative w-[316px] h-[316px] mt-4 absolute top-[-30px] z-10">
                    <div className="relative w-full h-full rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] overflow-hidden">
                      {/* Imagen de la rueda de la fortuna por encima */}
                      <img
                        src="/image/Rueda-de-la-fortuna-IA-circulo.png"
                        alt="Ruta ideal"
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  {/* AJUSTE: Usé style={{ marginTop: "-80px" }} para subir el texto "¡Hay Muchos Eventos por ver!" */}
                  <p className="text-center text-black text-[28px] text-md font-light" style={{ marginTop: "-20px", zIndex: 2 }}>
                    ¡Hay Muchos Eventos por ver!
                  </p>
                  <p
                    className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`} style={{ zIndex: 2 }}
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
                  className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src="/image/FONDO-ATRAS-1.png"
                    alt="Fondo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <img
                    src="/image/PIE-ATRAS-1.png"
                    alt="Pie"
                    className="absolute bottom-0 left-0 w-full object-cover z-10"
                  />

                  <img
                    src="/image/CUADRO-ATRAS-1.png"
                    alt="Pie"
                    className="absolute bottom-[200px] left-0 w-full h-[340px] object-cover z-10"
                  />

                  <img
                    src="/image/ITEMS-ATRAS-1.png"
                    alt="Decoración"
                    className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-full h-auto z-10"
                  />

                  {/* BLOQUE VISUAL DE EVENTOS – TARJETA 1 (REVERSO) */}
                  <div className="absolute left-0 right-0 top-[150px] z-20 origin-top scale-[0.85] px-4">
                    <div className="grid grid-cols-[repeat(3,133px)] justify-center gap-[20px] w-full h-[405px]">
                      <article className="relative h-full rounded-[14px] border border-[#C5BF4D] bg-[#D2FDFE] p-2 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col justify-start overflow-hidden">
                        <div className="flex-1 flex flex-col justify-between gap-2">
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-EMPLEO.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.76] translate-y-[25px]" />
                            <p className="absolute top-[100px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Feria de empleo<br />Cd.Victoria.</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-CANTO.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.9404] -translate-y-[5px]" />
                            <p className="absolute top-[220px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Clases de canto<br />gratuitas por<br />programa social.</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-CONCIERTO.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.76] -translate-y-[50px]" />
                            <p className="absolute top-[335px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Concierto de rock<br />local plaza Juárez<br />día 12 de enero</p>
                          </div>
                        </div>
                        <h3 className="absolute top-2 inset-x-1 z-20 text-center text-[22px] font-bold text-[#24505B]">Mes de enero</h3>
                      </article>

                      <article className="relative h-full rounded-[14px] border border-[#C5BF4D] bg-[#D2FDFE] p-2 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col justify-start overflow-hidden">
                        <div className="flex-1 flex flex-col justify-between gap-2">
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-COMIDA.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.76] translate-y-[25px]" />
                            <p className="absolute top-[100px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Degustación de<br />gastronomía Local</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-ARTE.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.9404] -translate-y-[10px]" />
                            <p className="absolute top-[220px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Exposición de arte<br />con raíces<br />tamaulipecas.</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-BAILE.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.32] -translate-y-[40px]" />
                            <p className="absolute top-[340px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Taller de danza<br />folklórica para<br />todas las edades.</p>
                          </div>
                        </div>
                        <h3 className="absolute top-2 inset-x-1 z-20 text-center text-[22px] font-bold text-[#24505B]">Mes de febrero</h3>
                      </article>

                      <article className="relative h-full rounded-[14px] border border-[#C5BF4D] bg-[#D2FDFE] p-2 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col justify-start overflow-hidden">
                        <div className="flex-1 flex flex-col justify-between gap-2">
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-PINTAR.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.76] translate-y-[25px]" />
                            <p className="absolute top-[100px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Taller de pintura y<br />esculturas en la casa<br />del arte</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-CIRCO.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.9404] -translate-y-[5px]" />
                            <p className="absolute top-[230px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Maravilloso Circo<br />Estrella</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-2">
                            <img src="/image/PNG-CARRERA.png" alt="" className="w-[72px] h-[72px] object-contain scale-[1.76] -translate-y-[50px]" />
                            <p className="absolute top-[335px] left-1/2 w-full -translate-x-1/2 text-center text-[15.73px] text-[#24505B] font-semibold leading-tight">• Maratón regional<br />20km. Todos por<br />Tamaulipas</p>
                          </div>
                        </div>
                        <h3 className="absolute top-2 inset-x-1 z-20 text-center text-[22px] font-bold text-[#24505B]">Mes de marzo</h3>
                      </article>
                    </div>
                  </div>

                  <h1
                    className="
    absolute
    top-[571px]
    left-[123px]
    -translate-x-1/2
    z-20
    text-[24px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    ¡NO TE LO PIERDAS!
                  </h1>

                  <h2
                    className="
    absolute
    top-[600px]
    left-[143px]
    -translate-x-1/2
    z-20
    text-[8px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    Más información en: www.ciudadvictoria.eventos.com                  </h2>

                  <h3
                    className="
    absolute
    top-[620px]
    left-[180px]
    -translate-x-1/2
    z-20
    text-[9px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    © 2026 Ciudad Victoria Turismo. Todos los derechos reservados.
                  </h3>

                  <h4
                    className="
    absolute
    top-[50px]
    left-1/2
    -translate-x-1/2
    z-20
    text-[36px]
    font-gentium
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[-0.5px]
    text-transparent
    bg-clip-text
    bg-[linear-gradient(90deg,#0F1FFF_0%,#B1FDFF_50%,#0F1FFF_100%)]
  "
                    style={{
                      WebkitTextStroke: "0.5px #000000",
                      textShadow: `
      0px 1px 1px rgba(177,253,255,.55),
      1px 1px 2px rgba(15,31,255,.18)
    `,
                    }}
                  >
                    CALENDARIO DE EVENTOS
                  </h4>


                  <div className="absolute top-[550px] left-[270px] z-50 p-2 flex items-center">
                    <img
                      src="/image/Logo-facebook.png"
                      alt="Facebook"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-instagram.png"
                      alt="Instagram"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-twitter.png"
                      alt="Twitter"
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                </div>
              </motion.div>
            </div>

            {/* TARJETA 2 */}
            <div
              className="w-full max-w-[400px] h-[660px] perspective rounded-[23px]"
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
                  className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-[23px] shadow-lg overflow-hidden"
                  style={{ backgroundColor: "#FEF9C3" }}
                >

                  {/* Fondo de la parte alta de la tarjeta */}
                  <img
                    src="/image/fondo5.png"
                    alt="Fondo"
                    className="absolute top-[340px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />

                  {/* Fondo detrás del círculo */}
                  <img
                    src="/image/fondo8.png"
                    alt="Fondo"
                    className="absolute top-[5px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />

                  <div className="relative w-[316px] h-[316px] mt-4 absolute top-[-30px] z-10">
                    <div className="relative w-full h-full rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] overflow-hidden">
                      <img
                        src="/image/Cuerudo-IA-circulo.png"
                        alt="Zona"
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-center text-black text-[28px] text-md font-light mt-6 " style={{ marginTop: "-20px", zIndex: 2 }}>
                    Conoce la ciudad mejor que nadie
                  </p>
                  <p
                    className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`} style={{ zIndex: 2 }}
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
                  className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src="/image/FONDO-ATRAS-2.png"
                    alt="Fondo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <img
                    src="/image/PIE-ATRAS-2.png"
                    alt="Pie"
                    className="absolute bottom-0 left-0 w-full object-cover z-10"
                  />

                  <img
                    src="/image/CUADRO-ATRAS-2.png"
                    alt="Pie"
                    className="absolute bottom-[272px] left-0 w-full h-[350px] object-cover z-10"
                  />

                  <img
                    src="/image/ITEMS-ATRAS-2.png"
                    alt="Decoración"
                    className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-full h-auto z-10"
                  />

                  {/* RUTAS TURÍSTICAS – TARJETA 2 (REVERSO) */}
                  <div className="absolute left-0 right-0 top-[138px] z-20 px-4">
                    <div className="grid grid-cols-3 gap-5 w-full h-[530px]">
                      <article className="h-[325px] w-[109px] rounded-[20px] border border-[#C5BF4D] bg-[#F9F8E6] px-2 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col items-center overflow-hidden">
                        <h3 className="text-center text-[18px] leading-[1.1] font-normal text-black font-serif">Ruta Histórica</h3>
                        <img src="/image/edificio.png" alt="" className="w-[92px] h-[92px] object-contain mt-5 mb-3" />
                        <div className="text-center text-[16px] leading-[1.18] text-black font-serif space-y-4">
                          <p>•Palacio de<br />gobierno.</p>
                          <p>•Catedral de<br />Ciudad Victoria.</p>
                          <p>•Museo<br />Regional.</p>
                          <p>•Planetario/<br />Tamux de la<br />Ciudad</p>
                        </div>
                      </article>

                      <article className="h-[325px] w-[109px] rounded-[20px] border border-[#C5BF4D] bg-[#F9F8E6] px-2 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col items-center overflow-hidden">
                        <h3 className="text-center text-[18px] leading-[1.1] font-normal text-black font-serif">Arte y cultura</h3>
                        <img src="/image/caras.png" alt="" className="w-[60px] h-[60px] object-contain mt-5 mb-3" />
                        <div className="text-center text-[16px] leading-[1.18] text-black font-serif space-y-4">
                          <p>•Teatro de la<br />Ciudad Amalia<br />G. de Castillo<br />Ledón.</p>
                          <p>•Casa del arte<br />de Cd.Victoria.</p>
                          <p>•Eventos<br />musicales y<br />danzas</p>
                          <p>•Marchas y<br />Desfiles locales.</p>
                        </div>
                      </article>

                      <article className="h-[325px] w-[109px] rounded-[20px] border border-[#C5BF4D] bg-[#F9F8E6] px-2 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.22)] flex flex-col items-center overflow-hidden">
                        <h3 className="text-center text-[18px] leading-[1.1] font-normal text-black font-serif">Naturaleza<br />Activa</h3>
                        <img src="/image/monta.png" alt="" className="w-[60px] h-[60px] object-contain mt-4 mb-3" />
                        <div className="text-center text-[16px] leading-[1.18] text-black font-serif space-y-4">
                          <p>•El ojito de<br />santa ana.</p>
                          <p>•Mirador de<br />Ciudad Victoria.</p>
                          <p>•Camino Real a<br />Tula. (Camino<br />Rojo)</p>
                          <p>•El Río San<br />Marcos.</p>
                        </div>
                      </article>
                    </div>
                  </div>

                  <h1
                    className="
    absolute
    top-[571px]
    left-[135px]
    -translate-x-1/2
    z-20
    text-[22px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    ¡EXPLORA Y DESCUBRE!
                  </h1>

                  <h2
                    className="
    absolute
    top-[600px]
    left-[140px]
    -translate-x-1/2
    z-20
    text-[8px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    Más información en: www.ciudadvictoria.turismo.com
                  </h2>

                  <h3
                    className="
    absolute
    top-[620px]
    left-[180px]
    -translate-x-1/2
    z-20
    text-[9px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    © 2026 Ciudad Victoria Turismo. Todos los derechos reservados.
                  </h3>

                  <h4
                    className="
    absolute
    top-[45px]
    left-1/2
    -translate-x-1/2
    z-20
    text-[36px]
    font-gentium
    font-normal
    uppercase
    whitespace-nowrap
    tracking-normal
    text-transparent
    bg-clip-text
    bg-[linear-gradient(90deg,#C69640_0%,#FFDF72_53%,#C69640_100%)]
  "
                    style={{
                      WebkitTextStroke: "0.5px #000000",
                    }}
                  >
                    RECORRIDOS TURÍSTICOS
                  </h4>

                  <div className="absolute top-[550px] left-[270px] z-50 p-2 flex items-center">
                    <img
                      src="/image/Logo-facebook.png"
                      alt="Facebook"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-instagram.png"
                      alt="Instagram"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-twitter.png"
                      alt="Twitter"
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                </div>
              </motion.div>

            </div>

            {/* TARJETA 3 */}
            <div
              className="w-full max-w-[400px] h-[660px] perspective rounded-[23px]"
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
                  className="absolute w-full h-full backface-hidden flex flex-col items-center justify-start p-6 rounded-[23px] shadow-lg overflow-hidden"
                  style={{ backgroundColor: "#FCD8B0" }}
                >

                  {/* Fondo detrás del círculo */}
                  <img
                    src="/image/fondo4.png"
                    alt="Fondo"
                    className="absolute top-[0px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />

                  {/* Fondo de la parte baja de la tarjeta */}
                  <img
                    src="/image/fondo7.png"
                    alt="Fondo"
                    className="absolute top-[340px] left-[0px] w-full h-[340px] object-cover"
                    style={{ zIndex: 1 }}
                  />


                  <div className="relative w-[316px] h-[316px] mt-4 absolute top-[-30px] z-10">
                    <div className="relative w-full h-full rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] overflow-hidden">
                      <img
                        src="/image/Noticias-IA-circulo.png"
                        alt="Noticias"
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-center text-black text-[28px] text-md font-light mt-6" style={{ marginTop: "-20px", zIndex: 2 }}>
                    Tu Ciudad, ¡Tu Información!
                  </p>
                  <p
                    className={`text-justify text-black text-[12px] font-light mt-6 ${lora.className}`} style={{ zIndex: 2 }}
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
                  className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src="/image/FONDO-ATRAS-3.png"
                    alt="Fondo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <img
                    src="/image/PIE-ATRAS-3.png"
                    alt="Pie"
                    className="absolute bottom-0 left-0 w-full object-cover z-10"
                  />

                  <img
                    src="/image/CUADRO-ATRAS-3.png"
                    alt="Pie"
                    className="absolute bottom-[150px] left-0 w-full h-[372px] object-cover z-10"
                  />

                  <img
                    src="/image/ITEMS-ATRAS-3.png"
                    alt="Decoración"
                    className="absolute bottom-[113px] left-1/2 -translate-x-1/2 w-full h-auto z-10"
                  />

                  {/* DIRECTORIO ÚTIL – TARJETA 3 (REVERSO) */}
                  <div className="absolute left-0 right-0 top-[220px] z-30 px-2 font-serif text-[#17120F]">
                    <div className="relative mt-7 grid grid-cols-3 gap-1 text-center text-[10.8px] leading-[1.2] [&_span]:inline-block [&_span]:translate-y-[6px]">
                      <div>
                        <h3 className="text-center text-[19.2px] leading-[1.05] font-normal">Dependencias<br />clave</h3>
                        <div className="mt-3 space-y-2">
                          <p>•Bomberos:<br /><span className="text-[#E96A2B]">834-128-23-43</span></p>
                          <p>•Ayuntamiento:<br /><span className="text-[#E96A2B]">834-464-32-17</span></p>
                          <p>•Protección civil:<br /><span className="text-[#E96A2B]">834-049-92-24</span></p>
                          <p>•CFE:<br /><span className="text-[#E96A2B]">834-121-21-45</span></p>
                          <p>•Comisión del agua:<br /><span className="text-[#E96A2B]">834-353-86-09</span></p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-center text-[19.2px] leading-[1.05] font-normal">Salud y<br />Emergencias</h3>
                        <div className="mt-3 space-y-3">
                          <p>•Cruz Roja:<br /><span className="text-[#E96A2B]">834-128-23-43</span></p>
                          <p>•Policía:<br /><span className="text-[#E96A2B]">834-128-23-43</span></p>
                          <p>•Transito:<br /><span className="text-[#E96A2B]">834-128-23-43</span></p>
                          <p>•Hospital Gral:<br /><span className="text-[#E96A2B]">834-128-23-43</span></p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-center text-[19.2px] leading-[1.05] font-normal">Cultura y<br />turismo</h3>
                        <div className="mt-3 space-y-3">
                          <p>•Casa del arte:<br /><span className="text-[#E96A2B]">834-466-65-75</span></p>
                          <p>•Museo Regional:<br /><span className="text-[#E96A2B]">834-246-53-66</span></p>
                          <p>•Biblioteca municipal:<br /><span className="text-[#E96A2B]">834-788-57-97</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1
                    className="
    absolute
    top-[571px]
    left-[140px]
    -translate-x-1/2
    z-20
    text-[19px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    ¡CONECTA CON TU CIUDAD!
                  </h1>

                  <h2
                    className="
    absolute
    top-[600px]
    left-[150px]
    -translate-x-1/2
    z-20
    text-[8px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    Más información en: www.ciudadvictoria.informacion.com
                  </h2>

                  <h3
                    className="
    absolute
    top-[620px]
    left-[180px]
    -translate-x-1/2
    z-20
    text-[9px]
    leading-none
    font-taviraj
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[0.3px]
    text-white
  "
                  >
                    © 2026 Ciudad Victoria Turismo. Todos los derechos reservados.
                  </h3>

                  <h4
                    className="
    absolute
    top-[180px]
    left-1/2
    -translate-x-1/2
    z-20
    text-[36px]
    font-gentium
    font-normal
    uppercase
    whitespace-nowrap
    tracking-[-0.5px]
    text-transparent
    bg-clip-text
    bg-[linear-gradient(90deg,#FAB993_0%,#FFFFFF_50%,#FAB993_100%)]
  "
                    style={{
                      WebkitTextStroke: "0.5px #A13B00",
                      textShadow: `
      0px 1px 1px rgba(255,255,255,.55),
      1px 1px 2px rgba(161,59,0,.15)
    `,
                    }}
                  >
                    DIRECTORIO ÚTIL
                  </h4>

                  <div className="absolute top-[550px] left-[270px] z-50 p-2 flex items-center">
                    <img
                      src="/image/Logo-facebook.png"
                      alt="Facebook"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-instagram.png"
                      alt="Instagram"
                      className="w-10 h-10 object-contain"
                    />
                    <img
                      src="/image/Logo-twitter.png"
                      alt="Twitter"
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
          {/* ========== FIN SUBSECCIÓN DE TARJETAS INFORMATIVAS ==========*/}


          {/* ========== SUBSECCIÓN CARRUSEL 3D (DENTRO DE SECCIÓN 3) ========== */}

          {/* TÍTULO ANIMADO */}
          <div className="relative w-full flex flex-col items-center justify-center mt-32 z-20">

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center font-bold text-[64px]"
              style={{ fontFamily: "Libre Bodoni" }}
            >
              ¡Explora cada rincón de la ciudad!
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true }}
              className="mt-4 h-[3px] w-[180px] origin-left rounded-full bg-orange-500"
            />
          </div>

          {/* CONTENEDOR PRINCIPAL DEL CARRUSEL */}
          <div
            {...handlers}
            className="relative w-full h-[800px] flex items-center justify-center overflow-hidden"
          >
            {/* FONDO DEL CARRUSEL */}
            <img
              src="/image/FONDO-CARRUSEL.png"
              alt="Fondo carrusel"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
            />

            {/* FLECHA IZQUIERDA */}
            <button
              onClick={prevImage}
              className="
      absolute left-10 top-1/2 -translate-y-1/2 z-20
      w-[100px] h-[100px] rounded-full
      flex items-center justify-center
      shadow-xl transition duration-300 hover:scale-110
    "
              style={{ backgroundColor: "#8EBCBC" }}
            >
              <ChevronLeft size={90} strokeWidth={2.5} color="white" />
            </button>

            {/* FLECHA DERECHA */}
            <button
              onClick={nextImage}
              className="
      absolute right-10 top-1/2 -translate-y-1/2 z-20
      w-[100px] h-[100px] rounded-full
      flex items-center justify-center
      shadow-xl transition duration-300 hover:scale-110
    "
              style={{ backgroundColor: "#8EBCBC" }}
            >
              <ChevronRight size={90} strokeWidth={2.5} color="white" />
            </button>

            {/* CARRUSEL 3D DE IMAGENES */}
            <div className="relative perspective-[1200px] w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>

              {images.map((image, i) => {
                const pos = getRelativeIndex(i);
                if (pos === null) return null;

                return (
                  <motion.div
                    key={image.id}
                    className="
            absolute w-[980px] h-[592px]
            rounded-xl overflow-hidden shadow-2xl
            transition-all duration-500 ease-in-out
          "
                    style={getTransformStyle(pos)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.name}
                      width={980}
                      height={592}
                      className="object-cover w-full h-full"
                      priority={i === currentIndex}
                    />
                  </motion.div>
                );
              })}

            </div>
          </div>

          {/* ========== FIN SUBSECCIÓN CARRUSEL 3D ========== */}


          {/* DECORACIÓN INFERIOR */}
          <div className="relative w-full h-[150px]">
            <img
              src="/image/DECORACION-FLECHA-1.png"
              alt="Decoración inferior"
              className="w-full h-full object-fill"
            />
          </div>

          {/* COMENTARIOS DE LA PAGINA*/}
          <CommentsSection />

        </div >
      </section >
      {/* ========== FIN DE LA SECCIÓN 3 ========== */}

    </>
  );
}




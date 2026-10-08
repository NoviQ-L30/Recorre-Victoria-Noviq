"use client";
import { useEffect, useState, useRef } from "react";

const noticias = [
  {
    titulo: "¡Descubre todo lo que Recorre Victoria tiene para ti!",
    contenido: "Recorre Victoria es tu nueva guía interactiva pensada para ayudarte a explorar y redescubrir cada rincón de Ciudad Victoria de una manera moderna, accesible y dinámica. Este innovador portal reúne una gran cantidad de recursos útiles y entretenidos para locales y visitantes por igual, convirtiéndose en una herramienta esencial para quienes desean conocer la ciudad a fondo. Desde mapas interactivos con rutas de transporte público actualizadas, hasta detalladas reseñas de fraccionamientos, galerías fotográficas, y secciones dedicadas a la historia y cultura de la región, Recorre Victoria ofrece una experiencia completa e inmersiva. Podrás visualizar las colonias de la ciudad, identificar zonas de interés, conocer su contexto social y explorar sitios que quizás no sabías que existían, todo con solo unos clics. Además, el sitio cuenta con un diseño intuitivo y navegación amigable, acompañado de animaciones modernas que hacen tu recorrido digital mucho más agradable. Ya seas turista, estudiante, nuevo residente o simplemente un victorense curioso por conocer más de su entorno, esta plataforma está hecha para ti. Descubre datos curiosos, planifica tus recorridos, ubica transporte fácilmente, y sumérgete en la identidad de tu ciudad como nunca antes. Recorre Victoria no solo te guía, también te conecta con tu entorno. Prepárate para vivir una experiencia digital que combina tecnología y tradición al servicio del conocimiento local.",
    imagen: "/image/LOGO-GOD-NEW.png",
  },
  {
    titulo: "Victoria inaugura su primer parque ecológico flotante",
    contenido: "Ciudad Victoria, Tamaulipas. En un esfuerzo por impulsar la conciencia ambiental y ofrecer nuevas opciones de recreación, el ayuntamiento de Ciudad Victoria inauguró este fin de semana el primer parque ecológico flotante del estado. Ubicado en la presa Vicente Guerrero, el parque cuenta con senderos flotantes, zonas de descanso sobre plataformas acuáticas, jardines sostenibles y áreas de observación de aves. “Queremos que los ciudadanos se reconecten con la naturaleza de una forma innovadora”, declaró el alcalde durante la ceremonia de apertura. El proyecto, que tardó 14 meses en completarse, fue realizado con materiales reciclables y paneles solares, lo que lo convierte en un modelo de espacio verde autosustentable. Las visitas serán gratuitas durante el primer mes de apertura, con horarios de lunes a domingo de 7:00 am a 7:00 pm.",
    imagen: "/image/avatar3.jpg",
  },
  {
    titulo: "Nueva línea de teleférico conectará el centro con la sierra de Tamatán",
    contenido: "Ciudad Victoria, Tamaulipas. El gobierno municipal anunció este lunes la construcción de una línea de teleférico turístico que conectará el centro histórico de Ciudad Victoria con la cima de la Sierra de Tamatán. Esta iniciativa, llamada “Victoria desde las Alturas”, busca promover el ecoturismo, reducir el tráfico vehicular y ofrecer a los visitantes una vista panorámica única de la ciudad. El recorrido tendrá una duración aproximada de 12 minutos por trayecto, con cabinas climatizadas y capacidad para seis personas cada una. El proyecto también contempla la creación de un mirador, un centro cultural en la cima y una cafetería con productos locales. Se espera que el teleférico esté listo para el segundo semestre del próximo año. Autoridades locales aseguran que esta obra impulsará la economía y creará al menos 150 empleos directos e indirectos.",
    imagen: "/image/Teleferico.jpg",
  },
  {
    titulo: "Se descubre túnel histórico bajo la Plaza del 15",
    contenido: "Ciudad Victoria, Tamaulipas. Un grupo de arqueólogos locales encontró por accidente un túnel subterráneo que data del siglo XIX justo debajo de la emblemática Plaza del 15. El hallazgo se realizó mientras se llevaban a cabo obras de rehabilitación del drenaje en el centro histórico. El túnel, hecho de ladrillo y piedra, se extiende aproximadamente 200 metros hacia el sur, y se cree que formó parte de un antiguo sistema de escape durante la época de conflictos civiles. Hasta ahora, se han encontrado documentos, lámparas de aceite y herramientas oxidadas en su interior. El Instituto Nacional de Antropología e Historia (INAH) ya está colaborando para preservar el sitio y abrirlo eventualmente al público. “Este descubrimiento representa un capítulo perdido de la historia de Victoria”, comentó la directora del archivo histórico municipal. Se espera que el lugar sea acondicionado como una atracción turística cultural para el próximo año.",
    imagen: "/image/Tunel.jpg",
  },
];

export default function NoticiasRotativas() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % noticias.length);
    }, 30000);
  };

  const stopRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startRotation();
    return () => stopRotation();
  }, []);

  const noticiaActual = noticias[index];

  return (

    <div
      onMouseEnter={stopRotation}
      onMouseLeave={startRotation}
      className="
        w-full
        max-w-[300px]
        bg-[#FFFDE6]
        rounded-xl
        shadow-lg
        p-3
        flex
        flex-col
        h-full
        max-h-[820px]
        -ml-5
      "
    >
      {/* NUEVO CONTENEDOR BLANCO UNIFICADO */}
      <div className="bg-white rounded-lg h-full flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="text-center pt-4 px-4 pb-0 border-b border-gray-200">
          <h2 className="text-[22px] md:text-[26px] font-serif font-bold tracking-wide">
            NOTICIAS
          </h2>
        </div>

        {/* CONTENIDO */}
        <div
          className="
    flex-1
    mt-3
    overflow-y-auto
    pr-2
    transition-all
    duration-300
  "
          style={{
            scrollbarColor: 'rgba(209, 213, 219, 0.5) transparent'
          }}
        >
          <style>{`
            div[style*="scrollbarColor"]::-webkit-scrollbar {
              width: 6px;
            }
            div[style*="scrollbarColor"]::-webkit-scrollbar-track {
              background: transparent;
            }
            div[style*="scrollbarColor"]::-webkit-scrollbar-thumb {
              background: rgba(209, 213, 219, 0.5);
              border-radius: 4px;
            }
            div[style*="scrollbarColor"]::-webkit-scrollbar-thumb:hover {
              background: rgba(209, 213, 219, 0.8);
            }
          `}</style>

          <h3 className="text-[15px] md:text-[16px] font-semibold mb-2 text-gray-700 pt-0 px-2 pb-0">
            {noticiaActual.titulo}
          </h3>

          {/* Texto */}
          <p className="
  text-[13px]
  md:text-[14px]
  leading-relaxed
  text-justify
  text-gray-800
  whitespace-pre-wrap
  mb-[10px]
  pt-0 pl-2 pr-0 pb-0
">

            {noticiaActual.contenido}
          </p>

          {/* Imagen ajustada para no recortarse */}
          <img
            src={noticiaActual.imagen}
            alt={noticiaActual.titulo}
            className="w-full h-auto max-h-[300px] object-contain rounded-lg mb-3 pl-2"
          />
        </div>
      </div>
    </div>
  );
}

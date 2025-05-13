"use client";
import { useEffect, useState, useRef } from "react";

const noticias = [
  {
    titulo: "📰 0.¡Descubre todo lo que Recorre Victoria tiene para ti!",
    contenido: "Recorre Victoria es tu nueva guía interactiva pensada para ayudarte a explorar y redescubrir cada rincón de Ciudad Victoria de una manera moderna, accesible y dinámica. Este innovador portal reúne una gran cantidad de recursos útiles y entretenidos para locales y visitantes por igual, convirtiéndose en una herramienta esencial para quienes desean conocer la ciudad a fondo. Desde mapas interactivos con rutas de transporte público actualizadas, hasta detalladas reseñas de fraccionamientos, galerías fotográficas, y secciones dedicadas a la historia y cultura de la región, Recorre Victoria ofrece una experiencia completa e inmersiva. Podrás visualizar las colonias de la ciudad, identificar zonas de interés, conocer su contexto social y explorar sitios que quizás no sabías que existían, todo con solo unos clics. Además, el sitio cuenta con un diseño intuitivo y navegación amigable, acompañado de animaciones modernas que hacen tu recorrido digital mucho más agradable. Ya seas turista, estudiante, nuevo residente o simplemente un victorense curioso por conocer más de su entorno, esta plataforma está hecha para ti. Descubre datos curiosos, planifica tus recorridos, ubica transporte fácilmente, y sumérgete en la identidad de tu ciudad como nunca antes. Recorre Victoria no solo te guía, también te conecta con tu entorno. Prepárate para vivir una experiencia digital que combina tecnología y tradición al servicio del conocimiento local.",
    imagen: "/image/LOGO-GOD.png",
  },
  {
    titulo: "📰 1. Victoria inaugura su primer parque ecológico flotante",
    contenido: "Ciudad Victoria, Tamaulipas. En un esfuerzo por impulsar la conciencia ambiental y ofrecer nuevas opciones de recreación, el ayuntamiento de Ciudad Victoria inauguró este fin de semana el primer parque ecológico flotante del estado. Ubicado en la presa Vicente Guerrero, el parque cuenta con senderos flotantes, zonas de descanso sobre plataformas acuáticas, jardines sostenibles y áreas de observación de aves. “Queremos que los ciudadanos se reconecten con la naturaleza de una forma innovadora”, declaró el alcalde durante la ceremonia de apertura. El proyecto, que tardó 14 meses en completarse, fue realizado con materiales reciclables y paneles solares, lo que lo convierte en un modelo de espacio verde autosustentable. Las visitas serán gratuitas durante el primer mes de apertura, con horarios de lunes a domingo de 7:00 am a 7:00 pm.",
    imagen: "/image/Parque.jpg",
  },
  {
    titulo: "📰 2. Nueva línea de teleférico conectará el centro con la sierra de Tamatán",
    contenido: "Ciudad Victoria, Tamaulipas. El gobierno municipal anunció este lunes la construcción de una línea de teleférico turístico que conectará el centro histórico de Ciudad Victoria con la cima de la Sierra de Tamatán. Esta iniciativa, llamada “Victoria desde las Alturas”, busca promover el ecoturismo, reducir el tráfico vehicular y ofrecer a los visitantes una vista panorámica única de la ciudad. El recorrido tendrá una duración aproximada de 12 minutos por trayecto, con cabinas climatizadas y capacidad para seis personas cada una. El proyecto también contempla la creación de un mirador, un centro cultural en la cima y una cafetería con productos locales. Se espera que el teleférico esté listo para el segundo semestre del próximo año. Autoridades locales aseguran que esta obra impulsará la economía y creará al menos 150 empleos directos e indirectos.",
    imagen: "/image/Teleferico.jpg",
  },
  {
    titulo: "📰 3. Se descubre túnel histórico bajo la Plaza del 15",
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
    }, 30000); // cada 30 segundos
  };

  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startRotation();
    return () => stopRotation(); // limpiar al desmontar
  }, []);

  const noticiaActual = noticias[index];

  return (
    <div
      onMouseEnter={stopRotation}
      onMouseLeave={startRotation}
      className="absolute top-[1150px] left-[1045px] w-[300px] h-[750px] rounded-lg shadow-lg"
      style={{ backgroundColor: "#69D2E7" }}
    >
      <div className="w-[calc(100%-24px)] h-[calc(100%-24px)] bg-white rounded-lg mx-auto my-3 p-3 flex flex-col justify-between">
        {/* TÍTULO GENERAL */}
        <div className="text-center bg-yellow-200 rounded-t-lg py-2 border-b border-gray-300 bg-opacity-0">
          <h2
            className="text-xl font-serif font-bold tracking-wide"
            style={{ fontSize: "28px" }}
          >
            NOTICIAS
          </h2>
        </div>

        {/* CONTENIDO DE NOTICIA */}
        <div className="flex-1 w-full overflow-y-auto bg-opacity-50 scrollbar-hide hover:scrollbar-default transition-all ease-in-out mt-4 px-1">
          <h3
            className="text-gray-700 text-base font-semibold mb-2"
            style={{ fontSize: "18px" }}
          >
            {noticiaActual.titulo}
          </h3>
          <p className="text-justify text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {noticiaActual.contenido}
          </p>

          {/* IMAGEN */}
          <div className="mt-4">
            <img
              src={noticiaActual.imagen}
              alt={noticiaActual.titulo}
              className="rounded-md object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

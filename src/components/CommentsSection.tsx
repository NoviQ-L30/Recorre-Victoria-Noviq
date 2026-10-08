// components/CommentsSection.tsx
"use client";
import { useState } from "react";
import CommentCard from "./comment-card";
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

const emojis = ["👍", "😊", "😄", "😍", "😢", "😡"];

const dummyComments = [
  {
    img: "/image/avatar3.jpg",
    name: "Mary Lewis",
    desc: "Just watched the latest Bollywood blockbuster! The songs were so catchy, and the dance numbers were breathtaking...",
    hours: "2 weeks ago",
  },
];

export default function CommentsSection() {
  const [comment, setComment] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setComment((prev) => prev + " " + emoji);
  };

  return (
    <div
      className="relative overflow-hidden py-16 pb-[516px]"
      style={{
        backgroundImage: "url('/image/FONDO-COMENTARIOS2.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="absolute inset-0 bg-white/25" />

      <div className="relative max-w-6xl mx-auto px-6 translate-y-[100px]">
        {/* ================= ENCABEZADO INDICADOR ================= */}
        <div className="flex flex-col items-center mb-16">
          {/* Icono con fondo turquesa suave */}
          <div className="bg-teal-50 p-4 rounded-full mb-4 shadow-sm shadow-teal-100/50">
            <ChatBubbleLeftRightIcon className="h-9 w-9 text-teal-500" />
          </div>

          <h2
            className="text-4xl font-bold text-gray-900 mb-2 text-center"
            style={{ fontFamily: "Libre Bodoni" }}
          >
            Sección de comentarios
          </h2>

          {/* Línea decorativa en color naranja/durazno */}
          <div className="w-24 h-1 bg-orange-400 rounded-full mb-3"></div>

          <p className="text-lg text-gray-600 font-medium" style={{ fontFamily: "Libre Bodoni" }}>
            ¿Qué te pareció este rincón de la ciudad?
          </p>
        </div>

        {/* ================= CAJA DE ENTRADA RESALTADA ================= */}
        <div className="max-w-5xl mx-auto bg-white/85 border border-teal-100 rounded-[30px] p-7 shadow-xl shadow-orange-100/40 mb-20 relative overflow-hidden backdrop-blur-[1px]">
          {/* Indicador lateral de foco en color naranja */}
          <div className="absolute top-0 left-0 w-2.5 h-full bg-orange-500"></div>

          <textarea
            className="w-full p-5 bg-orange-50/20 border border-teal-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 text-lg text-gray-700 transition-all placeholder:text-gray-400"
            rows={6}
            placeholder="Comparte tu experiencia con nosotros..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ fontFamily: "Libre Bodoni" }}
          />

          <div className="flex justify-between items-center mt-6">
            {/* Emojis con efecto hover */}
            <div className="flex gap-3">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl hover:scale-125 transition-transform duration-200 active:scale-95 grayscale hover:grayscale-0"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Botón de publicar en color naranja */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-3 px-10 py-3 rounded-full transition-all shadow-lg shadow-orange-200 active:scale-95 group">
              <span className="font-bold" style={{ fontFamily: "Libre Bodoni" }}>Publicar</span>
              <PaperAirplaneIcon className="h-5 w-5 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ================= LISTADO DE COMENTARIOS ================= */}
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex items-center gap-5 border-b border-teal-50 pb-8 mb-10">
            <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Libre Bodoni" }}>
              Conversación activa
            </h3>
            {/* Badge de conteo en tonos turquesa */}
            <span className="bg-teal-50 text-teal-700 px-5 py-1.5 rounded-full text-md font-bold border border-teal-100">
              {dummyComments.length} comentarios
            </span>
          </div>

          <div className="space-y-10">
            {dummyComments.map((comment, i) => (
              <CommentCard key={i} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
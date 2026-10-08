"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, MessageCircle, Send } from "lucide-react";
import { Footer, Navbar } from "@/components";

const WHATSAPP_NUMBER = "528341234567";

export default function Contactos() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const whatsappMessage = [
      `Hola, soy ${name}.`,
      `Motivo: ${subject}`,
      email ? `Correo de contacto: ${email}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f1f5f3] text-[#172b2c]">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-[#366f78] px-5 pb-16 pt-36 text-white sm:px-10 lg:px-16 lg:pb-20 lg:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(19,55,61,0.96),rgba(45,111,120,0.88)_58%,rgba(89,141,137,0.78))]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 -z-10 h-[440px] w-[440px] rounded-full border border-white/15 sm:right-[9%] sm:h-[520px] sm:w-[520px]"
        />

        <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#f7dfa0]">
              <MessageCircle size={17} aria-hidden="true" />
              Contacto
            </p>
            <h1 className="font-gentium text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">
              Estamos para escucharte
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              ¿Tienes una duda, una sugerencia o quieres compartir un lugar de Victoria? Escríbenos.
            </p>
          </div>

          <div className="relative mx-auto hidden h-[250px] w-full max-w-[420px] sm:block lg:h-[290px]">
            <div className="absolute inset-x-8 bottom-3 top-3 -rotate-3 border border-white/30" />
            <div className="absolute inset-0 overflow-hidden border-[8px] border-white/90 bg-[#e8efea] shadow-[0_24px_70px_rgba(13,35,38,0.28)]">
              <Image
                src="/image/LOGO-GOD-NEW.png"
                alt="Identidad de Recorre Victoria"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-contain p-5"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:px-10 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-16 lg:py-20">
        <div className="flex flex-col">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#54838a]">
            Conversemos
          </p>
          <h2 className="font-gentium text-4xl text-[#183a3e] sm:text-5xl">
            Tu voz también recorre Victoria
          </h2>
          <p className="mt-4 text-base leading-7 text-[#536668]">
            Comparte tus preguntas, ideas y recomendaciones para ayudar a más personas a descubrir la ciudad.
          </p>

          <div className="mt-8 border-l-4 border-[#d4b76d] bg-white p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e5efec] text-[#315e63]">
                <MessageCircle size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-gentium text-2xl text-[#183a3e]">WhatsApp</h3>
                <p className="mt-1 text-sm text-[#647779]">+52 834 123 4567</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero ponerme en contacto con Recorre Victoria.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#315e63] transition hover:text-[#a06d25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3e7d83]"
                >
                  Abrir conversación <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#d5dfdc] bg-white p-5 shadow-[0_8px_28px_rgba(29,63,64,0.07)] sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#54838a]">Envíanos un mensaje</p>
            <h2 className="mt-2 font-gentium text-3xl text-[#183a3e] sm:text-4xl">¿En qué podemos ayudarte?</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#36575a]">
                Nombre
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Tu nombre"
                  className="mt-2 min-h-12 w-full border border-[#b8c9c5] bg-[#fbfcfb] px-3 text-base font-normal text-[#172b2c] outline-none transition placeholder:text-[#879596] focus:border-[#3e7d83] focus:ring-2 focus:ring-[#3e7d83]/20"
                />
              </label>
              <label className="block text-sm font-semibold text-[#36575a]">
                Correo electrónico <span className="font-normal text-[#718184]">(opcional)</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  placeholder="nombre@correo.com"
                  className="mt-2 min-h-12 w-full border border-[#b8c9c5] bg-[#fbfcfb] px-3 text-base font-normal text-[#172b2c] outline-none transition placeholder:text-[#879596] focus:border-[#3e7d83] focus:ring-2 focus:ring-[#3e7d83]/20"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-[#36575a]">
              Motivo del mensaje
              <select
                name="subject"
                required
                defaultValue=""
                className="mt-2 min-h-12 w-full border border-[#b8c9c5] bg-[#fbfcfb] px-3 text-base font-normal text-[#172b2c] outline-none transition focus:border-[#3e7d83] focus:ring-2 focus:ring-[#3e7d83]/20"
              >
                <option value="" disabled>Selecciona un motivo</option>
                <option>Información sobre rutas</option>
                <option>Recomendar un lugar</option>
                <option>Sugerencia para el sitio</option>
                <option>Otro tema</option>
              </select>
            </label>

            <label className="block text-sm font-semibold text-[#36575a]">
              Mensaje
              <textarea
                name="message"
                required
                minLength={5}
                maxLength={1000}
                rows={5}
                placeholder="Cuéntanos cómo podemos ayudarte..."
                className="mt-2 w-full resize-y border border-[#b8c9c5] bg-[#fbfcfb] px-3 py-3 text-base font-normal leading-6 text-[#172b2c] outline-none transition placeholder:text-[#879596] focus:border-[#3e7d83] focus:ring-2 focus:ring-[#3e7d83]/20"
              />
            </label>

            <div className="flex flex-col gap-4 border-t border-[#dbe4e1] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-5 text-[#718184]">
                El mensaje se preparará en WhatsApp para que puedas revisarlo y enviarlo.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#315e63] px-5 font-semibold text-white transition hover:bg-[#24494d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e7d83]"
              >
                Enviar por WhatsApp <Send size={17} aria-hidden="true" />
              </button>
            </div>

            {submitted && (
              <p role="status" className="flex items-center gap-2 text-sm font-medium text-[#315e63]">
                <Check size={17} aria-hidden="true" /> Revisa la nueva pestaña para enviar tu mensaje.
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
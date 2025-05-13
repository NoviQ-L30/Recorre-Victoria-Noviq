"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";

import CommentList from "@/components/comment-card";
import { NewComment } from "@/components/new-comment";

export function Comments() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col px-5 pb-20">
      {/* Título de sección */}
      <Typography
        variant="h4"
        className="md:text-center mb-6"
        color="blue-gray"
      >
        Sección de comentarios
      </Typography>

      {/* Formulario para nuevo comentario (AHORA ARRIBA) */}
      <Typography
        variant="h5"
        className="mb-4 md:text-center"
        color="blue-gray"
      >
        Escribe un comentario
      </Typography>

      <NewComment />

      {/* Lista de comentarios */}
      <div className="mt-10">
        <CommentList />
      </div>
    </section>
  );
}

export default Comments;

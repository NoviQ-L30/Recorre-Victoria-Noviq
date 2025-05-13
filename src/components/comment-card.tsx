"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat"; // Opcional si quieres formato bonito
import "dayjs/locale/es";

// Activar plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Establecer idioma
dayjs.locale("es");

interface Comment {
  id: number;
  img: string;
  name: string;
  desc: string;
  createdAt: string; // formato ISO: '2024-04-20T10:00:00Z'
  likes: number;
  replies: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    img: "/image/avatar1.jpg",
    name: "Maria Pérez",
    desc: "Me parece increíble cómo este proyecto ha logrado captar la atención de tantas personas en tan poco tiempo. Cada detalle está cuidadosamente trabajado y se nota el esfuerzo que hay detrás de cada decisión. Felicidades a todo el equipo por crear un espacio tan inspirador y lleno de contenido de calidad. ¡Sigan adelante, este solo es el comienzo de algo aún más grande!",
    createdAt: "2025-04-10T14:00:00Z",
    likes: 10,
    replies: 2,
  },
  {
    id: 2,
    img: "/image/avatar2.jpg",
    name: "José Martínez",
    desc: "La verdad es que no suelo dejar comentarios, pero en esta ocasión sentí la necesidad de hacerlo. La manera en la que han organizado todo el contenido facilita muchísimo la navegación y hace que uno se quede explorando durante horas. Se agradece que aún existan proyectos que piensan tanto en la experiencia del usuario. ¡Mucho éxito en lo que viene!",
    createdAt: "2025-04-28T16:30:00Z",
    likes: 25,
    replies: 5,
  },
  // Puedes agregar más comentarios aquí
];

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [sortOption, setSortOption] = useState<string>("recent");

  const sortComments = (option: string) => {
    let sorted = [...comments];
    if (option === "recent") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (option === "oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (option === "likes") {
      sorted.sort((a, b) => b.likes - a.likes);
    }
    setComments(sorted);
    setSortOption(option);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header de comentarios */}
      <div className="flex justify-between items-center">
        <Typography variant="h5" className="text-gray-800">
          {comments.length} Comentarios
        </Typography>
        <div className="w-40">
          <Select
            label="Mostrar por"
            value={sortOption}
            onChange={(val) => sortComments(val || "recent")}
          >
            <Option value="recent">Recientes</Option>
            <Option value="oldest">Viejos</Option>
            <Option value="likes">Más Likeados</Option>
          </Select>
        </div>
      </div>

      {/* Lista de comentarios */}
      {comments.map((comment) => (
        <Card key={comment.id} className="p-6 rounded-lg shadow-sm border">
          <CardBody className="p-0 flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={comment.img}
                    alt={comment.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <Typography className="font-bold text-gray-900">
                    {comment.name}
                  </Typography>
                </div>
              </div>
              <Typography className="text-sm text-gray-400">
                {dayjs(comment.createdAt).fromNow()}
              </Typography>
            </div>

            {/* Comentario */}
            <Typography className="text-gray-700 text-sm leading-relaxed">
              {comment.desc}
            </Typography>

            {/* Footer: Reacciones */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-gray-500 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
                  <HandThumbUpIcon className="w-5 h-5" />
                  <span>{comment.likes}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
                  <HandThumbDownIcon className="w-5 h-5" />
                  <span>{comment.replies}</span>
                </div>
              </div>

              {/* Botón de Reply */}
              <Button
                size="sm"
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
              >
                <ArrowUturnLeftIcon className="w-4 h-4" />
                Responder
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

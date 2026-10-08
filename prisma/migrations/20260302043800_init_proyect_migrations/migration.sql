-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagen" TEXT,
    "publicada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" INTEGER,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "noticiaId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatoCurioso" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER,

    CONSTRAINT "DatoCurioso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colonia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "coordenadas" JSONB NOT NULL,
    "color" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Colonia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT,
    "orden" INTEGER,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "coloniaId" INTEGER,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "icono" TEXT,
    "orden" INTEGER,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterLink" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orden" INTEGER,

    CONSTRAINT "FooterLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" SERIAL NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarouselImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT,
    "orden" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarouselImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "SiteConfig_clave_key" ON "SiteConfig"("clave");

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_coloniaId_fkey" FOREIGN KEY ("coloniaId") REFERENCES "Colonia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

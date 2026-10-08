-- CreateTable
CREATE TABLE "CuriousFact" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '¿Sabías qué?',
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageId" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CuriousFact_pkey" PRIMARY KEY ("id")
);

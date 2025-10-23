-- CreateEnum
CREATE TYPE "EstadoPostulacion" AS ENUM ('ENVIADA', 'EN_REVISION', 'ENTREVISTA', 'RECHAZADA', 'ACEPTADA');

-- CreateEnum
CREATE TYPE "TipoEntrevista" AS ENUM ('RRHH', 'TECNICA', 'CULTURAL', 'FINAL', 'OTRA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postulacion" (
    "id" SERIAL NOT NULL,
    "empresa" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "estado" "EstadoPostulacion" NOT NULL DEFAULT 'ENVIADA',
    "fuente" TEXT,
    "descripcion" TEXT,
    "notas" TEXT,
    "link" TEXT,
    "imagen" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Postulacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrevista" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoEntrevista" NOT NULL DEFAULT 'OTRA',
    "entrevistador" TEXT,
    "fecha" TIMESTAMP(3),
    "notas" TEXT,
    "numero" INTEGER,
    "postulacionId" INTEGER NOT NULL,

    CONSTRAINT "Entrevista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "habilidadesBlandas" TEXT[],
    "habilidadesTech" TEXT[],
    "experiencia" TEXT[],
    "educacion" TEXT[],
    "idiomas" TEXT[],
    "certificaciones" TEXT[],
    "intereses" TEXT[],
    "ubicacion" TEXT,
    "disponibilidad" TEXT,
    "linkedin" TEXT,
    "cvUrl" TEXT,
    "portfolioUrl" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Postulacion" ADD CONSTRAINT "Postulacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrevista" ADD CONSTRAINT "Entrevista_postulacionId_fkey" FOREIGN KEY ("postulacionId") REFERENCES "Postulacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

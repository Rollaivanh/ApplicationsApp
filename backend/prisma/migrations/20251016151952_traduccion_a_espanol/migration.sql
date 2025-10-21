/*
  Warnings:

  - You are about to drop the `Postulation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Postulation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Postulacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "descripcion" TEXT,
    "link" TEXT NOT NULL,
    "imagen" TEXT,
    "fechaEntrevista" DATETIME,
    "estado" TEXT NOT NULL DEFAULT 'Enviada',
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadaEn" DATETIME NOT NULL
);

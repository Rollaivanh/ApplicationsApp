-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postulacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "descripcion" TEXT,
    "link" TEXT,
    "imagen" TEXT,
    "fechaEntrevista" DATETIME,
    "estado" TEXT NOT NULL DEFAULT 'Enviada',
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadaEn" DATETIME NOT NULL
);
INSERT INTO "new_Postulacion" ("actualizadaEn", "creadaEn", "descripcion", "empresa", "estado", "fechaEntrevista", "id", "imagen", "link", "puesto") SELECT "actualizadaEn", "creadaEn", "descripcion", "empresa", "estado", "fechaEntrevista", "id", "imagen", "link", "puesto" FROM "Postulacion";
DROP TABLE "Postulacion";
ALTER TABLE "new_Postulacion" RENAME TO "Postulacion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

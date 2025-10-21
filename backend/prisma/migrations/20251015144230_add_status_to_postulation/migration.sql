-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postulation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "descripcion" TEXT,
    "link" TEXT NOT NULL,
    "image" TEXT,
    "interviewAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Enviada'
);
INSERT INTO "new_Postulation" ("createdAt", "descripcion", "empresa", "id", "image", "interviewAt", "link", "puesto", "updatedAt") SELECT "createdAt", "descripcion", "empresa", "id", "image", "interviewAt", "link", "puesto", "updatedAt" FROM "Postulation";
DROP TABLE "Postulation";
ALTER TABLE "new_Postulation" RENAME TO "Postulation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

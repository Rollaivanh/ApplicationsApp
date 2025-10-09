-- CreateTable
CREATE TABLE "Postulation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "descripcion" TEXT,
    "link" TEXT NOT NULL,
    "image" TEXT,
    "interviewAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

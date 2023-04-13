/*
  Warnings:

  - You are about to drop the `figurinha` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "figurinha" DROP CONSTRAINT "figurinha_albumId_fkey";

-- DropForeignKey
ALTER TABLE "figurinha" DROP CONSTRAINT "figurinha_userId_fkey";

-- DropTable
DROP TABLE "figurinha";

-- CreateTable
CREATE TABLE "figurinhas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "figurinhas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "figurinhas_numero_key" ON "figurinhas"("numero");

-- AddForeignKey
ALTER TABLE "figurinhas" ADD CONSTRAINT "figurinhas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "figurinhas" ADD CONSTRAINT "figurinhas_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

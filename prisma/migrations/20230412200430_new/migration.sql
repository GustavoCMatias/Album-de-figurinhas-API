/*
  Warnings:

  - You are about to drop the `figurinhas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "figurinhas" DROP CONSTRAINT "figurinhas_albumId_fkey";

-- DropForeignKey
ALTER TABLE "figurinhas" DROP CONSTRAINT "figurinhas_userId_fkey";

-- DropTable
DROP TABLE "figurinhas";

-- CreateTable
CREATE TABLE "figurinha" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "figurinha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "figurinha" ADD CONSTRAINT "figurinha_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "figurinha" ADD CONSTRAINT "figurinha_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

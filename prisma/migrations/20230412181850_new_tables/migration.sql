/*
  Warnings:

  - Added the required column `albumId` to the `figurinhas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `figurinhas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "figurinhas" ADD COLUMN     "albumId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albuns" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "albuns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "figurinhas" ADD CONSTRAINT "figurinhas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "figurinhas" ADD CONSTRAINT "figurinhas_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albuns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

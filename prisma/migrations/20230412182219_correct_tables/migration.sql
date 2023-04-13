/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `albuns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albuns_nome_key" ON "albuns"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

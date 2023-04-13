-- CreateTable
CREATE TABLE "figurinhas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "figurinhas_pkey" PRIMARY KEY ("id")
);

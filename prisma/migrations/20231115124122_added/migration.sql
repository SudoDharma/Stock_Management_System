-- CreateTable
CREATE TABLE "Pemesanan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal" TEXT NOT NULL,
    "barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pemesanan_pkey" PRIMARY KEY ("id")
);

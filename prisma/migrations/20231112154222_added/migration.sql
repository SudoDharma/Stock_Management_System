-- CreateTable
CREATE TABLE "Penjualan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal" TEXT NOT NULL,
    "barang" TEXT[],

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id")
);

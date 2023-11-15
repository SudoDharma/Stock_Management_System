-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "namaBarang" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

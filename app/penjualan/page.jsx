import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import Link from "next/link";
import PenjualanTable from "./PenjualanTable";

const prisma = new PrismaClient();

const getPenjualan = async () => {
  const res = await prisma.penjualan.findMany();
  return res;
};

const PenjualanPage = async () => {
  const penjualan = await getPenjualan();
  const newPenjualan = [];

  penjualan.map((items) => {
    const newBarang = [];
    items.barang.map((barangString) => {
      newBarang.push(JSON.parse(barangString));
    });

    const newItems = { ...items, barang: newBarang };
    newPenjualan.push(newItems);
  });

  return (
    <div>
      <title>Penjualan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Penjualan</p>
        <Link href={"/penjualan/tambah"}>
          <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
            Tambah data
          </button>
        </Link>
        <Suspense>
          <PenjualanTable penjualan={newPenjualan} />
        </Suspense>
      </div>
    </div>
  );
};

export default PenjualanPage;

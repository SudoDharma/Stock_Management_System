import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import BarangTable from "./BarangTable";
import Link from "next/link";

const getBarang = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.barang.findMany();

  return res;
};

const BarangPage = async () => {
  const barang = await getBarang();

  return (
    <div>
      <title>Barang</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Barang</p>
        <Link href={"/barang/tambah"}>
          <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
            Tambah barang
          </button>
        </Link>
        <Suspense>
          <BarangTable barang={barang} />
        </Suspense>
      </div>
    </div>
  );
};

export default BarangPage;

import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import AddPenjualanForm from "./AddPenjualanForm";

const prisma = new PrismaClient();

const getBarang = async () => {
  const res = await prisma.barang.findMany();
  return res;
};

const TambahPenjualanPage = async () => {
  const barang = await getBarang();

  return (
    <div>
      <title>Penjualan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <div className="px-10 py-5 bg-white rounded-md shadow-md">
          <Suspense>
            <AddPenjualanForm barang={barang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TambahPenjualanPage;

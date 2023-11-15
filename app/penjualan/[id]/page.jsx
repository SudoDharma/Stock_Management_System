import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import EditPenjualanForm from "./EditPenjualanForm";

const prisma = new PrismaClient();

const getPenjualan = async (id) => {
  const res = await prisma.penjualan.findUnique({
    where: { id: Number(id) },
  });

  return res;
};

const getBarang = async () => {
  const res = await prisma.barang.findMany();

  return res;
};

const EditPenjualanPage = async ({ params }) => {
  const penjualan = await getPenjualan(params.id);
  const barang = await getBarang();

  const newPenjualan = {
    ...penjualan,
    barang: penjualan.barang.map((items) => {
      return JSON.parse(items);
    }),
  };

  return (
    <div>
      <title>Penjualan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Edit data</p>
        <div className="p-10 bg-white rounded-md shadow-md">
          <Suspense>
            <EditPenjualanForm penjualan={newPenjualan} barang={barang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EditPenjualanPage;

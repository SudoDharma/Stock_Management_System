import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import EditPemesananForm from "./EditPemesananForm";

const prisma = new PrismaClient();

const getBarang = async () => {
  const res = await prisma.barang.findMany();
  return res;
};

const getPemesanan = async (id) => {
  const res = await prisma.pemesanan.findUnique({
    where: { id: Number(id) },
  });
  return res;
};

const EditPemesananPage = async ({ params }) => {
  const barang = await getBarang();
  const pemesanan = await getPemesanan(params.id);

  return (
    <div>
      <title>Pemesanan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Edit data</p>
        <div className="p-10 bg-white rounded-md shadow-md">
          <Suspense>
            <EditPemesananForm pemesanan={pemesanan} barang={barang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EditPemesananPage;

import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import EditBarangForm from "./EditBarangForm";

const getBarang = async (id) => {
  const prisma = new PrismaClient();
  const res = await prisma.barang.findUnique({
    where: { id: Number(id) },
  });

  return res;
};

const EditBarangPage = async ({ params }) => {
  const barang = await getBarang(params.id);

  return (
    <div>
      <title>Barang</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <Suspense>
          <div className="px-10 py-5 bg-white rounded-md shadow-md">
            <EditBarangForm barang={barang} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default EditBarangPage;

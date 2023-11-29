import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import AddPemesananForm from "./AddPemesananForm";

const prisma = new PrismaClient();

const getBarang = async () => {
  const res = await prisma.barang.findMany();
  return res;
};

const AddPemesananPage = async () => {
  const barang = await getBarang();

  return (
    <div>
      <title>Pemesanan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <div className="px-10 py-5 bg-white rounded-md shadow-md">
          <Suspense>
            <AddPemesananForm barang={barang} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AddPemesananPage;

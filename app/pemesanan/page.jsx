import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import PemesananTable from "./PemesananTable";
import Link from "next/link";

const getPemesanan = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.pemesanan.findMany();

  return res;
};

const PemesananPage = async () => {
  const pemesanan = await getPemesanan();

  return (
    <div>
      <title>Pemesanan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Pemesanan</p>
        <Link href={"/pemesanan/tambah"}>
          <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
            Tambah data
          </button>
        </Link>
        <Suspense>
          <PemesananTable pemesanan={pemesanan} />
        </Suspense>
      </div>
    </div>
  );
};

export default PemesananPage;

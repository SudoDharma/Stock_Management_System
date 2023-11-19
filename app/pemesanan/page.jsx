import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import PemesananTable from "./PemesananTable";
import Link from "next/link";

const prisma = new PrismaClient();

const getPemesananTrue = async () => {
  const res = await prisma.pemesanan.findMany({
    where: { status: true },
  });

  return res;
};

const getPemesananFalse = async () => {
  const res = await prisma.pemesanan.findMany({
    where: { status: false },
  });

  return res;
};

const PemesananPage = async () => {
  const pemesananTrue = await getPemesananTrue();
  const pemesananFalse = await getPemesananFalse();

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
          <div className="my-3">
            <p className="my-3 font-medium">Pemesanan belum sampai</p>
            <PemesananTable pemesanan={pemesananFalse} />
          </div>
        </Suspense>

        <Suspense>
          <div className="my-3">
            <p className="my-3 font-medium">Pemesanan sudah sampai</p>
            <PemesananTable pemesanan={pemesananTrue} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PemesananPage;

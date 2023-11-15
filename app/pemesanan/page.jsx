import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import PemesananTable from "./PemesananTable";
import Link from "next/link";

const PemesananPage = () => {
  return (
    <div>
      <title>Pemesanan</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Pemesanan</p>
        <Link href={""}>
          <button className="my-3 h-[35px] w-[180px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md">
            Tambah data
          </button>
        </Link>
        <Suspense>
          <PemesananTable />
        </Suspense>
      </div>
    </div>
  );
};

export default PemesananPage;

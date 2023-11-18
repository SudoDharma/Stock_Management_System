import MinMaxTable from "./MinMaxTable";
import EOQTable from "./EOQTable";
import { PrismaClient } from "@prisma/client";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const prisma = new PrismaClient();

const getBarang = async () => {
  const res = await prisma.barang.findMany();
  return res;
};

const getPemesanan = async () => {
  const res = await prisma.pemesanan.findMany();
  return res;
};

const getPenjualan = async () => {
  const res = await prisma.penjualan.findMany();
  return res;
};

const MetodePage = async () => {
  const barang = await getBarang();
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
      <title>Metode</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5 flex flex-col gap-10">
        <div className="p-5 bg-white border-black rounded-md shadow-md">
          <p className="mb-3 font-medium">Metode Min/Max</p>
          <MinMaxTable barang={barang} penjualan={newPenjualan} />
        </div>
        <div className="p-5 bg-white border-black rounded-md shadow-md">
          <p className="mb-3 font-medium">Metode EOQ</p>
          <EOQTable barang={barang} penjualan={newPenjualan} />
        </div>
      </div>
    </div>
  );
};

export default MetodePage;

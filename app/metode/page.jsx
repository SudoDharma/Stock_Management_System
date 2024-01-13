import MethodWrapper from "./MethodWrapper";
import { PrismaClient } from "@prisma/client";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const prisma = new PrismaClient();

const getBarang = async () => {
  // const res = await prisma.barang.findMany();
  // return res;

  const res = await prisma.barang.findMany({
    where: { id: { gte: 1, lte: 24 } },
  });

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
  const pemesanan = await getPemesanan();

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

      <MethodWrapper barang={barang} penjualan={newPenjualan} pemesanan={pemesanan} />
    </div>
  );
};

export default MetodePage;

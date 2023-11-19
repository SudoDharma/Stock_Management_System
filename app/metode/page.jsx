import MinMaxTable from "./MinMaxTable";
import EOQTable from "./EOQTable";
import NormalTable from "./NormalTable";
import { PrismaClient } from "@prisma/client";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Tabs } from "antd";
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

  const items = [
    {
      key: "1",
      label: "Metode Min/Max",
      children: <MinMaxTable barang={barang} penjualan={newPenjualan} />,
    },
    {
      key: "2",
      label: "Metode EOQ",
      children: <EOQTable barang={barang} penjualan={newPenjualan} />,
    },
    {
      key: "3",
      label: "Metode biasa",
      children: <NormalTable barang={barang} penjualan={newPenjualan} pemesanan={pemesanan} />,
    },
  ];

  return (
    <div>
      <title>Metode</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <div className="p-5 bg-white rounded-md shadow-md">
          <Tabs defaultActiveKey="1" items={items} type="card" animated={true} />
        </div>
      </div>
    </div>
  );
};

export default MetodePage;

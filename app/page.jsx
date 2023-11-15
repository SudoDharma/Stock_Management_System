import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import { IconPackage, IconShoppingCart, IconCirclePlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import HomeTable from "./HomeTable";

const prisma = new PrismaClient();

const getPenjualan = async () => {
  const res = await prisma.penjualan.findMany();

  return res;
};

const getBarang = async () => {
  const res = await prisma.barang.findMany();

  return res;
};

const Home = async () => {
  const penjualan = await getPenjualan();
  const barang = await getBarang();

  const todayDate = dayjs().format("DD-MM-YYYY");
  const penjualanToday = penjualan.filter((item) => {
    return item.tanggal === todayDate;
  });

  const newPenjualan = [];

  penjualanToday.map((items) => {
    const newBarang = [];
    items.barang.map((barangString) => {
      newBarang.push(JSON.parse(barangString));
    });

    const newItems = { ...items, barang: newBarang };
    newPenjualan.push(newItems);
  });

  return (
    <div>
      <title>Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="px-10 py-5">
        <p className="font-medium">Home</p>
        <div className="mb-10 w-full h-[100px] flex justify-between bg-white rounded-md shadow-md">
          <div className="p-5 w-full flex gap-3">
            <div className="w-[100px]">
              <IconPackage
                height={"100%"}
                width={"100%"}
                filter={"invert(56%) sepia(67%) saturate(6189%) hue-rotate(168deg) brightness(95%) contrast(101%)"}
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-medium text-lg">Data barang</p>
              <p>{barang.length}</p>
            </div>
            <div className="ml-auto mr-0 w-[40px]">
              <IconCirclePlus height={"100%"} width={"100%"} />
            </div>
          </div>

          <div className="my-5 border-black border-2 rounded-lg"></div>

          <div className="p-5 w-full flex gap-3">
            <div className="w-[100px]">
              <IconShoppingCart
                height={"100%"}
                width={"100%"}
                filter={"invert(79%) sepia(93%) saturate(1817%) hue-rotate(332deg) brightness(102%) contrast(98%)"}
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-medium text-lg">Data penjualan</p>
              <p>{penjualan.length}</p>
            </div>
            <div className="ml-auto mr-0 w-[40px]">
              <IconCirclePlus height={"100%"} width={"100%"} />
            </div>
          </div>
        </div>
        <p className="font-medium">Data penjualan hari ini ({todayDate})</p>
        <Suspense>
          <HomeTable penjualan={newPenjualan} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

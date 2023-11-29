import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import { IconPackage, IconShoppingCart, IconCirclePlus, IconTruckDelivery } from "@tabler/icons-react";
import dayjs from "dayjs";
import HomeTable from "./HomeTable";
import HomeCard from "./components/HomeCard";

const prisma = new PrismaClient();

const getPenjualan = async () => {
  const res = await prisma.penjualan.findMany();

  return res;
};

const getBarang = async () => {
  const res = await prisma.barang.findMany();

  return res;
};

const getPemesanan = async () => {
  const res = await prisma.pemesanan.findMany();

  return res;
};

const isLoggedIn = async () => {
  const status = cookies().get("status");
  if (status === undefined) {
    redirect("/login");
  }
};

const Home = async () => {
  await isLoggedIn();
  const penjualan = await getPenjualan();
  const barang = await getBarang();
  const pemesanan = await getPemesanan();

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
        <p className="font-medium mb-3">Home</p>
        <div className="mb-10 w-full h-[150px] flex justify-between bg-white rounded-md shadow-md">
          <HomeCard
            icon={
              <IconPackage
                height={"100%"}
                width={"100%"}
                filter={"invert(56%) sepia(67%) saturate(6189%) hue-rotate(168deg) brightness(95%) contrast(101%)"}
              />
            }
            header={"Barang"}
            length={barang.length}
            destination={"/barang"}
          />

          <div className="my-5 border-black border-2 rounded-lg"></div>

          <HomeCard
            icon={
              <IconTruckDelivery
                height={"100%"}
                width={"100%"}
                filter={"invert(53%) sepia(56%) saturate(483%) hue-rotate(72deg) brightness(98%) contrast(88%)"}
              />
            }
            header={"Pemesanan"}
            length={pemesanan.length}
            destination={"/pemesanan"}
          />

          <div className="my-5 border-black border-2 rounded-lg"></div>

          <HomeCard
            icon={
              <IconShoppingCart
                height={"100%"}
                width={"100%"}
                filter={"invert(79%) sepia(93%) saturate(1817%) hue-rotate(332deg) brightness(102%) contrast(98%)"}
              />
            }
            header={"Penjualan"}
            length={penjualan.length}
            destination={"/penjualan"}
          />
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

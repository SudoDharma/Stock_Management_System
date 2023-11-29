"use client";

import { useState } from "react";
import MinMaxTable from "./MinMaxTable";
import EOQTable from "./EOQTable";
import NormalTable from "./NormalTable";
import ComparisonTable from "./ComparisonTable";
import { Tabs } from "antd";

const MethodWrapper = ({ barang, penjualan, pemesanan }) => {
  const [comparisonData, setComparisonData] = useState({
    minMax: [],
    EOQ: [],
    normal: [],
  });

  console.log(comparisonData);

  const items = [
    {
      key: "1",
      label: "Metode Min/Max",
      children: (
        <MinMaxTable
          barang={barang}
          penjualan={penjualan}
          comparisonData={comparisonData}
          setComparisonData={setComparisonData}
        />
      ),
    },
    {
      key: "2",
      label: "Metode EOQ",
      children: (
        <EOQTable
          barang={barang}
          penjualan={penjualan}
          comparisonData={comparisonData}
          setComparisonData={setComparisonData}
        />
      ),
    },
    {
      key: "3",
      label: "Metode biasa",
      children: (
        <NormalTable
          barang={barang}
          penjualan={penjualan}
          pemesanan={pemesanan}
          comparisonData={comparisonData}
          setComparisonData={setComparisonData}
        />
      ),
    },
    {
      key: "4",
      label: "Perbandingan",
      disabled:
        comparisonData.minMax.length === 0 || comparisonData.EOQ.length === 0 || comparisonData.normal.length === 0,
      children: <ComparisonTable barang={barang} comparisonData={comparisonData} />,
    },
  ];

  return (
    <div className="px-10 py-5">
      <p className="font-medium mb-3">Metode</p>
      <div className="p-5 bg-white rounded-md shadow-md">
        <Tabs defaultActiveKey="1" items={items} type="card" animated={true} />
      </div>
    </div>
  );
};

export default MethodWrapper;

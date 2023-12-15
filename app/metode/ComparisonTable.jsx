import { useState, useEffect } from "react";
import { Table } from "antd";

const ComparisonTable = ({ barang, comparisonData }) => {
  const [itemComparisonData, setItemComparisonData] = useState([]);

  useEffect(() => {
    const newItemComparison = [...itemComparisonData];
    barang.map((item, index) => {
      newItemComparison.push({
        barang: item.namaBarang,
        minMax: comparisonData.minMax[index],
        EOQ: comparisonData.EOQ[index],
        normal: comparisonData.normal[index],
      });
    });

    setItemComparisonData(newItemComparison);
  }, [comparisonData]);

  console.log(itemComparisonData);

  const columns = [
    {
      title: "",
      dataIndex: "method",
      align: "left",
      width: 100,
    },
    {
      title: "Jumlah pesanan(Q)",
      dataIndex: "orderQuantity",
      align: "center",
      width: 120,
    },
    {
      title: "Frekuensi pemesanan",
      dataIndex: "frequency",
      align: "center",
      width: 120,
    },
    {
      title: "Safety stock",
      dataIndex: "safetyStock",
      align: "center",
      width: 120,
    },
    {
      title: "Reorder point / minimum stock",
      dataIndex: "reorderPoint",
      align: "center",
      width: 120,
    },
    {
      title: "Total biaya pesan",
      dataIndex: "totalOrderCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.totalOrderCost.toLocaleString()}</p>,
    },
    {
      title: "Total biaya simpan",
      dataIndex: "totalStorageCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.totalStorageCost.toLocaleString()}</p>,
    },
    {
      title: "Total biaya",
      dataIndex: "totalCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.totalCost.toLocaleString()}</p>,
    },
  ];
  return (
    <div>
      {itemComparisonData.map((item, index) => (
        <div key={index}>
          <p className="font-semibold">{item.barang}</p>
          <Table
            className="mb-8"
            columns={columns}
            dataSource={[
              {
                method: "Min/Max",
                orderQuantity: item.minMax.orderQuantity,
                totalCost: item.minMax.totalCost,
                frequency: item.minMax.frequency,
                safetyStock: item.minMax.safetyStock,
                reorderPoint: item.minMax.minimumStock,
                totalOrderCost: item.minMax.totalOrderCost,
                totalStorageCost: item.minMax.totalStorageCost,
              },
              {
                method: "EOQ",
                orderQuantity: item.EOQ.EOQ,
                totalCost: item.EOQ.totalCost,
                frequency: item.EOQ.frequency,
                safetyStock: item.EOQ.safetyStock,
                reorderPoint: item.EOQ.reorderPoint,
                totalOrderCost: item.EOQ.totalOrderCost,
                totalStorageCost: item.EOQ.totalStorageCost,
              },
              {
                method: "Normal",
                orderQuantity: item.normal.orderQuantity,
                totalCost: item.normal.totalCost,
                frequency: item.normal.frequency,
                safetyStock: "-",
                reorderPoint: "-",
                totalOrderCost: item.normal.totalOrderCost,
                totalStorageCost: item.normal.totalStorageCost,
              },
            ]}
            pagination={false}
            rowKey={"id"}
          />
        </div>
      ))}
    </div>
  );
};

export default ComparisonTable;

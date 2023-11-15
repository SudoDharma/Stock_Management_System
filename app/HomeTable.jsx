"use client";
import { Table, Empty } from "antd";

const HomeTable = ({ penjualan }) => {
  const columns = [
    {
      title: "No.",
      width: "5%",
      align: "center",
      render: (item, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Barang yang dibeli",
      dataIndex: "barang",
      align: "left",
      width: "50%",
      render: (record) =>
        record.map((items, idx) => (
          <p key={idx}>
            {items.nama_barang} {items.jumlah} {items.satuan}
          </p>
        )),
    },
  ];
  return (
    <div className="rounded-md shadow-md">
      <Table
        locale={{ emptyText: <Empty description={"Tidak ada data"} /> }}
        columns={columns}
        dataSource={penjualan}
        rowKey={"id"}
      />
    </div>
  );
};

export default HomeTable;

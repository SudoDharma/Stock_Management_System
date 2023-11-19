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
      dataIndex: "",
      align: "center",
      width: "50%",
      children: [
        {
          title: "Nama barang",
          dataIndex: "barang",
          align: "left",
          width: "30%",
          render: (record) =>
            record.map((item, index) => (
              <p key={index}>
                {index + 1}. {item.nama_barang}
              </p>
            )),
        },
        {
          title: "Jumlah",
          dataIndex: "barang",
          align: "right",
          width: "10%",
          render: (record) => record.map((item, index) => <p key={index}>{item.jumlah}</p>),
        },
        {
          title: "Satuan",
          dataIndex: "barang",
          align: "left",
          width: "10%",
          render: (record) => record.map((item, index) => <p key={index}>{item.satuan}</p>),
        },
      ],
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

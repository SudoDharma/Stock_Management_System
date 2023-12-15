"use client";
import { Table, message, Popconfirm, Empty } from "antd";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PenjualanTable = ({ penjualan }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Berhasil menghapus data",
    });
  };

  const confirmDelete = async (id) => {
    setDeleteLoading(true);
    await fetch(`/api/penjualan/${id}`, {
      method: "DELETE",
    });

    setDeleteLoading(false);
    success();
    router.refresh();
  };

  const columns = [
    {
      title: "No.",
      width: "5%",
      align: "center",
      render: (item, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      align: "center",
      width: "25%",
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
    {
      title: "Aksi",
      align: "center",
      width: "20%",
      render: (text, record, index) => (
        <div className="flex justify-center">
          <div
            className="hover:opacity-80 transition-all cursor-pointer"
            onClick={() => {
              router.push(`/penjualan/${record.id}`);
            }}
          >
            <IconEdit />
          </div>
          <div className="hover:opacity-80 transition-all cursor-pointer">
            <Popconfirm
              title="Hapus data"
              description="Apakah anda yakin untuk menghapus data ini?"
              onConfirm={() => {
                confirmDelete(record.id);
              }}
              disabled={deleteLoading}
              okText="Ya"
              okType="default"
              cancelText="Tidak"
            >
              <IconTrash />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="rounded-md shadow-md">
        <Table
          locale={{ emptyText: <Empty description={"Tidak ada data"} /> }}
          columns={columns}
          dataSource={penjualan}
          rowKey={"id"}
        />
      </div>
    </>
  );
};

export default PenjualanTable;

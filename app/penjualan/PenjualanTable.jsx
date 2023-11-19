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
      content: "This is a success message",
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
      dataIndex: "barang",
      align: "center",
      width: "50%",
      render: (record) =>
        record.map((item) => (
          <div className="flex gap-2 font-semibold border-b-2 border-gray-200">
            <p>{item.nama_barang}</p>
            <p>{item.jumlah}</p>
            <p>{item.satuan}</p>
          </div>
        )),
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

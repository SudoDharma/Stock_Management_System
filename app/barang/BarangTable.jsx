"use client";
import { Table, message, Popconfirm, Empty } from "antd";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BarangTable = ({ barang }) => {
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
    await fetch(`/api/barang/${id}`, {
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
      title: "Nama barang",
      dataIndex: "namaBarang",
      align: "left",
      width: "30%",
    },
    {
      title: "Stok",
      dataIndex: "stok",
      align: "right",
      width: "10%",
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      align: "left",
      width: "20%",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      align: "left",
      width: "20%",
      render: (item, record, index) => <p>Rp. {record.harga.toLocaleString()}</p>,
    },
    {
      title: "Harga pemesanan",
      dataIndex: "hargaPemesanan",
      align: "left",
      width: "20%",
      render: (item, record, index) => <p>Rp. {record.hargaPemesanan.toLocaleString()}</p>,
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
              router.push(`/barang/${record.id}`);
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
          dataSource={barang}
          rowKey={"id"}
        />
      </div>
    </>
  );
};

export default BarangTable;

"use client";
import { Table, message, Popconfirm, Empty } from "antd";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PemesananTable = ({ pemesanan }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Berhasil menghapus data",
    });
  };

  const warn = () => {
    messageApi.open({
      type: "warning",
      content: 'Pemesanan dengan status "Sampai" tidak bisa diedit',
    });
  };

  const confirmDelete = async (id) => {
    setDeleteLoading(true);
    await fetch(`/api/pemesanan/${id}`, {
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
      width: "20%",
    },
    {
      title: "Barang",
      dataIndex: "barang",
      align: "left",
      width: "25%",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      align: "right",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "left",
      width: "20%",
      render: (item, record, index) =>
        item ? (
          <p className="text-green-500 font-semibold">Sampai</p>
        ) : (
          <p className="text-red-500 font-semibold">Belum</p>
        ),
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
              if (record.status === true) {
                warn();
              } else {
                router.push(`/pemesanan/${record.id}`);
              }
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
          dataSource={pemesanan}
          rowKey={"id"}
        />
      </div>
    </>
  );
};

export default PemesananTable;

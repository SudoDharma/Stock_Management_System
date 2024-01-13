"use client";

import { useState } from "react";
import { Table, Form, DatePicker, Empty } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const EOQTable = ({ barang, penjualan, comparisonData, setComparisonData }) => {
  const [EOQ, setEOQ] = useState([]);
  const [form] = Form.useForm();

  const countEOQ = (nama_barang, tanggal_mulai, tanggal_selesai) => {
    const leadTime = 7;
    const storageCost = 12000000;

    const itemSales = [];
    const penjualanTahun = penjualan.filter((item) => {
      return (
        dayjs(item.tanggal, "DD-MM-YYYY").isBefore(dayjs(tanggal_mulai, "DD-MM-YYYY")) &&
        dayjs(item.tanggal, "DD-MM-YYYY").isAfter(dayjs(tanggal_selesai, "DD-MM-YYYY"))
      );
    });

    penjualanTahun.map((item1) => {
      item1.barang.map((item2) => {
        if (item2.nama_barang === nama_barang) {
          itemSales.push(item2);
        }
      });
    });

    const salesNumber = itemSales.map((item) => {
      return item.jumlah;
    });

    const totalSalesInYear = salesNumber.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    const itemCost = barang.filter((item1) => item1.namaBarang === nama_barang).map((item2) => item2.harga);
    const orderCost = barang.filter((item1) => item1.namaBarang === nama_barang).map((item2) => item2.hargaPemesanan);
    const holdingCost = Math.round(storageCost / totalSalesInYear);

    const EOQ = Math.round(Math.sqrt((2 * totalSalesInYear * orderCost[0]) / holdingCost));

    const frequency = Math.round(totalSalesInYear / EOQ);

    const maximumSalesInYear = Math.max(...salesNumber);
    const averageSalesInYear = Math.round(totalSalesInYear / 12);
    const safetyStock = Math.ceil((maximumSalesInYear / 26 - averageSalesInYear / 26) * leadTime);

    const reorderPoint = Math.ceil((averageSalesInYear / 26) * leadTime + safetyStock);

    const totalPurchaseCost = Math.ceil(totalSalesInYear * itemCost[0]);
    const totalOrderCost = Math.round((totalSalesInYear * orderCost[0]) / EOQ);
    const totalStorageCost = Math.round((EOQ * holdingCost) / 2);
    const totalCost = Math.round(totalPurchaseCost + totalOrderCost + totalStorageCost);

    return {
      totalSalesInYear: totalSalesInYear,
      itemCost: itemCost[0],
      holdingCost: holdingCost,
      EOQ: EOQ,
      frequency: frequency,
      leadTime: leadTime,
      reorderPoint: reorderPoint,
      safetyStock: safetyStock,
      orderCost: orderCost[0],
      totalPurchaseCost: totalPurchaseCost,
      totalOrderCost: totalOrderCost,
      totalStorageCost: totalStorageCost,
      totalCost: totalCost,
    };
  };

  const onFinish = (values) => {
    const tanggal_mulai = dayjs(values.tanggal_mulai, "DD-MM-YYYY");
    const tanggal_selesai = dayjs(values.tanggal_selesai, "DD-MM-YYYY");
    const EOQBarang = [];

    barang.map((item) => {
      const EOQValues = countEOQ(item.namaBarang, tanggal_mulai, tanggal_selesai);
      EOQBarang.push({ ...EOQValues, ...item });
    });

    setEOQ(EOQBarang);

    const newComparisonData = { ...comparisonData };
    newComparisonData.EOQ = [...EOQBarang];
    setComparisonData(newComparisonData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
  };

  const handleChange = () => {
    const selectedDate = form.getFieldValue(["tanggal_mulai"]);
    if (selectedDate !== null) {
      form.setFieldValue(["tanggal_selesai"], dayjs(selectedDate, "DD-MM-YYYY").subtract(1, "year"));
    }
  };

  const columns = [
    {
      title: "No.",
      width: 75,
      align: "center",
      render: (item, record, index) => <p>{index + 1}</p>,
      fixed: "left",
    },
    {
      title: "Nama barang",
      dataIndex: "namaBarang",
      align: "left",
      width: 150,
      fixed: "left",
    },
    {
      title: "Harga barang",
      dataIndex: "harga",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.harga.toLocaleString()}</p>,
    },
    {
      title: "Biaya pemesanan",
      dataIndex: "orderCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.orderCost.toLocaleString()}</p>,
    },
    {
      title: "Total penjualan",
      dataIndex: "totalSalesInYear",
      align: "center",
      width: 120,
    },
    {
      title: "Biaya penyimpanan(H)",
      dataIndex: "holdingCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>{record.holdingCost.toLocaleString()}</p>,
    },
    {
      title: "EOQ",
      dataIndex: "EOQ",
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
      title: "Lead time",
      dataIndex: "leadTime",
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
      title: "Reorder point",
      dataIndex: "reorderPoint",
      align: "center",
      width: 120,
    },
    {
      title: "Total biaya beli",
      dataIndex: "totalPurchaseCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>Rp. {record.totalPurchaseCost.toLocaleString()}</p>,
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
      <Form
        name="eoq_form"
        form={form}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: "100%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="flex items-center">
          <Form.Item
            label="Tanggal"
            name="tanggal_mulai"
            rules={[
              {
                required: true,
                message: "Masukan tanggal!",
              },
            ]}
          >
            <DatePicker placeholder="Pilih tanggal" format={"DD-MM-YYYY"} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Sampai"
            name="tanggal_selesai"
            rules={[
              {
                required: true,
                message: "Masukan tanggal!",
              },
            ]}
          >
            <DatePicker placeholder="Pilih tanggal" format={"DD-MM-YYYY"} disabled />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="h-[30px] w-[60px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md"
            >
              Pilih
            </button>
          </Form.Item>
          <p className="ml-auto mr-0 mb-auto mt-0 font-semibold">Biaya penyimpanan: Rp.12,000,000</p>
        </div>
        <Table
          locale={{ emptyText: <Empty description={"Tidak ada data"} /> }}
          columns={columns}
          dataSource={EOQ}
          rowKey={"id"}
          scroll={{
            x: 1100,
            y: "calc(100vh - 220px)",
          }}
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default EOQTable;

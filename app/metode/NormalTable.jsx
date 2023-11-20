"use client";

import { useState } from "react";
import { Table, Form, DatePicker, Empty } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const NormalTable = ({ barang, penjualan, pemesanan, comparisonData, setComparisonData }) => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const countData = (nama_barang, tanggal_mulai, tanggal_selesai) => {
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

    const itemOrder = [];
    const pemesananTahun = pemesanan.filter((item) => {
      return (
        dayjs(item.tanggal, "DD-MM-YYYY").isBefore(dayjs(tanggal_mulai, "DD-MM-YYYY")) &&
        dayjs(item.tanggal, "DD-MM-YYYY").isAfter(dayjs(tanggal_selesai, "DD-MM-YYYY"))
      );
    });

    pemesananTahun.map((item) => {
      if (item.barang === nama_barang) {
        itemOrder.push(item);
      }
    });

    const orderNumber = itemOrder.map((item) => {
      return item.jumlah;
    });

    const totalOrderInYear = orderNumber.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    const itemCost = barang.filter((item1) => item1.namaBarang === nama_barang).map((item2) => item2.harga);
    const orderCost = barang.filter((item1) => item1.namaBarang === nama_barang).map((item2) => item2.hargaPemesanan);
    const holdingCost = Math.round(storageCost / totalSalesInYear);

    const orderQuantity = Math.round(totalOrderInYear / 12);
    const frequency = itemOrder.length;

    const totalOrderCost = Math.round((totalSalesInYear * orderCost[0]) / orderQuantity);
    const totalStorageCost = Math.round((orderQuantity * holdingCost) / 2);
    const totalCost = Math.round(totalSalesInYear * itemCost[0] + totalOrderCost + totalStorageCost);

    return {
      itemCost: itemCost[0],
      orderCost: orderCost[0],
      totalSalesInYear: totalSalesInYear,
      orderQuantity: orderQuantity,
      frequency: frequency,
      holdingCost: holdingCost,
      totalOrderCost: totalOrderCost,
      totalStorageCost: totalStorageCost,
      totalCost: totalCost,
    };
  };

  const onFinish = (values) => {
    const tanggal_mulai = dayjs(values.tanggal_mulai, "DD-MM-YYYY");
    const tanggal_selesai = dayjs(values.tanggal_selesai, "DD-MM-YYYY");
    const dataBarang = [];

    barang.map((item) => {
      const dataValues = countData(item.namaBarang, tanggal_mulai, tanggal_selesai);
      dataBarang.push({ ...dataValues, ...item });
    });

    setData(dataBarang);

    const newComparisonData = { ...comparisonData };
    newComparisonData.normal = [...dataBarang];
    setComparisonData(newComparisonData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
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
      title: "Jumlah pesanan",
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
      title: "Biaya penyimpanan(H)",
      dataIndex: "holdingCost",
      align: "center",
      width: 120,
      render: (item, record, index) => <p>{record.holdingCost.toLocaleString()}</p>,
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

  const handleChange = () => {
    const selectedDate = form.getFieldValue(["tanggal_mulai"]);
    if (selectedDate !== null) {
      form.setFieldValue(["tanggal_selesai"], dayjs(selectedDate, "DD-MM-YYYY").subtract(1, "year"));
    }
  };

  return (
    <div>
      <Form
        name="normal_form"
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
          dataSource={data}
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

export default NormalTable;

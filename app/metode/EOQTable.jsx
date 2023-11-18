"use client";

import { useState } from "react";
import { Table, message, Form, DatePicker, Empty } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const EOQTable = ({ barang, penjualan }) => {
  const [EOQ, setEOQ] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const countEOQ = (nama_barang, tanggal_mulai, tanggal_selesai) => {
    const leadTime = 7;
    const storageCost = 12000000;
    const orderCost = 35000;

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
    const H = storageCost / totalSalesInYear;

    const EOQ = Math.sqrt((2 * totalSalesInYear * itemCost[0]) / H);

    const frequency = totalSalesInYear / EOQ;

    const reorderPoint = (totalSalesInYear / 12) * leadTime;

    const averageStorage = reorderPoint + EOQ / 2;
    const P = itemCost[0] + orderCost;

    const TIC1 = totalSalesInYear * itemCost[0];
    const TIC2 = (totalSalesInYear * P) / EOQ;
    const TIC3 = averageStorage * H;

    const totalInventoryCost = TIC1 + TIC2 + TIC3;

    return {
      totalSalesInYear: Math.round(totalSalesInYear),
      itemCost: Math.round(itemCost[0]),
      H: Math.round(H),
      EOQ: Math.round(EOQ),
      frequency: Math.round(frequency),
      leadTime: leadTime,
      reorderPoint: Math.round(reorderPoint),
      orderCost: orderCost,
      averageStorage: Math.round(averageStorage),
      totalInventoryCost: Math.round(totalInventoryCost),
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
      width: "5%",
      align: "center",
      render: (item, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Nama barang",
      dataIndex: "namaBarang",
      align: "left",
      width: "20%",
    },
    {
      title: "Harga barang",
      dataIndex: "harga",
      align: "center",
      width: "10%",
      render: (item, record, index) => <p>Rp. {record.harga.toLocaleString()}</p>,
    },
    {
      title: "Biaya pemesanan",
      dataIndex: "orderCost",
      align: "center",
      width: "10%",
      render: (item, record, index) => <p>Rp. {record.orderCost.toLocaleString()}</p>,
    },
    {
      title: "Total penjualan",
      dataIndex: "totalSalesInYear",
      align: "center",
      width: "10%",
    },
    {
      title: "Biaya penyimpanan(H)",
      dataIndex: "H",
      align: "center",
      width: "10%",
      render: (item, record, index) => <p>{record.H.toLocaleString()}</p>,
    },
    {
      title: "EOQ",
      dataIndex: "EOQ",
      align: "center",
      width: "10%",
    },
    {
      title: "Frekuensi pemesanan",
      dataIndex: "frequency",
      align: "center",
      width: "10%",
    },
    {
      title: "Lead time",
      dataIndex: "leadTime",
      align: "center",
      width: "10%",
    },
    {
      title: "Reorder point",
      dataIndex: "reorderPoint",
      align: "center",
      width: "10%",
    },
    {
      title: "Rata-rata penyimpanan",
      dataIndex: "averageStorage",
      align: "center",
      width: "10%",
    },
    {
      title: "Total biaya",
      dataIndex: "totalInventoryCost",
      align: "center",
      width: "10%",
      render: (item, record, index) => <p>Rp. {record.totalInventoryCost.toLocaleString()}</p>,
    },
  ];

  console.log(EOQ);

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
        />
      </Form>
    </div>
  );
};

export default EOQTable;

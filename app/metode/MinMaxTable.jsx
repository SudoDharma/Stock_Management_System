"use client";

import { useState } from "react";
import { Table, message, Form, DatePicker, Empty } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MinMaxTable = ({ barang, penjualan }) => {
  const [minMax, setMinMax] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const countMinMax = (nama_barang, tanggal_mulai, tanggal_selesai) => {
    const leadTime = 0.23; // 7 divided by 30
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
    const maximumSalesInYear = Math.max(...salesNumber);

    const averageSalesInYear = Math.round(totalSalesInYear / 12);

    const safetyStock = Math.ceil((maximumSalesInYear - averageSalesInYear) * leadTime);
    const minimumStock = Math.ceil(averageSalesInYear * leadTime + safetyStock);
    const maximumStock = Math.round(2 * (averageSalesInYear * leadTime) + safetyStock);
    const orderQuantity = Math.round(2 * averageSalesInYear * leadTime);
    const frequency = Math.round(totalSalesInYear / orderQuantity);

    return {
      leadTime: leadTime.toFixed(2),
      totalSalesInYear: totalSalesInYear,
      maximumSalesInYear: maximumSalesInYear,
      averageSalesInYear: averageSalesInYear,
      safetyStock: safetyStock,
      minimumStock: minimumStock,
      maximumStock: maximumStock,
      orderQuantity: orderQuantity,
      frequency: frequency,
    };
  };

  const onFinish = (values) => {
    const tanggal_mulai = dayjs(values.tanggal_mulai, "DD-MM-YYYY");
    const tanggal_selesai = dayjs(values.tanggal_selesai, "DD-MM-YYYY");
    const minMaxBarang = [];

    barang.map((item) => {
      const minMaxValues = countMinMax(item.namaBarang, tanggal_mulai, tanggal_selesai);
      minMaxBarang.push({ ...minMaxValues, ...item });
    });

    setMinMax(minMaxBarang);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
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
      title: "Total penjualan",
      dataIndex: "totalSalesInYear",
      align: "center",
      width: "10%",
    },
    {
      title: "Penjualan maksimum",
      dataIndex: "maximumSalesInYear",
      align: "center",
      width: "10%",
    },
    {
      title: "Rata-rata penjualan",
      dataIndex: "averageSalesInYear",
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
      title: "Safety stock",
      dataIndex: "safetyStock",
      align: "center",
      width: "10%",
    },
    {
      title: "Minimum stock",
      dataIndex: "minimumStock",
      align: "center",
      width: "10%",
    },
    {
      title: "Maximum stock",
      dataIndex: "maximumStock",
      align: "center",
      width: "10%",
    },
    {
      title: "Banyak pemesanan",
      dataIndex: "orderQuantity",
      align: "center",
      width: "10%",
    },
    {
      title: "Frekuensi pemesanan",
      dataIndex: "frequency",
      align: "center",
      width: "10%",
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
        name="minmax_form"
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
        </div>
        <Table
          locale={{ emptyText: <Empty description={"Tidak ada data"} /> }}
          columns={columns}
          dataSource={minMax}
          rowKey={"id"}
          scroll={{
            x: 1100,
          }}
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default MinMaxTable;

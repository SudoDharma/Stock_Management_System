"use client";

import { useState } from "react";
import { Table, message, Form, DatePicker, Empty } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MinMaxTable = ({ barang, penjualan }) => {
  const [minMax, setMinMax] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const countMinMax = (nama_barang, monthYear) => {
    const leadTime = 7;
    const itemSales = [];

    const penjualanBulan = penjualan.filter((item) => {
      return item.tanggal.includes(monthYear);
    });

    penjualanBulan.map((item1) => {
      item1.barang.map((item2) => {
        if (item2.nama_barang === nama_barang) {
          itemSales.push(item2);
        }
      });
    });

    if (itemSales.length === 0) {
      return {
        leadTime: leadTime,
        totalSalesInMonth: 0,
        averageSalesInMonth: 0,
        maximumSalesInMonth: 0,
        safetyStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        reorderStock: 0,
      };
    }

    const salesNumber = itemSales.map((item) => {
      return item.jumlah;
    });

    const maximumSalesInMonth = Math.max(...salesNumber);

    const daysInMonth = dayjs(`01-${monthYear}`).daysInMonth();
    const totalSalesInMonth = salesNumber.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const averageSalesInMonth = totalSalesInMonth / daysInMonth;

    const safetyStock = (maximumSalesInMonth - averageSalesInMonth) * leadTime;
    const minimumStock = averageSalesInMonth * leadTime + safetyStock;
    const maximumStock = 2 * (averageSalesInMonth * leadTime) + safetyStock;
    const reorderStock = maximumStock - minimumStock;

    return {
      leadTime: leadTime,
      totalSalesInMonth: Math.round(totalSalesInMonth),
      averageSalesInMonth: Math.ceil(averageSalesInMonth),
      maximumSalesInMonth: Math.round(maximumSalesInMonth),
      safetyStock: Math.round(safetyStock),
      minimumStock: Math.round(minimumStock),
      maximumStock: Math.round(maximumStock),
      reorderStock: Math.round(reorderStock),
    };
  };

  const onFinish = (values) => {
    const tanggal = values.tanggal.format("MM-YYYY");
    const minMaxBarang = [];

    barang.map((item) => {
      const minMaxValues = countMinMax(item.namaBarang, tanggal);
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
      title: "Penjualan maksimum",
      dataIndex: "maximumSalesInMonth",
      align: "center",
      width: "10%",
    },
    {
      title: "Rata-rata penjualan",
      dataIndex: "averageSalesInMonth",
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
      title: "Maximum stock",
      dataIndex: "maximumStock",
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
      title: "Reorder stock",
      dataIndex: "reorderStock",
      align: "center",
      width: "10%",
    },
  ];

  console.log(minMax);

  return (
    <div>
      <Form
        name="minmax_form"
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
            name="tanggal"
            rules={[
              {
                required: true,
                message: "Masukan tanggal!",
              },
            ]}
          >
            <DatePicker placeholder="Pilih tanggal" format={"MM-YYYY"} picker="month" />
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
        />
      </Form>
    </div>
  );
};

export default MinMaxTable;

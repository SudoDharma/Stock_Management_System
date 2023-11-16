"use client";

import { Form, InputNumber, Select, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonSpinner from "@/app/components/ButtonSpinner";

const AddPemesananForm = ({ barang }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectOption, setSelectOption] = useState([]);

  useEffect(() => {
    const newSelectOption = [];
    barang.map((barang) => {
      newSelectOption.push({ value: barang.namaBarang });
    });
    setSelectOption(newSelectOption);
  }, []);

  const checkSatuan = (nama) => {
    const satuan = barang.filter((items) => {
      return items.namaBarang === nama;
    });

    return satuan[0].satuan;
  };

  const onFinish = async (values) => {
    const newValues = { ...values, tanggal: values.tanggal.format("DD-MM-YYYY") };
    console.log("newValues", newValues);
    setLoading(true);

    try {
      const res = await fetch("/api/pemesanan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newValues),
      });
      if (res.ok) {
        setLoading(false);
        router.refresh();
        router.push("/pemesanan");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={loading}
      requiredMark={false}
    >
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
        <DatePicker placeholder="Pilih tanggal" format={"DD-MM-YYYY"} />
      </Form.Item>

      <Form.Item
        label="Barang"
        name="barang"
        rules={[
          {
            required: true,
            message: "Pilih barang!",
          },
        ]}
      >
        <Select
          placeholder={"Pilih barang yang dipesan"}
          allowClear
          showSearch
          options={selectOption}
          filterSort={(optionA, optionB) =>
            (optionA?.value ?? "").toLowerCase().localeCompare((optionB?.value ?? "").toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Jumlah"
        name="jumlah"
        rules={[
          {
            required: true,
            message: "Masukan jumlah barang!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <button
          type="submit"
          className="h-[35px] w-[120px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md"
          disabled={loading}
        >
          {loading && (
            <div>
              <ButtonSpinner />
            </div>
          )}
          {!loading && <div>Tambah</div>}
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddPemesananForm;

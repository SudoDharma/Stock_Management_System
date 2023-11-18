"use client";

import { Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSpinner from "@/app/components/ButtonSpinner";

const AddBarangForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    try {
      const res = await fetch("/api/barang", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        router.refresh();
        router.push("/barang");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const selectOption = [
    {
      value: "Zak",
    },
    {
      value: "Dus",
    },
    {
      value: "Batang",
    },
    {
      value: "Buah",
    },
    {
      value: "Ember",
    },
    {
      value: "Lembar",
    },
    {
      value: "Bungkus",
    },
    {
      value: "Kaleng",
    },
    {
      value: "Roll",
    },
  ];

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
        label="Nama barang"
        name="namaBarang"
        rules={[
          {
            required: true,
            message: "Masukan nama barang!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Stok"
        name="stok"
        rules={[
          {
            required: true,
            message: "Masukan jumlah stok!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Satuan"
        name="satuan"
        rules={[
          {
            required: true,
            message: "Pilih satuan barang!",
          },
        ]}
      >
        <Select
          showSearch
          filterSort={(optionA, optionB) =>
            (optionA?.value ?? "").toLowerCase().localeCompare((optionB?.value ?? "").toLowerCase())
          }
          options={selectOption}
        />
      </Form.Item>

      <Form.Item
        label="Harga"
        name="harga"
        rules={[
          {
            required: true,
            message: "Masukan harga!",
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

export default AddBarangForm;

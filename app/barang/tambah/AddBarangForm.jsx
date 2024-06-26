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
    <div>
      <p className="font-medium mb-3">Tambah barang</p>
      <Form
        name="basic"
        className="p-5 mb-5 font-semibold bg-[#EEF5FF] border-black rounded-md shadow-md"
        labelCol={{
          span: 4,
        }}
        labelAlign="left"
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
          <Input placeholder="Masukan nama barang" />
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
          <InputNumber placeholder="0" />
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
            placeholder={"Pilih satuan barang"}
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
          <InputNumber placeholder="20000" />
        </Form.Item>

        <Form.Item
          label="Harga pemesanan"
          name="hargaPemesanan"
          rules={[
            {
              required: true,
              message: "Masukan harga pemesanan!",
            },
          ]}
        >
          <InputNumber placeholder="20000" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 21,
          }}
        >
          <button
            type="submit"
            className="h-[35px] w-[100px] bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md"
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
    </div>
  );
};

export default AddBarangForm;

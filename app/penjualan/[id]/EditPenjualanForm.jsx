"use client";

import { Form, DatePicker, Select, InputNumber, message, Table, Empty } from "antd";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonSpinner from "@/app/components/ButtonSpinner";
import dayjs from "dayjs";

const EditPenjualanForm = ({ penjualan, barang }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectOption, setSelectOption] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const newSelectedItems = [...penjualan.barang];
    setSelectedItems(newSelectedItems);

    const newSelectOption = [];
    barang.map((barang) => {
      newSelectOption.push({ value: barang.namaBarang });
    });

    const filteredSelectOption = newSelectOption.filter((items1) => {
      return newSelectedItems.every((items2) => {
        return items1.value !== items2.nama_barang;
      });
    });

    setSelectOption(filteredSelectOption);
  }, []);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Berhasil menambahkan barang",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Barang yang dibeli masih kosong",
    });
  };

  const checkSatuan = (nama) => {
    const satuan = barang.filter((items) => {
      return items.namaBarang === nama;
    });

    return satuan[0].satuan;
  };

  const stringifyBarang = (barang) => {
    const barangString = [];
    barang.map((items) => {
      barangString.push(JSON.stringify(items));
    });

    return barangString;
  };

  const onFinishBarang = (values) => {
    const satuan = checkSatuan(values.nama_barang);
    const newValues = { ...values, satuan: satuan };

    const newSelectedItems = [...selectedItems];
    newSelectedItems.push(newValues);
    setSelectedItems(newSelectedItems);
    form.resetFields();

    const newSelect = selectOption.filter((items) => {
      return items.value !== newValues.nama_barang;
    });

    setSelectOption(newSelect);
    success();
  };

  const onFinish = async (values) => {
    if (selectedItems.length === 0) {
      error();
    } else {
      setLoading(true);
      const newValues = {
        tanggal: values.tanggal.format("DD-MM-YYYY"),
        barang: stringifyBarang(selectedItems),
      };
      console.log("newValues", newValues);

      try {
        const res = await fetch(`/api/penjualan/${penjualan.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newValues),
        });
        if (res.ok) {
          setLoading(false);
          router.refresh();
          router.push("/penjualan");
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteSelecteditems = (nama_barang) => {
    const newSelectedItems = selectedItems.filter((items) => {
      return items.nama_barang !== nama_barang;
    });
    setSelectedItems(newSelectedItems);

    const newSelectOption = [...selectOption];
    newSelectOption.push({ value: nama_barang });
    setSelectOption(newSelectOption);
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
      dataIndex: "nama_barang",
      align: "left",
      width: "55%",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
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
      title: "Aksi",
      align: "center",
      width: "10%",
      render: (text, record, index) => (
        <div
          className="hover:opacity-80 transition-all cursor-pointer"
          onClick={() => {
            deleteSelecteditems(record.nama_barang);
          }}
        >
          <IconTrash />
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        name="barang_form"
        className="p-5 mb-5 bg-gray-200 border-black rounded-md shadow-md"
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
        onFinish={onFinishBarang}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={loading}
        requiredMark={false}
      >
        <Form.Item
          label="Barang yang dibeli"
          name="nama_barang"
          rules={[
            {
              required: true,
              message: "Masukan barang!",
            },
          ]}
        >
          <Select
            placeholder={"Pilih barang yang dibeli"}
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

      <Form
        name="penjualan_form"
        className="p-5 bg-gray-200 border-black rounded-md shadow-md"
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
          initialValue={dayjs(penjualan.tanggal, "DD-MM-YYYY")}
        >
          <DatePicker placeholder="Pilih tanggal" format={"DD-MM-YYYY"} />
        </Form.Item>

        <Form.Item label="Barang">
          <div className="p-5 bg-white w-full rounded-md shadow-sm">
            <Table
              locale={{ emptyText: <Empty description={"Belum ada barang"} /> }}
              columns={columns}
              dataSource={selectedItems}
              pagination={false}
              rowKey={"nama_barang"}
            />
          </div>
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
    </div>
  );
};

export default EditPenjualanForm;

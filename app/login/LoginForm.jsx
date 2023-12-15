"use client";
import { Form, Input, message } from "antd";
import ButtonSpinner from "../components/ButtonSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = ({ handleLogin, setCookie }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    const loginCheck = await handleLogin(values.username, values.password);
    if (loginCheck === false) {
      messageApi.open({
        type: "error",
        content: "Username atau password salah",
      });
      setLoading(false);
    } else {
      messageApi.open({
        type: "success",
        content: "Berhasil login",
      });
      await setCookie();
      setLoading(false);
      router.push("/");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {contextHolder}
      <p className="font-semibold text-3xl text-center mb-5">Login</p>
      <Form
        name="basic"
        className="font-semibold"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        disabled={loading}
      >
        <Form.Item
          label="Username"
          name="username"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="h-[35px] w-full bg-indigo-500 text-white font-medium rounded-md hover:opacity-70 transition-all shadow-md"
            disabled={loading}
          >
            {loading && (
              <div>
                <ButtonSpinner />
              </div>
            )}
            {!loading && <div>Login</div>}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

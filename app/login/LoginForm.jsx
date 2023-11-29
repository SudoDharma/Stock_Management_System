"use client";
import { Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

const LoginForm = ({ user, setCookie }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    const userLogin = user.filter((item) => {
      return values.username === item.username;
    });
    if (userLogin.length === 0) {
      messageApi.open({
        type: "error",
        content: "Username tak ditemukan",
      });
    } else {
      if (userLogin[0].password === values.password) {
        messageApi.open({
          type: "success",
          content: "Berhasil login",
        });
        setCookie();
        router.push("/");
      } else {
        messageApi.open({
          type: "error",
          content: "Password yang dimasukan salah",
        });
      }
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
          >
            Login
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

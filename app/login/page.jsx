import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import dayjs from "dayjs";

const getUser = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.user.findMany();

  return res;
};

const setCookie = async () => {
  "use server";
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set({
    name: "status",
    value: "logged_in",
    httpOnly: true,
    path: "/",
    expires: Date.now() + oneDay,
  });
};

const Login = async () => {
  const user = await getUser();

  return (
    <div>
      <title>Login</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="ml-44 mt-32 p-10 bg-white max-w-[500px] rounded-md shadow-md">
        <LoginForm user={user} setCookie={setCookie} />
      </div>
    </div>
  );
};

export default Login;

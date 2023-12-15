import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

const getUserUnique = async (username, password) => {
  const prisma = new PrismaClient();
  const res = await prisma.user.findUnique({
    where: { username: username, password: password },
  });

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

const handleLogin = async (username, password) => {
  "use server";
  const user = await getUserUnique(username, password);
  if (user === null) {
    return false;
  } else {
    return true;
  }
};

const Login = async () => {
  return (
    <div>
      <title>Login</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <div className="ml-44 mt-32 p-10 bg-white max-w-[500px] rounded-md shadow-md">
        <LoginForm handleLogin={handleLogin} setCookie={setCookie} />
      </div>
    </div>
  );
};

export default Login;

"use server";
import { cookies } from "next/headers";

const DeleteCookies = async () => {
  cookies().delete("status");
};

export default DeleteCookies;

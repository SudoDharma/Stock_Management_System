import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { tanggal, barang, jumlah } = body;
    const newPemesanan = await prisma.pemesanan.create({
      data: {
        tanggal,
        barang,
        jumlah,
      },
    });
    return NextResponse.json({ newPemesanan, message: "Ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { tanggal, barang } = body;
    const newPenjualan = await prisma.penjualan.create({
      data: {
        tanggal,
        barang,
      },
    });
    return NextResponse.json({ newPenjualan, message: "Ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (req, { params }) => {
  try {
    const penjualan = await prisma.penjualan.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(penjualan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const body = await req.json();
    const { tanggal, barang } = body;
    const newPenjualan = await prisma.penjualan.update({
      where: {
        id: Number(params.id),
      },
      data: {
        tanggal,
        barang,
      },
    });
    return NextResponse.json({ newPenjualan, message: "Ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

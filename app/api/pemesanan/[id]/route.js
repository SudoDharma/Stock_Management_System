import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (req, { params }) => {
  try {
    const pemesanan = await prisma.pemesanan.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(pemesanan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const body = await req.json();
    const { tanggal, barang, jumlah, status } = body;
    const newPemesanan = await prisma.pemesanan.update({
      where: {
        id: Number(params.id),
      },
      data: {
        tanggal,
        barang,
        jumlah,
        status,
      },
    });
    return NextResponse.json({ newPemesanan, message: "Ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

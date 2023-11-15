import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (req, { params }) => {
  try {
    const barang = await prisma.barang.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(barang, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const body = await req.json();
    const { namaBarang, stok, satuan, harga } = body;
    const newBarang = await prisma.barang.update({
      where: {
        id: Number(params.id),
      },
      data: {
        namaBarang,
        stok,
        satuan,
        harga,
      },
    });
    return NextResponse.json({ newBarang, message: "Ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

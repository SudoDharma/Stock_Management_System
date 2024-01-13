import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { namaBarang, stok, satuan, harga, hargaPemesanan } = body;
    const newBarang = await prisma.barang.create({
      data: {
        namaBarang,
        stok,
        satuan,
        harga,
        hargaPemesanan,
      },
    });
    return NextResponse.json({ newBarang, message: "Ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

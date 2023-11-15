import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();
    const { namaBarang, stok, satuan, harga } = body;
    const newBarang = await prisma.barang.create({
      data: {
        namaBarang,
        stok,
        satuan,
        harga,
      },
    });
    return NextResponse.json({ newBarang, message: "Ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

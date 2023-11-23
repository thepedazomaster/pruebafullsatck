import { authOptions } from "@/lib/nextAuth/auth";
import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { order } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getServerSession(authOptions);
  if (!user) {
    return NextResponse.json(
      { message: "no se puede realizar la compra" },
      { status: 401 }
    );
  }
  try {
    const sold = await prisma.sold.findMany({
      where: { idUser: user.userId, status: true },
      include: {
        orders: { include: { product: { include: { images: true } } } },
      },
    });
    return NextResponse.json(
      { message: "Búsqueda realizada correctamente", sold },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 200 }
    );
  }
}

interface requestPostSold {
  idPaymentMethod?: number;
  orders?: CreateOrder[];
}
interface CreateOrder {
  idProduct: number;
  quantity: number;
  reduction: number;
}
export async function POST(request: NextRequest) {
  const { idPaymentMethod, orders }: requestPostSold = await request.json();
  const user = await getServerSession(authOptions);
  if (!user) {
    return NextResponse.json(
      { message: "no se puede realizar la compra" },
      { status: 401 }
    );
  }
  if (!idPaymentMethod || !orders || orders.length === 0) {
    return NextResponse.json(
      { message: "no se puede realizar la compra datos erróneos" },
      { status: 400 }
    );
  }
  try {
    const createdSold = await prisma.sold.create({
      data: {
        idPaymentMethod,
        idUser: user.userId,
        orders: { createMany: { data: [...orders] } },
      },
    });
    return NextResponse.json(
      { message: "venta realizada", createdSold },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
interface requestPutSold extends requestPostSold {
  id?: string;
  idUser?: number;
  status?: boolean;
  soldStatus?: "PENDING" | "APPROVED" | "DENIED";
}
export async function PUT(request: NextRequest) {
  const { id, idUser, idPaymentMethod, status, soldStatus }: requestPutSold =
    await request.json();
  try {
    const updateSold = await prisma.sold.update({
      where: { id },
      data: { idUser, status, soldStatus, idPaymentMethod },
    });
    return NextResponse.json(
      { message: "Actualización realizada con éxito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

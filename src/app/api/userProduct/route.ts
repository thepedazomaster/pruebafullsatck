import { authOptions } from "@/lib/nextAuth/auth";
import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userProduct = await prisma.user_product.findMany({});

    return NextResponse.json(
      { message: "búsqueda exitosa", userProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const { id, favorite, rate, comment } = await request.json();
  const user = await getServerSession(authOptions);
  if (!user || !id) {
    return NextResponse.json(
      { message: "no se puede realizar la compra" },
      { status: 401 }
    );
  }

  try {
    const upsertUserProduct = await prisma.user_product.upsert({
      where: { idUser_idProduct: { idUser: user?.userId, idProduct: id } },
      create: { favorite, rate, comment, idUser: user.userId, idProduct: id },
      update: { favorite, rate, comment, idUser: user.userId, idProduct: id },
    });
    return NextResponse.json(
      { message: "Creado o actualizado con exito", upsertUserProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

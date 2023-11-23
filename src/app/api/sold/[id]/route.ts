import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    const sold = await prisma.sold.findUnique({
      where: { id },
      include: {
        orders: { include: { product: { include: { images: true } } } },
      },
    });
    return NextResponse.json(
      { message: "Busqueda Correcta", sold },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

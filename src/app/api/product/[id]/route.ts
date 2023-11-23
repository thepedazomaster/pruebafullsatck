import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json(
      { message: "Busqueda Correcta", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

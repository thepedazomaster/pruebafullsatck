import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userProducts: true },
    });
    return NextResponse.json(
      { message: "Busqueda Correcta", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findMany({
      include: { userProducts: true },
    });
    return NextResponse.json(
      { message: "Búsqueda exitosa", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 200 }
    );
  }
}
interface PostRequestUser {
  email?: string;
  password?: string;
  name?: string;
  lastname?: string;
  address?: string;
  cel?: string;
}
export async function POST(request: NextRequest) {
  const { email, password, name, lastname, address, cel }: PostRequestUser =
    await request.json();
  try {
    if (!email || !password || !name || !lastname || !address || !cel) {
      return NextResponse.json({ message: "datos erroneos" }, { status: 400 });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashPassword,
        person: { create: { name, lastname, address, cel } },
      },
    });
    return NextResponse.json(
      { message: "Se creo correctamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

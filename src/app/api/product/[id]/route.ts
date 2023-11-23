import { authOptions } from "@/lib/nextAuth/auth";
import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const user = await getServerSession(authOptions);
  const id = parseInt(context.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        userProducts: { where: { idUser: user?.userId } },
      },
    });
    if (!product) {
      return NextResponse.json({ message: "no existe" }, { status: 401 });
    }
    const svgRateProduct = await prisma.user_product.aggregate({
      where: { product: { id }, NOT: { rate: 0 } },
      _avg: { rate: true },
      _count: { rate: true },
    });
    const productSubtotal =
      product.price - product.price * (product.reduction / 100);
    //set obj product
    const productsFull = {
      ...product,
      svgRate: svgRateProduct._avg.rate,
      numberRate: svgRateProduct._count.rate,
      subTotal: productSubtotal,
    };
    return NextResponse.json(
      { message: "Busqueda Correcta", products: productsFull },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

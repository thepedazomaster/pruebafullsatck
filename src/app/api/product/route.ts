import { authOptions } from "@/lib/nextAuth/auth";
import { prisma } from "@/lib/prismaInstance/prismaInstance";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { string } from "prop-types";

export async function GET(request: NextRequest) {
  let productsFull = [];
  const user = await getServerSession(authOptions);
  try {
    const products = await prisma.product.findMany({
      where: { status: true },
      include: {
        images: true,
        userProducts: { where: { idUser: user?.userId } },
      },
    });
    //svgRate and subTotal
    for (const product of products) {
      const svgRateProduct = await prisma.user_product.aggregate({
        where: { product: { id: product.id }, NOT: { rate: 0 } },
        _avg: { rate: true },
        _count: { rate: true },
      });
      const productSubtotal =
        product.price - product.price * (product.reduction / 100);
      //set obj product
      productsFull.push({
        ...product,
        svgRate: svgRateProduct._avg.rate,
        numberRate: svgRateProduct._count.rate,
        subTotal: productSubtotal,
      });
    }

    return NextResponse.json(
      { message: "Búsqueda exitosa", products: productsFull },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
interface PostProductReq {
  name?: string;
  price?: number;
  availableQuantity?: number;
  reduction?: number;
  idProductType?: number;
  description?: string;
  images?: string[];
}

export async function POST(request: NextRequest) {
  const {
    name,
    price,
    description,
    availableQuantity,
    reduction = 0,
    idProductType,
    images,
  }: PostProductReq = await request.json();

  if (
    !name ||
    !price ||
    !description ||
    !availableQuantity ||
    !idProductType ||
    !images ||
    images.length === 0
  ) {
    return NextResponse.json({ message: "Datos erróneos" }, { status: 400 });
  }
  //change obj type images
  const urlImages = images.map((image) => {
    return { url: image };
  });
  try {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        availableQuantity,
        reduction,
        idProductType,
        images: {
          createMany: {
            data: [...urlImages],
          },
        },
      },
    });
    return NextResponse.json(
      { message: "creacion exitosa", createdProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

interface PutProductRequest extends PostProductReq {
  id: number;
  status: boolean;
}

export async function PUT(request: NextRequest) {
  const {
    id,
    name,
    price,
    description,
    availableQuantity,
    reduction,
    status,
    idProductType,
  }: PutProductRequest = await request.json();

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return NextResponse.json(
        { message: "El producto no existe" },
        { status: 400 }
      );
    }

    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        availableQuantity,
        reduction,
        status,
        idProductType,
      },
    });
    return NextResponse.json(
      { message: "Actualización exitosa", updateProduct },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

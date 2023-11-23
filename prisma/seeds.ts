import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  try {
    //type Product
    const clocks = await prisma.product_type.upsert({
      where: { id: 1 },
      create: { name: "Reloj" },
      update: { name: "Reloj" },
    });

    const glasses = await prisma.product_type.upsert({
      where: { id: 2 },
      create: { name: "Gafa" },
      update: { name: "Gafa" },
    });

    //initial user
    const password = "passTest1$";
    const hasPassWord = bcrypt.hashSync(password, 10);
    const user = await prisma.user.upsert({
      where: { email: "bryan_e_h@hotmail.com" },
      create: {
        email: "bryan_e_h@hotmail.com",
        password: hasPassWord,
        person: {
          create: {
            name: "BRYAN",
            lastname: "HERNANDEZ",
            address: "CLL 13 #2A-13",
            cel: "3108835073",
          },
        },
      },
      update: {},
    });
    //payment methods
    const card = await prisma.payment_method.upsert({
      where: { id: 1 },
      update: {},
      create: { name: "Card" },
    });
    const PSE = await prisma.payment_method.upsert({
      where: { id: 1 },
      update: {},
      create: { name: "PSE" },
    });
    const nequi = await prisma.payment_method.upsert({
      where: { id: 1 },
      update: {},
      create: { name: "nequi" },
    });
    console.log({ clocks, glasses, user });
  } catch (error) {
    console.log(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

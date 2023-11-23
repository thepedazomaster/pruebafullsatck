import HomeScreen from "@/components/screens/homeScreen/HomeScreen";
import { GetProducts } from "@/interface/interfaceProducts";
import myApi from "@/lib/axios/myapi";
import { headers } from "next/headers";

const getProductos = async () => {
  try {
    const headersList = headers();
    const cookie = headersList.get("cookie");
    const resp = await myApi.get<GetProducts>("product", {
      headers: { cookie },
    });
    return resp.data.products;
  } catch (error) {
    console.log("erorrrrrrrr");

    return [];
  }
};

export default async function Home() {
  const products = await getProductos();
  return <HomeScreen products={products} />;
}

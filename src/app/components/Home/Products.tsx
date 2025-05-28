import { getProducts } from "@/utils/getProducts";
import ProductsClientComponent from "./ProductsClientComponent";

export default async function ProductsPage() {
  const products = await getProducts(); // returns { data: Product[] }

  return <ProductsClientComponent initialProducts={products} />;
}

// app/products/[id]/page.tsx
import { Metadata } from "next";

import ProductPage from "./ProductPage";
import { getProductById } from "@/utils/getProducts";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id);
  return {
    title: product?.name || "Product Not Found",
    description: product?.short_description || "",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  // Fetch product data on server
  const product = await getProductById(params.id);

  return <ProductPage initialProduct={product} productId={params.id} />;
}

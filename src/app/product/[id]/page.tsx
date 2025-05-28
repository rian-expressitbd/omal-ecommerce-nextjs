import { Metadata } from "next";
import ProductPage from "./ProductPage";
import { Product } from "@/app/types/Product";

async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://backend.calquick.app/v2/api/public/6829ddabc20c6404b3e2a66b/6829ded2c20c6404b3e2a680/products?_id=${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const result = await response.json();
    // Assuming the API returns { data: Product[] }
    const product = Array.isArray(result.data) ? result.data[0] : result.data;
    return product || null; // Return null if no product is found
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null on error
  }
}
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product: Product = await getProductById(params.id);

  return {
    title: product?.name || "Product Not Found",
    description: product?.short_description || "",
    // openGraph: {
    //   images: product?.images?.map((img) => img.image.optimizeUrl) || [],
    // },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(params.id);

  return <ProductPage singleProduct={product} />;
}

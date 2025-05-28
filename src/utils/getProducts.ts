// src/app/libs/api/productApi.ts
import { Product } from "@/types/cart";

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/products`;
    const response = await fetch(`${baseUrl}?_id=${id}`, {
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("getProductById API response:", result); // Debug log

    // Handle array or single-object response
    const product = Array.isArray(result.data) ? result.data[0] : result.data;

    if (!product) {
      throw new Error("Product not found");
    }

    return product as Product;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}

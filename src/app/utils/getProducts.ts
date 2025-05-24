export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`, {
    cache: "force-cache",
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json(); // Expecting { data: Product[] }
}

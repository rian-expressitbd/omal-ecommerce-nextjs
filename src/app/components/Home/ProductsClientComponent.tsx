"use client";
import CommonLayout from "@/app/layouts/CommonLayout";
import Title from "../UI/Title";
import { useGetProductsQuery } from "@/app/features/productsApi";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Link from "next/link";

export default function ProductsClientComponent() {
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });

  // Initialize with empty array and properly handle the response structure
  const [productsToShow, setProductsToShow] = useState<any[]>([]);

  useEffect(() => {
    // Check if productsResponse exists and has data property
    if (productsResponse?.data) {
      setProductsToShow(productsResponse.data);
    }
  }, [productsResponse]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className='mt-5'>
      <CommonLayout>
        <Title title='All Products' />
        <div className='mt-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {productsToShow.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
          {productsToShow.length === 0 && !isLoading && (
            <p>No products available.</p>
          )}
        </div>
      </CommonLayout>
    </div>
  );
}
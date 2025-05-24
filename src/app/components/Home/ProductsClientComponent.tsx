// components/ProductsClientComponent.tsx
"use client";
import CommonLayout from "@/app/layouts/CommonLayout";
import Title from "../UI/Title";
import Card from "../UI/Card";
import { useGetProductsQuery } from "@/app/features/productsApi";
import { useEffect, useState } from "react";

export default function ProductsClientComponent() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });
  const [productsToShow, setProductsToShow] = useState(products);
  useEffect(() => {
    setProductsToShow(products.data);
  }, [products]);
  console.log(productsToShow); //logs undefined

  return (
    <div className='mt-5'>
      <CommonLayout>
        <Title title='All Products' />
        <div className='mt-3'>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load products.</p>}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {productsToShow?.map((product, index) => (
              <Card key={index} product={product} />
            ))}
          </div>
        </div>
      </CommonLayout>
    </div>
  );
}

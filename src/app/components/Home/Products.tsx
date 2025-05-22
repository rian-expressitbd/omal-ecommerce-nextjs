"use client";
import React, { useEffect, useState } from "react";
import Title from "../UI/Title";
import CommonLayout from "@/app/layouts/CommonLayout";
import Card from "../UI/Card";
import Button from "../UI/Button";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `https://backend.calquick.app/v2/api/public/6829ddabc20c6404b3e2a66b/682b5d636be45193cf943b85/products`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data?.data));
  }, []);
  console.log(products);

  return (
    <div className='mt-5'>
      <CommonLayout>
        <Title title='All Products' />
        <div className='mt-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4 gap-5'>
            {products.map((product, index) => (
              <Card key={index} product={product} index={index} />
            ))}
          </div>
        </div>
        <div className='mt-8 flex justify-center'>
          <Button className='bg-purple-800 text-white px-10'>Load More</Button>
        </div>
      </CommonLayout>
    </div>
  );
}

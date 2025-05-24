"use client";

import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { useGetProductsQuery } from "@/app/features/productsApi";
import CommonLayout from "@/app/layouts/CommonLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProductToShow] = useState<any>(null);
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { data: products, isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (products?.data && productId) {
      const singleProduct = products.data.find((p) => p._id == productId);
      setProductToShow(singleProduct);
      console.log("Single product:", singleProduct);
    }
  }, [products, productId]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load product data.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <CommonLayout>
        <div className='flex gap-12 items-start mt-5 mb-5'>
          <Image
            src={product?.images[0].image.secure_url}
            width={720}
            height={500}
            alt='product_image'
          />
          <div>
            <div className='flex flex-col'>
              <h3 className='text-2xl font-semibld'>{product?.name}</h3>
              <p className='text-sm'>{product?.short_description}</p>
              <div className='flex gap-3'>
                {product?.variantsId?.length > 0 &&
                  product?.variantsId?.map((v) => (
                    <>
                      <h4 className='mt-8'>BDT {v?.offer_price}</h4>
                      <h4 className='mt-8 line-through'>
                        BDT {v?.selling_price}
                      </h4>
                    </>
                  ))}
              </div>
              <div className='flex gap-3'>
                {product?.variantsId?.length > 0 &&
                  product?.variantsId?.map((v) => (
                    <>
                      <h4 className='mt-8 font-bold'>SKU: {v?.sku}</h4>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
      <Footer />
    </>
  );
}

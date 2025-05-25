"use client";

import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import {
  useGetProductsByCategoriesQuery,
  useGetProductsQuery,
} from "@/app/features/productsApi";
import CommonLayout from "@/app/layouts/CommonLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlinePermMedia } from "react-icons/md";
import { VideoPlayer } from "@/media/VideoPlayer";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Title from "@/app/components/UI/Title";
import { useGetBusinessesQuery } from "@/app/features/buissinessApi";

interface VideoType {
  secure_url: string;
}
interface MediaItem {
  type: "image" | "video";
  url: string;
}

export default function ProductPage() {
  const [product, setProductToShow] = useState<any>(null);
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { data: products, isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (products?.data && productId) {
      const singleProduct = products.data.find((p) => p._id == productId);
      setProductToShow(singleProduct);
    }
  }, [products, productId]);
  console.log("singleProduct", product);
  const { data: relatedProducts } = useGetProductsByCategoriesQuery(
    product?.sub_category[0]._id
  );
  console.log("relatedProducts", relatedProducts);

  const mediaItems: MediaItem[] = [
    ...(product?.images?.map((img) => ({
      type: "image" as const,
      url: img?.image?.optimizeUrl,
    })) || []),
    ...(product?.video
      ? [
          {
            type: "video" as const,
            url: (product?.video as unknown as VideoType).secure_url,
          },
        ]
      : []),
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    if (mediaItems[selectedMedia]?.type === "image") {
      setZoomStyle({
        backgroundPosition: `${x}% ${y}%`,
        backgroundImage: `url(${mediaItems[selectedMedia]?.url})`,
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load product data.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <CommonLayout>
        <div className='flex gap-12 items-start mt-5 mb-5'>
          <div className='lg:col-span-1 space-y-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white dark:bg-gray-800 rounded  '
            >
              <div className='flex flex-col gap-3'>
                <div
                  className='w-full h-full flex items-center justify-center'
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setZoomStyle({})}
                >
                  {mediaItems[selectedMedia]?.type === "video" ? (
                    <VideoPlayer
                      src={mediaItems[selectedMedia].url}
                      className='rounded w-full h-full object-cover'
                      autoPlay
                      loop={true}
                      muted={true}
                      showControls
                    />
                  ) : (
                    <div className='relative w-full h-full'>
                      <img
                        src={mediaItems[selectedMedia]?.url}
                        alt={product.name}
                        className='w-[671px] h-full object-contain transition-transform duration-300 hover:scale-105'
                      />
                      <div
                        className='absolute inset-0 bg-cover bg-no-repeat scale-150 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        style={zoomStyle}
                      />
                    </div>
                  )}
                </div>

                <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800'>
                  {mediaItems?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMedia(index)}
                      className={`relative aspect-square w-20 flex-shrink-0 rounded overflow-hidden border-2 transition-transform duration-200 ${
                        selectedMedia === index
                          ? "border-orange-400 dark:border-primary scale-105"
                          : "border-gray-200 dark:border-gray-700 hover:scale-95"
                      }`}
                    >
                      {item.type === "video" ? (
                        <div className='relative w-full h-full flex items-center justify-center bg-black'>
                          <span className='text-white opacity-80 text-xl'>
                            ▶
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={`Thumbnail ${index + 1}`}
                          className='w-full h-full object-cover'
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <div className='flex flex-col'>
              <h3 className='text-2xl font-semibold'>{product?.name}</h3>
              <p className='text-sm'>{product?.short_description}</p>
              <div className='flex gap-3'>
                {product?.variantsId?.length > 0 &&
                  product?.variantsId?.map((v, index) => (
                    <div
                      className='flex items-center gap-3'
                      key={`price-${v._id || index}`}
                    >
                      <h4 className='mt-8 text-2xl'>BDT {v?.offer_price}</h4>
                      <h4 className='mt-8 line-through text-2xl text-red-800'>
                        BDT {v?.selling_price}
                      </h4>
                    </div>
                  ))}
              </div>
              <div className='flex gap-3'>
                {product?.variantsId?.length > 0 &&
                  product?.variantsId?.map((v, index) => (
                    <div key={`sku-${v._id || index}`}>
                      <h4 className='mt-8 font-bold'>SKU: {v?.sku}</h4>
                    </div>
                  ))}
              </div>
              <div className='flex items-center justify-center gap-3 border-[0.5px] border-gray-500 p-3 mt-5 mb-5 w-24'>
                <div>
                  <FaMinus />
                </div>
                <div>0</div>
                <div>
                  <FaPlus />
                </div>
              </div>
              <div className='flex flex-col'>
                <h4 className='text-md mt-4 font-semibold'>Tags:</h4>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                  {product?.tags?.map((t) => (
                    <div className='p-2 border-[0.5px] border-gray-400 rounded'>
                      <h3 className='text-xs text-center'>{t}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className='p-3 border-[0.5px] border-gray-900 rounded mt-12 text-center'>
                Add To Cart
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <Title title='Related Products' />
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-5'>
            {relatedProducts?.data?.map((d) => (
              <div>
                <Image
                  src={d.images[0].image.optimizeUrl}
                  alt='related_product'
                  className='w-[283px] h-[368px]'
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>
        </div>
      </CommonLayout>
      <Footer />
    </>
  );
}

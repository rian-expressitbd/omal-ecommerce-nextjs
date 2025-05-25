import Image from "next/image";
import React from "react";
import Button from "./Button";

export default function CategoryProductCard({ product }) {
  console.log("cat_product", product);

  return (
    <div>
      <div className='group  rounded-[10px]  h-full flex flex-col  relative overflow-hidden transition-all duration-300 dark:bg-white dark:text-black'>
        {/* Header with category and action icons - fixed position */}
        <div className='flex justify-between z-10 bg-white'>
          <p className='text-xs text-gray-400'>{product.category}</p>
        </div>

        <div className='flex flex-col flex-grow transition-transform duration-300 '>
          {/* Product image */}
          {product.images[0].image.optimizeUrl && (
            <Image
              src={product.images[0].image.secure_url}
              className='mx-auto w-[283px] h-[368px] object-cover my-auto'
              alt={product.title || "product_image"}
              width={300} // Add width (adjust as needed)
              height={300} // Add height (adjust as needed)
            />
          )}

          {/* Product title and price */}
          <h3 className='text-sm font-bold mt-3'>{product.title}</h3>
          <h1 className='text-lg mt-3'>{product.price}</h1>
        </div>

        <Button
          className='absolute w-[283px] mx-auto flex justify-center bottom-0 left-0 right-0 bg-white text-black font-semibold py-3 
                  opacity-0 translate-y-full transition-all duration-500
                  group-hover:opacity-100 group-hover:-translate-y-6
                  hover:bg-white text-sm cursor-pointer'
        >
          <p>Quick Add</p>
        </Button>
        <button className=''></button>
      </div>
    </div>
  );
}

"use client";
import { v4 as uuidv4 } from "uuid";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import {
  useGetProductByIdQuery,
  useGetProductsByCategoriesQuery,
} from "@/app/libs/features/productsApi";
import CommonLayout from "@/app/layouts/CommonLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/app/components/media/VideoPlayer";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Title from "@/app/components/UI/Title";
import Breadcrumb from "@/app/components/UI/Breadcrumb";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/libs/store/store";
import {
  addToCart,
  toggleCart,
  updateCartItem,
  removeFromCart,
} from "@/app/libs/features/cartSlice";
import CartDrawer from "@/app/components/Home/CartDrawer";
import { CartItem, Product } from "@/types/cart";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface ProductPageProps {
  initialProduct?: Product | null;
}

export default function ProductPage({ initialProduct }: ProductPageProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, isCartOpen } = useSelector(
    (state: RootState) => state.cart
  );

  const {
    data: rtkProduct,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  // Use initialProduct as fallback while RTK Query loads
  const product = initialProduct;

  useEffect(() => {
    if (product?.variantsId?.length) {
      const prices = product.variantsId.map((v) => v.selling_price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      console.log("product", product);

      // Set default variant if product has variants but none selected
      if (product.hasVariants && !selectedVariant) {
        setSelectedVariant(product.variantsId[0]?._id || null);
      }
    }

    // Clear old localStorage data (remove after one run)
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartItems");
    }
  }, [product, selectedVariant]);

  const { data: relatedProducts } = useGetProductsByCategoriesQuery(
    product?.sub_category?.[0]?._id,
    {
      skip: !product?.sub_category?.[0]?._id,
    }
  );

  const handleSelectVariant = (selectedVariantValue: string) => {
    const selectedVariantObj = product?.variantsId?.find((v) =>
      v.variants_values.includes(selectedVariantValue)
    );

    if (selectedVariantObj) {
      setSelectedVariant(selectedVariantObj._id);
      setSellingPrice(selectedVariantObj.selling_price);
      setOfferPrice(selectedVariantObj.offer_price);
    } else {
      setSelectedVariant(null);
      setSellingPrice(0);
      setOfferPrice(0);
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product data not available", { position: "top-center" });
      return;
    }

    setIsAddingToCart(true);

    if (productCount < 1) {
      toast.error("Please select at least 1 item", { position: "top-center" });
      setIsAddingToCart(false);
      return;
    }

    if (product?.hasVariants && !selectedVariant) {
      toast.error("Please select a variant", { position: "top-center" });
      setIsAddingToCart(false);
      return;
    }

    try {
      const newItem: CartItem = {
        productId: product._id,
        quantity: productCount,
        variantId: product.hasVariants
          ? selectedVariant
          : product.variantsId[0]?._id,
        name: product.name,
        price: offerPrice > 0 ? offerPrice : sellingPrice,
        image: product.images?.[0]?.image?.optimizeUrl || "",
      };

      dispatch(addToCart(newItem));
      dispatch(toggleCart(true));
      toast.success("Added to cart successfully!", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to add to cart", { position: "top-center" });
      console.error("Add to cart error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleUpdateCartItem = (
    productId: string,
    variantId: string | null,
    quantity: number
  ) => {
    dispatch(updateCartItem({ productId, variantId, quantity }));
    toast.success(`Quantity updated to ${quantity}`, {
      position: "top-center",
    });
  };

  const handleRemoveCartItem = (
    productId: string,
    variantId: string | null
  ) => {
    dispatch(removeFromCart({ productId, variantId }));
    toast.success("Item removed from cart", { position: "top-center" });
  };

  const mediaItems: MediaItem[] = [
    ...(product?.images?.map((img) => ({
      type: "image" as const,
      url: img?.image?.optimizeUrl,
    })) || []),
    ...(product?.video?.secure_url
      ? [{ type: "video" as const, url: product.video.secure_url }]
      : []),
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mediaItems[selectedMedia]?.type !== "image") {
      setZoomStyle({});
      return;
    }

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${mediaItems[selectedMedia]?.url})`,
    });
  };

  if (isLoading && !initialProduct) {
    return (
      <CommonLayout>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary'></div>
        </div>
      </CommonLayout>
    );
  }

  if ((isError || !product) && !initialProduct) {
    return (
      <CommonLayout>
        <div className='text-center text-red-500'>
          {isError
            ? `Failed to load product data: ${JSON.stringify(error)}`
            : "Product not found."}
        </div>
      </CommonLayout>
    );
  }

  if (!product) {
    return (
      <CommonLayout>
        <div className='text-center text-red-500'>
          Product data not available
        </div>
      </CommonLayout>
    );
  }

  return (
    <>
      <Navbar
        isCartOpen={isCartOpen}
        setIsCartOpen={(isOpen) => dispatch(toggleCart(isOpen))}
      />
      <CommonLayout>
        <Toaster position='top-center' />
        <div className='mt-8 mb-8'>
          <Breadcrumb />
        </div>

        <div className='flex flex-col lg:flex-row gap-12 items-start mt-5 mb-5 w-full'>
          <div className='lg:col-span-1 space-y-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white dark:bg-gray-800 rounded'
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
                      loop
                      muted
                      showControls
                    />
                  ) : (
                    <div className='relative w-full h-full'>
                      <img
                        src={
                          mediaItems[selectedMedia]?.url || "/placeholder.png"
                        }
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
                  {mediaItems.map((item, index) => (
                    <button
                      key={`media-${uuidv4()}`}
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
                          src={item.url || "/placeholder.png"}
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

          <div className='w-full'>
            <div className='flex flex-col'>
              <h3 className='text-2xl font-semibold max-w-[500px] break-words'>
                {product.name}
              </h3>
              <div
                className='max-w-[500px] break-words'
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              ></div>
              {product.hasVariants && (
                <h4 className='mt-3 text-2xl font-semibold'>
                  BDT {minPrice.toLocaleString()} - BDT{" "}
                  {maxPrice.toLocaleString()}
                </h4>
              )}

              {product.hasVariants ? (
                <div className='flex items-center gap-3 mt-8'>
                  {offerPrice === 0 ? (
                    <p className='text-2xl text-gray-500 italic'>
                      Please select a variant
                    </p>
                  ) : (
                    <>
                      <h4 className='text-2xl font-semibold text-primary'>
                        BDT {offerPrice.toLocaleString()}
                      </h4>
                      {sellingPrice > offerPrice && (
                        <h4 className='line-through text-2xl text-red-600 ml-2'>
                          BDT {sellingPrice.toLocaleString()}
                        </h4>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className='flex items-center gap-3 mt-8'>
                  <h4 className='text-2xl font-semibold text-primary'>
                    BDT {product.variantsId[0].offer_price.toLocaleString()}
                  </h4>
                  {product.variantsId[0].selling_price >
                    product.variantsId[0].offer_price && (
                    <h4 className='line-through text-2xl text-red-600 ml-2'>
                      BDT {product.variantsId[0].selling_price.toLocaleString()}
                    </h4>
                  )}
                </div>
              )}

              <div className='flex items-center justify-center gap-3 border-[0.5px] border-gray-500 p-3 mt-5 mb-5 w-24'>
                <button
                  className='cursor-pointer'
                  onClick={() => setProductCount(Math.max(1, productCount - 1))}
                >
                  <FaMinus />
                </button>
                <div>{productCount}</div>
                <button
                  className='cursor-pointer'
                  onClick={() => setProductCount(productCount + 1)}
                >
                  <FaPlus />
                </button>
              </div>

              {product.tags?.length > 0 && (
                <div className='flex flex-col'>
                  <h4 className='text-md mt-4 font-semibold'>Tags:</h4>
                  <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                    {product.tags.map((tag) => (
                      <div
                        key={`tag-${uuidv4()}`}
                        className='p-2 border-[0.5px] border-gray-400 rounded'
                      >
                        <h3 className='text-xs text-center'>{tag}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.hasVariants && (
                <div className='flex flex-col mt-4'>
                  <h4 className='text-md font-semibold'>Select Variant:</h4>
                  <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                    {product.variantsId.map((variant) => {
                      const variantValue = variant.variants_values.join("-");
                      const isSelected = selectedVariant === variant._id;
                      return (
                        <div key={`var-${uuidv4()}`}>
                          <div
                            className={`p-2 border-[0.5px] rounded cursor-pointer flex items-center ${
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-gray-400"
                            }`}
                            onClick={() =>
                              handleSelectVariant(variant.variants_values[0])
                            }
                          >
                            <h3>{variantValue}</h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                className={`p-3 border-[0.5px] border-gray-900 rounded mt-12 text-center cursor-pointer w-1/2 ${
                  isAddingToCart ? "opacity-70" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>

        {relatedProducts?.data?.length > 0 && (
          <div className='mt-12'>
            <Title title='Related Products' />
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-5'>
              {relatedProducts.data.map((product: Product) => (
                <div key={`related-product-${uuidv4()}`}>
                  <Image
                    src={
                      product.images[0]?.image?.optimizeUrl ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    className='w-[283px] h-[368px] object-cover'
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CommonLayout>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => dispatch(toggleCart(false))}
        cartItems={cartItems}
        updateCartItem={handleUpdateCartItem}
        removeCartItem={handleRemoveCartItem}
      />
      <Footer />
    </>
  );
}

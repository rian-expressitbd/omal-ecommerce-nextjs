// src/app/components/Home/CartDrawer.tsx
"use client";

import { v4 as uuidv4 } from "uuid";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { CartItem, Product } from "@/app/types/cart";
import { useGetProductsQuery } from "@/app/libs/features/productsApi";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateCartItem: (
    productId: string,
    variantId: string | null,
    quantity: number
  ) => void;
  removeCartItem: (productId: string, variantId: string | null) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  updateCartItem,
  removeCartItem,
}) => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products?.data.find((p: Product) =>
      p.variantsId.some((v) => v._id === item.variantId)
    );
    const variant = product?.variantsId.find((v) => v._id === item.variantId);
    return total + (variant?.offer_price || 0) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {isLoading ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Loading cart items...
              </p>
            ) : isError ? (
              <p className="text-red-500 text-center">
                Failed to load cart items.
              </p>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const product = products?.data.find((p: Product) =>
                    p.variantsId.some((v) => v._id === item.variantId)
                  );
                  const variant = product?.variantsId.find(
                    (v) => v._id === item.variantId
                  );
                  const variantName = variant?.name || product?.name || "Product";
                  const variantImage =
                    variant?.image?.image?.secure_url ||
                    product?.images[0]?.image?.optimizeUrl ||
                    "/placeholder.png";
                  const variantPrice = variant?.offer_price || 0;

                  return (
                    <div
                      key={`${item.productId}-${item.variantId || uuidv4()}`}
                      className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                    >
                      <img
                        src={variantImage}
                        alt={variantName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {variantName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          BDT {variantPrice.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateCartItem(
                                item.productId,
                                item.variantId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-primary hover:text-white"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="text-sm text-gray-800 dark:text-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItem(
                                item.productId,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-primary hover:text-white"
                          >
                            <FaPlus size={12} />
                          </button>
                          <button
                            onClick={() =>
                              removeCartItem(item.productId, item.variantId)
                            }
                            className="ml-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Total: BDT {totalPrice.toLocaleString()}
                  </h3>
                  <div className="mt-4">
                    <Link
                      href="/checkout"
                      className="block w-full p-3 text-center bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
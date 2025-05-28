"use client";

import Footer from "./components/Footer/Footer";
import Banner from "./components/Home/Banner";
import ProductsClientComponent from "./components/Home/ProductsClientComponent";
import CategoryProducts from "./components/Home/CategoryProducts/CategoryProducts";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/libs/store/store";
import {
  toggleCart,
  updateCartItem,
  removeFromCart,
} from "./libs/features/cartSlice";
import CartDrawer from "./components/Home/CartDrawer";
import { CartItem } from "@/types/cart";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, isCartOpen } = useSelector(
    (state: RootState) => state.cart
  );

  const handleUpdateCartItem = (
    productId: string,
    variantId: string | undefined,
    quantity: number
  ) => {
    dispatch(updateCartItem({ productId, variantId, quantity }));
  };

  const handleRemoveCartItem = (
    productId: string,
    variantId: string | undefined
  ) => {
    dispatch(removeFromCart({ productId, variantId }));
  };

  return (
    <>
      <Navbar
        isCartOpen={isCartOpen}
        setIsCartOpen={(isOpen) => dispatch(toggleCart(isOpen))}
      />
      <Banner />
      <ProductsClientComponent />
      <Banner />
      <CategoryProducts />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => dispatch(toggleCart(false))}
        cartItems={cartItems}
        updateCartItem={handleUpdateCartItem}
        removeCartItem={handleRemoveCartItem}
      />
      <Toaster />
      <Footer />
    </>
  );
}

"use client";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Home/Banner";
import ProductsClientComponent from "./components/Home/ProductsClientComponent";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";

import Navbar from "./components/Navbar/Navbar";
import { useGetProductsQuery } from "./features/productsApi";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { data: liveProducts, isLoading, isError } = useGetProductsQuery();
  return (
    <>
      <Navbar />
      <Banner />
      <ProductsClientComponent initialProducts={liveProducts} />
      <Banner />
      <CategoryProducts />
      <Toaster />
      <Footer />
    </>
  );
}

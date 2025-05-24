"use client";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Home/Banner";
import ProductsClientComponent from "./components/Home/ProductsClientComponent";
import MensDress from "./components/MensDress/MensDress";
import Navbar from "./components/Navbar/Navbar";
import { useGetProductsQuery } from "./features/productsApi";

export default function Home() {
  const { data: liveProducts, isLoading, isError } = useGetProductsQuery();
  return (
    <>
      <Navbar />
      <Banner />
      <ProductsClientComponent initialProducts={liveProducts} />
      <Banner />
      <MensDress />
      <Footer />
    </>
  );
}

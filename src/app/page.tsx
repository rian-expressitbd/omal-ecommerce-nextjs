import Footer from "./components/Footer/Footer";
import Banner from "./components/Home/Banner";
import Products from "./components/Home/Products";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Products />
      <Banner />
      <Footer />
    </>
  );
}

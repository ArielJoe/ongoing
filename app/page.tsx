
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import OtherProducts from "./components/OtherProducts";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <WhyUs />
      <OtherProducts />
      <Footer />
    </main>
  );
}

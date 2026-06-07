import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedProductsSection />
    </>
  );
}
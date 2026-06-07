import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import FeaturedCollectionsSection from "@/components/sections/FeaturedCollectionsSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedCollectionsSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <BrandStorySection />
    </>
  );
}
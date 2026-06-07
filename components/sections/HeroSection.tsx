import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Content */}
          <div>
            <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
              Luxury Fragrance Collection
            </p>

            <h1
              className="mb-6 text-5xl font-semibold leading-tight lg:text-7xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Discover Your Signature Scent
            </h1>

            <p className="mb-8 max-w-xl text-lg text-gray-600">
              Crafted with rare ingredients and timeless elegance.
              Explore fragrances designed to leave a lasting impression.
            </p>

            <Button>
              Shop Collection
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/images/hero-perfume.png"
                alt="Luxury Perfume"
                width={800}
                height={1000}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
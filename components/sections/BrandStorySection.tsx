import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { brandStory } from "@/data/brand";

export default function BrandStorySection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={brandStory.image}
                alt={brandStory.title}
                width={800}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)] sm:text-sm">
              Our Story
            </p>

            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-semibold leading-tight lg:text-5xl">
              {brandStory.title}
            </h2>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
              {brandStory.description}
            </p>

            <Button>Discover Our Craft</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

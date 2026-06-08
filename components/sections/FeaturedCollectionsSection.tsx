import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionCard from "@/components/ui/CollectionCard";
import { collections } from "@/data/collections";
import { getProductCountByCategory } from "@/lib/collections";

export default function FeaturedCollectionsSection() {
  return (
    <section className="bg-[var(--muted)] py-20">
      <Container>
        <SectionTitle
          subtitle="Curated for You"
          title="Our Collections"
          subtitleTone="gold"
        />

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 lg:gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="w-[calc(50%-0.625rem)] sm:w-[calc(50%-0.75rem)] md:w-48 lg:w-56 xl:w-64"
            >
              <CollectionCard
                collection={collection}
                productCount={getProductCountByCategory(collection.slug)}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

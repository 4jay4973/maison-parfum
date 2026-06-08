import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionCard from "@/components/ui/CollectionCard";
import { collections } from "@/data/collections";
import { collectionsPage } from "@/data/collections-page";
import { getProductCountByCategory } from "@/lib/collections";

export default function CollectionsCategoryGrid() {
  return (
    <section className="bg-[var(--background)] py-14 md:py-20 lg:py-24">
      <Container>
        <SectionTitle
          subtitle={collectionsPage.categories.eyebrow}
          title={collectionsPage.categories.title}
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

import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionCard from "@/components/ui/CollectionCard";
import { collections } from "@/data/collections";
import { collectionsPage } from "@/data/collections-page";

export default function CollectionsCategoryGrid() {
  return (
    <section className="bg-[var(--background)] py-14 md:py-20 lg:py-24">
      <Container>
        <SectionTitle
          subtitle={collectionsPage.categories.eyebrow}
          title={collectionsPage.categories.title}
          subtitleTone="gold"
        />

        <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Container>
    </section>
  );
}

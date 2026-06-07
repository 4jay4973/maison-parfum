import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionCard from "@/components/ui/CollectionCard";
import { collections } from "@/data/collections";

export default function FeaturedCollectionsSection() {
  return (
    <section className="bg-[var(--muted)] py-20">
      <Container>
        <SectionTitle
          subtitle="Curated for You"
          title="Our Collections"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

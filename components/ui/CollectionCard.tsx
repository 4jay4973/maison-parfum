import Image from "next/image";
import { Collection } from "@/types/collection";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({
  collection,
}: CollectionCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
      <div className="overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.title}
          width={600}
          height={750}
          className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3
          className="text-2xl font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
          }}
        >
          {collection.title}
        </h3>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {collection.description}
        </p>
      </div>
    </article>
  );
}

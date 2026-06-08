import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/types/collection";

interface CollectionCardProps {
  collection: Collection;
  productCount?: number;
}

export default function CollectionCard({
  collection,
  productCount,
}: CollectionCardProps) {
  return (
    <article className="group flex flex-col items-center text-center">
      <Link
        href={`/collections?category=${collection.slug}`}
        className="flex w-full flex-col items-center"
      >
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[var(--muted)]">
          <Image
            src={collection.image}
            alt={collection.title}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-600 transition-colors duration-300 group-hover:text-[var(--primary)] sm:mt-4">
          {collection.title}
        </p>

        {productCount !== undefined && (
          <p className="mt-1 text-xs text-gray-500">
            {productCount} {productCount === 1 ? "fragrance" : "fragrances"}
          </p>
        )}
      </Link>
    </article>
  );
}

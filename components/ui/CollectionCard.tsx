import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/types/collection";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({
  collection,
}: CollectionCardProps) {
  return (
    <article className="group">
      <Link href="/collections" className="block">
        <div className="aspect-square overflow-hidden rounded-2xl bg-[var(--muted)]">
          <Image
            src={collection.image}
            alt={collection.title}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-gray-600 transition-colors duration-300 group-hover:text-[var(--primary)] sm:mt-4 sm:text-left">
          {collection.title}
        </p>
      </Link>
    </article>
  );
}

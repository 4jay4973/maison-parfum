import { products } from "@/data/products";
import { Collection } from "@/types/collection";
import { ProductCategory } from "@/types/product";

const collectionDefinitions: Omit<Collection, "image">[] = [
  {
    id: 1,
    slug: "floral",
    title: "Floral Collection",
    description: "Elegant floral notes for every occasion.",
    featuredProductSlug: "velvet-rose",
  },
  {
    id: 2,
    slug: "oriental",
    title: "Oriental Collection",
    description: "Rich and mysterious fragrances.",
    featuredProductSlug: "golden-amber",
  },
  {
    id: 3,
    slug: "woody",
    title: "Woody Collection",
    description: "Warm, sophisticated, and timeless.",
    featuredProductSlug: "desert-sandalwood",
  },
];

function getCollectionImage(slug: ProductCategory, featuredProductSlug: string) {
  const featured = products.find((product) => product.slug === featuredProductSlug);
  const fallback = products.find((product) => product.category === slug);

  return featured?.image ?? fallback?.image ?? "/images/hero-perfume.png";
}

export const collections: Collection[] = collectionDefinitions.map(
  (collection) => ({
    ...collection,
    image: getCollectionImage(collection.slug, collection.featuredProductSlug),
  })
);

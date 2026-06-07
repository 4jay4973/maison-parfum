import Image from "next/image";
import { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
      <Image
        src={product.image}
        alt={product.name}
        width={800}
        height={1000}
        priority
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

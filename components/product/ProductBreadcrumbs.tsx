import Link from "next/link";
import { Product } from "@/types/product";
import { getBreadcrumbCategoryLabel } from "@/lib/product-display";

interface ProductBreadcrumbsProps {
  product: Product;
}

export default function ProductBreadcrumbs({
  product,
}: ProductBreadcrumbsProps) {
  const categoryLabel = getBreadcrumbCategoryLabel(product.category);

  return (
    <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.18em] text-gray-500 sm:text-sm">
        <li>
          <Link
            href="/collections"
            className="transition-colors hover:text-[var(--primary)]"
          >
            Fragrances
          </Link>
        </li>
        <li aria-hidden className="text-gray-400">
          /
        </li>
        <li>
          <Link
            href={`/collections?category=${product.category}`}
            className="transition-colors hover:text-[var(--primary)]"
          >
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden className="text-gray-400">
          /
        </li>
        <li>
          <span
            aria-current="page"
            className="font-medium text-[var(--foreground)]"
          >
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

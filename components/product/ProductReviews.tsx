import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { Product } from "@/types/product";
import {
  ratingDistribution,
  sampleReviews,
} from "@/data/product-reviews";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  product: Product;
}

function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const filledStars = Math.round(rating);

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "text-sm",
            index < filledStars ? "text-[var(--primary)]" : "text-gray-300"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--muted)] py-16 md:py-20 lg:py-24">
      <Container>
        <SectionTitle
          subtitle="Reviews"
          title="Customer Reviews"
          subtitleTone="gold"
        />

        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <aside className="text-center lg:text-left">
            <p className="font-[family-name:var(--font-heading)] text-5xl font-semibold md:text-6xl">
              {product.rating.toFixed(1)}
            </p>
            <StarRating rating={product.rating} className="mt-3 justify-center lg:justify-start" />
            <p className="mt-2 text-sm text-gray-500">
              Based on {product.reviewCount.toLocaleString()} reviews
            </p>

            <ul className="mt-8 space-y-2">
              {ratingDistribution.map(({ stars, percent }) => (
                <li
                  key={stars}
                  className="flex items-center gap-3 text-xs text-gray-600 sm:text-sm"
                >
                  <span className="w-3 shrink-0">{stars}</span>
                  <span className="text-[var(--primary)]">★</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right">{percent}%</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Write a Review
            </button>
          </aside>

          <div className="space-y-6">
            {sampleReviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {review.author}
                    </p>
                    {review.verified && (
                      <p className="mt-0.5 text-xs uppercase tracking-widest text-[var(--primary)]">
                        Verified Buyer
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>

                <StarRating rating={review.rating} className="mt-4" />
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {review.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {review.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

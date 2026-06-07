import { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < rating ? "text-[var(--primary)]" : "text-[var(--border)]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-6">
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-4 flex-1 text-gray-600 leading-relaxed">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      <footer className="mt-6 border-t border-[var(--border)] pt-6">
        <p
          className="font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
          }}
        >
          {testimonial.name}
        </p>
        <p className="mt-1 text-sm text-gray-500">{testimonial.location}</p>
      </footer>
    </article>
  );
}

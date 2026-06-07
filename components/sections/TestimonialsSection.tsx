import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="bg-[var(--muted)] py-20">
      <Container>
        <SectionTitle
          subtitle="Client Love"
          title="What Our Customers Say"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
] as const;

type CheckoutStep = (typeof steps)[number]["id"];

interface CheckoutProgressProps {
  currentStep?: CheckoutStep;
  className?: string;
}

export default function CheckoutProgress({
  currentStep = "payment",
  className,
}: CheckoutProgressProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav
      aria-label="Checkout progress"
      className={cn("w-full", className)}
    >
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] sm:gap-3 sm:text-[0.8125rem] sm:tracking-[0.2em]">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          const labelClass = cn(
            isCurrent && "text-[var(--primary)]",
            isComplete && "text-[var(--foreground)]",
            isUpcoming && "text-gray-400"
          );

          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              {index > 0 && (
                <span
                  className="text-gray-300"
                  aria-hidden
                >
                  →
                </span>
              )}

              {step.href && !isCurrent ? (
                <Link
                  href={step.href}
                  className={cn(
                    "transition-colors hover:text-[var(--primary)]",
                    labelClass
                  )}
                >
                  {step.label}
                </Link>
              ) : (
                <span
                  className={labelClass}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {step.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

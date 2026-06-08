import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const trustIndicators = [
  "Complimentary Samples",
  "Secure Checkout",
  "Free Shipping",
  "Easy Returns",
];

interface CheckoutTrustIndicatorsProps {
  className?: string;
}

export default function CheckoutTrustIndicators({
  className,
}: CheckoutTrustIndicatorsProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {trustIndicators.map((label) => (
        <li
          key={label}
          className="flex items-center gap-2.5 text-sm text-gray-600"
        >
          <Check
            size={15}
            className="shrink-0 text-[var(--primary)]"
            aria-hidden
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

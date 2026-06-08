import { Lock, ShieldCheck, Truck } from "lucide-react";

const badges = [
  { icon: Truck, label: "Free Shipping" },
  { icon: Lock, label: "Secure Checkout" },
  { icon: ShieldCheck, label: "Authentic Fragrance" },
];

export default function ProductTrustBadges() {
  return (
    <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
      {badges.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm"
        >
          <Icon
            size={16}
            className="shrink-0 text-[var(--primary)]"
            aria-hidden
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

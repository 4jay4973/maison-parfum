interface SectionTitleProps {
    title: string;
    subtitle?: string;
    subtitleTone?: "muted" | "gold";
  }
  
  export default function SectionTitle({
    title,
    subtitle,
    subtitleTone = "muted",
  }: SectionTitleProps) {
    return (
      <div className="mb-8 text-center md:mb-10">
        {subtitle && (
          <p
            className={`mb-2 text-xs uppercase tracking-[0.3em] sm:text-sm ${
              subtitleTone === "gold"
                ? "text-[var(--primary)]"
                : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>
        )}
  
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
    );
  }
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { FragranceNotes } from "@/types/product";
import { cn } from "@/lib/utils";

interface OlfactoryJourneyProps {
  notes: FragranceNotes;
}

type NoteTier = "top" | "heart" | "base";

interface PyramidTierProps {
  tier: NoteTier;
  label: string;
  notes: string[];
  isFirst?: boolean;
  isLast?: boolean;
}

const tierStyles: Record<
  NoteTier,
  { width: string; surface: string; label: string }
> = {
  top: {
    width: "max-w-[min(100%,18rem)]",
    surface: "bg-white/90 border-[var(--border)]",
    label: "text-[var(--primary)]",
  },
  heart: {
    width: "max-w-[min(100%,24rem)]",
    surface: "bg-[var(--muted)]/70 border-[var(--border)]",
    label: "text-[var(--foreground)]",
  },
  base: {
    width: "max-w-[min(100%,32rem)]",
    surface: "bg-[var(--muted)] border-[var(--border)]",
    label: "text-[var(--foreground)]",
  },
};

function PyramidGuide({ isLast }: { isLast?: boolean }) {
  if (isLast) {
    return null;
  }

  return (
    <div
      className="flex h-8 w-px items-center justify-center bg-[var(--primary)]/35 sm:h-10"
      aria-hidden
    >
      <span className="size-1.5 rotate-45 border border-[var(--primary)] bg-[var(--background)]" />
    </div>
  );
}

function PyramidTier({ tier, label, notes, isLast }: PyramidTierProps) {
  const styles = tierStyles[tier];
  const headingId = `olfactory-${tier}-notes`;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={cn(
          "w-full rounded-2xl border px-6 py-7 text-center sm:px-8 sm:py-8",
          styles.width,
          styles.surface
        )}
        role="region"
        aria-labelledby={headingId}
      >
        <h3
          id={headingId}
          className={cn(
            "text-xs font-medium uppercase tracking-[0.22em]",
            styles.label
          )}
        >
          {label}
        </h3>

        <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
          {notes.map((note) => (
            <li
              key={note}
              className="font-[family-name:var(--font-heading)] text-lg leading-snug text-[var(--foreground)] sm:text-xl"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>

      <PyramidGuide isLast={isLast} />
    </div>
  );
}

function PyramidOutline() {
  return (
    <svg
      viewBox="0 0 320 360"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,22rem)] w-[min(90%,18rem)] -translate-x-1/2 -translate-y-[42%] text-[var(--primary)] opacity-[0.14] sm:h-[26rem] sm:w-[20rem]"
      aria-hidden
    >
      <polygon
        points="160,24 300,320 20,320"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="70"
        y1="195"
        x2="250"
        y2="195"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="4 6"
      />
      <line
        x1="105"
        y1="118"
        x2="215"
        y2="118"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

export default function OlfactoryJourney({ notes }: OlfactoryJourneyProps) {
  return (
    <section
      className="bg-[var(--background)] py-16 md:py-20 lg:py-24"
      aria-label="The olfactory journey fragrance note pyramid"
    >
      <Container>
        <SectionTitle
          subtitle="Fragrance Notes"
          title="The Olfactory Journey"
          subtitleTone="gold"
        />

        <div className="relative mx-auto max-w-3xl px-2 sm:px-0">
          <PyramidOutline />

          <div className="relative flex flex-col items-center">
            <PyramidTier tier="top" label="Top Notes" notes={notes.top} />
            <PyramidTier
              tier="heart"
              label="Heart Notes"
              notes={notes.middle}
            />
            <PyramidTier
              tier="base"
              label="Base Notes"
              notes={notes.base}
              isLast
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

import { FragranceNotes as FragranceNotesType } from "@/types/product";

interface FragranceNotesProps {
  notes: FragranceNotesType;
}

interface NoteListProps {
  label: string;
  notes: string[];
}

function NoteList({ label, notes }: NoteListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-widest text-gray-500">
        {label}
      </h3>
      <ul className="mt-3 space-y-1">
        {notes.map((note) => (
          <li key={note} className="text-sm leading-relaxed text-gray-600">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FragranceNotes({ notes }: FragranceNotesProps) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[var(--primary)] sm:text-sm">
        Fragrance Notes
      </p>
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-3xl">
        The Composition
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <NoteList label="Top Notes" notes={notes.top} />
        <NoteList label="Middle Notes" notes={notes.middle} />
        <NoteList label="Base Notes" notes={notes.base} />
      </div>
    </div>
  );
}

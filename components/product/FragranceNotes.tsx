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
    <div className="mt-8 border-t border-[var(--border)] pt-8">
      <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">
        Fragrance Notes
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <NoteList label="Top Notes" notes={notes.top} />
        <NoteList label="Middle Notes" notes={notes.middle} />
        <NoteList label="Base Notes" notes={notes.base} />
      </div>
    </div>
  );
}

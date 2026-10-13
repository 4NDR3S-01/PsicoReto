"use client";

import { UNITS } from "@/lib/data/units";

export function UnitPicker({
  value,
  onChange,
  units = UNITS.map((u) => u.id),
}: {
  value: number;
  onChange: (v: number) => void;
  units?: number[];
}) {
  const base = "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-bold transition";
  const on = "border-transparent bg-brand text-white shadow-soft";
  const off = "border-[var(--line)] bg-[var(--surface)] muted hover:bg-[var(--surface-2)]";
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
      <button onClick={() => onChange(0)} className={`${base} ${value === 0 ? on : off}`}>
        Todas
      </button>
      {units.map((id) => {
        const u = UNITS.find((x) => x.id === id);
        if (!u) return null;
        return (
          <button key={id} onClick={() => onChange(id)} className={`${base} ${value === id ? on : off}`}>
            {u.emoji} {u.short}
          </button>
        );
      })}
    </div>
  );
}

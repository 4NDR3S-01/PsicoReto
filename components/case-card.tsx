"use client";

import Link from "next/link";
import { useProgress } from "@/components/providers";
import type { ClinicalCase } from "@/lib/data/cases";
import { getUnit } from "@/lib/data/units";

export const DIFF_COLOR = { Fácil: "#14B8A6", Media: "#F5B301", Difícil: "#E8476B" } as const;

export function CaseCard({ c }: { c: ClinicalCase }) {
  const { progress } = useProgress();
  const st = progress.cases[c.id];
  const unit = getUnit(c.unitId)!;
  return (
    <Link href={`/casos/${c.id}`} className="card flex flex-col gap-2 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-2)]">
      <div className="flex items-center gap-2">
        <span className="font-black">Caso {c.id}</span>
        <span className="chip" style={{ color: DIFF_COLOR[c.difficulty], borderColor: `${DIFF_COLOR[c.difficulty]}66` }}>
          {c.difficulty}
        </span>
        <span className="ml-auto text-lg">{st?.ok ? "✅" : st ? "🔁" : ""}</span>
      </div>
      {/* El título revela el diagnóstico: solo se muestra una vez resuelto. */}
      <p className="text-sm font-black" style={{ color: unit.color }}>
        {st?.ok ? c.title : `${unit.emoji} ${unit.short}`}
      </p>
      <p className="muted line-clamp-3 text-sm font-semibold">{c.vignette}</p>
    </Link>
  );
}

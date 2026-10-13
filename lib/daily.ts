import { CASES } from "./data/cases";
import { ALL_TERMS } from "./data/units";
import { today, type Progress } from "./progress";
import { caseQuestion, defQuestion, sample, termQuestion, type Question } from "./quiz";

/** Hash determinista de la fecha (YYYY-MM-DD) para sembrar el reto del día. */
function hashSeed(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Generador pseudoaleatorio reproducible (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Reto del día: misma selección para todos durante la misma fecha.
 * Combina preguntas de términos (definición ↔ término) y un caso clínico.
 */
export function dailyQuestions(dateId: string, terms = 8): Question[] {
  const rand = mulberry32(hashSeed(dateId));
  const picked = sample(ALL_TERMS, terms, rand);
  const qs = picked.map((t, i) => (i % 2 === 0 ? defQuestion(t, rand) : termQuestion(t, rand)));
  const c = sample(CASES, 1, rand)[0];
  if (c) qs.push(caseQuestion(c, rand));
  return qs;
}

/** ¿Ya se completó el reto de la fecha indicada? */
export function dailyDone(progress: Pick<Progress, "history">, dateId: string): boolean {
  return progress.history.some((h) => h.kind === "diario" && today(new Date(h.at)) === dateId);
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProgress } from "@/components/providers";
import { QuizRunner } from "@/components/quiz-runner";
import { Mascot, PageHeader } from "@/components/ui";
import { dailyDone, dailyQuestions } from "@/lib/daily";
import { currentStreak, today } from "@/lib/progress";

export default function RetoDiario() {
  const { progress } = useProgress();
  const date = today();
  const questions = useMemo(() => dailyQuestions(date, 8), [date]);
  const [run, setRun] = useState(0);

  const done = dailyDone(progress, date);
  const todayXp = progress.activity[date] ?? 0;

  if (run)
    return (
      <QuizRunner
        key={run}
        title="Reto del día"
        questions={questions}
        exitHref="/retos/diario"
        kind="diario"
        onExit={() => setRun(0)}
        onRestart={() => setRun((r) => r + 1)}
      />
    );

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        back="/retos"
        title="🗓️ Reto del día"
        subtitle="Una selección distinta cada día. Vuelve mañana para el siguiente."
      />
      <Mascot
        text={
          done
            ? "Ya completaste el reto de hoy. ¡Vuelve mañana para el siguiente!"
            : "Ocho preguntas que cambian cada día: términos y un caso clínico. ¿Puedes con todas?"
        }
      />

      <div className="card mt-5 flex flex-col items-center gap-4 p-8 text-center">
        <div className="text-6xl">{done ? "✅" : "🗓️"}</div>
        <h3 className="text-xl font-extrabold">{done ? "¡Reto completado!" : "El reto de hoy está listo"}</h3>
        <p className="muted max-w-md font-medium">
          Ganas 10 XP por acierto y un bonus si no fallas ninguna. La selección es la misma para todos durante el día.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="chip text-flame">🔥 Racha: {currentStreak(progress)}</span>
          <span className="chip text-gold">⭐ Hoy: {todayXp} XP</span>
          <span className="chip">{date}</span>
        </div>
        <button className="btn btn-primary w-full max-w-xs" onClick={() => setRun(1)}>
          {done ? "Repetir el reto" : "Empezar el reto"}
        </button>
        <Link href="/retos" className="text-sm font-bold text-brand">
          Ver todos los retos
        </Link>
      </div>
    </div>
  );
}

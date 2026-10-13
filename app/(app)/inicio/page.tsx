"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth, useProgress } from "@/components/providers";
import { Bar, Mascot, Stat } from "@/components/ui";
import { dailyDone, dailyQuestions } from "@/lib/daily";
import { factOfTheDay } from "@/lib/data/facts";
import { UNITS } from "@/lib/data/units";
import {
  addDays,
  currentStreak,
  level,
  levelProgress,
  overallProgress,
  reviewQueue,
  today,
  unitProgress,
} from "@/lib/progress";

const QUICK = [
  { href: "/retos/flashcards", icon: "🃏", label: "Flashcards", color: "#8B5CF6" },
  { href: "/retos/emparejar", icon: "🧩", label: "Emparejar", color: "#2D9CDB" },
  { href: "/casos", icon: "🩺", label: "Casos clínicos", color: "#E8476B" },
  { href: "/examen", icon: "📝", label: "Modo examen", color: "#F59E0B" },
  { href: "/repaso", icon: "🔄", label: "Repaso", color: "#6C4CF1" },
  { href: "/glosario", icon: "🔍", label: "Glosario", color: "#14B8A6" },
];

const DAYS = ["D", "L", "M", "X", "J", "V", "S"];

export default function Inicio() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const name = (user?.user_metadata?.name as string) || user?.email?.split("@")[0] || "";
  const streak = currentStreak(progress);
  const todayXp = progress.activity[today()] ?? 0;
  const goalPct = Math.min(100, (todayXp / progress.dailyGoal) * 100);
  const review = reviewQueue(progress).length;
  const next = UNITS.find((u) => unitProgress(progress, u.id) < 100) ?? UNITS[0];
  const nextPct = unitProgress(progress, next.id);

  const dailyDate = today();
  const dailyIsDone = dailyDone(progress, dailyDate);
  const dailyTotal = useMemo(() => dailyQuestions(dailyDate, 8).length, [dailyDate]);

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(today(), i - 6);
    const [y, m, dd] = d.split("-").map(Number);
    return { d, label: DAYS[new Date(y, m - 1, dd).getDay()], xp: progress.activity[d] ?? 0 };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="flex min-w-0 flex-col gap-6">
        <Mascot
          text={
            <>
              ¡Hola{name ? `, ${name}` : ""}! {todayXp >= progress.dailyGoal ? "Ya cumpliste tu meta de hoy 🎉" : "¿Listo para tu práctica de hoy?"}
            </>
          }
        />

        {/* Continuar */}
        <Link
          href={`/unidades/${next.id}`}
          className="group relative overflow-hidden rounded-3xl p-5 text-white shadow-lift transition active:scale-[.99]"
          style={{ background: `linear-gradient(135deg, ${next.color} 0%, color-mix(in srgb, ${next.color} 72%, #000000) 100%)` }}
        >
          <p className="text-xs font-bold uppercase tracking-wide opacity-90">Continuar · Unidad {next.id}</p>
          <h2 className="mt-1 text-2xl font-extrabold">{next.title}</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${nextPct}%` }} />
            </div>
            <span className="font-black">{nextPct}%</span>
          </div>
          <span className="absolute -right-2 -top-2 text-8xl opacity-30 transition group-hover:scale-110">{next.emoji}</span>
        </Link>

        {/* Reto del día */}
        <Link
          href="/retos/diario"
          className="group flex items-center gap-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-3xl">
            {dailyIsDone ? "✅" : "🗓️"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-accent">
              {dailyIsDone ? "Completado" : "Nuevo hoy"}
            </p>
            <h3 className="text-lg font-black">Reto del día</h3>
            <p className="muted truncate text-sm font-semibold">
              {dailyIsDone
                ? "¡Ya lo resolviste! Vuelve mañana por otro."
                : `${dailyTotal} preguntas nuevas para mantener tu racha.`}
            </p>
          </div>
          <span className="btn btn-primary !px-4 !py-2 text-sm">{dailyIsDone ? "Repetir" : "Empezar"}</span>
        </Link>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat icon="🔥" value={streak} label="días de racha" color="var(--color-flame)" />
          <Stat icon="⭐" value={progress.xp} label="XP total" color="var(--color-gold)" />
          <Stat icon="🏅" value={`Nv. ${level(progress.xp)}`} label={`${Math.round(levelProgress(progress.xp))}% al siguiente`} color="var(--color-sky)" />
          <Stat icon="📈" value={`${overallProgress(progress)}%`} label="progreso general" color="var(--color-brand)" />
        </div>

        {review > 0 && (
          <Link href="/repaso" className="card flex items-center gap-4 border-danger/40 p-4 hover:bg-[var(--surface-2)]">
            <span className="text-4xl">🔄</span>
            <div className="flex-1">
              <p className="font-black">Tienes {review} término{review > 1 ? "s" : ""} para repasar</p>
              <p className="muted text-sm font-semibold">Los términos que fallaste vuelven para que no se te olviden.</p>
            </div>
            <span className="btn btn-danger !py-2 text-xs">Repasar</span>
          </Link>
        )}

        <section>
          <h3 className="mb-3 text-lg font-black">Accesos rápidos</h3>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {QUICK.map((q) => (
              <Link key={q.href} href={q.href} className="card flex flex-col items-center gap-1 p-3 text-center transition hover:-translate-y-0.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: `${q.color}22` }}>
                  {q.icon}
                </span>
                <span className="text-xs font-extrabold">{q.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card overflow-hidden">
          <div className="flex items-center gap-2 bg-gold/15 px-4 py-2 text-sm font-bold text-[#8a6400] dark:text-gold">
            💡 Dato curioso del día
          </div>
          <p className="p-4 font-semibold leading-relaxed">{factOfTheDay()}</p>
        </section>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-black">Meta diaria</h3>
            <span className="muted text-sm font-black">
              {todayXp}/{progress.dailyGoal} XP
            </span>
          </div>
          <Bar value={goalPct} color="var(--color-gold)" />
        </div>

        <div className="card p-4">
          <h3 className="mb-3 font-black">Esta semana</h3>
          <div className="flex justify-between">
            {week.map((w) => (
              <div key={w.d} className="flex flex-col items-center gap-1">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                    w.xp > 0 ? "bg-flame text-white" : "bg-[var(--surface-2)] muted"
                  } ${w.d === today() ? "ring-2 ring-sky ring-offset-2 ring-offset-[var(--surface)]" : ""}`}
                >
                  {w.xp > 0 ? "🔥" : "·"}
                </span>
                <span className="muted text-xs font-black">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 font-black">Tus unidades</h3>
          <div className="flex flex-col gap-3">
            {UNITS.slice(0, 6).map((u) => (
              <Link key={u.id} href={`/unidades/${u.id}`} className="flex items-center gap-3">
                <span className="text-xl">{u.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{u.short}</p>
                  <Bar value={unitProgress(progress, u.id)} color={u.color} className="!h-2" />
                </div>
              </Link>
            ))}
            <Link href="/unidades" className="text-center text-sm font-bold text-brand">
              Ver todas
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

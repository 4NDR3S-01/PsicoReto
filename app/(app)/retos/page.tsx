"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui";

const GAMES = [
  { href: "/retos/diario", icon: "🗓️", title: "Reto del día", desc: "Una selección distinta cada día. Vuelve mañana para el siguiente.", color: "#14B8A6" },
  { href: "/retos/flashcards", icon: "🃏", title: "Flashcards", desc: "Voltea la tarjeta, recuerda la definición y evalúate.", color: "#8B5CF6" },
  { href: "/retos/emparejar", icon: "🧩", title: "Emparejar", desc: "Une cada término con su definición lo más rápido posible.", color: "#2D9CDB" },
  { href: "/retos/test", icon: "✅", title: "Test rápido", desc: "10 preguntas de opción múltiple sobre términos.", color: "#14B8A6" },
  { href: "/retos/sintomas", icon: "🔎", title: "Identificar síntomas", desc: "Lee la viñeta e identifica la alteración o el síndrome.", color: "#E8476B" },
  { href: "/examen", icon: "📝", title: "Modo examen", desc: "Simulación cronometrada con preguntas de todo el temario.", color: "#F59E0B" },
  { href: "/repaso", icon: "🔄", title: "Repaso espaciado", desc: "Los términos que fallaste reaparecen hasta dominarlos.", color: "#6C4CF1" },
];

export default function Retos() {
  return (
    <div>
      <PageHeader title="Retos" subtitle="Elige cómo quieres practicar hoy." />
      <div className="grid gap-4 md:grid-cols-2">
        {GAMES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="card group flex items-center gap-4 rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl transition group-hover:scale-110" style={{ background: `${g.color}1f` }}>
              {g.icon}
            </span>
            <div>
              <h3 className="text-lg font-extrabold" style={{ color: g.color }}>
                {g.title}
              </h3>
              <p className="muted text-sm font-medium">{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

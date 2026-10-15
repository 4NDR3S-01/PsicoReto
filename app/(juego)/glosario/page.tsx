"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icono } from "@/components/iconos";
import { ASPECTO, CORTO } from "@/components/planeta";
import { Titulo } from "@/components/ui";
import { FUNCIONES, SIGNOS, slugify } from "@/lib/contenido/funciones";

const norm = (s: string) => slugify(s).replace(/-/g, " ");

export default function Glosario() {
  const [q, setQ] = useState("");
  const [planeta, setPlaneta] = useState<string | null>(null);

  const lista = useMemo(() => {
    const t = norm(q);
    return SIGNOS.filter((s) => (!planeta || s.funcion === planeta) && (!t || [s.nombre, ...s.alias, s.def].some((x) => norm(x).includes(t)))).sort(
      (a, b) => a.nombre.localeCompare(b.nombre, "es"),
    );
  }, [q, planeta]);

  return (
    <div className="aparecer">
      <Titulo volver="/mapa" titulo="Glosario" sub={`${SIGNOS.length} signos de toda la galaxia.`} />

      <label className="relative block">
        <span className="sr-only">Buscar</span>
        <Icono nombre="buscar" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tenue" />
        <input className="campo pl-12" type="search" placeholder="Buscar un signo o una palabra…" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setPlaneta(null)}
          className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${!planeta ? "border-cian bg-cian/15 text-cian" : "border-white/15 text-tenue"}`}
        >
          Todos
        </button>
        {FUNCIONES.map((f) => (
          <button
            key={f.slug}
            onClick={() => setPlaneta(planeta === f.slug ? null : f.slug)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${planeta === f.slug ? "bg-white/10" : "border-white/15 text-tenue"}`}
            style={planeta === f.slug ? { borderColor: ASPECTO[f.slug].luz, color: ASPECTO[f.slug].luz } : undefined}
          >
            {CORTO[f.slug]}
          </button>
        ))}
      </div>

      <p className="mb-3 mt-4 text-sm text-tenue">
        {lista.length} resultado{lista.length === 1 ? "" : "s"}
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {lista.map((s) => (
          <li key={s.id} className="vidrio p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold" style={{ color: ASPECTO[s.funcion].luz }}>
                {s.nombre}
              </p>
              <Link href={`/planeta/${s.funcion}`} className="shrink-0 text-xs text-tenue hover:text-tinta">
                {CORTO[s.funcion]} →
              </Link>
            </div>
            {s.alias.length > 0 && <p className="text-xs text-tenue">También: {s.alias.join(", ")}</p>}
            <p className="mt-1.5 text-sm">{s.def}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Icono } from "@/components/iconos";
import { Titulo } from "@/components/ui";
import { GRUPOS, SINDROMES } from "@/lib/contenido/sindromes";

const COLOR_GRUPO: Record<string, string> = {
  agudos: "#ff6b8b",
  cronicos: "#b7a8ff",
  esquizofrenico: "#4fd1ff",
  delirantes: "#ff9a5a",
  afectivos: "#ffc857",
  disquineticos: "#5ef2b0",
  otros: "#9fb4ff",
};

export default function Sindromes() {
  return (
    <div className="aparecer">
      <Titulo
        volver="/mapa"
        titulo="Constelaciones de síndromes"
        sub="Cada grupo es una constelación. Cada estrella, un síndrome descrito en las siete dimensiones del examen mental."
        derecha={
          <Link href="/sindromes/comparar" className="boton boton-vidrio hidden sm:inline-flex">
            <Icono nombre="comparar" className="h-4 w-4" /> Comparar
          </Link>
        }
      />
      <Link href="/sindromes/comparar" className="boton boton-vidrio mb-6 sm:hidden">
        <Icono nombre="comparar" className="h-4 w-4" /> Comparar dos síndromes
      </Link>

      <div className="flex flex-col gap-6">
        {GRUPOS.map((g) => {
          const color = COLOR_GRUPO[g.id];
          return (
            <section key={g.id} className="vidrio p-5 sm:p-6">
              <div className="flex items-center gap-3" style={{ color }}>
                <Icono nombre="constelacion" className="h-7 w-7" />
                <h2 className="text-xl font-bold">
                  {g.nombre}
                </h2>
              </div>
              <p className="mt-2 text-sm text-tenue">{g.esencia}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SINDROMES.filter((s) => s.grupo === g.id).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/sindromes/${s.slug}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/30"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <Icono nombre="estrella" className="h-4 w-4" relleno />
                      <span className="group-hover:underline">{s.nombre}</span>
                    </span>
                    <span className="mt-1 block text-sm text-tenue">{s.sello}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

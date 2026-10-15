"use client";

import Link from "next/link";
import { Icono } from "@/components/iconos";
import { useEstado } from "@/components/proveedores";
import { Barra, Titulo } from "@/components/ui";
import { CONSULTAS } from "@/lib/contenido/consultas";
import { getGrupo } from "@/lib/contenido/sindromes";

export default function Casos() {
  const { estado } = useEstado();
  const resueltos = CONSULTAS.filter((c) => estado.casos[c.id]?.ok).length;

  return (
    <div className="aparecer">
      <Titulo
        titulo="Casos clínicos"
        sub="Lee la historia, marca los signos del examen mental y descubre el síndrome. +30 XP por caso acertado."
      />
      <div className="vidrio mb-6 flex items-center gap-4 p-5">
        <span className="text-3xl">🩺</span>
        <div className="flex-1">
          <p className="font-bold">
            {resueltos} de {CONSULTAS.length} casos resueltos
          </p>
          <Barra valor={(resueltos / CONSULTAS.length) * 100} color="#5ef2b0" className="mt-2" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONSULTAS.map((c) => {
          const r = estado.casos[c.id];
          return (
            <Link key={c.id} href={`/casos/${c.id}`} className="vidrio group flex flex-col gap-2 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-display text-xs font-bold">Caso {c.id}</span>
                {r ? (
                  <span className={`flex items-center gap-1 text-xs font-bold ${r.ok ? "text-menta" : "text-coral"}`}>
                    <Icono nombre={r.ok ? "check" : "equis"} className="h-4 w-4" />
                    {r.ok ? "Resuelto" : "Reintentar"}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-cian">Nuevo</span>
                )}
              </div>
              <p className="text-lg font-bold">{c.paciente}</p>
              <p className="text-sm text-tenue">{c.lugar}</p>
              <p className="flex-1 text-sm">{c.motivo}</p>
              {r?.ok && <p className="text-xs text-nebulosa">Constelación {getGrupo(c.sindrome.grupo).nombre.toLowerCase()}</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

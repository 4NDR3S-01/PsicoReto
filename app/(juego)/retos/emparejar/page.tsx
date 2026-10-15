"use client";

import Link from "next/link";
import { useState } from "react";
import { Icono } from "@/components/iconos";
import { useEstado } from "@/components/proveedores";
import { Barra, FinPartida } from "@/components/ui";
import { SIGNOS, type Signo } from "@/lib/contenido/funciones";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { barajar, tomar } from "@/lib/practica";

const RONDAS = 3;
const PARES = 5;

type Ronda = { signos: Signo[]; defs: Signo[] };

/** Cinco signos de una misma función para que las definiciones se parezcan entre sí. */
function nuevaRonda(): Ronda {
  const funcion = tomar(SIGNOS, 1)[0].funcion;
  const pool = SIGNOS.filter((s) => s.funcion === funcion);
  const signos = tomar(pool.length >= PARES ? pool : SIGNOS, PARES);
  return { signos, defs: barajar(signos) };
}

export default function Emparejar() {
  const { actualizar } = useEstado();
  const [n, setN] = useState(0);
  const [ronda, setRonda] = useState<Ronda>(nuevaRonda);
  const [sel, setSel] = useState<string | null>(null);
  const [hechos, setHechos] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<{ id: string; ok: boolean }[]>([]);
  const [fin, setFin] = useState<{ ok: number; total: number; xp: number } | null>(null);

  function elegirDef(d: Signo) {
    if (!sel || hechos.has(d.id) || error) return;
    if (d.id === sel) {
      const h = new Set(hechos).add(d.id);
      const nuevoLog = [...log, { id: d.id, ok: true }];
      setHechos(h);
      setLog(nuevoLog);
      setSel(null);
      if (h.size === PARES) {
        setTimeout(() => {
          if (n + 1 >= RONDAS) {
            const ok = nuevoLog.filter((x) => x.ok).length;
            const xp = ok * XP.ficha;
            actualizar((e) =>
              registrarPartida(registrarRespuestas(e, nuevoLog), { modo: "emparejar", titulo: "Emparejar", ok, total: nuevoLog.length, xp }),
            );
            setFin({ ok, total: nuevoLog.length, xp });
          } else {
            setN(n + 1);
            setRonda(nuevaRonda());
            setHechos(new Set());
          }
        }, 450);
      }
    } else {
      setLog([...log, { id: sel, ok: false }]);
      setError(d.id);
      setTimeout(() => {
        setError(null);
        setSel(null);
      }, 650);
    }
  }

  function reiniciar() {
    setN(0);
    setRonda(nuevaRonda());
    setSel(null);
    setHechos(new Set());
    setLog([]);
    setFin(null);
  }

  if (fin) {
    return (
      <FinPartida
        titulo="Emparejar"
        ok={fin.ok}
        total={fin.total}
        xp={fin.xp}
        mensaje={fin.ok === fin.total ? "¡Todos los pares a la primera!" : `${RONDAS * PARES} pares unidos`}
        otraVez={reiniciar}
      />
    );
  }

  const ficha = (activo: boolean, hecho: boolean, mal: boolean) =>
    `w-full rounded-2xl border p-3 text-left text-sm transition-all ${
      hecho
        ? "border-menta/40 bg-menta/10 opacity-40"
        : mal
          ? "sacudir border-coral bg-coral/15"
          : activo
            ? "border-cian bg-cian/15 shadow-[0_0_20px_-6px_#4fd1ff]"
            : "border-white/10 bg-white/5 hover:border-white/30"
    }`;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/retos" aria-label="Salir" className="text-tenue hover:text-tinta">
          <Icono nombre="cerrar" className="h-6 w-6" />
        </Link>
        <Barra valor={((n * PARES + hechos.size) / (RONDAS * PARES)) * 100} color="#b7a8ff" className="flex-1" />
        <span className="text-sm font-bold text-tenue">
          Ronda {n + 1}/{RONDAS}
        </span>
      </div>
      <h1 className="mt-6 text-xl font-bold">Une cada signo con su definición</h1>
      <p className="text-sm text-tenue">Elige un signo a la izquierda y luego su definición.</p>

      <div className="mt-6 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 sm:gap-5">
        <ul className="flex flex-col gap-2.5">
          {ronda.signos.map((s) => (
            <li key={s.id}>
              <button
                className={`${ficha(sel === s.id, hechos.has(s.id), false)} font-bold`}
                disabled={hechos.has(s.id)}
                onClick={() => !error && setSel(s.id)}
              >
                {s.nombre}
              </button>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2.5">
          {ronda.defs.map((d) => (
            <li key={d.id}>
              <button className={ficha(false, hechos.has(d.id), error === d.id)} disabled={hechos.has(d.id)} onClick={() => elegirDef(d)}>
                {d.def}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

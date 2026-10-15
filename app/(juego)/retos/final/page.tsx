"use client";

import Link from "next/link";
import { useState } from "react";
import { Icono } from "@/components/iconos";
import { Partida, type Resultado } from "@/components/partida";
import { useEstado } from "@/components/proveedores";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { pruebaFinal } from "@/lib/practica";

const TOTAL = 30;
const MINUTOS = 25;

export default function Final() {
  const { estado, actualizar } = useEstado();
  const [ronda, setRonda] = useState(0);
  const [preguntas, setPreguntas] = useState(() => pruebaFinal(TOTAL));

  function terminar(rs: Resultado[]) {
    const ok = rs.filter((r) => r.ok).length;
    const pct = Math.round((ok / preguntas.length) * 100);
    const xp = ok * XP.acierto + (pct >= 80 ? 100 : 0);
    actualizar((e) => {
      const x = registrarRespuestas(
        e,
        rs.filter((r) => r.pregunta.signo).map((r) => ({ id: r.pregunta.signo!, ok: r.ok })),
      );
      return registrarPartida({ ...x, finales: [...x.finales, pct] }, { modo: "final", titulo: "Prueba final", ok, total: preguntas.length, xp });
    });
    return { xp, mensaje: pct >= 80 ? "¡Prueba superada! 🏆" : pct >= 60 ? "Aprobada, puedes mejorar" : "Sigue explorando y vuelve a intentarlo" };
  }

  if (ronda === 0) {
    return (
      <div className="aparecer mx-auto max-w-lg text-center">
        <span className="flotar inline-flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6c9,#ffc857_45%,#ff7a3d_80%)] text-5xl shadow-[0_0_60px_-5px_#ffc857]">
          ☀️
        </span>
        <h1 className="mt-6 text-3xl font-bold">Prueba final</h1>
        <p className="mt-2 text-tenue">Toda la galaxia en una sola prueba: definiciones, planetas, diferenciales y síndromes.</p>
        <ul className="vidrio mt-6 flex flex-col gap-3 p-5 text-left text-sm">
          <li className="flex gap-3">
            <Icono nombre="objetivo" className="h-5 w-5 shrink-0 text-cian" /> {TOTAL} preguntas
          </li>
          <li className="flex gap-3">
            <Icono nombre="reloj" className="h-5 w-5 shrink-0 text-dorado" /> {MINUTOS} minutos
          </li>
          <li className="flex gap-3">
            <Icono nombre="trofeo" className="h-5 w-5 shrink-0 text-coral" /> 80% o más: +100 XP y el logro «Prueba superada»
          </li>
        </ul>
        {estado.finales.length > 0 && <p className="mt-4 text-sm text-tenue">Tu mejor resultado: {Math.max(...estado.finales)}%</p>}
        <div className="mt-6 flex justify-center gap-3">
          <button className="boton boton-dorado" onClick={() => setRonda(1)}>
            Comenzar
          </button>
          <Link href="/retos" className="boton boton-vidrio">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Partida
      key={ronda}
      preguntas={preguntas}
      titulo="Prueba final"
      salir="/retos"
      limiteSeg={MINUTOS * 60}
      alTerminar={terminar}
      otraVez={() => {
        setPreguntas(pruebaFinal(TOTAL));
        setRonda(ronda + 1);
      }}
    />
  );
}

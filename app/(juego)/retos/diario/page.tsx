"use client";

import { useState } from "react";
import { Partida, type Resultado } from "@/components/partida";
import { useEstado } from "@/components/proveedores";
import { hoy, registrarPartida, registrarRespuestas, XP, yaHizoDiario } from "@/lib/estado";
import { retoDiario } from "@/lib/practica";

export default function Diario() {
  const { estado, actualizar } = useEstado();
  const [preguntas] = useState(() => retoDiario(hoy()));
  // Se calcula al entrar: si ya lo hizo hoy, puede repetirlo sin bono.
  const [conBono] = useState(() => !yaHizoDiario(estado));

  function terminar(rs: Resultado[]) {
    const ok = rs.filter((r) => r.ok).length;
    const xp = ok * XP.acierto + (conBono ? XP.diario : 0);
    actualizar((e) =>
      registrarPartida(
        registrarRespuestas(
          e,
          rs.filter((r) => r.pregunta.signo).map((r) => ({ id: r.pregunta.signo!, ok: r.ok })),
        ),
        { modo: "diario", titulo: "Reto del día", ok, total: preguntas.length, xp },
      ),
    );
    return { xp, mensaje: conBono ? "¡Reto del día completado! ☀️" : "Repetiste el reto de hoy" };
  }

  return <Partida preguntas={preguntas} titulo="Reto del día" salir="/retos" alTerminar={terminar} />;
}

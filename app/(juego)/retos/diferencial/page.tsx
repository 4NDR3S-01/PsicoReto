"use client";

import { useState } from "react";
import { Partida, type Resultado } from "@/components/partida";
import { useEstado } from "@/components/proveedores";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { preguntasDiferenciales } from "@/lib/practica";

export default function Diferencial() {
  const { actualizar } = useEstado();
  const [ronda, setRonda] = useState(0);
  const [preguntas, setPreguntas] = useState(() => preguntasDiferenciales(10));

  function terminar(rs: Resultado[]) {
    const ok = rs.filter((r) => r.ok).length;
    const xp = ok * XP.acierto;
    actualizar((e) =>
      registrarPartida(
        registrarRespuestas(
          e,
          rs.map((r) => ({ id: r.pregunta.signo!, ok: r.ok })),
        ),
        { modo: "diferencial", titulo: "Diferencial", ok, total: preguntas.length, xp },
      ),
    );
    return { xp };
  }

  return (
    <Partida
      key={ronda}
      preguntas={preguntas}
      titulo="Diferencial"
      salir="/retos"
      alTerminar={terminar}
      otraVez={() => {
        setPreguntas(preguntasDiferenciales(10));
        setRonda(ronda + 1);
      }}
    />
  );
}

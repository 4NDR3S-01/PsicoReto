"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Partida, type Resultado } from "@/components/partida";
import { useEstado } from "@/components/proveedores";
import { Vacio } from "@/components/ui";
import { getFuncion } from "@/lib/contenido/funciones";
import { desbloqueado, estrellas, registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { accesorioDe } from "@/lib/mascota";
import { mision } from "@/lib/practica";

export default function Mision() {
  const { slug } = useParams<{ slug: string }>();
  const { estado, actualizar } = useEstado();
  const f = getFuncion(slug);
  const [ronda, setRonda] = useState(0);
  const [preguntas, setPreguntas] = useState(() => (f ? mision(f) : []));

  if (!f || !desbloqueado(estado, f)) {
    return (
      <Vacio
        icono="candado"
        titulo="Misión no disponible"
        texto="Este planeta aún no está desbloqueado."
        accion={
          <Link href="/mapa" className="boton boton-cian">
            Volver al mapa
          </Link>
        }
      />
    );
  }

  function terminar(rs: Resultado[], completa: boolean) {
    const ok = rs.filter((r) => r.ok).length;
    const pct = completa ? Math.round((ok / preguntas.length) * 100) : 0;
    const anterior = estado.misiones[f!.slug] ?? 0;
    const xp = ok * XP.acierto + (completa ? XP.mision : 0) + (pct === 100 ? XP.perfecta : 0);
    actualizar((e) => {
      const x = registrarRespuestas(
        e,
        rs.filter((r) => r.pregunta.signo).map((r) => ({ id: r.pregunta.signo!, ok: r.ok })),
      );
      return registrarPartida(
        { ...x, misiones: { ...x.misiones, [f!.slug]: Math.max(anterior, pct) } },
        { modo: "mision", titulo: `Misión ${f!.nombre}`, ok, total: preguntas.length, xp },
      );
    });
    const desbloquea = estrellas(pct) >= 1 && estrellas(anterior) === 0;
    const premio = accesorioDe(f!.slug);
    return {
      xp,
      estrellas: estrellas(pct),
      mensaje: !completa
        ? "Te quedaste sin escudos"
        : desbloquea
          ? `¡Planeta conquistado! ${estado.pato.nombre} ganó ${premio.icono} ${premio.nombre}`
          : undefined,
    };
  }

  return (
    <Partida
      key={ronda}
      preguntas={preguntas}
      titulo={`Misión ${f.nombre}`}
      escudos={3}
      salir={`/planeta/${f.slug}`}
      alTerminar={terminar}
      otraVez={() => {
        setPreguntas(mision(f));
        setRonda(ronda + 1);
      }}
    />
  );
}

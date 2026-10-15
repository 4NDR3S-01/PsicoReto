"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icono } from "./iconos";
import { Barra, FinPartida, formatoTiempo, useTeclas } from "./ui";
import type { PreguntaJuego } from "@/lib/practica";

export type Resultado = { pregunta: PreguntaJuego; ok: boolean; elegida: string };

export type Cierre = { xp: number; estrellas?: number; mensaje?: string };

/**
 * Motor de partida: muestra preguntas una a una con corrección inmediata.
 * Con `escudos`, cada error resta uno y la partida termina al perderlos todos.
 */
export function Partida({
  preguntas,
  titulo,
  escudos,
  salir,
  limiteSeg,
  alTerminar,
  otraVez,
}: {
  preguntas: PreguntaJuego[];
  titulo: string;
  escudos?: number;
  salir: string;
  limiteSeg?: number;
  alTerminar: (r: Resultado[], completa: boolean) => Cierre;
  otraVez?: () => void;
}) {
  const [i, setI] = useState(0);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [elegida, setElegida] = useState<string | null>(null);
  const [cierre, setCierre] = useState<(Cierre & { completa: boolean }) | null>(null);
  const [sacudir, setSacudir] = useState(0);
  const [restante, setRestante] = useState(limiteSeg ?? 0);
  // Copias en refs para que el temporizador lea siempre lo último.
  const resultadosRef = useRef(resultados);
  const terminarRef = useRef(alTerminar);
  useEffect(() => {
    resultadosRef.current = resultados;
    terminarRef.current = alTerminar;
  });
  const cerrada = cierre !== null;

  useEffect(() => {
    if (!limiteSeg || cerrada) return;
    const fin = Date.now() + limiteSeg * 1000;
    const t = setInterval(() => {
      const r = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
      setRestante(r);
      if (r === 0) {
        clearInterval(t);
        setCierre({ ...terminarRef.current(resultadosRef.current, true), mensaje: "¡Se acabó el tiempo!", completa: true });
      }
    }, 500);
    return () => clearInterval(t);
  }, [limiteSeg, cerrada]);

  const q = preguntas[i];
  const fallos = resultados.filter((r) => !r.ok).length;
  const escudosRestantes = escudos !== undefined ? escudos - fallos : undefined;

  function elegir(clave: string) {
    if (elegida || cierre) return;
    const ok = clave === q.correcta;
    setElegida(clave);
    setResultados((r) => [...r, { pregunta: q, ok, elegida: clave }]);
    if (!ok) setSacudir((s) => s + 1);
  }

  function continuar() {
    if (!elegida || cierre) return;
    const sinEscudos = escudosRestantes !== undefined && escudosRestantes <= 0;
    if (i + 1 >= preguntas.length || sinEscudos) {
      setCierre({ ...alTerminar(resultados, !sinEscudos), completa: !sinEscudos });
      return;
    }
    setI(i + 1);
    setElegida(null);
  }

  useTeclas({
    "1": () => q?.opciones[0] && elegir(q.opciones[0].clave),
    "2": () => q?.opciones[1] && elegir(q.opciones[1].clave),
    "3": () => q?.opciones[2] && elegir(q.opciones[2].clave),
    "4": () => q?.opciones[3] && elegir(q.opciones[3].clave),
    Enter: continuar,
  });

  if (cierre) {
    const ok = resultados.filter((r) => r.ok).length;
    const errores = resultados.filter((r) => !r.ok);
    return (
      <FinPartida
        titulo={titulo}
        ok={ok}
        total={cierre.completa ? preguntas.length : resultados.length}
        xp={cierre.xp}
        estrellas={cierre.estrellas}
        mensaje={cierre.mensaje ?? (cierre.completa ? undefined : "Te quedaste sin escudos")}
        otraVez={otraVez}
        salir={salir}
      >
        {errores.length > 0 && (
          <div className="vidrio p-5">
            <p className="etiqueta mb-3">Para repasar</p>
            <ul className="flex flex-col gap-3">
              {errores.map((r, k) => {
                const correcta = r.pregunta.opciones.find((o) => o.clave === r.pregunta.correcta)!;
                return (
                  <li key={k} className="border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0">
                    <p className="text-tenue">{r.pregunta.contexto ?? r.pregunta.enunciado}</p>
                    <p className="mt-1 font-semibold text-menta">→ {correcta.texto}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </FinPartida>
    );
  }

  const correctaTexto = q.opciones.find((o) => o.clave === q.correcta)!.texto;
  const acerto = elegida === q.correcta;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl flex-col">
      <div className="flex items-center gap-4">
        <Link href={salir} aria-label="Salir de la partida" className="text-tenue hover:text-tinta">
          <Icono nombre="cerrar" className="h-6 w-6" />
        </Link>
        <Barra valor={(i / preguntas.length) * 100} color="linear-gradient(90deg,#4fd1ff,#8b7bff)" className="flex-1" />
        {escudosRestantes !== undefined && (
          <span className={`flex items-center gap-0.5 ${sacudir ? "sacudir" : ""}`} key={sacudir} aria-label={`${escudosRestantes} escudos`}>
            {Array.from({ length: escudos! }, (_, k) => (
              <Icono key={k} nombre="escudo" className={`h-5 w-5 ${k < escudosRestantes ? "text-cian drop-shadow-[0_0_6px_#4fd1ff]" : "text-white/15"}`} />
            ))}
          </span>
        )}
        {limiteSeg !== undefined && (
          <span className={`font-display text-sm font-bold ${restante < 60 ? "text-coral" : "text-tenue"}`}>{formatoTiempo(restante)}</span>
        )}
      </div>

      <div key={q.id} className="aparecer mt-8 flex-1">
        <p className="etiqueta">
          {titulo} · {q.tipo} · {i + 1}/{preguntas.length}
        </p>
        <h2 className="mt-2 text-xl font-bold sm:text-2xl">{q.enunciado}</h2>
        {q.contexto && (
          <div className="vidrio mt-5 border-l-4 !border-l-cian p-5 text-lg leading-relaxed">{q.contexto}</div>
        )}
        {q.pistas && (
          <dl className="vidrio mt-5 divide-y divide-white/10 px-5 text-sm">
            {q.pistas.map((p) => (
              <div key={p.dim} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="etiqueta pt-0.5">{p.dim}</dt>
                <dd>{p.texto}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 flex flex-col gap-2.5">
          {q.opciones.map((o, k) => {
            const est = !elegida ? undefined : o.clave === q.correcta ? "correcta" : o.clave === elegida ? "incorrecta" : "atenuada";
            return (
              <li key={o.clave}>
                <button className="opcion" data-estado={est} disabled={!!elegida} onClick={() => elegir(o.clave)}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 font-display text-sm">
                    {String.fromCharCode(65 + k)}
                  </span>
                  <span className={q.tipo === "Significado" ? "text-[0.95rem] font-medium" : ""}>{o.texto}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {elegida && (
        <div
          className={`subir sticky bottom-20 mt-6 rounded-2xl border p-5 backdrop-blur-xl lg:bottom-4 ${
            acerto ? "border-menta/60 bg-[#0d2a2a]/90" : "border-coral/60 bg-[#2a0f1f]/90"
          }`}
          role="status"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className={`flex items-center gap-2 text-lg font-bold ${acerto ? "text-menta" : "text-coral"}`}>
                <Icono nombre={acerto ? "check" : "equis"} className="h-5 w-5" />
                {acerto ? "¡Correcto!" : "No era esa"}
              </p>
              {!acerto && <p className="mt-1 text-sm">Respuesta: <b>{correctaTexto}</b></p>}
              {q.explicacion && <p className="mt-1 text-sm text-tenue">{q.explicacion}</p>}
            </div>
            <button onClick={continuar} className={`boton ${acerto ? "boton-cian" : "boton-dorado"}`}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

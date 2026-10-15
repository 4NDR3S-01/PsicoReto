"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CORTO, Planeta } from "@/components/planeta";
import { useEstado } from "@/components/proveedores";
import { Barra, FinPartida, useTeclas } from "@/components/ui";
import { SIGNOS, type Funcion, type Signo } from "@/lib/contenido/funciones";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { barajar, opcionesPlaneta } from "@/lib/practica";

const DURACION = 60;
type Item = { signo: Signo; opciones: Funcion[] };

export default function Contrarreloj() {
  const { actualizar } = useEstado();
  const [fase, setFase] = useState<"inicio" | "juego" | "fin">("inicio");
  const [restante, setRestante] = useState(DURACION);
  const [item, setItem] = useState<Item | null>(null);
  const [destello, setDestello] = useState<string | null>(null);
  const [log, setLog] = useState<{ signo: Signo; ok: boolean }[]>([]);
  const [xpFinal, setXpFinal] = useState(0);
  const mazo = useRef<Signo[]>([]);
  const registro = useRef<{ signo: Signo; ok: boolean }[]>([]);

  const siguiente = () => {
    if (!mazo.current.length) mazo.current = barajar(SIGNOS);
    const s = mazo.current.pop()!;
    setItem({ signo: s, opciones: opcionesPlaneta(s) });
    setDestello(null);
  };

  function empezar() {
    mazo.current = barajar(SIGNOS);
    registro.current = [];
    setLog([]);
    setRestante(DURACION);
    siguiente();
    setFase("juego");
  }

  useEffect(() => {
    if (fase !== "juego") return;
    const fin = Date.now() + DURACION * 1000;
    const t = setInterval(() => {
      const r = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
      setRestante(r);
      if (r > 0) return;
      clearInterval(t);
      const l = registro.current;
      const ok = l.filter((x) => x.ok).length;
      const xp = ok * XP.ficha;
      setXpFinal(xp);
      setFase("fin");
      actualizar((e) =>
        registrarPartida(
          registrarRespuestas(
            e,
            l.map((x) => ({ id: x.signo.id, ok: x.ok })),
          ),
          { modo: "contrarreloj", titulo: "Contrarreloj", ok, total: l.length, xp },
        ),
      );
    }, 250);
    return () => clearInterval(t);
  }, [fase, actualizar]);

  function responder(f: Funcion) {
    if (!item || destello || fase !== "juego") return;
    const ok = f.slug === item.signo.funcion;
    registro.current = [...registro.current, { signo: item.signo, ok }];
    setLog(registro.current);
    setDestello(f.slug);
    setTimeout(siguiente, ok ? 220 : 650);
  }

  useTeclas({
    "1": () => item && responder(item.opciones[0]),
    "2": () => item && responder(item.opciones[1]),
    "3": () => item && responder(item.opciones[2]),
    "4": () => item && responder(item.opciones[3]),
  });

  if (fase === "inicio") {
    return (
      <div className="aparecer mx-auto max-w-md text-center">
        <span className="flotar text-7xl">⏱️</span>
        <h1 className="mt-4 text-3xl font-bold">Contrarreloj</h1>
        <p className="mt-2 text-tenue">Aparece un signo y eliges su planeta. ¿Cuántos ubicas en 60 segundos? Usa las teclas 1-4 para ir más rápido.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="boton boton-dorado" onClick={empezar}>
            ¡Empezar!
          </button>
          <Link href="/retos" className="boton boton-vidrio">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  if (fase === "fin") {
    const ok = log.filter((x) => x.ok).length;
    return <FinPartida titulo="Contrarreloj" ok={ok} total={log.length} xp={xpFinal} mensaje={`¡${ok} signos ubicados!`} otraVez={empezar} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-4">
        <span className={`font-display text-2xl font-bold ${restante <= 10 ? "text-coral" : "text-dorado"}`}>{restante}s</span>
        <Barra valor={(restante / DURACION) * 100} color={restante <= 10 ? "#ff6b8b" : "#ffc857"} className="flex-1" />
        <span className="text-sm font-bold text-menta">{log.filter((x) => x.ok).length} ✓</span>
      </div>

      {item && (
        <div key={item.signo.id} className="aparecer">
          <p className="mt-12 text-center text-4xl font-bold sm:text-5xl">{item.signo.nombre}</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {item.opciones.map((f, k) => {
              const est = !destello ? undefined : f.slug === item.signo.funcion ? "correcta" : f.slug === destello ? "incorrecta" : "atenuada";
              return (
                <button key={f.slug} className="opcion flex-col !gap-2 py-5 text-center" data-estado={est} onClick={() => responder(f)}>
                  <Planeta slug={f.slug} tam={40} />
                  <span>
                    <span className="mr-1 text-xs text-tenue">{k + 1}</span>
                    {CORTO[f.slug]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

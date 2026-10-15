"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Icono } from "@/components/iconos";
import { CORTO } from "@/components/planeta";
import { useEstado } from "@/components/proveedores";
import { Barra, FinPartida, useTeclas, Vacio } from "@/components/ui";
import { getFuncion, type Signo } from "@/lib/contenido/funciones";
import {
  CALIFICACIONES,
  calificarFicha,
  colaFichas,
  describirIntervalo,
  fragiles,
  proyectar,
  registrarPartida,
  XP,
  type Calificacion,
} from "@/lib/estado";
import { signosDe } from "@/lib/practica";

export default function Fichas() {
  return (
    <Suspense>
      <Sesion />
    </Suspense>
  );
}

const COLORES: Record<Calificacion, string> = { 0: "#ff6b8b", 1: "#ffc857", 2: "#4fd1ff", 3: "#5ef2b0" };

function Sesion() {
  const params = useSearchParams();
  const slug = params.get("f");
  const soloFragiles = params.get("fragiles") === "1";
  const { estado, actualizar } = useEstado();
  const armar = (extra = 0): Signo[] => (soloFragiles ? fragiles(estado, 15) : colaFichas(estado, signosDe(slug), extra));
  const [cola, setCola] = useState<Signo[]>(() => armar());
  const [i, setI] = useState(0);
  const [girada, setGirada] = useState(false);
  const [primeras, setPrimeras] = useState<Record<string, boolean>>({});
  const [fin, setFin] = useState<{ ok: number; total: number; xp: number } | null>(null);

  const actual = cola[i];
  const ficha = actual ? estado.fichas[actual.id] : undefined;
  const titulo = soloFragiles ? "Agujero negro" : slug ? `Fichas · ${getFuncion(slug)?.nombre ?? ""}` : "Fichas";

  function calificar(c: Calificacion) {
    if (!actual || !girada) return;
    actualizar((e) => calificarFicha(e, actual.id, c));
    const p = actual.id in primeras ? primeras : { ...primeras, [actual.id]: c >= 2 };
    setPrimeras(p);
    const nuevaCola = c === 0 ? [...cola, actual] : cola;
    setCola(nuevaCola);
    setGirada(false);
    if (i + 1 >= nuevaCola.length) {
      const ok = Object.values(p).filter(Boolean).length;
      const total = Object.keys(p).length;
      const xp = ok * XP.ficha;
      actualizar((e) => registrarPartida(e, { modo: "fichas", titulo, ok, total, xp }));
      setFin({ ok, total, xp });
    } else {
      setI(i + 1);
    }
  }

  function reiniciar(extra = 0) {
    setCola(armar(extra));
    setI(0);
    setGirada(false);
    setPrimeras({});
    setFin(null);
  }

  useTeclas({
    " ": () => setGirada(true),
    Enter: () => setGirada(true),
    "1": () => calificar(0),
    "2": () => calificar(1),
    "3": () => calificar(2),
    "4": () => calificar(3),
  });

  if (fin) return <FinPartida titulo={titulo} ok={fin.ok} total={fin.total} xp={fin.xp} otraVez={() => reiniciar()} />;

  if (!actual) {
    return (
      <Vacio
        icono="fichas"
        titulo="¡Sin fichas pendientes!"
        texto={soloFragiles ? "No tienes signos frágiles. ¡Bien hecho!" : "Ya repasaste todo lo de hoy y llegaste al cupo de fichas nuevas."}
        accion={
          <div className="flex flex-wrap justify-center gap-3">
            {!soloFragiles && (
              <button className="boton boton-cian" onClick={() => reiniciar(10)}>
                Estudiar 10 fichas más
              </button>
            )}
            <Link href="/retos" className="boton boton-vidrio">
              Otros retos
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-4">
        <Link href="/retos" aria-label="Salir" className="text-tenue hover:text-tinta">
          <Icono nombre="cerrar" className="h-6 w-6" />
        </Link>
        <Barra valor={(i / cola.length) * 100} className="flex-1" />
        <span className="text-sm font-bold text-tenue">
          {i + 1}/{cola.length}
        </span>
      </div>

      <p className="etiqueta mt-6 text-center">
        {ficha ? "☄️ Cometa de repaso" : "✨ Ficha nueva"} · {CORTO[actual.funcion]}
      </p>

      <button
        className="carta mt-4 block h-80 w-full text-left"
        onClick={() => setGirada((g) => !g)}
        aria-label={girada ? "Ocultar respuesta" : "Mostrar respuesta"}
      >
        <div className={`carta-interior h-full ${girada ? "girada" : ""}`}>
          <div className="carta-cara vidrio flex flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-3xl font-bold sm:text-4xl">{actual.nombre}</p>
            <p className="text-sm text-tenue">Toca para girar · Espacio</p>
          </div>
          <div className="carta-cara carta-dorso flex flex-col justify-center gap-3 overflow-y-auto rounded-[1.25rem] border border-cian/40 bg-[#0e1a3d] p-7">
            <p className="font-bold text-cian">{actual.nombre}</p>
            <p className="text-lg leading-relaxed">{actual.def}</p>
            {actual.clave && <p className="text-sm italic text-tenue">💡 {actual.clave}</p>}
          </div>
        </div>
      </button>

      <div className="mt-6">
        {girada ? (
          <>
            <p className="mb-3 text-center text-sm text-tenue">¿Qué tan bien lo sabías?</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CALIFICACIONES.map((c) => (
                <button
                  key={c.valor}
                  onClick={() => calificar(c.valor)}
                  className="flex flex-col items-center rounded-2xl border bg-white/5 px-2 py-3 font-bold transition-colors hover:bg-white/10"
                  style={{ borderColor: `${COLORES[c.valor]}66`, color: COLORES[c.valor] }}
                >
                  {c.nombre}
                  <span className="text-xs font-medium text-tenue">
                    {describirIntervalo(proyectar(ficha, c.valor).intervalo)}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <button className="boton boton-cian w-full" onClick={() => setGirada(true)}>
            Girar tarjeta
          </button>
        )}
      </div>
    </div>
  );
}

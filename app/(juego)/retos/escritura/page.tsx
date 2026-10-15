"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { Icono } from "@/components/iconos";
import { CORTO } from "@/components/planeta";
import { useEstado } from "@/components/proveedores";
import { Barra, FinPartida } from "@/components/ui";
import { getFuncion, type Signo } from "@/lib/contenido/funciones";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { evaluarEscritura, signosDe, tomar, type Veredicto } from "@/lib/practica";

const TOTAL = 10;

export default function Escritura() {
  return (
    <Suspense>
      <Juego />
    </Suspense>
  );
}

type Respuesta = { signo: Signo; texto: string; v: Veredicto | "pase" };

function Juego() {
  const slug = useSearchParams().get("f");
  const { actualizar } = useEstado();
  const [items, setItems] = useState(() => tomar(signosDe(slug), TOTAL));
  const [i, setI] = useState(0);
  const [texto, setTexto] = useState("");
  const [rs, setRs] = useState<Respuesta[]>([]);
  const [fin, setFin] = useState<{ ok: number; xp: number } | null>(null);
  const entrada = useRef<HTMLInputElement>(null);

  const actual = items[i];
  const revisada = rs[i];
  const bien = (r?: Respuesta) => r?.v === "exacta" || r?.v === "casi";

  function comprobar(pase = false) {
    if (revisada || !actual) return;
    setRs([...rs, { signo: actual, texto, v: pase ? "pase" : evaluarEscritura(texto, actual) }]);
  }

  function avanzar() {
    if (i + 1 >= items.length) {
      const ok = rs.filter((r) => bien(r)).length;
      const xp = ok * XP.acierto;
      actualizar((e) =>
        registrarPartida(
          registrarRespuestas(
            e,
            rs.map((r) => ({ id: r.signo.id, ok: bien(r) })),
          ),
          { modo: "escritura", titulo: "Escritura", ok, total: items.length, xp },
        ),
      );
      setFin({ ok, xp });
      return;
    }
    setI(i + 1);
    setTexto("");
    setTimeout(() => entrada.current?.focus(), 0);
  }

  if (fin) {
    return (
      <FinPartida
        titulo="Escritura"
        ok={fin.ok}
        total={items.length}
        xp={fin.xp}
        otraVez={() => {
          setItems(tomar(signosDe(slug), TOTAL));
          setI(0);
          setRs([]);
          setTexto("");
          setFin(null);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-4">
        <Link href="/retos" aria-label="Salir" className="text-tenue hover:text-tinta">
          <Icono nombre="cerrar" className="h-6 w-6" />
        </Link>
        <Barra valor={(i / items.length) * 100} color="#5ef2b0" className="flex-1" />
        <span className="text-sm font-bold text-tenue">
          {i + 1}/{items.length}
        </span>
      </div>

      <p className="etiqueta mt-8">
        Escritura{slug ? ` · ${getFuncion(slug)?.nombre}` : ""} · Planeta {CORTO[actual.funcion]}
      </p>
      <h1 className="mt-2 text-xl font-bold">¿Qué signo es?</h1>
      <div className="vidrio mt-4 border-l-4 !border-l-menta p-5 text-lg leading-relaxed">{actual.def}</div>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (revisada) avanzar();
          else comprobar();
        }}
      >
        <input
          ref={entrada}
          className="campo text-lg"
          placeholder="Escribe el nombre del signo…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          readOnly={!!revisada}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          aria-label="Nombre del signo"
        />

        {revisada && (
          <div
            className={`aparecer mt-4 rounded-2xl border p-4 ${bien(revisada) ? "border-menta/50 bg-menta/10" : "border-coral/50 bg-coral/10"}`}
            role="status"
          >
            <p className={`font-bold ${bien(revisada) ? "text-menta" : "text-coral"}`}>
              {revisada.v === "exacta" ? "¡Exacto!" : revisada.v === "casi" ? "¡Correcto! Revisa la escritura:" : "La respuesta era:"}{" "}
              {revisada.v !== "exacta" && <span className="text-tinta">{actual.nombre}</span>}
            </p>
            {actual.alias.length > 0 && <p className="mt-1 text-sm text-tenue">También vale: {actual.alias.join(", ")}</p>}
          </div>
        )}

        <div className="mt-4 flex gap-3">
          {revisada ? (
            <button className="boton boton-cian" type="submit">
              Continuar
            </button>
          ) : (
            <>
              <button className="boton boton-cian" type="submit" disabled={!texto.trim()}>
                Comprobar
              </button>
              <button className="boton boton-vidrio" type="button" onClick={() => comprobar(true)}>
                No lo sé
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

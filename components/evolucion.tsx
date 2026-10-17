"use client";

import { useState } from "react";
import { MiPato, Pato } from "./pato";
import { useEstado } from "./proveedores";
import { nivel } from "@/lib/estado";
import { etapa } from "@/lib/mascota";

/**
 * Aparece sobre cualquier pantalla cuando el nivel supera al último que el pato celebró.
 * La primera vez (visto = 0) presenta a la mascota y deja ponerle nombre.
 */
export function Evolucion() {
  const { estado, actualizar } = useEstado();
  const n = nivel(estado.xp).n;
  const { visto, nombre } = estado.pato;
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  if (visto !== 0 && n <= visto) return null;
  const presentar = visto === 0;
  const forma = etapa(n);
  const cerrar = () =>
    actualizar((e) => ({ ...e, pato: { ...e.pato, visto: n, nombre: presentar ? nuevoNombre.trim() || "Cuac" : e.pato.nombre } }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-noche/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evolucion-titulo"
      onKeyDown={(e) => e.key === "Escape" && cerrar()}
    >
      <form
        className="aparecer vidrio relative flex w-full max-w-md flex-col items-center overflow-hidden p-6 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          cerrar();
        }}
      >
        <div className="absolute -top-24 h-64 w-64 rounded-full bg-nebulosa/40 blur-3xl" />
        <p className="etiqueta relative">{presentar ? "Tu compañero de viaje" : `¡Nivel ${n}!`}</p>
        <h2 id="evolucion-titulo" className="relative mt-1 text-2xl font-bold">
          {presentar ? "¡Conoce a tu pato!" : `¡${nombre} evolucionó!`}
        </h2>

        <div className="relative mt-4 flex items-center justify-center gap-3">
          {!presentar && (
            <>
              <Pato nivel={visto} className="h-20 w-20 opacity-50 grayscale" />
              <span className="text-2xl text-tenue" aria-hidden>
                →
              </span>
            </>
          )}
          <MiPato humor="festejo" className={`h-36 w-36 ${presentar ? "" : "evolucionar"}`} />
        </div>

        <p className="relative mt-3 text-lg font-bold text-cian">{forma.nombre}</p>
        <p className="relative mt-1 text-sm text-tenue">
          {presentar
            ? "Te acompañará en cada planeta: reacciona a tus respuestas, gana un accesorio por cada planeta conquistado y cambia de forma cada vez que subes de nivel."
            : forma.texto}
        </p>
        {!presentar && n - visto > 1 && <p className="relative mt-2 text-xs font-bold text-dorado">Subiste {n - visto} niveles de golpe</p>}

        {presentar && (
          <label className="relative mt-5 w-full text-left">
            <span className="etiqueta">Ponle nombre</span>
            <input
              className="campo mt-1"
              maxLength={20}
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              autoFocus
            />
          </label>
        )}

        <button className="boton boton-cian relative mt-6" autoFocus={!presentar}>
          {presentar ? "¡A explorar!" : "¡Genial!"}
        </button>
      </form>
    </div>
  );
}

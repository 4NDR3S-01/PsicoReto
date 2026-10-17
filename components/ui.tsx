"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icono, type NombreIcono } from "./iconos";
import { Simbolo } from "./marca";
import { MiPato } from "./pato";

export function Splash() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <Simbolo className="flotar h-16 w-16" />
      <p className="etiqueta">Preparando el despegue…</p>
    </div>
  );
}

/** Barra de progreso con brillo. */
export function Barra({ valor, color = "#4fd1ff", className = "" }: { valor: number; color?: string; className?: string }) {
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.max(0, Math.min(100, valor))}%`, background: color, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

export function Titulo({
  titulo,
  sub,
  volver,
  derecha,
}: {
  titulo: React.ReactNode;
  sub?: React.ReactNode;
  volver?: string;
  derecha?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex items-start gap-3">
      {volver && (
        <Link href={volver} aria-label="Volver" className="boton boton-vidrio !min-h-10 !px-3">
          <Icono nombre="izquierda" className="h-5 w-5" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{titulo}</h1>
        {sub && <p className="mt-1 text-tenue">{sub}</p>}
      </div>
      {derecha}
    </header>
  );
}

export function Estrellas({ n, tam = "h-4 w-4" }: { n: number; tam?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} de 3 estrellas`}>
      {[0, 1, 2].map((i) => (
        <Icono key={i} nombre="estrella" className={`${tam} ${i < n ? "text-dorado drop-shadow-[0_0_6px_#ffc857]" : "text-white/15"}`} />
      ))}
    </span>
  );
}

export function Vacio({ icono, titulo, texto, accion }: { icono: NombreIcono; titulo: string; texto: string; accion?: React.ReactNode }) {
  return (
    <div className="vidrio flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-cian">
        <Icono nombre={icono} className="h-7 w-7" />
      </span>
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="max-w-sm text-tenue">{texto}</p>
      {accion && <div className="mt-2">{accion}</div>}
    </div>
  );
}

export const formatoTiempo = (seg: number) => `${Math.floor(seg / 60)}:${String(Math.max(0, seg) % 60).padStart(2, "0")}`;

export function useCronometro(activo = true) {
  const [seg, setSeg] = useState(0);
  useEffect(() => {
    if (!activo) return;
    const t = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [activo]);
  return seg;
}

/** Atajos de teclado (se ignoran mientras se escribe en un campo). */
export function useTeclas(mapa: Record<string, () => void>) {
  const ref = useRef(mapa);
  useEffect(() => {
    ref.current = mapa;
  });
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const fn = ref.current[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
}

/** Pantalla de fin de partida. */
export function FinPartida({
  titulo,
  ok,
  total,
  xp,
  mensaje,
  estrellas,
  otraVez,
  salir = "/retos",
  children,
}: {
  titulo: string;
  ok: number;
  total: number;
  xp: number;
  mensaje?: string;
  estrellas?: number;
  otraVez?: () => void;
  salir?: string;
  children?: React.ReactNode;
}) {
  const pct = total ? Math.round((ok / total) * 100) : 0;
  const frase = mensaje ?? (pct === 100 ? "¡Misión perfecta!" : pct >= 80 ? "¡Gran viaje!" : pct >= 60 ? "Buen rumbo, sigue así." : "Toca repasar antes del próximo despegue.");
  return (
    <div className="aparecer mx-auto flex max-w-xl flex-col items-center text-center">
      <MiPato humor={pct >= 80 ? "festejo" : pct >= 60 ? "feliz" : "triste"} className="mt-2 h-32 w-32" />
      <p className="etiqueta mt-6">{titulo}</p>
      <h1 className="mt-2 text-3xl font-bold">{frase}</h1>
      {estrellas !== undefined && (
        <div className="mt-4">
          <Estrellas n={estrellas} tam="h-10 w-10" />
        </div>
      )}
      <div className="mt-8 grid w-full grid-cols-3 gap-3">
        <div className="vidrio p-4">
          <p className="text-2xl font-bold text-menta">{pct}%</p>
          <p className="text-xs text-tenue">precisión</p>
        </div>
        <div className="vidrio p-4">
          <p className="text-2xl font-bold">
            {ok}/{total}
          </p>
          <p className="text-xs text-tenue">aciertos</p>
        </div>
        <div className="vidrio p-4">
          <p className="flex items-center justify-center gap-1 text-2xl font-bold text-dorado">
            <Icono nombre="rayo" className="h-5 w-5" />+{xp}
          </p>
          <p className="text-xs text-tenue">XP</p>
        </div>
      </div>
      {children && <div className="mt-8 w-full text-left">{children}</div>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {otraVez && (
          <button onClick={otraVez} className="boton boton-cian">
            Jugar otra vez
          </button>
        )}
        <Link href={salir} className="boton boton-vidrio">
          Continuar
        </Link>
      </div>
    </div>
  );
}

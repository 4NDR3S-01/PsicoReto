import { Icono } from "./iconos";

/** Paleta de cada planeta (función psíquica): luz, sombra y si lleva anillo. */
export const ASPECTO: Record<string, { luz: string; sombra: string; anillo?: boolean }> = {
  conciencia: { luz: "#9fe9ff", sombra: "#2a5cff" },
  orientacion: { luz: "#ffe29a", sombra: "#e8662a", anillo: true },
  atencion: { luz: "#a6ffd9", sombra: "#0b8f6a" },
  memoria: { luz: "#d6ccff", sombra: "#5a3ce0", anillo: true },
  percepcion: { luz: "#ffb3c6", sombra: "#b3124e" },
  pensamiento: { luz: "#b9f0ff", sombra: "#2f6fd0", anillo: true },
  lenguaje: { luz: "#ffd9b8", sombra: "#c4512f" },
  afectividad: { luz: "#ffc2ea", sombra: "#a0147f" },
  motricidad: { luz: "#c4f7d6", sombra: "#22704a", anillo: true },
  fisiologicas: { luz: "#fff1a8", sombra: "#d9822b" },
  relacion: { luz: "#dfe6f5", sombra: "#4f5f92", anillo: true },
};

/** Nombre corto para etiquetas del mapa. */
export const CORTO: Record<string, string> = {
  conciencia: "Conciencia",
  orientacion: "Orientación",
  atencion: "Atención",
  memoria: "Memoria",
  percepcion: "Percepción",
  pensamiento: "Pensamiento",
  lenguaje: "Lenguaje",
  afectividad: "Afectividad",
  motricidad: "Conducta motora",
  fisiologicas: "Sueño e ingesta",
  relacion: "Relación",
};

export function Planeta({
  slug,
  tam = 72,
  bloqueado = false,
  className = "",
}: {
  slug: string;
  tam?: number;
  bloqueado?: boolean;
  className?: string;
}) {
  const a = ASPECTO[slug] ?? ASPECTO.relacion;
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`} style={{ width: tam, height: tam }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: bloqueado
            ? "radial-gradient(circle at 32% 28%, #59607a, #1c2140 75%)"
            : `radial-gradient(circle at 32% 28%, ${a.luz}, ${a.sombra} 72%, #0b0f26 100%)`,
          boxShadow: bloqueado ? "none" : `0 0 ${tam / 2.5}px -${tam / 10}px ${a.luz}`,
        }}
      />
      {/* Bandas de superficie */}
      {!bloqueado && (
        <span
          className="absolute inset-0 overflow-hidden rounded-full opacity-25"
          style={{ background: "repeating-linear-gradient(-20deg, transparent 0 18%, rgba(255,255,255,.5) 18% 21%)" }}
        />
      )}
      {a.anillo && (
        <span
          className="pointer-events-none absolute rounded-[50%] border-2"
          style={{
            width: tam * 1.55,
            height: tam * 0.42,
            borderColor: bloqueado ? "rgba(255,255,255,.15)" : `${a.luz}aa`,
            transform: "rotate(-18deg)",
          }}
        />
      )}
      {bloqueado && <Icono nombre="candado" className="relative h-1/3 w-1/3 text-tenue" />}
    </span>
  );
}

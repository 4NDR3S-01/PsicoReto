import { useId } from "react";

/** Logo de Semiopsique: un planeta con anillo y una ψ en su superficie. */
export function Simbolo({ className = "h-8 w-8" }: { className?: string }) {
  // IDs únicos: si hay dos logos en la página y uno está oculto, sus degradados no deben chocar.
  const id = useId();
  const planeta = `${id}-planeta`;
  const anillo = `${id}-anillo`;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <radialGradient id={planeta} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#9fe9ff" />
          <stop offset="55%" stopColor="#4fa8ff" />
          <stop offset="100%" stopColor="#5b3fd6" />
        </radialGradient>
        <linearGradient id={anillo} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffc857" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffc857" />
          <stop offset="100%" stopColor="#ffc857" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="11.5" fill={`url(#${planeta})`} />
      <path d="M15.6 15.5v3.2a4.4 4.4 0 0 0 8.8 0v-3.2M20 14v13" stroke="#07102b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="20" cy="21" rx="18" ry="5" fill="none" stroke={`url(#${anillo})`} strokeWidth="1.6" transform="rotate(-18 20 21)" />
      <circle cx="33.5" cy="7" r="1.4" fill="#fff" />
    </svg>
  );
}

export function Marca({ grande = false }: { grande?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Simbolo className={grande ? "h-14 w-14" : "h-8 w-8"} />
      <span className={`font-display font-bold tracking-tight ${grande ? "text-4xl" : "text-xl"}`}>
        Semio<span className="texto-brillo">psique</span>
      </span>
    </span>
  );
}

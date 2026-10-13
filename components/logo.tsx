/*
  Identidad visual de PsicoReto.
  Marca: una Ψ (psi), símbolo universal de la psicología, dentro de un
  contenedor "squircle" con degradado propio. Mascota: una neurona amistosa.
  Sin dependencias, SVG puro reutilizable en servidor y cliente.
*/

export function LogoMark({ size = 40, className = "", radius = 0.3 }: { size?: number; className?: string; radius?: number }) {
  const r = Math.round(size * radius);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="PsicoReto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="psicoreto-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8366ff" />
          <stop offset="1" stopColor="#4b2fd6" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="61" height="61" rx={r * (64 / size)} fill="url(#psicoreto-mark)" />
      {/* Ψ */}
      <g fill="none" stroke="#ffffff" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 13v38" />
        <path d="M19.5 15c0 12.5 3.8 19 12.5 19s12.5-6.5 12.5-19" />
        <path d="M20.5 43.5h23" />
      </g>
      {/* chispa de "reto" */}
      <circle cx="49.5" cy="14.5" r="3.4" fill="#ffd45e" />
    </svg>
  );
}

export function Logo({
  size = 30,
  tone = "ink",
  className = "",
  showMark = true,
}: {
  size?: number;
  tone?: "ink" | "light";
  className?: string;
  showMark?: boolean;
}) {
  const base = tone === "light" ? "text-white" : "text-[var(--ink)]";
  const accent = tone === "light" ? "text-white/85" : "text-brand";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showMark && <LogoMark size={size * 1.15} radius={0.32} />}
      <span className={`font-display font-extrabold tracking-tight ${base}`} style={{ fontSize: size, lineHeight: 1 }}>
        Psico
        <span className={accent}>Reto</span>
      </span>
    </span>
  );
}

export function NeuronMascot({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label="Neurona de PsicoReto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="psicoreto-neuron" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8366ff" />
          <stop offset="1" stopColor="#5a37e0" />
        </linearGradient>
      </defs>
      <g stroke="#8366ff" strokeWidth="3.6" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M38 40 22 24" />
        <path d="M48 34V16" />
        <path d="M60 40l16-16" />
        <path d="M66 52h22" />
        <path d="M44 66 30 84" />
      </g>
      <g fill="#8366ff">
        <circle cx="21" cy="23" r="3.6" />
        <circle cx="48" cy="14" r="3.6" />
        <circle cx="77" cy="23" r="3.6" />
        <circle cx="89" cy="52" r="3.6" />
        <circle cx="29" cy="85" r="3.6" />
      </g>
      <circle cx="52" cy="52" r="24" fill="url(#psicoreto-neuron)" />
      <circle cx="43" cy="48" r="3.4" fill="#12101d" />
      <circle cx="61" cy="48" r="3.4" fill="#12101d" />
      <path d="M43 61c3 4 12 4 15 0" stroke="#12101d" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="57" r="3" fill="#ffffff" opacity="0.35" />
      <circle cx="66" cy="57" r="3" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

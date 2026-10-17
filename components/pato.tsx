"use client";

import { useId } from "react";
import { useEstado } from "./proveedores";
import { nivel } from "@/lib/estado";
import { accesorioPuesto, etapa } from "@/lib/mascota";

export type Humor = "normal" | "feliz" | "triste" | "festejo";

const PLUMAS = "#ffd75e";
const PICO = "#ff9a3c";
const TRAJE = "#e9eeff";
const OJO = "#1b1f3a";

/** Estrella de 5 puntas centrada en (x, y). */
function estrella(x: number, y: number, r: number) {
  return (
    Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const d = i % 2 ? r * 0.45 : r;
      return `${i ? "L" : "M"}${(x + d * Math.cos(a)).toFixed(2)} ${(y + d * Math.sin(a)).toFixed(2)}`;
    }).join(" ") + "Z"
  );
}

/** Destello de 4 puntas (festejos). */
const destello = (x: number, y: number, r: number) =>
  `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`;

/**
 * La mascota. Cada nivel le suma una capa: huevo → patito → casco → traje → propulsores →
 * insignia → brillos cósmicos → antenas → rasgos alienígenas → aura de nebulosa → corona de estrellas.
 */
export function Pato({
  nivel: n,
  humor = "normal",
  accesorio = null,
  className = "h-24 w-24",
}: {
  nivel: number;
  humor?: Humor;
  accesorio?: string | null;
  className?: string;
}) {
  const id = useId();
  const g = (s: string) => `${id}-${s}`;
  const alegre = humor === "feliz" || humor === "festejo";
  const alien = n >= 9;
  const plumas = alien ? `url(#${g("alien")})` : PLUMAS;
  const cuerpo = n >= 4 ? TRAJE : plumas;
  const coronas = n >= 11 ? Math.min(5, n - 10) : 0;

  const defs = (
    <defs>
      <radialGradient id={g("huevo")} cx="40%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#fffaf0" />
        <stop offset="100%" stopColor="#cbbdff" />
      </radialGradient>
      <linearGradient id={g("alien")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a6ffd9" />
        <stop offset="100%" stopColor="#b7a8ff" />
      </linearGradient>
      <radialGradient id={g("ojo")} cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#d6fbff" />
        <stop offset="50%" stopColor="#4fd1ff" />
        <stop offset="100%" stopColor="#5b3fd6" />
      </radialGradient>
      <radialGradient id={g("aura")}>
        <stop offset="0%" stopColor="#8b7bff" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#4fd1ff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#4fd1ff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  if (n <= 1) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} ${humor === "festejo" ? "festejar" : ""}`} role="img" aria-label="Huevo estelar">
        {defs}
        <ellipse cx="60" cy="110" rx="22" ry="4" fill="#000" opacity="0.25" />
        <ellipse cx="60" cy="72" rx="27" ry="33" fill={`url(#${g("huevo")})`} stroke="#fff" strokeOpacity="0.5" />
        <path d={estrella(48, 56, 3.5)} fill="#ffc857" />
        <path d={estrella(74, 88, 2.6)} fill="#4fd1ff" />
        <circle cx="72" cy="58" r="1.6" fill="#8b7bff" />
        <circle cx="45" cy="90" r="1.4" fill="#ff6b8b" />
        <path d="M36 70 L44 64 L50 71 L58 63 L65 70 L72 62 L84 68" fill="none" stroke="#5b3fd6" strokeWidth="1.6" strokeLinejoin="round" />
        {alegre ? (
          <path d="M49 80 q3.5 -4 7 0 M64 80 q3.5 -4 7 0" fill="none" stroke={OJO} strokeWidth="2" strokeLinecap="round" />
        ) : (
          <>
            <circle cx="52.5" cy="80" r="2.4" fill={OJO} />
            <circle cx="67.5" cy="80" r="2.4" fill={OJO} />
          </>
        )}
        <circle cx="47" cy="86" r="2.6" fill="#ff6b8b" opacity="0.35" />
        <circle cx="73" cy="86" r="2.6" fill="#ff6b8b" opacity="0.35" />
      </svg>
    );
  }

  const alas =
    humor === "festejo" ? (
      <>
        <ellipse cx="30" cy="66" rx="8" ry="14" transform="rotate(50 30 66)" fill={cuerpo} />
        <ellipse cx="90" cy="66" rx="8" ry="14" transform="rotate(-50 90 66)" fill={cuerpo} />
      </>
    ) : (
      <>
        <ellipse cx="34" cy="84" rx="8" ry="14" transform="rotate(20 34 84)" fill={cuerpo} />
        <ellipse cx="86" cy="84" rx="8" ry="14" transform="rotate(-20 86 84)" fill={cuerpo} />
      </>
    );

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${humor === "festejo" ? "festejar" : ""}`}
      role="img"
      aria-label={etapa(n).nombre}
    >
      {defs}

      {/* Aura y anillo (nebulosa) */}
      {n >= 10 && <circle cx="60" cy="62" r="58" fill={`url(#${g("aura")})`} />}
      {n >= 10 && (
        <path d="M12 84 A48 12 0 0 1 108 84" fill="none" stroke="#ffc857" strokeOpacity="0.55" strokeWidth="2" transform="rotate(-10 60 84)" />
      )}
      {n < 10 && <ellipse cx="60" cy="110" rx="24" ry="4" fill="#000" opacity="0.25" />}

      {/* Mochila propulsora */}
      {n >= 5 && (
        <>
          <rect x="19" y="62" width="12" height="28" rx="5" fill="#8b98c9" />
          <rect x="89" y="62" width="12" height="28" rx="5" fill="#8b98c9" />
          <path className="llama" d="M20 90 Q25 108 30 90Z" fill="#ffc857" />
          <path className="llama" d="M90 90 Q95 108 100 90Z" fill="#ffc857" />
        </>
      )}

      {/* Patas */}
      <ellipse cx="50" cy="105" rx="7" ry="3.5" fill={PICO} />
      <ellipse cx="70" cy="105" rx="7" ry="3.5" fill={PICO} />

      {/* Cuerpo y traje */}
      <ellipse cx="60" cy="82" rx="28" ry="24" fill={cuerpo} />
      {n >= 4 && (
        <>
          <path d="M33 90 Q60 100 87 90" fill="none" stroke="#8b98c9" strokeWidth="2.5" />
          <rect x="52" y="78" width="16" height="9" rx="2.5" fill="#c9d3f0" />
          <circle cx="56" cy="82.5" r="1.6" fill="#5ef2b0" />
          <circle cx="61" cy="82.5" r="1.6" fill="#ff6b8b" />
          <circle cx="65.5" cy="82.5" r="1.3" fill="#4fd1ff" />
        </>
      )}
      {alas}

      {/* Antenas (se ven a través del casco) */}
      {n >= 8 && (
        <g stroke="#94a0cc" strokeWidth="1.8" strokeLinecap="round">
          <path d="M52 30 L44 11" />
          <path d="M68 30 L76 11" />
          <circle cx="44" cy="10" r="3.2" fill="#5ef2b0" stroke="none" />
          <circle cx="76" cy="10" r="3.2" fill="#5ef2b0" stroke="none" />
        </g>
      )}

      {/* Cabeza */}
      <circle cx="60" cy="46" r="19" fill={plumas} />
      <path d="M58 28 q1 -7 7 -5" fill="none" stroke={alien ? "#8b7bff" : "#f0b93a"} strokeWidth="2.2" strokeLinecap="round" />
      {n === 2 && <path d="M41 40 L45 31 L50 36 L55 28 L60 35 L65 28 L70 36 L75 31 L79 40 Q60 30 41 40Z" fill="#fff6dc" stroke="#cbbdff" />}

      {/* Brillos cósmicos */}
      {n >= 7 && (
        <g fill="#4fd1ff">
          <circle cx="47" cy="37" r="1.5" />
          <circle cx="73" cy="40" r="1.1" fill="#8b7bff" />
          <circle cx="44" cy="76" r="1.6" fill="#8b7bff" />
          <circle cx="78" cy="94" r="1.8" />
          <circle cx="50" cy="97" r="1.2" fill="#ffc857" />
        </g>
      )}

      <circle cx="46" cy="52" r="3" fill="#ff6b8b" opacity="0.4" />
      <circle cx="74" cy="52" r="3" fill="#ff6b8b" opacity="0.4" />

      {/* Ojos */}
      {alegre ? (
        <path d="M48.5 44 q3.5 -4.5 7 0 M64.5 44 q3.5 -4.5 7 0" fill="none" stroke={alien ? "#4fd1ff" : OJO} strokeWidth="2.4" strokeLinecap="round" />
      ) : alien ? (
        <>
          <ellipse cx="52" cy="43" rx="4.6" ry="5.6" fill={`url(#${g("ojo")})`} />
          <ellipse cx="68" cy="43" rx="4.6" ry="5.6" fill={`url(#${g("ojo")})`} />
          <circle cx="50.5" cy="41" r="1.3" fill="#fff" />
          <circle cx="66.5" cy="41" r="1.3" fill="#fff" />
        </>
      ) : (
        <>
          <circle cx="52" cy="43" r="3.4" fill={OJO} />
          <circle cx="68" cy="43" r="3.4" fill={OJO} />
          <circle cx="51" cy="42" r="1.1" fill="#fff" />
          <circle cx="67" cy="42" r="1.1" fill="#fff" />
        </>
      )}
      {humor === "triste" && (
        <>
          <path d="M47 37.5 L55 35 M73 37.5 L65 35" stroke={OJO} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M74 48 q-2 4 0 5 q2 -1 0 -5Z" fill="#4fd1ff" />
        </>
      )}

      {/* Pico */}
      {alegre ? (
        <>
          <path d="M50 50 Q60 46 70 50 Q66 53 60 53 Q54 53 50 50Z" fill={PICO} />
          <path d="M52 53 Q60 62 68 53Z" fill="#d9662a" />
        </>
      ) : (
        <path d="M50 51 Q60 47 70 51 Q66 57 60 57 Q54 57 50 51Z" fill={PICO} />
      )}

      {/* Casco */}
      {n >= 3 && (
        <>
          <ellipse cx="60" cy="69" rx="15" ry="3.5" fill="#c9d3f0" />
          <circle cx="60" cy="46" r="26" fill="#9fe9ff" fillOpacity="0.12" stroke="#c8f0ff" strokeOpacity="0.75" strokeWidth="1.8" />
          <path d="M41 36 A21 21 0 0 1 54 25" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {n >= 6 && (
        <>
          <path d="M38.5 31.5 A26 26 0 0 1 81.5 31.5" fill="none" stroke="#ffc857" strokeOpacity="0.85" strokeWidth="3" />
          <path d={estrella(76, 76, 4.5)} fill="#ffc857" />
        </>
      )}

      {/* Anillo por delante y corona de estrellas */}
      {n >= 10 && (
        <path d="M12 84 A48 12 0 0 0 108 84" fill="none" stroke="#ffc857" strokeOpacity="0.85" strokeWidth="2.2" transform="rotate(-10 60 84)" />
      )}
      {Array.from({ length: coronas }, (_, i) => {
        const a = ((-150 + (120 / Math.max(1, coronas - 1)) * i) * Math.PI) / 180;
        const x = coronas === 1 ? 60 : 60 + 50 * Math.cos(a);
        const y = coronas === 1 ? 4 : 50 + 46 * Math.sin(a);
        return <path key={i} d={estrella(x, Math.max(5, y), 4.5)} fill="#ffc857" />;
      })}

      {accesorio && <AccesorioSvg id={accesorio} />}

      {humor === "festejo" && (
        <g fill="#ffc857">
          <path d={destello(14, 30, 5)} />
          <path d={destello(106, 26, 4)} />
          <path d={destello(104, 100, 3.5)} fill="#4fd1ff" />
          <path d={destello(14, 100, 3)} fill="#ff6b8b" />
        </g>
      )}
    </svg>
  );
}

function AccesorioSvg({ id }: { id: string }) {
  switch (id) {
    case "linterna":
      return (
        <g>
          <path d="M98 78 L118 70 L118 94 L98 86Z" fill="#ffc857" opacity="0.3" />
          <rect x="84" y="78" width="13" height="8" rx="2" fill="#8b98c9" />
          <rect x="96" y="77" width="3" height="10" rx="1" fill="#ffc857" />
        </g>
      );
    case "brujula":
      return (
        <g>
          <path d="M48 68 Q60 76 72 68" fill="none" stroke="#ffc857" strokeWidth="1.2" />
          <circle cx="60" cy="80" r="6.5" fill="#ffc857" />
          <circle cx="60" cy="80" r="5" fill="#fff6dc" />
          <path d="M60 75.5 L61.6 80 L58.4 80Z" fill="#ff6b8b" />
          <path d="M60 84.5 L61.6 80 L58.4 80Z" fill="#94a0cc" />
        </g>
      );
    case "lupa":
      return (
        <g>
          <path d="M29 87 L36 96" stroke="#b07a45" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="23" cy="80" r="8.5" fill="#9fe9ff" fillOpacity="0.25" stroke="#c9d3f0" strokeWidth="2.5" />
        </g>
      );
    case "bufanda":
      return (
        <g fill="#8b7bff">
          <path d="M41 63 Q60 72 79 63 L79 69 Q60 78 41 69Z" />
          <path d="M70 70 L77 86 L71 87 L65 72Z" fill="#b7a8ff" />
        </g>
      );
    case "gafas":
      return (
        <g strokeWidth="1.5" stroke="#e8ecff">
          <circle cx="52" cy="43" r="6" fill="#ff6b8b" fillOpacity="0.45" />
          <circle cx="68" cy="43" r="6" fill="#4fd1ff" fillOpacity="0.45" />
          <path d="M58 43 L62 43" />
        </g>
      );
    case "bombilla":
      return (
        <g className="flotar">
          <circle cx="98" cy="18" r="10" fill="#ffc857" opacity="0.25" />
          <circle cx="98" cy="17" r="6.5" fill="#ffe29a" />
          <rect x="95" y="23" width="6" height="4" rx="1" fill="#94a0cc" />
        </g>
      );
    case "megafono":
      return (
        <g>
          <path d="M86 77 L104 68 L104 94 L86 85Z" fill="#ff6b8b" />
          <ellipse cx="104" cy="81" rx="3" ry="13" fill="#ffb3c6" />
        </g>
      );
    case "corazon":
      return (
        <path
          d="M60 90 C49 82 51 74 56 74.5 C58.3 74.7 60 76.6 60 77.8 C60 76.6 61.7 74.7 64 74.5 C69 74 71 82 60 90Z"
          fill="#ff6b8b"
          stroke="#ffc2ea"
        />
      );
    case "patines":
      return (
        <g>
          <rect x="41" y="103" width="18" height="5" rx="2.5" fill="#4fd1ff" />
          <rect x="61" y="103" width="18" height="5" rx="2.5" fill="#4fd1ff" />
          <g fill="#1b1f3a">
            <circle cx="45" cy="110" r="2" />
            <circle cx="55" cy="110" r="2" />
            <circle cx="65" cy="110" r="2" />
            <circle cx="75" cy="110" r="2" />
          </g>
          <path className="llama" d="M41 104 L33 106 L41 108Z" fill="#ffc857" />
        </g>
      );
    case "gorro":
      return (
        <g>
          <path d="M39 26 Q50 2 90 8 Q74 14 81 26Z" fill="#8b7bff" />
          <ellipse cx="60" cy="26" rx="22" ry="5" fill="#e8ecff" />
          <circle cx="90" cy="8" r="4.5" fill="#e8ecff" />
          <path d={estrella(60, 15, 3)} fill="#ffc857" />
        </g>
      );
    case "mono":
      return (
        <g fill="#ff6b8b">
          <path d="M60 68 L49 62 L49 74Z" />
          <path d="M60 68 L71 62 L71 74Z" />
          <circle cx="60" cy="68" r="2.6" fill="#ffb3c6" />
        </g>
      );
    default:
      return null;
  }
}

/** El pato del jugador, con su forma según el nivel y el accesorio que tenga puesto. */
export function MiPato({ humor, className }: { humor?: Humor; className?: string }) {
  const { estado } = useEstado();
  return <Pato nivel={nivel(estado.xp).n} humor={humor} accesorio={accesorioPuesto(estado)} className={className} />;
}

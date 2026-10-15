"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Titulo } from "@/components/ui";
import { DIMENSIONES, getGrupo, getSindrome, SINDROMES } from "@/lib/contenido/sindromes";

export default function Comparar() {
  return (
    <Suspense>
      <Comparador />
    </Suspense>
  );
}

function Comparador() {
  const params = useSearchParams();
  const router = useRouter();
  const a = getSindrome(params.get("a") ?? "") ?? getSindrome("delirium")!;
  const b = getSindrome(params.get("b") ?? "") ?? getSindrome("oniroide")!;

  const elegir = (lado: "a" | "b", slug: string) => {
    const p = new URLSearchParams({ a: a.slug, b: b.slug });
    p.set(lado, slug);
    router.replace(`/sindromes/comparar?${p}`);
  };

  return (
    <div className="aparecer">
      <Titulo volver="/sindromes" titulo="Comparar síndromes" sub="Elige dos y mira dimensión por dimensión en qué se diferencian." />

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {([
          ["a", a, "#4fd1ff"],
          ["b", b, "#ffc857"],
        ] as const).map(([lado, s, color]) => (
          <div key={lado} className="vidrio p-4" style={{ borderColor: `${color}55` }}>
            <select className="campo font-bold" value={s.slug} onChange={(e) => elegir(lado, e.target.value)} aria-label={`Síndrome ${lado.toUpperCase()}`}>
              {SINDROMES.map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.nombre}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs" style={{ color }}>
              {getGrupo(s.grupo).nombre}
            </p>
            <p className="mt-1 text-sm text-tenue">{s.sello}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {DIMENSIONES.map((d) => {
          const ta = a.dims[d.id] ?? "—";
          const tb = b.dims[d.id] ?? "—";
          const iguales = ta === tb && ta !== "—";
          return (
            <div key={d.id} className="vidrio p-4">
              <p className="etiqueta">
                {d.nombre}
                {iguales && <span className="ml-2 normal-case tracking-normal text-menta">· coinciden</span>}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <p className="border-l-2 border-cian/60 pl-3">{ta}</p>
                <p className="border-l-2 border-dorado/60 pl-3">{tb}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

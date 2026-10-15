"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icono, type NombreIcono } from "./iconos";
import { Marca, Simbolo } from "./marca";
import { useEstado } from "./proveedores";
import { nivel, rachaActual } from "@/lib/estado";

const PESTANAS: { href: string; texto: string; icono: NombreIcono; tambien?: string[] }[] = [
  { href: "/mapa", texto: "Mapa", icono: "mapa", tambien: ["/planeta", "/sindromes", "/glosario"] },
  { href: "/retos", texto: "Retos", icono: "objetivo" },
  { href: "/casos", texto: "Casos", icono: "estetoscopio" },
  { href: "/yo", texto: "Yo", icono: "usuario" },
];

export function Hud() {
  const ruta = usePathname();
  const { estado } = useEstado();
  const nv = nivel(estado.xp);
  const racha = rachaActual(estado);
  const activa = (p: (typeof PESTANAS)[number]) =>
    [p.href, ...(p.tambien ?? [])].some((h) => ruta === h || ruta.startsWith(h + "/"));

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-noche/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <Link href="/mapa" className="hidden sm:block" aria-label="Ir al mapa">
            <Marca />
          </Link>
          <Link href="/mapa" className="sm:hidden" aria-label="Ir al mapa">
            <Simbolo />
          </Link>

          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex" aria-label="Secciones">
            {PESTANAS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                aria-current={activa(p) ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activa(p) ? "bg-white/15 text-tinta" : "text-tenue hover:text-tinta"
                }`}
              >
                <Icono nombre={p.icono} className="h-4 w-4" />
                {p.texto}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 text-sm font-bold sm:gap-3 lg:ml-0">
            <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-dorado" title="Experiencia total">
              <Icono nombre="rayo" className="h-4 w-4" />
              {estado.xp}
            </span>
            <span
              className={`flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 ${racha ? "text-coral" : "text-tenue"}`}
              title="Días seguidos jugando"
            >
              <Icono nombre="fuego" className="h-4 w-4" />
              {racha}
            </span>
            <Link href="/yo" className="flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3" title={`${nv.rango} · nivel ${nv.n}`}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cian/40 to-nebulosa/40 text-base">
                {estado.ajustes.avatar}
              </span>
              <span className="text-cian">Nv.{nv.n}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Navegación móvil: cápsula flotante */}
      <nav
        className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-white/10 bg-abismo/85 p-1.5 backdrop-blur-xl lg:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Secciones"
      >
        {PESTANAS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            aria-current={activa(p) ? "page" : undefined}
            className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition-colors ${
              activa(p) ? "bg-white/10 text-cian" : "text-tenue"
            }`}
          >
            <Icono nombre={p.icono} className="h-5 w-5" />
            {p.texto}
          </Link>
        ))}
      </nav>
    </>
  );
}

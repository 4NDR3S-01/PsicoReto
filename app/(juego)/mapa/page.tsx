"use client";

import Link from "next/link";
import { Icono } from "@/components/iconos";
import { MiPato } from "@/components/pato";
import { CORTO, Planeta } from "@/components/planeta";
import { useEstado } from "@/components/proveedores";
import { Barra, Estrellas } from "@/components/ui";
import { FUNCIONES, getFuncion } from "@/lib/contenido/funciones";
import { SINDROMES } from "@/lib/contenido/sindromes";
import { desbloqueado, estrellas, hoy, nivel, pendientes, progresoGalaxia, yaHizoDiario } from "@/lib/estado";
import { dichoMapa } from "@/lib/mascota";
import { signoDelDia } from "@/lib/practica";

// Posición horizontal (%) de cada planeta en la ruta.
const X = [50, 74, 80, 58, 30, 20, 38, 64, 80, 62, 36];
const FILA = 150;

export default function Mapa() {
  const { estado } = useEstado();
  const nv = nivel(estado.xp);
  const nombre = estado.ajustes.nombre.split(" ")[0];
  const xpHoy = estado.dias[hoy()] ?? 0;
  const meta = estado.ajustes.meta;
  const cometas = pendientes(estado).length;
  const diario = yaHizoDiario(estado);
  const actual = FUNCIONES.find((f) => desbloqueado(estado, f) && estrellas(estado.misiones[f.slug]) === 0) ?? null;
  const sd = signoDelDia(hoy());

  const alto = (FUNCIONES.length + 1) * FILA;
  const puntos = [...FUNCIONES.map((_, i) => ({ x: X[i], y: i * FILA + 60 })), { x: 50, y: FUNCIONES.length * FILA + 60 }];
  const ruta = puntos.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <section>
        <div className="aparecer vidrio flex items-center gap-4 p-5">
          <Link href="/yo#pato" aria-label={`Ver a ${estado.pato.nombre}`} className="shrink-0">
            <MiPato className="flotar h-16 w-16" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">
              ¡Hola{nombre ? `, ${nombre}` : ""}! <span className="text-tenue">· {nv.rango}</span>
            </p>
            <p className="text-sm text-tenue">
              <b className="text-tinta">{estado.pato.nombre}:</b> {dichoMapa(estado)}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Barra valor={nv.pct} color="#4fd1ff" className="flex-1" />
              <span className="shrink-0 text-xs font-bold text-tenue">
                Nv.{nv.n} · {nv.actual}/{nv.costo} XP
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold">Galaxia Semiopsique</h1>
          <span className="text-sm font-semibold text-tenue">{progresoGalaxia(estado)}% explorado</span>
        </div>

        {/* overflow-x-clip: el anillo animado del planeta «Siguiente» no debe ensanchar la página en móvil */}
        <div className="relative mx-auto mt-4 max-w-lg overflow-x-clip" style={{ height: alto }}>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${alto}`} preserveAspectRatio="none" aria-hidden>
            <path d={ruta} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
          </svg>

          {FUNCIONES.map((f, i) => {
            const libre = desbloqueado(estado, f);
            const est = estrellas(estado.misiones[f.slug]);
            const esActual = actual?.slug === f.slug;
            const contenido = (
              <>
                <span className="relative">
                  {esActual && <span className="absolute -inset-3 animate-ping rounded-full border-2 border-cian/50" />}
                  <Planeta slug={f.slug} tam={esActual ? 84 : 70} bloqueado={!libre} className="transition-transform group-hover:scale-105" />
                </span>
                <span className={`mt-2 whitespace-nowrap rounded-full px-3 py-0.5 text-sm font-bold ${libre ? "bg-white/10" : "bg-white/5 text-tenue"}`}>
                  {f.num}. {CORTO[f.slug]}
                </span>
                {libre && <Estrellas n={est} tam="h-3.5 w-3.5" />}
                {esActual && <span className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-cian">Siguiente</span>}
              </>
            );
            const estilo = { left: `${X[i]}%`, top: i * FILA + 60 };
            return libre ? (
              <Link
                key={f.slug}
                href={`/planeta/${f.slug}`}
                className="group absolute flex -translate-x-1/2 -translate-y-[42px] flex-col items-center gap-1"
                style={estilo}
                aria-label={`Planeta ${f.nombre}`}
              >
                {contenido}
              </Link>
            ) : (
              <div
                key={f.slug}
                className="absolute flex -translate-x-1/2 -translate-y-[36px] flex-col items-center gap-1"
                style={estilo}
                title="Consigue al menos una estrella en el planeta anterior para desbloquearlo"
              >
                {contenido}
              </div>
            );
          })}

          <Link
            href="/retos/final"
            className="group absolute flex -translate-x-1/2 -translate-y-[44px] flex-col items-center gap-1"
            style={{ left: "50%", top: FUNCIONES.length * FILA + 60 }}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6c9,#ffc857_45%,#ff7a3d_80%)] text-3xl shadow-[0_0_50px_-5px_#ffc857] transition-transform group-hover:scale-105">
              ☀️
            </span>
            <span className="mt-2 rounded-full bg-dorado/20 px-3 py-0.5 text-sm font-bold text-dorado">Prueba final</span>
          </Link>
        </div>
      </section>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="vidrio p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold">Meta del día</p>
            <span className="text-sm font-bold text-dorado">
              {Math.min(xpHoy, meta)}/{meta} XP
            </span>
          </div>
          <Barra valor={(xpHoy / meta) * 100} color="#ffc857" className="mt-3" />
          <p className="mt-2 text-xs text-tenue">{xpHoy >= meta ? "¡Meta cumplida! 🎉" : `Te faltan ${meta - xpHoy} XP para cumplirla.`}</p>
        </div>

        <Link href="/retos/diario" className="vidrio group flex items-center gap-4 p-5 transition-colors hover:bg-white/10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dorado/15 text-2xl">☀️</span>
          <span className="flex-1">
            <span className="block font-bold">Reto del día</span>
            <span className="text-sm text-tenue">{diario ? "Completado. ¡Vuelve mañana!" : "10 preguntas · +50 XP extra"}</span>
          </span>
          {diario ? <Icono nombre="check" className="h-6 w-6 text-menta" /> : <Icono nombre="derecha" className="h-5 w-5 text-tenue" />}
        </Link>

        <Link href="/retos/fichas" className="vidrio group flex items-center gap-4 p-5 transition-colors hover:bg-white/10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cian/15 text-2xl">☄️</span>
          <span className="flex-1">
            <span className="block font-bold">Cometas de repaso</span>
            <span className="text-sm text-tenue">{cometas ? `${cometas} fichas regresaron para repasar` : "Nada pendiente por ahora"}</span>
          </span>
          {cometas > 0 && <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-noche">{cometas}</span>}
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/sindromes" className="vidrio flex flex-col gap-2 p-4 transition-colors hover:bg-white/10">
            <Icono nombre="constelacion" className="h-6 w-6 text-nebulosa" />
            <span className="font-bold">Constelaciones</span>
            <span className="text-xs text-tenue">{SINDROMES.length} síndromes</span>
          </Link>
          <Link href="/glosario" className="vidrio flex flex-col gap-2 p-4 transition-colors hover:bg-white/10">
            <Icono nombre="buscar" className="h-6 w-6 text-menta" />
            <span className="font-bold">Glosario</span>
            <span className="text-xs text-tenue">Busca cualquier signo</span>
          </Link>
        </div>

        <div className="vidrio p-5">
          <p className="etiqueta">✦ Signo del día</p>
          <p className="mt-2 text-xl font-bold">{sd.nombre}</p>
          <p className="mt-1 text-sm text-tenue">{sd.def}</p>
          <p className="mt-3 text-xs text-cian">Planeta {getFuncion(sd.funcion)!.nombre}</p>
        </div>
      </aside>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Icono, type NombreIcono } from "@/components/iconos";
import { useEstado } from "@/components/proveedores";
import { Titulo } from "@/components/ui";
import { colaFichas, fragiles, pendientes, yaHizoDiario, type Modo } from "@/lib/estado";

export default function Retos() {
  const { estado } = useEstado();
  const diario = yaHizoDiario(estado);
  const cometas = pendientes(estado).length;
  const cola = colaFichas(estado).length;
  const nFragiles = fragiles(estado).length;
  const record = (m: Modo) => estado.partidas.filter((p) => p.modo === m).reduce((max, p) => Math.max(max, p.ok), 0);

  const modos: { href: string; icono: NombreIcono; color: string; titulo: string; texto: string; dato?: string }[] = [
    {
      href: "/retos/fichas",
      icono: "fichas",
      color: "#4fd1ff",
      titulo: "Fichas",
      texto: "Gira la tarjeta y di qué tan bien lo sabías. Vuelven justo antes de olvidarse.",
      dato: cola ? `${cometas} de repaso · ${cola - cometas} nuevas` : "Al día",
    },
    {
      href: "/retos/emparejar",
      icono: "enlazar",
      color: "#b7a8ff",
      titulo: "Emparejar",
      texto: "Une cada signo con su definición antes de que se acabe la ronda.",
      dato: record("emparejar") ? `Récord: ${record("emparejar")} pares` : undefined,
    },
    {
      href: "/retos/diferencial",
      icono: "balanza",
      color: "#ff9ad5",
      titulo: "Diferencial",
      texto: "Dos signos parecidos y una escena clínica: ¿cuál aparece?",
    },
    {
      href: "/retos/contrarreloj",
      icono: "reloj",
      color: "#ffc857",
      titulo: "Contrarreloj",
      texto: "60 segundos para ubicar cada signo en su planeta.",
      dato: record("contrarreloj") ? `Récord: ${record("contrarreloj")}` : undefined,
    },
    {
      href: "/retos/escritura",
      icono: "lapiz",
      color: "#5ef2b0",
      titulo: "Escritura",
      texto: "Lee la definición y escribe el signo sin opciones. Se perdonan las tildes.",
    },
    {
      href: "/retos/final",
      icono: "trofeo",
      color: "#ff9a5a",
      titulo: "Prueba final",
      texto: "30 preguntas de toda la galaxia en 25 minutos.",
      dato: estado.finales.length ? `Mejor: ${Math.max(...estado.finales)}%` : undefined,
    },
  ];

  return (
    <div className="aparecer">
      <Titulo titulo="Retos" sub="Gana XP, mantén tu racha y refuerza lo que más te cuesta." />

      <Link
        href="/retos/diario"
        className="relative mb-6 flex items-center gap-5 overflow-hidden rounded-3xl border border-dorado/30 bg-gradient-to-br from-dorado/20 via-[#ff7a3d]/10 to-transparent p-6 transition-transform hover:scale-[1.01]"
      >
        <span className="flotar text-6xl">☀️</span>
        <span className="flex-1">
          <span className="etiqueta !text-dorado">Reto del día</span>
          <span className="mt-1 block text-2xl font-bold">{diario ? "¡Reto completado!" : "10 preguntas · +50 XP extra"}</span>
          <span className="text-sm text-tenue">{diario ? "Mañana habrá uno nuevo." : "El mismo reto para todos los exploradores hoy."}</span>
        </span>
        {diario ? <Icono nombre="check" className="h-8 w-8 text-menta" /> : <span className="boton boton-dorado hidden sm:inline-flex">Jugar</span>}
      </Link>

      {nFragiles > 0 && (
        <Link href="/retos/fichas?fragiles=1" className="vidrio mb-6 flex items-center gap-4 border-coral/30 p-4 transition-colors hover:bg-white/10">
          <span className="text-3xl">🌑</span>
          <span className="flex-1">
            <span className="block font-bold">Agujero negro: {nFragiles} signos frágiles</span>
            <span className="text-sm text-tenue">Los que más fallas. Rescátalos antes de que se pierdan.</span>
          </span>
          <Icono nombre="derecha" className="h-5 w-5 text-tenue" />
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modos.map((m) => (
          <Link key={m.href} href={m.href} className="vidrio group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${m.color}22`, color: m.color }}>
              <Icono nombre={m.icono} className="h-6 w-6" />
            </span>
            <span className="text-lg font-bold">{m.titulo}</span>
            <span className="flex-1 text-sm text-tenue">{m.texto}</span>
            {m.dato && (
              <span className="text-xs font-bold" style={{ color: m.color }}>
                {m.dato}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

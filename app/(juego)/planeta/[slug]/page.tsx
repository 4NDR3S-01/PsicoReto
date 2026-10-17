"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Icono } from "@/components/iconos";
import { MiPato } from "@/components/pato";
import { ASPECTO, Planeta } from "@/components/planeta";
import { useEstado } from "@/components/proveedores";
import { Barra, Estrellas, Vacio } from "@/components/ui";
import { FUNCIONES, getFuncion } from "@/lib/contenido/funciones";
import { claveExplorado, desbloqueado, dominio, DOMINADO, estrellas, ganarXp, progresoPlaneta, XP } from "@/lib/estado";
import { accesorioDe, dichoPlaneta, tieneAccesorio } from "@/lib/mascota";

export default function PaginaPlaneta() {
  const { slug } = useParams<{ slug: string }>();
  const { estado, actualizar } = useEstado();
  const f = getFuncion(slug);
  const [abierto, setAbierto] = useState<number | null>(0);

  if (!f) {
    return (
      <Vacio
        icono="mapa"
        titulo="Planeta no encontrado"
        texto="Ese planeta no existe en esta galaxia."
        accion={
          <Link href="/mapa" className="boton boton-cian">
            Volver al mapa
          </Link>
        }
      />
    );
  }

  const libre = desbloqueado(estado, f);
  const mejor = estado.misiones[f.slug];
  const est = estrellas(mejor);
  const color = ASPECTO[f.slug].luz;
  const previo = FUNCIONES[f.num - 2];

  if (!libre) {
    return (
      <Vacio
        icono="candado"
        titulo={`${f.nombre} está bloqueado`}
        texto={`Consigue al menos una estrella en la misión de ${previo.nombre} para viajar hasta aquí.`}
        accion={
          <Link href={`/planeta/${previo.slug}`} className="boton boton-cian">
            Ir a {previo.nombre}
          </Link>
        }
      />
    );
  }

  function explorar(i: number) {
    const k = claveExplorado(f!.slug, i);
    if (estado.explorado[k]) return;
    actualizar((e) => ganarXp({ ...e, explorado: { ...e.explorado, [k]: new Date().toISOString() } }, XP.explorar));
  }

  const total = f.apartados.reduce((n, a) => n + a.signos.length, 0);
  const premio = accesorioDe(f.slug);
  const ganado = tieneAccesorio(estado, premio);

  return (
    <div className="aparecer">
      <Link href="/mapa" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tenue hover:text-tinta">
        <Icono nombre="izquierda" className="h-4 w-4" /> Mapa
      </Link>

      <section className="vidrio relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ background: color }} />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <Planeta slug={f.slug} tam={120} className="flotar self-center sm:self-auto" />
          <div className="flex-1">
            <p className="etiqueta">Planeta {f.num} de {FUNCIONES.length}</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{f.nombre}</h1>
            <p className="mt-2 text-tenue">{f.entrada}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Estrellas n={est} tam="h-6 w-6" />
              <span className="text-sm text-tenue">{mejor !== undefined ? `Mejor misión: ${mejor}%` : "Misión sin intentar"}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Barra valor={progresoPlaneta(estado, f)} color={color} className="flex-1" />
              <span className="text-sm font-bold">{progresoPlaneta(estado, f)}%</span>
            </div>
          </div>
        </div>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link href={`/planeta/${f.slug}/mision`} className="boton boton-cian">
            <Icono nombre="cohete" className="h-5 w-5" /> Iniciar misión
          </Link>
          <Link href={`/retos/fichas?f=${f.slug}`} className="boton boton-vidrio">
            <Icono nombre="fichas" className="h-5 w-5" /> Fichas
          </Link>
          <Link href={`/retos/escritura?f=${f.slug}`} className="boton boton-vidrio">
            <Icono nombre="lapiz" className="h-5 w-5" /> Escritura
          </Link>
        </div>
        <p className="relative mt-4 text-xs text-tenue">
          Misión: {Math.min(10, total * 2)} preguntas y 3 escudos. 60% ⭐ · 80% ⭐⭐ · 100% ⭐⭐⭐. Una estrella desbloquea el siguiente planeta.
        </p>
      </section>

      <section className="mt-6 flex items-end gap-3">
        <MiPato humor={est >= 1 ? "feliz" : "normal"} className="h-20 w-20 shrink-0" />
        <div className="vidrio relative flex-1 rounded-bl-md p-4">
          <p className="text-sm">
            <b className="text-cian">{estado.pato.nombre}:</b> {dichoPlaneta(estado, f)}
          </p>
          <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${ganado ? "bg-menta/15 text-menta" : "bg-white/5 text-tenue"}`}>
            {ganado ? <Icono nombre="check" className="h-3.5 w-3.5" /> : <Icono nombre="candado" className="h-3.5 w-3.5" />}
            Recompensa del planeta: {premio.icono} {premio.nombre}
            {!ganado && " · 1 estrella"}
          </p>
        </div>
      </section>

      <h2 className="mb-3 mt-8 text-xl font-bold">Explorar el planeta</h2>
      <div className="flex flex-col gap-3">
        {f.apartados.map((a, i) => {
          const hecho = !!estado.explorado[claveExplorado(f.slug, i)];
          const abiertoAqui = abierto === i;
          return (
            <section key={a.titulo} className="vidrio overflow-hidden">
              <button
                className="flex w-full items-center gap-4 p-5 text-left"
                onClick={() => setAbierto(abiertoAqui ? null : i)}
                aria-expanded={abiertoAqui}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold ${
                    hecho ? "bg-menta/20 text-menta" : "bg-white/10"
                  }`}
                >
                  {hecho ? <Icono nombre="check" className="h-5 w-5" /> : i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-bold">{a.titulo}</span>
                  <span className="text-sm text-tenue">{a.signos.length} signos</span>
                </span>
                <Icono nombre="derecha" className={`h-5 w-5 text-tenue transition-transform ${abiertoAqui ? "rotate-90" : ""}`} />
              </button>

              {abiertoAqui && (
                <div className="aparecer border-t border-white/10 px-5 pb-5">
                  {a.nota && <p className="pt-4 text-sm text-tenue">{a.nota}</p>}
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {a.signos.map((s) => {
                      const d = dominio(estado, s.id);
                      return (
                        <li key={s.id} id={s.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="flex items-center gap-2 font-bold" style={{ color }}>
                            {s.nombre}
                            {d !== null && d >= DOMINADO && <Icono nombre="estrella" className="h-3.5 w-3.5 text-dorado" />}
                          </p>
                          {s.alias.length > 0 && <p className="text-xs text-tenue">También: {s.alias.join(", ")}</p>}
                          <p className="mt-1.5 text-sm">{s.def}</p>
                          {s.clave && <p className="mt-2 text-xs italic text-tenue">💡 {s.clave}</p>}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => {
                      explorar(i);
                      setAbierto(i + 1 < f.apartados.length ? i + 1 : null);
                    }}
                    className={`boton mt-5 ${hecho ? "boton-vidrio" : "boton-dorado"}`}
                  >
                    {hecho ? "Siguiente sección" : `Marcar como explorado · +${XP.explorar} XP`}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Icono } from "@/components/iconos";
import { useEstado } from "@/components/proveedores";
import { Vacio } from "@/components/ui";
import { CONSULTAS, getConsulta, type Consulta } from "@/lib/contenido/consultas";
import { registrarPartida, registrarRespuestas, XP } from "@/lib/estado";
import { azarSembrado, barajar } from "@/lib/practica";

export default function PaginaCaso() {
  const { id } = useParams<{ id: string }>();
  const c = getConsulta(id);
  if (!c) {
    return (
      <Vacio
        icono="estetoscopio"
        titulo="Caso no encontrado"
        texto="Ese caso no existe."
        accion={
          <Link href="/casos" className="boton boton-cian">
            Ver casos
          </Link>
        }
      />
    );
  }
  return <Caso key={c.id} c={c} />;
}

type Paso = "signos" | "sindrome" | "fin";

function Caso({ c }: { c: Consulta }) {
  const { actualizar } = useEstado();
  const [paso, setPaso] = useState<Paso>("signos");
  const [marcados, setMarcados] = useState<Set<string>>(new Set());
  const [eleccion, setEleccion] = useState<string | null>(null);
  const [xpGanada, setXpGanada] = useState(0);

  const lista = useMemo(() => barajar([...c.hallazgos, ...c.distractores], azarSembrado(`c${c.id}`)), [c]);
  const opciones = useMemo(() => barajar(c.opciones, azarSembrado(`o${c.id}`)), [c]);
  const presentes = new Set(c.hallazgos.map((s) => s.id));
  const aciertos = c.hallazgos.filter((s) => marcados.has(s.id)).length;
  const falsos = c.distractores.filter((s) => marcados.has(s.id)).length;
  const ok = eleccion === c.sindrome.slug;
  const siguiente = CONSULTAS[CONSULTAS.findIndex((x) => x.id === c.id) + 1];

  const alternar = (sid: string) =>
    setMarcados((m) => {
      const n = new Set(m);
      if (n.has(sid)) n.delete(sid);
      else n.add(sid);
      return n;
    });

  function diagnosticar(slug: string) {
    if (paso !== "sindrome") return;
    const acierta = slug === c.sindrome.slug;
    const signosOk = Math.max(0, aciertos - falsos);
    const xp = signosOk * 5 + (acierta ? XP.caso : 0);
    setEleccion(slug);
    setXpGanada(xp);
    setPaso("fin");
    actualizar((e) => {
      const x = registrarRespuestas(
        e,
        lista.map((s) => ({ id: s.id, ok: presentes.has(s.id) === marcados.has(s.id) })),
      );
      const previo = x.casos[c.id];
      return registrarPartida(
        { ...x, casos: { ...x.casos, [c.id]: { ok: acierta || !!previo?.ok, signos: signosOk / c.hallazgos.length } } },
        { modo: "caso", titulo: `Caso ${c.id}`, ok: aciertos + (acierta ? 1 : 0), total: c.hallazgos.length + 1, xp },
      );
    });
  }

  return (
    <div className="aparecer">
      <Link href="/casos" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tenue hover:text-tinta">
        <Icono nombre="izquierda" className="h-4 w-4" /> Casos
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="vidrio h-fit p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-cian/15 px-3 py-1 text-xs font-bold text-cian">Caso {c.id}</span>
            <span className="text-xs text-tenue">{c.lugar}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">{c.paciente}</h1>
          <p className="mt-1 text-sm text-tenue">
            <b className="text-tinta">Motivo:</b> {c.motivo}
          </p>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 leading-relaxed">
            {c.relato.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        <section>
          <div className="vidrio p-5">
            <p className="etiqueta">Paso 1</p>
            <h2 className="mt-1 text-lg font-bold">Marca los signos presentes</h2>
            <p className="text-sm text-tenue">
              {paso === "signos"
                ? "Algunos son trampas: no aparecen en la historia."
                : `Encontraste ${aciertos} de ${c.hallazgos.length}${falsos ? ` y marcaste ${falsos} que no estaba${falsos > 1 ? "n" : ""}` : ""}.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {lista.map((s) => {
                const m = marcados.has(s.id);
                const p = presentes.has(s.id);
                const revisado = paso !== "signos";
                const clase = !revisado
                  ? m
                    ? "border-cian bg-cian/20 text-tinta"
                    : "border-white/15 bg-white/5 text-tenue hover:border-white/40"
                  : p && m
                    ? "border-menta bg-menta/15 text-menta"
                    : !p && m
                      ? "border-coral bg-coral/15 text-coral line-through"
                      : p
                        ? "border-dashed border-menta text-menta"
                        : "border-white/10 text-tenue opacity-40";
                return (
                  <button
                    key={s.id}
                    disabled={revisado}
                    onClick={() => alternar(s.id)}
                    aria-pressed={m}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${clase}`}
                  >
                    {m && !revisado && "✓ "}
                    {s.nombre}
                  </button>
                );
              })}
            </div>
            {paso === "signos" && (
              <button className="boton boton-cian mt-5" disabled={!marcados.size} onClick={() => setPaso("sindrome")}>
                Confirmar signos
              </button>
            )}
          </div>

          {paso !== "signos" && (
            <div className="vidrio aparecer mt-4 p-5">
              <p className="etiqueta">Paso 2</p>
              <h2 className="mt-1 text-lg font-bold">¿Qué síndrome es?</h2>
              <div className="mt-4 flex flex-col gap-2">
                {opciones.map((o) => {
                  const est = paso === "sindrome" ? undefined : o.slug === c.sindrome.slug ? "correcta" : o.slug === eleccion ? "incorrecta" : "atenuada";
                  return (
                    <button key={o.slug} className="opcion" data-estado={est} disabled={paso !== "sindrome"} onClick={() => diagnosticar(o.slug)}>
                      {o.nombre}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {paso === "fin" && (
            <div className={`aparecer mt-4 rounded-[1.25rem] border p-5 ${ok ? "border-menta/50 bg-menta/10" : "border-coral/50 bg-coral/10"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className={`text-lg font-bold ${ok ? "text-menta" : "text-coral"}`}>{ok ? "¡Diagnóstico correcto!" : `Era: ${c.sindrome.nombre}`}</p>
                <span className="flex items-center gap-1 font-bold text-dorado">
                  <Icono nombre="rayo" className="h-4 w-4" />+{xpGanada} XP
                </span>
              </div>
              <p className="mt-2 text-sm">{c.comentario}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {siguiente ? (
                  <Link href={`/casos/${siguiente.id}`} className="boton boton-cian">
                    Siguiente caso
                  </Link>
                ) : (
                  <Link href="/casos" className="boton boton-cian">
                    Ver todos
                  </Link>
                )}
                <Link href={`/sindromes/${c.sindrome.slug}`} className="boton boton-vidrio">
                  Ver síndrome
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

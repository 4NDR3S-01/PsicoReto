"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icono } from "@/components/iconos";
import { MiPato, Pato } from "@/components/pato";
import { ASPECTO, CORTO, Planeta } from "@/components/planeta";
import { useEstado, useSesion } from "@/components/proveedores";
import { Barra, Estrellas } from "@/components/ui";
import { CONSULTAS } from "@/lib/contenido/consultas";
import { FUNCIONES } from "@/lib/contenido/funciones";
import {
  dominados,
  estadoInicial,
  estrellas,
  hoy,
  LOGROS,
  nivel,
  progresoPlaneta,
  rachaActual,
  sumarDias,
  type Estado,
  type Modo,
} from "@/lib/estado";
import { etapa } from "@/lib/mascota";
import { supabase } from "@/lib/supabase";

const AVATARES = ["🧑‍🚀", "👩‍🚀", "👨‍🚀", "🛸", "🌙", "🪐", "☄️", "🌟", "🦉", "🐙", "🦊", "🧠"];
const DIAS = ["D", "L", "M", "X", "J", "V", "S"];
const MODO: Record<Modo, string> = {
  mision: "🚀",
  diario: "☀️",
  fichas: "☄️",
  emparejar: "🔗",
  diferencial: "⚖️",
  contrarreloj: "⏱️",
  escritura: "✍️",
  final: "🏆",
  caso: "🩺",
};

export default function Yo() {
  const { user } = useSesion();
  const { estado, actualizar, nube } = useEstado();
  const router = useRouter();
  const [nombre, setNombre] = useState(estado.ajustes.nombre);
  const [confirmar, setConfirmar] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [nombrePato, setNombrePato] = useState(estado.pato.nombre);
  const [patoGuardado, setPatoGuardado] = useState(false);
  const nv = nivel(estado.xp);
  const logros = LOGROS.map((l) => ({ ...l, hecho: l.ok(estado) }));
  const ajustar = (a: Partial<Estado["ajustes"]>) => actualizar((e) => ({ ...e, ajustes: { ...e.ajustes, ...a } }));
  const ajustarPato = (p: Partial<Estado["pato"]>) => actualizar((e) => ({ ...e, pato: { ...e.pato, ...p } }));
  const forma = etapa(nv.n);
  const proxima = etapa(nv.n + 1);

  const semana = Array.from({ length: 7 }, (_, i) => {
    const d = sumarDias(hoy(), i - 6);
    const [y, m, dd] = d.split("-").map(Number);
    return { d, letra: DIAS[new Date(y, m - 1, dd).getDay()], xp: estado.dias[d] ?? 0 };
  });
  const maxSemana = Math.max(estado.ajustes.meta, ...semana.map((s) => s.xp));

  return (
    <div className="aparecer flex flex-col gap-6">
      {/* Tarjeta de perfil */}
      <section className="vidrio relative overflow-hidden p-6">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-nebulosa/30 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row">
          <span className="flotar flex h-24 w-24 items-center justify-center rounded-full border-2 border-cian/50 bg-gradient-to-br from-cian/25 to-nebulosa/35 text-5xl">
            {estado.ajustes.avatar}
          </span>
          <div className="w-full flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{estado.ajustes.nombre || "Explorador/a"}</h1>
            <p className="text-sm text-tenue">{user?.email}</p>
            <p className="mt-2 font-bold text-cian">
              {nv.rango} · Nivel {nv.n}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Barra valor={nv.pct} className="flex-1" />
              <span className="text-xs font-bold text-tenue">
                {nv.actual}/{nv.costo} XP
              </span>
            </div>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { v: estado.xp, t: "XP total", c: "text-dorado" },
            { v: `${rachaActual(estado)} 🔥`, t: `racha · récord ${estado.mejorRacha}`, c: "text-coral" },
            { v: dominados(estado), t: "signos dominados", c: "text-menta" },
            { v: `${Object.values(estado.casos).filter((c) => c.ok).length}/${CONSULTAS.length}`, t: "casos resueltos", c: "text-cian" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl bg-white/5 p-3 text-center">
              <p className={`text-xl font-bold ${x.c}`}>{x.v}</p>
              <p className="text-xs text-tenue">{x.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mascota */}
      <section id="pato" className="vidrio relative scroll-mt-24 overflow-hidden p-6">
        <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-cian/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <MiPato humor="feliz" className="flotar h-40 w-40 shrink-0" />
          <div className="w-full flex-1 text-center sm:text-left">
            <p className="etiqueta">Tu compañero · forma {Math.min(nv.n, 11)}</p>
            <h2 className="mt-1 text-2xl font-bold">
              {estado.pato.nombre} <span className="text-tenue">· {forma.nombre}</span>
            </h2>
            <p className="mt-1 text-sm text-tenue">{forma.texto}</p>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-left">
              <Pato nivel={nv.n + 1} className="h-14 w-14 shrink-0 opacity-40 brightness-0 invert" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  Próxima evolución en el nivel {nv.n + 1}: <span className="text-cian">{proxima.nombre}</span>
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Barra valor={nv.pct} color="#8b7bff" className="flex-1" />
                  <span className="shrink-0 text-xs font-bold text-tenue">faltan {nv.costo - nv.actual} XP</span>
                </div>
              </div>
            </div>

            <form
              className="mt-4 flex max-w-md gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                ajustarPato({ nombre: nombrePato.trim() || "Cuac" });
                setPatoGuardado(true);
              }}
            >
              <input
                className="campo"
                aria-label="Nombre de tu pato"
                maxLength={20}
                value={nombrePato}
                onChange={(e) => (setNombrePato(e.target.value), setPatoGuardado(false))}
              />
              <button className="boton boton-vidrio">{patoGuardado ? "✓" : "Renombrar"}</button>
            </form>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="vidrio p-5">
          <h2 className="font-bold">XP de los últimos 7 días</h2>
          <div className="mt-4 flex h-36 items-end justify-between gap-2">
            {semana.map((s) => (
              <div key={s.d} className="flex h-full flex-1 flex-col items-center gap-1.5">
                <span className="h-3 text-[10px] leading-3 text-tenue">{s.xp || ""}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-lg ${s.xp >= estado.ajustes.meta ? "bg-gradient-to-t from-dorado/60 to-dorado" : "bg-gradient-to-t from-cian/30 to-cian"}`}
                    style={{ height: `${Math.max(4, (s.xp / maxSemana) * 100)}%`, opacity: s.xp ? 1 : 0.25 }}
                  />
                </div>
                <span className={`text-xs font-bold ${s.d === hoy() ? "text-cian" : "text-tenue"}`}>{s.letra}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-tenue">Dorado: días en que cumpliste la meta de {estado.ajustes.meta} XP.</p>
        </section>

        <section className="vidrio p-5">
          <h2 className="font-bold">
            Logros <span className="text-tenue">{logros.filter((l) => l.hecho).length}/{logros.length}</span>
          </h2>
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {logros.map((l) => (
              <li
                key={l.id}
                title={`${l.titulo}: ${l.texto}`}
                className={`flex flex-col items-center gap-1 rounded-2xl p-2 text-center ${l.hecho ? "bg-dorado/10" : "opacity-35 grayscale"}`}
              >
                <span className="text-3xl">{l.icono}</span>
                <span className="text-[11px] font-bold leading-tight">{l.titulo}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="vidrio p-5">
        <h2 className="font-bold">Planetas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map((f) => (
            <li key={f.slug}>
              <Link href={`/planeta/${f.slug}`} className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/5">
                <Planeta slug={f.slug} tam={36} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 text-sm font-bold">
                    {CORTO[f.slug]} <Estrellas n={estrellas(estado.misiones[f.slug])} tam="h-3 w-3" />
                  </span>
                  <Barra valor={progresoPlaneta(estado, f)} color={ASPECTO[f.slug].luz} className="mt-1.5 !h-1.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="vidrio p-5">
        <h2 className="font-bold">Historial</h2>
        {estado.partidas.length ? (
          <ul className="mt-3 divide-y divide-white/10">
            {estado.partidas.slice(0, 15).map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="text-xl">{MODO[p.modo]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{p.titulo}</span>
                  <span className="text-xs text-tenue">
                    {new Date(p.fecha).toLocaleDateString("es", { day: "numeric", month: "short" })} · {p.ok}/{p.total}
                  </span>
                </span>
                <span className="font-bold text-dorado">+{p.xp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-tenue">Aún no has jugado ninguna partida. ¡Despega desde el mapa!</p>
        )}
      </section>

      <section className="vidrio p-5">
        <h2 className="font-bold">Ajustes</h2>

        <p className="etiqueta mt-5">Avatar</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AVATARES.map((a) => (
            <button
              key={a}
              onClick={() => ajustar({ avatar: a })}
              aria-pressed={estado.ajustes.avatar === a}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-colors ${
                estado.ajustes.avatar === a ? "border-2 border-cian bg-cian/15" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <p className="etiqueta mt-6">Nombre</p>
        <form
          className="mt-2 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ajustar({ nombre: nombre.trim() });
            supabase.auth.updateUser({ data: { nombre: nombre.trim() } });
            setGuardado(true);
          }}
        >
          <input className="campo" value={nombre} onChange={(e) => (setNombre(e.target.value), setGuardado(false))} />
          <button className="boton boton-vidrio">{guardado ? "✓" : "Guardar"}</button>
        </form>

        <p className="etiqueta mt-6">Meta diaria</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            [30, "Tranqui"],
            [50, "Normal"],
            [100, "Intensa"],
            [200, "Galáctica"],
          ].map(([v, t]) => (
            <button
              key={v}
              onClick={() => ajustar({ meta: Number(v) })}
              className={`rounded-2xl border px-4 py-2 text-sm font-bold ${
                estado.ajustes.meta === v ? "border-dorado bg-dorado/15 text-dorado" : "border-white/15 text-tenue"
              }`}
            >
              {t} · {v} XP
            </button>
          ))}
        </div>

        <p className="etiqueta mt-6">Fichas nuevas por día</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[5, 10, 20, 30].map((v) => (
            <button
              key={v}
              onClick={() => ajustar({ nuevas: v })}
              className={`h-10 w-14 rounded-2xl border text-sm font-bold ${
                estado.ajustes.nuevas === v ? "border-cian bg-cian/15 text-cian" : "border-white/15 text-tenue"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-tenue">
          <Icono nombre="nube" className={`h-4 w-4 ${nube ? "text-menta" : "text-coral"}`} />
          {nube ? "Tu progreso se guarda en la nube." : "Sin conexión con la nube: el progreso se guarda en este navegador."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          {confirmar ? (
            <>
              <span className="self-center text-sm">¿Borrar todo tu progreso?</span>
              <button
                className="boton bg-coral text-noche"
                onClick={() => {
                  // El pato conserva su nombre y vuelve a ser huevo sin volver a presentarse.
                  actualizar((e) => ({ ...estadoInicial(), ajustes: e.ajustes, pato: { ...e.pato, visto: 1, accesorio: null } }));
                  setConfirmar(false);
                }}
              >
                Sí, reiniciar
              </button>
              <button className="boton boton-vidrio" onClick={() => setConfirmar(false)}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="boton boton-vidrio text-coral" onClick={() => setConfirmar(true)}>
              Reiniciar progreso
            </button>
          )}
          <button
            className="boton boton-vidrio"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/");
            }}
          >
            <Icono nombre="salir" className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </section>
    </div>
  );
}

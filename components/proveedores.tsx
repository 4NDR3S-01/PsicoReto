"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { estadoInicial, normalizar, type Estado } from "@/lib/estado";

/* ───────────── Sesión ───────────── */

type Sesion = { user: User | null; cargando: boolean };
const SesionCtx = createContext<Sesion>({ user: null, cargando: true });
export const useSesion = () => useContext(SesionCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sesion, setSesion] = useState<Sesion>({ user: null, cargando: true });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSesion({ user: data.session?.user ?? null, cargando: false }));
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSesion({ user: s?.user ?? null, cargando: false }));
    return () => data.subscription.unsubscribe();
  }, []);

  return <SesionCtx.Provider value={sesion}>{children}</SesionCtx.Provider>;
}

/* ───────────── Partida guardada (navegador + nube) ───────────── */

type EstadoCtx = {
  estado: Estado;
  listo: boolean;
  nube: boolean;
  actualizar: (fn: (e: Estado) => Estado) => void;
};

const EstadoContexto = createContext<EstadoCtx | null>(null);

export function useEstado() {
  const ctx = useContext(EstadoContexto);
  if (!ctx) throw new Error("useEstado requiere <EstadoProvider>");
  return ctx;
}

const claveLocal = (uid: string) => `semiopsique:${uid}`;

function leerLocal(uid: string): { estado: Estado; ts: number } | null {
  try {
    const crudo = localStorage.getItem(claveLocal(uid));
    if (!crudo) return null;
    const g = JSON.parse(crudo);
    return { estado: normalizar(g.estado), ts: g.ts ?? 0 };
  } catch {
    return null;
  }
}

export function EstadoProvider({ uid, nombre, children }: { uid: string; nombre?: string; children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>(estadoInicial);
  const [listo, setListo] = useState(false);
  const [nube, setNube] = useState(false);
  const remoto = useRef(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const local = leerLocal(uid);
      let elegido = local?.estado ?? estadoInicial();
      const { data, error } = await supabase.from("progress").select("data, updated_at").eq("user_id", uid).maybeSingle();
      if (!error) {
        remoto.current = true;
        // Se adopta la copia de la nube solo si es de este formato y más reciente.
        const ts = data ? new Date(data.updated_at).getTime() : 0;
        const enNube = normalizar(data?.data);
        if (enNube.partidas.length + enNube.xp > 0 && ts > (local?.ts ?? 0)) elegido = enNube;
      }
      if (cancelado) return;
      if (!elegido.ajustes.nombre && nombre) elegido = { ...elegido, ajustes: { ...elegido.ajustes, nombre } };
      setEstado(elegido);
      setNube(remoto.current);
      setListo(true);
    })();
    return () => {
      cancelado = true;
    };
  }, [uid, nombre]);

  const guardar = useCallback(
    (e: Estado) => {
      const ts = Date.now();
      try {
        localStorage.setItem(claveLocal(uid), JSON.stringify({ estado: e, ts }));
      } catch {}
      if (!remoto.current) return;
      if (temporizador.current) clearTimeout(temporizador.current);
      temporizador.current = setTimeout(async () => {
        const { error } = await supabase.from("progress").upsert({ user_id: uid, data: e, updated_at: new Date(ts).toISOString() });
        setNube(!error);
      }, 1000);
    },
    [uid],
  );

  const actualizar = useCallback(
    (fn: (e: Estado) => Estado) => {
      setEstado((previo) => {
        const siguiente = fn(previo);
        guardar(siguiente);
        return siguiente;
      });
    },
    [guardar],
  );

  return <EstadoContexto.Provider value={{ estado, listo, nube, actualizar }}>{children}</EstadoContexto.Provider>;
}

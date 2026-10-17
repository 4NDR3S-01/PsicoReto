"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Evolucion } from "@/components/evolucion";
import { Hud } from "@/components/hud";
import { EstadoProvider, useEstado, useSesion } from "@/components/proveedores";
import { Splash } from "@/components/ui";

export default function JuegoLayout({ children }: { children: React.ReactNode }) {
  const { user, cargando } = useSesion();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !user) router.replace("/");
  }, [cargando, user, router]);

  if (cargando || !user) return <Splash />;
  const nombre = user.user_metadata?.nombre ?? user.user_metadata?.name;
  return (
    <EstadoProvider uid={user.id} nombre={nombre ? String(nombre) : undefined}>
      <Marco>{children}</Marco>
    </EstadoProvider>
  );
}

function Marco({ children }: { children: React.ReactNode }) {
  const { listo } = useEstado();
  if (!listo) return <Splash />;
  return (
    <div className="min-h-dvh">
      <Hud />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:pt-8 lg:pb-16">{children}</main>
      <Evolucion />
    </div>
  );
}

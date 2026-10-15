"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Marca } from "@/components/marca";
import { Planeta } from "@/components/planeta";
import { useSesion } from "@/components/proveedores";
import { Splash } from "@/components/ui";
import { supabase } from "@/lib/supabase";

type Vista = "entrar" | "crear" | "recuperar";

const traducir = (msg: string) => {
  if (/invalid login/i.test(msg)) return "Correo o contraseña incorrectos.";
  if (/already registered/i.test(msg)) return "Ese correo ya tiene cuenta. Inicia sesión.";
  if (/password should be/i.test(msg)) return "La contraseña debe tener al menos 6 caracteres.";
  if (/email not confirmed/i.test(msg)) return "Confirma tu correo desde el mensaje que te enviamos.";
  if (/rate limit/i.test(msg)) return "Demasiados intentos. Espera un momento.";
  return msg;
};

export default function Login() {
  const { user, cargando } = useSesion();
  const router = useRouter();
  const [vista, setVista] = useState<Vista>("entrar");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    if (!cargando && user) router.replace("/mapa");
  }, [cargando, user, router]);

  if (cargando || user) return <Splash />;

  const cambiar = (v: Vista) => {
    setVista(v);
    setError("");
    setAviso("");
  };

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    setAviso("");
    try {
      if (vista === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
        if (error) throw error;
      } else if (vista === "crear") {
        const { data, error } = await supabase.auth.signUp({
          email: correo,
          password: clave,
          options: { data: { nombre: nombre.trim() }, emailRedirectTo: `${location.origin}/mapa` },
        });
        if (error) throw error;
        if (!data.session) setAviso("¡Cuenta creada! Revisa tu correo para confirmarla y luego inicia sesión.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(correo, { redirectTo: `${location.origin}/yo` });
        if (error) throw error;
        setAviso("Si el correo existe, te llegará un enlace para cambiar la contraseña.");
      }
    } catch (err) {
      setError(traducir(err instanceof Error ? err.message : String(err)));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      {/* Planetas decorativos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="flotar absolute -left-12 top-10 opacity-60 sm:left-[8%] sm:top-16">
          <Planeta slug="memoria" tam={140} />
        </div>
        <div className="flotar absolute bottom-16 right-4 opacity-70 [animation-delay:1.5s] sm:right-[12%]">
          <Planeta slug="afectividad" tam={70} />
        </div>
        <div className="flotar absolute right-[28%] top-8 opacity-60 [animation-delay:.8s]">
          <Planeta slug="fisiologicas" tam={40} />
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Marca grande />
          <p className="mt-4 text-tenue">
            Explora la galaxia de la semiología psiquiátrica: cada función psíquica es un planeta por conquistar.
          </p>
        </div>

        <div className="vidrio p-6 sm:p-8">
          {vista !== "recuperar" ? (
            <div className="mb-6 grid grid-cols-2 rounded-full bg-white/5 p-1 text-sm font-semibold" role="tablist">
              {(["entrar", "crear"] as const).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={vista === v}
                  onClick={() => cambiar(v)}
                  className={`rounded-full py-2 transition-colors ${vista === v ? "bg-white/15 text-tinta" : "text-tenue"}`}
                >
                  {v === "entrar" ? "Iniciar sesión" : "Crear cuenta"}
                </button>
              ))}
            </div>
          ) : (
            <h1 className="mb-6 text-xl font-bold">Recuperar contraseña</h1>
          )}

          <form onSubmit={enviar} className="flex flex-col gap-4">
            {vista === "crear" && (
              <label className="flex flex-col gap-1.5">
                <span className="etiqueta">Nombre</span>
                <input className="campo" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="given-name" required />
              </label>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="etiqueta">Correo</span>
              <input className="campo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="email" required />
            </label>
            {vista !== "recuperar" && (
              <label className="flex flex-col gap-1.5">
                <span className="etiqueta">Contraseña</span>
                <input
                  className="campo"
                  type="password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  autoComplete={vista === "crear" ? "new-password" : "current-password"}
                  minLength={6}
                  required
                />
              </label>
            )}

            {error && <p className="rounded-xl border border-coral/50 bg-coral/10 px-4 py-2.5 text-sm">{error}</p>}
            {aviso && <p className="rounded-xl border border-menta/50 bg-menta/10 px-4 py-2.5 text-sm">{aviso}</p>}

            <button className="boton boton-cian mt-2 w-full" disabled={enviando}>
              {enviando ? "Conectando…" : vista === "entrar" ? "Despegar 🚀" : vista === "crear" ? "Crear mi cuenta" : "Enviar enlace"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            {vista === "entrar" && (
              <button onClick={() => cambiar("recuperar")} className="text-tenue underline-offset-4 hover:text-tinta hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            )}
            {vista === "recuperar" && (
              <button onClick={() => cambiar("entrar")} className="text-tenue underline-offset-4 hover:text-tinta hover:underline">
                Volver a iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

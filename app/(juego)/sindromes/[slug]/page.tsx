"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Icono } from "@/components/iconos";
import { Titulo, Vacio } from "@/components/ui";
import { CONSULTAS } from "@/lib/contenido/consultas";
import { DIMENSIONES, getGrupo, getSindrome, SINDROMES } from "@/lib/contenido/sindromes";

export default function FichaSindrome() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const s = getSindrome(slug);

  if (!s) {
    return (
      <Vacio
        icono="constelacion"
        titulo="Síndrome no encontrado"
        texto="Esa estrella no está en el mapa."
        accion={
          <Link href="/sindromes" className="boton boton-cian">
            Ver constelaciones
          </Link>
        }
      />
    );
  }

  const g = getGrupo(s.grupo);
  const casos = CONSULTAS.filter((c) => c.sindrome.slug === s.slug);

  return (
    <div className="aparecer">
      <Titulo volver="/sindromes" titulo={s.nombre} sub={`Constelación: ${g.nombre}`} />

      <div className="vidrio mb-6 border-l-4 !border-l-dorado p-5">
        <p className="etiqueta !text-dorado">Clave para reconocerlo</p>
        <p className="mt-1 text-lg font-semibold">{s.sello}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-3">
          {DIMENSIONES.filter((d) => s.dims[d.id]).map((d) => (
            <div key={d.id} className="vidrio p-5">
              <p className="etiqueta !text-cian">{d.nombre}</p>
              <p className="mt-1.5">{s.dims[d.id]}</p>
            </div>
          ))}
          {s.variantes && (
            <div className="vidrio p-5">
              <p className="etiqueta !text-nebulosa">Formas clínicas</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {s.variantes.map((v) => (
                  <li key={v.nombre} className="rounded-xl bg-white/5 p-3">
                    <p className="font-bold">{v.nombre}</p>
                    <p className="mt-1 text-sm text-tenue">{v.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="vidrio p-5">
            <p className="text-sm font-bold">Esencia de la constelación</p>
            <p className="mt-1 text-sm text-tenue">{g.esencia}</p>
          </div>
          <div className="vidrio p-5">
            <label htmlFor="comparar" className="text-sm font-bold">
              Comparar con…
            </label>
            <select
              id="comparar"
              className="campo mt-2"
              defaultValue=""
              onChange={(e) => e.target.value && router.push(`/sindromes/comparar?a=${s.slug}&b=${e.target.value}`)}
            >
              <option value="" disabled>
                Elige un síndrome
              </option>
              {SINDROMES.filter((x) => x.slug !== s.slug).map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.nombre}
                </option>
              ))}
            </select>
          </div>
          {casos.length > 0 && (
            <div className="vidrio p-5">
              <p className="text-sm font-bold">Practícalo en un caso</p>
              {casos.map((c) => (
                <Link key={c.id} href={`/casos/${c.id}`} className="mt-2 flex items-center gap-2 text-sm text-cian hover:underline">
                  <Icono nombre="estetoscopio" className="h-4 w-4" /> Caso {c.id}: {c.paciente}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

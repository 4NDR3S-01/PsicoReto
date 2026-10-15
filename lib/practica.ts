import { FUNCIONES, getFuncion, SIGNOS, slugify, type Funcion, type Signo } from "./contenido/funciones";
import { DIFERENCIALES } from "./contenido/diferenciales";
import { DIMENSIONES, SINDROMES, type Dimension, type Sindrome } from "./contenido/sindromes";

/* ───────────── Azar ───────────── */

export type Azar = () => number;

/** Generador reproducible (mulberry32): el reto diario es igual para todos el mismo día. */
export function azarSembrado(semilla: string): Azar {
  let a = 0;
  for (let i = 0; i < semilla.length; i++) a = (Math.imul(31, a) + semilla.charCodeAt(i)) | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function barajar<T>(xs: readonly T[], azar: Azar = Math.random): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const tomar = <T,>(xs: readonly T[], n: number, azar: Azar = Math.random) => barajar(xs, azar).slice(0, n);

export const signoDelDia = (fecha: string) => tomar(SIGNOS, 1, azarSembrado(`signo:${fecha}`))[0];

export const signosDe = (slug?: string | null) => {
  const f = slug ? getFuncion(slug) : undefined;
  return f ? f.apartados.flatMap((a) => a.signos) : SIGNOS;
};

/* ───────────── Pregunta de juego (formato único) ───────────── */

export type Opcion = { clave: string; texto: string };

export type PreguntaJuego = {
  id: string;
  tipo: "Definición" | "Significado" | "Planeta" | "Diferencial" | "Síndrome";
  enunciado: string;
  contexto?: string;
  pistas?: { dim: string; texto: string }[];
  opciones: Opcion[];
  correcta: string;
  explicacion?: string;
  /** Signo que se registra como acertado o fallado. */
  signo?: string;
};

const limpiar = (s: string) =>
  slugify(s)
    .replace(/-/g, " ")
    .replace(/\b(el|la|los|las|de|del)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Distractores: primero del mismo apartado, luego de la misma función, luego del resto. */
function distractores(s: Signo, n: number, azar: Azar): Signo[] {
  const f = getFuncion(s.funcion)!;
  const mismo = f.apartados[s.apartado].signos.filter((x) => x.id !== s.id);
  const funcion = f.apartados.flatMap((a) => a.signos).filter((x) => x.apartado !== s.apartado);
  const resto = SIGNOS.filter((x) => x.funcion !== s.funcion);
  const vistos = new Set([limpiar(s.nombre)]);
  const out: Signo[] = [];
  for (const x of [...barajar(mismo, azar), ...barajar(funcion, azar), ...barajar(resto, azar)]) {
    if (vistos.has(limpiar(x.nombre))) continue;
    vistos.add(limpiar(x.nombre));
    out.push(x);
    if (out.length === n) break;
  }
  return out;
}

export function preguntaDefinicion(s: Signo, azar: Azar = Math.random): PreguntaJuego {
  return {
    id: `def:${s.id}:${azar().toFixed(5)}`,
    tipo: "Definición",
    enunciado: "¿Qué signo corresponde a esta definición?",
    contexto: s.def,
    opciones: barajar([s, ...distractores(s, 3, azar)], azar).map((x) => ({ clave: x.id, texto: x.nombre })),
    correcta: s.id,
    explicacion: s.clave,
    signo: s.id,
  };
}

export function preguntaSignificado(s: Signo, azar: Azar = Math.random): PreguntaJuego {
  return {
    id: `sig:${s.id}:${azar().toFixed(5)}`,
    tipo: "Significado",
    enunciado: `¿Qué es «${s.nombre}»?`,
    opciones: barajar([s, ...distractores(s, 3, azar)], azar).map((x) => ({ clave: x.id, texto: x.def })),
    correcta: s.id,
    explicacion: s.clave,
    signo: s.id,
  };
}

export function preguntaPlaneta(s: Signo, azar: Azar = Math.random): PreguntaJuego {
  const otras = tomar(FUNCIONES.filter((f) => f.slug !== s.funcion), 3, azar);
  return {
    id: `pla:${s.id}:${azar().toFixed(5)}`,
    tipo: "Planeta",
    enunciado: `¿A qué función psíquica pertenece «${s.nombre}»?`,
    opciones: barajar([getFuncion(s.funcion)!, ...otras], azar).map((f) => ({ clave: f.slug, texto: f.nombre })),
    correcta: s.funcion,
    explicacion: s.def,
    signo: s.id,
  };
}

export function preguntasDiferenciales(n: number, azar: Azar = Math.random, slug?: string): PreguntaJuego[] {
  const pool = slug ? DIFERENCIALES.filter((d) => d.a.funcion === slug || d.b.funcion === slug) : DIFERENCIALES;
  return tomar(pool, n, azar).map((d) => {
    const v = tomar(d.vinetas, 1, azar)[0];
    const s = d[v.es];
    return {
      id: `dif:${d.id}:${azar().toFixed(5)}`,
      tipo: "Diferencial" as const,
      enunciado: "¿Cuál de los dos signos aparece?",
      contexto: v.texto,
      opciones: [
        { clave: d.a.id, texto: d.a.nombre },
        { clave: d.b.id, texto: d.b.nombre },
      ],
      correcta: s.id,
      explicacion: d.criterio,
      signo: s.id,
    };
  });
}

const PISTAS: Dimension[] = ["sintesis", "cognoscitivas", "afectivas", "conducta"];

function opcionesSindrome(s: Sindrome, azar: Azar): Sindrome[] {
  const mismo = barajar(SINDROMES.filter((x) => x.grupo === s.grupo && x.slug !== s.slug), azar);
  const otros = barajar(SINDROMES.filter((x) => x.grupo !== s.grupo), azar);
  return barajar([s, ...[...mismo.slice(0, 2), ...otros].slice(0, 3)], azar);
}

export function preguntasSindrome(n: number, azar: Azar = Math.random): PreguntaJuego[] {
  return tomar(SINDROMES.filter((s) => PISTAS.filter((d) => s.dims[d]).length >= 3), n, azar).map((s) => ({
    id: `sin:${s.slug}:${azar().toFixed(5)}`,
    tipo: "Síndrome" as const,
    enunciado: "¿Qué síndrome describen estos hallazgos?",
    pistas: PISTAS.filter((d) => s.dims[d]).map((d) => ({ dim: DIMENSIONES.find((x) => x.id === d)!.nombre, texto: s.dims[d]! })),
    opciones: opcionesSindrome(s, azar).map((x) => ({ clave: x.slug, texto: x.nombre })),
    correcta: s.slug,
    explicacion: s.sello,
  }));
}

/* ───────────── Partidas ───────────── */

/** Misión de un planeta: definiciones y significados de sus signos, más algún diferencial. */
export function mision(f: Funcion, n = 10, azar: Azar = Math.random): PreguntaJuego[] {
  const signos = f.apartados.flatMap((a) => a.signos);
  const total = Math.min(n, signos.length * 2);
  const difs = preguntasDiferenciales(Math.min(2, Math.floor(total / 5)), azar, f.slug);
  const elegidos = barajar(signos, azar);
  const qs: PreguntaJuego[] = [];
  for (let i = 0; qs.length < total - difs.length; i++) {
    const s = elegidos[i % elegidos.length];
    qs.push(i < elegidos.length && azar() < 0.6 ? preguntaDefinicion(s, azar) : preguntaSignificado(s, azar));
  }
  return barajar([...qs, ...difs], azar);
}

/** Reto del día: el mismo para todos en una fecha. */
export function retoDiario(fecha: string): PreguntaJuego[] {
  const azar = azarSembrado(`diario:${fecha}`);
  const signos = tomar(SIGNOS, 7, azar);
  return [
    ...signos.map((s, i) => (i % 3 === 0 ? preguntaPlaneta(s, azar) : i % 2 ? preguntaSignificado(s, azar) : preguntaDefinicion(s, azar))),
    ...preguntasDiferenciales(2, azar),
    ...preguntasSindrome(1, azar),
  ];
}

/** Prueba final: todo el temario. */
export function pruebaFinal(total = 30, azar: Azar = Math.random): PreguntaJuego[] {
  const nDif = 6;
  const nSin = 6;
  const nPla = 3;
  const signos = tomar(SIGNOS, total - nDif - nSin, azar);
  return barajar(
    [
      ...signos.slice(0, -nPla).map((s) => (azar() < 0.5 ? preguntaDefinicion(s, azar) : preguntaSignificado(s, azar))),
      ...signos.slice(-nPla).map((s) => preguntaPlaneta(s, azar)),
      ...preguntasDiferenciales(nDif, azar),
      ...preguntasSindrome(nSin, azar),
    ],
    azar,
  );
}

/* ───────────── Escritura (evocación libre) ───────────── */

function levenshtein(a: string, b: string) {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

export type Veredicto = "exacta" | "casi" | "no";

/** Acepta el nombre o un alias, sin tildes ni mayúsculas, con tolerancia a erratas. */
export function evaluarEscritura(respuesta: string, s: Signo): Veredicto {
  const r = limpiar(respuesta);
  if (!r) return "no";
  let mejor: Veredicto = "no";
  for (const c of [s.nombre, ...s.alias].map(limpiar)) {
    if (r === c) return "exacta";
    if (levenshtein(r, c) <= Math.max(1, Math.floor(c.length * 0.2))) mejor = "casi";
  }
  return mejor;
}

/* ───────────── Contrarreloj ───────────── */

export const opcionesPlaneta = (s: Signo, azar: Azar = Math.random): Funcion[] =>
  barajar([getFuncion(s.funcion)!, ...tomar(FUNCIONES.filter((f) => f.slug !== s.funcion), 3, azar)], azar);

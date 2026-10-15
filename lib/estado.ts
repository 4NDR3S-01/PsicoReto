import { FUNCIONES, SIGNOS, type Funcion, type Signo } from "./contenido/funciones";
import { CONSULTAS } from "./contenido/consultas";

/* ───────────── Fechas (hora local, AAAA-MM-DD) ───────────── */

export const hoy = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function sumarDias(fecha: string, n: number) {
  const [y, m, d] = fecha.split("-").map(Number);
  return hoy(new Date(y, m - 1, d + n));
}

/* ───────────── Modelo ───────────── */

/** Tarjeta de repaso espaciado (SM-2 simplificado). */
export type Ficha = { ef: number; intervalo: number; reps: number; olvidos: number; vence: string; alta: string };

export type Modo =
  | "mision"
  | "diario"
  | "fichas"
  | "emparejar"
  | "diferencial"
  | "contrarreloj"
  | "escritura"
  | "final"
  | "caso";

export type Partida = { id: string; fecha: string; modo: Modo; titulo: string; ok: number; total: number; xp: number };

export type Estado = {
  v: 1;
  xp: number;
  racha: number;
  mejorRacha: number;
  ultimoDia: string | null;
  /** XP ganada por día. */
  dias: Record<string, number>;
  /** Mejor resultado (0-100) de la misión de cada planeta. */
  misiones: Record<string, number>;
  explorado: Record<string, string>;
  fichas: Record<string, Ficha>;
  marcador: Record<string, { ok: number; ko: number }>;
  casos: Record<string, { ok: boolean; signos: number }>;
  partidas: Partida[];
  perfectas: number;
  finales: number[];
  ajustes: { nombre: string; avatar: string; meta: number; nuevas: number };
};

export const estadoInicial = (): Estado => ({
  v: 1,
  xp: 0,
  racha: 0,
  mejorRacha: 0,
  ultimoDia: null,
  dias: {},
  misiones: {},
  explorado: {},
  fichas: {},
  marcador: {},
  casos: {},
  partidas: [],
  perfectas: 0,
  finales: [],
  ajustes: { nombre: "", avatar: "🧑‍🚀", meta: 50, nuevas: 10 },
});

/** Acepta cualquier valor guardado y devuelve un Estado válido (descarta formatos antiguos). */
export function normalizar(x: unknown): Estado {
  const base = estadoInicial();
  if (!x || typeof x !== "object" || (x as { v?: number }).v !== 1 || !("xp" in x)) return base;
  const e = x as Partial<Estado>;
  return { ...base, ...e, v: 1, ajustes: { ...base.ajustes, ...e.ajustes } };
}

/* ───────────── XP, racha y rangos ───────────── */

export const XP = { acierto: 10, ficha: 5, mision: 20, perfecta: 30, caso: 30, diario: 50, explorar: 5 };

/** Racha vigente: se pierde si el último día activo fue antes de ayer. */
export function rachaActual(e: Estado) {
  if (!e.ultimoDia) return 0;
  const t = hoy();
  return e.ultimoDia === t || e.ultimoDia === sumarDias(t, -1) ? e.racha : 0;
}

export function ganarXp(e: Estado, xp: number): Estado {
  if (xp <= 0) return e;
  const t = hoy();
  const racha = rachaActual(e) + (e.ultimoDia === t ? 0 : 1);
  return {
    ...e,
    xp: e.xp + xp,
    racha,
    mejorRacha: Math.max(e.mejorRacha, racha),
    ultimoDia: t,
    dias: { ...e.dias, [t]: (e.dias[t] ?? 0) + xp },
  };
}

export const RANGOS = ["Cadete", "Observador/a", "Explorador/a", "Navegante", "Piloto", "Astronauta", "Comandante", "Astrónomo/a", "Leyenda galáctica"];

/** Cada nivel cuesta 50 XP más que el anterior: 100, 150, 200… */
export function nivel(xp: number) {
  let n = 1;
  let piso = 0;
  let costo = 100;
  while (xp >= piso + costo) {
    piso += costo;
    n++;
    costo += 50;
  }
  return { n, rango: RANGOS[Math.min(RANGOS.length - 1, Math.floor((n - 1) / 2))], actual: xp - piso, costo, pct: ((xp - piso) / costo) * 100 };
}

/* ───────────── Registro de actividad ───────────── */

export function registrarRespuestas(e: Estado, rs: { id: string; ok: boolean }[]): Estado {
  if (!rs.length) return e;
  const marcador = { ...e.marcador };
  for (const r of rs) {
    const m = marcador[r.id] ?? { ok: 0, ko: 0 };
    marcador[r.id] = r.ok ? { ...m, ok: m.ok + 1 } : { ...m, ko: m.ko + 1 };
  }
  return { ...e, marcador };
}

export function registrarPartida(e: Estado, p: Omit<Partida, "id" | "fecha">): Estado {
  const partida: Partida = { ...p, id: crypto.randomUUID(), fecha: new Date().toISOString() };
  const x = ganarXp(e, p.xp);
  return {
    ...x,
    partidas: [partida, ...x.partidas].slice(0, 200),
    perfectas: x.perfectas + (p.total >= 5 && p.ok === p.total ? 1 : 0),
  };
}

export const yaHizoDiario = (e: Estado) => e.partidas.some((p) => p.modo === "diario" && hoy(new Date(p.fecha)) === hoy());

/* ───────────── Planetas (funciones) ───────────── */

export const claveExplorado = (slug: string, apartado: number) => `${slug}:${apartado}`;

export function estrellas(pct: number | undefined) {
  if (pct === undefined) return 0;
  return pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
}

/** Un planeta se desbloquea al conseguir al menos una estrella en el anterior. */
export function desbloqueado(e: Estado, f: Funcion) {
  if (f.num === 1) return true;
  const previo = FUNCIONES[f.num - 2];
  return estrellas(e.misiones[previo.slug]) >= 1;
}

export function progresoPlaneta(e: Estado, f: Funcion) {
  const explorados = f.apartados.filter((_, i) => e.explorado[claveExplorado(f.slug, i)]).length / f.apartados.length;
  const signos = f.apartados.flatMap((a) => a.signos);
  const dom = signos.reduce((acc, s) => acc + (dominio(e, s.id) ?? 0), 0) / signos.length;
  const mision = (e.misiones[f.slug] ?? 0) / 100;
  return Math.round((explorados * 0.2 + mision * 0.4 + dom * 0.4) * 100);
}

export const progresoGalaxia = (e: Estado) =>
  Math.round(FUNCIONES.reduce((acc, f) => acc + progresoPlaneta(e, f), 0) / FUNCIONES.length);

/* ───────────── Fichas (SM-2 simplificado) ───────────── */

export type Calificacion = 0 | 1 | 2 | 3;
export const CALIFICACIONES: { valor: Calificacion; nombre: string; tecla: string }[] = [
  { valor: 0, nombre: "Otra vez", tecla: "1" },
  { valor: 1, nombre: "Difícil", tecla: "2" },
  { valor: 2, nombre: "Bien", tecla: "3" },
  { valor: 3, nombre: "Fácil", tecla: "4" },
];

const nuevaFicha = (): Ficha => ({ ef: 2.5, intervalo: 0, reps: 0, olvidos: 0, vence: hoy(), alta: hoy() });

export function proyectar(f: Ficha | undefined, c: Calificacion): Ficha {
  const p = f ?? nuevaFicha();
  let { ef, intervalo, reps, olvidos } = p;
  if (c === 0) {
    olvidos += reps > 0 ? 1 : 0;
    reps = 0;
    intervalo = 0;
    ef = Math.max(1.3, ef - 0.2);
  } else {
    if (c === 1) {
      intervalo = reps === 0 ? 1 : Math.max(intervalo + 1, Math.round(intervalo * 1.2));
      ef = Math.max(1.3, ef - 0.15);
    } else if (c === 2) {
      intervalo = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(intervalo * ef);
    } else {
      intervalo = reps === 0 ? 3 : Math.round(Math.max(intervalo, 1) * ef * 1.3);
      ef += 0.15;
    }
    reps += 1;
  }
  return { ...p, ef, intervalo, reps, olvidos, vence: sumarDias(hoy(), intervalo) };
}

export function calificarFicha(e: Estado, id: string, c: Calificacion): Estado {
  const x = { ...e, fichas: { ...e.fichas, [id]: proyectar(e.fichas[id], c) } };
  return registrarRespuestas(x, [{ id, ok: c >= 2 }]);
}

export const describirIntervalo = (d: number) =>
  d === 0 ? "hoy" : d === 1 ? "mañana" : d < 30 ? `${d} días` : `${Math.round(d / 30)} mes${d >= 45 ? "es" : ""}`;

export const pendientes = (e: Estado, signos: Signo[] = SIGNOS) =>
  signos.filter((s) => e.fichas[s.id] && e.fichas[s.id].vence <= hoy());

const nuevasHoy = (e: Estado) => Object.values(e.fichas).filter((f) => f.alta === hoy()).length;

/** Fichas vencidas primero; luego nuevas hasta el cupo diario (o `extra` más). */
export function colaFichas(e: Estado, signos: Signo[] = SIGNOS, extra = 0): Signo[] {
  const vencidas = pendientes(e, signos).sort((a, b) => e.fichas[a.id].vence.localeCompare(e.fichas[b.id].vence));
  const cupo = Math.max(0, e.ajustes.nuevas - nuevasHoy(e)) + extra;
  return [...vencidas, ...signos.filter((s) => !e.fichas[s.id]).slice(0, cupo)];
}

/* ───────────── Dominio ───────────── */

/** Dominio de un signo entre 0 y 1, o null si nunca se trabajó. */
export function dominio(e: Estado, id: string): number | null {
  const f = e.fichas[id];
  const m = e.marcador[id];
  const vistos = m ? m.ok + m.ko : 0;
  if (!f && !vistos) return null;
  const pf = f ? Math.min(1, f.intervalo / 21) : null;
  const pa = vistos ? (m!.ok / vistos) * Math.min(1, vistos / 3) : null;
  if (pf !== null && pa !== null) return 0.6 * pf + 0.4 * pa;
  return (pf ?? pa)!;
}

export const DOMINADO = 0.7;
export const dominados = (e: Estado) => SIGNOS.filter((s) => (dominio(e, s.id) ?? 0) >= DOMINADO).length;

/** Signos con más errores que aciertos o fichas olvidadas. */
export function fragiles(e: Estado, n = 12): Signo[] {
  return SIGNOS.map((s) => {
    const m = e.marcador[s.id];
    const f = e.fichas[s.id];
    return { s, peso: (m ? m.ko - m.ok * 0.5 : 0) + (f ? f.olvidos : 0), d: dominio(e, s.id) };
  })
    .filter((x) => x.d !== null && x.d < DOMINADO && x.peso > 0)
    .sort((a, b) => b.peso - a.peso)
    .slice(0, n)
    .map((x) => x.s);
}

/* ───────────── Logros ───────────── */

export type Logro = { id: string; icono: string; titulo: string; texto: string; ok: (e: Estado) => boolean };

const casosOk = (e: Estado) => Object.values(e.casos).filter((c) => c.ok).length;

export const LOGROS: Logro[] = [
  { id: "despegue", icono: "🚀", titulo: "Despegue", texto: "Completa tu primera partida", ok: (e) => e.partidas.length > 0 },
  { id: "orbita", icono: "🛰️", titulo: "En órbita", texto: "Consigue 3 estrellas en un planeta", ok: (e) => Object.values(e.misiones).some((p) => p >= 100) },
  { id: "xp500", icono: "✨", titulo: "Polvo de estrellas", texto: "Reúne 500 XP", ok: (e) => e.xp >= 500 },
  { id: "xp2000", icono: "🌟", titulo: "Supernova", texto: "Reúne 2000 XP", ok: (e) => e.xp >= 2000 },
  { id: "racha3", icono: "☄️", titulo: "Cometa", texto: "Racha de 3 días", ok: (e) => e.mejorRacha >= 3 },
  { id: "racha7", icono: "🌙", titulo: "Ciclo lunar", texto: "Racha de 7 días", ok: (e) => e.mejorRacha >= 7 },
  { id: "racha30", icono: "🌌", titulo: "Constante cósmica", texto: "Racha de 30 días", ok: (e) => e.mejorRacha >= 30 },
  { id: "perfecta", icono: "💎", titulo: "Sin un rasguño", texto: "Termina una partida sin errores", ok: (e) => e.perfectas > 0 },
  { id: "casos5", icono: "🩺", titulo: "Guardia nocturna", texto: "Acierta 5 casos clínicos", ok: (e) => casosOk(e) >= 5 },
  { id: "casostodos", icono: "🏥", titulo: "Jefe de servicio", texto: `Acierta los ${CONSULTAS.length} casos`, ok: (e) => casosOk(e) >= CONSULTAS.length },
  { id: "final", icono: "🏆", titulo: "Prueba superada", texto: "Saca 80% o más en la prueba final", ok: (e) => e.finales.some((p) => p >= 80) },
  { id: "dominio50", icono: "🧠", titulo: "Memoria estelar", texto: "Domina 50 signos", ok: (e) => dominados(e) >= 50 },
  { id: "galaxia", icono: "🪐", titulo: "Toda la galaxia", texto: "Desbloquea los 11 planetas", ok: (e) => FUNCIONES.every((f) => desbloqueado(e, f)) },
];

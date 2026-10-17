import { FUNCIONES, type Funcion } from "./contenido/funciones";
import { claveExplorado, estrellas, type Estado } from "./estado";

/* ───────────── Evolución: una forma nueva por cada nivel ───────────── */

export type Etapa = { nivel: number; nombre: string; texto: string };

/** Del nivel 1 al 10 el pato pasa de huevo a astronauta y de astronauta a criatura cósmica. */
export const ETAPAS: Etapa[] = [
  { nivel: 1, nombre: "Huevo estelar", texto: "Algo se mueve dentro. Gana XP para que eclosione." },
  { nivel: 2, nombre: "Patito recién nacido", texto: "¡Salió del cascarón! Todavía lleva un trocito en la cabeza." },
  { nivel: 3, nombre: "Patito cadete", texto: "Estrena su primer casco espacial." },
  { nivel: 4, nombre: "Pato astronauta", texto: "Ya tiene traje completo para salir a explorar." },
  { nivel: 5, nombre: "Pato propulsado", texto: "Lleva mochila propulsora: puede viajar entre planetas." },
  { nivel: 6, nombre: "Oficial de vuelo", texto: "Ganó la insignia dorada y un visor solar." },
  { nivel: 7, nombre: "Pato polvo de estrellas", texto: "Tanto viaje le dejó las plumas llenas de brillos cósmicos." },
  { nivel: 8, nombre: "Pato antena", texto: "Le brotaron antenas: capta señales de otras galaxias." },
  { nivel: 9, nombre: "Pato alienígena", texto: "Sus ojos y sus plumas cambiaron de color. Ya no es de este mundo." },
  { nivel: 10, nombre: "Pato nebulosa", texto: "Flota rodeado de un aura de nebulosa y un anillo propio." },
];

const LEYENDA = 11;

export function etapa(n: number): Etapa {
  if (n < LEYENDA) return ETAPAS[Math.max(1, n) - 1];
  const extra = n - LEYENDA + 1;
  return {
    nivel: n,
    nombre: "Leyenda cósmica",
    texto: `Lo corona${extra > 1 ? `n ${Math.min(5, extra)} estrellas` : " una estrella"}. Cada nivel nuevo suma brillo a su leyenda.`,
  };
}

/* ───────────── Accesorios: uno por planeta conquistado ───────────── */

export type Accesorio = { id: string; planeta: string; nombre: string; icono: string };

export const ACCESORIOS: Accesorio[] = [
  { id: "linterna", planeta: "conciencia", nombre: "Linterna de vigilia", icono: "🔦" },
  { id: "brujula", planeta: "orientacion", nombre: "Brújula", icono: "🧭" },
  { id: "lupa", planeta: "atencion", nombre: "Lupa", icono: "🔍" },
  { id: "bufanda", planeta: "memoria", nombre: "Bufanda del recuerdo", icono: "🧣" },
  { id: "gafas", planeta: "percepcion", nombre: "Gafas prisma", icono: "🕶️" },
  { id: "bombilla", planeta: "pensamiento", nombre: "Bombilla de ideas", icono: "💡" },
  { id: "megafono", planeta: "lenguaje", nombre: "Megáfono", icono: "📣" },
  { id: "corazon", planeta: "afectividad", nombre: "Corazón brillante", icono: "💖" },
  { id: "patines", planeta: "motricidad", nombre: "Patines cohete", icono: "🛼" },
  { id: "gorro", planeta: "fisiologicas", nombre: "Gorro de dormir", icono: "🌙" },
  { id: "mono", planeta: "relacion", nombre: "Moño de la amistad", icono: "🎀" },
];

export const accesorioDe = (planeta: string) => ACCESORIOS.find((a) => a.planeta === planeta)!;

/** Se gana el accesorio de un planeta al conseguir al menos una estrella en su misión. */
export const tieneAccesorio = (e: Estado, a: Accesorio) => estrellas(e.misiones[a.planeta]) >= 1;

/** Accesorio puesto, solo si sigue ganado (p. ej. tras reiniciar el progreso). */
export function accesorioPuesto(e: Estado) {
  const a = ACCESORIOS.find((x) => x.id === e.pato.accesorio);
  return a && tieneAccesorio(e, a) ? a.id : null;
}

/* ───────────── Lo que dice el pato en cada planeta ───────────── */

function lista(xs: string[]) {
  if (xs.length <= 1) return xs.join("");
  const vistos = xs.slice(0, 3);
  const resto = xs.length - vistos.length;
  return resto > 0 ? `${vistos.join(", ")} y ${resto} más` : `${vistos.slice(0, -1).join(", ")} y ${vistos.at(-1)}`;
}

export function dichoPlaneta(e: Estado, f: Funcion): string {
  const est = estrellas(e.misiones[f.slug]);
  const premio = accesorioDe(f.slug);
  const explorados = f.apartados.filter((_, i) => e.explorado[claveExplorado(f.slug, i)]).length;
  const grupos = f.apartados.map((a) => a.titulo.toLowerCase());

  if (est === 3) return `¡${f.nombre} es nuestro al 100%! Si quieres, repasamos con fichas para no olvidar nada.`;
  if (est >= 1) return `¡Conquistamos ${f.nombre} y me gané ${premio.icono} ${premio.nombre}! ¿Vamos por las 3 estrellas?`;
  if (explorados === 0)
    return `¡Aterrizamos en ${f.nombre}! Aquí los signos se agrupan en ${f.apartados.length} ${
      f.apartados.length === 1 ? "apartado" : "apartados"
    }: ${lista(grupos)}. Explorémoslos antes de la misión.`;
  if (explorados < f.apartados.length) return `Llevamos ${explorados} de ${f.apartados.length} apartados explorados. ¡Sigamos!`;
  return `Ya exploramos todo ${f.nombre}. Con 60% en la misión ganamos la primera estrella… ¡y yo ${premio.icono} ${premio.nombre}!`;
}

/** Frase del pato en el mapa según cómo va el viaje. */
export function dichoMapa(e: Estado) {
  const conquistados = FUNCIONES.filter((f) => estrellas(e.misiones[f.slug]) >= 1).length;
  if (conquistados === 0) return "¡Despeguemos hacia el primer planeta!";
  if (conquistados === FUNCIONES.length) return "¡Conquistamos toda la galaxia! Ahora a dominarla con 3 estrellas.";
  return `Llevamos ${conquistados} de ${FUNCIONES.length} planetas conquistados.`;
}

/** Iconos de línea (24×24). */

const rutas = {
  rayo: "M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z",
  fuego: "M12 21c-3.9 0-6.5-2.6-6.5-6.1 0-3.1 2-5.1 3.6-6.7.4 1.6 1.3 2.7 2.4 3.2-.2-3.2 1.2-6 3.6-8.4.3 3 1.8 4.6 3 6.2 1 1.4 1.4 2.7 1.4 4.4C19.5 18.4 16 21 12 21Z",
  mapa: "M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2ZM9 4.5v13M15 6.5v13",
  objetivo: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 12.8a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Z",
  estetoscopio: "M6 3.5v5a4.5 4.5 0 0 0 9 0v-5M6 3.5H4.5M15 3.5h1.5M10.5 13v2.5a4 4 0 0 0 8 0V13M18.5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  usuario: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c.8-3.6 3.8-6 7.5-6s6.7 2.4 7.5 6",
  estrella: "M12 3.2l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.6l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.2Z",
  escudo: "M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z",
  candado: "M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13v10h-13z",
  cohete: "M12 15.5 8.5 12c1.5-4.6 4.6-7.8 10-8.5-.7 5.4-3.9 8.5-8.5 10ZM8.5 12 5 11.5l2.5-3.5 3.5.5M12 15.5l.5 3.5 3.5-2.5-.5-3.5M6 18c-1 .5-1.5 1.5-1.5 1.5S5.5 19 6 18Z",
  trofeo: "M8 4.5h8v5a4 4 0 0 1-8 0v-5ZM8 6.5H4.5c0 3 1.5 4.5 3.7 4.8M16 6.5h3.5c0 3-1.5 4.5-3.7 4.8M12 13.5v3.5M8.5 20.5h7M9.5 17h5v3.5h-5z",
  fichas: "M7 7.5V5.2c0-.7.5-1.2 1.2-1.2h10.6c.7 0 1.2.5 1.2 1.2v9.6c0 .7-.5 1.2-1.2 1.2H17M4 8.8c0-.7.5-1.2 1.2-1.2h10.6c.7 0 1.2.5 1.2 1.2v10c0 .7-.5 1.2-1.2 1.2H5.2c-.7 0-1.2-.5-1.2-1.2v-10Z",
  enlazar: "M9.5 14.5l5-5M8 11l-2 2a3.5 3.5 0 0 0 5 5l2-2M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2",
  balanza: "M12 4v16M7 20h10M4 8h16M6 8l-3 6c0 1.7 1.3 3 3 3s3-1.3 3-3L6 8ZM18 8l-3 6c0 1.7 1.3 3 3 3s3-1.3 3-3l-3-6Z",
  reloj: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  lapiz: "M4 20l4-1L19 8l-3-3L5 16l-1 4ZM14 7l3 3",
  sol: "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4",
  buscar: "M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20.5 20.5l-5-5",
  libro: "M12 6.5C10 5 7.5 4.5 4 4.5v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-14c-3.5 0-6 .5-8 2ZM12 6.5v14",
  constelacion: "M5 18l4-7 6 3 4-9M5 18a1.5 1.5 0 1 0 0-.01M9 11a1.5 1.5 0 1 0 0-.01M15 14a1.5 1.5 0 1 0 0-.01M19 5a1.5 1.5 0 1 0 0-.01",
  derecha: "M5 12h14M13 6l6 6-6 6",
  izquierda: "M19 12H5M11 6l-6 6 6 6",
  cerrar: "M6 6l12 12M18 6 6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  equis: "M7 7l10 10M17 7 7 17",
  salir: "M14 4h4.5c.8 0 1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5H14M10 16l-4-4 4-4M6 12h10",
  nube: "M7 18.5h10.5a4 4 0 0 0 .6-8A6 6 0 0 0 6.6 11 3.75 3.75 0 0 0 7 18.5Z",
  comparar: "M8 4v16M16 4v16M3.5 8.5 8 4l4.5 4.5M11.5 15.5 16 20l4.5-4.5",
} as const;

export type NombreIcono = keyof typeof rutas;

const RELLENOS: NombreIcono[] = ["rayo", "fuego", "estrella", "escudo"];

export function Icono({ nombre, className = "h-5 w-5", relleno }: { nombre: NombreIcono; className?: string; relleno?: boolean }) {
  const lleno = relleno ?? RELLENOS.includes(nombre);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={lleno ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={lleno ? 1 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={rutas[nombre]} />
    </svg>
  );
}

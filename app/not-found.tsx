import Link from "next/link";
import { Planeta } from "@/components/planeta";

export default function NoEncontrada() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <Planeta slug="relacion" tam={96} bloqueado className="flotar" />
      <p className="etiqueta mt-4">Error 404</p>
      <h1 className="text-3xl font-bold">Este rincón de la galaxia no existe</h1>
      <p className="text-tenue">Puede que el enlace esté mal escrito.</p>
      <Link href="/mapa" className="boton boton-cian mt-4">
        Volver al mapa
      </Link>
    </main>
  );
}

# PsicoReto

Aplicación web de estudio para **Semiología y Psicopatología I**. Convierte el material
del curso (procesos y funciones psicológicas + síndromes psicopatológicos) en una
experiencia de aprendizaje guiada: unidades, palabras clave, casos clínicos, retos y
repaso espaciado, con progreso, XP, rachas y logros.

> El contenido proviene de los apuntes de la asignatura (docente: Psi. Clin. Paola
> Intriago Alarcón, Mg). No se inventan datos clínicos.

## Funcionalidades

- **Ruta de aprendizaje** con 12 unidades y niveles de progreso por unidad.
- **Palabras clave** con definiciones y fichas de repaso.
- **Casos clínicos** con viñeta, preguntas y corrección explicada.
- **Retos**: flashcards, emparejar término–definición, test rápido e identificación de síntomas.
- **Modo examen** cronometrado, con autocorrección y preguntas de todo el temario.
- **Repaso espaciado** (sistema Leitner) de los términos fallados.
- **Gamificación**: XP, niveles, racha diaria, meta diaria, insignias, logros,
  estadísticas y historial de actividad.
- **Glosario** y **fichas de síndromes** buscables.
- **Perfil** con avatar, modo oscuro, sonido y gestión de cuenta.
- Sincronización opcional con la nube (Supabase) y respaldo local en el navegador.

## Tecnologías

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Supabase](https://supabase.com) para autenticación y persistencia

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Crea un archivo `.env` con tus credenciales de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Sin Supabase la app funciona igual, guardando el progreso solo en el navegador.
Para sincronizar entre dispositivos, ejecuta `supabase/schema.sql` en el SQL Editor
de tu proyecto de Supabase.

## Scripts

```bash
npm run dev     # servidor de desarrollo
npm run build   # compilación de producción
npm run start   # servidor de producción
npm run lint    # análisis estático
```

## Identidad visual

Marca e interfaz propias de PsicoReto: logotipo Ψ (símbolo de la psicología),
paleta violeta/índigo con acentos turquesa y ámbar, tipografías geométricas
(Sora + Plus Jakarta Sans) y componentes de elevación suave. No reproduce la
apariencia de otras aplicaciones.

## Estructura

```
app/                 rutas (login, inicio, unidades, casos, retos, examen, repaso, …)
components/          UI compartida (logo, navegación, runner de quizzes, tarjetas)
lib/data/            contenido de la asignatura (unidades, casos, síndromes, datos)
lib/progress.ts      progreso, XP, rachas, logros y repaso espaciado
lib/quiz.ts          generadores de preguntas
supabase/schema.sql  tabla y políticas de progreso
```

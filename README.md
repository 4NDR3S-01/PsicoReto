# Semiopsique

Juego de estudio para **Psicopatología I: Semiología y fenomenología**. La materia se
recorre como una galaxia: cada función psíquica es un planeta que se explora, se
conquista con misiones y desbloquea el siguiente.

## Qué incluye

- **Inicio de sesión** directo al entrar (Supabase Auth) y progreso sincronizado.
- **Mapa galáctico** con 11 planetas (conciencia, orientación, atención, memoria,
  percepción, pensamiento, lenguaje, afectividad, conducta motora, sueño e ingesta,
  relación) y la **prueba final**.
- **Planetas**: secciones para explorar los 261 signos y una **misión** de 10 preguntas
  con 3 escudos. 60 % = ⭐, 80 % = ⭐⭐, 100 % = ⭐⭐⭐. Una estrella desbloquea el siguiente.
- **Retos**: reto del día, fichas con repetición espaciada, emparejar, diferencial,
  contrarreloj, escritura y prueba final cronometrada.
- **Casos clínicos**: 21 historias en las que se marcan los signos presentes y se elige
  el síndrome.
- **Constelaciones**: 21 síndromes descritos en las 7 dimensiones del examen mental, con
  comparador lado a lado. **Glosario** con buscador.
- **Gamificación**: XP, niveles y rangos, racha diaria, meta diaria, logros e historial.

El contenido se redactó a partir de los apuntes de la asignatura (docente: Psi. Clin.
Paola Intriago Alarcón, Mg).

## Puesta en marcha

```bash
npm install
npm run dev
```

Crea un archivo `.env` con:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Para guardar el progreso en la nube, ejecuta `supabase/schema.sql` en el SQL Editor de
Supabase. Sin esa tabla el progreso se guarda solo en el navegador.

## Estructura

```
app/page.tsx           inicio de sesión
app/(juego)/           mapa, planeta, retos, casos, sindromes, glosario, yo
components/            HUD, motor de partidas, planetas, UI
lib/contenido/         funciones y signos, síndromes, casos, diferenciales
lib/estado.ts          XP, racha, niveles, misiones, fichas (SM-2) y logros
lib/practica.ts        generadores de preguntas
```

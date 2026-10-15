/**
 * Cuadros sindrómicos, a partir de los apuntes «Síndromes — Psicopatología I 2026».
 * Cada síndrome se describe con las mismas siete dimensiones del examen mental
 * para que puedan compararse fila a fila.
 */

export const DIMENSIONES = [
  { id: "descripcion", nombre: "Descripción general" },
  { id: "sintesis", nombre: "Funciones de síntesis" },
  { id: "relacion", nombre: "Funciones de relación" },
  { id: "intelecto", nombre: "Capacidades intelectuales" },
  { id: "cognoscitivas", nombre: "Funciones cognoscitivas" },
  { id: "afectivas", nombre: "Funciones afectivas" },
  { id: "conducta", nombre: "Conducta y funciones conativas" },
] as const;

export type Dimension = (typeof DIMENSIONES)[number]["id"];

export type Grupo = { id: string; nombre: string; esencia: string };

export type Sindrome = {
  slug: string;
  nombre: string;
  grupo: string;
  /** Rasgo que lo distingue en una línea. */
  sello: string;
  dims: Partial<Record<Dimension, string>>;
  variantes?: { nombre: string; texto: string }[];
};

export const GRUPOS: Grupo[] = [
  {
    id: "agudos",
    nombre: "Orgánicos agudos",
    esencia:
      "Comienzo generalmente brusco, alteración de las funciones de síntesis y cognoscitivas, con el descenso del nivel de vigilia como síntoma cardinal. Tienden a evolucionar pronto a la curación si la causa se trata; si no, al deterioro irreversible o la muerte.",
  },
  {
    id: "cronicos",
    nombre: "Orgánicos crónicos",
    esencia:
      "Lo opuesto a los agudos: la vigilia y las sensopercepciones apenas se alteran, y sobresale la afectación de las capacidades intelectuales y del carácter. Su esencia es la desorganización de la personalidad, con escasa o nula reversión.",
  },
  {
    id: "esquizofrenico",
    nombre: "Esquizofrénico",
    esencia:
      "Del griego esquizo (roto) y freno (mente): expresa una desorganización importante de las funciones psíquicas. Su elemento cardinal es la disociación ideoafectivoconativa.",
  },
  {
    id: "delirantes",
    nombre: "Delirantes",
    esencia:
      "Presencia de ideas delirantes, afectación global de las funciones de relación y conservación relativa de las funciones de síntesis.",
  },
  {
    id: "afectivos",
    nombre: "Afectivos",
    esencia:
      "Su esencia son las manifestaciones afectivas y la afectación global de las necesidades, sin alteración notable de las sensopercepciones.",
  },
  {
    id: "disquineticos",
    nombre: "Discinéticos",
    esencia:
      "La manifestación esencial es la alteración de los movimientos, anormalmente disminuidos (estuporoso) o aumentados (hipercinético).",
  },
  {
    id: "otros",
    nombre: "Hipocondríaco, asténico y psicopático",
    esencia:
      "Cuadros definidos por un eje dominante: el temor a la enfermedad, el agotamiento fácil o los patrones inadaptativos de conducta.",
  },
];

export const SINDROMES: Sindrome[] = [
  {
    slug: "obnubilacion",
    nombre: "Síndrome de obnubilación",
    grupo: "agudos",
    sello: "Hay que estimularlo con fuerza para comunicarse; sin síntomas productivos.",
    dims: {
      descripcion: "Enfermo tranquilo, hipomímico, que descuida sus hábitos si no se le ayuda.",
      sintesis: "Vigilia baja, atención distráctil, memoria disminuida, orientación muy grosera.",
      relacion: "Afectadas globalmente.",
      intelecto: "Disminuidas.",
      cognoscitivas: "Sin síntomas productivos; necesita estímulos fuertes para comunicarse; pensamiento lento.",
      afectivas: "Indiferencia.",
      conducta: "Abulia e hipoquinesia.",
    },
  },
  {
    slug: "delirium",
    nombre: "Síndrome de delirium",
    grupo: "agudos",
    sello: "Riqueza alucinatoria visual y táctil con orientación fluctuante y agitación.",
    dims: {
      descripcion: "Paciente agitado, sudoroso y tembloroso.",
      sintesis:
        "Vigilia baja; atención distráctil; memoria disminuida con evocación residual al superar el cuadro; comprensión disminuida; orientación fluctuante: por momentos se ubica en espacio y persona y al instante está totalmente desorientado.",
      relacion: "Afectadas globalmente.",
      intelecto: "Disminuidas.",
      cognoscitivas:
        "Notable riqueza alucinatoria, sobre todo visual y táctil: animales repugnantes que se le enciman, temas cósmicos o catastróficos con riesgo de muerte; a veces agradables y en miniatura. Pensamiento disgregado y perseverante, ligado a las alucinaciones.",
      afectivas: "Variables según las alucinaciones; con frecuencia ansiedad y terror.",
      conducta:
        "Agitación a grandes espacios, defendiéndose de sus presuntos agresores, con riesgo de lanzarse al vacío o golpearse. Temblores muy marcados, sobre todo en el delirium alcohólico.",
    },
  },
  {
    slug: "oniroide",
    nombre: "Síndrome oniroide",
    grupo: "agudos",
    sello: "Alucinaciones escénicas no angustiosas vividas con beatífica complacencia.",
    dims: {
      descripcion: "Actitud contemplativa, hipomímico, descuido de hábitos si no hay tutela.",
      sintesis:
        "Vigilia baja; atención distráctil salvo hacia sus vivencias alucinatorias, donde parece hiperconcentrado; memoria disminuida al superar el cuadro; orientación alopsíquica tomada y autopsíquica conservada.",
      relacion: "Globalmente afectadas; comprensión disminuida.",
      intelecto: "Disminuidas.",
      cognoscitivas:
        "Riqueza alucinatoria visual de tipo escénico con temas no angustiosos, que explican su pasividad; pensamiento disgregado, divagante y lento.",
      afectivas: "Beatífica complacencia.",
      conducta: "Contemplativa, inmóvil.",
    },
  },
  {
    slug: "crepuscular",
    nombre: "Síndrome de estado crepuscular",
    grupo: "agudos",
    sello: "Agitación agresiva con amnesia total del episodio.",
    dims: {
      descripcion: "Enfermo agitado, sudoroso y agresivo.",
      sintesis:
        "Vigilia muy baja; atención distráctil para lo ajeno a sus alucinaciones; amnesia total al concluir el cuadro (en el delirium y el oniroide se evoca algo de forma fragmentaria); comprensión disminuida; desorientación total y sin fluctuaciones.",
      relacion: "Tomadas.",
      intelecto: "Tomadas.",
      cognoscitivas: "Alucinaciones sobre todo visuales y terroríficas; pensamiento y lenguaje prácticamente nulos.",
      afectivas: "Agresividad, ansiedad, pánico.",
      conducta: "Agresiva, destructiva, fugitiva y vinculada con las alucinaciones.",
    },
  },
  {
    slug: "confusion-mental",
    nombre: "Síndrome de confusión mental",
    grupo: "agudos",
    sello: "Agitación limitada a la cama con movimientos carfológicos.",
    dims: {
      descripcion:
        "Agitación limitada a su cama, con movimientos sin propósito como enrollar la sábana (carfológicos, de alto valor diagnóstico); expresión de perplejidad.",
      sintesis: "Vigilia a punto de abolirse, atención muy distráctil, memoria y comprensión abolidas, desorientación total y sin fluctuaciones.",
      relacion: "Abolidas.",
      intelecto: "Prácticamente nulas.",
      cognoscitivas: "Predominio de ilusiones visuales inferidas por la observación; pensamiento incoherente.",
      afectivas: "Indiferencia.",
      conducta: "Agitación limitada, a veces con rasgos profesionales: repite movimientos propios de su trabajo habitual.",
    },
  },
  {
    slug: "oligofrenico",
    nombre: "Síndrome oligofrénico",
    grupo: "cronicos",
    sello: "Respuestas afectivas infantiles y pensamiento concreto, con memoria mecánica.",
    dims: {
      descripcion: "Frecuentemente distraído, descuidado en su presencia.",
      sintesis: "Vigilia normal, atención distráctil, memoria a veces aumentada de forma mecánica, desorientación solo en los casos más graves.",
      relacion: "Afectadas globalmente, comparables a las de un niño.",
      intelecto: "Muy disminuidas.",
      cognoscitivas: "Sin alteraciones sensoperceptivas; pensamiento concreto.",
      afectivas:
        "Respuestas infantiles: intolerancia a la frustración, incapacidad para posponer satisfacciones, cambios afectivos bruscos, dependencia y sugestionabilidad.",
      conducta: "Inconsistente y pueril; adaptación creadora limitada.",
    },
  },
  {
    slug: "demencial",
    nombre: "Síndrome demencial",
    grupo: "cronicos",
    sello: "Deterioro de la memoria, primero de fijación y luego de evocación, con pérdida de hábitos.",
    dims: {
      descripcion: "Aspecto descuidado, comunicación limitada.",
      sintesis: "Vigilia normal; atención distráctil; memoria muy tomada, sobre todo la de fijación, después también la de evocación; desorientación en casos avanzados.",
      relacion: "Globalmente afectadas.",
      intelecto: "Muy disminuidas.",
      cognoscitivas: "Pensamiento concreto, perseverante, prolijo, a veces delirante.",
      afectivas: "Indiferencia o labilidad según el caso; explosividad.",
      conducta: "Afectación de hábitos y trastornos globales de las necesidades.",
    },
  },
  {
    slug: "amnesico-confabulatorio",
    nombre: "Síndrome amnésico confabulatorio",
    grupo: "cronicos",
    sello: "Grave amnesia de fijación con confabulaciones y orientación sorprendentemente conservada.",
    dims: {
      descripcion: "Aspecto descuidado, distraído.",
      sintesis:
        "Vigilia normal; atención distráctil; memoria muy tomada, sobre todo la de fijación reciente (olvida que minutos antes lo visitó su esposa); confabulaciones; orientación sorprendentemente conservada pese a la amnesia.",
      intelecto: "Disminuidas.",
      cognoscitivas: "Pensamiento concreto, perseverante, prolijo.",
      afectivas: "Generalmente apatía; a veces labilidad o rigidez afectiva.",
      conducta: "Hipobulia o abulia, descuido de hábitos, alteración del sueño y de la alimentación.",
    },
  },
  {
    slug: "apatoabulico",
    nombre: "Síndrome apatoabúlico",
    grupo: "cronicos",
    sello: "Indiferencia y abulia con hipoquinesia; puede llegar a la desorientación apática.",
    dims: {
      descripcion: "Aspecto descuidado, facies indiferente.",
      sintesis: "Vigilia normal, atención distráctil, hipomnesia; puede llegar a la desorientación apática.",
      relacion: "Muy afectadas.",
      intelecto: "Disminuidas.",
      cognoscitivas: "Síntomas residuales en percepción y pensamiento; curso asociativo lentificado.",
      afectivas: "Indiferencia.",
      conducta: "Abulia, hipoquinesia, afectación de necesidades y de hábitos.",
    },
  },
  {
    slug: "esquizofrenico",
    nombre: "Síndrome esquizofrénico",
    grupo: "esquizofrenico",
    sello: "Disociación ideoafectivoconativa con alucinaciones auditivas y síntesis conservada.",
    dims: {
      descripcion: "Aspecto descuidado, aislamiento, dificultades de comunicación.",
      sintesis: "Vigilia normal, atención orientada, memoria sin alteraciones, orientación conservada.",
      relacion: "Afectación global.",
      intelecto: "Sin gran alteración.",
      cognoscitivas: "Riqueza alucinatoria sobre todo auditiva; pensamiento autista; bloqueo; disgregación.",
      afectivas: "Disociación ideoafectiva, ambivalencia afectiva.",
      conducta: "Abulia, conducta incomprensible.",
    },
  },
  {
    slug: "paranoico",
    nombre: "Síndrome paranoico",
    grupo: "delirantes",
    sello: "Delirio único, sistematizado y lógico, sin alucinaciones y con la personalidad conservada.",
    dims: {
      descripcion: "Presencia y comunicación conservadas.",
      sintesis: "Vigilia normal, atención a veces hipervigilante, memoria conservada y en ocasiones aumentada, orientación conservada.",
      relacion: "Afectadas solo en lo relativo al tema delirante.",
      intelecto: "Normales o altas.",
      cognoscitivas: "Sin trastornos sensoperceptivos; delirio único con argumentación lógica.",
      afectivas: "Conservadas, excepto en lo relativo al delirio.",
      conducta: "Hábitos conservados.",
    },
  },
  {
    slug: "paranoide",
    nombre: "Síndrome paranoide",
    grupo: "delirantes",
    sello: "Delirios de daño y persecución con alucinaciones auditivas y actitud recelosa.",
    dims: {
      descripcion: "Aspecto descuidado y actitud recelosa.",
      sintesis: "Vigilia normal, atención hipervigilante, memoria conservada, orientación conservada.",
      relacion: "Globalmente afectadas.",
      intelecto: "Conservadas.",
      cognoscitivas:
        "Alucinaciones e ilusiones auditivas verbales; ideas delirantes de daño, persecución y referencia, a veces de grandeza o celos.",
      afectivas: "Ansiedad, agresividad.",
      conducta: "Concordante con el delirio; afectación de necesidades y hábitos.",
    },
  },
  {
    slug: "automatismo-psiquico",
    nombre: "Síndrome de automatismo psíquico",
    grupo: "delirantes",
    sello: "Pseudoalucinaciones y delirio de influencia o robo del pensamiento, con atención volcada hacia adentro.",
    dims: {
      descripcion: "Aspecto descuidado.",
      sintesis: "Vigilia normal, atención dirigida hacia adentro, memoria conservada, orientación conservada.",
      relacion: "Globalmente afectadas.",
      intelecto: "Conservadas.",
      cognoscitivas:
        "Pseudoalucinaciones auditivas, trastorno del esquema corporal, despersonalización, desrealización, pensamiento autista, bloqueo, delirio de influencia y de robo del pensamiento.",
      afectivas: "Apatía, disociación ideoafectiva.",
      conducta: "Hipobulia, alteración de necesidades y hábitos.",
    },
  },
  {
    slug: "maniaco",
    nombre: "Síndrome maníaco",
    grupo: "afectivos",
    sello: "Hipertimia con fuga de ideas, hiperbulia y aumento de todas las necesidades.",
    dims: {
      descripcion: "Aspecto llamativo por vestuario y maquillaje exagerados.",
      sintesis: "Vigilia algo aumentada, atención hipervigilante, memoria aumentada, orientación conservada.",
      relacion: "Globalmente afectadas.",
      intelecto: "Conservadas.",
      cognoscitivas: "Sensopercepciones sin alteraciones; pensamiento acelerado, fuga de ideas.",
      afectivas: "Hipertimia, labilidad afectiva, disforia.",
      conducta: "Hiperbulia, hiperquinesia improductiva, aumento de necesidades con bulimia, hipererotismo, hipersociabilidad.",
    },
  },
  {
    slug: "depresivo",
    nombre: "Síndrome depresivo",
    grupo: "afectivos",
    sello: "Hipotimia con pensamiento lento, minusvalía e insomnio, anorexia e hipoerotismo.",
    dims: {
      descripcion: "Aspecto descuidado y postura flexionada.",
      sintesis: "Vigilia normal, atención hiperconcentrada, memoria disminuida, orientación conservada.",
      relacion: "Minusvalía, retraimiento, reducción de intereses.",
      intelecto: "Conservadas.",
      cognoscitivas:
        "Sensopercepciones generalmente sin alteraciones; pensamiento de curso lento; ideas hipocondríacas y, en casos severos, ideas delirantes e ideas suicidas.",
      afectivas: "Hipotimia, ansiedad.",
      conducta: "Hipobulia, hipoquinesia, alteración de hábitos; insomnio, anorexia, hipoerotismo, aislamiento social.",
    },
  },
  {
    slug: "ansioso",
    nombre: "Síndrome afectivo ansioso",
    grupo: "afectivos",
    sello: "Ansiedad con descarga vegetativa e insomnio de conciliación.",
    dims: {
      descripcion: "Aspecto angustiado, pupilas dilatadas, manos frías y sudorosas.",
      sintesis: "Vigilia normal o alta, atención discretamente hipervigilante, memoria algo disminuida, orientación conservada.",
      relacion: "Conservadas.",
      intelecto: "Conservadas.",
      cognoscitivas: "Cenestopatías ocasionales, pensamiento acelerado, temor a enloquecer o morir, expectación de malas noticias.",
      afectivas: "Ansiedad, irritabilidad, disforia.",
      conducta:
        "Hiperbulia, hiperquinesia sobre todo de pequeños movimientos, afectación variable de necesidades con insomnio vespertino característico. Taquicardia, palpitaciones, sudoración palmar, piloerección, hipermotilidad intestinal.",
    },
  },
  {
    slug: "estuporoso",
    nombre: "Síndrome estuporoso",
    grupo: "disquineticos",
    sello: "Inmovilidad y mutismo con un grado variable de claridad de conciencia (a diferencia del coma).",
    dims: {
      descripcion: "Aspecto descuidado.",
      sintesis: "Vigilia normal o baja, atención generalmente hiperconcentrada, memoria normal o disminuida, orientación variable.",
      relacion: "Globalmente afectadas.",
      intelecto: "Conservadas.",
      cognoscitivas: "Sin alteraciones específicas.",
      afectivas: "La facies puede expresar pánico, indiferencia, perplejidad o tristeza.",
      conducta: "Abulia, acinesia, alteración total de necesidades y hábitos.",
    },
    variantes: [
      { nombre: "Estupor histriónico", texto: "Teatralidad, risa y llanto fluctuantes, noxa reciente y ganancia evidente." },
      { nombre: "Estupor situacional", texto: "Sin antecedentes patológicos, ante una situación de gran significado; facies de pánico, sudorosa; sin ganancia." },
      { nombre: "Estupor depresivo", texto: "Inmovilidad total, mutismo, negativismo pasivo, facies de tristeza marcada (omega); quejidos y lágrimas espontáneas." },
      { nombre: "Estupor catatónico", texto: "Inmovilidad, negativismo, mutismo, flexibilidad cérea, retención urinaria, sialorrea; gran actividad delirante y alucinatoria." },
      { nombre: "Estupor orgánico", texto: "Toma de conciencia de tipo confusional que deja amnesia de las crisis." },
    ],
  },
  {
    slug: "hipercinetico",
    nombre: "Síndrome hipercinético",
    grupo: "disquineticos",
    sello: "Aumento de la actividad motora hasta la agitación, con pérdida de la adaptación al medio.",
    dims: {
      descripcion: "Paciente en extremo inquieto, que puede llegar a la agitación psicomotora.",
      conducta: "Aumento de los movimientos voluntarios o involuntarios y notable afectación de la adaptación creadora al medio.",
    },
    variantes: [
      { nombre: "Agitación catatónica", texto: "Negativismo, estereotipias, disgregación y a veces incoherencia, manierismos, llanto o risas, alucinaciones y delirios." },
      { nombre: "Excitación maníaca", texto: "Predomina la hipertimia placentera de la manía o hipomanía con todo su cortejo sintomático." },
      { nombre: "Excitación histérica", texto: "Teatralidad, egocentrismo, estrechamiento de la conciencia." },
      { nombre: "Furor epiléptico", texto: "Agitación en extremo intensa, de brutalidad extrema." },
    ],
  },
  {
    slug: "hipocondriaco",
    nombre: "Síndrome hipocondríaco",
    grupo: "otros",
    sello: "Temor a la muerte por una enfermedad grave, con autoobservación corporal constante.",
    dims: {
      descripcion: "Comunicación desarrollada en terminología médica.",
      sintesis: "Vigilia normal, atención hiperconcentrada en las funciones corporales, memoria y orientación conservadas.",
      intelecto: "Normales.",
      cognoscitivas: "Cenestopatías; en casos severos, alucinaciones y delirios.",
      afectivas: "Ansiedad, a veces hipotimia.",
      conducta: "Visitas reiteradas al médico sin justificación objetiva; discreta afectación de necesidades.",
    },
  },
  {
    slug: "astenico",
    nombre: "Síndrome asténico",
    grupo: "otros",
    sello: "Agotamiento fácil con irritabilidad e intolerancia a los ruidos.",
    dims: {
      descripcion: "Aspecto expresivo de cansancio.",
      sintesis: "Vigilia normal, atención discretamente distráctil, hipomnesia de fijación y evocación, orientación normal.",
      relacion: "Conservadas.",
      intelecto: "Conservadas.",
      cognoscitivas: "Hiperestesia, cenestopatías, torpeza asociativa.",
      afectivas: "Irritabilidad y disforia.",
      conducta: "Agotamiento fácil, sueño fásico, disfunciones sexuales.",
    },
  },
  {
    slug: "psicopatico",
    nombre: "Síndrome psicopático",
    grupo: "otros",
    sello: "Patrones inadaptativos de relación y control de impulsos con síntesis intacta.",
    dims: {
      descripcion: "No específica.",
      sintesis: "Sin alteraciones.",
      relacion: "Patrones inadaptativos en las relaciones consigo mismo, con los demás y con las cosas.",
      intelecto: "Conservadas.",
      cognoscitivas: "Sin alteraciones específicas.",
      afectivas: "Inseguridad, labilidad.",
      conducta: "Dificultades en el control de impulsos; dificultades sexuales.",
    },
  },
];

export const getSindrome = (slug: string) => SINDROMES.find((s) => s.slug === slug);
export const getGrupo = (id: string) => GRUPOS.find((g) => g.id === id)!;

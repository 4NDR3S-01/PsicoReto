/**
 * Atlas de funciones psíquicas.
 * Redactado a partir de los apuntes de Semiología de los procesos y funciones
 * psicológicas (Psicopatología I, 2026). Cada signo: [nombre, definición, clave clínica?, otros nombres?]
 */

export type Signo = {
  id: string;
  nombre: string;
  def: string;
  clave?: string;
  alias: string[];
  funcion: string;
  apartado: number;
};

export type Apartado = { titulo: string; nota?: string; signos: Signo[] };

export type Funcion = {
  slug: string;
  num: number;
  nombre: string;
  breve: string;
  entrada: string;
  apartados: Apartado[];
};

type S = [nombre: string, def: string, clave?: string, alias?: string];
type RawApartado = { titulo: string; nota?: string; signos: S[] };
type RawFuncion = Omit<Funcion, "apartados" | "num"> & { apartados: RawApartado[] };

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const raw: RawFuncion[] = [
  {
    slug: "conciencia",
    nombre: "Conciencia",
    breve: "Nivel de vigilia y claridad del campo",
    entrada:
      "Proceso psicológico de orden superior que ejerce el control ejecutivo del pensamiento y la acción. Por eso, cuando se altera, arrastra en mayor o menor grado a la atención, la percepción, la memoria, el pensamiento, la motricidad y la afectividad.",
    apartados: [
      {
        titulo: "Cuantitativas por elevación",
        nota: "El nivel de vigilia sube por encima de lo normal.",
        signos: [
          ["Awareness", "Claridad de conciencia: estado funcional en el que se reciben y procesan con sentido los estímulos internos y externos y se emite una respuesta, con percepción, atención y aprendizaje óptimos.", "Es el punto de referencia normal contra el que se comparan las alteraciones.", "Claridad de conciencia"],
          ["Hipervigilancia", "Aumento de la sensibilidad sensorial, de la actividad motora y de la intensidad emocional, con rastreo constante de posibles amenazas que deja a la persona irritable y agotada.", "Aparece en intoxicaciones y situaciones de estrés intenso."],
          ["Hiperfrenia", "Grado máximo de hipervigilancia: una conciencia exagerada del entorno y de sí mismo."],
        ],
      },
      {
        titulo: "Cuantitativas por disminución",
        nota: "Escalones de descenso progresivo del nivel de conciencia.",
        signos: [
          ["Obnubilación", "Primer escalón de descenso: cuesta mantener la alerta y solo se perciben estímulos de cierta intensidad. Se deterioran atención, percepción, pensamiento y memoria, pero el paciente aún reconoce y ejecuta con lentitud órdenes sencillas.", "Le pide que saque la lengua o dé la mano y lo hace, aunque tarde. Frecuente en intoxicaciones, meningitis, traumatismos."],
          ["Somnolencia", "Estado en que el paciente está despierto pero se duerme en cuanto le falta estimulación. Se siente lento y adormecido; reflejos como la tos y la deglución están presentes pero reducidos y el tono muscular disminuye.", "Hay que distinguirla de la somnolencia normal previa al sueño.", "Letargia, sopor"],
          ["Estupor", "Falta de reacción y de atención al ambiente: el paciente permanece inmóvil y solo alcanza una alerta ligera con estímulos muy potentes. No emite conducta intencional y sus escasas respuestas verbales son incoherentes.", "Es imposible explorar el contenido del pensamiento."],
          ["Confusión mental", "Concepción desordenada de la realidad con desorientación total: el paciente no comprende lo que ocurre a su alrededor y, pese a esforzarse, no logra un diálogo comprensible.", "Rasgo típico: facies de extrañeza.", "Estado confusional"],
          ["Coma", "Suspensión global y prolongada de la conciencia: es imposible despertar al paciente aun con estimulación intensa. Se pierden sensibilidad, motilidad voluntaria e incluso reflejos; persisten solo las funciones vegetativas.", "Tipos frecuentes: tóxicos, metabólicos (hipoglucémico, hepático, urémico) y cerebrales."],
        ],
      },
      {
        titulo: "Cualitativas",
        nota: "Además del descenso de vigilia hay alteración global de lo cognitivo o restricción del campo de conciencia.",
        signos: [
          ["Delirium", "Deterioro cognitivo global de origen orgánico, de curso agudo y breve (hasta unas dos semanas), no explicado por demencia, con ilusiones y alucinaciones visuales, auditivas o táctiles que arrastran el afecto y la conducta.", "En el delirium tremens alcohólico el paciente se sacude los «bichos» que le caminan encima."],
          ["Estado crepuscular", "Estrechamiento transitorio de la conciencia, de inicio y final súbitos, con conductas automáticas, explosiones emocionales y amnesia lacunar posterior. Puede haber actos violentos inesperados o conducta tranquila.", "Se reserva para la epilepsia, sobre todo del lóbulo temporal; la fuga disociativa no tiene causa orgánica demostrable."],
          ["Estado oniroide", "Vivencias ilusorias o alucinatorias escénicas y multimodales, de gran viveza, emparentadas con el soñar: realidad y fantasía se mezclan y el paciente responde con terror o con goce según el contenido.", "Suele empezar con alteración del sueño y pesadillas; el paciente asiste «como a una película»."],
          ["Automatismo", "Acción que transcurre sin conciencia, involuntaria y sin control, a menudo inadecuada a las circunstancias; puede parecer coordinada e intencional pero carece de juicio.", "Después el recuerdo es nulo o parcial y confuso."],
        ],
      },
    ],
  },
  {
    slug: "orientacion",
    nombre: "Orientación",
    breve: "Tiempo, espacio y persona",
    entrada:
      "Permite situarnos respecto de referencias del contexto y de nosotros mismos. Se explora en tres ejes: tiempo, lugar y persona.",
    apartados: [
      {
        titulo: "Alopsíquica",
        nota: "Orientación respecto del mundo exterior.",
        signos: [
          ["Desorientación temporal", "Incapacidad para reconocer la hora, el día, el mes o el año en curso; a veces no distingue si es de día o de noche.", "Pregunta de exploración: «¿Qué fecha es hoy?»."],
          ["Desorientación espacial", "Incapacidad para reconocer el lugar donde se encuentra: el sitio, la ciudad, la provincia o el país.", "Pregunta de exploración: «¿Dónde estamos ahora?»."],
        ],
      },
      {
        titulo: "Autopsíquica",
        nota: "Orientación respecto de uno mismo.",
        signos: [
          ["Desorientación en persona", "No puede identificar quién es, de dónde viene ni a dónde va, o no reconoce a familiares, amigos y compañeros que conocía de antemano.", "Es la orientación que suele conservarse más tiempo; perderla indica gravedad."],
        ],
      },
    ],
  },
  {
    slug: "atencion",
    nombre: "Atención y concentración",
    breve: "Focalización y selección de la información",
    entrada:
      "Focalización activa o pasiva de la conciencia sobre estímulos, conductas, recuerdos o representaciones. Realza una información e inhibe las demás para seleccionarla y procesarla (Smith y Kosslyn, 2007).",
    apartados: [
      {
        titulo: "Por cantidad",
        signos: [
          ["Aprosexia", "Ausencia total de atención, la reducción máxima de la disposición atencional.", "En sentido estricto, la del coma. Se llama inatención cuando la persona, ensimismada en sus contenidos mentales, no logra cambiar el foco."],
          ["Hipoprosexia", "Disminución de la capacidad para enfocar, concentrarse y sostener la atención sobre una actividad, objeto o vivencia."],
          ["Hiperprosexia", "Focalización excesiva, tenaz y transitoria sobre un estímulo o tema, con exclusión de todo lo demás que ocurre alrededor.", "Puede darse sin patología; también en depresión, obsesiones y psicosis.", "Hiperconcentración, estrechamiento de la atención"],
        ],
      },
      {
        titulo: "Por dirección y estabilidad",
        signos: [
          ["Pseudoaprosexia", "Aparente falta de atención al entorno con la capacidad atencional conservada: impresiona una aprosexia pero la atención está puesta en otra parte."],
          ["Paraprosexia", "Dirección anómala de la atención: al decaer la atención voluntaria se exalta la espontánea y aparecen desviaciones de apariencia involuntaria, con aumento de la actividad psicomotora."],
          ["Distraibilidad", "Inestabilidad atencional: disminuye la atención activa sin que aumente necesariamente la pasiva. El pensamiento «flota» hacia recuerdos sin importancia y no logra concentrarse en la tarea.", "El interlocutor nota que no puede sostener el diálogo ni tareas elementales.", "Distractibilidad"],
          ["Hipervigilancia atencional", "Escudriñamiento continuo de señales externas o corporales: la atención pasiva está exagerada y no puede fijar la activa en nada, salvo por instantes.", "Capta detalles que para otros son insignificantes."],
        ],
      },
      {
        titulo: "Otras alteraciones",
        signos: [
          ["Fatigabilidad de la atención", "Agotamiento al mantener la atención, con bajo rendimiento y abundancia de errores.", "Sugiere causa cerebral: traumatismos, tumores, demencias."],
          ["Apatía de la atención", "Indiferencia atencional: los acontecimientos que interesarían a cualquiera no logran despertar su atención.", "Se ve en cuadros orgánico-cerebrales y en algunas esquizofrenias.", "Indiferencia atencional"],
          ["Perplejidad de la atención", "Alteración cualitativa: el sujeto atiende pero no logra sintetizar lo atendido ni comprender sus actos y lo que lo rodea."],
          ["Sesgo atencional", "Tendencia a dirigir la atención, de forma selectiva y prioritaria, hacia la información congruente con los propios miedos, preocupaciones o estado de ánimo."],
        ],
      },
    ],
  },
  {
    slug: "memoria",
    nombre: "Memoria",
    breve: "Fijar, conservar y evocar",
    entrada:
      "Facultad superior que permite almacenar, retener y recuperar información. Sus alteraciones pueden afectar la cantidad de lo recordado o deformar su contenido.",
    apartados: [
      {
        titulo: "Disminución y pérdida",
        signos: [
          ["Hipomnesia", "Disminución de la memoria. De fijación (anterógrada) si afecta a lo reciente; de evocación (retrógrada) si impide recuperar lo almacenado antes del cuadro."],
          ["Amnesia de fijación", "Incapacidad para consolidar recuerdos nuevos: la persona «vive en el presente».", "Las amnesias anterógradas son siempre de causa orgánica, consecuencia de un evento neurológico.", "Amnesia anterógrada"],
          ["Amnesia de conservación", "Pérdida de recuerdos que ya estaban almacenados. Puede ser global (todo el pasado), lacunar (un periodo delimitado) o selectiva (episódica o semántica)."],
          ["Amnesia lacunar", "Pérdida de los recuerdos de un periodo delimitado en el tiempo, como un hueco en la biografía.", "Típica tras un estado crepuscular."],
          ["Ley de Ribot", "Principio según el cual los recuerdos más recientes, menos organizados y menos automatizados son los más vulnerables a perderse."],
          ["Amnesia de evocación", "El recuerdo no se ha perdido pero cuesta mucho traerlo a la conciencia; la persona tiene la sensación de saberlo.", "Favorecida por ansiedad intensa, astenia, falta de atención o interferencia."],
          ["Pseudoamnesia", "La persona siente que ha perdido la memoria, pero objetivamente no existe tal pérdida."],
        ],
      },
      {
        titulo: "Aumento",
        signos: [
          ["Hipermnesia", "Aumento exagerado de los recuerdos: reproduce todos los detalles de sucesos pasados, incluso de los que no parecían haber captado su atención."],
          ["Pseudohipermnesia", "Evocación repetitiva de recuerdos ligados a su patología, que el paciente utiliza para reforzar su argumentación.", "También en población sana, como flashes de vivencias pasadas."],
          ["Ecmnesia", "El sujeto cree estar en el pasado y revive vivencias antiguas con gran implicación emocional, perdiendo la orientación en el presente.", "El delirio ecmnésico revive un recuerdo auténtico como si fuera actual."],
        ],
      },
      {
        titulo: "Deformación del recuerdo y del reconocimiento",
        signos: [
          ["Paramnesia", "Deformación de los recuerdos: se recuerdan hechos reales pero alterados o se está seguro de recordar algo que nunca ocurrió.", "No confundir con la mentira (pseudología fantástica)."],
          ["Confabulación", "Mezcla de recuerdos falsos y verdaderos con la que el paciente rellena las lagunas de su memoria."],
          ["Parapraxia", "Errores simples de memoria: olvido de nombres o fechas, el fenómeno de la «punta de la lengua».", "Ocurre en población sana y clínica; no implica por sí sola patología."],
          ["Déjà vu", "Falso reconocimiento positivo: se vive como ya visto algo que se sabe que se ve por primera vez.", "Fenómeno asociado: el pseudopresentimiento.", "Falso reconocimiento positivo"],
          ["Pseudopresentimiento", "Sensación de haber visto un suceso que se habría podido predecir."],
          ["Paramnesia reduplicativa", "Falso reconocimiento en el que se afirma haber estado antes en un lugar que se visita por primera vez.", "Frecuente en el síndrome de Korsakoff, en estados confusionales y demencias."],
          ["Jamais vu", "Falso reconocimiento negativo: se reconoce y recuerda una situación pero sin sensación alguna de familiaridad.", "Relacionado: la pérdida del significado de una palabra cuando se presta atención a ella.", "Falso reconocimiento negativo"],
        ],
      },
    ],
  },
  {
    slug: "percepcion",
    nombre: "Percepción, imaginación y sensaciones",
    breve: "Sensación, ilusión, alucinación",
    entrada:
      "Proceso cognitivo mediante el cual aprehendemos la realidad. Sus alteraciones a veces indican un deterioro grave del contacto del paciente con la realidad, como ocurre con las alucinaciones.",
    apartados: [
      {
        titulo: "Distorsiones de la intensidad",
        signos: [
          ["Hiperestesia", "Aumento exagerado de la sensación ante un estímulo, sin cambio en el tipo de sensación: lo vive desproporcionadamente intenso."],
          ["Hipoestesia", "Disminución de la sensación que normalmente produce un estímulo.", "La hipoacusia es una hipoestesia auditiva."],
          ["Enlentecimiento perceptivo", "Lentitud para percibir lo que sucede alrededor en relación con la unidad de tiempo.", "Característico de las depresiones, sobre todo psicóticas.", "Retardo de la percepción"],
          ["Anestesia sensorial", "Abolición total de la sensación ante uno o varios estímulos sensoriales.", "Acusias o sorderas, cegueras o amaurosis, anestesias táctiles (pérdida de sensación térmica, dolorosa)."],
          ["Hiperalgesia", "Percepción exagerada de la intensidad del dolor.", "«Cualquier golpecito es como si me dieran con un martillo»."],
          ["Hipoalgesia", "Percepción muy escasa de los estímulos dolorosos.", "«Me golpeo la cabeza contra la pared y apenas noto nada»."],
          ["Analgesia", "Ausencia total de percepción del dolor."],
          ["Parestesia", "Sensación errónea respecto del estímulo: el estímulo produce una sensación inadecuada a él.", "Un pinchazo se vive como hormigueo o frío en lugar de dolor."],
          ["Cenestopatía", "Sensaciones imprecisas y desagradables en órganos internos o músculos, que el paciente no logra localizar ni describir con exactitud."],
        ],
      },
      {
        titulo: "Tamaño, forma e integración",
        signos: [
          ["Metamorfopsia", "Alteración del tamaño o de la forma de los objetos percibidos: los ve mayores, menores, alargados o achatados.", undefined, "Dismegalopsia"],
          ["Macropsia", "Metamorfopsia en la que los objetos se perciben a escala aumentada.", undefined, "Megalopsia"],
          ["Micropsia", "Metamorfopsia en la que los objetos se perciben a escala reducida."],
          ["Autometamorfopsia", "Distorsión en la percepción del tamaño o la forma del propio cuerpo o de alguna parte de él (extremidades, cara, genitales).", undefined, "Alteración del esquema corporal"],
          ["Escisión perceptiva", "Desintegración del objeto percibido en fragmentos, o disociación entre modalidades: lo que oye y lo que ve parecen venir de fuentes distintas y «competir».", "Formas: morfolisis (de la forma) y metacromía (color separado de la forma)."],
          ["Aglutinación perceptiva", "Fusión en una única experiencia de cualidades sensoriales que en realidad son diferentes; la persona no logra distinguirlas."],
        ],
      },
      {
        titulo: "Ilusiones",
        nota: "Existe un estímulo real, pero se interpreta mal.",
        signos: [
          ["Ilusión", "Interpretación equivocada de un estímulo real presente en el campo sensorial.", "De noche, en una calle desierta, unas ramas movidas por el viento se perciben como una persona."],
          ["Pareidolia", "Ilusión en la que se da forma y significado a un estímulo ambiguo y poco estructurado.", "Ver caras en las nubes, en una montaña o en las llamas."],
        ],
      },
      {
        titulo: "Imágenes anómalas",
        nota: "Pseudopercepciones: se viven como imágenes, sin estímulo o cuando el estímulo ya no está.",
        signos: [
          ["Imágenes hipnagógicas", "Imágenes autónomas que aparecen al pasar de la vigilia al sueño, en estado de semiconsciencia.", "Junto con las hipnopómpicas se llaman alucinaciones fisiológicas."],
          ["Imágenes hipnopómpicas", "Imágenes autónomas que aparecen al salir del sueño hacia la vigilia."],
          ["Imágenes alucinoides", "Imágenes autónomas y subjetivas, sin estímulo, en el «espacio negro de los ojos cerrados»; la persona reconoce que las crea su mente.", "Por fiebre alta o consumo de alucinógenos."],
          ["Imágenes eidéticas", "Imágenes ligadas a los recuerdos y transformadas por los deseos; se crean y mantienen voluntariamente y se desvanecen al dejar de sostenerlas.", undefined, "Imágenes mnémicas"],
          ["Postimagen", "Imagen que aparece tras una alta carga sensorial, con propiedades opuestas a las del original.", "Tras mirar un color oscuro intenso se ve uno claro; tras mirar una cascada, el movimiento parece ascendente.", "Imagen consecutiva"],
          ["Imágenes parásitas", "Imágenes autónomas e involuntarias que siguen a un estímulo concreto ya ausente; la persona sabe que son producto de su mente."],
        ],
      },
      {
        titulo: "Alucinaciones",
        nota: "Percepción sin objeto, con toda la fuerza de una percepción real y fuera del control de quien la vive.",
        signos: [
          ["Alucinación", "Experiencia semejante a la percepción en ausencia del estímulo correspondiente, con la fuerza e impacto de lo real y sin que pueda dirigirse o controlarse.", "Puede ser elemental (difusa: tonos, murmullos) o compleja (detallada: palabras con significado)."],
          ["Zoopsia", "Alucinación visual de animales, en particular insectos.", "Frecuente en el delirium tremens."],
          ["Alucinación liliputiense", "Alucinación visual en la que objetos o personas se ven diminutos."],
          ["Alucinación guliveriana", "Alucinación visual en la que objetos o personas se ven enormes."],
          ["Autoscopia", "Alucinación visual del propio cuerpo: interna (ve sus órganos), externa (se ve a sí mismo enfrente) o negativa (no ve su imagen en el espejo)."],
          ["Alucinación auditiva", "La persona «escucha» un estímulo inexistente: elemental (pasos, murmullos) o compleja (voces que revelan, piden, ordenan, comentan sus actos o amenazan).", "Junto con la visual, la modalidad más frecuente."],
          ["Alucinación olfativa", "Percepción de olores inexistentes, de agradables a nauseabundos.", "Suele vivirse como agresión o parte de un envenenamiento; también en tumores cerebrales."],
          ["Alucinación gustativa", "Percepción de sabores desagradables inexistentes, a menudo ligada a ideas de envenenamiento o de «pudrirse por dentro»."],
          ["Alucinación táctil", "Sensaciones en la piel sin estímulo: pellizcos, corrientes, quemaduras. Activa si cree tocar algo; pasiva si siente que lo tocan.", "Variantes: háptica, hídrica (humedad), de contacto.", "Alucinación háptica"],
          ["Alucinación cinestésica", "Sensación de que una parte del cuerpo se está moviendo sin que lo haga."],
          ["Pseudoalucinación", "Percepción sin corporeidad, situada en el espacio subjetivo interior y no en el campo sensorial.", "«Oigo voces dentro de mi cabeza» o ver un animal dentro del estómago."],
          ["Alucinosis", "Alucinación en la que la persona sabe que lo percibido no existe.", "Típica del consumo de drogas."],
          ["Alucinación negativa", "No se percibe un estímulo que sí está presente."],
        ],
      },
      {
        titulo: "Vivencias de irrealidad",
        signos: [
          ["Desrealización", "Los objetos se perciben con la misma nitidez, pero parecen irreales o inexistentes; el paciente sabe que corresponden a la realidad.", "«Noto las cosas raras, como si todo fuera una fantasía»."],
          ["Despersonalización", "Vivencia de extrañeza o cambio del propio yo: se siente irreal, alejado de sí, como si pensara y percibiera otra persona o pudiera verse desde fuera."],
          ["Transformación", "El paciente vive que ya no es él sino otra persona, a menudo un personaje destacado de la cultura, el deporte, la política o la ciencia."],
        ],
      },
    ],
  },
  {
    slug: "pensamiento",
    nombre: "Pensamiento",
    breve: "Origen, curso y contenido de las ideas",
    entrada:
      "Proceso cognitivo que permite elaborar y desarrollar ideas, poniendo en juego capacidades como evaluar, crear, planear e imaginar (Bonilla, 2013). Se explora su origen, su forma o curso y su contenido.",
    apartados: [
      {
        titulo: "Origen",
        signos: [
          ["Pensamiento autista", "Pensar que nace de vivencias perceptivas que no corresponden a la realidad, a menudo alucinatorias; lleno de fantasía e irrealidad.", "El paciente aparece ensimismado, «viviendo» su mundo fantástico."],
        ],
      },
      {
        titulo: "Velocidad y continuidad del curso",
        signos: [
          ["Bradipsiquia", "Lentificación en la producción de ideas: tarda en responder y su diálogo parece costarle un gran esfuerzo.", "Frecuente en depresiones graves.", "Lentificación del pensamiento"],
          ["Taquipsiquia", "Aceleración del pensamiento: responde muy rápido y su conversación es veloz y rica en palabras.", "Característica de la manía.", "Aceleración del pensamiento"],
          ["Fuga de ideas", "Grado máximo de aceleración: piensa más rápido de lo que puede expresar y las ideas «se le fugan» sin concluir.", undefined, "Descarrilamiento"],
          ["Pérdida de meta", "Fracaso en seguir una cadena de pensamiento hasta su conclusión: divaga y se aleja del tema inicial hasta no volver a él."],
          ["Prolijidad", "Detallismo: sin aceleración, da muchos rodeos innecesarios con detalles relacionados con la idea central antes de llegar a ella.", "Frecuente en demencias y en el trastorno obsesivo-compulsivo."],
          ["Perseveración ideica", "Repetición automática de una idea, frase o palabra como material de relleno cuando falla la evocación.", undefined, "Perseveración"],
          ["Bloqueo del pensamiento", "El paciente se detiene de pronto sin terminar la idea y refiere que «se le fue».", undefined, "Robo del pensamiento, interrupción"],
          ["Vacío mental", "El paciente refiere no pensar en nada, tener la mente en blanco.", "En depresión y demencias."],
          ["Verborrea", "Habla durante horas o días intentando expresar sus ideas sin lograrlo: lo que dice carece de significado.", "En procesos orgánicos, psicóticos o maníacos."],
        ],
      },
      {
        titulo: "Organización del discurso",
        signos: [
          ["Disgregación", "Incongruencia entre frases: cada una puede tener sentido, pero no guardan relación entre sí.", "«La naranja es dulce, pero me quedo en casa porque la silla está en su sitio»."],
          ["Incoherencia", "Falta de conexión lógica entre las palabras de una misma frase, que se vuelve incomprensible: una «ensalada de palabras».", undefined, "Esquizofasia, paragramatismo"],
          ["Aliteración", "Repetición innecesaria de una o varias letras o sonidos dentro de una frase."],
          ["Tangencialidad", "Ante una pregunta responde de forma oblicua, tangencial o irrelevante."],
          ["Ilogicidad", "Habla en la que no se llega a las conclusiones de manera lógica; fracaso de las inferencias."],
          ["Habla distraída", "Se detiene en mitad de una frase y cambia de tema en respuesta a estímulos inmediatos del entorno.", "Frecuente en la manía; en menor grado en la ansiedad."],
          ["Neologismo", "Invención de palabras o uso de palabras corrientes con un significado distinto.", "«En las meserías se asientan las orugas como aspirides». Poco frecuente: manía, esquizofrenia."],
          ["Autorreferencia", "Lleva constantemente el discurso hacia sí mismo, aunque el tema sea neutro.", "No confundir con el delirio de referencia, donde se siente aludido o amenazado."],
          ["Alogia", "Pobreza del habla: respuestas breves, concretas, a veces monosilábicas, sin información espontánea.", "—¿Tienes hermanos? —Sí.", "Pobreza del habla"],
          ["Pobreza del contenido del habla", "Habla de cantidad normal pero vacía: transmite poca información o necesita muchas palabras para darla.", "«Me gusta leer, leer es bueno, mi padre dice que le gusta leer…»", "Habla vacía"],
          ["Pararrespuesta", "Respuesta aproximada: muestra haber entendido la pregunta pero responde de forma inexacta o muy indirecta.", "—¿Cuántos años tiene? —Con mi madre y mis dos hijas sumamos 152.", "Respuesta aproximada"],
          ["Pensamiento concreto", "Pensar excesivamente literal, con dificultad para abstraer y comprender metáforas.", "Al oír que su medicación tiene «efectos secundarios», intenta ser siempre el segundo en todo.", "Concretismo"],
        ],
      },
      {
        titulo: "Pensamientos repetitivos negativos",
        nota: "Contenidos intrusivos, recurrentes, difíciles de controlar y de tono negativo.",
        signos: [
          ["Preocupación", "Cadena de pensamientos sobre el futuro, cargada de afecto negativo y poco controlable; intento de resolver mentalmente problemas de resultado incierto.", "Mira hacia adelante: «siempre imagino que las cosas serán peores».", "Worry"],
          ["Rumiación", "Pensar repetitivo sobre las emociones negativas, los síntomas y los problemas, sus causas y consecuencias.", "Mira al presente o al pasado reciente: «¿qué hice mal?, le doy vueltas y más vueltas»."],
          ["Pensamientos automáticos negativos", "Autoafirmaciones breves, despectivas y repetitivas que irrumpen de golpe en el flujo del pensamiento, sin buscar soluciones.", "«No valgo para nada», «mi vida es un desastre».", "PAN"],
          ["Obsesión", "Pensamiento, impulso o imagen recurrente y persistente que se vive como intrusa e indeseada y causa ansiedad; la persona intenta suprimirla y reconoce su absurdo.", "Rasgos: intrusiva, recurrente, inaceptable, irracional, resistida, incontrolable y egodistónica.", "Idea obsesiva"],
          ["Obsesión autógena", "Obsesión de contenido agresivo, sexual, religioso o inmoral, muy desagradable, egodistónica y poco ligada a estímulos externos."],
          ["Obsesión reactiva", "Obsesión sobre contaminación, errores, simetría u orden, de contenido que parece razonable pero de consecuencias temidas muy amenazantes.", "Suscita lavar, ordenar, contar, repetir o comprobar."],
          ["Pensamiento intruso", "Idea repetitiva, no deseada y difícil de controlar, similar a una obsesión pero común en la población general."],
          ["Ideación autolítica", "Pensamientos sobre lesionarse o quitarse la vida, que fluctúan en persistencia y se asocian a tristeza, ira, culpa, frustración o ansiedad.", undefined, "Ideación suicida"],
          ["Creencia disfuncional", "Supuestos y valoraciones asumidos como ciertos que sesgan el procesamiento de la información nueva en un sentido negativo para la persona."],
        ],
      },
      {
        titulo: "Ideas patológicas",
        signos: [
          ["Idea sobrevalorada", "Importancia excesiva concedida a un asunto que realmente no la tiene.", "Tras una discusión ya resuelta en el trabajo, cree que será sancionado."],
          ["Idea fija", "Idea real y lógica que ocupa la conciencia de forma persistente y contra la voluntad del sujeto."],
          ["Idea fóbica", "Miedo que el paciente reconoce infundado pero no puede apartar de su mente.", "Claustrofobia (lugares cerrados), agorafobia (espacios abiertos)."],
          ["Idea hipocondríaca", "Interpreta molestias diversas de su organismo como signo de enfermedad y busca reiteradamente ser diagnosticado."],
          ["Idea delirante", "Creencia falsa: irreal, ilógica, morbosa (pertinaz) e irreductible a la argumentación.", "Lo decisivo es que no cede al razonamiento."],
          ["Idea deliroide", "Idea parecida a la delirante, pero que el paciente puede reconsiderar al razonar y atribuir a su estado de ánimo."],
        ],
      },
      {
        titulo: "Temas delirantes",
        signos: [
          ["Delirio de perjuicio", "El contenido delirante gira en torno a un daño que le hacen al propio paciente.", undefined, "Delirio de daño"],
          ["Delirio de persecución", "Cree que lo vigilan, lo siguen o lo tienen «chequeado»."],
          ["Delirio de influencia", "Una fuerza externa controla su pensamiento: aparatos, telepatía o poderes sobrenaturales."],
          ["Delirio de grandeza", "Exaltación de las cualidades propias: se cree un gran personaje, inventor famoso o allegado a los poderosos.", undefined, "Megalomaníaco, expansivo"],
          ["Delirio de referencia", "Cree que los demás hablan mal de él o se burlan cuando conversan o ríen a su paso."],
          ["Delirio erotomaníaco", "Se cree amado profundamente por otra persona, habitualmente de mayor rango o fama.", undefined, "Delirio erótico"],
          ["Delirio celotípico", "Convicción de que su pareja lo engaña.", "Si es único, bien estructurado y con la personalidad indemne, orienta a paranoia."],
          ["Delirio de autorreproche", "Está convencido de haber cometido una falta grave que en realidad no cometió, y sufre por ello.", "En depresiones graves.", "Delirio de culpa"],
          ["Delirio nihilista", "Siente su cuerpo muerto o que ha dejado de existir; puede proyectarlo a lo que lo rodea.", "En depresiones graves."],
          ["Delirio de negación", "Todo está muerto, vacío o no existe, incluso el tiempo y él mismo, lo que paradójicamente le da cierta «inmortalidad»."],
          ["Delirio hipocondríaco", "Convicción de enfermedad que no cede ante exámenes ni explicaciones médicas.", "Frecuente en depresiones psicóticas."],
          ["Delirio místico", "Contenido religioso: posesión, misión divina, reencarnación; puede combinarse con grandeza, culpa o control.", undefined, "Místico-religioso"],
          ["Delirio de ruina", "Convicción de haber perdido o de que perderá todos sus bienes, arrastrando a su familia a la miseria.", undefined, "Delirio de pobreza"],
          ["Delirio de suplantación", "Cree que una persona cercana ha sido sustituida por un impostor idéntico."],
        ],
      },
    ],
  },
  {
    slug: "lenguaje",
    nombre: "Lenguaje y habla",
    breve: "Comprensión, expresión y articulación",
    entrada:
      "Deterioro o desarrollo deficiente de la comprensión o del uso de un sistema de símbolos (Ramos y Manga, 2008). Con frecuencia es consecuencia de una lesión cerebral.",
    apartados: [
      {
        titulo: "Por lesión cerebral",
        signos: [
          ["Afasia", "Pérdida de la capacidad de producir o comprender el lenguaje en cualquiera de sus formas (habla, lectura, escritura) por lesión de los centros cerebrales del lenguaje.", "Lesión focal, cortical o subcortical."],
          ["Agramatismo", "Dificultad para encadenar palabras en frases siguiendo las reglas gramaticales."],
          ["Aprosodia", "Incapacidad para la entonación, la musicalidad, la inflexión y la cadencia del habla."],
          ["Agrafia", "Pérdida de la capacidad ya adquirida para escribir."],
          ["Alexia", "Pérdida de la capacidad ya adquirida para leer."],
          ["Anomia", "Dificultad para encontrar las palabras que designan objetos o personas."],
          ["Parafasia", "Sustitución involuntaria de sonidos o palabras, bien articulados, durante el habla.", "Literal o fonémica si cambia sílabas; verbal si cambia palabras («guante» por «zapato»)."],
        ],
      },
      {
        titulo: "Articulación, voz y fluidez",
        signos: [
          ["Dislalia", "Dificultad para articular fonemas, sílabas o palabras, por causa orgánica o, más a menudo, funcional.", "Fonológica cuando falla identificar y reproducir los sonidos de la lengua."],
          ["Disfasia evolutiva", "Trastorno específico del lenguaje que afecta expresión y comprensión en niños de inteligencia normal sin alteración sensorial, neurológica ni carencia ambiental.", undefined, "TEL"],
          ["Disartria", "Dificultad del habla por alteración del tono y del movimiento de los músculos de la articulación, secundaria a lesión nerviosa."],
          ["Disglosia", "Alteración de la articulación por daño en los órganos periféricos del habla: paladar, lengua, labios.", undefined, "Dislalia orgánica"],
          ["Disfonía", "Trastorno de la voz, cualitativo o cuantitativo, orgánico o funcional."],
          ["Tartamudez", "Alteración persistente de la fluidez y el ritmo del habla, inapropiada para la edad, con interrupciones llamadas disfluencias."],
        ],
      },
      {
        titulo: "Expresión y repetición",
        signos: [
          ["Mutismo", "Ausencia de lenguaje expresivo, o su desaparición temporal o permanente en quien ya lo había adquirido."],
          ["Mutismo selectivo", "Negativa a hablar ante determinadas personas o situaciones.", "Aparece entre los 3 y 7 años, a menudo al iniciar la escuela.", "Mutismo electivo"],
          ["Coprolalia", "Emisión involuntaria de palabras obscenas o insultantes, sin intención de agraviar; la persona se avergüenza de ellas."],
          ["Ecolalia", "Repetición en eco de las últimas sílabas, palabras o frases que acaba de oír.", "Forma parte de los ecosíntomas, junto a ecopraxia y ecomimia."],
          ["Palilalia", "Repetición de las propias palabras o sílabas con frecuencia creciente.", "En deprimidos, esquizofrenias y demencias."],
        ],
      },
    ],
  },
  {
    slug: "afectividad",
    nombre: "Afectividad",
    breve: "Tono, calidad y expresión del afecto",
    entrada:
      "Concepto amplio que abarca emociones, sentimientos, impulsos motivacionales y estados de ánimo. Sus alteraciones se describen por cantidad (intensidad del tono afectivo) y por calidad.",
    apartados: [
      {
        titulo: "Hipertimia placentera",
        nota: "Aumento del tono afectivo vivido como agradable.",
        signos: [
          ["Eutimia", "Estado de ánimo equilibrado, con sensación de bienestar y tranquilidad.", "Referencia normal."],
          ["Alegría", "Estado placentero normal, con un motivo real que lo provoca."],
          ["Euforia", "Alegría inmotivada: el sujeto está alegre pero no sabe por qué."],
          ["Moria", "Alegría insulsa, sosa y sin sentido.", "En tumores cerebrales o retrasos intelectuales profundos."],
          ["Hipomanía", "Exaltación del ánimo con satisfacción elevada que no siempre concuerda con la realidad; el paciente resulta muy jocoso y simpático."],
          ["Manía", "Grado máximo de exaltación del tono afectivo, siempre con conducta excitada: inicia actividades sin terminarlas, canta, baila, hipererotismo."],
        ],
      },
      {
        titulo: "Hipertimia displacentera",
        signos: [
          ["Tristeza", "Estado afectivo de abatimiento por insatisfacción de las necesidades; facies de gran infelicidad, como las máscaras del teatro antiguo."],
          ["Disforia", "Mal humor con gran irritabilidad que puede llevar a conductas agresivas ante situaciones insignificantes.", "En epilepsias, demencias, cuadros orgánicos y depresiones."],
        ],
      },
      {
        titulo: "Hipotimia",
        nota: "Disminución del tono afectivo: las reacciones emocionales se apagan.",
        signos: [
          ["Indiferencia afectiva", "Escasa o nula reacción emocional ante hechos que deberían provocar agrado, malestar o sorpresa."],
          ["Aplanamiento afectivo", "Grado máximo de indiferencia: ausencia de respuesta afectiva (atimia) con rostro amímico.", "Recibe la noticia de la muerte de su madre totalmente inmutable. Característico de la esquizofrenia.", "Atimia"],
        ],
      },
      {
        titulo: "Cualitativas",
        signos: [
          ["Ansiedad", "Emoción anticipatoria ante una posible amenaza, útil pero a veces desproporcionada y desadaptativa. Tiene manifestaciones subjetivas (opresión, desasosiego) y objetivas (temblor, sudoración, palidez, inquietud).", "Núcleo central de las neurosis.", "Angustia"],
          ["Depresión", "Puede aludir a un estado anímico cotidiano, a un síntoma (ánimo abatido desproporcionado) o a un síndrome con otros síntomas que covarían."],
          ["Anhedonia", "Pérdida de la capacidad para experimentar alegría y placer, incluso con lo cotidiano."],
          ["Ambivalencia afectiva", "Dos reacciones emocionales contrapuestas ante un mismo estímulo."],
          ["Disociación ideoafectiva", "Reacción emocional contraria a la que la situación debería producir.", "Característica de la esquizofrenia.", "Afecto discordante, incongruencia ideoafectiva"],
          ["Catatimia", "Afecto intenso hacia alguien que distorsiona la percepción de su conducta.", "Una madre que no puede aceptar que su hijo es un ladrón."],
          ["Alexitimia", "Incapacidad para identificar, reconocer y expresar las propias emociones: «falta de palabras para los afectos»."],
          ["Tenacidad afectiva", "Persistencia de un estado afectivo más allá de lo común, como una perseveración del afecto.", "Odio duradero hacia alguien que no hizo nada tan grave."],
          ["Incontinencia afectiva", "Imposibilidad de contener las reacciones emocionales, a menudo ante situaciones poco relevantes."],
          ["Perplejidad afectiva", "Extrañeza, desconfianza e incomprensión ante lo que sucede alrededor.", "En el estado confusional y psicosis graves."],
        ],
      },
    ],
  },
  {
    slug: "motricidad",
    nombre: "Comportamiento y conducta motora",
    breve: "Movimiento, voluntad y expresión",
    entrada:
      "Movimientos, gestos y mímica están entrelazados con la experiencia afectiva y cognitiva, y por eso informan sobre emociones, nivel de conciencia, energía, actitud y pensamiento.",
    apartados: [
      {
        titulo: "Actividad motora ausente",
        signos: [
          ["Acinesia", "Pérdida de movimiento o, sobre todo, fallo para iniciarlo; puede afectar a una parte del cuerpo, a una dirección o a ciertos estímulos.", "Muy asociada al Párkinson; también en esquizofrenia y depresión mayor.", "Aquinesia"],
          ["Parálisis", "Incapacidad para mover una parte del cuerpo por lesión cerebral, con atrofia por desuso.", "Cuando es síntoma de conversión se llama pseudoparálisis.", "Paresia"],
          ["Cataplejía", "Pérdida súbita y reversible del tono muscular durante la vigilia, sin alteración de la conciencia, desencadenada por emociones intensas.", "Acompaña con frecuencia a la narcolepsia; la risa es un disparador típico."],
          ["Catatonía", "Conjunto de síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, manierismos, estereotipias, muecas, agitación y ecosíntomas."],
        ],
      },
      {
        titulo: "Actividad disminuida o enlentecida",
        signos: [
          ["Retardo psicomotor", "Lentitud al iniciar, ejecutar y terminar movimientos y pensamientos, sin causa orgánica aparente, con mayores latencias de respuesta.", undefined, "Inhibición psicomotriz"],
          ["Hipocinesia", "Reducción de la actividad espontánea: hacer pocas cosas, dejar las tareas del hogar o de ver a los amigos.", undefined, "Hipoquinesia"],
          ["Bradicinesia", "Lentitud en la ejecución de los movimientos voluntarios."],
          ["Obstrucción", "Bloqueo de una actividad motora: no inicia la acción, o la detiene a mitad sin saber continuar.", "Deja que una mosca permanezca en su cara sin espantarla."],
        ],
      },
      {
        titulo: "Actividad excesiva o acelerada",
        signos: [
          ["Hipercinesia", "Gran número de acciones en poco tiempo o a la vez, sin completar muchas. Productiva si la inquietud se aprovecha; improductiva si los movimientos no tienen fin.", undefined, "Hiperactividad"],
          ["Agitación", "Hipercinesia extrema con movimientos sin objetivo, desorganizados, y tensión interna.", "Reactiva, orgánica (delirium tremens, epilepsia) o psicótica (raptus catatónico, manía)."],
          ["Raptus", "Crisis súbita de violencia con que el paciente catatónico sale del estupor: grita, corre, hace muecas."],
          ["Inquietud", "Hiperactividad leve, sin objetivo, en la que se conserva cierto control de la conducta.", "En ansiedad o como efecto de neurolépticos."],
          ["Interceptación cinética", "Interrupción brusca e inmotivada de un movimiento en curso, que luego se reanuda.", "Como un video al que se le pone pausa y luego play."],
        ],
      },
      {
        titulo: "Movimientos inducidos",
        nota: "Se observan al pedir al paciente que haga algo.",
        signos: [
          ["Negativismo", "Oposición inmotivada a las instrucciones. Pasivo: no hace lo pedido; activo: hace lo contrario.", "Se le pide que se levante y se sienta."],
          ["Obediencia automática", "Cumple las órdenes sin importar las consecuencias.", "Kraepelin: el paciente sigue sacando la lengua aunque cada vez lo pinchen."],
          ["Ambitendencia", "Tendencia a hacer a la vez dos acciones antagónicas que se interfieren y no se completan.", "Acerca la mano para saludar, se detiene, vuelve a intentarlo y nunca llega a estrecharla.", "Ambivalencia motora"],
          ["Perseveración motora", "Incapacidad para cambiar de movimiento: simple (no cesa la acción pedida), iterativa (la repite al terminar) o sustitutiva (la repite aunque se pida otra).", "Signos asociados: reflejo de asir, asimiento forzado, signo del imán."],
          ["Flexibilidad cérea", "Resistencia plástica al mover el cuerpo del paciente, como doblar una varilla de cera blanda; mantiene la postura final aunque sea incómoda."],
          ["Almohada psicológica", "Mantiene la cabeza en el aire, sin apoyo, durante largo tiempo y sin cansancio."],
          ["Catalepsia", "Inmovilidad y rigidez súbitas en una postura mantenida, sin respuesta a estímulos; al movilizarlo pasivamente puede quedar en la posición dada.", "Asociada a la esquizofrenia con catatonía."],
          ["Ecopraxia", "Imitación automática de los movimientos observados en otra persona.", undefined, "Ecocinesia"],
          ["Ecomimia", "Imitación automática de los gestos del interlocutor."],
        ],
      },
      {
        titulo: "Movimientos involuntarios",
        signos: [
          ["Espasmo", "Contracción involuntaria de los músculos.", "Son espasmódicos la corea, el balismo, la mioclonía, las convulsiones y los tics."],
          ["Temblor", "Movimiento oscilatorio, rítmico y no intencional. De reposo (fino), intencional (al iniciar un movimiento, más grueso) o postural (contra la gravedad).", "Postural rápido: ansiedad e intoxicaciones; lento: lesión cerebral estructural."],
          ["Balismo", "Movimiento brusco como un disparo, de gran amplitud, desde el hombro o la pelvis, habitualmente en un solo lado.", undefined, "Hemibalismo"],
          ["Distonía", "Contracción muscular sostenida que produce retorcimientos, repeticiones o posturas extrañas.", "Focal (tortícolis), ocupacional, segmentaria, multifocal o generalizada; también por antipsicóticos."],
          ["Mioclonía", "Sacudidas musculares muy rápidas y breves de amplitud variable.", "Las hípnicas al dormirse son fisiológicas."],
          ["Convulsión", "Contracción violenta, incontrolable y difusa de la musculatura voluntaria.", "Focales o generalizadas (ausencias, tonicoclónicas)."],
          ["Tic", "Movimiento o sonido involuntario, repentino, intermitente y sin objetivo, precedido de tensión y suprimible por poco tiempo.", "Empeora con ansiedad y mejora con la distracción."],
          ["Estereotipia", "Repetición continuada e innecesaria de movimientos complejos y organizados, a menudo sin que la persona lo note.", "A diferencia del ritual compulsivo, no busca reducir ansiedad."],
          ["Automatismo motor", "Movimientos repetitivos sin control consciente en estados alterados de conciencia, con amnesia posterior.", "Masticar, succionar, pedalear; típicos del aura de crisis temporales."],
        ],
      },
      {
        titulo: "Conducta voluntaria e intencional",
        signos: [
          ["Conducta de seguridad", "Comportamiento, encubierto o manifiesto, dirigido a prevenir una catástrofe temida o sentirse más protegido."],
          ["Evitación", "Reacción para mantenerse lejos de lo temido. Activa: hace algo para no exponerse; pasiva: deja de hacer una conducta antes castigada.", "No va al aeropuerto; no compra el billete."],
          ["Escape", "Salir de la situación temida cuando ya se está en ella.", "Abandona el avión ya sentado en su asiento.", "Huida"],
          ["Compulsión", "Conducta o acto mental repetitivo y ritualizado en respuesta a una obsesión, para prevenir un mal temido o bajar la ansiedad.", "Lavado, comprobación, repetición, orden y simetría, acumulación, compulsiones mentales."],
          ["Conducta de comprobación", "Verificación continua de lo que preocupa, sin ser ritual ni respuesta a una obsesión.", "Pesarse o mirarse al espejo una y otra vez; revisar el cuerpo buscando signos de enfermedad."],
          ["Atracón", "Ingesta rápida de grandes cantidades de comida con poca satisfacción, seguida de malestar y culpa."],
          ["Conducta purgativa", "Compensación de una ingesta excesiva mediante vómito autoprovocado, laxantes, diuréticos o enemas."],
          ["Conducta restrictiva", "Restricción voluntaria de la ingesta mediante dietas o ayuno para alcanzar el peso considerado ideal."],
          ["Autolesión", "Destrucción directa y deliberada de una parte del propio cuerpo sin intención letal.", "Cortes, quemaduras, golpes, escoriaciones.", "Conducta autoagresiva"],
          ["Heteroagresividad", "Conducta que causa daño a otra persona o a su propiedad.", "Gritos e insultos no bastan por sí solos."],
          ["Impulsividad", "Deseo inmotivado e irrefrenable de realizar un acto que el sujeto no puede dominar."],
          ["Acto impulsivo", "Comportamiento prematuro, sin deliberar sobre sus consecuencias, cuya única finalidad es seguir el impulso."],
          ["Abulia", "Disminución de la voluntad para iniciar o completar conductas dirigidas a un fin; puede pasar horas sentado sin interés.", "Síntoma negativo de la esquizofrenia; también en depresión y cuadros neurocognitivos."],
          ["Hipobulia", "Pérdida parcial de la voluntad: hace las cosas, con lentitud o pereza, pero las hace."],
          ["Hiperbulia", "Aumento de la capacidad de decisión voluntaria junto con la actividad psicomotora."],
          ["Conducta extravagante", "Conducta rara o inadecuada a la situación a ojos del observador.", "Entrega una cuchara como entrada al cine."],
          ["Manierismo", "Modo peculiar y extraño de realizar una conducta normal con un fin.", "Camina con un pie de puntillas y el otro de talón."],
          ["Bloqueo conductual", "Inmovilidad ante una situación de miedo en lugar de huir o luchar; puede llegar al desmayo.", "Frente al auditorio no logra decir palabra.", "Congelación"],
          ["Apraxia", "Dificultad para ejecutar una actividad voluntaria aprendida y compleja pese a comprenderla, desearla y tener capacidad física.", "«No sé cómo se hace, no puedo abotonarme la camisa»."],
          ["Abandono de hábitos", "Deja de bañarse, afeitarse o peinarse: aspecto sucio, desaliñado, con mal olor.", undefined, "Descuido del aspecto personal"],
        ],
      },
      {
        titulo: "Mímica y expresión",
        signos: [
          ["Hipermimia", "Expresión facial o gestual exagerada; generalizada (todos los músculos faciales) o polarizada (un afecto monotemático)."],
          ["Hipomimia", "Disminución o ausencia (amimia) de la expresión facial y gestual, con mirada fija.", "Depresión mayor, cuadros neurocognitivos, esquizofrenia.", "Amimia"],
          ["Paramimia", "Discordancia entre la expresión facial y el contenido afectivo o verbal, como risas inmotivadas.", undefined, "Dismimia"],
        ],
      },
    ],
  },
  {
    slug: "fisiologicas",
    nombre: "Sueño, ingesta y sexualidad",
    breve: "Funciones fisiológicas",
    entrada:
      "Alteraciones en los patrones de funcionamiento fisiológico. Pueden ser el núcleo de un trastorno o aparecer acompañando a muchos otros cuadros.",
    apartados: [
      {
        titulo: "Disomnias",
        nota: "Afectan la duración, intensidad o cantidad del sueño.",
        signos: [
          ["Insomnio inicial", "Dificultad para conciliar el sueño; una vez dormido, suele mantenerlo.", "Característico de la ansiedad.", "Insomnio vespertino"],
          ["Insomnio tardío", "Duerme la primera parte de la noche y despierta de madrugada sin poder volver a dormir.", "Característico de la depresión.", "Insomnio matinal"],
          ["Insomnio intermitente", "Duerme a intervalos: despierta y vuelve a dormirse varias veces en la noche.", undefined, "Insomnio medio"],
          ["Hipersomnia", "Dormir demasiado y mostrarse siempre somnoliento.", "Recordar que algunas personas necesitan normalmente más de 8 horas."],
          ["Narcolepsia", "Ataques anormales de sueño diurno de 10-15 minutos en circunstancias estimulantes, con cataplejía, parálisis del sueño y alucinaciones hipnagógicas."],
          ["Parálisis del sueño", "No poder moverse, hablar ni respirar con naturalidad durante unos minutos, sin disparador emocional."],
          ["Apnea obstructiva", "Las vías respiratorias se estrechan al relajarse los músculos y la respiración cesa 10-20 segundos hasta que el encéfalo despierta al sujeto.", "Su signo más característico es el ronquido."],
          ["Apnea central", "Cese del ritmo respiratorio porque el encéfalo no activa correctamente los músculos de la respiración.", "Solo con lesión del sistema nervioso central."],
          ["Fase de sueño retrasada", "Alteración del ritmo circadiano en la que el momento de dormirse se demora más de dos horas."],
          ["Fase de sueño adelantada", "Los marcadores circadianos se programan 2 a 4 horas antes de lo habitual: duerme y madruga demasiado pronto."],
          ["Sueño por turnos laborales", "Desorganización del ciclo sueño-vigilia por horarios de trabajo rotativos."],
        ],
      },
      {
        titulo: "Parasomnias",
        nota: "Fenómenos anómalos durante las fases REM y no REM.",
        signos: [
          ["Pesadilla", "Sueño terrorífico o amenazante durante la fase REM que puede despertar al sujeto; recuerda el contenido y la angustia se disipa al saber que soñaba."],
          ["Terror nocturno", "Despertar con un grito desgarrador en fases III-IV del sueño, con angustia difusa y sin recuerdo de lo ocurrido."],
          ["Sonambulismo", "Secuencia de movimientos complejos durante el sueño de ondas lentas: caminar, mover cosas, a veces hablar, sin reaccionar al ambiente.", "Dura de 1 a 30 minutos y aumenta con el estrés."],
        ],
      },
      {
        titulo: "Apetito e ingesta",
        signos: [
          ["Anorexia", "Pérdida total o parcial del apetito o del deseo de comer, con restricción sobre todo de lo calórico.", "Puede acompañarse de ejercicio excesivo para adelgazar."],
          ["Bulimia", "Episodios recurrentes de ingesta excesiva seguidos de conductas compensatorias; hambre que no se sacia."],
          ["Rumiación alimentaria", "Regurgitar la comida, volver a masticarla y deglutirla.", "En retrasos mentales y demencias."],
          ["Pica", "Comer sustancias no nutritivas e inapropiadas: tierra, cal, arena, hojas.", "No es pica si la práctica es culturalmente aceptada."],
          ["Malacia", "Combinar sabores que habitualmente no se combinan.", "Mango con arroz, frijoles con postre."],
          ["Coprofagia", "Deseo de ingerir heces u otras sustancias orgánicas inadecuadas para la alimentación."],
        ],
      },
      {
        titulo: "Sexualidad",
        nota: "La conducta sexual es un indicador sensible del bienestar general.",
        signos: [
          ["Disforia de género", "Malestar persistente por la incongruencia entre el sexo asignado y la identidad con la que la persona se identifica."],
          ["Disfunción sexual", "Alteración en alguna de las fases de la respuesta sexual: deseo, excitación, meseta, orgasmo o resolución."],
          ["Anafrodisia", "Pérdida del deseo sexual."],
          ["Hipoerotismo", "Marcada disminución del apetito sexual con escasez de fantasías.", "Puede asociarse a epilepsia, depresión, daño límbico o medicación.", "Hiposexualidad"],
          ["Aversión al sexo", "Asco, temor o ansiedad ante la sola posibilidad de una relación sexual; generalizada o focalizada."],
          ["Hipererotismo", "Aumento de la libido y de la actividad sexual.", "Forma parte del síndrome maníaco.", "Hipersexualidad"],
          ["Trastorno eréctil", "Incapacidad persistente o recurrente para lograr o mantener una erección.", undefined, "Disfunción eréctil"],
          ["Eyaculación prematura", "Pérdida de control del reflejo eyaculatorio ante estímulos leves, antes de lo deseado, durante al menos seis meses."],
          ["Eyaculación retardada", "Ausencia o retraso marcado (30-45 minutos) de la eyaculación.", "Puede ser efecto de antidepresivos."],
          ["Dispareunia", "Dolor en la zona genital o en otro sitio durante la respuesta sexual, sin enfermedad médica que lo explique."],
          ["Vaginismo", "Espasmos involuntarios del tercio externo de la vagina que hacen dolorosa la penetración.", "No confundir con vaginitis."],
          ["Parafilia", "Actividad sexual cuyo objeto, persona o práctica no es adecuado, con respuesta sexual completa.", "Fetichismo, voyerismo, exhibicionismo, sadismo, masoquismo, entre otras."],
          ["Fetichismo", "Excitación centrada en objetos inanimados (ropa interior, zapatos) o en una parte del cuerpo."],
        ],
      },
    ],
  },
  {
    slug: "relacion",
    nombre: "Funciones de relación",
    breve: "Consigo mismo, con otros, con las cosas",
    entrada:
      "Se exploran a través de la entrevista: cómo se valora la persona, cómo se vincula con los demás y qué lugar ocupan sus intereses. Son las funciones que primero se resienten en muchos síndromes.",
    apartados: [
      {
        titulo: "Ejes de exploración",
        signos: [
          ["Relación consigo mismo", "Autoapreciación de las propias cualidades positivas y negativas.", "«¿Qué piensa de sí mismo? ¿Le gusta ser como es? ¿Cómo le gustaría ser?»"],
          ["Relación con los demás", "Tipo de vínculos interpersonales que el sujeto suele establecer.", "«¿Cómo es usted en sus relaciones? ¿Qué piensa de las demás personas?»"],
          ["Relación con las cosas", "Intereses, ideales y motivaciones: científicos, artísticos, políticos, etc.", "«¿Qué es lo que más le interesa? ¿A qué dedica su tiempo libre?»"],
        ],
      },
    ],
  },
];

export const FUNCIONES: Funcion[] = raw.map((f, i) => ({
  ...f,
  num: i + 1,
  apartados: f.apartados.map((a, ai) => ({
    titulo: a.titulo,
    nota: a.nota,
    signos: a.signos.map(([nombre, def, clave, alias]) => ({
      id: `${f.slug}.${slugify(nombre)}`,
      nombre,
      def,
      clave,
      alias: alias ? alias.split(",").map((x) => x.trim()) : [],
      funcion: f.slug,
      apartado: ai,
    })),
  })),
}));

export const SIGNOS: Signo[] = FUNCIONES.flatMap((f) => f.apartados.flatMap((a) => a.signos));

const porId = new Map(SIGNOS.map((s) => [s.id, s]));
const porNombre = new Map(SIGNOS.map((s) => [slugify(s.nombre), s]));

export const getFuncion = (slug: string) => FUNCIONES.find((f) => f.slug === slug);
export const getSigno = (id: string) => porId.get(id);

/** Busca un signo por su nombre (sin importar tildes ni mayúsculas). Lanza si no existe. */
export function signo(nombre: string): Signo {
  const s = porNombre.get(slugify(nombre));
  if (!s) throw new Error(`Signo inexistente: ${nombre}`);
  return s;
}

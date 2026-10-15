/**
 * Consultorio: historias clínicas breves para practicar el examen mental.
 * Paso 1: marcar los signos presentes (mezclados con distractores).
 * Paso 2: elegir la impresión sindrómica.
 */
import { signo, type Signo } from "./funciones";
import { getSindrome, type Sindrome } from "./sindromes";

export type Consulta = {
  id: string;
  paciente: string;
  lugar: string;
  motivo: string;
  relato: string[];
  hallazgos: Signo[];
  distractores: Signo[];
  sindrome: Sindrome;
  opciones: Sindrome[];
  comentario: string;
};

type Raw = {
  paciente: string;
  lugar: string;
  motivo: string;
  relato: string[];
  hallazgos: string[];
  distractores: string[];
  sindrome: string;
  opciones: string[];
  comentario: string;
};

const raw: Raw[] = [
  {
    paciente: "Hombre, 71 años",
    lugar: "Sala de medicina interna",
    motivo: "Tercer día de ingreso por deshidratación grave. La familia nota que «está apagado».",
    relato: [
      "Permanece acostado, quieto, con el rostro casi sin expresión. Para que responda hay que llamarlo en voz alta y tocarle el hombro varias veces.",
      "—¿Sabe dónde está? —…En una clínica, creo. —¿Qué día es hoy? —Un día de semana… no sé cuál.",
      "Contesta tras pausas largas, con frases cortas. No describe visiones ni voces. Cuando se le informa que su nieto vendrá a verlo no muestra ninguna reacción. Las enfermeras refieren que no come ni se asea si no lo ayudan.",
    ],
    hallazgos: ["Obnubilación", "Bradipsiquia", "Hipomimia", "Indiferencia afectiva"],
    distractores: ["Zoopsia", "Agitación", "Taquipsiquia", "Estado crepuscular"],
    sindrome: "obnubilacion",
    opciones: ["obnubilacion", "delirium", "confusion-mental", "apatoabulico"],
    comentario:
      "Descenso de la vigilia que obliga a usar estímulos intensos, pensamiento lento e indiferencia, sin síntomas productivos. La ausencia de alucinaciones lo separa del delirium; la orientación grosera pero presente y la falta de movimientos carfológicos lo separan de la confusión mental.",
  },
  {
    paciente: "Mujer, 63 años",
    lugar: "Posoperatorio de traumatología, guardia nocturna",
    motivo: "Tercera noche tras una prótesis de cadera. La enfermera la encuentra intentando bajarse de la cama.",
    relato: [
      "Está sudorosa y le tiemblan las manos. Se frota los antebrazos con desesperación: «¡Quítenme estas hormigas, me están subiendo por todo el cuerpo!». Señala la sábana: «Mire, ahí van, son negras».",
      "Por momentos reconoce que está en el hospital; minutos después afirma que está en casa de su hermana y pide que la dejen ir a la cocina. Tiene miedo y grita que la quieren lastimar.",
      "Su hija cuenta que en la tarde hablaba con normalidad.",
    ],
    hallazgos: ["Delirium", "Zoopsia", "Alucinación táctil", "Desorientación espacial", "Agitación"],
    distractores: ["Alucinosis", "Pseudoalucinación", "Aplanamiento afectivo", "Estado oniroide"],
    sindrome: "delirium",
    opciones: ["delirium", "oniroide", "crepuscular", "paranoide"],
    comentario:
      "Inicio agudo, vigilia baja, orientación fluctuante y riqueza alucinatoria visual y táctil con terror y agitación: es el cuadro típico de delirium. En el oniroide las escenas no son angustiosas y la conducta es contemplativa.",
  },
  {
    paciente: "Hombre, 24 años",
    lugar: "Urgencias, área de aislamiento",
    motivo: "Fiebre de 40 °C por dengue. «Está como en otro mundo».",
    relato: [
      "Mira el techo con una sonrisa tranquila, casi sin moverse. Describe con lentitud: «Pasan barcos de colores… un desfile… es como estar en el cine».",
      "No sabe qué día es ni en qué lugar se encuentra, pero dice su nombre completo y reconoce a su madre cuando ella le habla.",
      "Su discurso es lento y divaga de una imagen a otra. No muestra miedo; parece disfrutar de lo que ve.",
    ],
    hallazgos: ["Estado oniroide", "Alucinación", "Desorientación espacial", "Bradipsiquia"],
    distractores: ["Desorientación en persona", "Zoopsia", "Agitación", "Terror nocturno"],
    sindrome: "oniroide",
    opciones: ["oniroide", "delirium", "obnubilacion", "esquizofrenico"],
    comentario:
      "Alucinaciones escénicas no angustiosas, actitud contemplativa y beatífica complacencia, con la orientación alopsíquica tomada y la autopsíquica conservada.",
  },
  {
    paciente: "Hombre, 31 años",
    lugar: "Urgencias, traído por la policía",
    motivo: "Rompió la vitrina de una tienda y huyó corriendo. Tiene epilepsia del lóbulo temporal y abandonó la medicación.",
    relato: [
      "Los testigos cuentan que se quedó con la mirada fija, se relamía los labios y movía la boca como masticando. Luego se volvió violento de repente, golpeó al encargado, rompió el vidrio y salió corriendo.",
      "Unos cuarenta minutos después lo encontraron sentado en una parada de autobús, confundido.",
      "—No sé de qué me hablan. Lo último que recuerdo es que estaba en la fila para pagar.",
    ],
    hallazgos: ["Estado crepuscular", "Automatismo motor", "Amnesia lacunar", "Heteroagresividad"],
    distractores: ["Confabulación", "Fuga de ideas", "Desrealización", "Raptus"],
    sindrome: "crepuscular",
    opciones: ["crepuscular", "delirium", "psicopatico", "hipercinetico"],
    comentario:
      "Inicio y fin súbitos, automatismos orales, conducta agresiva y fugitiva y amnesia total del episodio, en contexto de epilepsia temporal. En el delirium y el oniroide suele quedar algún recuerdo fragmentario.",
  },
  {
    paciente: "Mujer, 80 años",
    lugar: "Cuidados intermedios",
    motivo: "Sepsis de origen urinario. Fue costurera durante cuarenta años.",
    relato: [
      "Está agitada pero sin salir de la cama. Enrolla una y otra vez el borde de la sábana y mueve los dedos como si enhebrara una aguja.",
      "Tiene una expresión de extrañeza. Cuando se le pregunta su nombre responde: «Pan… la ventana… el niño… ya cerré».",
      "No reconoce a su hija, no sabe dónde está ni qué hora es, y esto no varía en toda la evaluación.",
    ],
    hallazgos: ["Confusión mental", "Incoherencia", "Perplejidad afectiva", "Desorientación en persona"],
    distractores: ["Zoopsia", "Ecmnesia", "Hiperprosexia", "Taquipsiquia"],
    sindrome: "confusion-mental",
    opciones: ["confusion-mental", "delirium", "demencial", "obnubilacion"],
    comentario:
      "Agitación limitada a la cama con movimientos carfológicos y repetición de gestos de su oficio, perplejidad, pensamiento incoherente y desorientación total sin fluctuaciones: confusión mental. En el delirium la orientación fluctúa.",
  },
  {
    paciente: "Hombre, 19 años",
    lugar: "Consulta externa, acompañado por su tía",
    motivo: "Peleas en el taller donde aprende mecánica.",
    relato: [
      "Se distrae con cualquier ruido del pasillo. Recita de memoria todas las rutas de autobús de la ciudad con sus números.",
      "—¿Qué quiere decir «estar con el agua al cuello»? —Que uno se está bañando.",
      "La tía cuenta que hace lo que le dicen sus primos, que pasa de la risa al llanto en segundos y que si no le dan algo enseguida tira las cosas al suelo.",
    ],
    hallazgos: ["Pensamiento concreto", "Hipermnesia", "Incontinencia afectiva", "Distraibilidad"],
    distractores: ["Confabulación", "Alucinación auditiva", "Delirio de grandeza", "Amnesia de fijación"],
    sindrome: "oligofrenico",
    opciones: ["oligofrenico", "demencial", "maniaco", "psicopatico"],
    comentario:
      "Pensamiento concreto, memoria mecánica aumentada, relaciones y respuestas afectivas infantiles (intolerancia a la frustración, cambios bruscos, sugestionabilidad) sin alteraciones sensoperceptivas.",
  },
  {
    paciente: "Mujer, 76 años",
    lugar: "Consulta de memoria, con su hijo",
    motivo: "Desde hace tres años «se le olvida todo».",
    relato: [
      "Repite la misma pregunta varias veces durante la entrevista. El mes pasado se perdió de camino al mercado al que va hace treinta años.",
      "Cuando se le pregunta qué desayunó, empieza a hablar de la cocina, de la marca de la cafetera, de su madre, de una receta… y nunca llega a responder.",
      "El hijo cuenta que ya no se baña si no la obligan y que tiene estallidos de enojo con los nietos.",
    ],
    hallazgos: ["Amnesia de fijación", "Prolijidad", "Desorientación espacial", "Abandono de hábitos"],
    distractores: ["Ecmnesia", "Hiperprosexia", "Alucinación cinestésica", "Fuga de ideas"],
    sindrome: "demencial",
    opciones: ["demencial", "amnesico-confabulatorio", "confusion-mental", "depresivo"],
    comentario:
      "Curso crónico con memoria muy tomada (primero la de fijación), pensamiento prolijo, desorientación en fase avanzada, explosividad y pérdida de hábitos, con vigilia normal.",
  },
  {
    paciente: "Hombre, 54 años",
    lugar: "Sala de medicina, segunda semana de ingreso",
    motivo: "Consumo de alcohol de larga data. Ingresó desnutrido.",
    relato: [
      "Dice correctamente la fecha y el nombre del hospital. Sin embargo, saluda al examinador como si lo viera por primera vez, aunque lo evalúa a diario.",
      "—¿Qué hizo esta mañana? —Fui al banco a cobrar y después tomé un café con mi hermano en la plaza. (No ha salido de la sala.)",
      "Su esposa se fue hace diez minutos; él asegura que hoy no ha recibido visitas. Lo cuenta todo sin preocupación y pasa el día en la cama si no lo animan.",
    ],
    hallazgos: ["Amnesia de fijación", "Confabulación", "Indiferencia afectiva", "Hipobulia"],
    distractores: ["Desorientación temporal", "Zoopsia", "Hipermnesia", "Delirio de grandeza"],
    sindrome: "amnesico-confabulatorio",
    opciones: ["amnesico-confabulatorio", "demencial", "delirium", "paranoico"],
    comentario:
      "Grave amnesia de fijación reciente rellenada con confabulaciones y, llamativamente, orientación conservada. Es el clásico cuadro de Korsakoff.",
  },
  {
    paciente: "Hombre, 45 años",
    lugar: "Neuropsicología, control anual",
    motivo: "Traumatismo craneoencefálico frontal hace dos años.",
    relato: [
      "Su esposa cuenta que pasa horas sentado mirando hacia la ventana sin hacer nada y que solo se ducha si ella insiste.",
      "Durante la entrevista su rostro casi no se mueve. —¿Cómo le fue en la graduación de su hijo? —Bien. —¿Qué sintió? —Nada.",
      "Responde con monosílabos y tarda en asociar las ideas.",
    ],
    hallazgos: ["Abulia", "Hipocinesia", "Indiferencia afectiva", "Hipomimia", "Alogia"],
    distractores: ["Hiperbulia", "Ambivalencia afectiva", "Pseudoalucinación", "Taquipsiquia"],
    sindrome: "apatoabulico",
    opciones: ["apatoabulico", "depresivo", "obnubilacion", "esquizofrenico"],
    comentario:
      "Indiferencia, abulia e hipoquinesia con pérdida de hábitos y curso lentificado, sin tristeza ni ideas de culpa que orienten a depresión y con vigilia normal.",
  },
  {
    paciente: "Mujer, 22 años",
    lugar: "Consulta externa, traída por sus padres",
    motivo: "Ocho meses encerrada en su cuarto; dejó la universidad.",
    relato: [
      "Al contar que su perro murió la semana pasada, sonríe. Dice que escucha voces que van narrando lo que hace: «ahora se peina, ahora se sienta».",
      "—¿Cómo van tus estudios? —La biblioteca tiene ventanas, el azul es frío y mi tío compró un carro. Yo iba a decir que… (se calla y mira el suelo) se me fue.",
      "Sabe la fecha, el lugar y recuerda bien lo que hizo ayer. Quiere volver a casa y, al mismo tiempo, pide quedarse.",
    ],
    hallazgos: ["Alucinación auditiva", "Disociación ideoafectiva", "Disgregación", "Bloqueo del pensamiento", "Ambivalencia afectiva"],
    distractores: ["Desorientación temporal", "Confabulación", "Euforia", "Estado crepuscular"],
    sindrome: "esquizofrenico",
    opciones: ["esquizofrenico", "paranoide", "maniaco", "automatismo-psiquico"],
    comentario:
      "Disociación ideoafectiva, ambivalencia, alucinaciones auditivas, disgregación y bloqueo con funciones de síntesis conservadas: desorganización global de la vida psíquica.",
  },
  {
    paciente: "Hombre, 50 años",
    lugar: "Evaluación solicitada por el juzgado de familia",
    motivo: "Demanda de divorcio presentada por su esposa.",
    relato: [
      "Explica con orden y detalle que su esposa lo engaña con el vecino desde hace tres años. Trae una carpeta con recibos, fotos de cómo quedó estacionado el auto y horarios anotados.",
      "Recuerda fechas exactas de hace años. Vigila cada movimiento de la esposa.",
      "Sigue trabajando como contador con buen desempeño y sus compañeros lo aprecian. No refiere voces ni visiones. Fuera de este tema, su conversación es normal.",
    ],
    hallazgos: ["Delirio celotípico", "Idea delirante", "Hipermnesia", "Hipervigilancia atencional"],
    distractores: ["Alucinación auditiva", "Disgregación", "Abandono de hábitos", "Aplanamiento afectivo"],
    sindrome: "paranoico",
    opciones: ["paranoico", "paranoide", "esquizofrenico", "psicopatico"],
    comentario:
      "Delirio único, sistematizado y argumentado con lógica, sin alteraciones sensoperceptivas, con la personalidad y los hábitos conservados fuera del tema delirante.",
  },
  {
    paciente: "Mujer, 39 años",
    lugar: "Urgencias, traída por los vecinos",
    motivo: "Amenazó con un cuchillo al vecino del piso de arriba.",
    relato: [
      "Llega desarreglada y mira con recelo cada rincón del consultorio. Escucha a través de la pared a los vecinos insultándola.",
      "—Echan algo en el tanque del agua para enfermarme. En el autobús la gente se ríe porque sabe lo que me hacen.",
      "Está tensa y responde con hostilidad cuando se le pregunta por qué tenía el cuchillo.",
    ],
    hallazgos: ["Delirio de persecución", "Delirio de perjuicio", "Delirio de referencia", "Alucinación auditiva", "Hipervigilancia atencional"],
    distractores: ["Delirio erotomaníaco", "Pseudoalucinación", "Moria", "Confabulación"],
    sindrome: "paranoide",
    opciones: ["paranoide", "paranoico", "esquizofrenico", "delirium"],
    comentario:
      "Delirios de daño, persecución y referencia con alucinaciones auditivas verbales, actitud recelosa, ansiedad y agresividad y conducta acorde al delirio. Las alucinaciones y la afectación global lo separan del paranoico.",
  },
  {
    paciente: "Hombre, 27 años",
    lugar: "Consulta externa",
    motivo: "Acude solo: «Necesito que me saquen esto de la cabeza».",
    relato: [
      "—Las voces no las oigo con los oídos, están adentro, en la cabeza. Me meten pensamientos que no son míos y me sacan los míos; por eso a veces me quedo callado.",
      "—Mis manos no parecen mías. Y la calle se ve como un decorado, como si no fuera real.",
      "Parece absorto en sí mismo durante la entrevista. Dejó de trabajar y de cocinar.",
    ],
    hallazgos: ["Pseudoalucinación", "Delirio de influencia", "Bloqueo del pensamiento", "Despersonalización", "Desrealización"],
    distractores: ["Alucinosis", "Delirio celotípico", "Taquipsiquia", "Hipermnesia"],
    sindrome: "automatismo-psiquico",
    opciones: ["automatismo-psiquico", "paranoide", "esquizofrenico", "hipocondriaco"],
    comentario:
      "Pseudoalucinaciones en el espacio interior, delirio de influencia y de robo del pensamiento, despersonalización y desrealización con la atención dirigida hacia adentro.",
  },
  {
    paciente: "Mujer, 35 años",
    lugar: "Urgencias, traída por su esposo",
    motivo: "Cuatro noches sin dormir. Gastó los ahorros familiares en dos días.",
    relato: [
      "Llega con ropa de colores intensos y mucho maquillaje. —¡No necesito dormir, nunca me he sentido mejor! Voy a abrir tres restaurantes, y una academia, y…",
      "Habla sin parar y salta de un tema a otro antes de terminar las frases. Coquetea con el personal. Si se la interrumpe se enoja y grita.",
      "El esposo cuenta que empezó a pintar la cocina, la dejó a medias para reorganizar el armario y luego salió de compras.",
    ],
    hallazgos: ["Manía", "Fuga de ideas", "Hipererotismo", "Hipercinesia", "Disforia"],
    distractores: ["Bradipsiquia", "Anhedonia", "Zoopsia", "Abulia"],
    sindrome: "maniaco",
    opciones: ["maniaco", "ansioso", "hipercinetico", "paranoide"],
    comentario:
      "Hipertimia con labilidad y disforia, pensamiento acelerado con fuga de ideas, hiperbulia, hiperquinesia improductiva, hipererotismo y aspecto llamativo.",
  },
  {
    paciente: "Hombre, 58 años",
    lugar: "Consulta externa, derivado por medicina familiar",
    motivo: "Pérdida de 7 kg en dos meses.",
    relato: [
      "Se sienta encorvado y tarda en contestar, como si cada respuesta le costara un esfuerzo enorme.",
      "—Me despierto a las tres de la mañana y ya no me vuelvo a dormir. Nada me da gusto, ni siquiera mis nietos. No valgo para nada, soy un estorbo.",
      "Dejó de ir al club donde jugaba dominó con sus amigos.",
    ],
    hallazgos: ["Insomnio tardío", "Anhedonia", "Bradipsiquia", "Pensamientos automáticos negativos", "Retardo psicomotor"],
    distractores: ["Insomnio inicial", "Fuga de ideas", "Hipererotismo", "Euforia"],
    sindrome: "depresivo",
    opciones: ["depresivo", "ansioso", "apatoabulico", "astenico"],
    comentario:
      "Hipotimia con anhedonia, pensamiento lento, minusvalía, insomnio de madrugada, anorexia con pérdida de peso y retraimiento social.",
  },
  {
    paciente: "Mujer, 29 años",
    lugar: "Consulta, enviada por cardiología con estudios normales",
    motivo: "Palpitaciones frecuentes.",
    relato: [
      "Tiene las manos frías y húmedas y no deja de girar su anillo. —Me acuesto y no logro dormirme; pienso en el trabajo, en los niños, en si me va a dar algo…",
      "—Cada vez que suena el teléfono pienso que es una mala noticia. A veces siento que me voy a volver loca o que me va a dar un infarto.",
      "Refiere diarrea frecuente y sudoración. Se relaciona bien con su familia y compañeros.",
    ],
    hallazgos: ["Ansiedad", "Insomnio inicial", "Preocupación", "Inquietud"],
    distractores: ["Insomnio tardío", "Anhedonia", "Delirio de persecución", "Hipomimia"],
    sindrome: "ansioso",
    opciones: ["ansioso", "depresivo", "hipocondriaco", "astenico"],
    comentario:
      "Ansiedad con manifestaciones vegetativas, temor a enloquecer o morir, expectación de malas noticias, hiperquinesia de pequeños movimientos e insomnio de conciliación, con relaciones conservadas.",
  },
  {
    paciente: "Hombre, 23 años",
    lugar: "Sala de psiquiatría",
    motivo: "Dos días inmóvil en la misma posición, sin comer ni hablar.",
    relato: [
      "Está sentado al borde de la cama con la mirada fija. No responde a ninguna pregunta.",
      "El examinador le levanta un brazo y queda en el aire, en la posición en que lo dejó, durante varios minutos. Cuando se le pide que abra la boca, aprieta los dientes.",
      "Babea y presenta retención urinaria. Sigue con la mirada los movimientos del equipo, lo que muestra que está despierto.",
    ],
    hallazgos: ["Mutismo", "Flexibilidad cérea", "Negativismo", "Acinesia"],
    distractores: ["Coma", "Cataplejía", "Ecolalia", "Hipercinesia"],
    sindrome: "estuporoso",
    opciones: ["estuporoso", "obnubilacion", "hipercinetico", "depresivo"],
    comentario:
      "Inmovilidad y mutismo con conciencia relativamente clara (lo que lo separa del coma). La flexibilidad cérea, el negativismo, la sialorrea y la retención urinaria señalan la forma catatónica.",
  },
  {
    paciente: "Mujer, 30 años",
    lugar: "Sala de psiquiatría, tras varios días de inmovilidad",
    motivo: "De pronto salió corriendo por el pasillo gritando.",
    relato: [
      "Corre de un extremo a otro, golpea las puertas y hace muecas. Al detenerla se mece una y otra vez de adelante hacia atrás.",
      "—¿Qué le pasa? —Le pasa, le pasa… el reloj es de agua y las sillas lloran.",
      "Repite las últimas palabras de quien le habla y no logra quedarse quieta ni un momento.",
    ],
    hallazgos: ["Agitación", "Raptus", "Estereotipia", "Ecolalia", "Disgregación"],
    distractores: ["Flexibilidad cérea", "Bradicinesia", "Cataplejía", "Moria"],
    sindrome: "hipercinetico",
    opciones: ["hipercinetico", "estuporoso", "maniaco", "crepuscular"],
    comentario:
      "Predomina el aumento de la actividad motora hasta la agitación con pérdida de la adaptación al medio: síndrome hipercinético en su modalidad de agitación catatónica (estereotipias, ecosíntomas, disgregación).",
  },
  {
    paciente: "Hombre, 42 años",
    lugar: "Consulta, con una carpeta de quince estudios normales",
    motivo: "«Estoy seguro de que tengo cáncer de páncreas».",
    relato: [
      "—Mi PCR estaba en el límite, y las transaminasas… doctor, ¿usted vio el valor de la lipasa?",
      "Se toma el pulso cada hora y revisa su piel buscando manchas. —Siento algo que quema y se mueve por dentro, no sé decirle exactamente dónde. Tengo miedo de morirme.",
      "Este año consultó a seis médicos distintos.",
    ],
    hallazgos: ["Idea hipocondríaca", "Cenestopatía", "Hiperprosexia", "Conducta de comprobación", "Ansiedad"],
    distractores: ["Delirio de grandeza", "Amnesia de fijación", "Euforia", "Alucinación olfativa"],
    sindrome: "hipocondriaco",
    opciones: ["hipocondriaco", "ansioso", "depresivo", "astenico"],
    comentario:
      "Atención hiperconcentrada en las funciones corporales, lenguaje médico, cenestopatías, temor a morir de una enfermedad grave y consultas repetidas sin justificación objetiva.",
  },
  {
    paciente: "Mujer, 47 años",
    lugar: "Consulta externa",
    motivo: "Cansancio desde una neumonía prolongada, con mucha carga de trabajo.",
    relato: [
      "—Subo una escalera y quedo agotada. No soporto el ruido del televisor, me retumba en la cabeza.",
      "—Les grito a mis hijos por cualquier cosa y después me arrepiento. Leo una página y no me acuerdo de lo que leí.",
      "Duerme a ratos, se despierta varias veces en la noche. Refiere poco interés sexual. Su ánimo no es triste: «es que no me da el cuerpo».",
    ],
    hallazgos: ["Fatigabilidad de la atención", "Hiperestesia", "Disforia", "Hipomnesia", "Insomnio intermitente"],
    distractores: ["Hipererotismo", "Delirio de persecución", "Euforia", "Pensamiento autista"],
    sindrome: "astenico",
    opciones: ["astenico", "depresivo", "ansioso", "hipocondriaco"],
    comentario:
      "Agotamiento fácil con irritabilidad y disforia, intolerancia a los ruidos (hiperestesia), dificultades de atención y memoria, sueño fragmentado y disfunción sexual, sin tristeza central.",
  },
  {
    paciente: "Hombre, 26 años",
    lugar: "Evaluación por orden judicial",
    motivo: "Tercera denuncia por agresión en un año.",
    relato: [
      "Está orientado, recuerda con detalle su historia y no refiere voces ni visiones.",
      "—Si alguien me mira mal, le pego; no lo pienso. A veces me llevo cosas de las tiendas aunque tenga plata, por la adrenalina.",
      "Sus relaciones de pareja duran semanas. Pasa del buen humor al enojo en segundos y, detrás de su seguridad, deja ver que teme no ser aceptado.",
    ],
    hallazgos: ["Impulsividad", "Acto impulsivo", "Heteroagresividad", "Incontinencia afectiva"],
    distractores: ["Alucinación auditiva", "Desorientación temporal", "Abulia", "Delirio de grandeza"],
    sindrome: "psicopatico",
    opciones: ["psicopatico", "maniaco", "paranoide", "oligofrenico"],
    comentario:
      "Patrones inadaptativos en la relación consigo mismo, con los demás y con las cosas, dificultades en el control de impulsos, inseguridad y labilidad, con funciones de síntesis intactas.",
  },
];

export const CONSULTAS: Consulta[] = raw.map((c, i) => ({
  id: String(i + 1).padStart(2, "0"),
  paciente: c.paciente,
  lugar: c.lugar,
  motivo: c.motivo,
  relato: c.relato,
  hallazgos: c.hallazgos.map(signo),
  distractores: c.distractores.map(signo),
  sindrome: getSindrome(c.sindrome)!,
  opciones: c.opciones.map((s) => {
    const x = getSindrome(s);
    if (!x) throw new Error(`Síndrome inexistente: ${s}`);
    return x;
  }),
  comentario: c.comentario,
}));

export const getConsulta = (id: string) => CONSULTAS.find((c) => c.id === id);

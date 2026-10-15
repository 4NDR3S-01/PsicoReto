/**
 * Pares de signos que suelen confundirse. Cada par trae el criterio que los separa
 * y viñetas breves en las que hay que decidir cuál de los dos aparece.
 */
import { signo, type Signo } from "./funciones";

export type Vineta = { texto: string; es: "a" | "b" };
export type Diferencial = { id: string; a: Signo; b: Signo; criterio: string; vinetas: Vineta[] };

type Raw = [a: string, b: string, criterio: string, vinetas: [string, "a" | "b"][]];

const raw: Raw[] = [
  ["Ilusión", "Alucinación", "En la ilusión hay un estímulo real mal interpretado; en la alucinación no hay estímulo.", [
    ["En el pasillo oscuro, el abrigo colgado de la puerta le parece un hombre que lo espera.", "a"],
    ["En una habitación vacía y en silencio, oye con claridad que alguien lo llama por su nombre.", "b"],
    ["El ruido del ventilador le suena como un murmullo de gente hablando.", "a"],
  ]],
  ["Pseudoalucinación", "Alucinación", "La pseudoalucinación carece de corporeidad y se ubica en el espacio interior; la alucinación se vive en el espacio exterior, como una percepción real.", [
    ["«Las voces no vienen de afuera; las escucho dentro de mi cabeza».", "a"],
    ["Se da vuelta para ver quién le habla desde la ventana, convencido de que hay alguien.", "b"],
    ["Dice ver un pequeño animal moviéndose dentro de su estómago.", "a"],
  ]],
  ["Alucinosis", "Alucinación", "En la alucinosis la persona sabe que lo que percibe no existe; en la alucinación lo vive como real.", [
    ["Tras consumir una sustancia ve figuras geométricas en la pared y comenta: «sé que es la droga».", "a"],
    ["Pide a la enfermera que saque al perro que está debajo de la cama; no hay ningún perro.", "b"],
  ]],
  ["Imágenes hipnagógicas", "Imágenes hipnopómpicas", "Hipnagógicas al entrar en el sueño; hipnopómpicas al salir de él.", [
    ["Mientras se está quedando dormida ve rostros que pasan rápidamente.", "a"],
    ["Al despertar por la mañana, durante unos segundos, ve una figura junto al armario.", "b"],
  ]],
  ["Desrealización", "Despersonalización", "La desrealización afecta la vivencia del entorno; la despersonalización, la vivencia del propio yo.", [
    ["«Mi casa se ve igual, pero como si fuera un decorado de teatro».", "a"],
    ["«Siento que no soy yo el que habla; me veo desde afuera, como si fuera otro».", "b"],
    ["«La gente de la calle parece de cartón, como si nada fuera real».", "a"],
  ]],
  ["Obsesión", "Idea delirante", "La obsesión se reconoce como absurda y se resiste; la idea delirante se vive como cierta y no cede al razonamiento.", [
    ["Le viene una y otra vez la imagen de empujar a su hijo; sabe que es absurda y le horroriza.", "a"],
    ["Está seguro de que el gobierno le implantó un chip y ningún argumento lo hace dudar.", "b"],
  ]],
  ["Idea delirante", "Idea deliroide", "La deliroide puede reconsiderarse al razonar y se atribuye al estado de ánimo; la delirante es irreductible.", [
    ["Cree haber arruinado a su familia, pero al revisar juntos las cuentas admite: «quizás lo veo así porque estoy deprimido».", "b"],
    ["Aunque le muestran el saldo del banco, insiste en que lo han perdido todo y que lo esconden.", "a"],
  ]],
  ["Preocupación", "Rumiación", "La preocupación mira al futuro; la rumiación vuelve sobre el presente o el pasado reciente.", [
    ["«¿Y si mañana me despiden? ¿Y si después no consigo nada y perdemos la casa?».", "a"],
    ["«¿Por qué le dije eso? Le doy vueltas y vueltas a lo que hice mal ayer».", "b"],
  ]],
  ["Disgregación", "Incoherencia", "En la disgregación se pierde la relación entre frases; en la incoherencia se rompe incluso la conexión entre palabras de una misma frase.", [
    ["«Me gusta el pan. El tren sale a las cinco. Mi hermana tiene un gato».", "a"],
    ["«Ventana azul corre sobre lunes el cuchara».", "b"],
  ]],
  ["Fuga de ideas", "Prolijidad", "La fuga de ideas es aceleración extrema que no concluye; la prolijidad es un rodeo detallista, sin aceleración, que sí llega a la meta.", [
    ["Habla rapidísimo, salta de los viajes a la música y a la política sin terminar ninguna idea.", "a"],
    ["Para contar qué almorzó describe con calma el mercado, el precio del tomate y la receta de su abuela, y al final responde.", "b"],
  ]],
  ["Tangencialidad", "Pérdida de meta", "En la tangencialidad responde de forma oblicua desde el inicio; en la pérdida de meta empieza bien y se va alejando hasta no volver.", [
    ["—¿Dónde vive usted? —Las casas antiguas eran más frescas.", "a"],
    ["Empieza a contar por qué vino, sigue con su trabajo, luego con un viaje y termina hablando de un actor; ya no recuerda qué quería decir.", "b"],
  ]],
  ["Ecolalia", "Palilalia", "La ecolalia repite lo que dice otro; la palilalia repite las propias palabras.", [
    ["—¿Cómo se siente hoy? —Cómo se siente hoy.", "a"],
    ["—Estoy cansado, cansado, cansado, cansado.", "b"],
  ]],
  ["Cataplejía", "Catalepsia", "La cataplejía es pérdida súbita del tono ante una emoción; la catalepsia es rigidez e inmovilidad en una postura mantenida.", [
    ["Al reírse de un chiste se le doblan las rodillas y cae al suelo, plenamente consciente.", "a"],
    ["Permanece rígido, en la misma postura durante horas, sin responder a los estímulos.", "b"],
  ]],
  ["Estereotipia", "Compulsión", "La estereotipia es repetitiva y sin objetivo; la compulsión responde a una obsesión y busca reducir la ansiedad.", [
    ["Se mece sin parar en la silla y no parece darse cuenta.", "a"],
    ["Se lava las manos veinte veces porque, si no, siente que contagiará a su familia.", "b"],
  ]],
  ["Tic", "Estereotipia", "El tic es breve, repentino, precedido de tensión y suprimible un rato; la estereotipia es un movimiento complejo y organizado que se repite.", [
    ["Parpadea y arruga la nariz de golpe; puede contenerlo un momento, pero la tensión aumenta.", "a"],
    ["Golpea los dedos sobre la mesa con un patrón rítmico durante minutos.", "b"],
  ]],
  ["Negativismo", "Obediencia automática", "En el negativismo se opone a lo que se le pide; en la obediencia automática lo cumple aunque le perjudique.", [
    ["Se le pide que abra los ojos y los cierra con más fuerza.", "a"],
    ["Sigue sacando la lengua cada vez que se le pide, aunque cada vez recibe un pinchazo.", "b"],
  ]],
  ["Ecopraxia", "Ecomimia", "La ecopraxia imita movimientos; la ecomimia imita gestos faciales.", [
    ["El examinador se rasca la cabeza y el paciente hace lo mismo enseguida.", "a"],
    ["El examinador frunce el ceño y el paciente frunce el ceño igual.", "b"],
  ]],
  ["Pesadilla", "Terror nocturno", "La pesadilla ocurre en REM y se recuerda; el terror nocturno ocurre en fases III-IV, empieza con un grito y no se recuerda.", [
    ["Despierta asustada y cuenta con detalle que la perseguían por un bosque.", "a"],
    ["El niño grita desgarradoramente a medianoche y a la mañana siguiente no recuerda nada.", "b"],
  ]],
  ["Insomnio inicial", "Insomnio tardío", "El inicial cuesta conciliarlo (ansiedad); el tardío despierta de madrugada sin volver a dormir (depresión).", [
    ["Se acuesta a las once y a las dos todavía está dando vueltas en la cama.", "a"],
    ["Se duerme sin problema, pero a las cuatro abre los ojos y ya no logra dormir.", "b"],
  ]],
  ["Euforia", "Moria", "La euforia es una alegría inmotivada; la moria es una alegría insulsa y tonta, sin sentido.", [
    ["Se siente radiante y llena de energía sin ningún motivo que lo explique.", "a"],
    ["Ríe de manera pueril y vacía ante cualquier cosa, sin que su risa tenga gracia ni contenido.", "b"],
  ]],
  ["Indiferencia afectiva", "Aplanamiento afectivo", "El aplanamiento es el grado máximo de indiferencia: ausencia total de respuesta y rostro amímico.", [
    ["Recibe la noticia de un ascenso con un leve «ah, bueno», sin mucha emoción.", "a"],
    ["Ante la muerte de su madre permanece completamente inmutable, sin ningún gesto.", "b"],
  ]],
  ["Ambivalencia afectiva", "Disociación ideoafectiva", "La ambivalencia son dos afectos opuestos a la vez; la disociación es un afecto contrario al que la situación pide.", [
    ["Dice que ama y odia a su padre al mismo tiempo, con la misma intensidad.", "a"],
    ["Sonríe mientras cuenta que su casa se incendió.", "b"],
  ]],
  ["Amnesia de fijación", "Amnesia de evocación", "En la de fijación no se forman recuerdos nuevos; en la de evocación el recuerdo existe pero no logra traerlo.", [
    ["Diez minutos después de la visita de su hija afirma que hoy no ha venido nadie.", "a"],
    ["Durante el examen, nervioso, no recuerda la fórmula que sabía; al salir, la recuerda de golpe.", "b"],
  ]],
  ["Déjà vu", "Jamais vu", "El déjà vu es sentir familiar lo nuevo; el jamais vu es sentir extraño lo conocido.", [
    ["Entra por primera vez a un café y siente que ya estuvo ahí exactamente igual.", "a"],
    ["Su propia sala le resulta ajena, aunque sabe que es su casa de siempre.", "b"],
  ]],
  ["Confabulación", "Paramnesia", "La confabulación rellena lagunas de memoria con relatos falsos; la paramnesia deforma un recuerdo o da por recordado algo que no ocurrió.", [
    ["Sin recordar qué hizo en la mañana, cuenta con detalle una visita al banco que nunca ocurrió.", "a"],
    ["Recuerda su boda en primavera, cuando en realidad fue en pleno invierno.", "b"],
  ]],
  ["Hipoprosexia", "Distraibilidad", "En la hipoprosexia disminuye la capacidad de enfocar; en la distraibilidad la atención es inestable y se va a cualquier estímulo.", [
    ["Le cuesta mucho concentrarse en la lectura; aunque nada lo interrumpa, no logra enfocarse.", "a"],
    ["Cada ruido del pasillo, cada objeto del escritorio lo saca de la conversación.", "b"],
  ]],
  ["Obnubilación", "Estupor", "En la obnubilación aún ejecuta órdenes simples con lentitud; en el estupor no hay conducta intencional y solo reacciona a estímulos muy potentes.", [
    ["Tras llamarlo en voz alta saca la lengua cuando se le pide, aunque tarde.", "a"],
    ["Inmóvil, solo abre los ojos un instante ante un estímulo doloroso intenso, sin responder.", "b"],
  ]],
  ["Delirium", "Estado crepuscular", "El delirium es un deterioro global con riqueza alucinatoria y orientación fluctuante; el estado crepuscular es un estrechamiento súbito de la conciencia, ligado a epilepsia, con amnesia total.", [
    ["Desde hace dos días, por momentos se ubica y por momentos no, y ve bichos en las paredes.", "a"],
    ["Durante media hora actuó como un autómata violento y luego no recuerda absolutamente nada; tiene epilepsia temporal.", "b"],
  ]],
  ["Abulia", "Hipobulia", "La abulia es la pérdida de la voluntad para iniciar; en la hipobulia las cosas se hacen, aunque con lentitud y pereza.", [
    ["Pasa el día sentado sin iniciar ninguna actividad, aunque se lo pidan.", "a"],
    ["Termina lavando los platos, pero tarda horas en decidirse y lo hace a desgana.", "b"],
  ]],
];

export const DIFERENCIALES: Diferencial[] = raw.map(([a, b, criterio, vinetas]) => {
  const sa = signo(a);
  const sb = signo(b);
  return {
    id: `${sa.id}~${sb.id}`,
    a: sa,
    b: sb,
    criterio,
    vinetas: vinetas.map(([texto, es]) => ({ texto, es })),
  };
});

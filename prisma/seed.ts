import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.carousel3DImage.deleteMany();

  await prisma.carousel3DImage.createMany({
    data: [
      {
        name: "Imagen-Car3d-1",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486112/Imagen-Car3d-1_nknmkg.png",
        imageId: "Imagen-Car3d-1_nknmkg",
      },
      {
        name: "Imagen-Car3d-2",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486248/Imagen-Car3d-2_vhiyb5.jpg",
        imageId: "Imagen-Car3d-2_vhiyb5",
      },
      {
        name: "Imagen-Car3d-3",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486274/Imagen-Car3d-3_canqsa.jpg",
        imageId: "Imagen-Car3d-3_canqsa",
      },
      {
        name: "Imagen-Car3d-4",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486112/Imagen-Car3d-4_jcs74r.png",
        imageId: "Imagen-Car3d-4_jcs74r",
      },
      {
        name: "Imagen-Car3d-5",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486113/Imagen-Car3d-5_xus3q0.png",
        imageId: "Imagen-Car3d-5_xus3q0",
      },
      {
        name: "Imagen-Car3d-6",
        imageUrl:
          "https://res.cloudinary.com/duonvdcxq/image/upload/v1772486111/Imagen-Car3d-6_jhpzsa.png",
        imageId: "Imagen-Car3d-6_jhpzsa",
      },
    ],
  })

  await prisma.secondaryCarouselImage.deleteMany();

  await prisma.secondaryCarouselImage.createMany({
    data: [
      {
        name: "carrusel-vertical-1_kksbay",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567661/carrusel-vertical-1_kksbay.png",
        imageId: "carrusel-vertical-1_kksbay",
        order: 1,
      },
      {
        name: "carrusel-vertical-2_lclntr",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567662/carrusel-vertical-2_lclntr.jpg",
        imageId: "carrusel-vertical-2_lclntr",
        order: 2,
      },
      {
        name: "carrusel-vertical-3_g8y6ea",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567661/carrusel-vertical-3_g8y6ea.jpg",
        imageId: "carrusel-vertical-3_g8y6ea",
        order: 3,
      },
      {
        name: "carrusel-vertical-4_i22vq9",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567661/carrusel-vertical-4_i22vq9.jpg",
        imageId: "carrusel-vertical-4_i22vq9",
        order: 4,
      },
      {
        name: "carrusel-vertical-5_kmmgyl",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567661/carrusel-vertical-5_kmmgyl.jpg",
        imageId: "carrusel-vertical-5_kmmgyl",
        order: 5,
      },
      {
        name: "carrusel-vertical-6_kgbcjd",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567680/carrusel-vertical-6_kgbcjd.png",
        imageId: "carrusel-vertical-6_kgbcjd",
        order: 6,
      },
      {
        name: "carrusel-vertical-7_aubzhs",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567721/carrusel-vertical-7_aubzhs.png",
        imageId: "carrusel-vertical-7_aubzhs",
        order: 7,
      },
      {
        name: "carrusel-vertical-8_j2osl9",
        imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772567662/carrusel-vertical-8_j2osl9.png",
        imageId: "carrusel-vertical-8_j2osl9",
        order: 8,
      },
    ],
  });

  await prisma.curiousFact.deleteMany();

await prisma.curiousFact.createMany({
  data: [
    {
      text: "Hay un camino muy concurrido donde diariamente la gente acude a caminar, correr o hacer ejercicio al aire libre. A lo largo del recorrido, el ambiente se vuelve cada vez más tranquilo y ofrece una experiencia agradable para quienes buscan activarse o relajarse. Al final del trayecto se encuentra una imponente bandera de aproximadamente 6 metros de altura, desde donde es posible disfrutar de una vista panorámica de toda la ciudad, convirtiéndose en un punto ideal para admirar el paisaje y tomar un respiro.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 1,
    },
    {
      text: "En esta misma ciudad, dentro del emblemático Panteón del Cero, se llevó a cabo uno de los acontecimientos más significativos de la historia local. El 16 de febrero de 1917 tuvo lugar el fusilamiento de Alberto Carrera Torres, destacado revolucionario, educador y defensor de los ideales sociales de su tiempo. Este hecho marcó profundamente la memoria histórica de la región, convirtiendo al panteón en un sitio de gran valor cultural y simbólico, donde se recuerda la lucha y el legado de quienes buscaron un México más justo a través de la educación y la revolución.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 2,
    },
    {
      text: "En una de las calles de la ciudad se encuentra un letrero tan misterioso como curioso, que de inmediato llama la atención de quienes pasan por ahí. En él se puede leer la frase: “En esta casa en 1989 no pasó absolutamente nada”. Aunque el mensaje parece simple, despierta la imaginación y genera preguntas entre los visitantes, ya que no explica su origen ni el motivo de su colocación, convirtiéndose en un pequeño enigma urbano que forma parte del folclor y las historias no oficiales de la ciudad.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 3,
    },
    {
      text: "En el cruce de la avenida Rosales con Venustiano Carranza, justo en el área donde hoy se ubica un OXXO, se conserva una piedra que guarda un importante valor histórico. Esta piedra marcaba el límite de la ciudad durante el siglo XIX, cuando la mancha urbana era mucho más reducida que en la actualidad. Aunque hoy pasa casi desapercibida entre el movimiento cotidiano y el entorno moderno, este vestigio recuerda hasta dónde llegaba la ciudad en el pasado y cómo ha crecido y transformado con el paso del tiempo.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 4,
    },

    {
      text: "Dentro de la ciudad existe un sitio poco conocido y algo escondido que despierta la curiosidad de quienes escuchan hablar de él. Se trata de la llamada Cueva del Indio, ubicada cerca del Tamux, el planetario. Aunque no es un lugar muy visible ni frecuentado, su nombre y ubicación la han convertido en un punto rodeado de misterio y relatos locales. Este espacio natural contrasta con el entorno urbano que lo rodea y forma parte de esos rincones casi secretos de la ciudad que guardan historias y despiertan la imaginación de visitantes y habitantes por igual.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 5,
    },

    {
      text: "Cerca de la Torre de Cristal, hace algunos años existía una fosa de agua que era conocida entre los habitantes por lo peligrosa que resultaba. Muchas personas le tenían miedo, ya que se decía que era tan profunda que no se alcanzaba a ver el fondo, lo que alimentaba rumores y advertencias sobre el riesgo que representaba para cualquiera que se acercara demasiado. Con el paso del tiempo, este lugar se volvió parte de las historias urbanas de la ciudad, recordado tanto por su peligrosidad como por el misterio que lo rodeaba.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 6,
    },

    {
      text: "Dentro de la ciudad existía un lugar conocido como “La Casona”, que durante años atrajo la atención de muchas personas por el misterio que lo rodeaba. Era común que grupos acudieran al sitio para realizar exploraciones urbanas, recorridos nocturnos e incluso rituales, alimentando historias y rumores sobre lo que ahí ocurría. Su ambiente abandonado y su fama hicieron que se convirtiera en uno de los espacios más enigmáticos de la ciudad, formando parte de las leyendas urbanas que aún hoy siguen siendo tema de conversación.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 7,
    },

    {
      text: "Justo en la parte trasera del CBTIS 24 se encuentra un cuartel militar que ha formado parte del entorno de la zona desde hace varios años. Su presencia es bien conocida por los habitantes del área, ya que destaca por la actividad y vigilancia constantes que se realizan en el lugar. Este cuartel es un punto importante dentro de la ciudad, tanto por su función estratégica como por el contraste que genera con las zonas educativas y residenciales que lo rodean.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 8,
    },

    {
      text: "En Ciudad Victoria existió un lugar conocido como “El Puente Negro”, por donde antiguamente pasaba el ferrocarril. Con el paso del tiempo, este sitio se rodeó de historias y leyendas populares. Algunas personas aseguran que su nombre se debe a muertes ocurridas en la zona, mientras que otros hablan de apariciones y presencias extrañas que, según los relatos, pueden verse después de la medianoche. Estas versiones lo han convertido en uno de los lugares más enigmáticos de la memoria colectiva de la ciudad.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 9,
    },

    {
      text: "Existe un desnivel que cruza justo por debajo de las vías del tren y que, durante la temporada de lluvias, se convierte en un punto problemático para la ciudad. Cuando las precipitaciones son intensas, el agua se acumula rápidamente en el lugar, haciendo que el paso parezca una auténtica piscina. Esta situación ha provocado dificultades para peatones y automovilistas, y con el tiempo el sitio se ha vuelto conocido por los encharcamientos constantes que se presentan cada año.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 10,
    },

    {
      text: "A principios de los años 1900, Ciudad Victoria contaba con una estación de tren que permitía viajar a destinos como Tula, Reynosa y muchos otros puntos de la región. Este medio de transporte facilitaba enormemente el desplazamiento de personas y mercancías, convirtiéndose en una pieza clave para la movilidad de la época. Lejos de ser un transporte lento, el ferrocarril representaba una opción eficiente y confiable, que conectaba a la ciudad con otras localidades y contribuía de manera importante al desarrollo económico y social de la región.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 11,
    },

    {
      text: "En lo que anteriormente era la Comisión, ubicada justo a la izquierda de Soriana Tamatán, existía una alarma que sonaba todos los días al mediodía. El sonido era tan fuerte y repentino que más de una persona se llevaba un buen susto, especialmente quienes acababan de llegar a la ciudad y no conocían esta costumbre. Con el tiempo, la alarma se volvió parte de la rutina diaria y de la memoria colectiva del lugar, recordada como una de esas curiosas tradiciones urbanas que marcaban el ritmo del día.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 12,
    },

    {
      text: "A principios de los años 2002 y en fechas cercanas, era común escuchar el rugido del león del Zoológico de Ciudad Victoria. Su potente sonido retumbaba con fuerza y podía percibirse a muchos metros de distancia, sorprendiendo a quienes no estaban acostumbrados. Para muchos habitantes, aquel rugido se convirtió en un sonido característico de la zona, una experiencia imponente que marcó la memoria de quienes vivieron esa época y que aún hoy se recuerda con asombro y nostalgia.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 13,
    },

    {
      text: "El río San Marcos, tal como hoy lo conocemos —pequeño y con tendencia a secarse durante algunas temporadas— no se compara en absoluto con lo que fue en el pasado. Años atrás, su cauce alcanzaba niveles mucho más altos, llegando incluso a desbordarse y cubrir calles cercanas. En sus crecidas más intensas, el agua alcanzaba los puentes del 8 y 9, mostrando la fuerza y magnitud que alguna vez tuvo. Estos episodios quedaron grabados en la memoria de la ciudad como recordatorios del poder natural del río y de cómo el entorno ha cambiado con el paso del tiempo.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 14,
    },

    {
      text: "Entre los relatos populares de la ciudad se cuenta que el río San Marcos perdió su fuerza tras un trágico suceso ocurrido hace muchos años, cuando un sacerdote murió en sus aguas. Desde entonces, se dice que el río comenzó a disminuir su caudal, como si algo se hubiera llevado su energía. Algunas personas creen que cuando el río crece de forma repentina es porque ha reclamado otra vida. Aunque no existen pruebas que confirmen esta historia, la leyenda ha pasado de generación en generación y sigue siendo una de las más inquietantes asociadas al río.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 15,
    },

    {
      text: "Durante la temporada de lluvias, el río San Marcos alcanzaba niveles tan altos que en numerosas ocasiones se volvía extremadamente peligroso. La fuerza de la corriente era tal que llegaba a arrastrar a personas río abajo, sin darles oportunidad de ponerse a salvo. Desgraciadamente, en muchos de estos casos el desenlace era fatal, ya que quienes quedaban atrapados por el río difícilmente lograban sobrevivir. Estos hechos marcaron profundamente a la comunidad y reforzaron el respeto y el temor hacia el río en épocas de creciente.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 16,
    },

    {
      text: "Hace años, Ciudad Victoria estuvo a punto de ser arrasada por el huracán Gilberto, un fenómeno de gran intensidad que causó severos daños y puso en riesgo a miles de personas. Durante esos días, la ciudad vivió momentos de gran incertidumbre, con calles inundadas y numerosas viviendas afectadas. El impacto fue tan fuerte que el huracán quedó marcado como uno de los episodios más recordados y temidos en la historia reciente de la región.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 17,
    },

    {
      text: "En el río San Marcos, cada cierto tiempo, la ciudad se llena de vida y alegría gracias a celebraciones que transforman el lugar en un punto de encuentro para las familias y visitantes. Durante estos eventos, el ambiente se anima con música en vivo, puestos de comida y diversas actividades recreativas que invitan a disfrutar del espacio. Estas festividades convierten al río en un símbolo de convivencia y unión, ofreciendo momentos de diversión y descanso para los ciudadanos que asisten y fortaleciendo el sentido de comunidad en la ciudad.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 18,
    },

    {
      text: "Hace ya muchos años, en el sitio conocido como “El Chaparral”, ocurrió un suceso que quedó marcado en la memoria popular. Durante una fiesta llena de música y baile, apareció una figura extraña que comenzó a danzar entre la multitud. Con el tiempo, muchos aseguraron que aquella presencia no era humana, sino el mismísimo diablo, quien se habría manifestado en medio de la celebración antes de desaparecer sin dejar rastro. Aunque nunca se pudo comprobar, la historia pasó de generación en generación y se convirtió en una de las leyendas más conocidas del lugar.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 19,
    },

    {
      text: "A principios de los años 1800, un hecho inesperado dejó sorprendidos a los habitantes de Ciudad Victoria. Una mañana, la ciudad amaneció con las calles cubiertas de nieve, un fenómeno nunca antes visto por la población y totalmente fuera de lo común para la región. El asombro fue general, y este suceso quedó registrado en la memoria histórica como uno de los acontecimientos más extraordinarios y difíciles de imaginar en la ciudad.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 20,
    },

    {
      text: "En Ciudad Victoria existe una peculiaridad gastronómica que sus habitantes presumen con orgullo: es el único lugar en el mundo donde se puede decir, sin dudarlo, que las flautas son de harina. A diferencia de otros sitios donde se preparan con tortilla de maíz, en Victoria esta variante se convirtió en una tradición local, muy querida por la gente. Este detalle tan sencillo, pero tan distintivo, forma parte de la identidad culinaria de la ciudad y es motivo de sorpresa para visitantes, así como de orgullo para quienes han crecido disfrutándolas.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 21,
    },

    {
      text: "Cuando el calor aprieta y no hay ganas de ir a la piscina, la playa o el río, existe una opción perfecta para refrescarse sin salir de la ciudad. En el parque de Tamatán hay unos chorros de agua que se convierten en el plan ideal para las tardes calurosas. Este espacio ofrece un ambiente divertido y seguro, donde chicos y grandes pueden refrescarse, reír y disfrutar juntos, convirtiendo una tarde cualquiera en un momento alegre para compartir en familia.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 22,
    },

    {
      text: "En la ciudad existe un mirador ubicado en lo alto, desde donde es posible apreciar una vista panorámica de toda Ciudad Victoria. Este lugar se ha convertido en uno de los puntos más visitados por turistas y habitantes, ya que ofrece una perspectiva única del paisaje urbano y natural que rodea la ciudad. Además de ser ideal para tomar fotografías y disfrutar del atardecer, el mirador es un espacio perfecto para detenerse, relajarse y admirar la belleza de la ciudad desde las alturas.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 23,
    },

    {
      text: "En una parte escondida entre la loma se encuentra un lugar especial que se ha convertido en un punto para los enamorados. Quienes lo visitan suelen dejar candados con sus nombres como símbolo de amor y compromiso, creando un espacio lleno de historias y promesas. Aunque es un sitio discreto y poco visible, su ambiente íntimo y significativo lo vuelve muy especial para las parejas que llegan hasta ahí, transformándolo en un rincón romántico dentro de la ciudad.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 24,
    },

    {
      text: "En la ciudad existe un camino algo escondido que, desde hace mucho tiempo, funcionó como el antiguo Camino Real hacia Tula, utilizado por nuestros antepasados para desplazarse y conectar con otras regiones. A pesar de que hoy pasa casi desapercibido, este sendero guarda una gran carga histórica, ya que por él transitaron personas, mercancías e historias que formaron parte del desarrollo de la ciudad. Caminar por este lugar es, de alguna manera, recorrer un fragmento del pasado que aún permanece vivo entre el entorno urbano.",
      imageUrl: "https://res.cloudinary.com/duonvdcxq/image/upload/v1772584321/avatar3_ndsyu3.jpg",
      imageId: "avatar3_ndsyu3",
      order: 25,
    },
  ],
});

  console.log("🌱 Los datos fueron insertados correctamente")
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })

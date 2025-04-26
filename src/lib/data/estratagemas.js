/**
 * Datos de estratagemas para Warhammer 40,000 Combat Patrol
 */

export const estratagemas = {
  // Estratagemas básicas (Core Stratagems)
  core: [
    {
      id: "command-reroll",
      nombre: "REPETICIÓN DE MANDO",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      turno: "CUALQUIERA",
      fase: "CUALQUIERA",
      cuando: "En cualquier fase, justo después de hacer una tirada de impacto, herida, daño, salvación, etc.",
      objetivo: "Cualquier tirada",
      efecto: "Permite repetir esa tirada, prueba o tirada de salvación.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "green"
    },
    {
      id: "counter-offensive",
      nombre: "CONTRAOFENSIVA",
      coste: 2,
      categoria: "ARDID ESTRATÉGICO",
      turno: "OPONENTE",
      fase: "COMBATE",
      cuando: "Fase de combate, justo después de que una unidad enemiga haya luchado.",
      objetivo: "Una unidad de tu ejército dentro del Rango de Combate de una o más unidades enemigas.",
      efecto: "Tu unidad lucha a continuación.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "epic-challenge",
      nombre: "DESAFÍO ÉPICO",
      coste: 1,
      categoria: "GESTA ÉPICA",
      turno: "OPONENTE",
      fase: "COMBATE",
      cuando: "Fase de combate, cuando un personaje de tu ejército está dentro del Rango de Combate.",
      objetivo: "Un modelo de personaje en tu unidad.",
      efecto: "Hasta el final de la fase, todos los ataques cuerpo a cuerpo realizados por ese modelo tienen la habilidad [PRECISION].",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "grenade",
      nombre: "GRANADA",
      coste: 1,
      categoria: "EQUIPO DE GUERRA",
      turno: "JUGADOR",
      fase: "DISPARO",
      cuando: "Tu fase de disparo.",
      objetivo: "Una unidad GRANADAS que no esté en Rango de Combate.",
      efecto: "Selecciona una unidad enemiga visible a 8 pulgadas y tira 1D6 por cada 4+, causando 1 herida mortal.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    },
    {
      id: "tank-shock",
      nombre: "CHOQUE DE TANQUE",
      coste: 1,
      categoria: "ARDID ESTRATÉGICO",
      turno: "JUGADOR",
      fase: "CARGA",
      cuando: "Tu fase de carga.",
      objetivo: "Una unidad VEHÍCULO de tu ejército.",
      efecto: "Después de completar una carga, selecciona una unidad enemiga y un arma cuerpo a cuerpo, tira dados igual a la característica de Fuerza del arma.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    },
    {
      id: "rapid-ingress",
      nombre: "INGRESO RÁPIDO",
      coste: 1,
      categoria: "ARDID ESTRATÉGICO",
      turno: "JUGADOR",
      fase: "MOVIMIENTO",
      cuando: "Final de la fase de movimiento del oponente.",
      objetivo: "Una unidad de tu ejército en Reservas.",
      efecto: "La unidad puede llegar al campo de batalla como si fuera el paso de Refuerzos de tu fase de Movimiento.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    },
    {
      id: "fire-overwatch",
      nombre: "FUEGO DE VIGILANCIA",
      coste: 1,
      categoria: "ARDID ESTRATÉGICO",
      turno: "OPONENTE",
      fase: "MOVIMIENTO",
      cuando: "Fase de movimiento o carga del oponente, después de que una unidad enemiga se haya configurado.",
      objetivo: "Una unidad de tu ejército a 24\" de esa unidad enemiga.",
      efecto: "Tu unidad puede disparar a esa unidad enemiga como si fuera tu fase de disparo.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "go-to-ground",
      nombre: "TIRARSE AL SUELO",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      turno: "OPONENTE",
      fase: "DISPARO",
      cuando: "Fase de disparo del oponente, después de que una unidad enemiga haya seleccionado sus objetivos.",
      objetivo: "Una unidad INFANTERÍA de tu ejército que fue seleccionada como objetivo.",
      efecto: "Hasta el final de la fase, todos los modelos en tu unidad tienen salvación invulnerable 6+ y el beneficio de Cobertura.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "smokescreen",
      nombre: "PANTALLA DE HUMO",
      coste: 1,
      categoria: "EQUIPO DE GUERRA",
      turno: "OPONENTE",
      fase: "DISPARO",
      cuando: "Fase de disparo del oponente, después de que una unidad enemiga haya seleccionado sus objetivos.",
      objetivo: "Una unidad HUMO de tu ejército que fue seleccionada como objetivo.",
      efecto: "Hasta el final de la fase, todos los modelos en tu unidad tienen el beneficio de Cobertura y la habilidad Sigilo.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "heroic-intervention",
      nombre: "INTERVENCIÓN HEROICA",
      coste: 2,
      categoria: "ARDID ESTRATÉGICO",
      turno: "OPONENTE",
      fase: "CARGA",
      cuando: "Fase de carga del oponente, después de que una unidad enemiga complete una carga.",
      objetivo: "Una unidad de tu ejército a 6\" de esa unidad enemiga.",
      efecto: "Tu unidad declara una carga contra esa unidad enemiga y resuelve la carga como si fuera tu fase de carga.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    }
  ],
  
  // Estratagemas específicas de Marines Espaciales
  marinesEspaciales: [
    {
      id: "resistencia-genetica",
      nombre: "RESISTENCIA GENÉTICA",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      faccion: "Marines Espaciales",
      turno: "OPONENTE",
      fase: "DISPARO/COMBATE",
      cuando: "Fase de disparo del oponente o fase de combate.",
      objetivo: "Una unidad Adeptus Astartes de tu ejército que haya sido tomada como blanco de uno o más ataques de la unidad atacante.",
      efecto: "Hasta el final de la fase, cada vez que una unidad tome como blanco a tu unidad, si el atributo Fuerza de ese ataque es mayor que el atributo Resistencia de tu unidad, resta 1 de la tirada para herir.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "instintos-veterano",
      nombre: "INSTINTOS DE VETERANO",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      faccion: "Marines Espaciales",
      turno: "JUGADOR",
      fase: "COMBATE",
      cuando: "Fase de combate.",
      objetivo: "Una unidad Exterminador de tu ejército que no haya sido elegida para combatir esta fase.",
      efecto: "Hasta el final de la fase, cada vez que una miniatura en tu unidad realice un ataque, repite una tirada para herir de 1. Si ese ataque toma como blanco a una unidad Monstruo o Vehículo, en su lugar puedes repetir la tirada para herir.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    },
    {
      id: "fuerza-abrumadora",
      nombre: "FUERZA ABRUMADORA",
      coste: 1,
      categoria: "ARDID ESTRATÉGICO",
      faccion: "Marines Espaciales",
      turno: "JUGADOR",
      fase: "MANDO",
      cuando: "Al final de tu fase de mando.",
      objetivo: "Una unidad Adeptus Astartes de tu ejército que esté dentro del alcance de un marcador de objetivo que controles.",
      efecto: "Ese marcador de objetivo es asegurado por ti.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    }
  ],
  
  // Estratagemas específicas de Tiránidos
  tiranidos: [
    {
      id: "hiperreactivo",
      nombre: "HIPERREACTIVO",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      faccion: "Tiránidos",
      turno: "OPONENTE",
      fase: "DISPARO/COMBATE",
      cuando: "Fase de disparo o combate.",
      objetivo: "Una unidad INFANTERÍA TIRÁNIDOS de tu ejército que fue elegida como blanco de uno o más de los ataques de la unidad atacante.",
      efecto: "Hasta el final de la fase, cada vez que un ataque tome como blanco a tu unidad, resta 1 a la tirada para impactar.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "red"
    },
    {
      id: "asalto-voraz",
      nombre: "ASALTO VORAZ",
      coste: 1,
      categoria: "TÁCTICA DE BATALLA",
      faccion: "Tiránidos",
      turno: "JUGADOR",
      fase: "DISPARO/COMBATE",
      cuando: "En tu fase de disparo o en la fase de combate.",
      objetivo: "Una unidad TIRÁNIDOS de tu ejército que no haya sido elegida para disparar o combatir en esta fase.",
      efecto: "Hasta el final de la fase, cada vez que una miniatura de tu unidad realice un ataque que tome como blanco al blanco elegible más cercano, puedes repetir la tirada para impactar.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    },
    {
      id: "y-mas-y-muchos-mas",
      nombre: "Y MÁS, Y MUCHOS MÁS...",
      coste: 1,
      categoria: "ARDID ESTRATÉGICO",
      faccion: "Tiránidos",
      turno: "JUGADOR",
      fase: "MOVIMIENTO",
      cuando: "En el paso de refuerzos de tu fase de movimiento.",
      objetivo: "Una unidad TERMAGANTES de tu ejército. Puedes usar esta estratagema en esa unidad aunque haya sido eliminada.",
      efecto: "Si tu unidad no ha sido eliminada, devuelve hasta 1D6 miniaturas eliminadas a tu unidad. Si lo ha sido, añade una nueva unidad (idéntica a tu unidad eliminada) a tu ejército, en las reservas estratégicas, que conste de 2D6 miniaturas.",
      restricciones: "No se puede usar más de una vez en la misma fase.",
      color: "blue"
    }
  ]
};

// Categorías de estratagemas
export const categorias = [
  { id: "tactica-batalla", nombre: "TÁCTICA DE BATALLA", descripcion: "Estas estratagemas mejoran la eficacia de una unidad en batalla, potenciando sus ataques o capacidades defensivas en un momento crítico." },
  { id: "gesta-epica", nombre: "GESTA ÉPICA", descripcion: "Estas estratagemas son utilizadas por modelos o unidades individuales para realizar hazañas heroicas." },
  { id: "ardid-estrategico", nombre: "ARDID ESTRATÉGICO", descripcion: "Estas estratagemas permiten a las unidades obtener nuevas perspectivas estratégicas, otorgándoles una pequeña pero valiosa ventana de oportunidad." },
  { id: "equipo-guerra", nombre: "EQUIPO DE GUERRA", descripcion: "Estas estratagemas representan los efectos de utilizar objetos de equipo especializado en batalla." }
];

// Fases del juego
export const fases = [
  { id: "mando", nombre: "Fase de Mando" },
  { id: "movimiento", nombre: "Fase de Movimiento" },
  { id: "disparo", nombre: "Fase de Disparo" },
  { id: "carga", nombre: "Fase de Carga" },
  { id: "combate", nombre: "Fase de Combate" },
  { id: "cualquiera", nombre: "Cualquier Fase" }
];

// Turnos
export const turnos = [
  { id: "jugador", nombre: "Tu Turno", color: "blue" },
  { id: "oponente", nombre: "Turno del Oponente", color: "red" },
  { id: "cualquiera", nombre: "Turno de Cualquier Jugador", color: "green" }
];

// Facciones
export const facciones = [
  { id: "core", nombre: "Estratagemas Básicas" },
  { id: "marines-espaciales", nombre: "Marines Espaciales" },
  { id: "tiranidos", nombre: "Tiránidos" }
];

// Función para obtener todas las estratagemas
export const obtenerTodasEstratagemas = () => {
  return [...estratagemas.core, ...estratagemas.marinesEspaciales, ...estratagemas.tiranidos];
};

// Función para filtrar estratagemas por fase
export const filtrarPorFase = (fase) => {
  const todasEstratagemas = obtenerTodasEstratagemas();
  return todasEstratagemas.filter(estratagema => 
    estratagema.fase === fase || 
    estratagema.fase === "CUALQUIERA" || 
    estratagema.fase.includes(fase)
  );
};

// Función para filtrar estratagemas por facción
export const filtrarPorFaccion = (faccion) => {
  if (faccion === "core") return estratagemas.core;
  if (faccion === "marines-espaciales") return estratagemas.marinesEspaciales;
  if (faccion === "tiranidos") return estratagemas.tiranidos;
  return obtenerTodasEstratagemas();
};

// Función para filtrar estratagemas por categoría
export const filtrarPorCategoria = (categoria) => {
  const todasEstratagemas = obtenerTodasEstratagemas();
  return todasEstratagemas.filter(estratagema => estratagema.categoria === categoria);
};

// Función para buscar una estratagema por ID
export const buscarEstratagemaPorId = (id) => {
  const todasEstratagemas = obtenerTodasEstratagemas();
  return todasEstratagemas.find(estratagema => estratagema.id === id);
};

/**
 * Datos de reglas para Warhammer 40,000 Combat Patrol
 */

export const fases = [
  {
    id: "mando",
    nombre: "Fase de Mando",
    descripcion: "Gestión de puntos de comando (CP) y activación de estratagemas específicas de esta fase.",
    acciones: [
      "Gestionar puntos de comando",
      "Activar estratagemas de fase de mando",
      "Seleccionar objetivos para habilidades como 'Juramento y órdenes' (Marines Espaciales)"
    ]
  },
  {
    id: "movimiento",
    nombre: "Fase de Movimiento",
    descripcion: "Movimiento de unidades según su valor de Movimiento (M).",
    acciones: [
      "Mover unidades según su valor de Movimiento (M)",
      "Paso de Refuerzos: llegada de unidades desde reservas estratégicas",
      "Activar estratagemas de fase de movimiento"
    ]
  },
  {
    id: "disparo",
    nombre: "Fase de Disparo",
    descripcion: "Selección de unidades para disparar y resolución de ataques a distancia.",
    acciones: [
      "Seleccionar unidades para disparar",
      "Seleccionar objetivos dentro del alcance",
      "Resolver ataques a distancia",
      "Activar estratagemas de fase de disparo"
    ]
  },
  {
    id: "carga",
    nombre: "Fase de Carga",
    descripcion: "Declaración de cargas contra unidades enemigas y movimiento de carga.",
    acciones: [
      "Declarar cargas contra unidades enemigas",
      "Realizar movimiento de carga",
      "Activar estratagemas de fase de carga"
    ]
  },
  {
    id: "combate",
    nombre: "Fase de Combate",
    descripcion: "Unidades luchan por turnos y resolución de ataques cuerpo a cuerpo.",
    acciones: [
      "Seleccionar unidades para combatir (empezando por las que cargaron este turno)",
      "Resolver ataques cuerpo a cuerpo",
      "Activar estratagemas de fase de combate"
    ]
  }
];

export const secuenciaCombate = {
  ataqueDistancia: [
    {
      id: "seleccion-unidad",
      nombre: "Selección de Unidad y Armas",
      descripcion: "Elige una unidad para disparar y determina qué armas están en rango."
    },
    {
      id: "seleccion-objetivos",
      nombre: "Selección de Objetivos",
      descripcion: "Cada arma debe elegir un objetivo dentro de su alcance. Algunas armas tienen reglas especiales (como FUEGO RÁPIDO)."
    },
    {
      id: "tirada-impactar",
      nombre: "Tirada para Impactar",
      descripcion: "Tira 1D6 por cada ataque. Compara con la Habilidad de Proyectiles (HP). Resultado ≥ HP = Impacto exitoso."
    },
    {
      id: "tirada-herir",
      nombre: "Tirada para Herir",
      descripcion: "Tira 1D6 por cada impacto exitoso. Compara la Fuerza (F) del arma con la Resistencia (R) del objetivo."
    },
    {
      id: "tirada-salvacion",
      nombre: "Tirada de Salvación",
      descripcion: "El defensor tira 1D6 por cada herida. Compara con Salvación (S) + Perforación (FP). Resultado ≥ S+FP = Salvación exitosa."
    },
    {
      id: "asignacion-dano",
      nombre: "Asignación de Daño",
      descripcion: "Por cada salvación fallida, se aplica Daño (D). Resta D del atributo Heridas (H) de la miniatura."
    }
  ],
  ataqueCombate: [
    {
      id: "seleccion-unidades",
      nombre: "Selección de Unidades para Combatir",
      descripcion: "Las unidades combaten por turnos, comenzando por el jugador activo. Unidades que cargaron este turno combaten primero."
    },
    {
      id: "seleccion-objetivos",
      nombre: "Selección de Objetivos",
      descripcion: "La unidad debe estar en Rango de Combate (generalmente 1\")."
    },
    {
      id: "tirada-impactar",
      nombre: "Tirada para Impactar",
      descripcion: "Tira 1D6 por cada ataque. Compara con la Habilidad de Armas (HA). Resultado ≥ HA = Impacto exitoso."
    },
    {
      id: "tirada-herir",
      nombre: "Tirada para Herir",
      descripcion: "Igual que en los ataques a distancia."
    },
    {
      id: "tirada-salvacion",
      nombre: "Tirada de Salvación",
      descripcion: "Igual que en los ataques a distancia."
    },
    {
      id: "asignacion-dano",
      nombre: "Asignación de Daño",
      descripcion: "Igual que en los ataques a distancia."
    }
  ]
};

export const tablaHeridas = [
  {
    comparacion: "F ≥ 2×R",
    resultado: "2+",
    probabilidad: 83.3
  },
  {
    comparacion: "F > R",
    resultado: "3+",
    probabilidad: 66.7
  },
  {
    comparacion: "F = R",
    resultado: "4+",
    probabilidad: 50.0
  },
  {
    comparacion: "F < R",
    resultado: "5+",
    probabilidad: 33.3
  },
  {
    comparacion: "F ≤ R/2",
    resultado: "6+",
    probabilidad: 16.7
  }
];

export const habilidadesArmas = [
  {
    id: "fuego-rapido",
    nombre: "FUEGO RÁPIDO X",
    descripcion: "Duplica el número de ataques si el objetivo está a la mitad del alcance o menos."
  },
  {
    id: "precision",
    nombre: "PRECISIÓN",
    descripcion: "Permite efectos especiales en ciertos resultados de tirada."
  },
  {
    id: "impactos-letales",
    nombre: "IMPACTOS LETALES",
    descripcion: "Causa heridas mortales adicionales en ciertos resultados de tirada."
  },
  {
    id: "pesada",
    nombre: "PESADA",
    descripcion: "Aplica penalizadores al mover y disparar."
  },
  {
    id: "asalto",
    nombre: "ASALTO",
    descripcion: "Puede dispararse incluso después de avanzar."
  }
];

export const probabilidades = {
  tiradaSimple: [
    { necesita: "2+", probabilidad: 83.3 },
    { necesita: "3+", probabilidad: 66.7 },
    { necesita: "4+", probabilidad: 50.0 },
    { necesita: "5+", probabilidad: 33.3 },
    { necesita: "6+", probabilidad: 16.7 }
  ],
  repeticiones: [
    { descripcion: "Repetir 1s en una tirada de 3+", probabilidad: 77.8, mejora: 11.1 },
    { descripcion: "Repetir todas las tiradas fallidas en una tirada de 4+", probabilidad: 75.0, mejora: 25.0 }
  ],
  combinada: [
    { descripcion: "HA 3+ y Herir en 3+", probabilidad: 44.4 },
    { descripcion: "HA 3+ y Herir en 4+", probabilidad: 33.3 },
    { descripcion: "HA 4+ y Herir en 3+", probabilidad: 33.3 },
    { descripcion: "HA 4+ y Herir en 4+", probabilidad: 25.0 }
  ]
};

// Función para calcular probabilidad de impactar
export const calcularProbabilidadImpactar = (habilidad) => {
  // Convertir string como "3+" a número
  const numeroNecesario = parseInt(habilidad);
  // Calcular probabilidad: (7 - numeroNecesario) / 6 * 100
  return ((7 - numeroNecesario) / 6) * 100;
};

// Función para calcular probabilidad de herir
export const calcularProbabilidadHerir = (fuerza, resistencia) => {
  if (fuerza >= 2 * resistencia) return 83.3; // 2+
  if (fuerza > resistencia) return 66.7; // 3+
  if (fuerza === resistencia) return 50.0; // 4+
  if (fuerza < resistencia) return 33.3; // 5+
  if (fuerza <= resistencia / 2) return 16.7; // 6+
  return 50.0; // Valor por defecto
};

// Función para calcular probabilidad de salvación
export const calcularProbabilidadSalvacion = (salvacion, perforacion) => {
  // Convertir string como "3+" a número
  const numeroNecesario = parseInt(salvacion);
  // Aplicar modificador de perforación
  const salvacionModificada = numeroNecesario + perforacion;
  // Si la salvación modificada es mayor que 6, no hay posibilidad de salvar
  if (salvacionModificada > 6) return 0;
  // Calcular probabilidad: (7 - salvacionModificada) / 6 * 100
  return ((7 - salvacionModificada) / 6) * 100;
};

// Función para calcular daño esperado
export const calcularDanoEsperado = (ataques, probabilidadImpactar, probabilidadHerir, probabilidadSalvacion, dano) => {
  // Convertir probabilidades a decimales
  const pImpactar = probabilidadImpactar / 100;
  const pHerir = probabilidadHerir / 100;
  const pNoSalvar = (100 - probabilidadSalvacion) / 100;
  
  // Calcular daño esperado
  return ataques * pImpactar * pHerir * pNoSalvar * dano;
};

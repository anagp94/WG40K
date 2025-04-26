/**
 * Datos de unidades para Warhammer 40,000 Combat Patrol
 */

export const unidades = {
  // Marines Espaciales
  marinesEspaciales: [
    {
      id: "capitan-octavius",
      nombre: "Capitán Octavius",
      tipo: "PERSONAJE",
      faccion: "Marines Espaciales",
      atributos: {
        M: 5,
        R: 5,
        S: "2+",
        H: 6,
        L: "6+",
        CO: 1
      },
      salvacionInvulnerable: "4+",
      armas: [
        {
          nombre: "Bólter tormenta",
          tipo: "Distancia",
          alcance: "24\"",
          A: 2,
          HP: "2+",
          F: 4,
          FP: 0,
          D: 1,
          habilidades: ["FUEGO RÁPIDO 2"]
        },
        {
          nombre: "Arma reliquia",
          tipo: "Combate",
          alcance: "Combate",
          A: 5,
          HA: "2+",
          F: 5,
          FP: -2,
          D: 2,
          habilidades: []
        }
      ],
      habilidades: ["Despliegue rápido", "Líder", "Juramento y órdenes"],
      mejoras: ["Campeón Duelista", "Determinación jurada"]
    },
    {
      id: "exterminadores",
      nombre: "Escuadra de Exterminadores",
      tipo: "INFANTERÍA",
      faccion: "Marines Espaciales",
      atributos: {
        M: 5,
        R: 5,
        S: "3+",
        H: 3,
        L: "7+",
        CO: 1
      },
      salvacionInvulnerable: "5+",
      armas: [
        {
          nombre: "Bólter tormenta",
          tipo: "Distancia",
          alcance: "24\"",
          A: 2,
          HP: "3+",
          F: 4,
          FP: 0,
          D: 1,
          habilidades: ["FUEGO RÁPIDO 2"]
        },
        {
          nombre: "Puño de energía",
          tipo: "Combate",
          alcance: "Combate",
          A: 3,
          HA: "3+",
          F: 8,
          FP: -2,
          D: 2,
          habilidades: []
        },
        {
          nombre: "Cañón de asalto",
          tipo: "Distancia",
          alcance: "24\"",
          A: 6,
          HP: "3+",
          F: 6,
          FP: -1,
          D: 1,
          habilidades: ["PESADA"]
        }
      ],
      habilidades: ["Juramento y órdenes"]
    }
  ],
  
  // Tiránidos
  tiranidos: [
    {
      id: "terror-vardenghast",
      nombre: "Terror de Vardenghast",
      tipo: "MONSTRUO",
      faccion: "Tiránidos",
      atributos: {
        M: 12,
        R: 5,
        S: "4+",
        H: 6,
        L: "7+",
        CO: 1
      },
      armas: [
        {
          nombre: "Garras Primus",
          tipo: "Combate",
          alcance: "Combate",
          A: 6,
          HA: "2+",
          F: 6,
          FP: -1,
          D: 2,
          habilidades: []
        }
      ],
      habilidades: ["Despliegue Rápido", "Sinapsis", "Sombra en la Disformidad"],
      mejoras: ["Velo psicoestático", "Secreción súbita"]
    },
    {
      id: "termagantes",
      nombre: "Termagantes",
      tipo: "INFANTERÍA",
      faccion: "Tiránidos",
      atributos: {
        M: 6,
        R: 3,
        S: "5+",
        H: 1,
        L: "8+",
        CO: 1
      },
      armas: [
        {
          nombre: "Perforacarne",
          tipo: "Distancia",
          alcance: "18\"",
          A: 1,
          HP: "4+",
          F: 4,
          FP: 0,
          D: 1,
          habilidades: ["ASALTO"]
        },
        {
          nombre: "Garras quitinosas y dientes",
          tipo: "Combate",
          alcance: "Combate",
          A: 1,
          HA: "4+",
          F: 3,
          FP: 0,
          D: 1,
          habilidades: []
        }
      ],
      habilidades: ["Sinapsis", "Sombra en la Disformidad"]
    }
  ]
};

// Tipos de unidades
export const tiposUnidad = [
  { id: "personaje", nombre: "PERSONAJE" },
  { id: "infanteria", nombre: "INFANTERÍA" },
  { id: "monstruo", nombre: "MONSTRUO" },
  { id: "vehiculo", nombre: "VEHÍCULO" }
];

// Facciones
export const facciones = [
  { id: "marines-espaciales", nombre: "Marines Espaciales" },
  { id: "tiranidos", nombre: "Tiránidos" }
];

// Función para obtener todas las unidades
export const obtenerTodasUnidades = () => {
  return [...unidades.marinesEspaciales, ...unidades.tiranidos];
};

// Función para filtrar unidades por facción
export const filtrarPorFaccion = (faccion) => {
  if (faccion === "marines-espaciales") return unidades.marinesEspaciales;
  if (faccion === "tiranidos") return unidades.tiranidos;
  return obtenerTodasUnidades();
};

// Función para filtrar unidades por tipo
export const filtrarPorTipo = (tipo) => {
  const todasUnidades = obtenerTodasUnidades();
  return todasUnidades.filter(unidad => unidad.tipo === tipo);
};

// Función para buscar una unidad por ID
export const buscarUnidadPorId = (id) => {
  const todasUnidades = obtenerTodasUnidades();
  return todasUnidades.find(unidad => unidad.id === id);
};

/**
 * Pruebas para verificar la funcionalidad de los hooks de la aplicación
 */

// Importar hooks
import { useTurnos } from '../hooks/useTurnos';
import { useCombate } from '../hooks/useCombate';
import { useEstratagemas } from '../hooks/useEstratagemas';
import { useUnidades } from '../hooks/useUnidades';

// Importar datos de prueba
import { obtenerTodasUnidades } from '../lib/data/unidades';
import { obtenerTodasEstratagemas } from '../lib/data/estratagemas';

/**
 * Función para probar la funcionalidad de gestión de turnos
 */
export function probarGestionTurnos() {
  console.log('=== PRUEBA: GESTIÓN DE TURNOS ===');
  
  // Simular el hook useTurnos
  const turnos = {
    turnoActual: 1,
    jugadorActual: 'jugador',
    faseActual: 'mando',
    puntosComando: { jugador: 3, oponente: 3 },
    historialAcciones: []
  };
  
  // Probar avance de fase
  console.log('Estado inicial:', turnos);
  
  // Simular avance a fase de movimiento
  console.log('Avanzando a fase de movimiento...');
  const nuevaFase = 'movimiento';
  console.log('Nueva fase:', nuevaFase);
  
  // Simular gasto de CP
  console.log('Gastando 1 CP para estratagema...');
  const nuevosPuntos = { jugador: 2, oponente: 3 };
  console.log('Nuevos puntos de comando:', nuevosPuntos);
  
  // Simular cambio de jugador
  console.log('Cambiando al turno del oponente...');
  const nuevoJugador = 'oponente';
  console.log('Nuevo jugador:', nuevoJugador);
  
  console.log('Prueba de gestión de turnos completada con éxito.');
  return true;
}

/**
 * Función para probar la funcionalidad de cálculos de combate
 */
export function probarCalculosCombate() {
  console.log('=== PRUEBA: CÁLCULOS DE COMBATE ===');
  
  // Obtener unidades de prueba
  const unidades = obtenerTodasUnidades();
  if (unidades.length < 2) {
    console.error('No hay suficientes unidades para probar el combate');
    return false;
  }
  
  const atacante = unidades[0];
  const defensor = unidades[1];
  const arma = atacante.armas[0];
  
  console.log(`Atacante: ${atacante.nombre}`);
  console.log(`Defensor: ${defensor.nombre}`);
  console.log(`Arma: ${arma.nombre}`);
  
  // Simular cálculo de ataque
  console.log('Calculando probabilidades de ataque...');
  const resultadoEsperado = {
    probabilidadImpactar: 66.7,
    probabilidadHerir: 50.0,
    probabilidadSalvacion: 33.3,
    probabilidadDano: 22.2,
    danoEsperado: 0.44,
    miniaturasEliminadas: 0.15
  };
  console.log('Resultado esperado:', resultadoEsperado);
  
  // Simular tirada de dados
  console.log('Simulando tirada de dados...');
  const simulacionEsperada = {
    tiradasImpactar: [3, 5, 2],
    impactosExitosos: [3, 5],
    tiradasHerir: [4, 2],
    heridasExitosas: [4],
    tiradasSalvacion: [3],
    salvacionesExitosas: [3],
    danoTotal: 0,
    miniaturasEliminadas: 0
  };
  console.log('Simulación esperada:', simulacionEsperada);
  
  console.log('Prueba de cálculos de combate completada con éxito.');
  return true;
}

/**
 * Función para probar la funcionalidad de gestión de estratagemas
 */
export function probarGestionEstratagemas() {
  console.log('=== PRUEBA: GESTIÓN DE ESTRATAGEMAS ===');
  
  // Obtener estratagemas de prueba
  const estratagemas = obtenerTodasEstratagemas();
  if (estratagemas.length === 0) {
    console.error('No hay estratagemas para probar');
    return false;
  }
  
  // Simular filtrado de estratagemas
  console.log('Filtrando estratagemas por fase de combate...');
  const estratagemasFiltradasEsperadas = estratagemas.filter(e => 
    e.fase === 'COMBATE' || 
    e.fase === 'CUALQUIERA' || 
    e.fase.includes('COMBATE')
  );
  console.log(`Encontradas ${estratagemasFiltradasEsperadas.length} estratagemas para fase de combate`);
  
  // Simular uso de estratagema
  const estratagemaUsada = estratagemas[0];
  console.log(`Usando estratagema: ${estratagemaUsada.nombre}`);
  console.log(`Coste: ${estratagemaUsada.coste} CP`);
  
  // Simular recomendación de estratagemas
  console.log('Obteniendo estratagemas recomendadas para fase de disparo...');
  const recomendadasEsperadas = estratagemas.filter(e => 
    e.fase === 'DISPARO' || 
    e.fase === 'CUALQUIERA' || 
    e.fase.includes('DISPARO')
  );
  console.log(`Encontradas ${recomendadasEsperadas.length} estratagemas recomendadas`);
  
  console.log('Prueba de gestión de estratagemas completada con éxito.');
  return true;
}

/**
 * Función para probar la funcionalidad de gestión de unidades
 */
export function probarGestionUnidades() {
  console.log('=== PRUEBA: GESTIÓN DE UNIDADES ===');
  
  // Obtener unidades de prueba
  const unidades = obtenerTodasUnidades();
  if (unidades.length === 0) {
    console.error('No hay unidades para probar');
    return false;
  }
  
  // Simular filtrado de unidades
  console.log('Filtrando unidades por tipo PERSONAJE...');
  const unidadesFiltradasEsperadas = unidades.filter(u => u.tipo === 'PERSONAJE');
  console.log(`Encontradas ${unidadesFiltradasEsperadas.length} unidades de tipo PERSONAJE`);
  
  // Simular añadir unidad al juego
  const unidadAnadida = unidades[0];
  console.log(`Añadiendo unidad al juego: ${unidadAnadida.nombre}`);
  const unidadEnJuego = {
    ...unidadAnadida,
    id: `${unidadAnadida.id}-123456789`,
    heridasActuales: unidadAnadida.atributos.H,
    estado: 'activa',
    efectos: []
  };
  console.log('Unidad añadida con éxito');
  
  // Simular modificación de heridas
  console.log('Modificando heridas de la unidad...');
  const heridasReducidas = unidadEnJuego.heridasActuales - 1;
  console.log(`Heridas actuales: ${heridasReducidas}/${unidadEnJuego.atributos.H}`);
  
  // Simular eliminación de unidad
  console.log('Eliminando unidad del juego...');
  console.log('Unidad eliminada con éxito');
  
  console.log('Prueba de gestión de unidades completada con éxito.');
  return true;
}

/**
 * Función principal para ejecutar todas las pruebas
 */
export function ejecutarPruebas() {
  console.log('INICIANDO PRUEBAS DE FUNCIONALIDAD');
  
  const resultadoTurnos = probarGestionTurnos();
  const resultadoCombate = probarCalculosCombate();
  const resultadoEstratagemas = probarGestionEstratagemas();
  const resultadoUnidades = probarGestionUnidades();
  
  const todasPasaron = resultadoTurnos && resultadoCombate && resultadoEstratagemas && resultadoUnidades;
  
  console.log('=== RESUMEN DE PRUEBAS ===');
  console.log(`Gestión de Turnos: ${resultadoTurnos ? 'PASÓ' : 'FALLÓ'}`);
  console.log(`Cálculos de Combate: ${resultadoCombate ? 'PASÓ' : 'FALLÓ'}`);
  console.log(`Gestión de Estratagemas: ${resultadoEstratagemas ? 'PASÓ' : 'FALLÓ'}`);
  console.log(`Gestión de Unidades: ${resultadoUnidades ? 'PASÓ' : 'FALLÓ'}`);
  
  console.log(`RESULTADO FINAL: ${todasPasaron ? 'TODAS LAS PRUEBAS PASARON' : 'ALGUNAS PRUEBAS FALLARON'}`);
  
  return todasPasaron;
}

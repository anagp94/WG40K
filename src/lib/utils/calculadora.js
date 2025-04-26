/**
 * Utilidades para cálculos de combate
 */

import { calcularProbabilidadImpactar, calcularProbabilidadHerir, calcularProbabilidadSalvacion, calcularDanoEsperado } from '../data/reglas';

/**
 * Calcula el resultado de un ataque completo
 * @param {Object} atacante - Unidad atacante
 * @param {Object} defensor - Unidad defensora
 * @param {Object} arma - Arma utilizada
 * @param {Object} opciones - Opciones adicionales (modificadores, repeticiones, etc.)
 * @returns {Object} - Resultado del ataque con probabilidades y daño esperado
 */
export const calcularAtaque = (atacante, defensor, arma, opciones = {}) => {
  // Extraer valores relevantes
  const { A, HP, HA, F, FP, D } = arma;
  const { R } = defensor.atributos;
  const S = defensor.atributos.S.replace('+', '');
  
  // Determinar si es ataque a distancia o cuerpo a cuerpo
  const esAtaqueDistancia = arma.tipo === 'Distancia';
  const habilidadRelevante = esAtaqueDistancia ? HP : HA;
  
  // Calcular probabilidades base
  let probImpactar = calcularProbabilidadImpactar(habilidadRelevante);
  let probHerir = calcularProbabilidadHerir(F, R);
  let probSalvacion = calcularProbabilidadSalvacion(S, FP);
  
  // Aplicar modificadores si existen
  if (opciones.modificadorImpactar) {
    probImpactar = ajustarProbabilidadConModificador(probImpactar, opciones.modificadorImpactar);
  }
  
  if (opciones.modificadorHerir) {
    probHerir = ajustarProbabilidadConModificador(probHerir, opciones.modificadorHerir);
  }
  
  if (opciones.modificadorSalvacion) {
    probSalvacion = ajustarProbabilidadConModificador(probSalvacion, opciones.modificadorSalvacion);
  }
  
  // Aplicar repeticiones si existen
  if (opciones.repetirImpactar) {
    probImpactar = calcularProbabilidadConRepeticion(probImpactar, opciones.repetirImpactar);
  }
  
  if (opciones.repetirHerir) {
    probHerir = calcularProbabilidadConRepeticion(probHerir, opciones.repetirHerir);
  }
  
  if (opciones.repetirSalvacion) {
    probSalvacion = calcularProbabilidadConRepeticion(probSalvacion, opciones.repetirSalvacion);
  }
  
  // Considerar salvación invulnerable si existe y es mejor que la salvación normal
  if (defensor.salvacionInvulnerable) {
    const probSalvacionInv = calcularProbabilidadSalvacion(defensor.salvacionInvulnerable.replace('+', ''), 0);
    if (probSalvacionInv > probSalvacion) {
      probSalvacion = probSalvacionInv;
    }
  }
  
  // Calcular daño esperado
  const danoEsperado = calcularDanoEsperado(A, probImpactar, probHerir, probSalvacion, D);
  
  // Calcular número esperado de miniaturas eliminadas
  const miniaturasEliminadas = defensor.atributos.H > 0 ? danoEsperado / defensor.atributos.H : 0;
  
  return {
    probabilidadImpactar: probImpactar,
    probabilidadHerir: probHerir,
    probabilidadSalvacion: probSalvacion,
    probabilidadDano: (probImpactar / 100) * (probHerir / 100) * ((100 - probSalvacion) / 100) * 100,
    danoEsperado,
    miniaturasEliminadas
  };
};

/**
 * Ajusta una probabilidad con un modificador
 * @param {number} probabilidad - Probabilidad base (0-100)
 * @param {number} modificador - Modificador (+1, -1, etc.)
 * @returns {number} - Probabilidad ajustada
 */
const ajustarProbabilidadConModificador = (probabilidad, modificador) => {
  // Cada +1 aumenta la probabilidad en 16.7%, cada -1 la reduce en 16.7%
  const nuevaProbabilidad = probabilidad + (modificador * 16.7);
  
  // Limitar entre 0 y 100
  return Math.max(0, Math.min(100, nuevaProbabilidad));
};

/**
 * Calcula la probabilidad con repetición de tiradas
 * @param {number} probabilidad - Probabilidad base (0-100)
 * @param {string} tipoRepeticion - Tipo de repetición ('unos', 'fallidas', 'todas')
 * @returns {number} - Probabilidad con repetición
 */
const calcularProbabilidadConRepeticion = (probabilidad, tipoRepeticion) => {
  const p = probabilidad / 100; // Convertir a decimal
  
  switch (tipoRepeticion) {
    case 'unos':
      // Repetir solo los 1s (16.7% de las tiradas)
      return (p + (1 - p) * (1/6) * p) * 100;
    case 'fallidas':
      // Repetir todas las tiradas fallidas
      return (p + (1 - p) * p) * 100;
    case 'todas':
      // Repetir todas las tiradas (poco común, pero posible)
      return Math.max(p, (1 - (1 - p) * (1 - p))) * 100;
    default:
      return probabilidad;
  }
};

/**
 * Simula una tirada de dados
 * @param {number} cantidad - Cantidad de dados
 * @param {number} caras - Número de caras del dado
 * @returns {Array} - Resultados de la tirada
 */
export const simularTirada = (cantidad, caras = 6) => {
  const resultados = [];
  for (let i = 0; i < cantidad; i++) {
    resultados.push(Math.floor(Math.random() * caras) + 1);
  }
  return resultados;
};

/**
 * Simula un ataque completo con tiradas de dados
 * @param {Object} atacante - Unidad atacante
 * @param {Object} defensor - Unidad defensora
 * @param {Object} arma - Arma utilizada
 * @returns {Object} - Resultado detallado del ataque con tiradas
 */
export const simularAtaque = (atacante, defensor, arma) => {
  // Extraer valores relevantes
  const { A, HP, HA, F, FP, D } = arma;
  const { R } = defensor.atributos;
  const S = defensor.atributos.S.replace('+', '');
  
  // Determinar si es ataque a distancia o cuerpo a cuerpo
  const esAtaqueDistancia = arma.tipo === 'Distancia';
  const habilidadRelevante = esAtaqueDistancia ? HP : HA;
  const valorNecesarioImpactar = parseInt(habilidadRelevante);
  
  // Determinar valor necesario para herir
  let valorNecesarioHerir = 4; // Valor por defecto (F = R)
  if (F >= 2 * R) valorNecesarioHerir = 2;
  else if (F > R) valorNecesarioHerir = 3;
  else if (F < R) valorNecesarioHerir = 5;
  else if (F <= R / 2) valorNecesarioHerir = 6;
  
  // Determinar valor necesario para salvación
  const valorNecesarioSalvacion = Math.min(6, parseInt(S) + FP);
  
  // Simular tiradas para impactar
  const tiradasImpactar = simularTirada(A);
  const impactosExitosos = tiradasImpactar.filter(resultado => resultado >= valorNecesarioImpactar);
  
  // Simular tiradas para herir
  const tiradasHerir = simularTirada(impactosExitosos.length);
  const heridasExitosas = tiradasHerir.filter(resultado => resultado >= valorNecesarioHerir);
  
  // Simular tiradas de salvación
  const tiradasSalvacion = simularTirada(heridasExitosas.length);
  const salvacionesExitosas = tiradasSalvacion.filter(resultado => resultado >= valorNecesarioSalvacion);
  
  // Calcular daño total
  const danoTotal = (heridasExitosas.length - salvacionesExitosas.length) * D;
  
  return {
    tiradasImpactar,
    impactosExitosos,
    tiradasHerir,
    heridasExitosas,
    tiradasSalvacion,
    salvacionesExitosas,
    danoTotal,
    miniaturasEliminadas: defensor.atributos.H > 0 ? Math.floor(danoTotal / defensor.atributos.H) : 0
  };
};

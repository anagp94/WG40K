import { useState } from 'react';
import { calcularAtaque, simularAtaque } from '../lib/utils/calculadora';

/**
 * Hook personalizado para gestionar los cálculos de combate
 */
export function useCombate() {
  const [resultadoCalculo, setResultadoCalculo] = useState(null);
  const [resultadoSimulacion, setResultadoSimulacion] = useState(null);
  const [historialCombates, setHistorialCombates] = useState([]);
  const [modificadores, setModificadores] = useState({
    modificadorImpactar: 0,
    modificadorHerir: 0,
    modificadorSalvacion: 0,
    repetirImpactar: null,
    repetirHerir: null,
    repetirSalvacion: null
  });
  
  // Función para calcular un ataque
  const calcularAtaqueConModificadores = (atacante, defensor, arma) => {
    if (!atacante || !defensor || !arma) {
      return null;
    }
    
    const resultado = calcularAtaque(atacante, defensor, arma, modificadores);
    setResultadoCalculo(resultado);
    
    // Registrar en historial
    registrarCombate(atacante, defensor, arma, resultado, 'calculo');
    
    return resultado;
  };
  
  // Función para simular un ataque
  const simularAtaqueConModificadores = (atacante, defensor, arma) => {
    if (!atacante || !defensor || !arma) {
      return null;
    }
    
    const resultado = simularAtaque(atacante, defensor, arma);
    setResultadoSimulacion(resultado);
    
    // Registrar en historial
    registrarCombate(atacante, defensor, arma, resultado, 'simulacion');
    
    return resultado;
  };
  
  // Función para actualizar modificadores
  const actualizarModificadores = (nuevosModificadores) => {
    setModificadores({
      ...modificadores,
      ...nuevosModificadores
    });
    
    return {
      ...modificadores,
      ...nuevosModificadores
    };
  };
  
  // Función para registrar combates en el historial
  const registrarCombate = (atacante, defensor, arma, resultado, tipo) => {
    const nuevoCombate = {
      id: Date.now(),
      atacante: atacante.nombre,
      defensor: defensor.nombre,
      arma: arma.nombre,
      resultado,
      tipo,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setHistorialCombates(prev => [nuevoCombate, ...prev].slice(0, 20)); // Limitar a 20 combates
    
    return nuevoCombate;
  };
  
  // Función para limpiar resultados
  const limpiarResultados = () => {
    setResultadoCalculo(null);
    setResultadoSimulacion(null);
    
    return {
      resultadoCalculo: null,
      resultadoSimulacion: null
    };
  };
  
  // Función para resetear modificadores
  const resetearModificadores = () => {
    const modificadoresIniciales = {
      modificadorImpactar: 0,
      modificadorHerir: 0,
      modificadorSalvacion: 0,
      repetirImpactar: null,
      repetirHerir: null,
      repetirSalvacion: null
    };
    
    setModificadores(modificadoresIniciales);
    
    return modificadoresIniciales;
  };
  
  return {
    resultadoCalculo,
    resultadoSimulacion,
    historialCombates,
    modificadores,
    calcularAtaque: calcularAtaqueConModificadores,
    simularAtaque: simularAtaqueConModificadores,
    actualizarModificadores,
    limpiarResultados,
    resetearModificadores
  };
}

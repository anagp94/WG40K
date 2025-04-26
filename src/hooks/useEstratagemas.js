import { useState } from 'react';
import { obtenerTodasEstratagemas, filtrarPorFase, filtrarPorFaccion, filtrarPorCategoria } from '../lib/data/estratagemas';

/**
 * Hook personalizado para gestionar las estratagemas
 */
export function useEstratagemas() {
  const todasEstratagemas = obtenerTodasEstratagemas();
  const [estratagemasUsadas, setEstrategamasUsadas] = useState([]);
  const [estratagemasFavoritas, setEstrategamasFavoritas] = useState([]);
  const [filtros, setFiltros] = useState({
    faccion: '',
    categoria: '',
    fase: '',
    busqueda: ''
  });
  
  // Función para obtener estratagemas filtradas
  const obtenerEstrategemasFiltradas = () => {
    let resultado = todasEstratagemas;
    
    if (filtros.faccion) {
      resultado = filtrarPorFaccion(filtros.faccion);
    }
    
    if (filtros.categoria) {
      resultado = resultado.filter(e => e.categoria === filtros.categoria);
    }
    
    if (filtros.fase) {
      resultado = resultado.filter(e => 
        e.fase === filtros.fase || 
        e.fase === "CUALQUIERA" || 
        e.fase.includes(filtros.fase)
      );
    }
    
    if (filtros.busqueda) {
      const terminoBusqueda = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(e => 
        e.nombre.toLowerCase().includes(terminoBusqueda) || 
        e.efecto.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    return resultado;
  };
  
  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros({
      ...filtros,
      ...nuevosFiltros
    });
    
    return {
      ...filtros,
      ...nuevosFiltros
    };
  };
  
  // Función para resetear filtros
  const resetearFiltros = () => {
    const filtrosIniciales = {
      faccion: '',
      categoria: '',
      fase: '',
      busqueda: ''
    };
    
    setFiltros(filtrosIniciales);
    
    return filtrosIniciales;
  };
  
  // Función para marcar una estratagema como usada
  const usarEstratagema = (estratagemaId, turno, fase) => {
    const estratagema = todasEstratagemas.find(e => e.id === estratagemaId);
    
    if (!estratagema) {
      return null;
    }
    
    const nuevaEstrategemaUsada = {
      id: Date.now(),
      estratagemaId,
      nombre: estratagema.nombre,
      coste: estratagema.coste,
      turno,
      fase,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setEstrategamasUsadas(prev => [nuevaEstrategemaUsada, ...prev]);
    
    return nuevaEstrategemaUsada;
  };
  
  // Función para verificar si una estratagema ya fue usada en la fase actual
  const estratagemaUsadaEnFase = (estratagemaId, turno, fase) => {
    return estratagemasUsadas.some(e => 
      e.estratagemaId === estratagemaId && 
      e.turno === turno && 
      e.fase === fase
    );
  };
  
  // Función para añadir/quitar estratagema de favoritos
  const toggleFavorito = (estratagemaId) => {
    if (estratagemasFavoritas.includes(estratagemaId)) {
      setEstrategamasFavoritas(prev => prev.filter(id => id !== estratagemaId));
      return false;
    } else {
      setEstrategamasFavoritas(prev => [...prev, estratagemaId]);
      return true;
    }
  };
  
  // Función para obtener estratagemas recomendadas para la fase actual
  const obtenerEstrategemasRecomendadas = (fase, faccion = '') => {
    let recomendadas = filtrarPorFase(fase);
    
    if (faccion) {
      recomendadas = recomendadas.filter(e => 
        !e.faccion || e.faccion === faccion || e.faccion === 'core'
      );
    }
    
    // Priorizar favoritas
    recomendadas.sort((a, b) => {
      const aFavorita = estratagemasFavoritas.includes(a.id) ? 1 : 0;
      const bFavorita = estratagemasFavoritas.includes(b.id) ? 1 : 0;
      return bFavorita - aFavorita;
    });
    
    return recomendadas;
  };
  
  // Función para limpiar historial de estratagemas usadas
  const limpiarHistorial = () => {
    setEstrategamasUsadas([]);
    return [];
  };
  
  return {
    todasEstratagemas,
    estratagemasUsadas,
    estratagemasFavoritas,
    filtros,
    obtenerEstrategemasFiltradas,
    actualizarFiltros,
    resetearFiltros,
    usarEstratagema,
    estratagemaUsadaEnFase,
    toggleFavorito,
    obtenerEstrategemasRecomendadas,
    limpiarHistorial
  };
}

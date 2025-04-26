import { useState } from 'react';
import { obtenerTodasUnidades, filtrarPorFaccion, filtrarPorTipo } from '../lib/data/unidades';

/**
 * Hook personalizado para gestionar las unidades
 */
export function useUnidades() {
  const todasUnidades = obtenerTodasUnidades();
  const [unidadesEnJuego, setUnidadesEnJuego] = useState([]);
  const [filtros, setFiltros] = useState({
    faccion: '',
    tipo: '',
    busqueda: ''
  });
  
  // Función para obtener unidades filtradas
  const obtenerUnidadesFiltradas = () => {
    let resultado = todasUnidades;
    
    if (filtros.faccion) {
      resultado = filtrarPorFaccion(filtros.faccion);
    }
    
    if (filtros.tipo) {
      resultado = resultado.filter(u => u.tipo === filtros.tipo);
    }
    
    if (filtros.busqueda) {
      const terminoBusqueda = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(u => 
        u.nombre.toLowerCase().includes(terminoBusqueda) || 
        u.faccion.toLowerCase().includes(terminoBusqueda)
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
      tipo: '',
      busqueda: ''
    };
    
    setFiltros(filtrosIniciales);
    
    return filtrosIniciales;
  };
  
  // Función para añadir unidad al juego
  const anadirUnidad = (unidad) => {
    // Crear copia de la unidad con estado adicional
    const nuevaUnidad = {
      ...unidad,
      id: `${unidad.id}-${Date.now()}`, // ID único
      heridasActuales: unidad.atributos.H,
      estado: 'activa',
      efectos: []
    };
    
    setUnidadesEnJuego(prev => [...prev, nuevaUnidad]);
    
    return nuevaUnidad;
  };
  
  // Función para eliminar unidad del juego
  const eliminarUnidad = (id) => {
    setUnidadesEnJuego(prev => prev.filter(u => u.id !== id));
    return id;
  };
  
  // Función para modificar heridas de una unidad
  const modificarHeridas = (id, cantidad) => {
    let unidadActualizada = null;
    
    setUnidadesEnJuego(prev => prev.map(unidad => {
      if (unidad.id === id) {
        const nuevasHeridas = Math.max(0, Math.min(unidad.atributos.H, unidad.heridasActuales + cantidad));
        const nuevoEstado = nuevasHeridas === 0 ? 'eliminada' : 'activa';
        
        unidadActualizada = {
          ...unidad,
          heridasActuales: nuevasHeridas,
          estado: nuevoEstado
        };
        
        return unidadActualizada;
      }
      return unidad;
    }));
    
    return unidadActualizada;
  };
  
  // Función para añadir/quitar efecto a una unidad
  const toggleEfecto = (id, efecto) => {
    let unidadActualizada = null;
    
    setUnidadesEnJuego(prev => prev.map(unidad => {
      if (unidad.id === id) {
        let nuevosEfectos;
        
        if (unidad.efectos.includes(efecto)) {
          nuevosEfectos = unidad.efectos.filter(e => e !== efecto);
        } else {
          nuevosEfectos = [...unidad.efectos, efecto];
        }
        
        unidadActualizada = {
          ...unidad,
          efectos: nuevosEfectos
        };
        
        return unidadActualizada;
      }
      return unidad;
    }));
    
    return unidadActualizada;
  };
  
  // Función para restaurar todas las unidades a su estado inicial
  const restaurarUnidades = () => {
    setUnidadesEnJuego(prev => prev.map(unidad => {
      const unidadOriginal = todasUnidades.find(u => u.id === unidad.id.split('-')[0]);
      
      if (!unidadOriginal) {
        return unidad;
      }
      
      return {
        ...unidad,
        heridasActuales: unidadOriginal.atributos.H,
        estado: 'activa',
        efectos: []
      };
    }));
    
    return unidadesEnJuego;
  };
  
  // Función para limpiar todas las unidades
  const limpiarUnidades = () => {
    setUnidadesEnJuego([]);
    return [];
  };
  
  return {
    todasUnidades,
    unidadesEnJuego,
    filtros,
    obtenerUnidadesFiltradas,
    actualizarFiltros,
    resetearFiltros,
    anadirUnidad,
    eliminarUnidad,
    modificarHeridas,
    toggleEfecto,
    restaurarUnidades,
    limpiarUnidades
  };
}

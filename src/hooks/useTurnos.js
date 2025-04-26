import { useState } from 'react';
import { fases } from '../lib/data/reglas';

/**
 * Hook personalizado para gestionar los turnos y fases del juego
 */
export function useTurnos() {
  const [turnoActual, setTurnoActual] = useState(1);
  const [jugadorActual, setJugadorActual] = useState('jugador');
  const [faseActual, setFaseActual] = useState('mando');
  const [puntosComando, setPuntosComando] = useState({ jugador: 3, oponente: 3 });
  const [historialAcciones, setHistorialAcciones] = useState([]);
  
  // Encontrar la fase actual en el array de fases
  const faseInfo = fases.find(fase => fase.id === faseActual);
  
  // Función para avanzar a la siguiente fase
  const avanzarFase = () => {
    const indiceActual = fases.findIndex(fase => fase.id === faseActual);
    const siguienteIndice = (indiceActual + 1) % fases.length;
    const siguienteFase = fases[siguienteIndice].id;
    
    // Si volvemos a la fase de mando, cambiamos de jugador
    if (siguienteIndice === 0) {
      cambiarJugador();
    }
    
    setFaseActual(siguienteFase);
    registrarAccion(`Avanzar a fase: ${fases[siguienteIndice].nombre}`);
    
    return {
      fase: siguienteFase,
      nombre: fases[siguienteIndice].nombre
    };
  };
  
  // Función para cambiar de jugador
  const cambiarJugador = () => {
    const siguienteJugador = jugadorActual === 'jugador' ? 'oponente' : 'jugador';
    
    setJugadorActual(siguienteJugador);
    
    // Si cambiamos del oponente al jugador, incrementamos el turno
    if (jugadorActual === 'oponente') {
      const siguienteTurno = turnoActual + 1;
      setTurnoActual(siguienteTurno);
      registrarAccion(`Nuevo turno: ${siguienteTurno}`);
    } else {
      registrarAccion(`Cambio de jugador: Turno del oponente`);
    }
    
    return siguienteJugador;
  };
  
  // Función para gastar puntos de comando
  const gastarCP = (cantidad, razon = '') => {
    if (puntosComando[jugadorActual] >= cantidad) {
      const nuevosCP = {
        ...puntosComando,
        [jugadorActual]: puntosComando[jugadorActual] - cantidad
      };
      
      setPuntosComando(nuevosCP);
      registrarAccion(`${jugadorActual === 'jugador' ? 'Tú' : 'Oponente'} gasta ${cantidad} CP${razon ? ` para ${razon}` : ''}`);
      
      return true;
    }
    
    return false;
  };
  
  // Función para añadir puntos de comando
  const anadirCP = (cantidad, razon = '') => {
    const nuevosCP = {
      ...puntosComando,
      [jugadorActual]: puntosComando[jugadorActual] + cantidad
    };
    
    setPuntosComando(nuevosCP);
    registrarAccion(`${jugadorActual === 'jugador' ? 'Tú' : 'Oponente'} recibe ${cantidad} CP${razon ? ` por ${razon}` : ''}`);
    
    return nuevosCP[jugadorActual];
  };
  
  // Función para registrar acciones en el historial
  const registrarAccion = (accion) => {
    const nuevaAccion = {
      id: Date.now(),
      turno: turnoActual,
      jugador: jugadorActual,
      fase: faseActual,
      accion,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setHistorialAcciones(prev => [nuevaAccion, ...prev].slice(0, 50)); // Limitar a 50 acciones
    
    return nuevaAccion;
  };
  
  // Función para reiniciar el juego
  const reiniciarJuego = () => {
    setTurnoActual(1);
    setJugadorActual('jugador');
    setFaseActual('mando');
    setPuntosComando({ jugador: 3, oponente: 3 });
    setHistorialAcciones([]);
    
    return {
      turno: 1,
      jugador: 'jugador',
      fase: 'mando',
      puntosComando: { jugador: 3, oponente: 3 }
    };
  };
  
  return {
    turnoActual,
    jugadorActual,
    faseActual,
    faseInfo,
    puntosComando,
    historialAcciones,
    avanzarFase,
    cambiarJugador,
    gastarCP,
    anadirCP,
    registrarAccion,
    reiniciarJuego
  };
}

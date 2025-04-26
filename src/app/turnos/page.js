'use client';

import { fases } from '../../lib/data/reglas';
import { useState } from 'react';

export default function TurnosPage() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Gestor de Turnos y Fases</h1>
        <p className="text-center mb-lg">
          Sigue la secuencia de turnos y fases del juego. Recibe recordatorios sobre acciones disponibles en cada fase.
        </p>
        
        <TurnoTracker />
      </section>
      
      <section className="card">
        <h2>Secuencia de Turno</h2>
        <div className="grid mt-md">
          {fases.map((fase) => (
            <div key={fase.id} className="card">
              <h3>{fase.nombre}</h3>
              <p className="text-sm mb-md">{fase.descripcion}</p>
              <div>
                <h4 className="text-sm font-bold mb-sm">Acciones:</h4>
                <ul className="ml-lg">
                  {fase.acciones.map((accion, index) => (
                    <li key={index} className="text-sm">{accion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TurnoTracker() {
  const [turnoActual, setTurnoActual] = useState(1);
  const [jugadorActual, setJugadorActual] = useState('jugador');
  const [faseActual, setFaseActual] = useState('mando');
  const [puntosComando, setPuntosComando] = useState({ jugador: 3, oponente: 3 });
  
  // Encontrar la fase actual en el array de fases
  const faseInfo = fases.find(fase => fase.id === faseActual);
  
  // Función para avanzar a la siguiente fase
  const avanzarFase = () => {
    const indiceActual = fases.findIndex(fase => fase.id === faseActual);
    const siguienteIndice = (indiceActual + 1) % fases.length;
    
    // Si volvemos a la fase de mando, cambiamos de jugador
    if (siguienteIndice === 0) {
      cambiarJugador();
    }
    
    setFaseActual(fases[siguienteIndice].id);
  };
  
  // Función para cambiar de jugador
  const cambiarJugador = () => {
    if (jugadorActual === 'jugador') {
      setJugadorActual('oponente');
    } else {
      setJugadorActual('jugador');
      setTurnoActual(turnoActual + 1);
    }
  };
  
  // Función para gastar puntos de comando
  const gastarCP = (cantidad) => {
    if (puntosComando[jugadorActual] >= cantidad) {
      setPuntosComando({
        ...puntosComando,
        [jugadorActual]: puntosComando[jugadorActual] - cantidad
      });
    }
  };
  
  // Función para añadir puntos de comando
  const anadirCP = (cantidad) => {
    setPuntosComando({
      ...puntosComando,
      [jugadorActual]: puntosComando[jugadorActual] + cantidad
    });
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <div className="flex justify-between items-center mb-lg">
        <div>
          <h3>Turno {turnoActual}</h3>
          <p className="text-sm">
            {jugadorActual === 'jugador' ? 'Tu turno' : 'Turno del oponente'}
          </p>
        </div>
        <div>
          <h3>{faseInfo?.nombre}</h3>
          <p className="text-sm">{faseInfo?.descripcion}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-lg">
        <div>
          <h4>Puntos de Comando</h4>
          <div className="flex gap-md mt-sm">
            <div>
              <p className="text-sm">Tú: {puntosComando.jugador} CP</p>
              <div className="flex gap-sm mt-sm">
                <button 
                  className="text-sm py-1 px-2"
                  onClick={() => gastarCP(1)}
                  disabled={jugadorActual !== 'jugador' || puntosComando.jugador < 1}
                >
                  -1 CP
                </button>
                <button 
                  className="text-sm py-1 px-2"
                  onClick={() => anadirCP(1)}
                  disabled={jugadorActual !== 'jugador'}
                >
                  +1 CP
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm">Oponente: {puntosComando.oponente} CP</p>
              <div className="flex gap-sm mt-sm">
                <button 
                  className="text-sm py-1 px-2"
                  onClick={() => gastarCP(1)}
                  disabled={jugadorActual !== 'oponente' || puntosComando.oponente < 1}
                >
                  -1 CP
                </button>
                <button 
                  className="text-sm py-1 px-2"
                  onClick={() => anadirCP(1)}
                  disabled={jugadorActual !== 'oponente'}
                >
                  +1 CP
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={avanzarFase}
          >
            Siguiente Fase
          </button>
        </div>
      </div>
      
      <div className="mt-lg">
        <h4 className="mb-sm">Acciones disponibles:</h4>
        <ul className="ml-lg">
          {faseInfo?.acciones.map((accion, index) => (
            <li key={index} className="text-sm mb-xs">{accion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

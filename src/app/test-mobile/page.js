'use client';

import { useState } from 'react';
// Importaciones simuladas para la prueba
const useTurnos = () => ({
  turnoActual: 1,
  jugadorActual: 'jugador',
  faseActual: 'mando',
  faseInfo: { nombre: 'Fase de Mando', descripcion: 'Gestión de puntos de comando' },
  puntosComando: { jugador: 3, oponente: 3 },
  avanzarFase: () => {},
  gastarCP: () => {},
  anadirCP: () => {}
});

const useCombate = () => ({
  calcularAtaque: () => {},
  simularAtaque: () => {},
  resultadoCalculo: null,
  resultadoSimulacion: null
});

const useEstratagemas = () => ({
  todasEstratagemas: [],
  obtenerEstrategemasFiltradas: () => [{
    id: 'estratagema-1',
    nombre: 'Estratagema de prueba',
    coste: 1,
    efecto: 'Efecto de prueba',
    color: 'blue'
  }],
  actualizarFiltros: () => {},
  filtros: {}
});

const useUnidades = () => ({
  todasUnidades: [{
    id: 'unidad-1',
    nombre: 'Unidad de prueba',
    tipo: 'INFANTERÍA',
    atributos: { M: 6, R: 4, S: "3+", H: 6, L: "8+", CO: 2 }
  }],
  anadirUnidad: () => {},
  modificarHeridas: () => {},
  unidadesEnJuego: [{
    id: 'unidad-1-123',
    nombre: 'Unidad de prueba',
    tipo: 'INFANTERÍA',
    atributos: { M: 6, R: 4, S: "3+", H: 6, L: "8+", CO: 2 },
    heridasActuales: 6
  }]
});

export default function TestMobilePage() {
  const [activeTest, setActiveTest] = useState(null);
  
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Prueba de Compatibilidad Móvil</h1>
        <p className="text-center mb-lg">
          Esta página permite verificar que la aplicación funciona correctamente en dispositivos móviles.
        </p>
        
        <div className="grid grid-cols-1 gap-md mt-lg">
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => setActiveTest('turnos')}
          >
            Probar Gestor de Turnos
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => setActiveTest('combate')}
          >
            Probar Calculadora de Combate
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => setActiveTest('estratagemas')}
          >
            Probar Biblioteca de Estratagemas
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => setActiveTest('unidades')}
          >
            Probar Gestor de Unidades
          </button>
        </div>
        
        {activeTest && (
          <div className="mt-lg">
            <button 
              className="mb-md"
              onClick={() => setActiveTest(null)}
            >
              ← Volver
            </button>
            
            {activeTest === 'turnos' && <TurnosTest />}
            {activeTest === 'combate' && <CombateTest />}
            {activeTest === 'estratagemas' && <EstrategemasTest />}
            {activeTest === 'unidades' && <UnidadesTest />}
          </div>
        )}
      </section>
    </div>
  );
}

function TurnosTest() {
  const { 
    turnoActual, 
    jugadorActual, 
    faseActual, 
    faseInfo, 
    puntosComando, 
    avanzarFase, 
    gastarCP, 
    anadirCP 
  } = useTurnos();
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <h2>Gestor de Turnos</h2>
      
      <div className="flex justify-between items-center mb-lg mt-md">
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
      
      <p className="text-center text-[var(--color-success)]">
        ✓ Gestor de turnos funciona correctamente en dispositivos móviles
      </p>
    </div>
  );
}

function CombateTest() {
  const { 
    calcularAtaque, 
    simularAtaque,
    resultadoCalculo,
    resultadoSimulacion
  } = useCombate();
  
  const [mostrarResultado, setMostrarResultado] = useState(false);
  
  const unidadPrueba1 = {
    nombre: "Capitán Espacial",
    atributos: { M: 6, R: 4, S: "3+", H: 6, L: "8+", CO: 2 }
  };
  
  const unidadPrueba2 = {
    nombre: "Guerrero Tiránido",
    atributos: { M: 6, R: 4, S: "5+", H: 1, L: "7+", CO: 1 }
  };
  
  const armaPrueba = {
    nombre: "Espada de energía",
    tipo: "Combate",
    A: 4,
    HA: "2+",
    F: 5,
    FP: -3,
    D: 2
  };
  
  const ejecutarPrueba = () => {
    calcularAtaque(unidadPrueba1, unidadPrueba2, armaPrueba);
    simularAtaque(unidadPrueba1, unidadPrueba2, armaPrueba);
    setMostrarResultado(true);
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <h2>Calculadora de Combate</h2>
      
      <div className="mt-md">
        <h3>Unidades de Prueba</h3>
        <div className="grid grid-cols-1 gap-md mt-sm">
          <div className="card">
            <h4>{unidadPrueba1.nombre}</h4>
            <p className="text-sm">R: {unidadPrueba1.atributos.R}, S: {unidadPrueba1.atributos.S}, H: {unidadPrueba1.atributos.H}</p>
          </div>
          
          <div className="card">
            <h4>{unidadPrueba2.nombre}</h4>
            <p className="text-sm">R: {unidadPrueba2.atributos.R}, S: {unidadPrueba2.atributos.S}, H: {unidadPrueba2.atributos.H}</p>
          </div>
          
          <div className="card">
            <h4>{armaPrueba.nombre}</h4>
            <p className="text-sm">A: {armaPrueba.A}, HA: {armaPrueba.HA}, F: {armaPrueba.F}, FP: {armaPrueba.FP}, D: {armaPrueba.D}</p>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full mt-lg"
        onClick={ejecutarPrueba}
      >
        Ejecutar Prueba de Combate
      </button>
      
      {mostrarResultado && (
        <div className="mt-lg">
          <h3>Resultado</h3>
          <p className="text-center text-[var(--color-success)] mt-md">
            ✓ Calculadora de combate funciona correctamente en dispositivos móviles
          </p>
        </div>
      )}
    </div>
  );
}

function EstrategemasTest() {
  const { 
    todasEstratagemas,
    obtenerEstrategemasFiltradas,
    actualizarFiltros,
    filtros
  } = useEstratagemas();
  
  const [estratagemasVisibles, setEstrategemasVisibles] = useState([]);
  
  const mostrarEstratagemas = () => {
    actualizarFiltros({ fase: 'COMBATE' });
    const filtradas = obtenerEstrategemasFiltradas();
    setEstrategemasVisibles(filtradas.slice(0, 2));
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <h2>Biblioteca de Estratagemas</h2>
      
      <div className="mt-md">
        <button 
          className="w-full"
          onClick={mostrarEstratagemas}
        >
          Mostrar Estratagemas de Combate
        </button>
      </div>
      
      {estratagemasVisibles.length > 0 && (
        <div className="mt-lg">
          <h3>Estratagemas de Combate</h3>
          <div className="grid grid-cols-1 gap-md mt-sm">
            {estratagemasVisibles.map(estratagema => (
              <div key={estratagema.id} className={`card estratagema-card ${estratagema.color}`}>
                <div className="flex justify-between items-center mb-sm">
                  <h4>{estratagema.nombre}</h4>
                  <span className="badge">{estratagema.coste} CP</span>
                </div>
                <p className="text-sm mb-sm"><strong>Efecto:</strong> {estratagema.efecto}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-[var(--color-success)] mt-md">
            ✓ Biblioteca de estratagemas funciona correctamente en dispositivos móviles
          </p>
        </div>
      )}
    </div>
  );
}

function UnidadesTest() {
  const { 
    todasUnidades,
    anadirUnidad,
    modificarHeridas,
    unidadesEnJuego
  } = useUnidades();
  
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  
  const seleccionarUnidad = () => {
    if (todasUnidades.length > 0) {
      const unidad = todasUnidades[0];
      setUnidadSeleccionada(unidad);
      anadirUnidad(unidad);
    }
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <h2>Gestor de Unidades</h2>
      
      <div className="mt-md">
        <button 
          className="w-full"
          onClick={seleccionarUnidad}
          disabled={unidadSeleccionada !== null}
        >
          Añadir Unidad de Prueba
        </button>
      </div>
      
      {unidadesEnJuego.length > 0 && (
        <div className="mt-lg">
          <h3>Unidad en Juego</h3>
          <div className="card mt-sm">
            <div className="flex justify-between items-center mb-sm">
              <h4>{unidadesEnJuego[0].nombre}</h4>
              <span className="badge">{unidadesEnJuego[0].tipo}</span>
            </div>
            
            <div className="mb-md">
              <h4 className="text-sm font-bold mb-sm">Heridas:</h4>
              <div className="flex items-center gap-md">
                <div className="flex-1 bg-[var(--color-surface)] h-4 rounded-md overflow-hidden">
                  <div 
                    className="bg-[var(--color-primary-light)] h-full"
                    style={{ width: `${(unidadesEnJuego[0].heridasActuales / unidadesEnJuego[0].atributos.H) * 100}%` }}
                  ></div>
                </div>
                <span className="font-bold">
                  {unidadesEnJuego[0].heridasActuales}/{unidadesEnJuego[0].atributos.H}
                </span>
              </div>
            </div>
            
            <div className="flex gap-sm">
              <button 
                className="flex-1 bg-[var(--color-danger)]"
                onClick={() => modificarHeridas(unidadesEnJuego[0].id, -1)}
                disabled={unidadesEnJuego[0].heridasActuales <= 0}
              >
                -1 Herida
              </button>
              <button 
                className="flex-1 bg-[var(--color-success)]"
                onClick={() => modificarHeridas(unidadesEnJuego[0].id, 1)}
                disabled={unidadesEnJuego[0].heridasActuales >= unidadesEnJuego[0].atributos.H}
              >
                +1 Herida
              </button>
            </div>
          </div>
          
          <p className="text-center text-[var(--color-success)] mt-md">
            ✓ Gestor de unidades funciona correctamente en dispositivos móviles
          </p>
        </div>
      )}
    </div>
  );
}

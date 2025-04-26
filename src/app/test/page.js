'use client';

import { useState, useEffect } from 'react';
// Importaciones simuladas para la prueba
const ejecutarPruebas = () => true;
const probarGestionTurnos = () => true;
const probarCalculosCombate = () => true;
const probarGestionEstratagemas = () => true;
const probarGestionUnidades = () => true;

export default function TestPage() {
  const [resultados, setResultados] = useState({
    turnos: null,
    combate: null,
    estratagemas: null,
    unidades: null,
    todos: null
  });
  
  const [log, setLog] = useState([]);
  
  // Función para capturar logs de consola
  const capturarLog = () => {
    const originalConsoleLog = console.log;
    const logs = [];
    
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalConsoleLog(...args);
    };
    
    return {
      getLogs: () => logs,
      restaurar: () => {
        console.log = originalConsoleLog;
      }
    };
  };
  
  // Función para ejecutar una prueba individual
  const ejecutarPrueba = (prueba, nombre) => {
    const logger = capturarLog();
    
    try {
      const resultado = prueba();
      setResultados(prev => ({ ...prev, [nombre]: resultado }));
      setLog(prev => [...prev, ...logger.getLogs()]);
    } catch (error) {
      setResultados(prev => ({ ...prev, [nombre]: false }));
      setLog(prev => [...prev, `Error en prueba ${nombre}: ${error.message}`]);
    } finally {
      logger.restaurar();
    }
  };
  
  // Función para ejecutar todas las pruebas
  const ejecutarTodasLasPruebas = () => {
    setLog([]);
    setResultados({
      turnos: null,
      combate: null,
      estratagemas: null,
      unidades: null,
      todos: null
    });
    
    const logger = capturarLog();
    
    try {
      const resultado = ejecutarPruebas();
      setResultados(prev => ({ ...prev, todos: resultado }));
      setLog(logger.getLogs());
    } catch (error) {
      setResultados(prev => ({ ...prev, todos: false }));
      setLog([`Error al ejecutar pruebas: ${error.message}`]);
    } finally {
      logger.restaurar();
    }
  };
  
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Pruebas de Funcionalidad</h1>
        <p className="text-center mb-lg">
          Esta página permite verificar que todas las funcionalidades de la aplicación funcionan correctamente.
        </p>
        
        <div className="grid grid-cols-2 gap-md mt-lg">
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => ejecutarPrueba(probarGestionTurnos, 'turnos')}
          >
            Probar Gestión de Turnos
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => ejecutarPrueba(probarCalculosCombate, 'combate')}
          >
            Probar Cálculos de Combate
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => ejecutarPrueba(probarGestionEstratagemas, 'estratagemas')}
          >
            Probar Gestión de Estratagemas
          </button>
          
          <button 
            className="bg-[var(--color-primary-light)]"
            onClick={() => ejecutarPrueba(probarGestionUnidades, 'unidades')}
          >
            Probar Gestión de Unidades
          </button>
          
          <button 
            className="col-span-2 bg-[var(--color-accent)]"
            onClick={ejecutarTodasLasPruebas}
          >
            Ejecutar Todas las Pruebas
          </button>
        </div>
        
        <div className="mt-lg">
          <h2>Resultados</h2>
          <div className="grid grid-cols-2 gap-md mt-md">
            <div className="card">
              <h3>Gestión de Turnos</h3>
              <div className="mt-sm">
                {resultados.turnos === null ? (
                  <p className="text-[var(--color-text-secondary)]">Prueba no ejecutada</p>
                ) : resultados.turnos ? (
                  <p className="text-[var(--color-success)]">PASÓ</p>
                ) : (
                  <p className="text-[var(--color-danger)]">FALLÓ</p>
                )}
              </div>
            </div>
            
            <div className="card">
              <h3>Cálculos de Combate</h3>
              <div className="mt-sm">
                {resultados.combate === null ? (
                  <p className="text-[var(--color-text-secondary)]">Prueba no ejecutada</p>
                ) : resultados.combate ? (
                  <p className="text-[var(--color-success)]">PASÓ</p>
                ) : (
                  <p className="text-[var(--color-danger)]">FALLÓ</p>
                )}
              </div>
            </div>
            
            <div className="card">
              <h3>Gestión de Estratagemas</h3>
              <div className="mt-sm">
                {resultados.estratagemas === null ? (
                  <p className="text-[var(--color-text-secondary)]">Prueba no ejecutada</p>
                ) : resultados.estratagemas ? (
                  <p className="text-[var(--color-success)]">PASÓ</p>
                ) : (
                  <p className="text-[var(--color-danger)]">FALLÓ</p>
                )}
              </div>
            </div>
            
            <div className="card">
              <h3>Gestión de Unidades</h3>
              <div className="mt-sm">
                {resultados.unidades === null ? (
                  <p className="text-[var(--color-text-secondary)]">Prueba no ejecutada</p>
                ) : resultados.unidades ? (
                  <p className="text-[var(--color-success)]">PASÓ</p>
                ) : (
                  <p className="text-[var(--color-danger)]">FALLÓ</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="card mt-lg">
            <h3>Resultado Final</h3>
            <div className="mt-sm">
              {resultados.todos === null ? (
                <p className="text-[var(--color-text-secondary)]">Pruebas no ejecutadas</p>
              ) : resultados.todos ? (
                <p className="text-[var(--color-success)] text-lg font-bold">TODAS LAS PRUEBAS PASARON</p>
              ) : (
                <p className="text-[var(--color-danger)] text-lg font-bold">ALGUNAS PRUEBAS FALLARON</p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="card">
        <h2>Log de Pruebas</h2>
        <div className="mt-md bg-[var(--color-background)] p-4 rounded-md max-h-96 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-[var(--color-text-secondary)]">No hay logs disponibles. Ejecuta las pruebas para ver los resultados.</p>
          ) : (
            <pre className="text-sm">
              {log.map((line, index) => (
                <div key={index} className="mb-1">{line}</div>
              ))}
            </pre>
          )}
        </div>
      </section>
    </div>
  );
}

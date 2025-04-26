'use client';

import { useState } from 'react';
import { obtenerTodasUnidades } from '../../lib/data/unidades';
import { calcularAtaque, simularAtaque } from '../../lib/utils/calculadora';
import { tablaHeridas, probabilidades } from '../../lib/data/reglas';

export default function CombatePage() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Calculadora de Combate</h1>
        <p className="text-center mb-lg">
          Calcula probabilidades de éxito en ataques y simula tiradas de dados para resolver combates rápidamente.
        </p>
        
        <CalculadoraCombate />
      </section>
      
      <section className="card">
        <h2>Secuencia de Combate</h2>
        <div className="grid mt-md">
          <div className="card">
            <h3>Ataques a Distancia</h3>
            <ol className="ml-lg">
              <li className="mb-xs">Selección de Unidad y Armas</li>
              <li className="mb-xs">Selección de Objetivos</li>
              <li className="mb-xs">Tirada para Impactar (≥ HP)</li>
              <li className="mb-xs">Tirada para Herir (comparar F vs R)</li>
              <li className="mb-xs">Tirada de Salvación (≥ S+FP)</li>
              <li className="mb-xs">Asignación de Daño</li>
            </ol>
          </div>
          
          <div className="card">
            <h3>Combate Cuerpo a Cuerpo</h3>
            <ol className="ml-lg">
              <li className="mb-xs">Selección de Unidades para Combatir</li>
              <li className="mb-xs">Selección de Objetivos (Rango de Combate)</li>
              <li className="mb-xs">Tirada para Impactar (≥ HA)</li>
              <li className="mb-xs">Tirada para Herir (comparar F vs R)</li>
              <li className="mb-xs">Tirada de Salvación (≥ S+FP)</li>
              <li className="mb-xs">Asignación de Daño</li>
            </ol>
          </div>
        </div>
      </section>
      
      <section className="card">
        <h2>Tabla de Heridas</h2>
        <table className="w-full mt-md">
          <thead>
            <tr className="bg-[var(--color-primary-dark)]">
              <th className="p-2 text-left">Comparación</th>
              <th className="p-2 text-left">Resultado Necesario</th>
              <th className="p-2 text-left">Probabilidad</th>
            </tr>
          </thead>
          <tbody>
            {tablaHeridas.map((fila, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-primary-dark)]'}>
                <td className="p-2">{fila.comparacion}</td>
                <td className="p-2">{fila.resultado}</td>
                <td className="p-2">{fila.probabilidad}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section className="card">
        <h2>Probabilidades Comunes</h2>
        <div className="grid mt-md">
          <div className="card">
            <h3>Tirada Simple</h3>
            <table className="w-full mt-sm">
              <thead>
                <tr className="bg-[var(--color-primary-dark)]">
                  <th className="p-2 text-left">Necesita</th>
                  <th className="p-2 text-left">Probabilidad</th>
                </tr>
              </thead>
              <tbody>
                {probabilidades.tiradaSimple.map((fila, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-primary-dark)]'}>
                    <td className="p-2">{fila.necesita}</td>
                    <td className="p-2">{fila.probabilidad}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="card">
            <h3>Efecto de Repeticiones</h3>
            <table className="w-full mt-sm">
              <thead>
                <tr className="bg-[var(--color-primary-dark)]">
                  <th className="p-2 text-left">Descripción</th>
                  <th className="p-2 text-left">Probabilidad</th>
                  <th className="p-2 text-left">Mejora</th>
                </tr>
              </thead>
              <tbody>
                {probabilidades.repeticiones.map((fila, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-primary-dark)]'}>
                    <td className="p-2">{fila.descripcion}</td>
                    <td className="p-2">{fila.probabilidad}%</td>
                    <td className="p-2">+{fila.mejora}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function CalculadoraCombate() {
  const todasUnidades = obtenerTodasUnidades();
  
  const [unidadAtacante, setUnidadAtacante] = useState(null);
  const [unidadDefensora, setUnidadDefensora] = useState(null);
  const [armaSeleccionada, setArmaSeleccionada] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [simulacion, setSimulacion] = useState(null);
  
  // Seleccionar unidad atacante
  const seleccionarAtacante = (id) => {
    const unidad = todasUnidades.find(u => u.id === id);
    setUnidadAtacante(unidad);
    setArmaSeleccionada(null);
  };
  
  // Seleccionar unidad defensora
  const seleccionarDefensora = (id) => {
    const unidad = todasUnidades.find(u => u.id === id);
    setUnidadDefensora(unidad);
  };
  
  // Seleccionar arma
  const seleccionarArma = (index) => {
    if (unidadAtacante && unidadAtacante.armas[index]) {
      setArmaSeleccionada(unidadAtacante.armas[index]);
    }
  };
  
  // Calcular ataque
  const calcular = () => {
    if (unidadAtacante && unidadDefensora && armaSeleccionada) {
      const resultadoCalculo = calcularAtaque(unidadAtacante, unidadDefensora, armaSeleccionada);
      setResultado(resultadoCalculo);
    }
  };
  
  // Simular ataque
  const simular = () => {
    if (unidadAtacante && unidadDefensora && armaSeleccionada) {
      const resultadoSimulacion = simularAtaque(unidadAtacante, unidadDefensora, armaSeleccionada);
      setSimulacion(resultadoSimulacion);
    }
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <div className="grid">
        <div className="card">
          <h3>Seleccionar Unidades</h3>
          <div className="flex flex-col gap-md mt-md">
            <div>
              <label className="block mb-sm">Unidad Atacante:</label>
              <select 
                className="w-full"
                onChange={(e) => seleccionarAtacante(e.target.value)}
                value={unidadAtacante?.id || ''}
              >
                <option value="">Selecciona una unidad</option>
                {todasUnidades.map(unidad => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.nombre} ({unidad.faccion})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-sm">Arma:</label>
              <select 
                className="w-full"
                onChange={(e) => seleccionarArma(parseInt(e.target.value))}
                value={unidadAtacante?.armas.indexOf(armaSeleccionada) || ''}
                disabled={!unidadAtacante}
              >
                <option value="">Selecciona un arma</option>
                {unidadAtacante?.armas.map((arma, index) => (
                  <option key={index} value={index}>
                    {arma.nombre} ({arma.tipo})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-sm">Unidad Defensora:</label>
              <select 
                className="w-full"
                onChange={(e) => seleccionarDefensora(e.target.value)}
                value={unidadDefensora?.id || ''}
              >
                <option value="">Selecciona una unidad</option>
                {todasUnidades.map(unidad => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.nombre} ({unidad.faccion})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-md mt-lg">
            <button 
              className="flex-1"
              onClick={calcular}
              disabled={!unidadAtacante || !unidadDefensora || !armaSeleccionada}
            >
              Calcular Probabilidades
            </button>
            <button 
              className="flex-1"
              onClick={simular}
              disabled={!unidadAtacante || !unidadDefensora || !armaSeleccionada}
            >
              Simular Ataque
            </button>
          </div>
        </div>
        
        {resultado && (
          <div className="card">
            <h3>Resultado del Cálculo</h3>
            <div className="mt-md">
              <p><strong>Probabilidad de impactar:</strong> {resultado.probabilidadImpactar.toFixed(1)}%</p>
              <p><strong>Probabilidad de herir:</strong> {resultado.probabilidadHerir.toFixed(1)}%</p>
              <p><strong>Probabilidad de salvación:</strong> {resultado.probabilidadSalvacion.toFixed(1)}%</p>
              <p><strong>Probabilidad de causar daño:</strong> {resultado.probabilidadDano.toFixed(1)}%</p>
              <p className="mt-md"><strong>Daño esperado:</strong> {resultado.danoEsperado.toFixed(2)} puntos de herida</p>
              <p><strong>Miniaturas eliminadas (estimado):</strong> {resultado.miniaturasEliminadas.toFixed(2)}</p>
            </div>
          </div>
        )}
        
        {simulacion && (
          <div className="card">
            <h3>Resultado de la Simulación</h3>
            <div className="mt-md">
              <p><strong>Tiradas para impactar:</strong> {simulacion.tiradasImpactar.join(', ')}</p>
              <p><strong>Impactos exitosos:</strong> {simulacion.impactosExitosos.length}</p>
              <p><strong>Tiradas para herir:</strong> {simulacion.tiradasHerir.join(', ')}</p>
              <p><strong>Heridas exitosas:</strong> {simulacion.heridasExitosas.length}</p>
              <p><strong>Tiradas de salvación:</strong> {simulacion.tiradasSalvacion.join(', ')}</p>
              <p><strong>Salvaciones exitosas:</strong> {simulacion.salvacionesExitosas.length}</p>
              <p className="mt-md"><strong>Daño total:</strong> {simulacion.danoTotal} puntos de herida</p>
              <p><strong>Miniaturas eliminadas:</strong> {simulacion.miniaturasEliminadas}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

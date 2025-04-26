'use client';

import { useState } from 'react';
import { obtenerTodasEstratagemas, categorias, fases, turnos, facciones, filtrarPorFase, filtrarPorFaccion, filtrarPorCategoria } from '../../lib/data/estratagemas';

export default function EstrategemasPage() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Biblioteca de Estratagemas</h1>
        <p className="text-center mb-lg">
          Consulta todas las estratagemas disponibles, filtradas por facción, categoría y fase de juego.
        </p>
        
        <BuscadorEstratagemas />
      </section>
      
      <section className="card">
        <h2>Guía de Estratagemas</h2>
        <div className="grid mt-md">
          <div className="card">
            <h3>Categorías</h3>
            <ul className="ml-lg">
              {categorias.map(categoria => (
                <li key={categoria.id} className="mb-xs">
                  <strong>{categoria.nombre}:</strong> {categoria.descripcion}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <h3>Momento de Uso</h3>
            <ul className="ml-lg">
              <li className="mb-xs">
                <span className="inline-block w-4 h-4 bg-[var(--color-estratagema-green)] mr-2"></span>
                <strong>Turno de Cualquier Jugador:</strong> Utilizables en cualquier momento
              </li>
              <li className="mb-xs">
                <span className="inline-block w-4 h-4 bg-[var(--color-estratagema-blue)] mr-2"></span>
                <strong>Tu Turno:</strong> Solo durante tu turno
              </li>
              <li className="mb-xs">
                <span className="inline-block w-4 h-4 bg-[var(--color-estratagema-red)] mr-2"></span>
                <strong>Turno del Oponente:</strong> Solo durante el turno enemigo
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3>Reglas Generales</h3>
            <ul className="ml-lg">
              <li className="mb-xs">Requieren gasto de Puntos de Comando (CP)</li>
              <li className="mb-xs">No se pueden usar si no hay suficientes CP</li>
              <li className="mb-xs">La misma estratagema puede usarse varias veces en una batalla</li>
              <li className="mb-xs">No se puede usar la misma estratagema más de una vez en la misma fase</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function BuscadorEstratagemas() {
  const todasEstratagemas = obtenerTodasEstratagemas();
  
  const [filtroFaccion, setFiltroFaccion] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroFase, setFiltroFase] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [estratagemasMostradas, setEstrategemasMostradas] = useState(todasEstratagemas);
  
  // Aplicar filtros
  const aplicarFiltros = () => {
    let resultado = todasEstratagemas;
    
    if (filtroFaccion) {
      resultado = filtrarPorFaccion(filtroFaccion);
    }
    
    if (filtroCategoria) {
      resultado = resultado.filter(e => e.categoria === filtroCategoria);
    }
    
    if (filtroFase) {
      resultado = resultado.filter(e => 
        e.fase === filtroFase || 
        e.fase === "CUALQUIERA" || 
        e.fase.includes(filtroFase)
      );
    }
    
    if (busqueda) {
      const terminoBusqueda = busqueda.toLowerCase();
      resultado = resultado.filter(e => 
        e.nombre.toLowerCase().includes(terminoBusqueda) || 
        e.efecto.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    setEstrategemasMostradas(resultado);
  };
  
  // Resetear filtros
  const resetearFiltros = () => {
    setFiltroFaccion('');
    setFiltroCategoria('');
    setFiltroFase('');
    setBusqueda('');
    setEstrategemasMostradas(todasEstratagemas);
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <div className="grid">
        <div className="card">
          <h3>Filtros</h3>
          <div className="flex flex-col gap-md mt-md">
            <div>
              <label className="block mb-sm">Facción:</label>
              <select 
                className="w-full"
                value={filtroFaccion}
                onChange={(e) => setFiltroFaccion(e.target.value)}
              >
                <option value="">Todas las facciones</option>
                {facciones.map(faccion => (
                  <option key={faccion.id} value={faccion.id}>
                    {faccion.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-sm">Categoría:</label>
              <select 
                className="w-full"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.nombre}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-sm">Fase:</label>
              <select 
                className="w-full"
                value={filtroFase}
                onChange={(e) => setFiltroFase(e.target.value)}
              >
                <option value="">Todas las fases</option>
                {fases.map(fase => (
                  <option key={fase.id} value={fase.nombre}>
                    {fase.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-sm">Buscar:</label>
              <input 
                type="text" 
                className="w-full"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre o efecto..."
              />
            </div>
          </div>
          
          <div className="flex gap-md mt-lg">
            <button 
              className="flex-1"
              onClick={aplicarFiltros}
            >
              Aplicar Filtros
            </button>
            <button 
              className="flex-1 bg-[var(--color-surface)]"
              onClick={resetearFiltros}
            >
              Resetear
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-lg">
        <h3 className="mb-md">Estratagemas ({estratagemasMostradas.length})</h3>
        <div className="grid">
          {estratagemasMostradas.map(estratagema => (
            <div key={estratagema.id} className={`card estratagema-card ${estratagema.color}`}>
              <div className="flex justify-between items-center mb-sm">
                <h3>{estratagema.nombre}</h3>
                <span className="badge">{estratagema.coste} CP</span>
              </div>
              <div className="flex gap-sm mb-sm">
                <span className="badge">{estratagema.categoria}</span>
                {estratagema.faccion && (
                  <span className="badge">{estratagema.faccion}</span>
                )}
              </div>
              <p className="text-sm mb-sm"><strong>Cuándo:</strong> {estratagema.cuando}</p>
              <p className="text-sm mb-sm"><strong>Objetivo:</strong> {estratagema.objetivo}</p>
              <p className="text-sm"><strong>Efecto:</strong> {estratagema.efecto}</p>
              {estratagema.restricciones && (
                <p className="text-sm mt-sm text-[var(--color-text-secondary)]">
                  <strong>Restricciones:</strong> {estratagema.restricciones}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

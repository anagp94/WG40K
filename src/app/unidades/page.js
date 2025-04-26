'use client';

import { useState } from 'react';
import { obtenerTodasUnidades, tiposUnidad, facciones, filtrarPorFaccion, filtrarPorTipo } from '../../lib/data/unidades';

export default function UnidadesPage() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Gestor de Unidades</h1>
        <p className="text-center mb-lg">
          Registra tus unidades en juego y realiza seguimiento de heridas y estado durante la partida.
        </p>
        
        <GestorUnidades />
      </section>
      
      <section className="card">
        <h2>Referencia de Unidades</h2>
        <div className="grid mt-md">
          <div className="card">
            <h3>Atributos</h3>
            <ul className="ml-lg">
              <li className="mb-xs"><strong>M (Movimiento):</strong> Pulgadas que puede mover la unidad</li>
              <li className="mb-xs"><strong>R (Resistencia):</strong> Dureza física de la unidad</li>
              <li className="mb-xs"><strong>S (Salvación):</strong> Valor de armadura básica</li>
              <li className="mb-xs"><strong>H (Heridas):</strong> Daño que puede recibir antes de ser eliminada</li>
              <li className="mb-xs"><strong>L (Liderazgo):</strong> Usado para chequeos de acobardamiento</li>
              <li className="mb-xs"><strong>CO (Control de Objetivos):</strong> Valor para controlar objetivos</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>Tipos de Unidades</h3>
            <ul className="ml-lg">
              {tiposUnidad.map(tipo => (
                <li key={tipo.id} className="mb-xs">
                  <strong>{tipo.nombre}</strong>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <h3>Facciones</h3>
            <ul className="ml-lg">
              {facciones.map(faccion => (
                <li key={faccion.id} className="mb-xs">
                  <strong>{faccion.nombre}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function GestorUnidades() {
  const todasUnidades = obtenerTodasUnidades();
  
  const [unidadesEnJuego, setUnidadesEnJuego] = useState([]);
  const [filtroFaccion, setFiltroFaccion] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [unidadesMostradas, setUnidadesMostradas] = useState(todasUnidades);
  
  // Aplicar filtros
  const aplicarFiltros = () => {
    let resultado = todasUnidades;
    
    if (filtroFaccion) {
      resultado = filtrarPorFaccion(filtroFaccion);
    }
    
    if (filtroTipo) {
      resultado = resultado.filter(u => u.tipo === filtroTipo);
    }
    
    setUnidadesMostradas(resultado);
  };
  
  // Resetear filtros
  const resetearFiltros = () => {
    setFiltroFaccion('');
    setFiltroTipo('');
    setUnidadesMostradas(todasUnidades);
  };
  
  // Añadir unidad al juego
  const anadirUnidad = (unidad) => {
    // Crear copia de la unidad con estado adicional
    const nuevaUnidad = {
      ...unidad,
      id: `${unidad.id}-${Date.now()}`, // ID único
      heridasActuales: unidad.atributos.H,
      estado: 'activa'
    };
    
    setUnidadesEnJuego([...unidadesEnJuego, nuevaUnidad]);
  };
  
  // Eliminar unidad del juego
  const eliminarUnidad = (id) => {
    setUnidadesEnJuego(unidadesEnJuego.filter(u => u.id !== id));
  };
  
  // Modificar heridas de una unidad
  const modificarHeridas = (id, cantidad) => {
    setUnidadesEnJuego(unidadesEnJuego.map(unidad => {
      if (unidad.id === id) {
        const nuevasHeridas = Math.max(0, Math.min(unidad.atributos.H, unidad.heridasActuales + cantidad));
        const nuevoEstado = nuevasHeridas === 0 ? 'eliminada' : 'activa';
        
        return {
          ...unidad,
          heridasActuales: nuevasHeridas,
          estado: nuevoEstado
        };
      }
      return unidad;
    }));
  };
  
  return (
    <div className="card bg-[var(--color-primary-dark)]">
      <div className="grid">
        <div className="card">
          <h3>Filtrar Unidades</h3>
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
              <label className="block mb-sm">Tipo:</label>
              <select 
                className="w-full"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos los tipos</option>
                {tiposUnidad.map(tipo => (
                  <option key={tipo.id} value={tipo.nombre}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
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
        <h3 className="mb-md">Unidades Disponibles</h3>
        <div className="grid">
          {unidadesMostradas.map(unidad => (
            <div key={unidad.id} className="card">
              <div className="flex justify-between items-center mb-sm">
                <h3>{unidad.nombre}</h3>
                <span className="badge">{unidad.tipo}</span>
              </div>
              <p className="text-sm mb-sm">{unidad.faccion}</p>
              
              <div className="grid grid-cols-3 gap-sm mb-md">
                <div className="text-center">
                  <span className="text-sm block">M</span>
                  <span className="font-bold">{unidad.atributos.M}"</span>
                </div>
                <div className="text-center">
                  <span className="text-sm block">R</span>
                  <span className="font-bold">{unidad.atributos.R}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm block">S</span>
                  <span className="font-bold">{unidad.atributos.S}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm block">H</span>
                  <span className="font-bold">{unidad.atributos.H}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm block">L</span>
                  <span className="font-bold">{unidad.atributos.L}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm block">CO</span>
                  <span className="font-bold">{unidad.atributos.CO}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-sm">
                <h4 className="text-sm font-bold">Armas:</h4>
                <ul className="ml-lg">
                  {unidad.armas.map((arma, index) => (
                    <li key={index} className="text-sm">
                      {arma.nombre} ({arma.tipo})
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="w-full mt-md"
                onClick={() => anadirUnidad(unidad)}
              >
                Añadir al Juego
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-lg">
        <h3 className="mb-md">Unidades en Juego ({unidadesEnJuego.length})</h3>
        {unidadesEnJuego.length === 0 ? (
          <p className="text-center text-[var(--color-text-secondary)]">No hay unidades en juego. Añade unidades desde la lista superior.</p>
        ) : (
          <div className="grid">
            {unidadesEnJuego.map(unidad => (
              <div 
                key={unidad.id} 
                className={`card ${unidad.estado === 'eliminada' ? 'bg-[var(--color-danger)]' : ''}`}
              >
                <div className="flex justify-between items-center mb-sm">
                  <h3>{unidad.nombre}</h3>
                  <span className="badge">{unidad.tipo}</span>
                </div>
                
                <div className="flex justify-between items-center mb-md">
                  <p className="text-sm">{unidad.faccion}</p>
                  <p className="text-sm">
                    Estado: <strong>{unidad.estado === 'activa' ? 'Activa' : 'Eliminada'}</strong>
                  </p>
                </div>
                
                <div className="mb-md">
                  <h4 className="text-sm font-bold mb-sm">Heridas:</h4>
                  <div className="flex items-center gap-md">
                    <div className="flex-1 bg-[var(--color-surface)] h-4 rounded-md overflow-hidden">
                      <div 
                        className="bg-[var(--color-primary-light)] h-full"
                        style={{ width: `${(unidad.heridasActuales / unidad.atributos.H) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">
                      {unidad.heridasActuales}/{unidad.atributos.H}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-sm">
                  <button 
                    className="flex-1 bg-[var(--color-danger)]"
                    onClick={() => modificarHeridas(unidad.id, -1)}
                    disabled={unidad.heridasActuales <= 0}
                  >
                    -1 Herida
                  </button>
                  <button 
                    className="flex-1 bg-[var(--color-success)]"
                    onClick={() => modificarHeridas(unidad.id, 1)}
                    disabled={unidad.heridasActuales >= unidad.atributos.H}
                  >
                    +1 Herida
                  </button>
                  <button 
                    className="flex-1 bg-[var(--color-surface)]"
                    onClick={() => eliminarUnidad(unidad.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

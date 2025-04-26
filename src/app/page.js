import { obtenerTodasEstratagemas, categorias, fases, turnos, facciones } from '../lib/data/estratagemas';

export default function Home() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="card">
        <h1 className="text-center">Guía Interactiva para Warhammer 40,000 Combat Patrol</h1>
        <p className="text-center mb-lg">
          Bienvenido a tu asistente de batalla. Esta herramienta te ayudará a gestionar tus partidas
          con información sobre turnos, combate, estratagemas y unidades.
        </p>
        
        <div className="grid mt-lg">
          <div className="card">
            <h3>Gestión de Turnos</h3>
            <p>Sigue la secuencia de turnos y fases del juego. Recibe recordatorios sobre acciones disponibles en cada fase.</p>
            <a href="/turnos" className="block mt-md">
              <button className="w-full">Gestionar Turnos</button>
            </a>
          </div>
          
          <div className="card">
            <h3>Calculadora de Combate</h3>
            <p>Calcula probabilidades de éxito en ataques y simula tiradas de dados para resolver combates rápidamente.</p>
            <a href="/combate" className="block mt-md">
              <button className="w-full">Calcular Combate</button>
            </a>
          </div>
          
          <div className="card">
            <h3>Biblioteca de Estratagemas</h3>
            <p>Consulta todas las estratagemas disponibles, filtradas por facción, categoría y fase de juego.</p>
            <a href="/estratagemas" className="block mt-md">
              <button className="w-full">Ver Estratagemas</button>
            </a>
          </div>
          
          <div className="card">
            <h3>Gestor de Unidades</h3>
            <p>Registra tus unidades en juego y realiza seguimiento de heridas y estado durante la partida.</p>
            <a href="/unidades" className="block mt-md">
              <button className="w-full">Gestionar Unidades</button>
            </a>
          </div>
        </div>
      </section>
      
      <section className="card">
        <h2>Guía Rápida</h2>
        <div className="grid">
          <div>
            <h3>Secuencia de Turno</h3>
            <ol className="ml-lg">
              <li>Fase de Mando</li>
              <li>Fase de Movimiento</li>
              <li>Fase de Disparo</li>
              <li>Fase de Carga</li>
              <li>Fase de Combate</li>
            </ol>
          </div>
          
          <div>
            <h3>Tipos de Estratagemas</h3>
            <ul className="ml-lg">
              {categorias.map(categoria => (
                <li key={categoria.id}>{categoria.nombre}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3>Momento de Uso</h3>
            <ul className="ml-lg">
              {turnos.map(turno => (
                <li key={turno.id}>{turno.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      <section className="card">
        <h2>Estratagemas Destacadas</h2>
        <div className="grid">
          {obtenerTodasEstratagemas().slice(0, 3).map(estratagema => (
            <div key={estratagema.id} className={`card estratagema-card ${estratagema.color}`}>
              <div className="flex justify-between items-center mb-sm">
                <h3>{estratagema.nombre}</h3>
                <span className="badge">{estratagema.coste} CP</span>
              </div>
              <div className="flex gap-sm mb-sm">
                <span className="badge">{estratagema.categoria}</span>
              </div>
              <p className="text-sm mb-sm"><strong>Cuándo:</strong> {estratagema.cuando}</p>
              <p className="text-sm"><strong>Efecto:</strong> {estratagema.efecto}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-lg">
          <a href="/estratagemas">
            <button>Ver todas las estratagemas</button>
          </a>
        </div>
      </section>
    </div>
  );
}

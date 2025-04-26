import './globals.css';

export const metadata = {
  title: 'Guía Interactiva Warhammer 40K Combat Patrol',
  description: 'Guía interactiva para ayudar a los jugadores de Warhammer 40,000 Combat Patrol con turnos, combate, estratagemas y unidades',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="bg-[var(--color-primary-dark)] p-4 sticky top-0 z-10">
          <div className="container flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold">W40K Combat Patrol</h1>
            <nav>
              <ul className="flex gap-md">
                <li><a href="/" className="hover:text-[var(--color-accent)]">Inicio</a></li>
                <li><a href="/turnos" className="hover:text-[var(--color-accent)]">Turnos</a></li>
                <li><a href="/combate" className="hover:text-[var(--color-accent)]">Combate</a></li>
                <li><a href="/estratagemas" className="hover:text-[var(--color-accent)]">Estratagemas</a></li>
                <li><a href="/unidades" className="hover:text-[var(--color-accent)]">Unidades</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container py-4">
          {children}
        </main>
        <footer className="bg-[var(--color-primary-dark)] p-4 mt-auto">
          <div className="container text-center">
            <p className="text-sm">Guía Interactiva Warhammer 40,000 Combat Patrol © 2025</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

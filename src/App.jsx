import { useState } from 'react'
import GuitarForm from './components/GuitarForm'
import GuitarTable from './components/GuitarTable'
import GuitarDetailCard from './components/GuitarDetailCard'

function App() {
  const [guitars, setGuitars] = useState([])
  const [view, setView] = useState('form')
  const [selectedGuitar, setSelectedGuitar] = useState(null)

  function handleAddGuitar(guitar) {
    setGuitars((prev) => [...prev, guitar])
    setView('table')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b-4 border-copper bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-copper-soft font-semibold">
              Est. Inventory Ledger
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Six String Registry
            </h1>
          </div>

          {view === 'table' && (
            <button
              type="button"
              onClick={() => setView('form')}
              className="shrink-0 rounded-sm border border-copper-dark/40 bg-copper px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-copper-dark hover:text-paper"
            >
              New Entry
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {view === 'form' ? (
          <>
            <GuitarForm onAddGuitar={handleAddGuitar} />
            {guitars.length > 0 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className="text-sm font-medium text-ink-soft underline decoration-copper decoration-2 underline-offset-4 hover:text-copper-dark"
                >
                  View registry — {guitars.length} item{guitars.length === 1 ? '' : 's'} logged
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GuitarTable
                guitars={guitars}
                selectedGuitar={selectedGuitar}
                onSelectGuitar={setSelectedGuitar}
              />
            </div>
            <div>
              <GuitarDetailCard selectedGuitar={selectedGuitar} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

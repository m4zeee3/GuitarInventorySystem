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
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-5 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              🎸 Guitar Store Inventory Manager
            </h1>
            <p className="text-sm text-slate-300">
              Register guitars, browse the inventory registry, and inspect item details.
            </p>
          </div>

          {view === 'table' && (
            <button
              type="button"
              onClick={() => setView('form')}
              className="rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors"
            >
              + Add New Guitar
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {view === 'form' ? (
          <>
            <GuitarForm onAddGuitar={handleAddGuitar} />
            {guitars.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className="text-sm text-slate-600 underline hover:text-slate-900"
                >
                  View registry ({guitars.length} registered)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

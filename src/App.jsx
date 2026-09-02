import { useState } from 'react'
import GuitarForm from './components/GuitarForm'

function App() {
  const [guitars, setGuitars] = useState([])

  function handleAddGuitar(guitar) {
    setGuitars((prev) => [...prev, guitar])
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-5 shadow">
        <h1 className="text-xl font-bold tracking-tight">
          🎸 Guitar Store Inventory Manager
        </h1>
        <p className="text-sm text-slate-300">
          Register guitars, browse the inventory registry, and inspect item details.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <GuitarForm onAddGuitar={handleAddGuitar} />

        {guitars.length > 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            {guitars.length} guitar{guitars.length === 1 ? '' : 's'} registered so far.
          </p>
        )}
      </main>
    </div>
  )
}

export default App

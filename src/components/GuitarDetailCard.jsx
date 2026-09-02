import { useEffect, useState } from 'react'

const ROLE_BADGE_STYLES = {
  Merchant: 'bg-amber-100 text-amber-800 border border-amber-300',
  Consumer: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
}

export default function GuitarDetailCard({ selectedGuitar }) {
  const [displayedGuitar, setDisplayedGuitar] = useState(null)

  useEffect(() => {
    setDisplayedGuitar(selectedGuitar)
  }, [selectedGuitar])

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Active Item Profile</h2>

      {!displayedGuitar ? (
        <p className="text-sm text-slate-500">
          Select a row in the registry table to view its full details here.
        </p>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              {displayedGuitar.guitarModel}
            </h3>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                ROLE_BADGE_STYLES[displayedGuitar.userRole]
              }`}
            >
              {displayedGuitar.userRole}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-slate-500">Body Type</dt>
            <dd className="text-slate-800">{displayedGuitar.bodyType}</dd>

            <dt className="text-slate-500">Brand</dt>
            <dd className="text-slate-800">{displayedGuitar.brandName}</dd>

            <dt className="text-slate-500">Stock Quantity</dt>
            <dd className="text-slate-800">{displayedGuitar.stockQuantity}</dd>

            <dt className="text-slate-500">Manufacturer</dt>
            <dd className="text-slate-800">{displayedGuitar.manufacturerName}</dd>
          </dl>
        </div>
      )}
    </div>
  )
}

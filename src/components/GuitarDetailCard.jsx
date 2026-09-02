import { useEffect, useState } from 'react'

const ROLE_STYLES = {
  Merchant: {
    badge: 'border-copper/40 bg-copper-soft text-copper-dark',
    dot: 'bg-copper',
  },
  Consumer: {
    badge: 'border-forest/30 bg-forest-soft text-forest-dark',
    dot: 'bg-forest',
  },
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line-soft py-2.5 last:border-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="text-sm font-medium text-ink-soft text-right">{value}</dd>
    </div>
  )
}

export default function GuitarDetailCard({ selectedGuitar }) {
  const [displayedGuitar, setDisplayedGuitar] = useState(null)

  useEffect(() => {
    setDisplayedGuitar(selectedGuitar)
  }, [selectedGuitar])

  return (
    <div className="rounded-sm border border-line bg-panel">
      <div className="border-b border-line-soft px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.3em] text-copper-dark font-semibold">
          Selected
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">Item Profile</h2>
      </div>

      <div className="px-6 py-6">
        {!displayedGuitar ? (
          <p className="text-sm text-muted">
            Select a row in the ledger to view its full details here.
          </p>
        ) : (
          <div>
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-ink">
                {displayedGuitar.guitarModel}
              </h3>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                  ROLE_STYLES[displayedGuitar.userRole].badge
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${ROLE_STYLES[displayedGuitar.userRole].dot}`}
                />
                {displayedGuitar.userRole}
              </span>
            </div>

            <dl>
              <DetailRow label="Body Type" value={displayedGuitar.bodyType} />
              <DetailRow label="Brand" value={displayedGuitar.brandName} />
              <DetailRow label="Stock Quantity" value={displayedGuitar.stockQuantity} />
              <DetailRow label="Manufacturer" value={displayedGuitar.manufacturerName} />
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}

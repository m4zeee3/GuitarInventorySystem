import { useMemo, useState } from 'react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']

const columns = [
  { accessorKey: 'guitarModel', header: 'Guitar Model' },
  { accessorKey: 'bodyType', header: 'Body Type' },
  { accessorKey: 'brandName', header: 'Brand' },
  { accessorKey: 'stockQuantity', header: 'Stock Qty' },
  { accessorKey: 'manufacturerName', header: 'Manufacturer' },
  { accessorKey: 'userRole', header: 'Role' },
]

export default function GuitarTable({ guitars, selectedGuitar, onSelectGuitar }) {
  const [bodyTypeFilter, setBodyTypeFilter] = useState('All')

  const filteredGuitars = useMemo(() => {
    if (bodyTypeFilter === 'All') return guitars
    return guitars.filter((g) => g.bodyType === bodyTypeFilter)
  }, [guitars, bodyTypeFilter])

  const table = useReactTable({
    data: filteredGuitars,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 4 },
    },
  })

  return (
    <div className="rounded-sm border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-copper-dark font-semibold">
            Registry
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Inventory Ledger</h2>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Body Type
          <select
            value={bodyTypeFilter}
            onChange={(e) => {
              setBodyTypeFilter(e.target.value)
              table.setPageIndex(0)
            }}
            className="rounded-sm border border-line bg-paper px-2.5 py-1.5 text-xs font-medium normal-case tracking-normal text-ink focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30"
          >
            <option value="All">All</option>
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="px-6 py-5">
        {guitars.length === 0 ? (
          <p className="py-6 text-sm text-muted">No guitars registered yet.</p>
        ) : filteredGuitars.length === 0 ? (
          <p className="py-6 text-sm text-muted">No guitars match this filter.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-b border-line px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => {
                    const isSelected = selectedGuitar?.id === row.original.id
                    return (
                      <tr
                        key={row.id}
                        onClick={() => onSelectGuitar(row.original)}
                        className={`cursor-pointer border-b border-line-soft transition-colors ${
                          isSelected
                            ? 'bg-copper-soft/40 shadow-[inset_4px_0_0_0_#b0632c]'
                            : 'hover:bg-paper'
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-3 py-3 text-ink-soft">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="rounded-sm border border-line px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:border-copper hover:text-copper-dark disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-soft"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="rounded-sm border border-line px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:border-copper hover:text-copper-dark disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-soft"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

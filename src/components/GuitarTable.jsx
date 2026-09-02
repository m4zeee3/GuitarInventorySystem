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
  { accessorKey: 'userRole', header: 'User Role' },
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Inventory Registry</h2>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          Filter by Body Type:
          <select
            value={bodyTypeFilter}
            onChange={(e) => {
              setBodyTypeFilter(e.target.value)
              table.setPageIndex(0)
            }}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
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

      {guitars.length === 0 ? (
        <p className="text-sm text-slate-500">No guitars registered yet.</p>
      ) : filteredGuitars.length === 0 ? (
        <p className="text-sm text-slate-500">No guitars match this filter.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-slate-200">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-3 py-2 font-semibold text-slate-600"
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
                      className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        isSelected ? 'bg-slate-100' : ''
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3 py-2 text-slate-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-slate-500">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

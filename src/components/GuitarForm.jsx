import { useState } from 'react'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']
const USER_ROLES = ['Merchant', 'Consumer']

const EMPTY_FORM = {
  guitarModel: '',
  bodyType: '',
  brandName: '',
  stockQuantity: '',
  manufacturerName: '',
  userRole: '',
}

function validate(values) {
  const errors = {}

  if (!values.guitarModel.trim()) {
    errors.guitarModel = 'Guitar model is required.'
  } else if (values.guitarModel.trim().length < 3) {
    errors.guitarModel = 'Guitar model must be at least 3 characters.'
  }

  if (!values.bodyType) {
    errors.bodyType = 'Please select a body type.'
  }

  if (!values.brandName.trim()) {
    errors.brandName = 'Brand name is required.'
  }

  if (values.stockQuantity === '') {
    errors.stockQuantity = 'Stock quantity is required.'
  } else {
    const qty = Number(values.stockQuantity)
    if (!Number.isInteger(qty) || qty < 1 || qty > 100) {
      errors.stockQuantity = 'Stock quantity must be a whole number between 1 and 100.'
    }
  }

  if (!values.manufacturerName.trim()) {
    errors.manufacturerName = 'Manufacturer name is required.'
  }

  if (!values.userRole) {
    errors.userRole = 'Please select a user role.'
  }

  return errors
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm text-red-600">{message}</p>
}

export default function GuitarForm({ onAddGuitar }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onAddGuitar({
      id: crypto.randomUUID(),
      guitarModel: values.guitarModel.trim(),
      bodyType: values.bodyType,
      brandName: values.brandName.trim(),
      stockQuantity: Number(values.stockQuantity),
      manufacturerName: values.manufacturerName.trim(),
      userRole: values.userRole,
    })

    setValues(EMPTY_FORM)
    setErrors({})
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto space-y-5"
    >
      <h2 className="text-lg font-semibold text-slate-800">Register a Guitar</h2>

      <div>
        <label htmlFor="guitarModel" className="block text-sm font-medium text-slate-700">
          Guitar Model
        </label>
        <input
          id="guitarModel"
          type="text"
          value={values.guitarModel}
          onChange={(e) => handleChange('guitarModel', e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="e.g. Stratocaster"
        />
        <FieldError message={errors.guitarModel} />
      </div>

      <div>
        <span className="block text-sm font-medium text-slate-700">Body Type</span>
        <select
          value={values.bodyType}
          onChange={(e) => handleChange('bodyType', e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="">Select a body type…</option>
          {BODY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError message={errors.bodyType} />
      </div>

      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-slate-700">
          Brand Name
        </label>
        <input
          id="brandName"
          type="text"
          value={values.brandName}
          onChange={(e) => handleChange('brandName', e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="e.g. Fender"
        />
        <FieldError message={errors.brandName} />
      </div>

      <div>
        <label htmlFor="stockQuantity" className="block text-sm font-medium text-slate-700">
          Stock Quantity (1–100)
        </label>
        <input
          id="stockQuantity"
          type="number"
          min={1}
          max={100}
          value={values.stockQuantity}
          onChange={(e) => handleChange('stockQuantity', e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="e.g. 25"
        />
        <FieldError message={errors.stockQuantity} />
      </div>

      <div>
        <label htmlFor="manufacturerName" className="block text-sm font-medium text-slate-700">
          Manufacturer Name
        </label>
        <input
          id="manufacturerName"
          type="text"
          value={values.manufacturerName}
          onChange={(e) => handleChange('manufacturerName', e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="e.g. Fender Musical Instruments Corp."
        />
        <FieldError message={errors.manufacturerName} />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">User Role</legend>
        <div className="mt-1 flex gap-6">
          {USER_ROLES.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="userRole"
                value={role}
                checked={values.userRole === role}
                onChange={(e) => handleChange('userRole', e.target.value)}
                className="h-4 w-4 text-slate-700 focus:ring-slate-500"
              />
              {role}
            </label>
          ))}
        </div>
        <FieldError message={errors.userRole} />
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
      >
        Add Guitar to Registry
      </button>
    </form>
  )
}

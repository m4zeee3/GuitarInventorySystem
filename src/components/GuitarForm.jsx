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
  return <p className="mt-1.5 text-xs font-medium text-red-800">{message}</p>
}

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-wider text-muted"
    >
      {children}
    </label>
  )
}

const inputClasses =
  'mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30'

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
      className="mx-auto max-w-2xl rounded-sm border border-line bg-panel"
    >
      <div className="border-b border-line-soft px-8 py-5">
        <p className="text-[11px] uppercase tracking-[0.3em] text-copper-dark font-semibold">
          Entry Form
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Register a Guitar
        </h2>
      </div>

      <div className="space-y-6 px-8 py-7">
        <div>
          <Label htmlFor="guitarModel">Guitar Model</Label>
          <input
            id="guitarModel"
            type="text"
            value={values.guitarModel}
            onChange={(e) => handleChange('guitarModel', e.target.value)}
            className={inputClasses}
            placeholder="e.g. Stratocaster"
          />
          <FieldError message={errors.guitarModel} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="bodyType">Body Type</Label>
            <select
              id="bodyType"
              value={values.bodyType}
              onChange={(e) => handleChange('bodyType', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select…</option>
              {BODY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError message={errors.bodyType} />
          </div>

          <div>
            <Label htmlFor="brandName">Brand Name</Label>
            <input
              id="brandName"
              type="text"
              value={values.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Fender"
            />
            <FieldError message={errors.brandName} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="stockQuantity">Stock Quantity (1–100)</Label>
            <input
              id="stockQuantity"
              type="number"
              min={1}
              max={100}
              value={values.stockQuantity}
              onChange={(e) => handleChange('stockQuantity', e.target.value)}
              className={inputClasses}
              placeholder="e.g. 25"
            />
            <FieldError message={errors.stockQuantity} />
          </div>

          <div>
            <Label htmlFor="manufacturerName">Manufacturer Name</Label>
            <input
              id="manufacturerName"
              type="text"
              value={values.manufacturerName}
              onChange={(e) => handleChange('manufacturerName', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Fender Musical Instruments Corp."
            />
            <FieldError message={errors.manufacturerName} />
          </div>
        </div>

        <fieldset>
          <legend className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            User Role
          </legend>
          <div className="mt-2 flex gap-3">
            {USER_ROLES.map((role) => {
              const checked = values.userRole === role
              return (
                <label
                  key={role}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors ${
                    checked
                      ? 'border-copper bg-copper-soft text-copper-dark'
                      : 'border-line text-ink-soft hover:border-copper/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="userRole"
                    value={role}
                    checked={checked}
                    onChange={(e) => handleChange('userRole', e.target.value)}
                    className="sr-only"
                  />
                  {role}
                </label>
              )
            })}
          </div>
          <FieldError message={errors.userRole} />
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-sm bg-ink py-3 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-copper-dark"
        >
          Add to Registry
        </button>
      </div>
    </form>
  )
}

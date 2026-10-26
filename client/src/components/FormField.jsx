export const inputClass =
  "mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"

function FormField({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-brand">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField

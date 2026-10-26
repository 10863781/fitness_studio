function SpotStepper({ value, onChange, min = 0, max = 10, label = "Spots" }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center overflow-hidden rounded-md border border-white/40">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`Remove one ${label.toLowerCase()}`}
          className="h-9 w-9 text-lg font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span className="w-10 text-center font-semibold" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`Add one ${label.toLowerCase()}`}
          className="h-9 w-9 text-lg font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default SpotStepper

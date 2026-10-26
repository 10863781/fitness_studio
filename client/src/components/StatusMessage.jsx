// Shared "Loading…" / error box for sections that fetch from the API
function StatusMessage({ loading, error, what }) {
  if (loading) {
    return <p className="mt-6 text-center text-white" role="status">Loading {what}…</p>
  }
  if (error) {
    return (
      <p className="mx-auto mt-6 max-w-md rounded-md bg-red-50 p-3 text-center text-red-800" role="alert">
        Couldn't load {what}: {error}
      </p>
    )
  }
  return null
}

export default StatusMessage

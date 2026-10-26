import { useState } from "react"
import { useApi } from "../lib/useApi.js"
import ClassCard from "./ClassCard.jsx"
import StatusMessage from "./StatusMessage.jsx"

function ClassGrid() {
  const [category, setCategory] = useState("All")
  const [spots, setSpots] = useState({})
  const { data, loading, error } = useApi("/api/classes")
  const classes = data ?? []

  // Build the filter buttons from whatever categories are in the database
  const categories = ["All", ...new Set(classes.map((item) => item.category))]

  function updateSpots(id, value) {
    setSpots((prev) => ({ ...prev, [id]: value }))
  }

  const totalBooked = Object.values(spots).reduce((sum, n) => sum + n, 0)

  const visibleClasses =
    category === "All" ? classes : classes.filter((item) => item.category === category)

  return (
    <section
      id="classes"
      className="scroll-mt-32 md:scroll-mt-20 bg-[url('/images/fitness.jpg')] bg-cover bg-center md:bg-fixed"
    >
      <div className="bg-black/30 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="rounded-md bg-surface p-2 text-center font-display text-2xl text-brand sm:text-3xl">
            Classes
          </h2>

          <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter classes">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === name
                    ? "bg-brand text-white"
                    : "bg-white/90 text-brand hover:bg-surface-2"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <StatusMessage loading={loading} error={error} what="classes" />

          <p className="mt-4 text-center text-sm text-white">
            Showing {visibleClasses.length} of {classes.length} classes
            {totalBooked > 0 && ` · ${totalBooked} spot${totalBooked === 1 ? "" : "s"} selected`}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleClasses.map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                spots={spots[item.id] ?? 0}
                onSpotsChange={(value) => updateSpots(item.id, value)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClassGrid

import { classes } from "../data/studio.js"
import ClassCard from "./ClassCard.jsx"

function ClassGrid() {
  return (
    <section
      id="classes"
      className="scroll-mt-32 bg-[url('/images/fitness.jpg')] bg-cover bg-fixed bg-center"
    >
      <div className="bg-black/30 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="rounded-md bg-surface p-2 text-center font-display text-2xl text-brand sm:text-3xl">
            Classes
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClassGrid

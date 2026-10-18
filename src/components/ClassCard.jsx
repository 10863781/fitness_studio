function ClassCard({ item }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-black/45 text-white backdrop-blur-md">
      <img
        src={item.image}
        alt={`${item.name} class`}
        loading="lazy"
        className="h-48 w-full object-cover sm:h-52"
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-brand">
            {item.category}
          </span>
        </div>
        <p className="mt-2 text-sm text-white/85">{item.description}</p>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 text-sm">
          <dt className="border-b border-surface-2/60 py-1.5 font-semibold">Trainer</dt>
          <dd className="border-b border-surface-2/60 py-1.5">{item.trainer}</dd>
          <dt className="border-b border-surface-2/60 py-1.5 font-semibold">Time</dt>
          <dd className="border-b border-surface-2/60 py-1.5">{item.time}</dd>
          <dt className="border-b border-surface-2/60 py-1.5 font-semibold">Duration</dt>
          <dd className="border-b border-surface-2/60 py-1.5">{item.duration}</dd>
        </dl>
      </div>
    </article>
  )
}

export default ClassCard

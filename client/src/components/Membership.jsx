import { formatPrice } from "../lib/format.js"
import StatusMessage from "./StatusMessage.jsx"

function Membership({ memberships, loading, error }) {
  return (
    <section
      id="membership"
      className="scroll-mt-32 md:scroll-mt-20 bg-surface-2 bg-[url('/images/last.jpg')] bg-cover bg-center"
    >
      <div className="bg-black/35 px-4 py-12 text-center sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="rounded-md bg-surface p-2 font-display text-2xl text-brand sm:text-3xl">
            Membership
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white">
            We offer flexible membership options to fit your schedule and budget.
            Choose from monthly, quarterly, or annual memberships, and enjoy
            unlimited access to our classes and facilities.
          </p>

          <StatusMessage loading={loading} error={error} what="memberships" />

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {memberships.map((plan) => (
              <article
                key={plan.id}
                className="flex flex-col rounded-2xl border border-white/30 bg-black/45 p-6 text-white backdrop-blur-md"
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-3 flex-1 text-sm text-white/85">{plan.blurb}</p>
                <p className="mt-5">
                  <span className="font-display text-3xl">{formatPrice(plan.price)}</span>
                  <span className="text-white/75"> / {plan.period}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Membership

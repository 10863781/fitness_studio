function Hero() {
  return (
    <section className="relative bg-[url('/images/hero.jpg')] bg-cover bg-center">
      <div className="bg-black/55 px-4 py-20 text-center text-white sm:py-28 lg:py-36">
        <p className="text-sm font-semibold uppercase tracking-widest text-surface-2">
          Classes · Trainers · Memberships
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-6xl">
          Welcome to Milano Fitness Studio!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
          Small-group classes, certified coaches and flexible memberships to fit
          your schedule.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#classes"
            className="w-full rounded-md bg-brand px-6 py-3 font-semibold uppercase text-white transition hover:bg-blue-800 sm:w-auto"
          >
            See classes
          </a>
          <a
            href="#register"
            className="w-full rounded-md border border-white px-6 py-3 font-semibold uppercase text-white transition hover:bg-white hover:text-brand sm:w-auto"
          >
            Join now
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

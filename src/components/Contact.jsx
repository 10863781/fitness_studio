function Contact() {
  return (
    <section id="contact" className="scroll-mt-32 md:scroll-mt-20 bg-surface px-4 py-12 text-center sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl text-brand sm:text-3xl">Contact Us</h2>
        <p className="mt-4">
          If you have any questions or would like to get in touch, please don't
          hesitate to reach out to us.
        </p>
        <address className="mt-6 grid gap-2 not-italic sm:grid-cols-3 sm:gap-4">
          <p>
            <span className="block font-semibold text-brand">Address</span>
            123 Fitness Street, Health City
          </p>
          <p>
            <span className="block font-semibold text-brand">Phone</span>
            <a href="tel:+11234567890" className="hover:underline">(123) 456-7890</a>
          </p>
          <p className="break-words">
            <span className="block font-semibold text-brand">Email</span>
            <a href="mailto:info@milanofitness.com" className="hover:underline">
              info@milanofitness.com
            </a>
          </p>
        </address>
      </div>
    </section>
  )
}

export default Contact

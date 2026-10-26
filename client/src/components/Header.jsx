const links = [
  { href: "#home", label: "Home" },
  { href: "#classes", label: "Classes" },
  { href: "#membership", label: "Membership" },
  { href: "#register", label: "Register" },
  { href: "#contact", label: "Contact" },
]

function Header() {
  return (
    <header id="home" className="sticky top-0 z-20 bg-surface px-4 py-3 shadow">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 md:flex-row md:justify-between">
        <a href="#home" className="font-display text-2xl text-brand sm:text-3xl">
          Milano <span className="text-ink">Fitness</span>
        </a>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center rounded-md bg-brand">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-[#d3e2e0] hover:text-brand sm:px-5 sm:py-3 sm:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

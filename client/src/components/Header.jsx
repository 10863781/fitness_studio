import { authClient } from "../lib/auth-client.js"

const links = [
  { href: "#home", label: "Home" },
  { href: "#classes", label: "Classes" },
  { href: "#membership", label: "Membership" },
  { href: "#register", label: "Register" },
  { href: "#contact", label: "Contact" },
]

const accountButtonClass =
  "rounded-md border border-brand px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"

function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header id="home" className="sticky top-0 z-20 bg-surface px-4 py-3 shadow">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 md:flex-row md:justify-between">
        <a href="#home" className="font-display text-2xl text-brand sm:text-3xl">
          Milano <span className="text-ink">Fitness</span>
        </a>
        <div className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
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
          {session ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold">Hi, {session.user.name.split(" ")[0]}</span>
              <button type="button" onClick={() => authClient.signOut()} className={accountButtonClass}>
                Sign out
              </button>
            </div>
          ) : (
            <a href="#register" className={accountButtonClass}>
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

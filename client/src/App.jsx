import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import ClassGrid from "./components/ClassGrid.jsx"
import Membership from "./components/Membership.jsx"
import Register from "./components/Register.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"
import { useApi } from "./lib/useApi.js"

function App() {
  // Loaded once here because both Membership and Register need the plans
  const memberships = useApi("/api/memberships")

  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-ink">
      <Header />
      <main>
        <Hero />
        <ClassGrid />
        <Membership
          memberships={memberships.data ?? []}
          loading={memberships.loading}
          error={memberships.error}
        />
        <Register memberships={memberships.data ?? []} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import ClassGrid from "./components/ClassGrid.jsx"
import Membership from "./components/Membership.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-ink">
      <Header />
      <main>
        <Hero />
        <ClassGrid />
        <Membership />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

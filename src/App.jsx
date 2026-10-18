import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import ClassGrid from "./components/ClassGrid.jsx"

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-ink">
      <Header />
      <main>
        <Hero />
        <ClassGrid />
      </main>
    </div>
  )
}

export default App

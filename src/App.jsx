import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-ink">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App

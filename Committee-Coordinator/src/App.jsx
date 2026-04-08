import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Why />
      </main>
      <Footer />
    </div>
  )
}

export default App

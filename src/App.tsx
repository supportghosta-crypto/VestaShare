import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import AssetDetail from './pages/AssetDetail'
import Portfolio from './pages/Portfolio'
import Referral from './pages/Referral'
import AIMatrix from './pages/AIMatrix'
import { usePiStore } from './store/piStore'

function App() {
  const { initializePi } = usePiStore()

  useEffect(() => {
    // Initialize Pi SDK on app load
    initializePi()
  }, [])

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-obsidian to-slate-900">
        <Navigation />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/ai-matrix" element={<AIMatrix />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

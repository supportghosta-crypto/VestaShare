import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Briefcase, TrendingUp, Share2, Cpu, LogOut } from 'lucide-react'
import { usePiStore } from '../store/piStore'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, authenticateWithPi, logout } = usePiStore()

  const navItems = [
    { path: '/', label: 'Explore', icon: Home },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/referral', label: 'Referral', icon: Share2 },
    { path: '/ai-matrix', label: 'AI Admin', icon: Cpu },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-700 border-opacity-30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-neon to-indigo-electric flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">VestaShare</h1>
              <p className="text-xs text-slate-400">AI Marketplace on Pi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                    isActive(item.path)
                      ? 'bg-indigo-electric bg-opacity-20 text-indigo-neon'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 hover:bg-opacity-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={authenticateWithPi}
                className="hidden sm:flex button-primary items-center gap-2"
              >
                <span>🥧</span>
                Authenticate
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-3 bg-slate-800 bg-opacity-50 px-4 py-2 rounded-lg">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user?.username}</p>
                  <p className="text-xs text-emerald-accent font-bold">{user?.balance}π</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-red-900 hover:bg-opacity-20 rounded-lg smooth-transition"
                  title="Logout"
                >
                  <LogOut size={18} className="text-red-400" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 smooth-transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 space-y-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                      isActive(item.path)
                        ? 'bg-indigo-electric bg-opacity-20 text-indigo-neon'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    authenticateWithPi()
                    setIsOpen(false)
                  }}
                  className="w-full button-primary mt-4 flex items-center justify-center gap-2"
                >
                  <span>🥧</span>
                  Authenticate with Pi
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navigation

import { useState } from 'react'
import { motion } from 'framer-motion'
import AssetCard from '../components/AssetCard'
import { useAssetStore, Asset } from '../store/assetStore'

const Home = () => {
  const { assets } = useAssetStore()
  const [filter, setFilter] = useState<'all' | 'real-estate' | 'agriculture' | 'green-energy'>('all')

  const filters = [
    { id: 'all', label: 'All Assets' },
    { id: 'real-estate', label: '🏢 Real Estate' },
    { id: 'agriculture', label: '🌾 Agriculture' },
    { id: 'green-energy', label: '⚡ Green Energy' },
  ]

  const filteredAssets =
    filter === 'all' ? assets : assets.filter((asset) => asset.type === filter)

  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.totalValuation, 0)
  const avgAPY =
    assets.reduce((sum, asset) => sum + asset.projectedAPY, 0) / assets.length

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-electric via-obsidian to-indigo-neon p-8 md:p-12 glow-border"
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome to <span className="gradient-text">VestaShare</span>
          </h1>
          <p className="text-lg text-slate-200 mb-6 max-w-2xl">
            AI-autonomous marketplace for fractional investing in real-world assets. Powered by Pi Coin, managed entirely by algorithms.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-white bg-opacity-10 backdrop-blur px-4 py-2 rounded-lg border border-white border-opacity-20">
              <p className="text-slate-300">Total Market Cap</p>
              <p className="text-2xl font-bold text-emerald-accent">${(totalMarketCap / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur px-4 py-2 rounded-lg border border-white border-opacity-20">
              <p className="text-slate-300">Average APY</p>
              <p className="text-2xl font-bold text-gold-accent">{avgAPY.toFixed(2)}%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur px-4 py-2 rounded-lg border border-white border-opacity-20">
              <p className="text-slate-300">Active Assets</p>
              <p className="text-2xl font-bold text-indigo-neon">{assets.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Explore AI-Curated Assets</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg font-semibold smooth-transition ${
                filter === f.id
                  ? 'bg-gradient-to-r from-indigo-electric to-indigo-neon text-white shadow-neon-indigo'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-neon'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Assets Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <AssetCard asset={asset} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Home

import { Link } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Asset } from '../store/assetStore'

interface AssetCardProps {
  asset: Asset
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const fundingPercentage = asset.fundingProgress
  const typeLabel = {
    'real-estate': '🏢 Real Estate',
    agriculture: '🌾 Agriculture',
    'green-energy': '⚡ Green Energy',
  }[asset.type]

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/asset/${asset.id}`}>
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 border-opacity-50 rounded-xl overflow-hidden hover:border-indigo-neon hover:border-opacity-50 smooth-transition h-full flex flex-col cursor-pointer group">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-slate-700">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            {/* AI Curated Badge */}
            <div className="absolute top-3 right-3 bg-indigo-electric bg-opacity-90 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="text-xs font-bold text-white">🤖 AI Curated</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Type Badge */}
            <div className="mb-3">
              <span className="text-xs font-semibold text-indigo-neon bg-indigo-neon bg-opacity-10 px-2 py-1 rounded">
                {typeLabel}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-indigo-neon smooth-transition">
              {asset.title}
            </h3>

            {/* Price Per Share */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-1">Price per Share</p>
              <p className="text-2xl font-bold text-emerald-accent">{asset.pricePerShare}π</p>
            </div>

            {/* APY */}
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-gold-accent" />
              <div>
                <p className="text-sm text-slate-400">Projected APY</p>
                <p className="text-lg font-bold text-gold-accent">{asset.projectedAPY}%</p>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-400">Funding Progress</p>
                <p className="text-xs font-bold text-indigo-neon">{fundingPercentage}%</p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fundingPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-indigo-electric to-indigo-neon rounded-full"
                ></motion.div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {asset.remainingShares.toLocaleString()} shares remaining
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default AssetCard

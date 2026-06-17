import { create } from 'zustand'

export interface Asset {
  id: string
  title: string
  type: 'real-estate' | 'agriculture' | 'green-energy'
  image: string
  description: string
  totalValuation: number
  pricePerShare: number
  projectedAPY: number
  fundingProgress: number
  remainingShares: number
  totalShares: number
  aiCurated: boolean
  monthlyPayout: number
}

interface AssetStoreState {
  assets: Asset[]
  userStakes: Record<string, number>
  addStake: (assetId: string, shares: number, piSpent: number) => void
  getAssetById: (id: string) => Asset | undefined
}

const mockAssets: Asset[] = [
  {
    id: '1',
    title: 'Premium Student Housing Token',
    type: 'real-estate',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    description: 'Fractional ownership in modern student housing complexes across 8 US universities',
    totalValuation: 2500000,
    pricePerShare: 50,
    projectedAPY: 8.5,
    fundingProgress: 68,
    remainingShares: 32000,
    totalShares: 50000,
    aiCurated: true,
    monthlyPayout: 42.5,
  },
  {
    id: '2',
    title: 'Sustainable Cocoa Farm Yield',
    type: 'agriculture',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=300&fit=crop',
    description: 'Fair-trade certified cocoa production across Ecuador and Ghana. Organic, regenerative farming.',
    totalValuation: 1800000,
    pricePerShare: 50,
    projectedAPY: 9.2,
    fundingProgress: 85,
    remainingShares: 7500,
    totalShares: 36000,
    aiCurated: true,
    monthlyPayout: 38.0,
  },
  {
    id: '3',
    title: 'Solar Energy Grid Array',
    type: 'green-energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938d440220?w=500&h=300&fit=crop',
    description: 'Utility-scale solar installation generating grid power across 4 states. Connected to major utilities.',
    totalValuation: 3200000,
    pricePerShare: 50,
    projectedAPY: 7.8,
    fundingProgress: 92,
    remainingShares: 4000,
    totalShares: 64000,
    aiCurated: true,
    monthlyPayout: 32.5,
  },
  {
    id: '4',
    title: 'Commercial Office Complex',
    type: 'real-estate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
    description: 'Premium A-Class office tower in financial district with 95% occupancy and long-term tenants.',
    totalValuation: 4500000,
    pricePerShare: 50,
    projectedAPY: 7.3,
    fundingProgress: 55,
    remainingShares: 45000,
    totalShares: 100000,
    aiCurated: true,
    monthlyPayout: 30.4,
  },
  {
    id: '5',
    title: 'Wind Farm Energy Coalition',
    type: 'green-energy',
    image: 'https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?w=500&h=300&fit=crop',
    description: 'Offshore wind turbine farm generating renewable energy for 500k+ households.',
    totalValuation: 2800000,
    pricePerShare: 50,
    projectedAPY: 8.9,
    fundingProgress: 71,
    remainingShares: 29000,
    totalShares: 56000,
    aiCurated: true,
    monthlyPayout: 37.1,
  },
  {
    id: '6',
    title: 'Organic Vineyard Estate',
    type: 'agriculture',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=500&h=300&fit=crop',
    description: 'Premium organic vineyard in Napa Valley producing award-winning wines with 25-year track record.',
    totalValuation: 1400000,
    pricePerShare: 50,
    projectedAPY: 10.1,
    fundingProgress: 62,
    remainingShares: 38000,
    totalShares: 28000,
    aiCurated: true,
    monthlyPayout: 42.0,
  },
]

export const useAssetStore = create<AssetStoreState>((set, get) => ({
  assets: mockAssets,
  userStakes: {},

  addStake: (assetId: string, shares: number, piSpent: number) => {
    set((state) => ({
      userStakes: {
        ...state.userStakes,
        [assetId]: (state.userStakes[assetId] || 0) + shares,
      },
    }))
    console.log(`Added ${shares} shares of asset ${assetId} for ${piSpent}π`)
  },

  getAssetById: (id: string) => {
    return get().assets.find((asset) => asset.id === id)
  },
}))

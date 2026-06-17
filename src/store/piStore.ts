import { create } from 'zustand'

interface PiUser {
  username: string
  balance: number
  uid: string
}

interface PiStoreState {
  user: PiUser | null
  isAuthenticated: boolean
  isInitialized: boolean
  initializePi: () => void
  authenticateWithPi: () => void
  updateBalance: (amount: number) => void
  logout: () => void
}

export const usePiStore = create<PiStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  initializePi: () => {
    // Simulate Pi SDK initialization
    console.log('[VestaShare] Initializing Pi SDK via window.Pi.init()')
    set({ isInitialized: true })
    
    // In production, this would be: window.Pi.init()
    // For now, we simulate it
    if (typeof window !== 'undefined') {
      (window as any).Pi = {
        init: () => console.log('Pi SDK initialized'),
        createPayment: (config: any, callback: any) => {
          console.log('Payment created:', config)
          callback(null, { transactionId: 'tx_' + Date.now() })
        },
        authenticate: () => Promise.resolve({ username: '@pioneer123', uid: 'uid_pioneer123' }),
      }
    }
  },

  authenticateWithPi: () => {
    // Simulate Pi Network authentication
    const mockUser: PiUser = {
      username: '@pioneer123',
      balance: 1250.5,
      uid: 'uid_pioneer123',
    }
    set({ user: mockUser, isAuthenticated: true })
  },

  updateBalance: (amount: number) => {
    set((state) => ({
      user: state.user ? { ...state.user, balance: state.user.balance + amount } : null,
    }))
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))

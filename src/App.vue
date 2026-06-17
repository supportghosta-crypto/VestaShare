<template>
  <div class="app-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo-section">
          <div class="logo">🤖✨</div>
          <h1>VestaShare</h1>
        </div>
        <div class="nav-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            class="nav-tab" 
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab === 'explore' ? 'Explore' : tab === 'portfolio' ? 'Portfolio' : tab === 'referral' ? 'Referral' : 'AI Admin' }}
          </button>
        </div>
        <div class="nav-auth">
          <button v-if="!authenticated" class="auth-button" @click="authenticateUser">
            Authenticate with Pi Network
          </button>
          <div v-else class="user-info">
            <span class="username">{{ username }}</span>
            <span class="pi-balance">{{ piBalance.toFixed(2) }} π</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Tab A: Explore Marketplace -->
      <section v-show="activeTab === 'explore'" class="tab-content active">
        <div class="explore-header">
          <h2>Explore Marketplace</h2>
          <p>AI-Curated Real-World Assets for Fractional Investing</p>
        </div>

        <div class="filter-buttons">
          <button 
            v-for="filter in filters"
            :key="filter"
            class="filter-btn" 
            :class="{ active: activeFilter === filter }"
            @click="activeFilter = filter"
          >
            {{ filter === 'all' ? 'All Assets' : filter.replace('-', ' ').charAt(0).toUpperCase() + filter.slice(1) }}
          </button>
        </div>

        <div class="assets-grid">
          <div 
            v-for="asset in filteredAssets" 
            :key="asset.id"
            class="asset-card"
            @click="openAssetDetail(asset)"
          >
            <div class="asset-card-image">{{ asset.emoji }}</div>
            <div class="asset-card-content">
              <div class="asset-card-header">
                <div class="asset-card-title">{{ asset.name }}</div>
                <div class="ai-badge">AI Curated</div>
              </div>
              <div class="asset-type">{{ asset.type.replace('-', ' ').toUpperCase() }}</div>
              <div class="asset-yield">{{ asset.apy }}% APY</div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: asset.fundingProgress + '%' }"></div>
              </div>
              <div class="asset-price">
                Price per Share: <span class="asset-price-value">{{ asset.price }} π</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab B: Asset Detail View -->
      <section v-show="activeTab === 'detail'" class="tab-content">
        <button class="back-button" @click="backToMarketplace">← Back to Marketplace</button>
        <div v-if="selectedAsset" class="detail-container">
          <div class="detail-content">
            <div class="asset-detail-image">{{ selectedAsset.emoji }}</div>
            <div class="asset-details">
              <h2>{{ selectedAsset.name }}</h2>
              <div class="detail-stat">
                <span class="detail-stat-label">Total Valuation</span>
                <span class="detail-stat-value">π {{ selectedAsset.totalValuation.toLocaleString() }}</span>
              </div>
              <div class="detail-stat">
                <span class="detail-stat-label">Price Per Share</span>
                <span class="detail-stat-value">π {{ selectedAsset.price }}</span>
              </div>
              <div class="detail-stat">
                <span class="detail-stat-label">Projected Annual Return</span>
                <span class="detail-stat-value">{{ selectedAsset.apy }}% APY</span>
              </div>
              <div class="detail-stat">
                <span class="detail-stat-label">Remaining Shares</span>
                <span class="detail-stat-value">{{ selectedAsset.remainingShares.toLocaleString() }}</span>
              </div>
              <div class="detail-stat" style="border-bottom: none;">
                <span class="detail-stat-label">Description</span>
              </div>
              <p style="color: var(--text-secondary); margin-top: 1rem;">{{ selectedAsset.description }}</p>
            </div>
          </div>
          <div class="investment-calculator">
            <h3>Investment Calculator</h3>
            <div class="calc-input-group">
              <label for="pi-amount">Amount of Pi to Invest (π)</label>
              <input 
                id="pi-amount"
                v-model.number="investmentAmount"
                type="number" 
                placeholder="100" 
                min="1" 
                step="10"
                @input="updateCalculator"
              >
            </div>
            <div class="calc-display">
              <div class="calc-item">
                <span>Shares to Receive</span>
                <span class="value">{{ calculatedShares.toFixed(2) }}</span>
              </div>
              <div class="calc-item">
                <span>Monthly Pi Payout</span>
                <span class="value">{{ monthlyPayout.toFixed(2) }} π</span>
              </div>
            </div>
            <button class="invest-button" @click="openPaymentModal">Invest Now via Pi Wallet</button>
          </div>
        </div>
      </section>

      <!-- Tab C: Pioneer Portfolio -->
      <section v-show="activeTab === 'portfolio'" class="tab-content">
        <div class="portfolio-header">
          <h2>Pioneer Portfolio</h2>
          <p>Your AI-Managed Investment Dashboard</p>
        </div>

        <div class="portfolio-stats">
          <div class="stat-card">
            <span class="stat-label">Total Portfolio Value</span>
            <span class="stat-value">{{ portfolioValue.toFixed(2) }} π</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">AI-Generated Earnings Ready</span>
            <span class="stat-value">{{ readyEarnings.toFixed(2) }} π</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average Portfolio APY</span>
            <span class="stat-value">{{ avgAPY.toFixed(1) }}%</span>
          </div>
        </div>

        <div class="portfolio-actions">
          <button class="claim-button" @click="claimYield" :disabled="readyEarnings <= 0">
            Claim Pi Yield
          </button>
        </div>

        <div class="holdings-section">
          <h3>Your Active Stakes</h3>
          <table class="holdings-table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Shares</th>
                <th>Value (π)</th>
                <th>APY</th>
                <th>Accumulated (π)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="holding in portfolio.holdings" :key="holding.id">
                <td>{{ holding.name }}</td>
                <td>{{ holding.shares.toFixed(2) }}</td>
                <td>{{ (holding.shares * holding.price).toFixed(2) }} π</td>
                <td>{{ holding.apy }}%</td>
                <td>{{ ((holding.shares * holding.price * holding.apy / 100) / 12).toFixed(2) }} π</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Tab D: Referral Dashboard -->
      <section v-show="activeTab === 'referral'" class="tab-content">
        <div class="referral-header">
          <h2>Viral Referral Dashboard</h2>
          <p>Grow Your Network, Earn Passive Pi</p>
        </div>

        <div class="referral-link-section">
          <label>Your Referral Link</label>
          <div class="referral-link-input">
            <input 
              :value="`vestashare.pi/${username}`" 
              type="text" 
              readonly
            >
            <button class="copy-button" @click="copyReferralLink">Copy Link</button>
          </div>
        </div>

        <div class="referral-stats">
          <div class="referral-stat-card">
            <span class="stat-label">Total Pioneers Referred</span>
            <span class="stat-value">{{ referralData.referred }}</span>
          </div>
          <div class="referral-stat-card">
            <span class="stat-label">Referral Commission Earned</span>
            <span class="stat-value">{{ referralData.earnings.toFixed(2) }} π</span>
          </div>
        </div>

        <div class="milestone-section">
          <h3>Bonus Yield Tiers</h3>
          <div class="milestone-progress">
            <div class="milestone">
              <span class="milestone-label">5 Referrals</span>
              <div class="milestone-bar">
                <div class="milestone-fill" :style="{ width: Math.min(referralData.referred / 5 * 100, 100) + '%' }"></div>
              </div>
              <span class="milestone-reward">+2% Yield Boost</span>
            </div>
            <div class="milestone">
              <span class="milestone-label">15 Referrals</span>
              <div class="milestone-bar">
                <div class="milestone-fill" :style="{ width: Math.min(referralData.referred / 15 * 100, 100) + '%' }"></div>
              </div>
              <span class="milestone-reward">+5% Yield Boost</span>
            </div>
            <div class="milestone">
              <span class="milestone-label">50 Referrals</span>
              <div class="milestone-bar">
                <div class="milestone-fill" :style="{ width: Math.min(referralData.referred / 50 * 100, 100) + '%' }"></div>
              </div>
              <span class="milestone-reward">+10% Yield Boost</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab E: AI Admin Matrix -->
      <section v-show="activeTab === 'admin'" class="tab-content">
        <div class="admin-header">
          <h2>AI Admin Matrix</h2>
          <p>100% AI-Administered Application Transparency</p>
        </div>

        <div class="admin-metrics">
          <div class="metric-card">
            <span class="metric-label">AI Asset Curation Accuracy</span>
            <span class="metric-value">99.4%</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Total Autonomous Payouts</span>
            <span class="metric-value">${ totalPayouts }</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Next Distribution</span>
            <span class="metric-value">{{ countdownTimer }}</span>
          </div>
        </div>

        <div class="terminal-section">
          <h3>Autonomous Agent Activity Feed</h3>
          <div class="terminal-log">
            <div 
              v-for="(log, idx) in terminalLogs" 
              :key="idx"
              class="terminal-line"
              :class="'agent-' + ((idx % 3) + 1)"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modals -->
    <div v-if="showPaymentModal" class="modal">
      <div class="modal-overlay" @click="showPaymentModal = false"></div>
      <div class="modal-content payment-modal-content">
        <button class="modal-close" @click="showPaymentModal = false">×</button>
        <h2>Pi Wallet Payment</h2>
        <div class="payment-details">
          <div class="payment-item">
            <span>Asset</span>
            <span>{{ selectedAsset?.name }}</span>
          </div>
          <div class="payment-item">
            <span>Amount</span>
            <span>{{ investmentAmount.toFixed(2) }} π</span>
          </div>
          <div class="payment-item">
            <span>Shares</span>
            <span>{{ calculatedShares.toFixed(2) }}</span>
          </div>
        </div>
        <button class="payment-confirm" @click="confirmPayment">Confirm Payment</button>
        <button class="payment-cancel" @click="showPaymentModal = false">Cancel</button>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal">
      <div class="modal-overlay" @click="showSuccessModal = false"></div>
      <div class="modal-content success-modal-content">
        <button class="modal-close" @click="showSuccessModal = false">×</button>
        <div class="success-card">
          <div class="success-icon">✓</div>
          <h2>Yield Claimed Successfully!</h2>
          <div class="share-graphic">
            <p>🤖 VestaShare AI Admin just deposited {{ lastClaimedYield.toFixed(2) }} π into my wallet! 🤖 Assets managed completely by AI. Invest your Pi inside Pi Browser.</p>
          </div>
          <button class="copy-share-button" @click="copyShareText">Copy Share Text for Pi Chats & X</button>
        </div>
      </div>
    </div>

    <div v-if="showPrivacyModal" class="modal">
      <div class="modal-overlay" @click="showPrivacyModal = false"></div>
      <div class="modal-content legal-modal-content">
        <button class="modal-close" @click="showPrivacyModal = false">×</button>
        <h2>Privacy Policy</h2>
        <div class="legal-content">
          <p>VestaShare minimizes data collection. We only authenticate your public Pi Network username via the official Pi SDK and track on-chain transaction hashes to update your portfolio. We do not collect personal emails, phone numbers, or private keys. All data is managed algorithmically by the AI Admin; no humans have access to user data records.</p>
        </div>
      </div>
    </div>

    <div v-if="showTermsModal" class="modal">
      <div class="modal-overlay" @click="showTermsModal = false"></div>
      <div class="modal-content legal-modal-content">
        <button class="modal-close" @click="showTermsModal = false">×</button>
        <h2>Terms of Service</h2>
        <div class="legal-content">
          <p>By using VestaShare, you accept that this platform is a 100% AI-administered application dashboard. All asset curations, yield calculations, and payout allocations are executed via automated code blocks. All transactions are conducted exclusively in Pi Coin (π) or Test-Pi. Content displayed does not constitute traditional financial advice.</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2026 VestaShare - AI-Autonomous Marketplace</p>
        <div class="footer-links">
          <button class="footer-link" @click="showPrivacyModal = true">Privacy Policy</button>
          <span class="separator">•</span>
          <button class="footer-link" @click="showTermsModal = true">Terms of Service</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const authenticated = ref(false)
const username = ref('')
const piBalance = ref(0)
const activeTab = ref('explore')
const activeFilter = ref('all')
const selectedAsset = ref(null)
const investmentAmount = ref(0)
const calculatedShares = ref(0)
const monthlyPayout = ref(0)
const lastClaimedYield = ref(0)
const countdownTimer = ref('12:45:32')
const totalPayouts = ref('$47.2M')
const terminalLogs = ref([])
const showPaymentModal = ref(false)
const showSuccessModal = ref(false)
const showPrivacyModal = ref(false)
const showTermsModal = ref(false)

const tabs = ['explore', 'portfolio', 'referral', 'admin']
const filters = ['all', 'real-estate', 'agriculture', 'green-energy']

const ASSETS = [
  {
    id: 1,
    name: 'Premium Student Housing Token',
    type: 'real-estate',
    emoji: '🏢',
    apy: 8.5,
    price: 50,
    fundingProgress: 78,
    totalValuation: 2500000,
    remainingShares: 15000,
    description: 'Fractional ownership in premium student housing properties across major universities.'
  },
  {
    id: 2,
    name: 'Sustainable Cocoa Farm Yield',
    type: 'agriculture',
    emoji: '🌱',
    apy: 12.3,
    price: 35,
    fundingProgress: 92,
    totalValuation: 1800000,
    remainingShares: 8000,
    description: 'Sustainable cocoa farming operations generating consistent yield returns.'
  },
  {
    id: 3,
    name: 'Solar Energy Grid Array',
    type: 'green-energy',
    emoji: '☀️',
    apy: 9.7,
    price: 75,
    fundingProgress: 65,
    totalValuation: 5200000,
    remainingShares: 22000,
    description: 'Large-scale solar energy grid providing renewable power and consistent yields.'
  },
  {
    id: 4,
    name: 'Urban Office Complex',
    type: 'real-estate',
    emoji: '🏗️',
    apy: 7.2,
    price: 100,
    fundingProgress: 45,
    totalValuation: 8500000,
    remainingShares: 42000,
    description: 'Premium urban office complex with long-term tenant agreements.'
  },
  {
    id: 5,
    name: 'Organic Vineyard Estate',
    type: 'agriculture',
    emoji: '🍇',
    apy: 11.8,
    price: 60,
    fundingProgress: 88,
    totalValuation: 3200000,
    remainingShares: 18000,
    description: 'Premium organic vineyard producing award-winning wines.'
  },
  {
    id: 6,
    name: 'Wind Energy Turbine Farm',
    type: 'green-energy',
    emoji: '💨',
    apy: 10.4,
    price: 80,
    fundingProgress: 72,
    totalValuation: 6100000,
    remainingShares: 28000,
    description: 'State-of-the-art wind turbine farm with long-term power purchase agreements.'
  }
]

const TERMINAL_MESSAGES = [
  '[AI Agent-01]: Scanning global real estate markets for yield opportunities...',
  '[AI Agent-02]: Recalculating crop yield APY averages across agricultural portfolio...',
  '[AI Agent-03]: Automating micro-payout transactions to 14,200 active Pioneer wallets...',
  '[AI Agent-01]: Real estate market data updated: +2.3% opportunity index detected',
  '[AI Agent-02]: Sustainable farming audit completed. Portfolio health: 99.4%',
  '[System]: Processing autonomous asset rebalancing protocols...',
  '[AI Agent-03]: Generating 847 individual yield payout transactions...',
  '[AI Agent-01]: Evaluating 312 new real estate opportunities for AI curation...',
  '[AI Agent-02]: Crop quality assessment complete. Yield projection: +15% for Q2 2026',
  '[AI Agent-03]: All pioneer wallets updated successfully. Total value transferred: π 1,247,540',
  '[System]: AI consensus algorithm: All agents in sync. Next distribution: 12:45:32'
]

const portfolio = ref({
  holdings: [
    { id: 1, name: 'Premium Student Housing Token', shares: 25, apy: 8.5, price: 50 },
    { id: 2, name: 'Sustainable Cocoa Farm Yield', shares: 40, apy: 12.3, price: 35 },
    { id: 3, name: 'Solar Energy Grid Array', shares: 15, apy: 9.7, price: 75 }
  ]
})

const referralData = ref({
  referred: Math.floor(Math.random() * 45),
  earnings: Math.random() * 500 + 50
})

// Computed properties
const filteredAssets = computed(() => {
  if (activeFilter.value === 'all') return ASSETS
  return ASSETS.filter(a => a.type === activeFilter.value)
})

const portfolioValue = computed(() => {
  return portfolio.value.holdings.reduce((sum, h) => sum + (h.shares * h.price), 0)
})

const readyEarnings = computed(() => {
  const totalAPY = portfolio.value.holdings.reduce((sum, h) => {
    return sum + (h.shares * h.price * h.apy / 100)
  }, 0)
  return totalAPY / 12
})

const avgAPY = computed(() => {
  if (portfolio.value.holdings.length === 0) return 0
  const totalValue = portfolioValue.value
  const totalAPY = portfolio.value.holdings.reduce((sum, h) => {
    return sum + (h.shares * h.price * h.apy / 100)
  }, 0)
  return (totalAPY / totalValue) * 100
})

// Methods
function authenticateUser() {
  const usernames = ['@pioneer123', '@piinvestor', '@cryptoholder', '@pinetwork', '@tokenmaster']
  const randomUsername = usernames[Math.floor(Math.random() * usernames.length)]
  
  authenticated.value = true
  username.value = randomUsername
  piBalance.value = Math.random() * 10000 + 1000
  
  localStorage.setItem('vestaUser', JSON.stringify({
    username: username.value,
    piBalance: piBalance.value
  }))
}

function openAssetDetail(asset) {
  selectedAsset.value = asset
  activeTab.value = 'detail'
  investmentAmount.value = 0
  calculatedShares.value = 0
  monthlyPayout.value = 0
}

function backToMarketplace() {
  activeTab.value = 'explore'
  selectedAsset.value = null
}

function updateCalculator() {
  if (!selectedAsset.value || investmentAmount.value <= 0) {
    calculatedShares.value = 0
    monthlyPayout.value = 0
    return
  }
  
  calculatedShares.value = investmentAmount.value / selectedAsset.value.price
  monthlyPayout.value = (investmentAmount.value * (selectedAsset.value.apy / 100)) / 12
}

function openPaymentModal() {
  if (investmentAmount.value <= 0) {
    alert('Please enter a valid investment amount')
    return
  }
  
  if (!authenticated.value) {
    alert('Please authenticate with Pi Network first')
    return
  }
  
  showPaymentModal.value = true
}

function confirmPayment() {
  const shares = investmentAmount.value / selectedAsset.value.price
  piBalance.value -= investmentAmount.value
  
  const existingHolding = portfolio.value.holdings.find(h => h.id === selectedAsset.value.id)
  if (existingHolding) {
    existingHolding.shares += shares
  } else {
    portfolio.value.holdings.push({
      id: selectedAsset.value.id,
      name: selectedAsset.value.name,
      shares: shares,
      apy: selectedAsset.value.apy,
      price: selectedAsset.value.price
    })
  }
  
  showPaymentModal.value = false
  investmentAmount.value = 0
  alert('Investment confirmed! Your shares have been added to your portfolio.')
  backToMarketplace()
}

function claimYield() {
  if (readyEarnings.value <= 0) {
    alert('No yield available to claim')
    return
  }
  
  lastClaimedYield.value = readyEarnings.value
  piBalance.value += readyEarnings.value
  
  portfolio.value.holdings.forEach(h => {
    h.lastClaimed = new Date()
  })
  
  showSuccessModal.value = true
}

function copyShareText() {
  const shareText = `🤖 VestaShare AI Admin just deposited ${lastClaimedYield.value.toFixed(2)} π into my wallet! 🤖 Assets managed completely by AI. Invest your Pi inside Pi Browser. vestashare.pi/@pioneercommunity`
  navigator.clipboard.writeText(shareText).then(() => {
    alert('Share text copied to clipboard!')
  })
}

function copyReferralLink() {
  const link = `vestashare.pi/${username.value}`
  navigator.clipboard.writeText(link).then(() => {
    alert('Referral link copied!')
  })
}

function setupTerminalLog() {
  terminalLogs.value = []
  let messageIndex = 0
  
  const addMessage = () => {
    terminalLogs.value.push(TERMINAL_MESSAGES[messageIndex])
    if (terminalLogs.value.length > 15) {
      terminalLogs.value.shift()
    }
    messageIndex = (messageIndex + 1) % TERMINAL_MESSAGES.length
  }
  
  // Add initial messages
  for (let i = 0; i < 8; i++) {
    addMessage()
  }
  
  // Add new messages periodically
  const interval = setInterval(addMessage, 3000)
  onUnmounted(() => clearInterval(interval))
}

function startCountdown() {
  const updateTimer = () => {
    const now = new Date()
    let target = new Date(now)
    target.setHours(target.getHours() + 1, 0, 0, 0)
    
    if (target <= now) {
      target.setDate(target.getDate() + 1)
    }
    
    const diff = target - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    countdownTimer.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  
  updateTimer()
  const interval = setInterval(updateTimer, 1000)
  onUnmounted(() => clearInterval(interval))
}

// Lifecycle
onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem('vestaUser'))
  if (savedUser) {
    authenticated.value = true
    username.value = savedUser.username
    piBalance.value = savedUser.piBalance
  }
  
  setupTerminalLog()
  startCountdown()
})
</script>

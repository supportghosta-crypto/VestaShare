# VestaShare - AI-Autonomous RWA Marketplace

## Overview

VestaShare is a cutting-edge, AI-autonomous marketplace designed to run seamlessly inside the Pi Browser as a Pi Network Ecosystem App. It enables fractional investing in real-world assets using Pi Coin (π).

## Features

### 📊 Tab A: Explore Marketplace
- Browse AI-curated real-world assets (RWAs)
- Filter by asset type: Real Estate, Agriculture, Green Energy
- Real-time funding progress bars
- APY metrics and pricing information
- AI Curated badges for transparency

### 🏦 Tab B: Asset Detail View
- Deep-dive analysis of individual assets
- Total valuation, price per share, and remaining shares
- **Interactive Investment Calculator**
  - Dynamic share calculation
  - Estimated monthly payout projection
- One-click Pi Wallet payment integration

### 💼 Tab C: Pioneer Portfolio
- **Dashboard with key metrics:**
  - Total Portfolio Value (π)
  - AI-Generated Earnings Ready to Claim (π)
  - Average Portfolio APY (%)
- Real-time holdings table with accumulated yields
- **Viral Payout Loop:**
  - Claim button triggers beautiful success modal
  - Social share card with shareable graphic
  - Copy-to-clipboard functionality for Pi Chats & X

### 👥 Tab D: Viral Referral Dashboard
- Unique referral link generation
- One-click copy functionality
- **Performance tracking:**
  - Total Pioneers Referred
  - Referral Commission Earned (π)
  - Milestone progress bars (5, 15, 50+ referrals)
  - Yield boost rewards at each tier

### 🤖 Tab E: AI Admin Matrix
- **Global AI Performance Metrics:**
  - AI Asset Curation Accuracy (99.4%)
  - Total Autonomous Payouts Processed
  - Live Countdown Timer (Next Automated Yield Distribution)
- **Real-time Terminal Feed:**
  - Simulated autonomous agent activity logs
  - Color-coded messages by agent type
  - Live updates every 3 seconds
  - Shows AI operating with zero human intervention

## Pi Network Integration

### Authentication
- Simulates `window.Pi.init()` for native Pi Browser SDK
- Displays authenticated Pioneer username (e.g., @pioneer123)
- Real-time Pi balance display

### Payment Protocol
- All assets priced exclusively in Pi Coin (π)
- Simulates `Pi.createPayment()` for checkout
- Transaction approval overlays

## Design & Aesthetics

### Color Scheme
- **Background:** Deep slate grays and obsidian blacks
- **Text:** Crisp white for primary hierarchy
- **Accents:** 
  - Neon indigo/electric purple for AI engine
  - Emerald green for financial yield metrics
  - Gold for monetary values

### Animations
- Smooth fade-in transitions between tabs
- Hover effects on interactive elements
- Modal slide-up animations
- Real-time countdown timer
- Live terminal log scrolling

## Legal & Transparency

### Footer Links
- **Privacy Policy:** Data minimization statement
- **Terms of Service:** AI-administration and Pi Coin exclusivity disclaimer

## Technology Stack

- **Frontend Framework:** Vue 3
- **Build Tool:** Vite
- **Styling:** Custom CSS with CSS Variables
- **State Management:** Vue Composition API
- **Storage:** Browser LocalStorage for user persistence

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## File Structure

```
vestashare/
├── src/
│   ├── App.vue              # Main Vue component
│   ├── main.js              # Vue app entry point
│   └── styles.css           # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## Usage Guide

### 1. Authenticate
Click "Authenticate with Pi Network" to simulate Pi SDK authentication

### 2. Browse Assets
Explore the marketplace grid with multiple asset types and filter options

### 3. Invest
- Click an asset card to view details
- Use the investment calculator
- Approve payment via Pi Wallet overlay

### 4. Monitor Portfolio
Track your holdings, APY, and accumulated yields in real-time

### 5. Earn & Share
- Claim your Pi yield
- Share your earnings socially
- Build your referral network

### 6. Transparency
View the AI Admin Matrix to see autonomous operations in real-time

## Key Metrics & Data

- **Assets:** 6 curated RWAs with realistic data
- **APY Range:** 7.2% - 12.3%
- **Funding:** 45% - 92% complete
- **Terminal Logs:** 11 simulated autonomous agent messages
- **Update Intervals:** 3-second terminal updates, 1-second countdown

## Mobile Responsiveness

Fully responsive design supporting:
- Desktop (1400px+)
- Tablet (768px - 1399px)
- Mobile (<768px)

## Future Enhancements

- Real Pi Network SDK integration
- Actual blockchain transaction verification
- Advanced portfolio analytics
- Machine learning asset recommendations
- Multi-language support
- Dark/light theme toggle

## Legal Disclaimer

VestaShare is a 100% AI-administered application. All asset curations, yield calculations, and payout allocations are executed via automated code. Content displayed does not constitute traditional financial advice.

## License

MIT License - See LICENSE file for details

## Support

For issues or feature requests, please open an issue on GitHub.

---

**VestaShare** - Where AI Meets Fractional Investing 🤖✨

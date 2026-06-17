import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

const Modal = ({ isOpen, onClose, title, content }: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-800 border border-indigo-neon border-opacity-30 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-slate-800 border-b border-indigo-neon border-opacity-20 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg smooth-transition"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

const Footer = () => {
  const [openModal, setOpenModal] = useState<'privacy' | 'terms' | null>(null)

  const privacyContent = `PRIVACY POLICY

VestaShare minimizes data collection. We only authenticate your public Pi Network username via the official Pi SDK and track on-chain transaction hashes to update your portfolio. We do not collect personal emails, phone numbers, or private keys. All data is managed algorithmically by the AI Admin; no humans have access to user data records.

Data Collection:
• Public Pi Network username (@username)
• On-chain transaction hashes
• Portfolio holdings (shares and yields)
• Public wallet balance information

What We DON'T Collect:
• Email addresses
• Phone numbers
• Private keys or seed phrases
• Personal identification information
• Location data
• Browsing history

Data Management:
All user data is processed algorithmically by AI systems. No human team members have direct access to individual user records. All transactions are immutable on the blockchain and auditable.

Security:
Your authentication is managed entirely through the official Pi Network SDK. All data at rest is encrypted. All data in transit uses secure protocols.`

  const termsContent = `TERMS OF SERVICE

By using VestaShare, you accept that this platform is a 100% AI-administered application dashboard. All asset curations, yield calculations, and payout allocations are executed via automated code blocks. All transactions are conducted exclusively in Pi Coin (π) or Test-Pi. Content displayed does not constitute traditional financial advice.

Acknowledgments:
1. This is an AI-Autonomous Platform
   - No human intervention in asset selection
   - Automated yield calculations
   - Algorithmic payout processing
   - Zero human control over transactions

2. Asset Investment Risks
   - Real-world assets carry inherent risks
   - Past performance does not guarantee future results
   - Market conditions may impact returns
   - Liquidity may be limited

3. Pi Coin Volatility
   - Pi Coin value fluctuates
   - Yields are calculated in Pi Coin
   - You accept all price volatility risks

4. Not Traditional Financial Advice
   - Content is for information only
   - Always conduct your own research
   - Consult a financial advisor if needed
   - VestaShare provides no personalized financial advice

5. User Responsibilities
   - You are responsible for your Pi Network account security
   - You understand the risks of fractional ownership
   - You accept all trading and transaction risks
   - You agree to use the platform lawfully

6. Limitations of Liability
   - VestaShare is provided "as-is"
   - We are not liable for AI system errors
   - We are not liable for blockchain network issues
   - We are not liable for market losses

7. Termination
   - VestaShare reserves the right to suspend or terminate access
   - All holdings remain on the blockchain
   - Yield payouts will continue per smart contract

By clicking "I Agree" or continuing to use VestaShare, you acknowledge and agree to all terms outlined above.`

  return (
    <footer className="mt-16 border-t border-slate-700 border-opacity-30 bg-gradient-to-b from-transparent to-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">VestaShare</h3>
            <p className="text-sm text-slate-400">AI-autonomous marketplace for fractional investing in real-world assets using Pi Coin.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-slate-400 hover:text-indigo-neon smooth-transition">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/portfolio" className="text-slate-400 hover:text-indigo-neon smooth-transition">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/ai-matrix" className="text-slate-400 hover:text-indigo-neon smooth-transition">
                  AI Admin Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Platform Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Assets Listed:</span>
                <span className="text-emerald-accent font-bold">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg. APY:</span>
                <span className="text-gold-accent font-bold">8.63%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-slate-700 border-opacity-30 pt-8">
          <p className="text-xs text-slate-500 text-center mb-4">
            VestaShare is an AI-autonomous marketplace. All systems are fully automated with zero human intervention.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setOpenModal('privacy')}
              className="text-xs text-indigo-neon hover:text-indigo-400 smooth-transition underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setOpenModal('terms')}
              className="text-xs text-indigo-neon hover:text-indigo-400 smooth-transition underline"
            >
              Terms of Service
            </button>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-500">© 2024 VestaShare. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="Privacy Policy"
        content={privacyContent}
      />
      <Modal
        isOpen={openModal === 'terms'}
        onClose={() => setOpenModal(null)}
        title="Terms of Service"
        content={termsContent}
      />
    </footer>
  )
}

export default Footer

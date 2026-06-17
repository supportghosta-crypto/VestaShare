import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

interface PiPaymentOverlayProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  assetName: string
  shares: number
  onConfirm: () => void
}

const PiPaymentOverlay = ({
  isOpen,
  onClose,
  amount,
  assetName,
  shares,
  onConfirm,
}: PiPaymentOverlayProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleConfirmPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setTimeout(() => {
        onConfirm()
        setIsSuccess(false)
        onClose()
      }, 2000)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-indigo-neon rounded-2xl max-w-md w-full p-8 glow-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Pi Wallet</h2>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="p-2 hover:bg-slate-700 rounded-lg smooth-transition disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle size={64} className="text-emerald-accent mb-4" />
                </motion.div>
                <p className="text-xl font-bold text-emerald-accent mb-2">Payment Confirmed!</p>
                <p className="text-sm text-slate-400 text-center">
                  Transaction hash: tx_{Math.random().toString(36).substring(7).toUpperCase()}
                </p>
              </motion.div>
            ) : (
              <>
                {/* Transaction Details */}
                <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Asset</span>
                    <span className="font-bold text-white">{assetName}</span>
                  </div>
                  <div className="border-t border-slate-600"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Shares</span>
                    <span className="font-bold text-emerald-accent">{shares}</span>
                  </div>
                  <div className="border-t border-slate-600"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Amount</span>
                    <span className="text-2xl font-bold text-gold-accent">{amount}π</span>
                  </div>
                </div>

                {/* Pi Wallet Info */}
                <div className="bg-indigo-electric bg-opacity-10 border border-indigo-neon border-opacity-30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-300 mb-2">
                    <span className="font-bold">🥧 Pi Wallet:</span> Confirming transaction in your Pi Browser Wallet...
                  </p>
                  <p className="text-xs text-slate-500">Please approve the payment in your Pi Network app.</p>
                </div>

                {/* Processing State */}
                {isProcessing && (
                  <motion.div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-indigo-neon"
                      />
                      <p className="text-sm text-slate-300">Processing payment...</p>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                      <motion.div
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-indigo-electric to-indigo-neon"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-3 border border-slate-600 rounded-lg text-slate-300 hover:text-white smooth-transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="flex-1 button-primary disabled:opacity-50"
                  >
                    {isProcessing ? 'Confirming...' : 'Confirm Payment'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PiPaymentOverlay

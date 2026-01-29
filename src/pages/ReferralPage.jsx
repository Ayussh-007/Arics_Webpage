import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReferralStore } from '../store/useReferralStore'
import toast from 'react-hot-toast'

const ReferralPage = () => {
  const {
    referralCode,
    generateReferralCode,
    referrals,
    getAvailableCredits,
    getReferralStats,
    getReferralTier
  } = useReferralStore()
  
  const [copied, setCopied] = useState(false)
  const stats = getReferralStats()
  const tier = getReferralTier()
  const availableCredits = getAvailableCredits()
  
  useEffect(() => {
    if (!referralCode) {
      generateReferralCode()
    }
  }, [referralCode, generateReferralCode])
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }
  
  const shareUrl = `https://arics.com?ref=${referralCode}`
  const shareMessage = `Get 15% off your first order at Arics Flower Boutique! Use my code: ${referralCode}\n${shareUrl}`
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 px-6 lg:px-12">
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
          Refer & Earn
        </h1>
        <p className="text-xl md:text-2xl font-['Cormorant_Garamond'] text-gray-700 italic">
          Share the love, earn rewards! Get ₹200 for every friend who orders.
        </p>
      </motion.div>
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-4xl mb-2">{tier.icon}</div>
            <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900">
              {tier.tier}
            </div>
            <div className="text-sm text-gray-600 font-['Lato']">Your Tier</div>
          </motion.div>
          
          <motion.div
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-['Playfair_Display'] font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 font-['Lato']">Referrals</div>
          </motion.div>
          
          <motion.div
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-['Playfair_Display'] font-bold text-pink-600">
              ₹{availableCredits}
            </div>
            <div className="text-sm text-gray-600 font-['Lato']">Available Credits</div>
          </motion.div>
          
          <motion.div
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-['Playfair_Display'] font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 font-['Lato']">Successful</div>
          </motion.div>
        </div>
        
        {/* Referral Code Card */}
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-2">
              Your Referral Code
            </h2>
            <p className="text-white/80 font-['Lato']">
              Share this code with friends to get them 15% off
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-['Cinzel'] tracking-widest font-bold">
                {referralCode}
              </div>
            </div>
            
            <button
              onClick={() => copyToClipboard(referralCode)}
              className="w-full bg-white text-pink-600 py-3 rounded-full font-['Cinzel'] text-sm tracking-wider hover:bg-pink-50 transition-all shadow-lg"
            >
              {copied ? '✓ COPIED!' : 'COPY CODE'}
            </button>
          </div>
          
          {/* Share Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank')
              }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl transition-all"
            >
              <div className="text-2xl mb-1">📱</div>
              <div className="text-xs font-['Lato']">WhatsApp</div>
            </button>
            
            <button
              onClick={() => {
                window.open(`mailto:?subject=Get 15% off at Arics&body=${encodeURIComponent(shareMessage)}`, '_blank')
              }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl transition-all"
            >
              <div className="text-2xl mb-1">📧</div>
              <div className="text-xs font-['Lato']">Email</div>
            </button>
            
            <button
              onClick={() => copyToClipboard(shareUrl)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl transition-all"
            >
              <div className="text-2xl mb-1">🔗</div>
              <div className="text-xs font-['Lato']">Copy Link</div>
            </button>
          </div>
        </motion.div>
        
        {/* How It Works */}
        <motion.div
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: '🎁',
                title: 'Share Your Code',
                description: 'Send your unique referral code to friends via WhatsApp, email, or social media.'
              },
              {
                step: '2',
                icon: '🛍️',
                title: 'Friend Orders',
                description: 'Your friend gets 15% off their first order when they use your code.'
              },
              {
                step: '3',
                icon: '💰',
                title: 'You Get Rewarded',
                description: 'Earn ₹200 credit for each successful referral. Use it on your next purchase!'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-['Playfair_Display'] font-bold text-pink-600">
                    {item.step}
                  </span>
                </div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-['Lato']">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Referral Tiers */}
        <motion.div
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 text-center mb-8">
            Unlock Bonus Rewards
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: 'Bronze', referrals: 3, bonus: '₹100', icon: '🥉', color: 'from-amber-600 to-amber-400' },
              { tier: 'Silver', referrals: 10, bonus: '₹500', icon: '🥈', color: 'from-gray-400 to-gray-300' },
              { tier: 'Gold', referrals: 25, bonus: 'Free Bouquet/Month', icon: '🥇', color: 'from-yellow-500 to-yellow-300' }
            ].map((level, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white text-center ${
                  tier.tier === level.tier ? 'ring-4 ring-white shadow-2xl scale-105' : ''
                }`}
              >
                <div className="text-5xl mb-3">{level.icon}</div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2">
                  {level.tier}
                </h3>
                <div className="text-sm mb-3">
                  {level.referrals} successful referrals
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4">
                  <div className="font-['Cinzel'] font-semibold">
                    Bonus: {level.bonus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Referral History */}
        {referrals.length > 0 && (
          <motion.div
            className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">
              Your Referrals
            </h2>
            
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="bg-white/60 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <div className="font-['Lato'] font-semibold text-gray-900">
                        {referral.friendName || referral.friendEmail}
                      </div>
                      <div className="text-sm text-gray-600 font-['Lato']">
                        {new Date(referral.referredAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-['Montserrat'] font-semibold ${
                      referral.status === 'rewarded'
                        ? 'bg-green-100 text-green-700'
                        : referral.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {referral.status === 'rewarded' ? '✓ Rewarded' : referral.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                    {referral.status === 'rewarded' && (
                      <div className="text-sm text-green-600 font-['Lato'] mt-1">
                        +₹{referral.reward}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ReferralPage

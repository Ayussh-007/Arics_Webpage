import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useReferralStore = create(
  persist(
    (set, get) => ({
      // User's referral code
      referralCode: null,
      
      // Referrals made by user
      referrals: [],
      
      // Credits earned
      creditsEarned: 0,
      creditsUsed: 0,
      
      // Generate unique referral code
      generateReferralCode: (userId) => {
        const code = `ARICS-${userId || Math.random().toString(36).substring(7).toUpperCase()}`
        set({ referralCode: code })
        return code
      },
      
      // Add a referral
      addReferral: (friendEmail, friendName) => {
        const referral = {
          id: Date.now().toString(),
          friendEmail,
          friendName,
          status: 'pending', // pending, completed, rewarded
          referredAt: new Date().toISOString(),
          completedAt: null,
          reward: 200, // ₹200 credit
        }
        
        set((state) => ({
          referrals: [...state.referrals, referral]
        }))
        
        return referral
      },
      
      // Mark referral as completed (friend made purchase)
      completeReferral: (referralId) => {
        set((state) => ({
          referrals: state.referrals.map(ref =>
            ref.id === referralId
              ? {
                  ...ref,
                  status: 'completed',
                  completedAt: new Date().toISOString()
                }
              : ref
          )
        }))
      },
      
      // Award credits for completed referral
      awardReferralCredit: (referralId) => {
        const referral = get().referrals.find(r => r.id === referralId)
        if (!referral || referral.status === 'rewarded') return
        
        set((state) => ({
          referrals: state.referrals.map(ref =>
            ref.id === referralId
              ? { ...ref, status: 'rewarded' }
              : ref
          ),
          creditsEarned: state.creditsEarned + referral.reward
        }))
      },
      
      // Use credits
      useCredits: (amount) => {
        const available = get().creditsEarned - get().creditsUsed
        if (amount > available) return false
        
        set((state) => ({
          creditsUsed: state.creditsUsed + amount
        }))
        
        return true
      },
      
      // Get available credits
      getAvailableCredits: () => {
        const { creditsEarned, creditsUsed } = get()
        return creditsEarned - creditsUsed
      },
      
      // Get referral stats
      getReferralStats: () => {
        const { referrals } = get()
        
        return {
          total: referrals.length,
          pending: referrals.filter(r => r.status === 'pending').length,
          completed: referrals.filter(r => r.status === 'completed' || r.status === 'rewarded').length,
          rewarded: referrals.filter(r => r.status === 'rewarded').length,
        }
      },
      
      // Referral tiers (gamification)
      getReferralTier: () => {
        const completedCount = get().referrals.filter(r => r.status === 'rewarded').length
        
        if (completedCount >= 25) return { tier: 'Gold', bonus: 100, icon: '🥇' }
        if (completedCount >= 10) return { tier: 'Silver', bonus: 50, icon: '🥈' }
        if (completedCount >= 3) return { tier: 'Bronze', bonus: 20, icon: '🥉' }
        return { tier: 'Starter', bonus: 0, icon: '🌸' }
      }
    }),
    {
      name: 'arics-referral-storage',
    }
  )
)

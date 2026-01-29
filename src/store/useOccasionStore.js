import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOccasionStore = create(
  persist(
    (set, get) => ({
      occasions: [],
      
      // Add a new occasion
      addOccasion: (occasionData) => {
        const newOccasion = {
          id: Date.now().toString(),
          ...occasionData,
          reminderEnabled: true,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          occasions: [...state.occasions, newOccasion],
        }));
        
        return newOccasion;
      },
      
      // Delete an occasion
      deleteOccasion: (id) => {
        set((state) => ({
          occasions: state.occasions.filter((occ) => occ.id !== id),
        }));
      },
      
      // Update an occasion
      updateOccasion: (id, updates) => {
        set((state) => ({
          occasions: state.occasions.map((occ) =>
            occ.id === id ? { ...occ, ...updates } : occ
          ),
        }));
      },
      
      // Toggle reminder enabled/disabled
      toggleReminder: (id) => {
        set((state) => ({
          occasions: state.occasions.map((occ) =>
            occ.id === id ? { ...occ, reminderEnabled: !occ.reminderEnabled } : occ
          ),
        }));
      },
      
      // Get occasions by type
      getOccasionsByType: (type) => {
        return get().occasions.filter((occ) => occ.type === type);
      },
      
      // Get upcoming occasions (within next N days)
      getUpcomingOccasions: (days = 30) => {
        const now = new Date();
        const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        
        return get().occasions.filter((occ) => {
          const occDate = new Date(occ.date);
          const thisYear = new Date(occDate);
          thisYear.setFullYear(now.getFullYear());
          
          if (thisYear < now) {
            thisYear.setFullYear(now.getFullYear() + 1);
          }
          
          return thisYear <= futureDate;
        });
      },
      
      // Get occasions that need reminders today
      getRemindersForToday: () => {
        const now = new Date();
        
        return get().occasions.filter((occ) => {
          if (!occ.reminderEnabled) return false;
          
          const occDate = new Date(occ.date);
          const thisYear = new Date(occDate);
          thisYear.setFullYear(now.getFullYear());
          
          if (thisYear < now) {
            thisYear.setFullYear(now.getFullYear() + 1);
          }
          
          const daysUntil = Math.ceil((thisYear - now) / (1000 * 60 * 60 * 24));
          
          return daysUntil === occ.reminderDays;
        });
      },
      
      // Get count of all occasions
      getCount: () => {
        return get().occasions.length;
      },
      
      // Clear all occasions (useful for testing)
      clearAll: () => {
        set({ occasions: [] });
      },
    }),
    {
      name: 'arics-occasions-storage',
      version: 1,
    }
  )
);

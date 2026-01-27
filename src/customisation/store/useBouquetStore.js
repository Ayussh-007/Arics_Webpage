import { create } from 'zustand'

const defaultSelection = {
  quantity: 7,
  flowers: {},
  customizations: {},
  notes: '',
}

export const useBouquetStore = create((set) => ({
  step: 1,
  selection: defaultSelection,
  setStep: (step) => set({ step }),
  setQuantity: (quantity) =>
    set((state) => ({ selection: { ...state.selection, quantity } })),
  setFlowerStem: (flowerId, stems) =>
    set((state) => ({
      selection: {
        ...state.selection,
        flowers: { ...state.selection.flowers, [flowerId]: stems },
      },
    })),
  toggleCustomization: (category, option, inputType) =>
    set((state) => {
      const current = state.selection.customizations[category]
      if (inputType === 'checkbox') {
        const list = Array.isArray(current) ? current : []
        const exists = list.includes(option)
        const updated = exists ? list.filter((o) => o !== option) : [...list, option]
        return {
          selection: {
            ...state.selection,
            customizations: { ...state.selection.customizations, [category]: updated },
          },
        }
      }
      return {
        selection: {
          ...state.selection,
          customizations: { ...state.selection.customizations, [category]: option },
        },
      }
    }),
  setCustomizationQuantity: (category, value) =>
    set((state) => ({
      selection: {
        ...state.selection,
        customizations: { ...state.selection.customizations, [category]: value },
      },
    })),
  setNotes: (notes) =>
    set((state) => ({ selection: { ...state.selection, notes } })),
  reset: () => set({ selection: defaultSelection, step: 1 }),
}))

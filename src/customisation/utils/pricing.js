export const computePricing = ({ selection, flowers, customizations, settings }) => {
  const flowersMap = new Map(flowers.map((f) => [f._id, f]))
  const base = Object.entries(selection.flowers || {}).reduce((sum, [id, stems]) => {
    const flower = flowersMap.get(id)
    if (!flower) return sum
    return sum + Number(stems || 0) * Number(flower.pricePerStem || 0)
  }, 0)

  const addOns = (customizations || []).reduce((sum, cat) => {
    const picked = selection.customizations?.[cat.category]
    if (!picked) return sum
    if (cat.inputType === 'checkbox') {
      return (
        sum +
        picked.reduce((acc, optName) => {
          const opt = cat.options.find((o) => o.name === optName)
          return acc + Number(opt?.price || opt?.priceImpact || 0)
        }, 0)
      )
    }
    if (cat.inputType === 'quantity') {
      const opt = cat.options[0]
      return sum + Number(opt?.price || opt?.priceImpact || 0) * Number(picked || 0)
    }
    const opt = cat.options.find((o) => o.name === picked)
    return sum + Number(opt?.price || opt?.priceImpact || 0)
  }, 0)

  const taxRate = settings?.taxRate ?? 0.05
  const tax = (base + addOns) * taxRate
  const delivery = settings?.deliveryFee ?? 4.99
  const total = base + addOns + tax + delivery

  return { base, addOns, tax, delivery, total }
}

export const estimateDelivery = ({ quantity, settings }) => {
  const base = settings?.deliveryBaseDays ?? 2
  const perStem = settings?.deliveryPerStemDays ?? 0.02
  const days = Math.max(1, Math.round(base + quantity * perStem))
  return days
}

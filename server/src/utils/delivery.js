export const estimateDelivery = ({ quantity, locationCode, settings }) => {
  const base = settings?.deliveryBaseDays ?? 2
  const perStem = settings?.deliveryPerStemDays ?? 0.02
  const offset =
    settings?.locationOffsets?.find((o) => o.code === locationCode)?.days ?? 0

  const days = Math.max(1, Math.round(base + quantity * perStem + offset))
  const start = new Date()
  start.setDate(start.getDate() + days)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)

  const toLabel = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return {
    days,
    startDate: toLabel(start),
    endDate: toLabel(end),
  }
}

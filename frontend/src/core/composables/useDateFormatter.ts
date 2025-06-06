export const useDateFormatter = () => {
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0]
  }
  return { formatDate }
}

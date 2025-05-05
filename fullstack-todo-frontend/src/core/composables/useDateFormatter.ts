export const useDateFormatter = () => {
  const formatDate = (date: string) => {
    return new Date(date).toISOString().split('T')[0]
  }
  return { formatDate }
}

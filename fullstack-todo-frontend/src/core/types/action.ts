export interface Action {
  label: string
  variant?: string
  color?: string
  handler: () => void
}

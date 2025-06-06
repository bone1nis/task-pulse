export interface Action {
  label: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'icon' | 'error'
  color?: string
  handler: () => void
}

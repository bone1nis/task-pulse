export interface Option {
  value: number
  label: string
  selected?: boolean
}

export interface Field {
  name: string
  label: string
  as?: 'input' | 'select' | 'toggle'
  multiselect?: boolean
  disabled?: boolean
  type?: 'text' | 'date'
  placeholder?: string
  options?: Option[]
}

export type InputField = Omit<Field, 'multiselect' | 'options' | 'as'>

export type ToggleField = Omit<Field, 'multiselect' | 'options' | 'as' | 'type' | 'placeholder'>

export type SelectField = Omit<Field, 'type', 'as', 'placeholder'>

export interface LoginValues {
  email: string
  password: string
}

export interface RegisterValues {
  username: string
  email: string
  password: string
  passwordConfirmed: string
  firstName?: string
  lastName?: string
  middleName?: string
}

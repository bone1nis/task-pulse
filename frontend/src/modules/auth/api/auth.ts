import type { AxiosError } from 'axios'
import type { LoginValues, RegisterValues } from '../types/auth'

export const login = async (values: LoginValues) => {
  const api = useApi()

  try {
    await api.post('/auth/login', values)
    const response = await api.post('/auth/me')
    return response.data
  } catch (error: unknown) {
    const err = error as AxiosError
    if (err.response?.status === 401) {
      throw new Error('Неверный логин или пароль')
    }

    throw new Error('Произошла ошибка. Попробуйте позже')
  }
}

export const logout = async () => {
  const api = useApi()
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error(error)
    throw new Error('Произошла ошибка. Попробуйте позже')
  }
}

export const register = async (values: RegisterValues) => {
  const api = useApi()

  try {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmed,
      firstname: values.firstName || null,
      lastname: values.lastName || null,
      middlename: values.middleName || null,
    }

    await api.post('/auth/register', payload)
    const response = await api.post('/auth/me')
    return response.data
  } catch (error: unknown) {
    const err = error as AxiosError
    if (err.response?.status === 422) {
      throw new Error('Некорректные данные для регистрации')
    }

    throw new Error('Не удалось зарегистрироваться. Попробуйте позже')
  }
}

export const me = async () => {
  const api = useApi()
  const response = await api.post('/auth/me')
  return response.data
}
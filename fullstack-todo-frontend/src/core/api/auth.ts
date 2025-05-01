import api from './axios'
import type { LoginValues, RegisterValues } from '@/core/types/auth.ts'

export const login = async (values: LoginValues) => {
  try {
    await api.post('/auth/login', values)
    const response = await api.post('/auth/me')
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Неверный логин или пароль')
    }

    throw new Error('Произошла ошибка. Попробуйте позже')
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error(error)
    throw new Error('Произошла ошибка. Попробуйте позже')
  }
}

export const register = async (values: RegisterValues) => {
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

    console.log(payload);

    const response = await api.post('/auth/register', payload)

    return response.data
  } catch (error) {
    if (error.response?.status === 422) {
      throw new Error('Некорректные данные для регистрации')
    }

    throw new Error('Не удалось зарегистрироваться. Попробуйте позже')
  }
}

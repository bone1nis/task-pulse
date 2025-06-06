<script setup lang="ts">
import * as yup from 'yup'
import { useAuthStore } from '../stores/auth'
import type { LoginValues } from '../types/auth'
import type { Field } from '~/core/types/field'

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const authStore = useAuthStore()
const router = useRouter()

const fields: Field[] = [
  { name: 'email', label: 'Электронная почта', placeholder: 'Введите вашу почту' },
  { name: 'password', type: 'password', label: 'Пароль', placeholder: 'Введите пароль' },
]

const validationSchema = yup.object({
  password: yup.string().required('Поле обязательно'),
  email: yup.string().required('Поле обязательно').email('Введите корректный email'),
})

const submitForm = async (values: Record<string, string>) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await authStore.login(values as unknown as LoginValues)

    router.push({ name: 'tasks' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      setErrorMessage(error.message)
    } else {
      setErrorMessage(String(error))
    }
  } finally {
    setLoadingState(false)
  }
}
</script>

<template>
  <DynamicForm 
    :fields="fields" 
    :validation-schema="validationSchema" 
    submit-text="Авторизация" 
    :disabled="isLoading" 
    :error-message="errorMessage"
    @submit="submitForm" />
</template>

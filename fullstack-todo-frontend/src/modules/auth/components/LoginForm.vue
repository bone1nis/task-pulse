<script setup lang="ts">
import * as yup from 'yup'
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { useAuthStore } from '@/modules/auth/stores/auth.ts'
import { login } from '@/modules/auth/api/auth.ts'
import { useRouter } from 'vue-router'
import type { LoginValues } from '@/modules/auth/types/auth.ts'
import { useLoadingState } from '@/core/composables/useLoadingState.ts'

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const authStore = useAuthStore()
const router = useRouter()

const fields = [
  { name: 'email', label: 'Электронная почта', placeholder: 'Введите вашу почту' },
  { name: 'password', type: 'password', label: 'Пароль', placeholder: 'Введите пароль' },
]

const validationSchema = yup.object({
  password: yup.string().required('Поле обязательно'),
  email: yup.string().required('Поле обязательно').email('Введите корректный email'),
})

const submitForm = async (values: LoginValues) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    const data = await login(values)
    authStore.setUser(data)

    await router.push({ name: 'tasks' })
  } catch (error) {
    setErrorMessage(error.message)
  } finally {
    setLoadingState(false)
  }
}
</script>

<template>
  <DynamicForm
    :fields="fields"
    :validationSchema="validationSchema"
    submitText="Авторизация"
    @submit="submitForm"
    :disabled="isLoading"
    :errorMessage="errorMessage"
  />
</template>

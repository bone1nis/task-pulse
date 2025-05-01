<script setup lang="ts">
import * as yup from 'yup'
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/core/stores/auth.ts'
import { login } from '@/core/api/auth.ts'
import { useRouter } from 'vue-router'
import type { LoginValues } from '@/core/types/auth.ts'

const isLoading = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter();

const fields = [
  { name: 'email', label: 'Электронная почта', placeholder: 'Введите вашу почту' },
  { name: 'password', type: 'password', label: 'Пароль', placeholder: 'Введите ваш пароль' },
]

const validationSchema = yup.object({
  password: yup.string().required('Поле обязательно'),
  email: yup.string().required('Поле обязательно').email('Введите корректный email'),
})

const submitForm = async (values: LoginValues) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await login(values)
    authStore.setUser(data)

    await router.push({ name: 'tasks' });
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
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

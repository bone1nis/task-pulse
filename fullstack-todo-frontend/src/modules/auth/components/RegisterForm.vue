<script setup lang="ts">
import * as yup from 'yup'
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { register } from '@/core/api/auth.ts'
import { ref } from 'vue'
import { useAuthStore } from '@/core/stores/auth.ts'
import { useRouter } from 'vue-router'
import type { RegisterValues } from '@/core/types/auth.ts'

const isLoading = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter();

const fields = [
  {
    name: 'username',
    label: 'Логин',
    placeholder: 'Введите логин',
  },
  {
    name: 'email',
    label: 'Электронная почта',
    placeholder: 'Введите вашу почту',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
  },
  {
    name: 'passwordConfirmed',
    type: 'password',
    label: 'Подтверждение пароля',
    placeholder: 'Введите пароль повторно',
  },
  {
    name: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    placeholder: 'Введите отчество',
  },
]

const validationSchema = yup.object({
  username: yup.string().required('Поле обязательно'),
  password: yup
    .string()
    .required('Поле обязательно')
    .min(6, 'Пароль должен содержать не менее 6 символов'),
  passwordConfirmed: yup
    .string()
    .required('Поле обязательно')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  email: yup.string().required('Поле обязательно').email('Введите корректный email'),
})

const submitForm = async (values: RegisterValues) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await register(values)
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
    submitText="Регистрация"
    @submit="submitForm"
    :disabled="isLoading"
    :errorMessage="errorMessage"
  />
</template>

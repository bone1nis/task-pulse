<script setup lang="ts">
import * as yup from 'yup'
import { useAuthStore } from '../stores/auth'
import type { RegisterValues } from '../types/auth'
import type { Field } from '~/core/types/field'

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const authStore = useAuthStore()
const router = useRouter()

const fields: Field[] = [
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

const submitForm = async (values: Record<string, string>) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    authStore.register(values as unknown as RegisterValues)

    await router.push({ name: 'tasks' })
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
    submit-text="Регистрация"
    :disabled="isLoading"
    :error-message="errorMessage"
    @submit="submitForm"
  />
</template>

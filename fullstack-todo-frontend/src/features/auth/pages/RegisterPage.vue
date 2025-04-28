<script setup lang="ts">
import AuthForm from '@/features/auth/components/AuthForm.vue'

const fields = [
  {
    name: 'username',
    label: 'Логин',
    placeholder: 'Введите логин',
  },
  {
    name: 'email',
    label: 'Электронная почта',
    placeholder: 'Введите вашу почту'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль'
  },
  {
    name: 'passwordConfirmed',
    type: 'password',
    label: 'Подтверждение пароля',
    placeholder: 'Введите пароль повторно',
  },
  {
    name: 'firstname',
    label: 'Имя',
    placeholder: 'Введите имя',
  },
  {
    name: 'lastname',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
  },
  {
    name: 'middlename',
    label: 'Отчество',
    placeholder: 'Введите отчество',
  },
]

const submitForm = () => {
  console.log(form.value)
}
</script>

<template>
  <AuthForm
    title="Регистрация"
    :fields="fields"
    submit-text="Зарегистрироваться"
    @submit="submitForm"
  />
</template>

<style scoped lang="scss"></style>

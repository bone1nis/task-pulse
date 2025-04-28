<script setup lang="ts">
import AuthForm from '@/features/auth/components/AuthForm.vue'

const fields = [
  { name: 'email', label: 'Электронная почта', placeholder: 'Введите вашу почту' },
  { name: 'password', type: "password", label: 'Пароль', placeholder: 'Введите ваш пароль' },
]

const submitForm = (form) => {
  console.log(form)
}
</script>

<template>
  <AuthForm title="Авторизация" :fields="fields" submit-text="Вход" @submit="submitForm" />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as yup from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate'

const props = defineProps<{
  title: string
  fields: { name: string; type: string; label: string; placeholder: string }[]
  submitText: string
}>()

const emit = defineEmits<{
  (e: 'submit', value: Record<string, string>): void
}>()

const validationSchema = props.fields.reduce((acc, field) => {
  switch (field.name) {
    case 'email':
      acc[field.name] = yup.string().required('Поле обязательно').email('Введите корректный email')
      break
    case 'password':
      acc[field.name] = yup
        .string()
        .required('Поле обязательно')
        .min(6, 'Пароль должен содержать не менее 6 символов')
      break
    case 'passwordConfirmed':
      acc[field.name] = yup
        .string()
        .required('Поле обязательно')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
      break
    case 'username':
      acc[field.name] = yup.string().required('Поле обязательно')
      break
    default:
      acc[field.name] = yup.string()
  }
  return acc
}, {})

const submitForm = (values) => {
  emit('submit', values)
}
</script>

<template>
  <div class="auth-container">
    <h1 class="auth-title">{{ title }}</h1>

    <Form @submit="submitForm" :validation-schema="validationSchema">
      <div v-for="field in fields" :key="field.name" class="auth-form__group">
        <label :for="field.name" class="auth-form__label">{{ field.label }}</label>
        <Field :name="field.name" v-slot="{ field: fieldProps }">
          <input
            v-bind="fieldProps"
            :name="field.name"
            :id="field.name"
            :type="field.type || 'text'"
            :placeholder="field.placeholder"
            class="auth-form__input"
          />
          <ErrorMessage class="auth-form__error" :name="field.name" />
        </Field>
      </div>
      <button type="submit" class="auth-form__submit">{{ submitText }}</button>
    </Form>
  </div>
</template>

<style scoped lang="scss">
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: $color-background-soft;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .auth-title {
    text-align: center;
    margin-bottom: 30px;
    color: $color-text;
    font-size: 24px;
    font-weight: bold;
  }

  .auth-form {
    display: flex;
    flex-direction: column;

    &__group {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
    }

    &__label {
      font-size: 16px;
      color: $color-text;
      margin-bottom: 10px;
      font-weight: bold;
    }

    &__input {
      padding: 12px;
      font-size: 16px;
      border: 1px solid $color-border;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.3s;
      margin-bottom: 5px;

      &:focus {
        border-color: $color-green-light;
      }
    }

    &__submit {
      padding: 14px;
      font-size: 18px;
      background-color: $color-green;
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
      font-weight: bold;

      &:hover {
        background-color: $color-green-dark;
      }
    }

    &__error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
</style>

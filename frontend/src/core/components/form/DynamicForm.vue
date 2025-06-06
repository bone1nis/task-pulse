<script setup lang="ts">
import { Form } from 'vee-validate'
import type { Field } from '~/core/types/field'

defineProps<{
  fields: Field[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>
  submitText: string
  disabled?: boolean
  errorMessage?: string
  variant?: 'inline'
}>()

const emit = defineEmits<{
  (e: 'submit', value: Record<string, string>): void
}>()

const submitForm = (values: Record<string, string>) => {
  emit('submit', values)
}
</script>

<template>
  <div :class="['form', { 'form--block': variant !== 'inline' }]">
    <Form :validation-schema="validationSchema" :initial-values="initialValues" @submit="submitForm">
      <TypographyComponent as="h2" align="center" font-weight="bold" spacing="large"
        >{{ submitText }}
      </TypographyComponent>

      <div :class="{ 'form__fields-inline': variant === 'inline' }">
        <FormFields :fields="fields" />
      </div>

      <ErrorMessage v-if="errorMessage">
        {{ errorMessage }}
      </ErrorMessage>

      <ButtonComponent :disabled="disabled" type="submit" block>
        {{ disabled ? 'Загрузка...' : submitText }}
      </ButtonComponent>
    </Form>
  </div>
</template>

<style scoped lang="scss">
.form {
  padding: $spacing-xl;
  background-color: var(--color-background-soft);
  border-radius: $radius-md;
  box-shadow: $shadow-xs;
  margin: $spacing-md 0;

  &--block {
    margin: $spacing-md auto;
    max-width: 600px;
  }

  &__fields-inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: $gap-medium;
  }
}
</style>

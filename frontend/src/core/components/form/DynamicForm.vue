<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Form } from 'vee-validate'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'
import ErrorMessage from '@/core/components/ui/ErrorMessage.vue'
import type { Field } from '@/core/types/field.ts'
import FormFields from '@/core/components/form/FormFields.vue'

defineProps<{
  fields: Field[]
  validationSchema?: never
  initialValues?: Record<string, never>
  submitText: string
  disabled?: boolean
  errorMessage?: string
  variant?: 'inline'
}>()

const emit = defineEmits<{
  (e: 'submit', value: Record<string, string>): void
}>()

const submitForm = (values) => {
  emit('submit', values)
}
</script>

<template>
  <div :class="['form', { 'form--block': variant !== 'inline' }]">
    <Form @submit="submitForm" :validation-schema="validationSchema" :initialValues="initialValues">
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
@import '@/core/assets/styles/theme.scss';

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

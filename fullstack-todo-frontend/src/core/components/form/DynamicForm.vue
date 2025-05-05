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
}>()

const emit = defineEmits<{
  (e: 'submit', value: Record<string, string>): void
}>()

const submitForm = (values) => {
  emit('submit', values)
}
</script>

<template>
  <div class="form">
    <Form @submit="submitForm" :validation-schema="validationSchema" :initialValues="initialValues">
      <TypographyComponent as="h2" align="center" font-weight="bold" spacing="large"
        >{{ submitText }}
      </TypographyComponent>

      <FormFields :fields="fields" />

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
  max-width: 600px;
  margin: 0 auto;
  padding: $spacing-xl;
  background-color: var(--color-background-soft);
  border-radius: $radius-md;
  box-shadow: $shadow-xs;
}
</style>

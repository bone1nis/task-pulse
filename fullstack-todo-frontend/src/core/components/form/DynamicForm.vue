<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Form } from 'vee-validate'
import InputField from '@/core/components/form/InputField.vue'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'
import ErrorMessage from '@/core/components/ui/ErrorMessage.vue'

defineProps<{
  fields: { name: string; type: string; label: string; placeholder: string }[]
  validationSchema: never
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
    <Form @submit="submitForm" :validation-schema="validationSchema">
      <TypographyComponent as="h2" align="center" font-weight="bold" spacing="large"
        >{{ submitText }}
      </TypographyComponent>

      <InputField
        v-for="field in fields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :disabled="disabled"
      />

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
  padding: 30px;
  background-color: $color-background-soft;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

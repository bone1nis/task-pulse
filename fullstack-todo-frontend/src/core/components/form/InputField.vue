<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'

defineProps<{
  name: string
  label: string
  type?: string
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="form__group">
    <TypographyComponent :for="name" variant="subheading" spacing="small">
      {{ label }}
    </TypographyComponent>
    <Field
      :name="name"
      :id="name"
      :type="type || 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      class="form__input"
      as="input"
    />
    <ErrorMessage :name="name" class="form__error" />
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.form {
  &__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }

  &__input {
    padding: 12px;
    font-size: $font-size-medium;
    border: 1px solid $color-border;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
    margin-bottom: 5px;

    &:focus {
      border-color: $color-green-light;
    }
  }

  &__error {
    color: $color-error;
    margin-top: 5px;
  }
}
</style>

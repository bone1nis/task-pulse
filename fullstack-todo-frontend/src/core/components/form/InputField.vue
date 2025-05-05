<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import type { InputField } from '@/core/types/field.ts'

defineProps<InputField>()
</script>

<template>
  <div class="form__group">
    <TypographyComponent :for="name" variant="subheading" spacing="small">
      {{ label }}
    </TypographyComponent>
    <Field :name="name" v-slot="{ field }">
      <input
        :type="type || 'text'"
        :id="name"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="field"
        class="form__input"
      />
    </Field>
    <ErrorMessage :name="name" class="form__error" />
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.form {
  &__group {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-lg;
  }

  &__input {
    padding: $spacing-md;
    font-size: $font-size-medium;
    border: $border-thin solid var(--color-background-mute);
    border-radius: $radius-md;
    outline: none;
    transition: border-color 0.3s;
    margin-bottom: $spacing-xxs;

    &:focus {
      border-color: $color-green-light;
    }
  }

  &__error {
    color: $color-error;
    margin-top: $spacing-xxs;
  }
}
</style>

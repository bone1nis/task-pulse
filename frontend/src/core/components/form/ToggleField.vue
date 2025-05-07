<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import type { ToggleField } from '@/core/types/field.ts'

defineProps<ToggleField>()
</script>

<template>
  <div class="form__group">
    <TypographyComponent :for="name" variant="subheading" spacing="small">
      {{ label }}
    </TypographyComponent>
    <Field :name="name" v-slot="{ field }">
      <input
        type="checkbox"
        :id="name"
        :disabled="disabled"
        v-bind="field"
        v-model="field.value"
        class="form__checkbox"
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
    align-items: center;
    gap: $gap-large;
    margin-bottom: $spacing-lg;
  }

  &__checkbox {
    appearance: none;
    width: 20px;
    height: 20px;
    border: $border-thin solid var(--color-background-mute);
    border-radius: $radius-sm;
    background-color: var(--color-background);
    position: relative;
    cursor: pointer;
    transition:
      border-color 0.3s,
      background-color 0.3s;

    &:checked {
      background-color: $color-green-light;
      border-color: $color-green-light;

      &::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid $color-white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

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

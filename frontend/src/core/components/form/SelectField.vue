<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import type { SelectField } from '~/core/types/field'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

defineProps<SelectField>()
</script>

<template>
  <div class="form__group">
    <TypographyComponent :for="name" variant="subheading" spacing="small">
      {{ label }}
    </TypographyComponent>
    <Field v-slot="{ field }" :name="name">
      <Multiselect
        v-bind="field"
        :mode="multiselect ? 'tags' : 'single'"
        :value="field.value"
        :name="name"
        :searchable="true"
        :create-option="false"
        :close-on-select="!multiselect"
        :clear-on-select="true"
        :allow-empty="false"
        no-results-text="Ничего не найдено"
        :options="options"
      />
    </Field>
    <ErrorMessage :name="name" class="form__error" />
  </div>
</template>

<style scoped lang="scss">
.form {
  &__group {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-lg;
  }

  &__error {
    color: $color-error;
    margin-top: $spacing-xxs;
  }
}

.option {
  &__desc {
    cursor: pointer;
    background-color: var(--color-background-mute);
    padding: $spacing-md;
    border-radius: $border-medium;
    box-shadow: $shadow-sm;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(0.95);
    }
  }
}
</style>

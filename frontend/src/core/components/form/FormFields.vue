<script setup lang="ts">
import InputField from './InputField.vue'
import SelectField from './SelectField.vue'
import ToggleField from '@/core/components/form/ToggleField.vue'
import type { Field } from '@/core/types/field.ts'

defineProps<{
  fields: Field[]
}>()

const getFieldComponent = (field: Field) => {
  switch (field.as) {
    case 'select':
      return SelectField
    case 'toggle':
      return ToggleField
    default:
      return InputField
  }
}

const fieldProps = (field: Field) => {
  const base = {
    name: field.name,
    label: field.label,
    disabled: field.disabled,
  }

  switch (field.as) {
    case 'select':
      return {
        ...base,
        options: field.options,
        multiselect: field.multiselect,
      }
    case 'toggle':
      return {
        ...base,
      }
    default:
      return {
        ...base,
        type: field.type,
        placeholder: field.placeholder,
      }
  }
}
</script>

<template>
  <component
    v-for="field in fields"
    :key="field.name"
    :is="getFieldComponent(field)"
    v-bind="fieldProps(field)"
  />
</template>

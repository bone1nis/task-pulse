<script setup lang="ts">
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import { defineProps } from 'vue'

defineProps<{
  variant?: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'caption'
  align?: 'left' | 'center' | 'right'
  fontWeight?: 'light' | 'regular' | 'bold' | 'bolder'
  spacing?: 'none' | 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <TypographyComponent
    :variant="variant || 'paragraph'"
    color="error"
    :align="align || 'center'"
    :spacing="spacing || 'medium'"
  >
    <slot />
  </TypographyComponent>
</template>

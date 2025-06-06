<script setup lang="ts">
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

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  as?: string
  variant?: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'caption'
  color?: 'green' | 'error' | 'gray' | 'blue' | 'yellow'
  align?: 'left' | 'center' | 'right'
  fontWeight?: 'light' | 'regular' | 'bold' | 'bolder'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  forLabel?: string
}>()
</script>

<template>
  <component
    :is="as || 'p'"
    :for="as === 'label' ? forLabel : undefined"
    :class="[
      'typography',
      variant ? `typography--${variant}` : '',
      align ? `typography--align-${align}` : '',
      color ? `typography--color-${color}` : '',
      fontWeight ? `typography--font-${fontWeight}` : '',
      spacing ? `typography--spacing-${spacing}` : '',
    ]"
  >
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.typography {
  &--heading {
    font-size: $font-size-xxlarge;
    font-weight: $font-weight-bold;
  }

  &--subheading {
    font-size: $font-size-large;
    font-weight: $font-weight-regular;
  }

  &--paragraph {
    font-size: $font-size-medium;
    font-weight: $font-weight-regular;
  }

  &--quote {
    font-size: $font-size-large;
    font-style: italic;
    font-weight: $font-weight-regular;
    margin-left: $spacing-lg;
  }

  &--caption {
    font-size: $font-size-base;
    font-weight: $font-weight-light;
  }

  &--align-left {
    text-align: left;
  }

  &--align-center {
    text-align: center;
  }

  &--align-right {
    text-align: right;
  }

  &--color-green {
    color: $color-green;
  }

  &--color-error {
    color: $color-error;
  }

  &--color-gray {
    color: $color-gray;
  }

  &--color-blue {
    color: $color-blue;
  }

  &--color-yellow {
    color: $color-yellow;
  }

  &--font-light {
    font-weight: $font-weight-light;
  }

  &--font-regular {
    font-weight: $font-weight-regular;
  }

  &--font-bold {
    font-weight: $font-weight-bold;
  }

  &--font-bolder {
    font-weight: $font-weight-bolder;
  }

  &--spacing-none {
    margin-bottom: $spacing-none;
  }

  &--spacing-small {
    margin-bottom: $spacing-xs;
  }

  &--spacing-medium {
    margin-bottom: $spacing-md;
  }

  &--spacing-large {
    margin-bottom: $spacing-lg;
  }
}
</style>

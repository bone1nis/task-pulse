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
      color ? `typography--${color}` : '',
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
    margin-left: 20px;
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

  &--green {
    color: $color-green;
  }

  &--error {
    color: $color-error;
  }

  &--gray {
    color: $color-gray;
  }

  &--blue {
    color: $color-blue;
  }

  &--yellow {
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
    margin-bottom: 0;
  }

  &--spacing-small {
    margin-bottom: 8px;
  }

  &--spacing-medium {
    margin-bottom: 16px;
  }

  &--spacing-large {
    margin-bottom: 24px;
  }
}
</style>

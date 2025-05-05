<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  as?: string
  fluid?: boolean
  align?: 'left' | 'center' | 'right'
  padding?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <component
    :is="as || 'div'"
    :class="[
      'container',
      fluid ? 'container--fluid' : 'container--fixed',
      padding ? `container--padding-${padding}` : '',
      align ? `container--align-${align}` : '',
    ]"
  >
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.container {
  margin: 0 auto;

  &--fluid {
    width: 100%;
    max-width: none;
  }

  &--fixed {
    width: 100%;
    max-width: $container-max-width;
  }

  &--padding-small {
    padding: $spacing-sm;
  }

  &--padding-medium {
    padding: $spacing-lg;
  }

  &--padding-large {
    padding: $spacing-2xl;
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
}
</style>

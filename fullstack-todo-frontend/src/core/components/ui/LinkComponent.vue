<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'unstyled'
  fontWeight?: 'light' | 'regular' | 'bold' | 'bolder'
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'error' | 'gray' | 'blue' | 'yellow'
  underline?: boolean
}>()
</script>

<template>
  <component
    :is="external ? 'a' : RouterLink"
    :href="external ? to : undefined"
    :to="!external ? to : undefined"
    class="link"
    :class="[
      variant ? `link--${variant}` : 'link--primary',
      fontWeight ? `link--weight-${fontWeight}` : '',
      size ? `link--size-${size}` : '',
      underline ? 'link--underline' : '',

      color ? `link--color-${color}` : '',
    ]"
    v-bind="$attrs"
    :target="external ? '_blank' : undefined"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.link {
  transition: color 0.3s ease;

  &--primary {
    color: var(--color-text);
    font-weight: $font-weight-regular;

    &:hover {
      color: $color-green;
    }
  }

  &--secondary {
    color: var(--color-text);
    font-weight: $font-weight-regular;

    &:hover {
      color: var(--color-text-secondary);
    }
  }

  &--unstyled {
    color: inherit;
    text-decoration: none;
    font-weight: inherit;

    &:hover {
      color: inherit;
    }
  }

  &--underline {
    text-decoration: underline;
  }

  &--weight-light {
    font-weight: $font-weight-light;
  }

  &--weight-regular {
    font-weight: $font-weight-regular;
  }

  &--weight-bold {
    font-weight: $font-weight-bold;
  }

  &--weight-bolder {
    font-weight: $font-weight-bolder;
  }

  &--size-small {
    font-size: $font-size-base;
  }

  &--size-medium {
    font-size: $font-size-medium;
  }

  &--size-large {
    font-size: $font-size-large;
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
}
</style>

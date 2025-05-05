<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'icon'
  size?: 'none' | 'small' | 'medium' | 'large'
  color?: 'green' | 'error' | 'gray' | 'yellow' | 'blue'
  disabled?: boolean
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'btn',
      variant ? `btn--${variant}` : 'btn--primary',
      size ? `btn--${size}` : 'btn--medium',
      color ? `btn--color-${color}` : 'btn--green',
      { 'btn--block': block, 'btn--disabled': disabled },
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.btn {
  padding: $spacing-sm;
  font-size: $font-size-large;
  background-color: $color-green;
  color: $color-white;
  border-radius: $radius-sm;
  transition: all 0.3s;
  font-weight: $font-weight-bold;

  &:hover {
    background-color: $color-green-dark;
  }

  &--block {
    display: block;
    margin: 0 auto;
  }

  &--primary {
    background-color: $color-green;
    color: $color-white;

    &:hover {
      background-color: $color-green-dark;
    }
  }

  &--secondary {
    background-color: $color-gray;
    color: $color-white;

    &:hover {
      background-color: $color-gray-dark;
    }

    &:disabled {
      background-color: $color-gray-light;
    }
  }

  &--error {
    background-color: $color-error;
    color: $color-white;

    &:hover {
      background-color: $color-error-dark;
    }
  }

  &--outline {
    background-color: transparent;
    border: $border-medium solid $color-green;
    color: $color-green;

    &:hover {
      background-color: $color-green-light;
    }
  }

  &--text {
    background-color: transparent;
    color: $color-green;
    border: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &--icon {
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: inherit;
    line-height: 0;
    color: inherit;

    &:hover {
      background-color: transparent;
      color: $color-green;
    }
  }

  &--none {
    padding: $spacing-none;
  }

  &--small {
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-small;
  }

  &--medium {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-medium;
  }

  &--large {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-large;
  }

  &--color-green {
    background-color: $color-green;
    color: $color-white;
  }

  &--color-error {
    background-color: $color-error;
    color: $color-white;
  }

  &--color-gray {
    background-color: $color-gray;
    color: $color-white;
  }

  &--color-yellow {
    background-color: $color-yellow;
    color: $color-white;
  }

  &--color-blue {
    background-color: $color-blue;
    color: $color-white;
  }

  &--disabled {
    background-color: $color-gray-light;
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>

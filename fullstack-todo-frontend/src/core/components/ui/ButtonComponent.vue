<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'error' | 'gray'
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
      color ? `btn--${color}` : 'btn--green',
      { 'btn--block': block, 'btn--disabled': disabled }
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
  padding: 14px;
  font-size: $font-size-large;
  background-color: $color-green;
  color: $color-white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-weight: bold;
  cursor: pointer;

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
  }

  &--outline {
    background-color: transparent;
    border: 2px solid $color-green;
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

  &--small {
    padding: 8px 16px;
    font-size: $font-size-small;
  }

  &--medium {
    padding: 12px 24px;
    font-size: $font-size-medium;
  }

  &--large {
    padding: 16px 32px;
    font-size: $font-size-large;
  }

  &--green {
    background-color: $color-green;
    color: $color-white;
  }

  &--error {
    background-color: $color-error;
    color: $color-white;
  }

  &--gray {
    background-color: $color-gray;
    color: $color-white;
  }

  &--disabled {
    background-color: $color-gray-light;
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>

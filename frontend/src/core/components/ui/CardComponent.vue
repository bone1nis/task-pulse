<script setup lang="ts">
import type { Action } from '~/core/types/action'

defineProps<{
  title: string
  content?: string
  actions?: Action[]
}>()
</script>

<template>
  <div class="card">
    <div class="card__header">
      <TypographyComponent variant="heading">{{ title }}</TypographyComponent>
      <slot name="header" />
    </div>
    <div class="card__body">
      <TypographyComponent v-if="content" variant="paragraph">{{ content }}</TypographyComponent>
      <slot name="content" />
    </div>

    <div class="card__footer">
      <div v-if="actions" class="card__actions">
        <ButtonComponent
          v-for="(action, index) in actions"
          :key="index"
          :variant="action.variant"
          @click="action.handler"
        >
          {{ action.label }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--color-background-mute);
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  overflow: hidden;
  margin-bottom: $spacing-md;

  &__header {
    background-color: var(--color-background-soft);
    padding: $spacing-md;
    border-bottom: $border-thin solid $color-white;
  }

  &__body {
    padding: $spacing-md;
  }

  &__footer {
    background-color: var(--color-background-soft);
    padding: $spacing-sm;
    border-top: $border-thin solid $color-white;
    text-align: right;
  }

  &__actions {
    display: flex;
    justify-content: space-between;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: $gap-medium;
    }
  }
}
</style>

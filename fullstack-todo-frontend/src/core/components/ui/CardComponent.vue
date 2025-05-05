<script setup lang="ts">
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'
import type { Action } from '@/core/types/action.ts'

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
      <TypographyComponent variant="paragraph" v-if="content">{{ content }}</TypographyComponent>
      <slot name="content" />
    </div>

    <div class="card__footer">
      <div class="card__actions" v-if="actions">
        <ButtonComponent
          v-for="(action, index) in actions"
          :key="index"
          @click="action.handler"
          :variant="action.variant"
        >
          {{ action.label }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.card {
  background-color: var(--color-background-mute);
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  overflow: hidden;
  margin-bottom: $spacing-md;
}

.card__header {
  background-color: var(--color-background-soft);
  padding: $spacing-md;
  border-bottom: $border-thin solid $color-white;
}

.card__body {
  padding: $spacing-md;
}

.card__footer {
  background-color: var(--color-background-soft);
  padding: $spacing-sm;
  border-top: $border-thin solid $color-white;
  text-align: right;
}

.card__actions {
  display: flex;
  justify-content: space-between;
}
</style>

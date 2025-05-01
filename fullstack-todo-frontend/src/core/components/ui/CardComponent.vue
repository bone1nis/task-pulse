<script setup lang="ts">
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue';
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue';

defineProps<{
  title: string;
  content: string;
  actions: { label: string; handler: () => void }[];
}>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <TypographyComponent variant="heading">{{ title }}</TypographyComponent>
    </div>
    <div class="card-body">
      <TypographyComponent variant="paragraph">{{ content }}</TypographyComponent>
      <slot />
    </div>

    <div class="card-footer">
      <div class="card-actions">
        <ButtonComponent v-for="(action, index) in actions" :key="index" @click="action.handler">
          {{ action.label }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.card {
  background-color: $color-background-mute;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 15px;
}

.card-header {
  background-color: $color-background-soft;
  padding: 15px;
  border-bottom: 1px solid $color-white;
}

.card-body {
  padding: 15px;
}

.card-footer {
  background-color: $color-background-mute;
  padding: 10px;
  border-top: 1px solid $color-white;
  text-align: right;
}

.card-actions {
  display: flex;
  gap: 10px;
}
</style>

<script setup lang="ts">
import LinkComponent from '@/core/components/ui/LinkComponent.vue'
import { faUser } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <header class="appbar">
    <nav class="appbar__nav">
      <LinkComponent to="/" font-weight="bold" size="large">Главная страница</LinkComponent>
      <LinkComponent to="/tasks" font-weight="bold" size="large">Список задач</LinkComponent>
      <LinkComponent to="/auth" font-weight="bold" size="large">Вход</LinkComponent>
    </nav>

    <LinkComponent to="/profile" size="large">
      <FontAwesomeIcon :icon="faUser"/>
    </LinkComponent>
  </header>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.appbar {
  background-color: $color-background;
  color: $color-text;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__nav {
    display: flex;
    gap: $gap-medium;
  }
}
</style>

<script setup lang="ts">
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import LinkComponent from '@/core/components/ui/LinkComponent.vue'
</script>

<template>
  <div class="home-page">
    <div class="home-page__content">
      <TypographyComponent variant="heading" color="green"> Task Pulse </TypographyComponent>

      <TypographyComponent variant="subheading">
        Организуйте свои задачи легко и быстро
      </TypographyComponent>

      <TypographyComponent> Лучшее приложение для заметок с авторизацией </TypographyComponent>

      <ul class="home-page__features">
        <li>Удобное создание и редактирование задач</li>
        <li>Авторизация и роли пользователей</li>
        <li>Панель администратора</li>
      </ul>

      <div class="home-page__actions">
        <LinkComponent to="/auth/register" variant="primary" font-weight="bold"> Регистрация </LinkComponent>
        <LinkComponent to="/auth/login" variant="secondary" font-weight="bold" color="green" > Вход </LinkComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    gap: $gap-medium;
    text-align: center;
    padding: 0 $spacing-lg;
    max-width: 600px;
  }

  &__features {
    font-size: $font-size-base;
    line-height: 1.6;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: $spacing-xs;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: $gap-medium;
    flex-wrap: wrap;
    margin-top: $gap-small;
  }
}
</style>

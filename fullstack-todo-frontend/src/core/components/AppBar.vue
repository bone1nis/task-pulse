<script setup lang="ts">
import LinkComponent from '@/core/components/ui/LinkComponent.vue'
import { faRightFromBracket, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'
import { useThemeStore } from '@/modules/theme/stores/theme.ts'
import { useAuthStore } from '@/modules/auth/stores/auth.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const themeStore = useThemeStore()

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <header class="appbar">
    <nav class="appbar__nav">
      <LinkComponent to="/" font-weight="bold" size="large">Главная страница</LinkComponent>
      <LinkComponent to="/tasks" font-weight="bold" size="large">Список задач</LinkComponent>
      <LinkComponent to="/tasks/create" font-weight="bold" size="large"
        >Создать задачу</LinkComponent
      >
    </nav>

    <div class="appbar__actions">
      <ButtonComponent @click="toggleTheme" variant="icon" size="none">
        <FontAwesomeIcon :icon="faSun" size="xl" />
      </ButtonComponent>

      <LinkComponent to="/profile" size="large">
        <FontAwesomeIcon :icon="faUser" size="xl" />
      </LinkComponent>

      <ButtonComponent v-if="authStore.isAuthenticated" @click="logout" variant="icon" size="none">
        <FontAwesomeIcon :icon="faRightFromBracket" size="xl" />
      </ButtonComponent>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.appbar {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: $spacing-sm $spacing-lg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: $border-thin solid $color-green;

  &__nav {
    display: flex;
    gap: $gap-medium;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $gap-medium;
  }
}
</style>

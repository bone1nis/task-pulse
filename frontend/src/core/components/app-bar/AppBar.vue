<script setup lang="ts">
import { useThemeStore } from '~/modules/theme/stores/theme'
import { useAuthStore } from '~/modules/auth/stores/auth'

const isMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const burgerRef = ref<{ buttonEl: HTMLButtonElement | null } | null>(null)

const router = useRouter()

const authStore = useAuthStore()
const themeStore = useThemeStore()

router.afterEach(() => {
  isMenuOpen.value = false
})

const logout = () => {
  authStore.logout()
  router.push({ name: 'auth-login' })
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const burger = burgerRef.value?.buttonEl
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target as Node) &&
    burger &&
    !burger.contains(event.target as Node)
  ) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="appbar">
    <ButtonComponent ref="burgerRef" class="burger" variant="icon" size="none" @click="toggleMenu">
      <FontAwesomeIcon :icon="['fas', 'bars']" size="xl" />
    </ButtonComponent>

    <div ref="menuRef" class="appbar__menu" :class="{ 'appbar__menu--open': isMenuOpen }">
      <nav class="appbar__nav">
        <LinkComponent to="/" font-weight="bold" size="large"> Главная страница</LinkComponent>
        <LinkComponent to="/tasks" font-weight="bold" size="large"> Список задач</LinkComponent>
        <LinkComponent to="/tasks/create" font-weight="bold" size="large">
          Создать задачу
        </LinkComponent>
      </nav>

      <div class="appbar__actions">
        <ButtonComponent variant="icon" size="none" @click="toggleTheme">
          <FontAwesomeIcon :icon="['fas', 'sun']" size="xl" />
        </ButtonComponent>

        <LinkComponent to="/profile" size="large">
          <FontAwesomeIcon :icon="['fas', 'user']" size="xl" />
        </LinkComponent>

        <ButtonComponent v-if="authStore.isAuthenticated" variant="icon" size="none" @click="logout">
          <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" size="xl" />
        </ButtonComponent>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.appbar {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: $spacing-sm $spacing-lg;
  border-bottom: $border-thin solid $color-green;
  position: relative;

  .burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: $breakpoint-md) {
      display: flex;
    }
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;

    @media (max-width: $breakpoint-md) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-background);
      padding: $spacing-md;
      display: none;

      &--open {
        display: flex;
        flex-direction: column;
        gap: $gap-medium;
      }
    }
  }

  &__nav {
    display: flex;
    gap: $gap-medium;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
  }

  &__actions {
    display: flex;
    gap: $gap-medium;
  }
}
</style>

<template>
  <router-view />
  <div class="auth-switch">
    <RouterLink v-if="isLogin" to="/auth/register" class="auth-switch__link">
      Ещё не зарегистрированы?
    </RouterLink>
    <RouterLink v-else to="/auth/login" class="auth-switch__link">
      Уже есть аккаунт? Войти
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {computed} from "vue";

const route = useRoute();

const isLogin = computed(() => route.path === "/auth/login");
</script>

<style scoped lang="scss">
.auth-switch {
  margin-top: 20px;
  text-align: center;
}

.auth-switch__link {
  color: var(--color-link-light);
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: var(--color-link-hover);
  }
}
</style>

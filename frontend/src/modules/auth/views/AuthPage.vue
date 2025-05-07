<script setup lang="ts">
import { useRoute } from 'vue-router';
import {computed} from "vue";
import LinkComponent from '@/core/components/ui/LinkComponent.vue'

const route = useRoute();

const isLogin = computed(() => route.path === "/auth/login");
</script>

<template>
  <router-view />
  <div class="auth-switch">
    <LinkComponent v-if="isLogin" to="/auth/register" variant="secondary">
      Ещё не зарегистрированы?
    </LinkComponent>
    <LinkComponent v-else to="/auth/login" variant="secondary">
      Уже есть аккаунт? Войти
    </LinkComponent>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.auth-switch {
  margin-top: $spacing-lg;
  text-align: center;
}
</style>

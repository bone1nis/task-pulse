<script setup lang="ts">
import { useAuthStore } from '~/modules/auth/stores/auth';

const authStore = useAuthStore()
</script>

<template>
  <UserInfo :user="authStore.user!" />
</template>
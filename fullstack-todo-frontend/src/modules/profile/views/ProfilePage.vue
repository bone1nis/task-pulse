<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.ts'
import UserInfo from '@/modules/profile/components/UserInfo.vue'

const authStore = useAuthStore()
</script>

<template>
  <UserInfo :user="authStore.user" />
</template>

<style scoped lang="scss"></style>

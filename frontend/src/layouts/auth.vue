<script setup lang="ts">
import AuthLayout from '~/modules/auth/layouts/AuthLayout.vue'
</script>

<template>
  <NuxtLayout name="default">
    <AuthLayout>
      <NuxtPage />
    </AuthLayout>
  </NuxtLayout>
</template>
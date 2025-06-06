<script setup lang="ts">
import ProfilePage from '~/modules/profile/pages/ProfilePage.vue';

definePageMeta({
  requiresAuth: true
})
</script>

<template>
    <ProfilePage />
</template>
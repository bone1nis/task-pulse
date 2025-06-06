<script setup lang="ts">
import CreateTaskPage from '~/modules/tasks/pages/CreateTaskPage.vue';

definePageMeta({
  requiresAuth: true
})
</script>

<template>
    <CreateTaskPage />
</template>
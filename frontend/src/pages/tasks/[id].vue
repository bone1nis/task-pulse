<script setup lang="ts">
import TaskPage from '~/modules/tasks/pages/TaskPage.vue';

definePageMeta({
  requiresAuth: true
})
</script>

<template>
    <TaskPage />
</template>
<script setup lang="ts">
import TasksPage from '~/modules/tasks/pages/TasksPage.vue';

definePageMeta({
  requiresAuth: true
})
</script>

<template>
    <TasksPage />
</template>
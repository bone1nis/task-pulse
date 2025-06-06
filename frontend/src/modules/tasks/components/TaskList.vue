<script setup lang="ts">
import type { Task } from '../types/task';

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="tasks-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: $gap-medium;
}
</style>

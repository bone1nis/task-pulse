<script setup lang="ts">
import TaskItem from '@/modules/tasks/components/TaskItem.vue'
import type { Task } from '@/modules/tasks/types/task.ts'

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
@import '@/core/assets/styles/theme.scss';

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: $gap-medium;
}
</style>

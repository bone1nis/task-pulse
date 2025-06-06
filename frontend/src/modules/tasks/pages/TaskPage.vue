<script setup lang="ts">
import { useTasksStore } from '../stores/tasks'

const route = useRoute()
const taskId = Number(route.params.id)

const isEditing = computed(() => route.query.editing === 'true')

const tasksStore = useTasksStore()
const task = computed(() => tasksStore.tasks.find((t) => t.id === taskId))


onMounted(async () => {
  if (!task.value) {
    await tasksStore.fetchTaskById(taskId)
  }
})
</script>

<template>
  <ContentWrapper>
    <ErrorMessage v-if="!task">Задача не найдена</ErrorMessage>
    <template v-else>
      <EditTaskForm v-if="isEditing" :task="task" />
      <TaskItem v-else :task="task" :is-single-view="true" />
    </template>
  </ContentWrapper>
</template>

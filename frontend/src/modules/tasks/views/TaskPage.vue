<script setup lang="ts">
import { useRoute } from 'vue-router'
import EditTaskForm from '@/modules/tasks/components/EditTaskForm.vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { computed, onMounted } from 'vue'
import ContentWrapper from '@/core/components/ContentWrapper.vue'
import ErrorMessage from '@/core/components/ui/ErrorMessage.vue'
import TaskItem from '@/modules/tasks/components/TaskItem.vue'

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
      <TaskItem v-else :task="task" :isSingleView="true" />
    </template>
  </ContentWrapper>
</template>

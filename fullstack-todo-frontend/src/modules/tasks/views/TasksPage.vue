<script setup lang="ts">
import TaskList from '@/modules/tasks/components/TaskList.vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { onMounted } from 'vue'
import PaginationComponent from '@/core/components/ui/PaginationComponent.vue'
import SpinnerComponent from '@/core/components/ui/SpinnerComponent.vue'
import ContentWrapper from '@/core/components/ContentWrapper.vue'
import ErrorMessage from '@/core/components/ui/ErrorMessage.vue'
import TaskFilter from '@/modules/tasks/components/TaskFilter.vue'

const tasksStore = useTasksStore()

onMounted(() => tasksStore.fetchUserTasks())

const onPageChange = (page: number) => {
  tasksStore.fetchUserTasks(page)
}

const hasTasks = tasksStore.tasks.length > 0
const isLoading = tasksStore.isLoading
</script>

<template>
  <SpinnerComponent v-if="isLoading" />

  <ContentWrapper v-else fluid>
    <ErrorMessage v-if="!hasTasks"> Задачи не найдены. Пожалуйста, добавьте задачу.</ErrorMessage>
    <TaskFilter v-if="hasTasks" />
    <TaskList v-if="hasTasks" :tasks="tasksStore.tasks" />

    <PaginationComponent
      v-if="hasTasks"
      :currentPage="tasksStore.currentPage"
      :lastPage="tasksStore.lastPage"
      @change="onPageChange"
    />
  </ContentWrapper>
</template>

<script setup lang="ts">
import TaskList from '@/modules/tasks/components/TaskList.vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { onMounted } from 'vue'
import PaginationComponent from '@/core/components/ui/PaginationComponent.vue'
import SpinnerComponent from '@/core/components/ui/SpinnerComponent.vue'
import ContentWrapper from '@/core/components/ContentWrapper.vue'

const tasksStore = useTasksStore()

onMounted(() => tasksStore.fetchUserTasks())

const onPageChange = (page: number) => {
  tasksStore.fetchUserTasks(page)
}
</script>

<template>
  <SpinnerComponent v-if="tasksStore.isLoading" />

  <ContentWrapper v-else fluid>
    <TaskList :tasks="tasksStore.tasks" />
    <PaginationComponent
      :currentPage="tasksStore.currentPage"
      :lastPage="tasksStore.lastPage"
      @change="onPageChange"
    />
  </ContentWrapper>
</template>

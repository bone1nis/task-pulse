<script setup lang="ts">
import { useTasksStore } from '../stores/tasks'

const tasksStore = useTasksStore()

onMounted(() => tasksStore.fetchUserTasks())

const onPageChange = (page: number) => {
  tasksStore.fetchUserTasks(page)
}

const resetFilters = () => {
  tasksStore.fetchUserTasks()
}

const hasTasks = computed(() => tasksStore.tasks.length > 0)
const isLoading = computed(() => tasksStore.isLoading)
</script>

<template>
  <SpinnerComponent v-if="isLoading" />

  <ContentWrapper v-else fluid>
    <div class="filters">
      <TaskFilter />
      <ButtonComponent @click="resetFilters">Сбросить фильтры</ButtonComponent>
    </div>

    <ErrorMessage v-if="!hasTasks"> Задачи не найдены. Пожалуйста, добавьте задачу.</ErrorMessage>
    <TaskList v-if="hasTasks" :tasks="tasksStore.tasks" />

    <PaginationComponent
      v-if="hasTasks"
      :current-page="tasksStore.currentPage"
      :last-page="tasksStore.lastPage"
      @change="onPageChange"
    />
  </ContentWrapper>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  gap: $gap-medium;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $gap-small;
  }
}
</style>

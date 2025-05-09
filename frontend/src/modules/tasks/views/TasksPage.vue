<script setup lang="ts">
import TaskList from '@/modules/tasks/components/TaskList.vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { computed, onMounted } from 'vue'
import PaginationComponent from '@/core/components/ui/PaginationComponent.vue'
import SpinnerComponent from '@/core/components/ui/SpinnerComponent.vue'
import ContentWrapper from '@/core/components/ContentWrapper.vue'
import ErrorMessage from '@/core/components/ui/ErrorMessage.vue'
import TaskFilter from '@/modules/tasks/components/TaskFilter.vue'
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'

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
      <ButtonComponent @click="resetFilters" spacing="medium">Сбросить фильтры</ButtonComponent>
    </div>

    <ErrorMessage v-if="!hasTasks"> Задачи не найдены. Пожалуйста, добавьте задачу.</ErrorMessage>
    <TaskList v-if="hasTasks" :tasks="tasksStore.tasks" />

    <PaginationComponent
      v-if="hasTasks"
      :currentPage="tasksStore.currentPage"
      :lastPage="tasksStore.lastPage"
      @change="onPageChange"
    />
  </ContentWrapper>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme';

.filters {
  display: flex;
  gap: $gap-medium;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $gap-small;
  }
}
</style>

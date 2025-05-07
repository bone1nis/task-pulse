<script setup lang="ts">
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { computed } from 'vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { useCategoriesAndTags } from '@/core/composables/useCategoriesAndTags.ts'
import { useLoadingState } from '@/core/composables/useLoadingState.ts'
import type { TaskFilters } from '@/modules/tasks/types/task.ts'

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const { categoryOptions, tagOptions } = useCategoriesAndTags()
const tasksStore = useTasksStore()

const fields = computed(() => [
  { name: 'title', label: 'Заголовок', placeholder: 'Введите заголовок' },
  { name: 'description', label: 'Описание', placeholder: 'Введите описание' },
  { name: 'dueDateFrom', label: 'Срок выполнения: от', type: 'date' },
  { name: 'dueDateTo', label: 'Срок выполнения: до', type: 'date' },
  { name: 'isCompleted', label: 'Задача завершена', as: 'toggle' },
  {
    name: 'category',
    label: 'Выберите категорию',
    as: 'select',
    options: categoryOptions.value,
  },
  {
    name: 'tags',
    label: 'Выберите теги',
    as: 'select',
    multiselect: true,
    options: tagOptions.value,
  },
  {
    name: 'sort',
    label: 'Поле для сортировки:',
    as: 'select',
    options: [
      {
        value: 'title',
        label: 'По заголовку',
      },
      {
        value: 'description',
        label: 'По описанию',
      },
    ],
  },
  {
    name: 'sortDirection',
    label: 'Направление сортировки:',
    as: 'select',
    options: [
      {
        value: 'asc',
        label: 'По возрастанию',
      },
      {
        value: 'desc',
        label: 'По убыванию',
      },
    ],
  },
])

const submitForm = async (values: TaskFilters) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.fetchUserTasks(1, 10, values)
  } catch (error) {
    setErrorMessage(error.message)
  } finally {
    setLoadingState(false)
  }
}
</script>

<template>
  <DynamicForm
    variant="inline"
    :fields="fields"
    :disabled="isLoading"
    :errorMessage="errorMessage"
    submitText="Фильтрация"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import type { Field } from '~/core/types/field'
import { useTasksStore } from '../stores/tasks'

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const { categoryOptions, tagOptions } = useCategoriesAndTags()
const tasksStore = useTasksStore()

const fields = computed<Field[]>(() => [
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

const submitForm = async (values: Record<string, string>) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.fetchUserTasks(1, 10, values)
  } catch (error: unknown) {
    if (error instanceof Error) {
      setErrorMessage(error.message)
    } else {
      setErrorMessage(String(error))
    }
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
    :error-message="errorMessage"
    submit-text="Фильтрация"
    @submit="submitForm"
  />
</template>
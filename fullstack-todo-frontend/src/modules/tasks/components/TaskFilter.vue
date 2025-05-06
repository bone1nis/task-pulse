<script setup lang="ts">
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { computed } from 'vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { useCategoriesAndTags } from '@/core/composables/useCategoriesAndTags.ts'
import { useLoadingState } from '@/core/composables/useLoadingState.ts'

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
])

const submitForm = async (values) => {
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

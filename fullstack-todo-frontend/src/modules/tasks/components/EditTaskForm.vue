<script setup lang="ts">
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { computed } from 'vue'
import type { Task } from '@/modules/tasks/types/task.ts'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { useDateFormatter } from '@/core/composables/useDateFormatter.ts'
import { useCategoriesAndTags } from '@/core/composables/useCategoriesAndTags.ts'
import { useLoadingState } from '@/core/composables/useLoadingState.ts'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

const props = defineProps<{
  task: Task
}>()

const { task } = props

const router = useRouter()

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()
const { formatDate } = useDateFormatter()

const { categoryOptions, tagOptions } = useCategoriesAndTags()
const tasksStore = useTasksStore()

const formattedDate = task.dueDate ? formatDate(task.dueDate) : ''

const fields = computed(() => [
  { name: 'title', label: 'Заголовок', placeholder: 'Введите заголовок' },
  { name: 'description', label: 'Описание', placeholder: 'Введите описание' },
  { name: 'isCompleted', label: 'Задача завершена', as: 'toggle' },
  { name: 'dueDate', label: 'Срок окончания задачи', type: 'date' },
  {
    name: 'category',
    label: 'Выберите категорию',
    as: 'select',
    multiselect: false,
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

const validationSchema = yup.object({
  title: yup.string().required('Поле обязательно'),
  category: yup.number().required('Поле обязательно'),
})

const initialValues = {
  title: task.title,
  description: task.description,
  isCompleted: task.isCompleted,
  dueDate: formattedDate,
  category: task.category.id,
  tags: task.tags.map((item) => item.id),
}

const submitForm = async (values) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.updateTask(task.id, values)

    await router.push({ name: 'tasks' })
  } catch (error) {
    setErrorMessage(error.message)
  } finally {
    setLoadingState(false)
  }
}
</script>

<template>
  <DynamicForm
    :fields="fields"
    :validationSchema="validationSchema"
    :initialValues="initialValues"
    :disabled="isLoading"
    :errorMessage="errorMessage"
    submitText="Обновить задачу"
    @submit="submitForm"
  />
</template>

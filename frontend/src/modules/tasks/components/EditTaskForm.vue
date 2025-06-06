<script setup lang="ts">
import * as yup from 'yup'
import type { Field } from '~/core/types/field'
import { useTasksStore } from '../stores/tasks'
import type { Task, TaskUpdate } from '../types/task'

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

const fields = computed<Field[]>(() => [
  { name: 'title', label: 'Заголовок', placeholder: 'Введите заголовок' },
  { name: 'description', label: 'Описание', placeholder: 'Введите описание' },
  { name: 'isCompleted', label: 'Задача завершена', as: 'toggle' },
  { name: 'dueDate', label: 'Срок окончания задачи', type: 'date' },
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

const submitForm = async (values: Record<string, string>) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.updateTask(task.id, values as unknown as TaskUpdate)

    await router.push({ name: 'tasks' })
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
    :fields="fields"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    :disabled="isLoading"
    :error-message="errorMessage"
    submit-text="Обновить задачу"
    @submit="submitForm"
  />
</template>

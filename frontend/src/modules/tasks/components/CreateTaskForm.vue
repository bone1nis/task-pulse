<script setup lang="ts">
import * as yup from 'yup'
import type { Field } from '~/core/types/field'
import { useTasksStore } from '../stores/tasks'
import type { TaskCreate } from '../types/task'

const router = useRouter()

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const { categoryOptions, tagOptions } = useCategoriesAndTags()
const tasksStore = useTasksStore()

const fields = computed<Field[]>(() => [
  { name: 'title', label: 'Заголовок', placeholder: 'Введите заголовок' },
  { name: 'description', label: 'Описание', placeholder: 'Введите описание' },
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

const submitForm = async (values: Record<string, string>) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.createTask(values as unknown as TaskCreate)

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
    :disabled="isLoading" 
    :error-message="errorMessage"
    submit-text="Создать задачу" 
    @submit="submitForm" />
</template>

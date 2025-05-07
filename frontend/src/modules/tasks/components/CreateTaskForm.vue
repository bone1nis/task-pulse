<script setup lang="ts">
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { computed } from 'vue'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { useCategoriesAndTags } from '@/core/composables/useCategoriesAndTags.ts'
import { useLoadingState } from '@/core/composables/useLoadingState.ts'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

const router = useRouter()

const { isLoading, errorMessage, setLoadingState, setErrorMessage } = useLoadingState()

const { categoryOptions, tagOptions } = useCategoriesAndTags()
const tasksStore = useTasksStore()

const fields = computed(() => [
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

const submitForm = async (values) => {
  setLoadingState(true)
  setErrorMessage('')

  try {
    await tasksStore.createTask(values)

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
    :disabled="isLoading"
    :errorMessage="errorMessage"
    submitText="Создать задачу"
    @submit="submitForm"
  />
</template>

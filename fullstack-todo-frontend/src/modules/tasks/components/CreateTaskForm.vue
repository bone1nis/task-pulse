<script setup lang="ts">
import DynamicForm from '@/core/components/form/DynamicForm.vue'
import { ref } from 'vue'

const isLoading = ref(false)
const errorMessage = ref('')

const fields = [
  { name: 'title', label: 'Заголовок', placeholder: 'Введите заголовок' },
  { name: 'description', label: 'Описание', placeholder: 'Введите описание' },
  { name: 'isCompleted', label: 'Задача завершена', type: 'checkbox' },
  { name: 'dueDate', label: 'Срок окончания задачи', type: 'date' },
  {
    name: 'category',
    label: 'Выберите категорию',
    as: 'select',
    options: [
      { value: 1, label: 'фыв' },
      { value: 2, label: 'фыфывв' },
    ],
  },
  {
    name: 'tags',
    label: 'Выберите теги',
    as: 'select',
    options: [
      { value: 1, label: 'фыв' },
      { value: 2, label: 'фыфывв' },
    ],
  },
]

const submitForm = () => {
  console.log('submit')
}
</script>

<template>
  <DynamicForm
    :fields="fields"
    submitText="Задача"
    @submit="submitForm"
    :disabled="isLoading"
    :errorMessage="errorMessage"
  />
</template>

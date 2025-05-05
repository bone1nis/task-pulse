import axios from '@/core/api/axios.ts'
import type { Task, TaskCreate, TaskUpdate } from '@/modules/tasks/types/task.ts'

export const fetchTasks = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get('/tasks', {
    params: { page, per_page: limit },
  })
  return response.data
}

export const getTaskById = async (taskId: number): Promise<Task> => {
  const response = await axios.get(`/tasks/${taskId}`)
  return response.data
}

export const deleteTask = async (taskId: number) => {
  await axios.delete(`/tasks/${taskId}`)
}

export const updateTask = async (taskId: number, updatedData: TaskUpdate) => {
  const data = {
    title: updatedData.title,
    description: updatedData.description || null,
    is_completed: updatedData.isCompleted,
    due_date: updatedData.dueDate,
    tags: updatedData.tags,
    category_id: updatedData.category,
  }
  const response = await axios.put(`/tasks/${taskId}`, data)
  return response.data
}

export const createTask = async (createdData: TaskCreate) => {
  const data = {
    title: createdData.title,
    description: createdData.description,
    due_date: createdData.dueDate,
    tags: createdData.tags,
    category_id: createdData.category,
  }

  const response = await axios.post(`/tasks`, data)
  return response.data
}

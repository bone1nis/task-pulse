import { defineStore } from 'pinia'
import type { Task, TaskCreate, TaskFilters, TaskUpdate } from '@/modules/tasks/types/task.ts'
import {
  fetchTasks,
  updateTask,
  deleteTask,
  getTaskById,
  createTask
} from '@/modules/tasks/api/task.ts'
import { normalizeTask } from '@/modules/tasks/utils/normalizeTask'

interface TasksState {
  tasks: Task[]
  total: number
  currentPage: number
  lastPage: number
  isLoading: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    currentPage: 1,
    lastPage: 1,
    isLoading: false
  }),

  actions: {
    async fetchUserTasks(page = 1, limit = 10, filters: TaskFilters = {}) {
      this.isLoading = true

      const normalizedFilters = {
        title: filters.title,
        description: filters.description,
        due_date_from: filters.dueDateFrom,
        due_date_to: filters.dueDateTo,
        tags: filters.tags,
        category_id: filters.category,
        sort: filters.sortDirection === 'desc' ? `-${filters.sort}` : filters.sort
      }

      if (filters.isCompleted !== undefined) {
        normalizedFilters.is_completed = filters.isCompleted ? 1 : 0
      }

      try {
        const params = {
          page,
          per_page: limit,
          ...normalizedFilters
        }

        const response = await fetchTasks(params)
        this.tasks = response.data.map(normalizeTask)

        this.total = response.meta.total
        this.currentPage = response.meta.current_page
        this.lastPage = response.meta.last_page
      } catch (error) {
        console.error('Ошибка загрузки задач:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTaskById(taskId: number): Promise<Task | null> {
      const existingTask = this.tasks.find((task) => task.id === taskId)
      if (existingTask) return existingTask

      this.isLoading = true
      try {
        const response = await getTaskById(taskId)
        const normalizedTask = normalizeTask(response.data)

        this.tasks.push(normalizedTask)
        return normalizedTask
      } catch (error) {
        console.error('Ошибка при получении задачи:', error)
        return null
      } finally {
        this.isLoading = false
      }
    },

    async deleteTask(taskId: number) {
      this.isLoading = true

      try {
        await deleteTask(taskId)
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTask(taskId: number, updatedData: TaskUpdate) {
      this.isLoading = true

      try {
        const response = await updateTask(taskId, updatedData)
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
          const normalized = normalizeTask(response.data)

          this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...normalized
          }
        }
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error)
      } finally {
        this.isLoading = false
      }
    },
    async createTask(newTaskData: TaskCreate) {
      this.isLoading = true

      try {
        const response = await createTask(newTaskData)
        const normalizedTask = normalizeTask(response.data)

        this.tasks.push(normalizedTask)
      } catch (error) {
        console.error('Ошибка при создании задачи:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
})

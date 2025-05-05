import { defineStore } from 'pinia'
import type { Task, TaskUpdate } from '@/modules/tasks/types/task.ts'
import { fetchTasks, updateTask, deleteTask, getTaskById } from '@/modules/tasks/api/task.ts'
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
    isLoading: false,
  }),

  actions: {
    async fetchUserTasks(page = 1, limit = 10) {
      this.isLoading = true

      try {
        const response = await fetchTasks(page, limit)
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
        const task = await getTaskById(taskId)
        const normalizedTask = normalizeTask(task)

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
            ...normalized,
          }
        }
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})

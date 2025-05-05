import axios from '@/core/api/axios.ts'

export const fetchCategories = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get('/categories', {
    params: { page, per_page: limit },
  })
  return response.data
}

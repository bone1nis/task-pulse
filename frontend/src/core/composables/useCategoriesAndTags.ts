import { useTagsStore } from '~/modules/tags/stores/tags'
import { useCategoriesStore } from '~/modules/categories/stores/categories'
import type { Option } from '../types/field'

export function useCategoriesAndTags() {
  const tagsStore = useTagsStore()
  const categoriesStore = useCategoriesStore()

  onMounted(() => {
    if (!tagsStore.tags.length) {
      tagsStore.fetchTags()
    }
    if (!categoriesStore.categories.length) {
      categoriesStore.fetchCategories()
    }
  })

  const categoryOptions = computed<Option[]>(() =>
    categoriesStore.categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  )

  const tagOptions = computed<Option[]>(() =>
    tagsStore.tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })),
  )

  return { categoryOptions, tagOptions }
}

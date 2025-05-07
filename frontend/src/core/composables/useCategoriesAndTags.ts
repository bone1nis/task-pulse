import { useTagsStore } from '@/modules/tags/stores/tags.ts'
import { useCategoriesStore } from '@/modules/categories/stores/categories.ts'
import { computed, onMounted } from 'vue'

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

  const categoryOptions = computed(() =>
    categoriesStore.categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  )

  const tagOptions = computed(() =>
    tagsStore.tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })),
  )

  return { categoryOptions, tagOptions }
}

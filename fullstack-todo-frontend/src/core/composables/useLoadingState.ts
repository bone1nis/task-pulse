import { ref } from 'vue'

export function useLoadingState() {
  const isLoading = ref(false)
  const errorMessage = ref('')

  const setLoadingState = (loading: boolean) => {
    isLoading.value = loading
  }

  const setErrorMessage = (message: string) => {
    errorMessage.value = message
  }

  return { isLoading, errorMessage, setLoadingState, setErrorMessage }
}

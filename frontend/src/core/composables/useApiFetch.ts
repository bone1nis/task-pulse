import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const useApiFetch = async <T>(
  url: string,
  options?: NitroFetchOptions<NitroFetchRequest, "options" | "head" | "get" | "patch" | "post" | "put" | "delete" | "connect" | "trace">
): Promise<T> => {
  const config = useRuntimeConfig()

  const response = await $fetch<T>(config.public.apiBaseUrl + url, {
    credentials: 'include',
    ...options,
  })

  if (!response) {
    throw new Error('Пустой ответ от сервера')
  }

  return response
}
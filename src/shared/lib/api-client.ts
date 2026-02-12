import type { ApiError } from '@/shared/types/api'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const apiError: ApiError = {
      message: 'Произошла ошибка при выполнении запроса',
      status: error.response?.status,
      code: error.code,
    }

    // Извлекаем сообщение об ошибке из ответа
    if (error.response?.data) {
      const errorData = error.response.data
      if (typeof errorData === 'object') {
        apiError.message =
          errorData.message || errorData.error || apiError.message
      } else if (typeof errorData === 'string') {
        apiError.message = errorData
      }
    } else if (error.message) {
      apiError.message = error.message
    }

    return Promise.reject(apiError)
  },
)

// Типизированные методы для удобства использования
export const api = {
  get: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> => apiClient.get<T>(url, config).then((res) => res),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> =>
    apiClient.post<T>(url, data, config).then((res) => res),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> =>
    apiClient.put<T>(url, data, config).then((res) => res),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> =>
    apiClient.patch<T>(url, data, config).then((res) => res),

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> =>
    apiClient.delete<T>(url, config).then((res) => res),
}

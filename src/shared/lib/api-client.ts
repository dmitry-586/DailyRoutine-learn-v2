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

let refreshPromise: Promise<unknown> | null = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string; error?: string }>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      if (!refreshPromise) {
        refreshPromise = apiClient
          .post('/auth/refresh')
          .catch((refreshError) => {
            refreshPromise = null
            throw refreshError
          })
      }

      try {
        await refreshPromise
        return apiClient(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        return Promise.reject(error)
      }
    }

    const apiError: ApiError = {
      message: 'Произошла ошибка при выполнении запроса',
      status: error.response?.status,
      code: error.code,
    }

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

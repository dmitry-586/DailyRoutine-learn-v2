export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface ApiResponse<T = unknown> {
  data: T
}

export interface AxiosErrorResponse {
  message: string
  status?: number
  data?: unknown
}

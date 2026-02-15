export function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) return false

  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status
    if (status >= 400 && status < 500) return false
    if (status >= 500) return true
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const msg = String((error as { message: unknown }).message)
    if (msg.includes('Network Error') || msg.includes('timeout')) return true
  }

  return false
}

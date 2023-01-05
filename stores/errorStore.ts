import { defineStore } from 'pinia'

interface ErrorStateType {
  error: string | null
}

export const useErrorStore = defineStore('error', {
  state: () =>
    ({
      error: null,
    } as ErrorStateType),
  actions: {
    setError(message: string) {
      this.error = message
      this.clearError()
    },
    clearError(timeout: number = 5000) {
      setTimeout(() => {
        this.error = null
      }, timeout)
    },
  },
})

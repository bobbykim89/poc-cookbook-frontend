import { defineStore } from 'pinia'

interface UserState {
  user: null | Response
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: null,
    } as UserState),
  actions: {
    async getAllUsers() {
      const data = await $fetch('/api/user', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      })

      this.user = data
    },
  },
})

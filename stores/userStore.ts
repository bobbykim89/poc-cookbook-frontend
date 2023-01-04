import { defineStore } from 'pinia'

export interface UserRawDataFormat extends Response {
  userId: string
  userName: string
  description?: string
  imageId?: string
  thumbUrl?: string
  imageUrl?: string
  createdAt: number
  updatedAt?: number
}

interface AuthToken {
  access_token: string
}

interface UserState {
  user: UserRawDataFormat[]
  token: string | null
  currentUser: any
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: [],
      token: null,
      currentUser: null,
    } as UserState),
  getters: {
    getUserById() {
      return (id: string) =>
        this.user.find((item) => {
          return item.userId === id
        })
    },
  },
  actions: {
    async getAllUsers() {
      const data: UserRawDataFormat[] = await $fetch('/api/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      this.user = data
    },
    async loginWithCredential(payload: { email: string; password: string }) {
      const data: AuthToken = await $fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { email: payload.email, password: payload.password },
      })
      console.log(data)
      if (data) {
        this.token = data.access_token
        const cookie = useCookie('access_token', { maxAge: 86400 })
        cookie.value = data.access_token
      }
    },
    getCurrentUser() {},
  },
})

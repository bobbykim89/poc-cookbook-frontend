import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

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
  isAuthenticated: boolean
  currentUser: any
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: [],
      isAuthenticated: false,
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
      if (data) {
        Cookies.set('access_token', data.access_token, { expires: 1 })
        await this.getCurrentUser()
        this.isAuthenticated = true
      }
    },
    async getCurrentUser() {
      const cookie = Cookies.get('access_token')
      try {
        if (cookie) {
          const data = await $fetch('/api/user/current-user/', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookie,
            },
          })
          if (data === null) {
            this.currentUser = null
            this.isAuthenticated = false
            return
          }
          this.currentUser = data
          this.isAuthenticated = true
          return
        }
        this.currentUser = null
      } catch (err) {
        console.log('authentication error')
      }
    },
  },
})

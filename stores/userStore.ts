import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useRuntimeConfig } from '#app'
import { useErrorStore } from './errorStore'

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

interface CurrentAuthFormat {
  isAuthenticated: boolean
  currentUser: UserRawDataFormat | null
}

interface UserState {
  user: UserRawDataFormat[]
  isAuthenticated: boolean
  currentUser: UserRawDataFormat | null
}

const errorStore = useErrorStore()

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
    getCurrentAuthInfo(state): CurrentAuthFormat {
      return {
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
      }
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
      try {
        const data: AuthToken = await $fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { email: payload.email, password: payload.password },
        })
        if (!data) {
          errorStore.setError("Couldn't fetch user data from server.")
          this.currentUser = null
          this.isAuthenticated = false
          return
        }
        Cookies.set('access_token', data.access_token, { expires: 1 })
        await this.getCurrentUser()
        this.isAuthenticated = true
      } catch (err) {
        errorStore.setError('Invalid user credentials')
        this.currentUser = null
        this.isAuthenticated = false
        Cookies.remove('access_token')
      }
    },
    async postNewUser(payload: {
      email: string
      userName: string
      password: string
    }) {
      try {
        const res: AuthToken = await $fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            email: payload.email,
            userName: payload.userName,
            password: payload.password,
          },
        })
        if (!res) {
          errorStore.setError(
            'Failed to get response from server, please try again'
          )
          return
        }
        Cookies.set('access_token', res.access_token, { expires: 1 })
        await this.getCurrentUser()
        this.isAuthenticated = true
      } catch (err) {
        errorStore.setError('Failed to create new user please try later..')
        this.currentUser = null
        this.isAuthenticated = false
        Cookies.remove('access_token')
      }
    },
    async getCurrentUser() {
      const cookie = Cookies.get('access_token')
      try {
        if (!cookie) {
          return
        }
        const data: UserRawDataFormat = await $fetch(
          '/api/user/current-user/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookie,
            },
          }
        )
        if (data === null) {
          this.currentUser = null
          this.isAuthenticated = false
          return
        }
        this.currentUser = data
        this.isAuthenticated = true
      } catch (err) {
        errorStore.setError('Authentication error: Cannot bring user info')
        this.currentUser = null
        this.isAuthenticated = false
        Cookies.remove('access_token')
      }
    },
    async patchUserProfileById(payload: FormData) {
      try {
        const access_token = Cookies.get('access_token')
        const config = useRuntimeConfig()
        if (!this.isAuthenticated || !access_token || !this.currentUser) {
          errorStore.setError('No user authentication found, please login')
          return
        }

        await $fetch(`${config.public.API}/user/${this.currentUser.userId}`, {
          method: 'PATCH',
          headers: {
            Authorization: access_token,
          },
          body: payload,
        })

        await this.getCurrentUser()
        await this.getAllUsers()
      } catch (err) {
        errorStore.setError(
          'Error occurred while updating profile, please try again.'
        )
      }
    },
    signOutUser() {
      Cookies.remove('access_token')
      this.currentUser = null
      this.isAuthenticated = false
    },
  },
})

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

interface UserState {
  user: UserRawDataFormat[]
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: [],
    } as UserState),
  actions: {
    async getAllUsers() {
      const data: UserRawDataFormat[] = await $fetch('/api/user', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      })

      this.user = data
    },
    getUserById(id: string) {
      const data = this.user.filter((item) => {
        return item.userId === id
      })
      return data[0]
    },
  },
})

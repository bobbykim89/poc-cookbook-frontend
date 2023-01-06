import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useUserStore } from './userStore'
import { useErrorStore } from './errorStore'

export interface CategoryRawDataFormat extends Response {
  categoryId: string
  title: string
  createdAt: number
}

interface CategoryStoreStateFormat {
  category: CategoryRawDataFormat[]
}

const userStore = useUserStore()
const errorStore = useErrorStore()

export const useCategoryStore = defineStore('category', {
  state: () =>
    ({
      category: [],
    } as CategoryStoreStateFormat),
  getters: {
    getCategoryById() {
      return (id: string) => {
        const data = this.category.find((item) => {
          return item.categoryId === id
        })
        return data
      }
    },
  },
  actions: {
    async getAllCategory() {
      const data: CategoryRawDataFormat[] = await $fetch('/api/category', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const sortedList = data.sort((a, b) => a.title.localeCompare(b.title))
      this.category = sortedList
    },
    async postNewCategory(payload: string) {
      const access_token = Cookies.get('access_token')
      const { isAuthenticated, currentUser } = userStore.getCurrentAuthInfo

      if (!isAuthenticated || !access_token || !currentUser) {
        errorStore.setError('No user authentication found, please login')
        return
      }
      await $fetch('/api/category/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token,
        },
        body: {
          title: payload,
        },
      })
      await this.getAllCategory()
    },
  },
})

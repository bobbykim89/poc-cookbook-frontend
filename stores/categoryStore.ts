import { defineStore } from 'pinia'

export interface CategoryRawDataFormat extends Response {
  categoryId: string
  title: string
  createdAt: number
}

interface CategoryStoreStateFormat {
  category: CategoryRawDataFormat[]
}

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
      this.category = data
    },
  },
})

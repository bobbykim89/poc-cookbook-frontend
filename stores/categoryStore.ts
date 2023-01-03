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
  actions: {
    async getAllCategory() {
      const data: CategoryRawDataFormat[] = await $fetch('/api/category', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      this.category = data
    },
    getCategoryById(id: string) {
      const data = this.category.filter((item) => {
        return item.categoryId === id
      })
      return data[0]
    },
  },
})

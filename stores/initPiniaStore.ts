import { defineStore } from 'pinia'
import { useCategoryStore } from './categoryStore'
import { useUserStore } from './userStore'
import { usePostStore } from './postStore'

const categoryStore = useCategoryStore()
const userStore = useUserStore()
const postStore = usePostStore()

export const useInitPiniaStore = defineStore('init', {
  state: () => ({
    loading: true,
  }),
  actions: {
    async initStores() {
      await categoryStore.getAllCategory()
      await userStore.getAllUsers()
      await postStore.getAllPosts()
      await userStore.getCurrentUser()
      this.loading = false
    },
  },
})

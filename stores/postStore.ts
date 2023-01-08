import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useRuntimeConfig } from '#app'
import { useCategoryStore } from './categoryStore'
import { useUserStore } from './userStore'
import { useErrorStore } from './errorStore'

export interface PostRawDataFormat extends Response {
  postId: string
  author: string
  category: string
  imageId: string
  thumbUrl: string
  imageUrl: string
  title: string
  ingredients: string
  recipe: string
  createdAt: number
  updatedAt?: number
}
export interface PostFormattedDataFormat {
  postId: string
  author: UserFormattedDataFormat
  category: CategoryFormattedDataFormat
  thumbUrl: string
  imageUrl: string
  title: string
  ingredients: string
  recipe: string
  date: number
}
export interface UserFormattedDataFormat {
  userId: string
  userName: string
  thumbUrl?: string
}
interface CategoryFormattedDataFormat {
  categoryId: string
  title: string
}

interface PostStoreStateType {
  posts: PostFormattedDataFormat[]
}

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const errorStore = useErrorStore()

export const usePostStore = defineStore('post', {
  state: () =>
    ({
      posts: [],
    } as PostStoreStateType),
  getters: {
    getPostByCategoryId() {
      return (categoryId: string) =>
        this.posts.filter((item) => {
          return item.category.categoryId === categoryId
        })
    },
    getPostByUserId() {
      return (userId: string) =>
        this.posts.filter((item) => {
          return item.author.userId === userId
        })
    },
    getPostById() {
      return (postId: string) =>
        this.posts.find((item) => {
          return item.postId === postId
        })
    },
  },
  actions: {
    async getAllPosts() {
      const data: PostRawDataFormat[] = await $fetch('/api/post', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const formattedDataList = data.map((item) => {
        const userInfo = userStore.getUserById(item.author)
        const category = categoryStore.getCategoryById(item.category)
        if (userInfo && category) {
          const formattedPostData: PostFormattedDataFormat = {
            postId: item.postId,
            author: {
              userId: userInfo.userId,
              userName: userInfo.userName,
              thumbUrl: userInfo.thumbUrl,
            },
            category: {
              categoryId: category.categoryId,
              title: category.title,
            },
            thumbUrl: item.thumbUrl,
            imageUrl: item.imageUrl,
            title: item.title,
            ingredients: item.ingredients,
            recipe: item.recipe,
            date: item.updatedAt ? item.updatedAt : item.createdAt,
          }
          return formattedPostData
        }
      }) as PostFormattedDataFormat[]

      const sortedList = formattedDataList
        .sort((a, b) => a.date - b.date)
        .reverse()
      this.posts = sortedList
    },
    async postNewPost(payload: FormData) {
      try {
        const access_token = Cookies.get('access_token')
        const config = useRuntimeConfig()
        const { isAuthenticated } = userStore.getCurrentAuthInfo

        if (!isAuthenticated || !access_token) {
          errorStore.setError('No user authentication found, please login')
          return
        }

        const data: PostRawDataFormat = await $fetch(
          `${config.public.API}/post`,
          {
            method: 'POST',
            headers: {
              Authorization: access_token,
            },
            body: payload,
          }
        )
        await this.getAllPosts()
        return data.postId
      } catch (err) {
        errorStore.setError(
          'Error occurred while creating a new post, please try again.'
        )
        return
      }
    },
    async patchPost(payload: { postId: string; formData: FormData }) {
      try {
        const access_token = Cookies.get('access_token')
        const config = useRuntimeConfig()
        const { isAuthenticated, currentUser } = userStore.getCurrentAuthInfo

        if (!isAuthenticated || !access_token) {
          errorStore.setError('No user authentication found, please login')
          return
        }
        if (
          currentUser?.userId !==
          this.getPostById(payload.postId)?.author.userId
        ) {
          errorStore.setError('Current user is not the author of this post')
          return
        }
        await $fetch(`${config.public.API}/post/${payload.postId}`, {
          method: 'PATCH',
          headers: {
            Authorization: access_token,
          },
          body: payload.formData,
        })
        await this.getAllPosts()
      } catch (err) {
        errorStore.setError(
          'Error occurred while creating a new post, please try again.'
        )
        return
      }
    },
    async deletePost(payload: string) {
      try {
        const access_token = Cookies.get('access_token')
        const { isAuthenticated, currentUser } = userStore.getCurrentAuthInfo

        if (!isAuthenticated || !access_token) {
          errorStore.setError('No user authentication found, please login')
          return
        }
        if (currentUser?.userId !== this.getPostById(payload)?.author.userId) {
          errorStore.setError('Current user is not the author of this post')
          return
        }
        await $fetch(`/api/post/${payload}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token,
          },
        })
        await this.getAllPosts()
      } catch (err) {
        errorStore.setError(
          'Error occurred while deleting post, please try again.'
        )
      }
    },
  },
})

import { defineStore } from 'pinia'
import { useCategoryStore } from './categoryStore'
import { useUserStore, UserRawDataFormat } from './userStore'

interface PostRawDataFormat extends Response {
  postId: string
  author: string
  category: string
  imageId: string
  thumbUrl: string
  title: string
  ingredients: string
  recipe: string
  createdAt: number
  updatedAt?: number
}
interface PostFormattedDataFormat {
  postId: string
  author: UserFormattedDataFormat
  category: CategoryFormattedDataFormat
  thumbUrl: string
  title: string
  ingredients: string
  recipe: string
  date: number
}
interface UserFormattedDataFormat {
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

export const usePostStore = defineStore('post', {
  state: () =>
    ({
      posts: [],
    } as PostStoreStateType),
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
            title: item.title,
            ingredients: item.ingredients,
            recipe: item.recipe,
            date: item.updatedAt ? item.updatedAt : item.createdAt,
          }
          return formattedPostData
        }
      }) as PostFormattedDataFormat[]

      this.posts = formattedDataList
    },
  },
})

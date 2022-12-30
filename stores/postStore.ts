import { defineStore } from 'pinia'

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
interface UserRawDataFormat extends Response {
  userId: string
  userName: string
  description?: string
  imageId?: string
  thumbUrl?: string
  imageUrl?: string
  createdAt: number
  updatedAt?: number
}
interface UserFormattedDataFormat {
  userId: string
  userName: string
  thumbUrl?: string
}
interface CategoryRawDataFormat extends Response {
  categoryId: string
  title: string
  createdAt: number
}
interface CategoryFormattedDataFormat {
  categoryId: string
  title: string
}

interface PostStoreStateType {
  posts: any
}

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
      const formattedDataList = data.map(async (item) => {
        const userInfo: UserRawDataFormat = await $fetch(
          `/api/user/${item.author}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const category: CategoryRawDataFormat = await $fetch(
          `/api/category/${item.category}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
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
      })
      this.posts = data
    },
  },
})

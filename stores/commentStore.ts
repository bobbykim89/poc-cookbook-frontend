import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { UserFormattedDataFormat } from './postStore'
import { useUserStore } from './userStore'
import { useErrorStore } from './errorStore'

interface CommentRawDataFormat {
  text: string
  commentId: string
  post: string
  author: string
  createdAt: number
  updatedAt?: number
}

export interface CommentFormattedDataFormat {
  text: string
  commentId: string
  post: string
  author: UserFormattedDataFormat
  date: number
}

interface CommentStoreState {
  comment: CommentFormattedDataFormat[]
}

const userStore = useUserStore()
const errorStore = useErrorStore()

export const useCommentStore = defineStore('comment', {
  state: () =>
    ({
      comment: [],
    } as CommentStoreState),
  actions: {
    async getCommentByPostId(postId: string) {
      try {
        const data: CommentRawDataFormat[] = await $fetch(
          `/api/comment/${postId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        if (!data) {
          errorStore.setError("Couldn't find comments regarding the post")
          return
        }
        const formattedDataList = data.map((item) => {
          const userInfo = userStore.getUserById(item.author)
          if (userInfo) {
            const formattedData: CommentFormattedDataFormat = {
              text: item.text,
              commentId: item.commentId,
              post: item.post,
              author: {
                userId: userInfo.userId,
                userName: userInfo.userName,
                thumbUrl: userInfo.thumbUrl,
              },
              date: item.updatedAt ? item.updatedAt : item.createdAt,
            }
            return formattedData
          }
        }) as CommentFormattedDataFormat[]
        const sortedDataList = formattedDataList.sort((a, b) => a.date - b.date)
        this.comment = sortedDataList
      } catch (err) {
        errorStore.setError(
          'An error occurred while fetching data from server.'
        )
        return
      }
    },
    async postNewComment(payload: { text: string; post: string }) {
      try {
        const access_token = Cookies.get('access_token')
        const { isAuthenticated, currentUser } = userStore.getCurrentAuthInfo
        // check if user is authenticated
        if (!isAuthenticated) {
          errorStore.setError('Current user info was not found, please login')
          return
        }
        if (!access_token) {
          errorStore.setError('Current user info was not found, please login')
          return
        }

        await $fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token,
          },
          body: { text: payload.text, post: payload.post },
        })
        await this.getCommentByPostId(payload.post)
      } catch (err) {
        errorStore.setError('Could not post a new comment, please try again..')
      }
    },
    async deleteCommentById(commentId: string) {
      try {
        const cookie = Cookies.get('access_token')
        const { isAuthenticated, currentUser } = userStore.getCurrentAuthInfo

        // check for authentication status
        if (!isAuthenticated || !currentUser) {
          errorStore.setError(
            'No user credentials provided, please login first!'
          )
          return
        }
        const currentComment = this.comment?.find(
          (item) => item.commentId === commentId
        )

        // check if comment of interest exists
        if (!currentComment) {
          errorStore.setError(
            'Could not find comment with given id, please try again'
          )
          return
        }

        // check if currentUser is author of the comment of interest
        if (currentComment.author.userId !== currentUser.userId) {
          errorStore.setError('Not authorized!')
          return
        }

        // check if access token exists
        if (cookie) {
          const data = await $fetch(`/api/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookie,
            },
          })
          if (data === null) {
            errorStore.setError(
              'Could not delete the comment with given credentials, please try again'
            )
            return
          }
          this.comment = this.comment!.filter((item) => {
            return item.commentId !== commentId
          })
          return
        }
      } catch (err) {
        errorStore.setError(
          'Could not delete following comment, please try again'
        )
      }
    },
  },
})

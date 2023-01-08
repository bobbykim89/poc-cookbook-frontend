<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HeroBeta from '@bobbykim/hero-beta'
import TabsAlpha from '@bobbykim/tabs-alpha'
import BtnAlpha from '@bobbykim/btn-alpha'
import ModalAlpha from '@bobbykim/modal-alpha'
import {
  usePostStore,
  useCommentStore,
  useUserStore,
  useErrorStore,
  useInitPiniaStore,
} from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'
import Loader from '@/components/Loader.vue'
import CommentItem from '@/components/comment/CommentItem.vue'
import CommentForm from '@/components/comment/CommentForm.vue'

const route = useRoute()
const router = useRouter()
const initPiniaStore = useInitPiniaStore()
const postStore = usePostStore()
const userStore = useUserStore()
const commentStore = useCommentStore()
const errorStore = useErrorStore()
const { loading } = storeToRefs(initPiniaStore)
const { isAuthenticated, currentUser } = storeToRefs(userStore)
const { comment } = storeToRefs(commentStore)
await commentStore.getCommentByPostId(route.params.postId as string)
const modalState = ref<boolean>(false)

const pageContent = computed(() =>
  postStore.getPostById(route.params.postId as string)
)

const tabsContent = computed(() => {
  const ingredients = pageContent.value?.ingredients
  const recipe = pageContent.value?.recipe
  return [
    { title: 'Ingredients', content: ingredients },
    { title: 'Recipe', content: recipe },
  ]
})
const copyUrl = (): void => {
  if (process.client) {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
  }
}

const openModal = () => {
  modalState.value = true
}
const closeModal = () => {
  modalState.value = false
}

const handleDeletePostById = async () => {
  if (!isAuthenticated) {
    errorStore.setError('Please sign in')
    return
  }
  closeModal()
  await postStore.deletePost(route.params.postId as string)
  router.push({ path: '/recipe' })
}

const handleCommentSubmit = async (e: { event: Event; text: string }) => {
  if (!isAuthenticated) {
    errorStore.setError('Please sign in')
    return
  }
  await commentStore.postNewComment({
    text: e.text,
    post: route.params.postId as string,
  })
}

const handleDeleteComment = async (e: { event: Event; id: string }) => {
  if (!isAuthenticated) {
    errorStore.setError('Please sign in')
    return
  }
  await commentStore.deleteCommentById(e.id)
}
</script>

<template>
  <div class="container">
    <div v-if="!loading && pageContent">
      <hero-beta
        :title="pageContent.title.toUpperCase()"
        :bg-image="pageContent.imageUrl"
        :show-title-highlight="true"
        title-highlight-color="warning"
        :gradient-opacity="30"
      ></hero-beta>
      <div class="px-xs md:px-lg py-sm md:py-xl">
        <div
          class="inline-block items-center bg-light-1 border border-light-3 drop-shadow-lg rounded-lg p-2xs mb-sm"
        >
          <ul class="flex justify-start items-center gap-xs text-dark-2">
            <li class="hover:opacity-70 transition-all duration-150">
              <NuxtLink to="/recipe">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  class="w-sm h-sm"
                >
                  <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  />
                </svg>
              </NuxtLink>
            </li>
            <!-- copy url -->
            <li
              class="hover:opacity-70 transition-all duration-150 cursor-pointer"
              @click="copyUrl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="w-sm h-sm"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                />
              </svg>
            </li>
            <!-- edit post -->
            <li
              v-if="
                isAuthenticated &&
                pageContent.author.userId === currentUser!.userId
              "
              class="hover:opacity-70 transition-all duration-150 cursor-pointer"
              @click="
                $router.push({ path: `/recipe/${route.params.postId}/edit` })
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="w-sm h-sm"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                />
              </svg>
            </li>
            <!-- delete post -->
            <li
              v-if="
                isAuthenticated &&
                pageContent.author.userId === currentUser!.userId
              "
              class="hover:opacity-70 transition-all duration-150 cursor-pointer"
              @click="openModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                class="w-sm h-sm"
              >
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
              </svg>
            </li>
            <li>
              <btn-alpha
                color="danger"
                button-size="small"
                @btn-click="
                  $router.push({
                    path: `/recipe/category/${pageContent?.category.categoryId}`,
                  })
                "
                ><span class="tracking-wider capitalize">
                  {{ pageContent.category.title }}
                </span>
              </btn-alpha>
            </li>
          </ul>
        </div>
        <div class="mb-sm mr-xs">
          <user-info
            :image="pageContent.author.thumbUrl"
            :username="pageContent.author.userName"
            :date="pageContent.date"
            @info-card="
              $router.push({ path: `/profile/${pageContent?.author.userId}` })
            "
          ></user-info>
        </div>
        <tabs-alpha :content="tabsContent" tab-color="warning"></tabs-alpha>
        <h3 v-if="comment" class="h3-md mt-sm">Comments:</h3>
        <div class="mt-sm" v-if="isAuthenticated">
          <comment-form @comment-submit="handleCommentSubmit"></comment-form>
        </div>
        <div v-if="comment" class="mt-sm">
          <comment-item
            v-for="(item, i) in comment"
            :key="i"
            :comment-id="item.commentId"
            :user="item.author"
            :text="item.text"
            :date="item.date"
            :auth="
              isAuthenticated === true &&
              item.author.userId === currentUser!.userId
            "
            class="mb-xs last:mb-0"
            @delete-click="handleDeleteComment"
          ></comment-item>
        </div>
      </div>
      <modal-alpha header-text="Delete Post" v-model="modalState">
        <div class="border-b border-light-4 pb-xs mb-xs">
          <span>Are you sure you want to delete this post?</span>
        </div>
        <div class="flex justify-end items-center gap-xs">
          <btn-alpha color="warning" @btn-click="handleDeletePostById"
            >Confirm</btn-alpha
          >
          <btn-alpha color="danger" @btn-click="closeModal">Cancel</btn-alpha>
        </div>
      </modal-alpha>
    </div>
    <div v-if="loading && !pageContent">
      <div class="flex justify-center items-center h-[512px]">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

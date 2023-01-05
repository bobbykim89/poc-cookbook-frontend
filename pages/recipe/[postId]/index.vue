<script setup lang="ts">
import HeroBeta from '@bobbykim/hero-beta'
import TabsAlpha from '@bobbykim/tabs-alpha'
import BtnAlpha from '@bobbykim/btn-alpha'
import { usePostStore } from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const postStore = usePostStore()

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
</script>

<template>
  <div class="container">
    <div v-if="pageContent">
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
          <ul class="flex justify-start items-center gap-2xs text-dark-2">
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
          ></user-info>
        </div>
        <tabs-alpha :content="tabsContent" tab-color="warning"></tabs-alpha>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center h-[512px]">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

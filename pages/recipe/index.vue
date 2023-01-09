<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MclInput from '@bobbykim/mcl-input'
import BtnAlpha from '@bobbykim/btn-alpha'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import ModalAlpha from '@bobbykim/modal-alpha'
import {
  useCategoryStore,
  usePostStore,
  useUserStore,
  useErrorStore,
  PostFormattedDataFormat,
  useInitPiniaStore,
} from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'
import Loader from '@/components/Loader.vue'

useHead({
  title: 'Cookbook4All | Recipes',
  meta: [
    { name: 'description', content: 'Recipe page' },
    { property: 'og:title', content: 'Cookbook4All | Recipes' },
  ],
})

const categoryStore = useCategoryStore()
const initPiniaStore = useInitPiniaStore()
const postStore = usePostStore()
const userStore = useUserStore()
const errorStore = useErrorStore()
const { loading } = storeToRefs(initPiniaStore)
const { category } = storeToRefs(categoryStore)
const { posts } = storeToRefs(postStore)
const { isAuthenticated } = storeToRefs(userStore)

const modalState = ref<boolean>(false)
const modalInputRef = ref<string>('')

const pageContent = {
  image:
    'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
}

const headerBgImage = computed(() => {
  return {
    'background-image': `url('${pageContent.image}')`,
  }
})

const searchQuery = ref<string>('')

const loadedPosts = computed(() => {
  if (searchQuery.value === '') {
    return posts.value
  } else {
    const filteredData = posts.value.filter(
      (recipe: PostFormattedDataFormat) => {
        const search = new RegExp(`${searchQuery.value}`, 'gi')
        return (
          recipe.title.match(search) ||
          recipe.ingredients.match(search) ||
          recipe.recipe.match(search)
        )
      }
    )
    return filteredData
  }
})

const toggleModal = () => {
  modalState.value = true
}

const handleModalSubmit = async () => {
  if (modalInputRef.value === '') {
    errorStore.setError('Category name is required.')
    return
  }
  await categoryStore.postNewCategory(modalInputRef.value)
  modalState.value = false
  modalInputRef.value = ''
}
const handleModalClose = () => {
  modalState.value = false
  modalInputRef.value = ''
}
</script>

<template>
  <div>
    <div v-if="!loading">
      <section
        class="relative h-[250px] md:h-[350px] drop-shadow-md mb-sm md:mb-lg flex justify-center items-center"
        :style="headerBgImage"
      >
        <div class="absolute inset-0 bg-dark-1 opacity-40"></div>
        <div class="relative w-full md:max-w-[30vw] px-md">
          <mcl-input
            identifier="search-bar"
            highlight-color="warning"
            :display-border="true"
            :display-label="false"
            spacing="0"
            placeholder="Search here..."
            :is-required="false"
            v-model="searchQuery"
          ></mcl-input>
        </div>
      </section>
      <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
        <div class="md:col-span-3 order-2 md:order-1">
          <div class="grid md:grid-cols-3 gap-sm">
            <div
              v-for="(item, i) in loadedPosts"
              :key="i"
              class="px-xs md:px-0"
            >
              <card-alpha
                :title="item.title"
                :image-source="item.thumbUrl"
                :label-text="item.category.title.toUpperCase()"
                label-color="danger"
                cta-color="warning"
                :cta-as-link="false"
                :cta-link="`/recipe/${item.postId}`"
                cta-text="Read more"
                highlight-color="danger"
                :enlarge-on-hover="true"
                @card-btn-click="$router.push({ path: $event.url })"
                @card-click="$router.push({ path: $event.url })"
              >
                <user-info
                  :username="item.author.userName"
                  :image="item.author.thumbUrl"
                  :image-alt="item.author.userName"
                  :date="item.date"
                  @info-card="
                    $router.push({ path: `/profile/${item.author.userId}` })
                  "
                ></user-info>
                <div
                  v-html="item.recipe.substring(0, 50) + '...'"
                  class="mb-xs"
                ></div>
              </card-alpha>
            </div>
          </div>
        </div>
        <div class="order-1 md:order-2 px-xs md:px-0">
          <div class="mb-sm mx-3xs" v-if="isAuthenticated">
            <btn-alpha
              color="danger"
              :is-block="true"
              :rounded="true"
              @btn-click="$router.push({ path: '/recipe/new' })"
            >
              Add New
            </btn-alpha>
          </div>
          <ClientOnly>
            <accordion-beta
              title="Categories"
              btn-color="warning"
              :open-on-mount="true"
            >
              <ul
                class="flex flex-col justify-center items-center gap-2xs font-semibold"
              >
                <li>
                  <span class="text-danger cursor-default">All</span>
                </li>
                <li v-for="(item, i) in category" :key="i">
                  <NuxtLink :to="`/recipe/category/${item.categoryId}`">
                    <span
                      class="capitalize hover:underline transition-all duration-150"
                      >{{ item.title }}</span
                    >
                  </NuxtLink>
                </li>
                <li v-if="isAuthenticated">
                  <button
                    class="hover:text-danger transition-all duration-150"
                    @click="toggleModal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      class="h-xs w-xs"
                    >
                      <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </accordion-beta>
          </ClientOnly>
        </div>
      </section>
      <modal-alpha
        v-model="modalState"
        header-text="Add a new Category"
        @modal-close="handleModalClose"
      >
        <form @submit.prevent="handleModalSubmit">
          <mcl-input
            identifier="modal-input"
            label-text="Name:"
            type="text"
            :display-border="false"
            bg-color="light-2"
            spacing="sm"
            placeholder="Category name..."
            highlight-color="warning"
            :is-required="true"
            v-model="modalInputRef"
          ></mcl-input>
          <div class="flex justify-end items-center gap-xs">
            <btn-alpha type="submit" color="success" :rounded="true"
              >Submit</btn-alpha
            >
            <btn-alpha
              type="button"
              color="danger"
              :rounded="true"
              @btn-click="handleModalClose"
              >Cancel</btn-alpha
            >
          </div>
        </form>
      </modal-alpha>
    </div>
    <div v-if="loading">
      <div class="flex justify-center items-center h-[256px]">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

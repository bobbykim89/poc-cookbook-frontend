<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MclInput from '@bobbykim/mcl-input'
import MclTextArea from '@bobbykim/mcl-text-area'
import MclInputFile from '@bobbykim/mcl-input-file'
import BtnAlpha from '@bobbykim/btn-alpha'
import Selector, { SelectOptionType } from '@/components/input/Selector.vue'
import {
  usePostStore,
  useInitPiniaStore,
  useUserStore,
  useCategoryStore,
  useErrorStore,
} from '@/stores'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const postStore = usePostStore()
const initPiniaStore = useInitPiniaStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const errorStore = useErrorStore()
const { category } = storeToRefs(categoryStore)
const { isAuthenticated } = storeToRefs(userStore)
const { loading } = storeToRefs(initPiniaStore)

const titleRef = ref<string>('')
const imageRef = ref<File>()
const categoryRef = ref<string>('')
const ingredientsRef = ref<string>('')
const recipeRef = ref<string>('')

const formattedCategory = computed(() => {
  const optionsList: SelectOptionType[] = category.value.map((item) => {
    return {
      text: item.title,
      value: item.categoryId,
    }
  })
  return optionsList
})

const handlePostRequestSubmit = async () => {
  const postForm = new FormData()
  if (!isAuthenticated) {
    errorStore.setError('Not Authorized')
    router.push({ path: '/recipe' })
    return
  }
  if (
    titleRef.value === '' ||
    imageRef.value === undefined ||
    categoryRef.value === '' ||
    ingredientsRef.value === '' ||
    recipeRef.value === ''
  ) {
    errorStore.setError('Please fill all fields')
    return
  }
  postForm.append('title', titleRef.value)
  postForm.append('category', categoryRef.value)
  postForm.append('ingredients', ingredientsRef.value)
  postForm.append('recipe', recipeRef.value)
  postForm.append('image', imageRef.value)

  const res = await postStore.postNewPost(postForm)
  if (res) {
    router.push({ path: `/recipe/${res}` })
  }
}
</script>

<template>
  <div class="container px-xs md:px-lg py-sm md:py-xl">
    <div v-if="!loading && isAuthenticated">
      <section class="px-xs md:px-2xl lg:px-3xl py-sm md:py-xl">
        <div
          class="bg-light-1 border border-light-3 drop-shadow-lg rounded-lg px-xs py-sm md:px-md md:py-lg"
        >
          <div class="flex items-center gap-xs mb-sm text-dark-3">
            <NuxtLink
              to="/recipe"
              class="hover:opacity-70 transition-all duration-150"
            >
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
            <div>
              <h2 class="h2-md tracking-wider mb-xs cursor-default">
                New Recipe
              </h2>
              <div class="h-3xs w-md md:w-lg bg-warning"></div>
            </div>
          </div>
          <form @submit.prevent="handlePostRequestSubmit">
            <mcl-input
              identifier="new-post-title"
              label-text="Title:"
              bg-color="light-3"
              highlight-color="warning"
              :is-required="true"
              v-model="titleRef"
            ></mcl-input>
            <mcl-input-file
              identifier="new-post-image"
              label-text="Image: "
              bg-color="light-3"
              :is-required="true"
              v-model="imageRef"
            ></mcl-input-file>
            <selector
              identifier="new-post-category"
              :options="formattedCategory"
              label-text="Category: "
              bg-color="light-3"
              :is-required="true"
              highlight-color="warning"
              v-model="categoryRef"
            ></selector>
            <mcl-text-area
              identifier="new-post-ingredients"
              label-text="Ingredients: "
              bg-color="light-3"
              highlight-color="warning"
              :is-required="true"
              v-model="ingredientsRef"
            ></mcl-text-area>
            <mcl-text-area
              identifier="new-post-recipe"
              label-text="Recipe: "
              bg-color="light-3"
              highlight-color="warning"
              :is-required="true"
              v-model="recipeRef"
            ></mcl-text-area>
            <btn-alpha type="submit" color="warning" :is-block="true"
              >Submit</btn-alpha
            >
          </form>
        </div>
      </section>
    </div>
    <div v-else>
      <div class="flex justify-center items-center h-[512px]">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HeroAlpha from '@bobbykim/hero-alpha'
import BtnAlpha from '@bobbykim/btn-alpha'
import BtnBeta from '@bobbykim/btn-beta'
import { useUserStore } from '@/stores/userStore'
import { usePostStore } from '@/stores/postStore'
import { useCategoryStore } from '@/stores/categoryStore'

const userStore = useUserStore()
const postStore = usePostStore()
const categoryStore = useCategoryStore()
const { user } = storeToRefs(userStore)
const { posts } = storeToRefs(postStore)
const { category } = storeToRefs(categoryStore)

const heroContent = {
  title: 'Time for cooking!',
  subTitle: "And you don't need to be good at it",
  image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam architecto, eaque porro voluptas rerum rem sit corrupti perspiciatis, cupiditate quibusdam beatae ad qui nesciunt molestiae laborum sed suscipit, sint illo? Omnis, iure ad dignissimos culpa iste facere voluptates. Enim, sunt!',
}

const { data } = await useFetch(
  '/api/post/Post-81a45e8f-f534-4680-a7c6-19edb256a957',
  { method: 'GET' }
)

const { data: userData } = await useFetch('/api/user', {
  method: 'GET',
  headers: { 'Content-type': 'application/json' },
})
console.log(posts)

onMounted(async () => {
  await userStore.getAllUsers()
  await postStore.getAllPosts()
  await categoryStore.getAllCategory()
})
</script>

<template>
  <div>
    <hero-alpha
      :title="heroContent.title"
      title-level="h1"
      title-size="md"
      :sub-title="heroContent.subTitle"
      sub-title-level="h2"
      :display-sub-title="true"
      :bg-image="heroContent.image"
      img-position="right"
    >
      <div class="mb-xs" v-html="heroContent.text"></div>
      <div class="flex gap-4 justify-center lg:justify-start">
        <btn-alpha color="warning">Go to Recipes</btn-alpha>
        <btn-beta color="danger">Sign up</btn-beta>
      </div>
    </hero-alpha>
    <div class="container">
      <div>
        {{ posts }}
      </div>
      <div>
        {{ category }}
      </div>
      <div>
        {{ user }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

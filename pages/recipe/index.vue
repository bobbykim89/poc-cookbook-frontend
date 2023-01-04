<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MclInput from '@bobbykim/mcl-input'
import BtnAlpha from '@bobbykim/btn-alpha'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import {
  useCategoryStore,
  usePostStore,
  PostFormattedDataFormat,
} from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'

const categoryStore = useCategoryStore()
const postStore = usePostStore()
const { category } = storeToRefs(categoryStore)
const { posts } = storeToRefs(postStore)

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
</script>

<template>
  <div>
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
          <div v-for="(item, i) in loadedPosts" :key="i" class="px-xs md:px-0">
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
        <div class="mb-sm mx-3xs">
          <btn-alpha color="danger" :is-block="true" :rounded="true">
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
                  <span class="capitalize">{{ item.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </accordion-beta>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
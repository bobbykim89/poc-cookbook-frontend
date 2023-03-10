<script setup lang="ts">
import { storeToRefs } from 'pinia'
import BtnAlpha from '@bobbykim/btn-alpha'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import {
  useCategoryStore,
  usePostStore,
  useUserStore,
  useInitPiniaStore,
  useErrorStore,
  CategoryRawDataFormat,
} from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'
import Loader from '@/components/Loader.vue'

interface LinkEmitEvent {
  event: Event
  title?: string
  url: string
  target?: '_blank' | '_self'
}

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const postStore = usePostStore()
const userStore = useUserStore()
const initPiniaStore = useInitPiniaStore()
const errorStore = useErrorStore()
const { loading } = storeToRefs(initPiniaStore)
const { category } = storeToRefs(categoryStore)
const { isAuthenticated } = storeToRefs(userStore)
const categoryPosts = computed(() =>
  postStore.getPostByCategoryId(route.params.categoryId as string)
)
const currentCategory = categoryStore.getCategoryById(
  route.params.categoryId as string
)

const { data } = await useFetch<CategoryRawDataFormat>(
  `/api/category/${route.params.categoryId}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    pick: ['title'],
  }
)

if (!data.value) {
  errorStore.setError('Unknown category..')
  router.push({ path: '/recipe' })
}

useHead({
  title: `Cookbook4All | ${data.value?.title}`,
  meta: [
    {
      name: 'description',
      content: `Recipe page for ${data.value?.title}`,
    },
    {
      property: 'og:title',
      content: `Cookbook4All | ${data.value?.title}`,
    },
  ],
})

const pageContent = {
  image:
    'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
}

const headerBgImage = computed(() => {
  return {
    'background-image': `url('${pageContent.image}')`,
  }
})

const handleCardClick = (e: LinkEmitEvent): void => {
  console.log(e)
  router.push(e.url)
}
</script>

<template>
  <div>
    <div v-if="!loading && categoryPosts">
      <section
        class="relative h-[250px] md:h-[350px] drop-shadow-md mb-sm md:mb-lg flex justify-start items-end p-xs md:p-md"
        :style="headerBgImage"
      >
        <div class="absolute inset-0 bg-dark-1 opacity-40"></div>
        <div class="relative py-xs px-sm bg-warning bg-opacity-90 text-light-1">
          <h2 class="h2-lg capitalize drop-shadow-lg">
            {{ currentCategory?.title }}
          </h2>
        </div>
      </section>
      <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
        <div class="md:col-span-3 order-2 md:order-1">
          <div class="grid md:grid-cols-3 gap-sm">
            <div
              v-for="(item, i) in categoryPosts"
              :key="i"
              class="px-xs md:px-0"
            >
              <card-alpha
                :title="item.title"
                :image-source="item.thumbUrl"
                :display-label="false"
                cta-color="warning"
                :cta-as-link="false"
                :cta-link="`/recipe/${item.postId}`"
                cta-text="Read more"
                highlight-color="danger"
                :enlarge-on-hover="true"
                @card-btn-click="handleCardClick"
                @card-click="handleCardClick"
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
          <accordion-beta
            title="Categories"
            btn-color="warning"
            :open-on-mount="true"
          >
            <ul
              class="flex flex-col justify-center items-center gap-2xs font-semibold"
            >
              <li>
                <NuxtLink to="/recipe">
                  <span class="hover:underline transition-all duration-150">
                    All
                  </span>
                </NuxtLink>
              </li>
              <li v-for="(item, i) in category" :key="i">
                <NuxtLink
                  :to="`/recipe/category/${item.categoryId}`"
                  v-if="item.categoryId !== route.params.categoryId"
                >
                  <span
                    class="capitalize hover:underline transition-all duration-150"
                    >{{ item.title }}</span
                  >
                </NuxtLink>
                <span v-else class="capitalize text-danger cursor-default">{{
                  item.title
                }}</span>
              </li>
            </ul>
          </accordion-beta>
        </div>
      </section>
    </div>
    <div v-if="loading">
      <div class="flex justify-center items-center h-[256px]">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

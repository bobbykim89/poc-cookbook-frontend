<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import {
  useUserStore,
  usePostStore,
  useInitPiniaStore,
  useErrorStore,
  UserRawDataFormat,
} from '@/stores'
import Loader from '@/components/Loader.vue'
import UserInfo from '@/components/card-components/UserInfo.vue'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const postStore = usePostStore()
const errorStore = useErrorStore()
const initPiniaStore = useInitPiniaStore()
const { loading } = storeToRefs(initPiniaStore)

const myPosts = computed(() => {
  return postStore.getPostByUserId(route.params.userId as string)
})

const userProfile = computed(() => {
  return userStore.getUserById(route.params.userId as string)
})

const { data } = await useFetch<UserRawDataFormat | null>(
  `/api/user/${route.params.userId}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    pick: ['userName', 'thumbUrl'],
  }
)

if (!data.value) {
  errorStore.setError('User not found..')
  router.push({ path: '/' })
}

const headerMetaTags = () => {
  const metaTags = [
    {
      property: 'og:title',
      content: `Cookbook4All | ${data.value?.userName}`,
    },
  ]
  if (data.value?.thumbUrl) {
    metaTags.push({
      property: 'og:image',
      content: data.value.thumbUrl,
    })
  }
  return metaTags
}

useHead({
  title: `Cookbook4All | ${data.value?.userName}`,
  meta: [
    { name: 'description', content: 'Recipe page' },
    {
      property: 'og:title',
      content: `Cookbook4All | ${data.value?.userName}`,
    },
    ...headerMetaTags(),
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
</script>

<template>
  <div v-if="!loading && userProfile">
    <section
      class="relative py-lg md:py-xl drop-shadow-md mb-sm md:mb-lg flex justify-center items-center"
      :style="headerBgImage"
    >
      <div class="absolute inset-0 bg-dark-1 opacity-40"></div>
      <div class="relative flex flex-col justify-center items-center">
        <img
          :src="userProfile?.imageUrl ? userProfile.imageUrl : defaultProfile"
          :alt="userProfile!.userName"
          class="h-3xl w-3xl rounded-full border-2 border-light-1 object-cover object-top mb-md"
        />

        <h3
          class="h3-md mb-sm tracking-wider text-light-2 drop-shadow-md"
          v-html="userProfile!.userName"
        ></h3>
        <div
          v-if="userProfile?.description"
          class="bg-light-1 bg-opacity-70 rounded-md p-xs mx-sm md:max-w-[45vw] whitespace-pre-line"
          v-html="userProfile.description"
        ></div>
      </div>
    </section>
    <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
      <div v-for="(item, i) in myPosts" :key="i" class="px-xs md:px-0">
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
    </section>
  </div>
  <div v-else>
    <div class="flex justify-center items-center h-[512px]">
      <Loader />
    </div>
  </div>
</template>

<style scoped></style>

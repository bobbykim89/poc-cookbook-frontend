<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import { useUserStore, usePostStore, useInitPiniaStore } from '@/stores'
import Loader from '@/components/Loader.vue'
import UserInfo from '@/components/card-components/UserInfo.vue'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'

const userStore = useUserStore()
const postStore = usePostStore()
const initPiniaStore = useInitPiniaStore()
const { currentUser, isAuthenticated } = storeToRefs(userStore)
const { loading } = storeToRefs(initPiniaStore)

const myProfile = computed(() => {
  return currentUser.value
})

const myPosts = computed(() => {
  return postStore.getPostByUserId(currentUser.value!.userId)
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
  <div v-if="!loading && isAuthenticated">
    <section
      class="relative py-lg md:py-xl drop-shadow-md mb-sm md:mb-lg flex justify-center items-center"
      :style="headerBgImage"
    >
      <div class="absolute inset-0 bg-dark-1 opacity-40"></div>
      <div class="relative flex flex-col justify-center items-center">
        <img
          :src="currentUser?.imageUrl ? currentUser.imageUrl : defaultProfile"
          :alt="currentUser!.userName"
          class="h-3xl w-3xl rounded-full border-2 border-light-1 object-cover object-top mb-md"
        />

        <h3
          class="h3-md mb-sm tracking-wider text-light-2 drop-shadow-md"
          v-html="currentUser!.userName"
        ></h3>
        <div
          v-if="currentUser?.description"
          class="bg-light-1 bg-opacity-70 rounded-md p-xs mx-sm md:max-w-[45vw] whitespace-pre-line"
          v-html="currentUser.description"
        ></div>
      </div>
    </section>
    <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
      <div class="px-xs md:px-0">
        <ClientOnly>
          <accordion-beta
            title="My Menu"
            btn-color="warning"
            :open-on-mount="true"
          >
            <ul
              class="flex flex-col justify-center items-center gap-2xs font-semibold"
            >
              <li>
                <span class="text-danger cursor-default">My Posts</span>
              </li>
              <li>
                <NuxtLink to="/profile/me/editprofile">
                  <span
                    class="capitalize hover:underline transition-all duration-150"
                    >Edit Profile</span
                  >
                </NuxtLink>
              </li>
            </ul>
          </accordion-beta>
        </ClientOnly>
      </div>
      <div class="md:col-span-3">
        <div class="grid md:grid-cols-3 gap-sm">
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
        </div>
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

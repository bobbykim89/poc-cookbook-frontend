<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HeroAlpha from '@bobbykim/hero-alpha'
import BtnAlpha from '@bobbykim/btn-alpha'
import CarouselAlpha from '@bobbykim/carousel-alpha'
import CardBeta from '@bobbykim/card-beta'
import ContainerAlpha from '@bobbykim/container-alpha'
import { usePostStore, useInitPiniaStore, useUserStore } from '@/stores'
import UserInfo from '@/components/card-components/UserInfo.vue'
import Parallax from '@/components/page-components/Parallax.vue'
import Loader from '@/components/Loader.vue'

const postStore = usePostStore()
const initPiniaStore = useInitPiniaStore()
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)
const { posts } = storeToRefs(postStore)
const { loading } = storeToRefs(initPiniaStore)

const carouselCards = computed(() => {
  return posts.value.slice(0, 8)
})

const heroContent = {
  title: 'Time for cooking!',
  subTitle: "And you don't need to be good at it",
  image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam architecto, eaque porro voluptas rerum rem sit corrupti perspiciatis, cupiditate quibusdam beatae ad qui nesciunt molestiae laborum sed suscipit, sint illo? Omnis, iure ad dignissimos culpa iste facere voluptates. Enim, sunt!',
}

const carouselContent = {
  title: 'Newest Recipes',
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat temporibus ex, perferendis et quam asperiores nulla ducimus velit nostrum at nobis ut reiciendis placeat quis pariatur a illum, ea consequatur deserunt sint! Corporis harum rerum asperiores libero ad quod esse alias mollitia nostrum possimus, ut sint repellendus commodi illo nemo.',
}
const containerContent = {
  image:
    'https://images.unsplash.com/photo-1564844536308-50b114a1d946?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=994&q=80',
  title: 'Nice to meet you!',
  text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quas est dignissimos! Nam pariatur esse veniam nobis quo, voluptatum at error nostrum autem ad molestiae magnam mollitia, deleniti corporis repellendus corrupti sit, laudantium expedita quod quam. Ipsa tempore quis neque minima enim magnam totam nihil rerum aperiam blanditiis fugit illo optio nisi in iusto perferendis aliquam distinctio animi possimus odio ducimus odit voluptatem, dolore vitae. Laborum inventore nemo commodi vitae, perferendis dicta eum sit! Odit magnam deserunt illo iste suscipit. Aperiam, labore vitae, tenetur obcaecati, ullam a earum aliquam ratione dolorem aliquid adipisci ducimus reiciendis magni? Minima voluptates voluptas necessitatibus.',
}
</script>

<template>
  <div>
    <hero-alpha
      :title="heroContent.title"
      :sub-title="heroContent.subTitle"
      sub-title-level="h2"
      :display-sub-title="true"
      :bg-image="heroContent.image"
      img-position="right"
    >
      <div class="mb-xs" v-html="heroContent.text"></div>
      <div class="flex gap-4 justify-center lg:justify-start">
        <btn-alpha color="warning" @btn-click="$router.push('/recipe')"
          >Go to Recipes</btn-alpha
        >
        <btn-alpha
          v-if="!isAuthenticated"
          color="danger"
          @btn-click="$router.push('/signup')"
          >Sign up</btn-alpha
        >
      </div>
    </hero-alpha>
    <ClientOnly>
      <div v-if="!loading">
        <carousel-alpha
          :title="carouselContent.title"
          :cards-content="carouselCards"
          highlight-color="warning"
          bg-color="transparent"
          v-warning="false"
        >
          <template #description>
            <div v-html="carouselContent.description"></div>
          </template>
          <template #carousel="{ setRef, cards }">
            <card-beta
              v-for="(card, i) in cards"
              :key="i"
              :ref="(el) => setRef(el)"
              :title="card.title"
              :image-source="card.thumbUrl"
              :cta-link="`/recipe/${card.postId}`"
              :cta-as-link="false"
              @card-click="$router.push($event.url)"
            >
              <div class="bg-light-1 w-full p-2xs bg-opacity-70">
                <div
                  v-html="card.recipe.substring(0, 50) + '...'"
                  class="mb-xs"
                ></div>
                <user-info
                  :image="card.author.thumbUrl"
                  :image-alt="card.author.userName"
                  :date="card.date"
                  :username="card.author.userName"
                  @info-card="
                    $router.push({ path: `/profile/${card.author.userId}` })
                  "
                ></user-info>
              </div>
            </card-beta>
          </template>
        </carousel-alpha>
      </div>
      <div v-if="loading">
        <div class="flex justify-center items-center h-[512px]">
          <Loader />
        </div>
      </div>
    </ClientOnly>
    <container-alpha container-bg="warning" section-bg="transparent">
      <template #left-column>
        <div class="rounded overflow-hidden md:p-xs mb-xs md:mb-0">
          <img
            :src="containerContent.image"
            alt="container image"
            class="aspect-square drop-shadow-md"
          />
        </div>
      </template>
      <template #right-column>
        <div class="lg:p-xs">
          <h2 class="h2-md mb-sm" v-html="containerContent.title"></h2>
          <div class="bg-light-1 bg-opacity-60 p-xs md:p-sm drop-shadow-md">
            <div v-html="containerContent.text" class="mb-sm"></div>
            <btn-alpha color="danger" @btn-click="$router.push('/recipe')"
              >Go to Recipes</btn-alpha
            >
          </div>
        </div>
      </template>
    </container-alpha>
    <parallax
      title="Thank you for coming!"
      bg-image="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    >
      <template #content>
        <div class="mb-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, dicta
          eligendi velit repellendus eaque doloremque nam aliquid beatae est
          adipisci voluptate quae similique excepturi a! Iste nisi possimus non
          impedit. Quisquam, repudiandae praesentium earum voluptatum voluptatem
          iste deserunt expedita error adipisci rerum repellat similique
          explicabo ad dolores illo. Sunt, quidem?
        </div>
        <btn-alpha color="danger" @btn-click="$router.push({ path: '/about' })"
          >Read more</btn-alpha
        >
      </template>
    </parallax>
  </div>
</template>

<style lang="scss" scoped></style>

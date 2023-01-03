<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import HeroAlpha from '@bobbykim/hero-alpha'
import BtnAlpha from '@bobbykim/btn-alpha'
import BtnBeta from '@bobbykim/btn-beta'
import CarouselAlpha from '@bobbykim/carousel-alpha'
import CardBeta from '@bobbykim/card-beta'
import { usePostStore, useInitPiniaStore } from '@/stores'

const initPiniaStore = useInitPiniaStore()
const postStore = usePostStore()

const { posts } = storeToRefs(postStore)

await initPiniaStore.initStores()

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

const handleCardClick = (e) => {
  console.log(e)
}
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
    <ClientOnly>
      <carousel-alpha
        :title="carouselContent.title"
        :cards-content="posts"
        highlight-color="warning"
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
            @card-click="handleCardClick"
          >
            <div class="bg-light-1 w-full p-2xs bg-opacity-70">
              <div class="flex justify-end items-center gap-xs mb-xs">
                <span class="font-semibold">{{ card.author.userName }}</span>
                <img
                  :src="card.author.thumbUrl"
                  :alt="card.author.userName"
                  class="rounded-full w-lg h-lg object-cover object-top"
                />
              </div>
              <div class="text-right">
                {{ format(card.date, 'MM.dd.yyyy') }}
              </div>
            </div>
          </card-beta>
        </template>
      </carousel-alpha>
    </ClientOnly>
    <div class="container">
      <div>
        {{ posts }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

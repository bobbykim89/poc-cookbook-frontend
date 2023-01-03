<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import MclInput from '@bobbykim/mcl-input'
import BtnAlpha from '@bobbykim/btn-alpha'
import AccordionBeta from '@bobbykim/accordion-beta'
import CardAlpha from '@bobbykim/card-alpha'
import { useCategoryStore, usePostStore } from '@/stores'

interface LinkEmitEvent {
  event: Event
  title?: string
  url: string
  target?: '_blank' | '_self'
}

const router = useRouter()
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

const handleCardClick = (e: LinkEmitEvent): void => {
  console.log(e)
  router.push(e.url)
}
</script>

<template>
  <div>
    <section
      class="relative h-[250px] md:h-[350px] drop-shadow-md mb-sm md:mb-lg flex justify-center items-center"
      :style="headerBgImage"
    >
      <div class="absolute inset-0 bg-light-1 opacity-40"></div>
      <div class="relative w-full md:max-w-[30vw] px-md">
        <mcl-input
          identifier="search-bar"
          highlight-color="warning"
          :display-border="true"
          :display-label="false"
          spacing="0"
          placeholder="Search here..."
          :is-required="false"
        ></mcl-input>
      </div>
    </section>
    <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
      <div class="md:col-span-3 order-2 md:order-1">
        <div class="grid md:grid-cols-3 gap-sm">
          <div v-for="(item, i) in posts" :key="i" class="px-xs md:px-0">
            <card-alpha
              :title="item.title"
              :image-source="item.thumbUrl"
              :label-text="item.category.title.toUpperCase()"
              label-color="danger"
              cta-color="warning"
              :cta-as-link="false"
              :cta-link="`/recipe/${item.postId}`"
              cta-text="Read more"
              :enlarge-on-hover="true"
              @card-btn-click="handleCardClick"
              @card-click="handleCardClick"
            >
              <div class="flex justify-end items-center gap-xs">
                <div class="flex flex-col justify-center items-end">
                  <span class="font-semibold">{{ item.author.userName }}</span>
                  <small class="text-dark-2">{{
                    format(new Date(item.date), 'MM.dd.yyyy')
                  }}</small>
                </div>
                <img
                  :src="item.author.thumbUrl"
                  :alt="item.author.userName"
                  class="rounded-full w-lg h-lg object-cover object-top"
                />
              </div>
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
                <NuxtLink to="/recipe">
                  <span>All</span>
                </NuxtLink>
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

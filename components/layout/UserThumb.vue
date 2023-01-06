<script setup lang="ts">
import { format } from 'date-fns'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'

const props = defineProps<{
  username: string
  image?: string
  imageAlt?: string
}>()

const emit = defineEmits(['profile-click'])

const handleProfileButtonClick = (e: Event) => {
  emit('profile-click', e)
}
</script>

<template>
  <button
    class="flex justify-end items-center gap-2xs md:gap-xs hover:opacity-70 transition-all duration-150"
    @click="handleProfileButtonClick"
  >
    <span
      class="text-dark-2 md:font-semibold capitalize text-sm md:text-md"
      v-html="username"
    ></span>
    <img
      :src="image ? image : defaultProfile"
      :alt="imageAlt"
      class="rounded-full w-md h-md md:w-lg md:h-lg object-cover object-top"
    />
  </button>
</template>

<style scoped></style>

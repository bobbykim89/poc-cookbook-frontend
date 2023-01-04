<script setup lang="ts">
import { format } from 'date-fns'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'

const props = defineProps<{
  username: string
  image?: string
  imageAlt?: string
  date: number
}>()
</script>

<template>
  <div class="flex justify-end items-center gap-xs">
    <div class="flex flex-col justify-center items-end">
      <span class="font-semibold capitalize" v-html="username"></span>
      <small class="text-dark-2">{{
        format(new Date(date), 'MM.dd.yyyy')
      }}</small>
    </div>
    <img
      :src="image ? image : defaultProfile"
      :alt="imageAlt"
      class="rounded-full w-lg h-lg object-cover object-top"
    />
  </div>
</template>

<style scoped></style>

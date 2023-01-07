<script setup lang="ts">
import { format } from 'date-fns'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'

const props = defineProps<{
  username: string
  image?: string
  imageAlt?: string
  date: number
}>()

const emit = defineEmits(['info-card'])

const handleInfoButtonClick = (e: Event) => {
  emit('info-card', e)
}
</script>

<template>
  <div class="flex justify-end">
    <button class="flex items-center gap-xs" @click="handleInfoButtonClick">
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
    </button>
  </div>
</template>

<style scoped></style>

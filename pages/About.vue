<script setup lang="ts">
import BtnAlpha from '@bobbykim/btn-alpha'
import UnderConstruction from '@/assets/imgs/under-construction.png'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mx-sm mt-lg mb-xs">
      <img
        :src="UnderConstruction"
        alt="under construction image"
        class="mb-sm md:max-w-lg"
      />
    </div>
    <btn-alpha color="warning" @btn-click="$router.push({ path: '/' })"
      >Back to home</btn-alpha
    >
  </div>
</template>

<style scoped></style>

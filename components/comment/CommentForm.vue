<script setup lang="ts">
import MclTextArea from '@bobbykim/mcl-text-area'

const emit = defineEmits(['comment-submit'])
const textcontentRef = ref<string>('')

const handleFormSubmit = (e: Event) => {
  emit('comment-submit', { event: e, text: textcontentRef.value })
  textcontentRef.value = ''
}
</script>

<template>
  <div class="bg-light-1 border border-light-3 drop-shadow-lg rounded-lg p-sm">
    <form @submit.prevent="handleFormSubmit">
      <mcl-text-area
        identifier="comment-input-form"
        :display-label="false"
        :display-shadow="false"
        highlight-color="warning"
        :rows="3"
        spacing="xs"
        placeholder="Please write comment there..."
        v-model="textcontentRef"
      ></mcl-text-area>
      <div class="flex justify-end items-end">
        <button
          type="submit"
          class="text-dark-1 hover:opacity-70 transition-all duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="w-sm h-sm"
          >
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>

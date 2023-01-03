<script setup lang="ts">
import MclInput from '@bobbykim/mcl-input'
import BtnAlpha from '@bobbykim/btn-alpha'

const userName = ref<string>('')
const userEmail = ref<string>('')
const userPassword = ref<string>('')

const handleUserSignIn = (e: Event): void => {
  e.preventDefault()
  if (
    userName.value !== '' &&
    userEmail.value !== '' &&
    userPassword.value !== ''
  ) {
    console.log(userName.value, userEmail.value, userPassword.value)
    userName.value = ''
    userEmail.value = ''
    userPassword.value = ''
  }
}
</script>

<template>
  <section>
    <div class="grid md:grid-cols-5 bg-light-2 min-h-[75vh]">
      <div class="lg:col-span-2 order-2 lg:order-1 h-full flex items-center">
        <div
          class="container flex flex-col items-center justify-center py-lg px-sm"
        >
          <h2 class="h2-md tracking-wider mb-md">Sign Up</h2>
          <form @submit.prevent="handleUserSignIn">
            <mcl-input
              identifier="username"
              label-text="Username:"
              highlight-color="warning"
              type="text"
              spacing="sm"
              :is-required="true"
              v-model="userName"
            ></mcl-input>
            <mcl-input
              identifier="email"
              label-text="Email:"
              highlight-color="warning"
              type="email"
              spacing="sm"
              :is-required="true"
              v-model="userEmail"
            ></mcl-input>
            <mcl-input
              identifier="password"
              label-text="Password:"
              highlight-color="warning"
              type="password"
              spacing="sm"
              :is-required="true"
              v-model="userPassword"
            ></mcl-input>
            <btn-alpha type="submit" color="warning" :is-block="true"
              >Submit</btn-alpha
            >
          </form>
          <span
            >Already have an account? go to
            <NuxtLink
              to="/signin"
              class="text-success hover:underline transition-all duration-200"
              >Sign In</NuxtLink
            ></span
          >
        </div>
      </div>
      <div
        class="relative hidden md:block lg:col-span-3 overflow-hidden mb-6 lg:mb-0 order-1 lg:order-2"
      >
        <svg
          class="hidden md:block absolute left-0 inset-y-0 h-full w-24 text-light-2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
        <img
          src="https://images.unsplash.com/photo-1565299715199-866c917206bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=780&q=80"
          alt="steak"
          class="w-full object-center object-cover h-[40vh] lg:h-[85vh]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>

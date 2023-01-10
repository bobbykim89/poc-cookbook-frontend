<script setup lang="ts">
import { storeToRefs } from 'pinia'
import NavAlpha from '@bobbykim/nav-alpha'
import FooterAlpha from '@bobbykim/footer-alpha'
import { useInitPiniaStore, useUserStore, useErrorStore } from '@/stores'
import UserThumb from '@/components/layout/UserThumb.vue'

// import assets
import Logo from '@/assets/imgs/logo.png'
import Pattern from '@/assets/imgs/pattern.svg'

interface NavItemType {
  title: string
  url: string
  target?: '_blank' | '_self'
}
interface SocialLinkType {
  linkedin?: string
  github?: string
  instagram?: string
  twitter?: string
}

const router = useRouter()
const initPiniaStore = useInitPiniaStore()
const userStore = useUserStore()
const errorStore = useErrorStore()
const { loading } = storeToRefs(initPiniaStore)
const { isAuthenticated, currentUser } = storeToRefs(userStore)
const { error } = storeToRefs(errorStore)

await initPiniaStore.initStores()

const navProps = {
  title: 'Cookbook<span class="text-warning">4</span>All',
  titleLink: '/',
  logo: Logo,
  logoAlt: 'Cookbook for All',
  logoLink: '/',
}

const navItems: NavItemType[] = [
  { title: 'HOME', url: '/', target: '_self' },
  { title: 'RECIPES', url: '/recipe', target: '_self' },
  { title: 'ABOUT', url: '/about', target: '_self' },
]

const socialLinks: SocialLinkType = {
  linkedin: 'https://www.linkedin.com/in/sihun-kim-9baa17165/',
  github: 'https://github.com/bobbykim89',
}

const getBgPattern = computed(() => {
  return {
    '--bg-image': `url('${Pattern}')`,
  }
})

const handleLogoutButtonClick = () => {
  userStore.signOutUser()
  router.push({ path: '/' })
}
</script>

<template>
  <div>
    <nav-alpha
      :title="navProps.title"
      :title-link="navProps.titleLink"
      :logo="navProps.logo"
      :logo-alt="navProps.logoAlt"
      :logo-link="navProps.logoLink"
      :nav-items="navItems"
      :title-as-link="false"
      :logo-as-link="false"
      :nav-item-as-link="false"
      highlight-color="warning"
      @logo-click="$router.push({ path: $event.link })"
      @title-click="$router.push({ path: $event.link })"
      @menu-click="$router.push({ path: $event.link })"
    >
      <template #nav-slot>
        <div
          v-if="!loading && isAuthenticated"
          class="flex items-center justify-center gap-sm"
        >
          <user-thumb
            :username="currentUser!.userName"
            :image="currentUser!.thumbUrl"
            :image-alt="currentUser!.userName"
            @profile-click="$router.push({ path: '/profile/me' })"
          ></user-thumb>
          <button
            class="flex gap-xs items-center hover:opacity-70 transition-all duration-150 text-dark-2"
            @click="handleLogoutButtonClick"
          >
            <span class="font-semibold">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="h-sm w-sm"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="!loading && !isAuthenticated"
          class="flex items-center justify-center gap-sm"
        >
          <button
            class="flex gap-xs items-center hover:opacity-70 transition-all duration-150 text-dark-2"
            @click="$router.push({ path: '/signin' })"
          >
            <span class="font-semibold">Sign in</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="h-sm w-sm"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
              />
            </svg>
          </button>
          <button
            class="flex gap-xs items-center hover:opacity-70 transition-all duration-150 text-dark-2"
            @click="$router.push({ path: '/signup' })"
          >
            <span class="font-semibold">Sign up</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
              class="h-sm w-sm"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              />
            </svg>
          </button>
        </div>
      </template>
      <template #mobile-slot="{ closeNav }">
        <div
          v-if="!loading && isAuthenticated"
          class="flex items-center justify-center gap-sm bg-light-4 p-2xs"
        >
          <user-thumb
            :username="currentUser!.userName"
            :image="currentUser!.thumbUrl"
            :image-alt="currentUser!.userName"
            @profile-click="$router.push({ path: '/profile/me' })"
          ></user-thumb>
          <button
            class="flex gap-2xs items-center hover:opacity-70 transition-all duration-150"
            @click="handleLogoutButtonClick"
          >
            <span class="text-sm">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="h-xs w-xs"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="!loading && !isAuthenticated"
          class="flex items-center justify-center gap-sm bg-light-4 p-2xs"
        >
          <button
            class="flex gap-2xs items-center hover:opacity-70 transition-all duration-150 text-dark-2"
            @click="closeNav($event), $router.push({ path: '/signin' })"
          >
            <span class="text-sm">Sign in</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="h-xs w-xs"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
              />
            </svg>
          </button>
          <button
            class="flex gap-2xs items-center hover:opacity-70 transition-all duration-150 text-dark-2"
            @click="closeNav($event), $router.push({ path: '/signup' })"
          >
            <span class="text-sm">Sign up</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
              class="h-xs w-xs"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              />
            </svg>
          </button>
        </div>
      </template>
    </nav-alpha>
    <div class="relative min-h-[75vh]">
      <div
        class="absolute inset-0 bg-repeat opacity-5 bg-pattern"
        :style="getBgPattern"
      ></div>
      <div class="relative">
        <div
          v-if="error"
          class="w-full p-xs bg-danger flex justify-center items-center text-light-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="w-xs mr-2xs"
          >
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          <span>{{ error }}</span>
        </div>
        <slot></slot>
      </div>
    </div>
    <footer-alpha
      :title="navProps.title"
      :logo="navProps.logo"
      :logo-alt="navProps.logoAlt"
      :logo-link="navProps.logoLink"
      :logo-as-link="false"
      :nav-items="navItems"
      :nav-item-as-link="false"
      :social-links="socialLinks"
      social-icon-color="light-1"
      highlight-color="warning"
      border-top-color="danger"
      @logo-click="$router.push({ path: $event.link })"
      @menu-click="$router.push({ path: $event.link })"
    ></footer-alpha>
  </div>
</template>

<style lang="scss" scoped>
.bg-pattern {
  background-image: var(--bg-image);
}
</style>

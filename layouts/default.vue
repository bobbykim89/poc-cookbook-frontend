<script setup lang="ts">
import { storeToRefs } from 'pinia'
import NavAlpha from '@bobbykim/nav-alpha'
import FooterAlpha from '@bobbykim/footer-alpha'
import { useInitPiniaStore, useErrorStore } from '@/stores'

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
interface LinkEmitEvent {
  event: Event
  title?: string
  link: string
  target?: string
}

const initPiniaStore = useInitPiniaStore()
const errorStore = useErrorStore()
const { error } = storeToRefs(errorStore)

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

await initPiniaStore.initStores()
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
    ></nav-alpha>
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
      border-top-color="warning"
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

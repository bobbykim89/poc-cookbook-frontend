<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AccordionBeta from '@bobbykim/accordion-beta'
import MclInput from '@bobbykim/mcl-input'
import MclTextArea from '@bobbykim/mcl-text-area'
import MclInputFile from '@bobbykim/mcl-input-file'
import BtnAlpha from '@bobbykim/btn-alpha'
import { useUserStore, useInitPiniaStore } from '@/stores'
import Loader from '@/components/Loader.vue'
import defaultProfile from '@/assets/imgs/defaultProfile.jpeg'
import { ChangeEvent } from 'rollup'

const router = useRouter()
const userStore = useUserStore()
const initPiniaStore = useInitPiniaStore()
const { currentUser, isAuthenticated } = storeToRefs(userStore)
const { loading } = storeToRefs(initPiniaStore)
const config = useRuntimeConfig()

const myProfile = computed(() => {
  return currentUser.value
})

const pageContent = {
  image:
    'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1997&q=80',
}
const headerBgImage = computed(() => {
  return {
    'background-image': `url('${pageContent.image}')`,
  }
})

const userNameRef = ref<string>(myProfile.value?.userName || '')
const userDescriptionRef = ref<string>(myProfile.value?.description || '')
const userProfileImageRef = ref<File>()

const onChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) {
    return
  }
  userProfileImageRef.value = files[0]
}

const handleProfileUpdateSubmit = async () => {
  const editForm = new FormData()
  editForm.append('userName', userNameRef.value)
  editForm.append('description', userDescriptionRef.value)
  if (
    userProfileImageRef.value !== undefined &&
    userProfileImageRef.value !== null
  ) {
    // console.log(userProfileImageRef.value.name)
    editForm.append('image', userProfileImageRef.value)
  }
  console.log(
    editForm.get('userName'),
    editForm.get('description'),
    editForm.get('image')
  )
  console.log(config.public.API)
  await userStore.patchUserProfileById(editForm)
  router.push({ path: '/profile/me' })
}
</script>

<template>
  <div v-if="!loading && isAuthenticated">
    <section
      class="relative py-lg md:py-xl drop-shadow-md mb-sm md:mb-lg flex justify-center items-center"
      :style="headerBgImage"
    >
      <div class="absolute inset-0 bg-dark-1 opacity-40"></div>
      <div class="relative flex flex-col justify-center items-center">
        <img
          :src="currentUser ? currentUser.imageUrl : defaultProfile"
          :alt="currentUser!.userName"
          class="h-3xl w-3xl rounded-full border-2 border-light-1 object-cover object-top mb-md"
        />

        <h3
          class="h3-md mb-sm tracking-wider text-light-2 drop-shadow-md"
          v-html="currentUser!.userName"
        ></h3>
        <div
          class="bg-light-1 bg-opacity-70 rounded-md p-xs mx-sm md:max-w-[45vw]"
          v-html="currentUser!.description"
        ></div>
      </div>
    </section>
    <section class="container grid md:grid-cols-4 pb-sm md:pb-lg gap-sm">
      <div class="px-xs md:px-0">
        <ClientOnly>
          <accordion-beta
            title="My Menu"
            btn-color="warning"
            :open-on-mount="true"
          >
            <ul
              class="flex flex-col justify-center items-center gap-2xs font-semibold"
            >
              <li>
                <NuxtLink to="/profile/me">
                  <span
                    class="capitalize hover:underline transition-all duration-150"
                    >My Posts</span
                  >
                </NuxtLink>
              </li>
              <li>
                <span class="text-danger cursor-default">Edit Profile</span>
              </li>
            </ul>
          </accordion-beta>
        </ClientOnly>
      </div>
      <div class="md:col-span-3 px-xs md:px-0">
        <div
          class="bg-light-1 border border-light-3 drop-shadow-lg rounded-lg px-xs py-sm md:px-md md:py-lg"
        >
          <h3 class="h3-lg mb-md">Edit Profile</h3>
          <form @submit.prevent="handleProfileUpdateSubmit">
            <mcl-input
              identifier="edit-username"
              label-text="Username:"
              bg-color="light-3"
              highlight-color="danger"
              v-model="userNameRef"
            ></mcl-input>
            <mcl-input-file
              identifier="edit-profile-image"
              label-text="Profile Image:"
              bg-color="light-3"
              v-model="userProfileImageRef"
            ></mcl-input-file>
            <!-- <input type="file" name="image" @change="onChange" /> -->
            <mcl-text-area
              identifier="edit-profile-description"
              label-text="Description: "
              bg-color="light-3"
              highlight-color="danger"
              spacing="xs"
              v-model="userDescriptionRef"
            ></mcl-text-area>
            <btn-alpha type="submit" color="danger" :is-block="true"
              >Save</btn-alpha
            >
          </form>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <div class="flex justify-center items-center h-[512px]">
      <Loader />
    </div>
  </div>
</template>

<style scoped></style>

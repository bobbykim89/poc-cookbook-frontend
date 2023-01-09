import { storeToRefs } from 'pinia'
import { useInitPiniaStore, useUserStore, useErrorStore } from '@/stores'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  const initPiniaStore = useInitPiniaStore()
  const errorStore = useErrorStore()
  const { loading } = storeToRefs(initPiniaStore)
  const { isAuthenticated } = storeToRefs(userStore)
  await userStore.getCurrentUser()
  if (!loading.value && isAuthenticated.value) {
    errorStore.setError('This is guest only page')
    return navigateTo({ path: '/' })
  }
})

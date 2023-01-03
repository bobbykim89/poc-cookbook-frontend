export default defineEventHandler(async (): Promise<Response> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/post`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return data
})

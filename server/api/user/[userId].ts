export default defineEventHandler(async (event): Promise<Response> => {
  const { userId } = event.context.params
  const { POC_COOKBOOK_API } = useRuntimeConfig()

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/user/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return data
})

export default defineEventHandler(async (event): Promise<Response> => {
  const { postId } = event.context.params
  const { POC_COOKBOOK_API } = useRuntimeConfig()

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/post/${postId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return data
})

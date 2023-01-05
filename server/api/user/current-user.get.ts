export default defineEventHandler(async (event): Promise<Response | null> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { authorization } = event.node.req.headers
  if (authorization) {
    try {
      const data: Response = await $fetch(
        `${POC_COOKBOOK_API}/user/current-user/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        }
      )
      return data
    } catch (err) {
      console.log(err)
    }
  }
  return null
})

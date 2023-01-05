export default defineEventHandler(async (event): Promise<Response | null> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  //   console.log(event.node.req.headers)
  const { authorization } = event.node.req.headers
  if (authorization) {
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
  }
  return null
})

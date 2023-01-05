export default defineEventHandler(async (event): Promise<Response> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  //   const headers = event.node.req.headers
  //   console.log(headers)

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: event.node.req.headers.Authorization,
    },
  })
  return data
})

export default defineEventHandler(async (event): Promise<Response | null> => {
  const { userId } = event.context.params
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { authorization } = event.node.req.headers
  const formdata: FormData = await readBody(event)
  // const userName = formdata.get('userName')
  // const description = formdata.get('description')
  // const image = formdata.get('image')

  if (!authorization) {
    return null
  }

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: authorization,
    },
    body: formdata,
  })
  return data
})

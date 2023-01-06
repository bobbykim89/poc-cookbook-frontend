export default defineEventHandler(async (event): Promise<Response | null> => {
  const { userId } = event.context.params
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { authorization } = event.node.req.headers
  const formdata: FormData = await readBody(event)
  // const userName = formdata.get('userName')
  // const description = formdata.get('description')
  // const image = formdata.get('image')

  if (!event.node.req.headers['content-type']) {
    return null
  }
  if (!authorization) {
    return null
  }
  console.log('content type', event.node.req.headers['content-type'])
  console.log(formdata)

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': event.node.req.headers['content-type'],
      Authorization: authorization,
    },
    body: formdata,
  })
  console.log(data)
  return data
})

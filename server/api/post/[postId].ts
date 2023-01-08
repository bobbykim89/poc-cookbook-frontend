export default defineEventHandler(async (event) => {
  const { postId } = event.context.params
  const { POC_COOKBOOK_API } = useRuntimeConfig()

  const { method } = event.node.req
  const { authorization } = event.node.req.headers

  const getResponse: Response = await $fetch(
    `${POC_COOKBOOK_API}/post/${postId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  const deleteResponse = async () => {
    if (!authorization) {
      return null
    }
    const data: Response = await $fetch(`${POC_COOKBOOK_API}/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
    })
    return data
  }

  switch (method) {
    case 'GET':
      return getResponse

    case 'DELETE':
      return deleteResponse()
  }
})

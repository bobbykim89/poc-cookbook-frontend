interface PostCategoryBody {
  title: string
}

export default defineEventHandler(async (event): Promise<Response | null> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { title } = await readBody(event)
  const { authorization } = event.node.req.headers

  if (!authorization) {
    return null
  }

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: {
      title,
    },
  })
  return data
})
